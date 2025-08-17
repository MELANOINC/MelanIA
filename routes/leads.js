const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./leads.db');

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT,
  presupuesto TEXT,
  ubicacion TEXT,
  fecha TEXT
)`);

router.post('/', (req, res) => {
  const { tipo, presupuesto, ubicacion } = req.body;
  const fecha = new Date().toISOString();
  db.run(`INSERT INTO leads (tipo, presupuesto, ubicacion, fecha) VALUES (?, ?, ?, ?)`,
    [tipo, presupuesto, ubicacion, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

module.exports = router;
