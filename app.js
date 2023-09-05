const express = require('express');
const app = express();
const db = require('./app/db');
const ticketRoutes = require('./app/routes/ticketRoutes');

app.use(express.json());

app.use('/api', ticketRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Token tidak valid' });
  } else {
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});