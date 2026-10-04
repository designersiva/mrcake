// server.mjs
// Native Node.js HTTP & Express server for Mr. Cake Dharavi
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Node Health Check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Mr. Cake Bakery & Restaurant API',
    runtime: 'Node.js',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Hello World endpoint matching user prompt
app.get('/api/hello', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// Orders API
const inMemoryOrders = [];
app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: inMemoryOrders.length, orders: inMemoryOrders });
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: req.body.id || `ord-${Date.now()}`,
    orderNumber: req.body.orderNumber || `MC-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  inMemoryOrders.unshift(order);
  res.status(201).json({ success: true, order });
});

// Mount Vite in dev or static files in production
if (!isProduction) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }
}

// starts the http server locally on port 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Node.js Engine] Server listening on http://127.0.0.1:${PORT} (0.0.0.0:${PORT})`);
  console.log(`[Node.js Engine] Node version: ${process.version}`);
});
