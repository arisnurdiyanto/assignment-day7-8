const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sistem-pemesanan-tiket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB terhubung');
  })
  .catch((error) => {
    console.error('Error saat menghubungkan MongoDB:', error);
  });