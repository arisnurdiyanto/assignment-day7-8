exports.validateRequestBody = (req, res, next) => {
    const { namaAcara, tanggalAcara, hargaTiket } = req.body;
  
    if (!namaAcara || !tanggalAcara || !hargaTiket) {
      return res.status(400).json({ error: 'Semua bidang harus diisi' });
    }
    next();
};