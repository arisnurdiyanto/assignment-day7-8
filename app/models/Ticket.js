const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  namaAcara: {
    type: String,
    required: true,
  },
  tanggalAcara: {
    type: Date,
    required: true,
  },
  hargaTiket: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);