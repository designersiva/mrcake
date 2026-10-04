import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// In-memory records
interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryType: 'Delivery' | 'Pickup';
  address?: string;
  items: any[];
  total: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  deliveryTimeSlot?: string;
  notes?: string;
}

interface CustomCakeRecord {
  id: string;
  customerName: string;
  phone: string;
  occasion: string;
  flavour: string;
  tier: string;
  weightKg: number;
  isEggless: boolean;
  message?: string;
  estimatedPrice: number;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Delivered' | 'Declined';
  createdAt: string;
}

interface ReservationRecord {
  id: string;
  customerName: string;
  phone: string;
  guestCount: number;
  date: string;
  timeSlot: string;
  specialRequests?: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface ContactMessageRecord {
  id: string;
  name: string;
  emailOrPhone: string;
  subject: string;
  message: string;
  createdAt: string;
}

// In-memory store
const db = {
  orders: [] as OrderRecord[],
  customCakes: [] as CustomCakeRecord[],
  reservations: [] as ReservationRecord[],
  messages: [] as ContactMessageRecord[],
};

export async function createBakeryServer() {
  const app = express();

  // Parsing middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS headers for flexibility
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  // 1. Health check & Node runtime information
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'online',
      service: 'Mr. Cake Bakery & Restaurant API',
      runtime: 'Node.js',
      nodeVersion: process.version,
      platform: process.platform,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Hello World endpoint matching user specification
  app.get('/api/hello', (_req: Request, res: Response) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  });

  // 3. Orders API
  app.get('/api/orders', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: db.orders.length,
      orders: db.orders,
    });
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    const orderData = req.body;
    if (!orderData || !orderData.customerName || !orderData.phone) {
      return res.status(400).json({ success: false, error: 'Customer name and phone are required' });
    }

    const newOrder: OrderRecord = {
      id: orderData.id || `ord-${Date.now()}`,
      orderNumber: orderData.orderNumber || `MC-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName,
      phone: orderData.phone,
      deliveryType: orderData.deliveryType || 'Delivery',
      address: orderData.address || '',
      items: orderData.items || [],
      total: Number(orderData.total) || 0,
      status: orderData.status || 'Pending',
      createdAt: orderData.createdAt || new Date().toISOString(),
      deliveryTimeSlot: orderData.deliveryTimeSlot,
      notes: orderData.notes,
    };

    db.orders.unshift(newOrder);
    return res.status(201).json({ success: true, order: newOrder });
  });

  app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = db.orders.find((o) => o.id === id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    order.status = status;
    return res.json({ success: true, order });
  });

  // 4. Custom Cake Requests API
  app.get('/api/custom-cakes', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: db.customCakes.length,
      customCakes: db.customCakes,
    });
  });

  app.post('/api/custom-cakes', (req: Request, res: Response) => {
    const cakeData = req.body;
    if (!cakeData || !cakeData.customerName || !cakeData.phone) {
      return res.status(400).json({ success: false, error: 'Customer name and phone are required' });
    }

    const newRequest: CustomCakeRecord = {
      id: cakeData.id || `custom-${Date.now()}`,
      customerName: cakeData.customerName,
      phone: cakeData.phone,
      occasion: cakeData.occasion || 'Celebration',
      flavour: cakeData.flavour || 'Chocolate Truffle',
      tier: cakeData.tier || '1 Tier',
      weightKg: Number(cakeData.weightKg) || 1,
      isEggless: Boolean(cakeData.isEggless),
      message: cakeData.message,
      estimatedPrice: Number(cakeData.estimatedPrice) || 850,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    db.customCakes.unshift(newRequest);
    return res.status(201).json({ success: true, customCake: newRequest });
  });

  // 5. Table Reservations API
  app.get('/api/reservations', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: db.reservations.length,
      reservations: db.reservations,
    });
  });

  app.post('/api/reservations', (req: Request, res: Response) => {
    const rData = req.body;
    if (!rData || !rData.customerName || !rData.phone || !rData.date || !rData.timeSlot) {
      return res.status(400).json({ success: false, error: 'Name, phone, date, and time are required' });
    }

    const newReservation: ReservationRecord = {
      id: rData.id || `res-${Date.now()}`,
      customerName: rData.customerName,
      phone: rData.phone,
      guestCount: Number(rData.guestCount) || 2,
      date: rData.date,
      timeSlot: rData.timeSlot,
      specialRequests: rData.specialRequests,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    db.reservations.unshift(newReservation);
    return res.status(201).json({ success: true, reservation: newReservation });
  });

  // 6. Contact Inquiries API
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, emailOrPhone, subject, message } = req.body;
    if (!name || !emailOrPhone || !message) {
      return res.status(400).json({ success: false, error: 'Name, contact info, and message are required' });
    }

    const newMsg: ContactMessageRecord = {
      id: `msg-${Date.now()}`,
      name,
      emailOrPhone,
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString(),
    };

    db.messages.unshift(newMsg);
    return res.status(201).json({
      success: true,
      message: 'Inquiry received. The Mr. Cake Dharavi team will connect shortly.',
      id: newMsg.id,
    });
  });

  // Dev mode: Mount Vite middleware
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static assets
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  return app;
}

// Start server directly
createBakeryServer()
  .then((app) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[Node.js Engine] Mr. Cake Server running on http://0.0.0.0:${PORT}`);
      console.log(`[Node.js Engine] Node version: ${process.version}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start Mr. Cake server:', err);
    process.exit(1);
  });
