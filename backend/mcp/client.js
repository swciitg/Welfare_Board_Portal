export const OAuthConfig = {
  ISSUER: 'https://swc.iitg.ac.in/welfare-board/api/oauth',
  MCP_URL: 'https://swc.iitg.ac.in/welfare-board/api/mcp',
  
  JWT_SECRET: 'REPLACE_WITH_A_LONG_RANDOM_SECRET_STRING_2026',

  ACCESS_TOKEN_TTL_SECONDS: 3600,
  REFRESH_TOKEN_TTL_SECONDS: 7 * 24 * 3600,

  get ADMIN_EMAIL() { return process.env.ADMIN_EMAIL; },
  get ADMIN_PASSWORD() { return process.env.ADMIN_PASSWORD; },
};
