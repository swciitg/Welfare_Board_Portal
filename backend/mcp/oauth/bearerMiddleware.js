import { verifyAccessToken } from './jwtHelper.js';

export const requireBearerToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const wwwAuthValue = 'Bearer resource_metadata="https://swc.iitg.ac.in/welfare-board/api/.well-known/oauth-protected-resource"';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401)
      .set('WWW-Authenticate', wwwAuthValue)
      .json({ error: 'Unauthorized: missing or invalid Bearer token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    // You can attach payload to request if needed, e.g., req.mcpClient = payload;
    next();
  } catch (error) {
    return res.status(401)
      .set('WWW-Authenticate', wwwAuthValue)
      .json({ error: `Unauthorized: ${error.message}` });
  }
};
