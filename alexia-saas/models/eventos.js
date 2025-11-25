/**
 * Events Model
 * MELANO INC - Proprietary
 * 
 * Tracks all events and messages in the system for auditing
 */

const db = require('../config/database');

/**
 * Event types enum
 */
const EVENT_TYPES = {
  MESSAGE_RECEIVED: 'message_received',
  MESSAGE_SENT: 'message_sent',
  CONVERSATION_STARTED: 'conversation_started',
  CONVERSATION_CLOSED: 'conversation_closed',
  CLIENT_CREATED: 'client_created',
  CLIENT_UPDATED: 'client_updated',
  WEBHOOK_RECEIVED: 'webhook_received',
  ERROR: 'error'
};

/**
 * Initialize events table
 */
const initTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS eventos (
      id SERIAL PRIMARY KEY,
      cliente_id INTEGER REFERENCES clientes(id),
      conversacion_id INTEGER REFERENCES conversaciones(id),
      tipo VARCHAR(50) NOT NULL,
      contenido TEXT,
      metadata JSONB DEFAULT '{}',
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_eventos_cliente_id ON eventos(cliente_id)
  `);
  
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_eventos_conversacion_id ON eventos(conversacion_id)
  `);
  
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha)
  `);
};

/**
 * Record a new event
 * @param {Object} data - Event data
 * @returns {Promise<Object>} Created event
 */
const create = async ({ cliente_id, conversacion_id, tipo, contenido, metadata = {} }) => {
  const result = await db.query(
    `INSERT INTO eventos (cliente_id, conversacion_id, tipo, contenido, metadata)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [cliente_id, conversacion_id, tipo, contenido, JSON.stringify(metadata)]
  );
  return result.rows[0];
};

/**
 * Find events by conversation
 * @param {number} conversacionId - Conversation ID
 * @param {number} limit - Results limit
 * @returns {Promise<Array>} List of events
 */
const findByConversation = async (conversacionId, limit = 100) => {
  const result = await db.query(
    `SELECT * FROM eventos 
     WHERE conversacion_id = $1
     ORDER BY fecha ASC
     LIMIT $2`,
    [conversacionId, limit]
  );
  return result.rows;
};

/**
 * Find events by client
 * @param {number} clienteId - Client ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} List of events
 */
const findByClient = async (clienteId, { limit = 100, offset = 0, tipo = null, desde = null, hasta = null } = {}) => {
  let query = `SELECT * FROM eventos WHERE cliente_id = $1`;
  const params = [clienteId];
  let paramIndex = 2;
  
  if (tipo) {
    query += ` AND tipo = $${paramIndex++}`;
    params.push(tipo);
  }
  
  if (desde) {
    query += ` AND fecha >= $${paramIndex++}`;
    params.push(desde);
  }
  
  if (hasta) {
    query += ` AND fecha <= $${paramIndex++}`;
    params.push(hasta);
  }
  
  query += ` ORDER BY fecha DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
  params.push(limit, offset);
  
  const result = await db.query(query, params);
  return result.rows;
};

/**
 * Get event statistics for a client
 * @param {number} clienteId - Client ID
 * @param {Date} desde - Start date
 * @param {Date} hasta - End date
 * @returns {Promise<Object>} Event statistics
 */
const getStats = async (clienteId, desde = null, hasta = null) => {
  let query = `
    SELECT tipo, COUNT(*) as cantidad
    FROM eventos
    WHERE cliente_id = $1
  `;
  const params = [clienteId];
  let paramIndex = 2;
  
  if (desde) {
    query += ` AND fecha >= $${paramIndex++}`;
    params.push(desde);
  }
  
  if (hasta) {
    query += ` AND fecha <= $${paramIndex++}`;
    params.push(hasta);
  }
  
  query += ` GROUP BY tipo`;
  
  const result = await db.query(query, params);
  return result.rows.reduce((acc, row) => {
    acc[row.tipo] = parseInt(row.cantidad);
    return acc;
  }, {});
};

module.exports = {
  EVENT_TYPES,
  initTable,
  create,
  findByConversation,
  findByClient,
  getStats,
};
