const Ticket = require('../models/Ticket');
const { validationResult } = require('express-validator');
const { createToken, verifyToken } = require('../middleware/authMiddleware');

// Fungsi untuk membuat tiket baru
exports.createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat tiket' });
  }
};

// Fungsi untuk mendapatkan semua tiket
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil tiket' });
  }
};

// Fungsi untuk mengupdate tiket
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Tiket tidak ditemukan' });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengupdate tiket' });
  }
};

// Fungsi untuk menghapus tiket
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ error: 'Tiket tidak ditemukan' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus tiket' });
  }
};

// Fungsi untuk login-token
exports.login = (req, res) => {
  const userId = 123; 
  const token = createToken(userId);

  res.json({ token });
};