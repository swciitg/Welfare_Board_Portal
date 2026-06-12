// backend/mcp/server.js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { registerTools } from './tools.js';

// One McpServer instance, reused across sessions
const mcpServer = new McpServer({
  name: 'welfare-board-iitg',
  version: '1.0.0',
});

registerTools(mcpServer);

// Map of sessionId → SSEServerTransport (one per connected client)
const transports = new Map();

export const mcpSseHandler = async (req, res) => {
  const transport = new SSEServerTransport('/welfare-board/api/mcp/messages', res);
  transports.set(transport.sessionId, transport);

  res.on('close', () => {
    transports.delete(transport.sessionId);
  });

  await mcpServer.connect(transport);
};

export const mcpMessageHandler = async (req, res) => {
  const sessionId = req.query.sessionId;
  const transport = transports.get(sessionId);

  if (!transport) {
    return res.status(404).json({ error: 'Session not found or expired' });
  }

  await transport.handlePostMessage(req, res, req.body);
};