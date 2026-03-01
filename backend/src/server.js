import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import helmet from 'helmet';
import healthRoutes from './routes/health.route.js';
import apiRoutes from './routes/api.route.js';
import { rateLimit, sanitizeBody } from './middleware/security.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure data directory exists for SQLite
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting on API routes
app.use('/api', rateLimit({ windowMs: 60000, max: 30 }));

// Sanitize all POST request bodies
app.use(sanitizeBody);

// Routes
app.use('/api', healthRoutes);
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
