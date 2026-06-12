import crypto from 'crypto';
import { OAuthConfig } from '../client.js';

function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function signAccessToken(clientId) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    iss: OAuthConfig.ISSUER,
    sub: clientId,
    aud: [OAuthConfig.MCP_URL],
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + OAuthConfig.ACCESS_TOKEN_TTL_SECONDS
  };

  const encodedHeader = base64url(Buffer.from(JSON.stringify(header)));
  const encodedPayload = base64url(Buffer.from(JSON.stringify(payload)));

  const signature = crypto
    .createHmac('sha256', OAuthConfig.JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  return `${encodedHeader}.${encodedPayload}.${base64url(signature)}`;
}

export function verifyAccessToken(token) {
  if (!token) throw new Error('Token is missing');
  
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid token format');

  const [encodedHeader, encodedPayload, encodedSignature] = parts;

  // Re-verify signature
  const signature = crypto
    .createHmac('sha256', OAuthConfig.JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  if (base64url(signature) !== encodedSignature) {
    throw new Error('Invalid signature');
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());

  // Check claims
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  if (payload.iss !== OAuthConfig.ISSUER) {
    throw new Error('Invalid issuer');
  }

  return payload;
}
