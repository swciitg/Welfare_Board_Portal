export const OAuthConfig = {
  // ISSUER must match the base where /.well-known/oauth-authorization-server is served.
  // We use an external Cloudflare Worker for this. 
  ISSUER: 'https://swc-mcp-auth.manan-vala.workers.dev',
  MCP_URL: 'https://swc.iitg.ac.in/welfare-board/api/mcp',
  
  JWT_SECRET: 'REPLACE_WITH_A_LONG_RANDOM_SECRET_STRING_2026',

  ACCESS_TOKEN_TTL_SECONDS: 3600,
  REFRESH_TOKEN_TTL_SECONDS: 7 * 24 * 3600,

  get ADMIN_EMAIL() { return process.env.ADMIN_EMAIL; },
  get ADMIN_PASSWORD() { return process.env.ADMIN_PASSWORD; },
};
