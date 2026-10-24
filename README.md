# StaySpace — Platform Booking Kos & Hotel Modern (Liquid Glass UI)

Website transaksi pemesanan kos-kosan dan hotel modern dengan estetika **Liquid Glass**, terinspirasi dari pengalaman visual Airbnb. Dibuat sebagai tugas demonstrasi PKL / Startup Booking.

---

## 🚀 Fitur Utama

### 1. Beranda (Home Page)
- **Liquid Glass Navbar:** Efek transparan dengan backdrop blur modern, logo StaySpace, navigasi halaman, badge wishlist dinamis, dan quick role switcher (Pengguna ↔ Admin).
- **Hero Section:** Headline visual elegan dengan floating search bar.
- **Pencarian Multi-Kriteria:** Filter berdasarkan tujuan kota (Semarang, Yogyakarta, Bandung, Jakarta, Malang), tipe akomodasi (Kos / Hotel), dan tanggal mulai.
- **Kategori Instan:** Tab kategori filter cepat (Semua, Kos Putri, Kos Campur, Hotel Butik, Hotel Bintang 5).
- **Rekomendasi Pilihan:** Kartu properti dengan foto slider, rating bintang, kota, fasilitas, dan harga.
- **Highlight 5 Kota:** Semarang, Yogyakarta, Bandung, Jakarta, Malang dengan foto estetik.
- **Why Choose StaySpace:** 4 pilar keunggulan layanan dengan icon modern.

### 2. Katalog Kos & Hotel (Explore Page)
- **Airbnb-style Layout:** Grid kartu properti interaktif dengan micro-interactions.
- **Filter Komprehensif:**
  - Pilihan 5 kota populer.
  - Tipe properti (Semua, Kos bulanan, Hotel harian).
  - Slider rentang harga maksimum dinamis.
  - Filter fasilitas checklist (WiFi, AC, Kamar Mandi Dalam, Water Heater, Dapur, Parkir Mobil, Kolam Renang, Smart TV).
- **Sorting Fleksibel:** Rekomendasi, Harga Terendah, Harga Tertinggi, dan Rating Tertinggi.
- **Wishlist Heart Button:** Simpan atau hapus favorit secara langsung dari card.

### 3. Detail Properti (Property Detail Page)
- **Airbnb 5-Photo Grid Gallery:** 1 foto utama besar + 4 foto pendukung interior.
- **Informasi Lengkap:** Detail tipe kamar, ukuran kamar (m²), rating & jumlah ulasan, alamat spesifik.
- **Badge Host Terverifikasi:** Superhost profile dengan waktu respon cepat.
- **Fasilitas & House Rules:** Icon SVG untuk fasilitas serta daftar tata tertib hunian.
- **Interactive Location Map Mockup:** Visual lokasi dan pin penunjuk alamat.
- **Sticky Booking Widget:** Kalkulasi harga otomatis sesuai durasi (bulan untuk kos, malam untuk hotel), diskon promo otomatis, dan rincian biaya layanan.

### 4. Booking & Pembayaran Simulasi (Booking Page)
- **Form Data Pemesan:** Validasi nama lengkap, email, nomor telepon/WhatsApp, tanggal check-in, dan durasi sewa.
- **Pilihan Metode Pembayaran Simulasi:**
  - **QRIS Instan:** QR Code interaktif dengan verifikasi otomatis.
  - **Virtual Account Bank:** BCA, Mandiri, BNI, BRI.
  - **E-Wallet:** GoPay, ShopeePay, OVO, DANA.
- **Disclaimer Simulasi:** Pemberitahuan transparan bahwa transaksi hanya simulasi edukatif dan tidak memotong saldo riil.
- **Ringkasan Biaya Real-time:** Menampilkan subtotal, service fee, promo potongan harga, dan total biaya.

### 5. Halaman Booking Berhasil & Cetak Bukti (Booking Success Page)
- **Animasi Confetti Perayaan:** Efek visual confetti saat pemesanan selesai dikonfirmasi.
- **Voucher Resmi StaySpace:** Kode transaksi unik (format `STY-YYYYMMDD-XXXX`), detail pemesan, nama properti, jadwal menginap, dan breakdown biaya.
- **Fitur Cetak Bukti Pemesanan:** Tombol langsung membuka dialog cetak browser (`window.print()`) dengan template rapi siap simpan ke PDF.

### 6. Dashboard Pengguna (Dashboard Page)
- **Profil Pengguna:** Nama, email, nomor HP, peran akun, dan ringkasan metrik (total booking, favorit, total transaksi).
- **Tab Riwayat Pemesanan:** Daftar semua riwayat sewa dengan filter status (*Dikonfirmasi*, *Selesai*, *Dibatalkan*), tombol cetak bukti, dan modal detail transaksi.
- **Tab Wishlist / Favorit:** Kumpulan properti yang telah disimpan oleh pengguna.

### 7. Dashboard Admin Sederhana (Admin Dashboard Page)
- **Ringkasan Metrik Bisnis:**
  - Total Properti (Kos vs Hotel)
  - Total Transaksi Masuk
  - Estimasi Total Pendapatan Platform
  - Rata-rata Rating Platform
- **Manajemen Properti (CRUD):**
  - **Tambah Properti Baru:** Modal form input data kos/hotel, alamat, foto, harga, fasilitas, dan ketentuan.
  - **Edit Properti:** Ubah data properti yang sudah ada.
  - **Hapus Properti:** Hapus properti dummy dari katalog dengan konfirmasi.
- **Manajemen Transaksi:** Tabel transaksi lengkap dengan dropdown untuk mengubah status pemesanan (*Dikonfirmasi*, *Selesai*, *Dibatalkan*).
- **Fitur Reset Demo:** Kembalikan seluruh data contoh ke setelan pabrik kapan saja dengan 1 klik.

---

## 🛠️ Teknologi yang Digunakan
- **Frontend Framework:** React.js (v18) + Vite
- **Styling:** Tailwind CSS (dengan tema warna kustom Coral `#ff385c` dan Charcoal) + Efek Liquid Glass (backdrop-blur, border semi-transparan, soft glow shadows)
- **Routing:** React Router DOM (v6)
- **Ikon:** Lucide React
- **Penyimpanan Data:** `localStorage` (tanpa ketergantungan database eksternal)
- **Animasi:** Canvas Confetti

---

## 💻 Cara Menjalankan Secara Lokal

1. **Pastikan Node.js terpasang** (versi 18+ direkomendasikan).
2. **Buka terminal di folder project:**
   ```bash
   cd "d:/Tugas Hesti/FILE BMU/KULIAH/PKL/tugasstartup-fasya-booking"
   ```
3. **Instal dependensi:**
   ```bash
   npm install
   ```
4. **Jalankan development server:**
   ```bash
   npm run dev
   ```
5. **Buka browser:**
   Akses `http://localhost:3000` atau `http://127.0.0.1:3000`.

---

## 👤 Akun Simulasi Cepat
- **Customer / Pengguna:** Fasya Nabila (`fasya@example.com`)
- **Administrator:** Admin StaySpace (`admin@stayspace.id`)
- *Dapat beralih peran kapan saja melalui tombol tombol "Pengguna / Admin" di navbar atas atau menu login.*
