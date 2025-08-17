const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./leads.db');
const routes = require('./routes/leads');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/leads', routes);

app.listen(PORT, () => {
  console.log(`Servidor backend MELANIA corriendo en http://localhost:${PORT}`);
});
