// backend/mcp/server.js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'node:crypto';
import { registerTools } from './tools.js';

const mcpServer = new McpServer({
  name: 'welfare-board-iitg',
  version: '1.0.0',
});

registerTools(mcpServer);

// sessionId → transport
const transports = new Map();

function isInitializeRequest(body) {
  return body?.method === 'initialize';
}

export const mcpHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const sessionId = req.headers['mcp-session-id'];
      let transport;

      if (sessionId && transports.has(sessionId)) {
        // Existing session
        transport = transports.get(sessionId);
      } else if (!sessionId && isInitializeRequest(req.body)) {
        // New session — only allow on initialize
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (id) => {
            transports.set(id, transport);
          },
        });

        transport.onclose = () => {
          const id = transport.sessionId;
          if (id) transports.delete(id);
        };

        await mcpServer.connect(transport);
      } else {
        return res.status(400).json({ error: 'Bad request: missing or invalid session' });
      }

      await transport.handleRequest(req, res, req.body);

    } else if (req.method === 'GET') {
      // SSE stream for server-sent notifications
      const sessionId = req.headers['mcp-session-id'];
      if (!sessionId || !transports.has(sessionId)) {
        return res.status(400).json({ error: 'No active session' });
      }
      await transports.get(sessionId).handleRequest(req, res);

    } else if (req.method === 'DELETE') {
      // Client terminating session
      const sessionId = req.headers['mcp-session-id'];
      if (sessionId && transports.has(sessionId)) {
        await transports.get(sessionId).close();
        transports.delete(sessionId);
      }
      res.status(200).json({ ok: true });

    } else {
      res.status(405).set('Allow', 'GET, POST, DELETE').json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('MCP handler error:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
  }
};