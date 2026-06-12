import express from 'express';
import crypto from 'crypto';
import { OAuthConfig } from '../client.js';
import { clientsStore, authCodesStore, refreshTokensStore, cleanupExpired } from './store.js';
import { signAccessToken } from './jwtHelper.js';

const router = express.Router();

// 1. Authorization Server Metadata
router.get('/.well-known/oauth-authorization-server', (req, res) => {
  res.json({
    issuer: OAuthConfig.ISSUER,
    authorization_endpoint: `${OAuthConfig.ISSUER}/authorize`,
    token_endpoint: `${OAuthConfig.ISSUER}/token`,
    registration_endpoint: `${OAuthConfig.ISSUER}/register`,
    code_challenge_methods_supported: ["S256"],
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"]
  });
});

// 2. Dynamic Client Registration (DCR)
router.post('/register', express.json(), (req, res) => {
  const { redirect_uris, client_name } = req.body;
  
  if (!redirect_uris || !Array.isArray(redirect_uris)) {
    return res.status(400).json({ error: 'invalid_client_metadata', error_description: 'redirect_uris is required' });
  }

  const client_id = crypto.randomUUID();
  const client_secret = crypto.randomUUID();

  clientsStore.set(client_id, {
    client_id,
    client_secret,
    redirect_uris,
    client_name: client_name || 'Unknown Client'
  });

  res.status(201).json({
    client_id,
    client_secret,
    redirect_uris,
    client_name
  });
});

// 3. Authorization Endpoint (Consent Page)
router.get('/authorize', (req, res) => {
  const { client_id, redirect_uri, code_challenge, code_challenge_method, state } = req.query;

  if (!client_id || !clientsStore.has(client_id)) {
    return res.status(400).send('Invalid client_id');
  }

  if (code_challenge_method !== 'S256' || !code_challenge) {
    return res.status(400).send('PKCE with S256 is required');
  }

  // Render consent form
  res.render('oauth-consent', {
    client_id,
    redirect_uri,
    code_challenge,
    state,
    error: null
  });
});

// 3b. Process Consent Form Submit
router.post('/authorize', express.urlencoded({ extended: true }), (req, res) => {
  const { username, password, client_id, redirect_uri, code_challenge, state } = req.body;

  // Basic authentication using ADMIN_EMAIL and ADMIN_PASSWORD
  if (username !== OAuthConfig.ADMIN_EMAIL || password !== OAuthConfig.ADMIN_PASSWORD) {
    return res.render('oauth-consent', {
      client_id,
      redirect_uri,
      code_challenge,
      state,
      error: 'Invalid username or password'
    });
  }

  // Generate auth code
  const code = crypto.randomUUID();
  authCodesStore.set(code, {
    client_id,
    redirect_uri,
    code_challenge,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 mins
  });

  // Redirect back to client
  const redirectUrl = new URL(redirect_uri);
  redirectUrl.searchParams.set('code', code);
  if (state) redirectUrl.searchParams.set('state', state);

  res.redirect(redirectUrl.toString());
});

// 4. Token Endpoint
router.post('/token', express.urlencoded({ extended: true }), (req, res) => {
  cleanupExpired();

  const { grant_type, client_id, code, code_verifier, redirect_uri, refresh_token } = req.body;

  if (!clientsStore.has(client_id)) {
    return res.status(401).json({ error: 'invalid_client' });
  }

  if (grant_type === 'authorization_code') {
    if (!code || !authCodesStore.has(code)) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    const authData = authCodesStore.get(code);
    authCodesStore.delete(code); // one-time use

    if (authData.client_id !== client_id || authData.redirect_uri !== redirect_uri) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    // Verify PKCE
    const expectedChallenge = base64url(crypto.createHash('sha256').update(code_verifier).digest());
    if (expectedChallenge !== authData.code_challenge) {
      return res.status(400).json({ error: 'invalid_grant', error_description: 'PKCE verification failed' });
    }

    return issueTokens(client_id, res);

  } else if (grant_type === 'refresh_token') {
    if (!refresh_token || !refreshTokensStore.has(refresh_token)) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    const refreshData = refreshTokensStore.get(refresh_token);
    refreshTokensStore.delete(refresh_token); // rotate refresh token

    if (refreshData.client_id !== client_id) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    return issueTokens(client_id, res);
  }

  return res.status(400).json({ error: 'unsupported_grant_type' });
});

function issueTokens(client_id, res) {
  const access_token = signAccessToken(client_id);
  const refresh_token = crypto.randomUUID();

  refreshTokensStore.set(refresh_token, {
    client_id,
    expiresAt: Date.now() + OAuthConfig.REFRESH_TOKEN_TTL_SECONDS * 1000
  });

  res.json({
    access_token,
    token_type: 'Bearer',
    expires_in: OAuthConfig.ACCESS_TOKEN_TTL_SECONDS,
    refresh_token
  });
}

function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export default router;
