const Ticket = require('../models/Ticket');
const { validationResult } = require('express-validator');
const { createToken, verifyToken } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const User = require('../models/user');

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
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    const passwordMatch = await bcrypt.compare(password, user.password);
    const token = createToken(user._id);

    if (!user) {
      return res.status(401).json({ error: 'Autentikasi gagal' });
    }
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Autentikasi gagal' });
    }
    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Gagal melakukan autentikasi' });
  }
};

async function findUserByUsername(username) {
  const user = await User.findOne({ username });

  return user;
}