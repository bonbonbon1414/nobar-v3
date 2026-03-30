# Bolakami: Nonton Bola Live Streaming & Skor Langsung

Bolakami adalah landing page sederhana dan responsif yang dibangun menggunakan Node.js dan Express. Proyek ini berfungsi sebagai situs alternatif untuk melihat jadwal pertandingan sepak bola (live scores / fixtures) menggunakan API dari **Sportmonks**.

## Fitur Utama
- **Desain Modern:** Tema "Cyberpunk Stadium" dengan efek *glassmorphism* dan mode gelap yang memanjakan mata.
- **Data Real-time:** Menampilkan jadwal dan hasil pertandingan langsung menggunakan proksi server ke API Sportmonks.
- **Responsif:** Tampilan yang optimal baik diakses melalui komputer desktop maupun perangkat seluler.
- **SEO Friendly:** Dilengkapi dengan *meta tags*, Open Graph, dan *Twitter cards* untuk pencarian dengan kata kunci bahasa Indonesia tingkat tinggi.

## Persyaratan (Prerequisites)
Pastikan Anda sudah menginstal aplikasi berikut di sistem Anda:
- [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan karena menggunakan *native fetch*)
- NPM (biasanya sudah termasuk saat instalasi Node.js)

## Cara Instalasi & Menjalankan Proyek

1. **Kloning repositori:**
   ```bash
   git clone https://github.com/bonbonbon1414/nobar-v2.git
   cd nobar-v2
   ```

2. **Instal seluruh *dependencies*:**
   ```bash
   npm install
   ```
   *(Library utama: `express`, `cors`, `dotenv`, `node-fetch`)*

3. **Konfigurasi Environment:**
   - Salin dan ubah nama file `.env.example` (jika ada) menjadi `.env`, atau buat file `.env` baru di *root folder*.
   - Tambahkan API Token dari Sportmonks:
     ```env
     PORT=3000
     SPORTMONKS_API_TOKEN=isi_dengan_token_sportmonks_anda_di_sini
     ```

4. **Jalankan *server*:**
   ```bash
   npm run dev
   # Atau jika Anda menggunakan script default: npm start
   ```

5. **Akses Situs:**
   Buka *browser* pilihan Anda dan kunjungi [http://localhost:3000](http://localhost:3000).

---

*Dibuat untuk memberikan pengalaman nonton bareng (nobar) terbaik dengan jadwal dan skor otomatis yang akurat tiap harinya!*
