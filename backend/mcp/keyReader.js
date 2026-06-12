// backend/mcp/keyReader.js
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read once at startup, not per request
const raw = (() => {
  try {
    return readFileSync(join(__dirname, 'keys.bin'), 'binary');
  } catch (err) {
    console.error('Failed to load keys.bin:', err.message);
    return '';
  }
})();

export const getValidKeys = () =>
  raw.split(',').map(k => k.trim()).filter(k => k.length > 0);