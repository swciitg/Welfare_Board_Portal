// In-memory stores for OAuth DCR
// For low traffic, in-memory is sufficient. 
// Note: restarts will clear these stores, requiring clients to re-authenticate.

// client_id -> { client_id, client_secret, redirect_uris, client_name }
export const clientsStore = new Map();

// auth_code -> { client_id, redirect_uri, code_challenge, expiresAt }
export const authCodesStore = new Map();

// refresh_token -> { client_id, expiresAt }
export const refreshTokensStore = new Map();

export const cleanupExpired = () => {
  const now = Date.now();
  for (const [code, data] of authCodesStore.entries()) {
    if (data.expiresAt < now) authCodesStore.delete(code);
  }
  for (const [token, data] of refreshTokensStore.entries()) {
    if (data.expiresAt < now) refreshTokensStore.delete(token);
  }
};
