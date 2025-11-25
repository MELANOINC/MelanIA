/**
 * Clients Model
 * MELANO INC - Proprietary
 * 
 * Manages client (tenant) data for multi-tenant SaaS architecture
 */

const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate a secure API key for a client
 * @returns {string} Generated API key
 */
const generateApiKey = () => {
  return `alex_${uuidv4().replace(/-/g, '')}`;
};

/**
 * Initialize clients table
 */
const initTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      api_key VARCHAR(64) UNIQUE NOT NULL,
      whatsapp_numero VARCHAR(20),
      activo BOOLEAN DEFAULT true,
      configuracion JSONB DEFAULT '{}',
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

/**
 * Create a new client
 * @param {Object} clientData - Client information
 * @returns {Promise<Object>} Created client
 */
const create = async ({ nombre, email, whatsapp_numero, configuracion = {} }) => {
  const api_key = generateApiKey();
  
  const result = await db.query(
    `INSERT INTO clientes (nombre, email, api_key, whatsapp_numero, configuracion)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nombre, email, api_key, whatsapp_numero, activo, configuracion, fecha_creacion`,
    [nombre, email, api_key, whatsapp_numero, JSON.stringify(configuracion)]
  );
  
  return result.rows[0];
};

/**
 * Find a client by ID
 * @param {number} id - Client ID
 * @returns {Promise<Object|null>} Client or null
 */
const findById = async (id) => {
  const result = await db.query(
    `SELECT id, nombre, email, whatsapp_numero, activo, configuracion, fecha_creacion, fecha_actualizacion
     FROM clientes WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

/**
 * Find a client by API key
 * @param {string} apiKey - Client API key
 * @returns {Promise<Object|null>} Client or null
 */
const findByApiKey = async (apiKey) => {
  const result = await db.query(
    `SELECT id, nombre, email, whatsapp_numero, activo, configuracion
     FROM clientes WHERE api_key = $1`,
    [apiKey]
  );
  return result.rows[0] || null;
};

/**
 * List all clients with pagination
 * @param {number} limit - Number of results
 * @param {number} offset - Offset for pagination
 * @returns {Promise<Array>} List of clients
 */
const findAll = async (limit = 50, offset = 0) => {
  const result = await db.query(
    `SELECT id, nombre, email, whatsapp_numero, activo, fecha_creacion, fecha_actualizacion
     FROM clientes
     ORDER BY fecha_creacion DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
};

/**
 * Update a client
 * @param {number} id - Client ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object|null>} Updated client or null
 */
const update = async (id, { nombre, email, whatsapp_numero, activo, configuracion }) => {
  const fields = [];
  const values = [];
  let paramIndex = 1;
  
  if (nombre !== undefined) {
    fields.push(`nombre = $${paramIndex++}`);
    values.push(nombre);
  }
  if (email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    values.push(email);
  }
  if (whatsapp_numero !== undefined) {
    fields.push(`whatsapp_numero = $${paramIndex++}`);
    values.push(whatsapp_numero);
  }
  if (activo !== undefined) {
    fields.push(`activo = $${paramIndex++}`);
    values.push(activo);
  }
  if (configuracion !== undefined) {
    fields.push(`configuracion = $${paramIndex++}`);
    values.push(JSON.stringify(configuracion));
  }
  
  if (fields.length === 0) return findById(id);
  
  fields.push(`fecha_actualizacion = CURRENT_TIMESTAMP`);
  values.push(id);
  
  const result = await db.query(
    `UPDATE clientes SET ${fields.join(', ')} WHERE id = $${paramIndex}
     RETURNING id, nombre, email, whatsapp_numero, activo, configuracion, fecha_creacion, fecha_actualizacion`,
    values
  );
  
  return result.rows[0] || null;
};

/**
 * Regenerate API key for a client
 * @param {number} id - Client ID
 * @returns {Promise<Object|null>} Client with new API key
 */
const regenerateApiKey = async (id) => {
  const newApiKey = generateApiKey();
  
  const result = await db.query(
    `UPDATE clientes SET api_key = $1, fecha_actualizacion = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING id, nombre, email, api_key, activo`,
    [newApiKey, id]
  );
  
  return result.rows[0] || null;
};

/**
 * Delete a client (soft delete by setting activo = false)
 * @param {number} id - Client ID
 * @returns {Promise<boolean>} Success status
 */
const deactivate = async (id) => {
  const result = await db.query(
    `UPDATE clientes SET activo = false, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = $1`,
    [id]
  );
  return result.rowCount > 0;
};

module.exports = {
  initTable,
  create,
  findById,
  findByApiKey,
  findAll,
  update,
  regenerateApiKey,
  deactivate,
};
