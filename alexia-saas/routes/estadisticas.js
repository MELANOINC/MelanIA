/**
 * Statistics Routes
 * MELANO INC - Proprietary
 * 
 * API endpoints for analytics and statistics
 */

const express = require('express');
const router = express.Router();
const Eventos = require('../models/eventos');
const Conversaciones = require('../models/conversaciones');
const { authenticateApiKey } = require('../middleware/auth');
const { logger } = require('../config/logger');
const db = require('../config/database');

/**
 * GET /api/estadisticas
 * Get statistics for the authenticated client
 */
router.get('/',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const desde = req.query.desde ? new Date(req.query.desde) : null;
      const hasta = req.query.hasta ? new Date(req.query.hasta) : null;
      
      // Get event stats
      const eventStats = await Eventos.getStats(clientId, desde, hasta);
      
      // Get conversation count
      let conversationQuery = `
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN estado = 'activa' THEN 1 END) as activas,
          COUNT(CASE WHEN estado = 'cerrada' THEN 1 END) as cerradas
        FROM conversaciones
        WHERE cliente_id = $1
      `;
      const convParams = [clientId];
      let paramIndex = 2;
      
      if (desde) {
        conversationQuery += ` AND fecha_inicio >= $${paramIndex++}`;
        convParams.push(desde);
      }
      if (hasta) {
        conversationQuery += ` AND fecha_inicio <= $${paramIndex++}`;
        convParams.push(hasta);
      }
      
      const convResult = await db.query(conversationQuery, convParams);
      const convStats = convResult.rows[0];
      
      res.json({
        success: true,
        data: {
          eventos: eventStats,
          conversaciones: {
            total: parseInt(convStats.total),
            activas: parseInt(convStats.activas),
            cerradas: parseInt(convStats.cerradas)
          },
          periodo: {
            desde: desde ? desde.toISOString() : null,
            hasta: hasta ? hasta.toISOString() : null
          }
        }
      });
    } catch (error) {
      logger.error('Error fetching statistics', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  }
);

/**
 * GET /api/estadisticas/mensajes-por-dia
 * Get message count per day for the last N days
 */
router.get('/mensajes-por-dia',
  authenticateApiKey,
  async (req, res) => {
    try {
      const clientId = req.client.id;
      const days = Math.min(parseInt(req.query.days) || 30, 90);
      
      const result = await db.query(`
        SELECT 
          DATE(fecha) as dia,
          COUNT(CASE WHEN tipo = 'message_received' THEN 1 END) as recibidos,
          COUNT(CASE WHEN tipo = 'message_sent' THEN 1 END) as enviados
        FROM eventos
        WHERE cliente_id = $1 
          AND fecha >= CURRENT_DATE - $2 * INTERVAL '1 day'
          AND tipo IN ('message_received', 'message_sent')
        GROUP BY DATE(fecha)
        ORDER BY dia DESC
      `, [clientId, days]);
      
      res.json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      logger.error('Error fetching daily stats', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch daily statistics' });
    }
  }
);

module.exports = router;
