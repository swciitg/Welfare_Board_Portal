// backend/middleware/apiKey.middleware.js
import { getValidKeys } from '../mcp/keyReader.js';

export const requireApiKey = (req, res, next) => {
  const VALID_KEYS = getValidKeys();
  const key = req.headers['x-api-key'] || req.query.api_key;
  if (!key || !VALID_KEYS.includes(key)) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing API key' });
  }
  next();
};