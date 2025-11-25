/**
 * API Key Authentication Middleware
 * MELANO INC - Proprietary
 * 
 * Validates client API keys for multi-tenant access
 */

const db = require('../config/database');
const { logger } = require('../config/logger');

/**
 * Middleware to authenticate requests using API key
 * Expects X-API-Key header with a valid client API key
 */
const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  
  if (!apiKey) {
    logger.warn('Missing API key in request', { 
      path: req.path, 
      ip: req.ip 
    });
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Missing X-API-Key header' 
    });
  }
  
  try {
    const result = await db.query(
      `SELECT id, nombre, activo, configuracion 
       FROM clientes 
       WHERE api_key = $1`,
      [apiKey]
    );
    
    if (result.rows.length === 0) {
      logger.warn('Invalid API key attempt', { 
        path: req.path, 
        ip: req.ip 
      });
      return res.status(401).json({ 
        error: 'Invalid API key' 
      });
    }
    
    const client = result.rows[0];
    
    if (!client.activo) {
      logger.warn('Inactive client attempted access', { 
        clientId: client.id, 
        path: req.path 
      });
      return res.status(403).json({ 
        error: 'Client account is inactive' 
      });
    }
    
    // Attach client info to request for use in routes
    req.client = {
      id: client.id,
      nombre: client.nombre,
      configuracion: client.configuracion
    };
    
    next();
  } catch (error) {
    logger.error('Authentication error', { error: error.message });
    return res.status(500).json({ 
      error: 'Authentication service error' 
    });
  }
};

/**
 * Middleware for internal/admin routes
 * Uses a separate admin API key from environment
 */
const authenticateAdmin = (req, res, next) => {
  const apiKey = req.header('X-Admin-Key');
  const adminKey = process.env.API_KEY_SECRET;
  
  if (!apiKey || apiKey !== adminKey) {
    logger.warn('Invalid admin access attempt', { 
      path: req.path, 
      ip: req.ip 
    });
    return res.status(401).json({ 
      error: 'Admin authentication required' 
    });
  }
  
  next();
};

module.exports = { 
  authenticateApiKey, 
  authenticateAdmin 
};
