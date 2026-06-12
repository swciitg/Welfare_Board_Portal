// backend/mcp/keyReader.js
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getValidKeys = () => {
  try {
    const keyData = readFileSync(join(__dirname, 'keys.bin'), 'binary');
    return keyData.split(',').map(k => k.trim()).filter(k => k.length > 0);
  } catch (error) {
    console.error('Error reading keys.bin:', error.message);
    return [];
  }
};
