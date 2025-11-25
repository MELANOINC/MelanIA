/**
 * Clients Routes
 * MELANO INC - Proprietary
 * 
 * API endpoints for client (tenant) management
 */

const express = require('express');
const router = express.Router();
const Clientes = require('../models/clientes');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, sanitizeInput } = require('../middleware/validation');
const { logger } = require('../config/logger');

/**
 * POST /api/clientes
 * Create a new client
 * Requires admin authentication
 */
router.post('/',
  authenticateAdmin,
  validateBody(['nombre', 'email']),
  async (req, res) => {
    try {
      const { nombre, email, whatsapp_numero, configuracion } = req.body;
      
      const client = await Clientes.create({
        nombre: sanitizeInput(nombre),
        email: sanitizeInput(email),
        whatsapp_numero: whatsapp_numero ? sanitizeInput(whatsapp_numero) : null,
        configuracion: configuracion || {}
      });
      
      logger.info('Client created', { clientId: client.id, email: client.email });
      
      res.status(201).json({
        success: true,
        data: client
      });
    } catch (error) {
      if (error.constraint === 'clientes_email_key') {
        return res.status(409).json({
          error: 'Email already exists'
        });
      }
      logger.error('Error creating client', { error: error.message });
      res.status(500).json({ error: 'Failed to create client' });
    }
  }
);

/**
 * GET /api/clientes
 * List all clients
 * Requires admin authentication
 */
router.get('/',
  authenticateAdmin,
  async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 50, 100);
      const offset = parseInt(req.query.offset) || 0;
      
      const clients = await Clientes.findAll(limit, offset);
      
      res.json({
        success: true,
        data: clients,
        pagination: { limit, offset }
      });
    } catch (error) {
      logger.error('Error listing clients', { error: error.message });
      res.status(500).json({ error: 'Failed to list clients' });
    }
  }
);

/**
 * GET /api/clientes/:id
 * Get a specific client by ID
 * Requires admin authentication
 */
router.get('/:id',
  authenticateAdmin,
  async (req, res) => {
    try {
      const client = await Clientes.findById(parseInt(req.params.id));
      
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      res.json({
        success: true,
        data: client
      });
    } catch (error) {
      logger.error('Error fetching client', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  }
);

/**
 * PUT /api/clientes/:id
 * Update a client
 * Requires admin authentication
 */
router.put('/:id',
  authenticateAdmin,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { nombre, email, whatsapp_numero, activo, configuracion } = req.body;
      
      const updated = await Clientes.update(id, {
        nombre: nombre ? sanitizeInput(nombre) : undefined,
        email: email ? sanitizeInput(email) : undefined,
        whatsapp_numero: whatsapp_numero ? sanitizeInput(whatsapp_numero) : undefined,
        activo,
        configuracion
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      logger.info('Client updated', { clientId: id });
      
      res.json({
        success: true,
        data: updated
      });
    } catch (error) {
      logger.error('Error updating client', { error: error.message });
      res.status(500).json({ error: 'Failed to update client' });
    }
  }
);

/**
 * POST /api/clientes/:id/regenerar-api-key
 * Regenerate API key for a client
 * Requires admin authentication
 */
router.post('/:id/regenerar-api-key',
  authenticateAdmin,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const client = await Clientes.regenerateApiKey(id);
      
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      logger.info('Client API key regenerated', { clientId: id });
      
      res.json({
        success: true,
        data: {
          id: client.id,
          nombre: client.nombre,
          api_key: client.api_key
        }
      });
    } catch (error) {
      logger.error('Error regenerating API key', { error: error.message });
      res.status(500).json({ error: 'Failed to regenerate API key' });
    }
  }
);

/**
 * DELETE /api/clientes/:id
 * Deactivate a client (soft delete)
 * Requires admin authentication
 */
router.delete('/:id',
  authenticateAdmin,
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await Clientes.deactivate(id);
      
      if (!success) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      logger.info('Client deactivated', { clientId: id });
      
      res.json({
        success: true,
        message: 'Client deactivated successfully'
      });
    } catch (error) {
      logger.error('Error deactivating client', { error: error.message });
      res.status(500).json({ error: 'Failed to deactivate client' });
    }
  }
);

module.exports = router;
