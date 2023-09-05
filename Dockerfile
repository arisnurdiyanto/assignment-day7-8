# Menggunakan node.js sebagai base image
FROM node:14

# Membuat direktori kerja dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstall dependensi proyek
RUN npm install

# Menyalin seluruh kode proyek ke direktori kerja
COPY . .

# Menjalankan aplikasi
CMD ["node", "app.js"]