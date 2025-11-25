/**
 * Alexia SaaS Backend
 * MELANO INC - Proprietary
 * 
 * Main entry point for the Alexia Bot SaaS backend service.
 * Multi-tenant architecture supporting multiple clients with WhatsApp integration.
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { logger } = require('../config/logger');
const db = require('../config/database');

// Models
const Clientes = require('../models/clientes');
const Conversaciones = require('../models/conversaciones');
const Eventos = require('../models/eventos');
const ConfiguracionCliente = require('../models/configuracion_cliente');

// Routes
const clientesRoutes = require('../routes/clientes');
const webhookRoutes = require('../routes/webhook');
const conversacionesRoutes = require('../routes/conversaciones');
const estadisticasRoutes = require('../routes/estadisticas');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'X-Admin-Key']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'alexia-saas',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/clientes', clientesRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/conversaciones', conversacionesRoutes);
app.use('/api/estadisticas', estadisticasRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

/**
 * Initialize database tables
 */
const initDatabase = async () => {
  try {
    await Clientes.initTable();
    await Conversaciones.initTable();
    await Eventos.initTable();
    await ConfiguracionCliente.initTable();
    logger.info('Database tables initialized');
  } catch (error) {
    logger.error('Failed to initialize database', { error: error.message });
    throw error;
  }
};

/**
 * Start the server
 */
const start = async () => {
  try {
    await initDatabase();
    
    app.listen(PORT, () => {
      logger.info(`Alexia SaaS backend running on http://localhost:${PORT}`);
      console.log(`🤖 Alexia SaaS backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await db.pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await db.pool.end();
  process.exit(0);
});

start();

module.exports = app;
