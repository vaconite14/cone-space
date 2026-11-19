# SOP Input Stok Koukie

Panduan wajib untuk mencatat stok barang Koukie (brand baju anak) di Google Sheets **STOCK KOUKIE**.
Baca seluruh file ini sebelum menulis apa pun. Kalau ada yang tidak cocok dengan SOP ini, **berhenti dan tanya**, jangan menebak.

- Spreadsheet ID: `1m1XaPK5XLLF6HxXGi_PbxcB1c36aMMmYH-Sl1sYMEmY`
- Link: https://docs.google.com/spreadsheets/d/1m1XaPK5XLLF6HxXGi_PbxcB1c36aMMmYH-Sl1sYMEmY/edit

## 1. Batas izin (dari Sena, 2026-11-18)

- **Boleh menulis hanya di 2 tab:** `BARANG MASUK` dan `BARANG KELUAR`, kolom A sampai J.
- **Tab lain hanya dibaca:** `STOCK GUDANG`, `STOCK SMS`, `STOCK TOKYO`, `STOCK CENTRAL MARKET`, `STOCK GLOBAL`,
  `STOCK ANOMALI`, `ItemList`, `Backend Barang Masuk`, `Backend Barang Keluar`. Semua rumus dibiarkan apa adanya.
- **Jangan menimpa baris yang sudah berisi.** Menghapus atau mengubah baris lama hanya kalau Sena minta secara jelas,
  dan sebutkan nomor barisnya di laporan.
- **Jangan menyisipkan atau menghapus baris** (insert/delete row). Tulis hanya ke baris kosong di bawah data terakhir.

## 2. Kolom BARANG MASUK dan BARANG KELUAR (sama persis)

| Kolom | Isi | Aturan |
|---|---|---|
| A DATE | Tanggal transaksi | Format `18-Nov-2026` (hari-BulanInggris3huruf-tahun). Kalau Sena tidak menyebut tanggal, pakai tanggal hari ini dan sebut di laporan. |
| B SKU | Kosongkan | Tulis `""`. |
| C ITEM | Nama item | Harus **persis** sama dengan baris 1 tab `ItemList`, termasuk spasi di belakang. Contoh: `DA HAE ` dan `DRESS MEI MEI ` ada spasinya. |
| D COLOR | Warna | Harus persis salah satu warna di kolom item itu pada tab `ItemList` (baris 2 ke bawah). |
| E SIZE | Ukuran | Salah satu dari: `2, 4, 6, 8, 10, 12, 14, 16` (tulis sebagai angka) atau `XS, S, M, L` (tulis sebagai teks). |
| F QTY | Jumlah | Angka bulat positif. Satu baris = satu kombinasi item + warna + size. |
| G GUDANG | Lokasi stok | Salah satu dari: `GUDANG`, `SMS`, `TOKYO`, `CENTRAL MARKET`. (`PIK AVENUE` ada di dropdown tapi tidak dihitung di rekap: kalau diminta, berhenti dan tanya.) |
| H STATUS RETUR | Kosongkan | Tulis `""` untuk transaksi baru. Lihat "Retur" di bagian 3. |
| I TUJUAN | Jenis transaksi | Lihat bagian 3. |
| J NOTES | Keterangan | Lihat bagian 3. Tulis huruf besar. (Data lama kadang huruf kecil, misal "dari gudang": biarkan, tidak memengaruhi rekap.) |

Nama lokasi di chat sering disingkat: **CM = CENTRAL MARKET**, **SMS = SMS**, **Tokyo = TOKYO**, **gudang = GUDANG**.

## 3. Jenis transaksi

### Barang keluar (tab BARANG KELUAR)

| Kejadian | GUDANG (kolom G) | TUJUAN (kolom I) | NOTES (kolom J) |
|---|---|---|---|
| Terjual | lokasi asal barang | `PENJUALAN` | channel: `SHOPEE`, `BAZAAR TOKYO`, `BAZAAR SMS`, `BAZAAR CM`, dst. |
| Dipindah ke lokasi lain | lokasi asal | `PINDAH GUDANG` | `KE <LOKASI TUJUAN>`, misal `KE TOKYO`, `KE CM`, `KE GUDANG` |
| Giveaway | lokasi asal | `GIVEAWAY` | keterangan dari Sena |
| Untuk affiliate/influencer | lokasi asal | `AFFILIATE / INFLUENCER` | nama/keterangan dari Sena |
| Diambil owner | lokasi asal | `DIAMBIL OWNER` | keterangan dari Sena |

Penjualan dan barang keluar non-pindah **cukup 1 baris** di BARANG KELUAR. Stoknya habis, tidak masuk ke mana pun.

### Barang masuk (tab BARANG MASUK)

| Kejadian | GUDANG (kolom G) | TUJUAN (kolom I) | NOTES (kolom J) |
|---|---|---|---|
| Stok awal untuk **season bazaar baru** | lokasi bazaar | `MASUK BAZAAR` | `DARI <LOKASI ASAL>` |
| Tambah stok ke **bazaar yang sedang berjalan** | lokasi bazaar | `RESTOCK` | `DARI <LOKASI ASAL>` |
| Barang baru (produksi baru) | biasanya `GUDANG` | `ITEM BARU` | keterangan dari Sena |
| Barang **kembali ke GUDANG karena bazaar di lokasi itu tutup** | `GUDANG` | `DATA STOK` | `DARI <LOKASI BAZAAR>`, misal `DARI SMS` |
| Penyesuaian / stock opname | lokasi | `DATA STOK` | keterangan dari Sena |

Kalau tidak jelas apakah ini season bazaar baru atau restock bazaar berjalan, **tanya**.
Barang kembali ke GUDANG setelah bazaar tutup juga pindah lokasi (2 baris): BARANG KELUAR dari lokasi bazaar dengan
`PINDAH GUDANG` + notes `KE GUDANG`, lalu BARANG MASUK di `GUDANG` dengan `DATA STOK` + notes `DARI <LOKASI BAZAAR>`.

### Retur (barang terjual dikembalikan pembeli)
Jangan menambah baris baru. Cari **baris PENJUALAN aslinya** di BARANG KELUAR (tanggal, item, warna, size, qty, gudang, channel),
lalu isi kolom H baris itu dengan `RETUR`. Baris berstatus RETUR tidak dihitung, jadi stoknya otomatis kembali ke lokasi itu.
- Ini satu-satunya kasus boleh mengedit baris lama, dan hanya kolom H. Sebutkan nomor barisnya di laporan.
- Kalau baris penjualannya tidak ketemu, atau ada lebih dari satu yang cocok, **tanya**.
- Kalau qty baris penjualan lebih dari qty yang diretur (misal terjual 2, retur 1), **tanya** dulu caranya.

### Pindah lokasi = SELALU 2 baris

Contoh: pindah ELENA PINK size 6, 2 pcs, dari GUDANG ke bazaar TOKYO yang sedang berjalan, tanggal 18-Nov-2026.

| Tab | DATE | SKU | ITEM | COLOR | SIZE | QTY | GUDANG | STATUS RETUR | TUJUAN | NOTES |
|---|---|---|---|---|---|---|---|---|---|---|
| BARANG KELUAR | 18-Nov-2026 | | ELENA | PINK | 6 | 2 | GUDANG | | PINDAH GUDANG | KE TOKYO |
| BARANG MASUK | 18-Nov-2026 | | ELENA | PINK | 6 | 2 | TOKYO | | RESTOCK | DARI GUDANG |

Kedua baris harus punya tanggal, item, warna, size, dan qty yang sama. Jangan pernah menulis satu sisi saja.
Kalau salah satu gagal ditulis, laporkan segera.

## 4. Langkah kerja (ikuti urutannya)

### Langkah 1: Pahami permintaan
Ubah permintaan Sena jadi daftar baris (tab, tanggal, item, warna, size, qty, gudang, tujuan, notes).
Kalau ada data yang kurang (lokasi asal, size, tujuan) atau ambigu, **berhenti dan kumpulkan pertanyaan**. Jangan menebak.

### Langkah 2: Cek nama item dan warna
1. Baca `ItemList!A1:AW1` (nama item). Cocokkan nama item persis, termasuk spasi di belakang.
2. Baca kolom item tersebut di `ItemList` (baris 2 ke bawah) dan pastikan warnanya ada persis.
3. Kalau nama/warna dari Sena sedikit berbeda (misal "fuchsia" vs `FUSHIA`, "pink" vs `SOFT PINK`), **tanya**, kecuali hanya beda huruf besar/kecil
   dan hanya ada satu pilihan yang cocok.

### Langkah 3: Cek stok di lokasi asal (untuk semua BARANG KELUAR)
Tab stok per lokasi: `GUDANG` → `STOCK GUDANG`, `SMS` → `STOCK SMS`, `TOKYO` → `STOCK TOKYO`, `CENTRAL MARKET` → `STOCK CENTRAL MARKET`.

1. Baca `'<TAB STOK>'!B3:C134` dan cari pasangan item + warna. Perkiraan nomor baris = 3 + urutan pasangan (mulai dari 0).
2. **Verifikasi**: baca `'<TAB STOK>'!B<baris>:C<baris>`. Hasilnya harus persis item + warna itu. Kalau tidak cocok, cari ulang.
3. Baca stok akhir di baris itu. Kolom STOK AKHIR per size:

   | Size | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | XS | S | M | L |
   |---|---|---|---|---|---|---|---|---|---|---|---|---|
   | Kolom | AB | AC | AD | AE | AF | AG | AH | AI | AJ | AK | AL | AM |

   Contoh: stok akhir size 6 di baris 5 → baca `'STOCK GUDANG'!AD5`.
4. Kalau stok < qty yang mau dikeluarkan, **jangan tulis**. Laporkan stoknya dan tanya Sena.
5. Untuk pindah lokasi, cek juga bahwa item + warna itu **punya baris di tab stok lokasi tujuan**. Kalau tidak ada, barangnya tidak akan
   terhitung di rekap: berhenti dan laporkan (menambah baris di tab STOCK bukan wewenang kita).

### Langkah 4: Cari baris kosong berikutnya
Untuk setiap tab tujuan (BARANG MASUK / BARANG KELUAR):
1. Lihat **posisi terakhir** di bagian 6 SOP ini (kalau ada), lalu baca jendela kecil, misalnya `'BARANG MASUK'!A1535:J1560`.
   Nilai pertama di hasil = baris 1535, nilai kedua = baris 1536, dst. Baris kosong pertama setelah data terakhir adalah target.
   Kalau jendelanya penuh, geser jendela ke bawah (misal +25 baris) sampai ketemu baris kosong.
2. **Verifikasi**: baca `'<TAB>'!A<target>:J<target>` (harus kosong) dan `'<TAB>'!A<target-1>:J<target-1>` (harus berisi).
3. **Cek duplikat**: kalau transaksi yang sama persis (tanggal, item, warna, size, qty, gudang, notes) sudah ada di 20 baris terakhir, tanya dulu.

### Langkah 5: Tulis
- Pakai `update_values` dengan range yang pasti, misalnya `'BARANG KELUAR'!A1600:J1601` untuk 2 baris. Jangan pakai `append_values`.
- Isi 10 kolom (A–J) setiap baris; kolom kosong ditulis `""`.
- Pindah lokasi: tulis baris BARANG KELUAR lalu baris BARANG MASUK pasangannya.

### Langkah 6: Cek ulang
1. Baca ulang baris yang baru ditulis: isinya harus sama dengan rencana.
2. Baca stok akhir lagi di tab stok terkait: harus berubah sesuai qty (keluar turun, masuk naik).
   Untuk pindah lokasi, total di `STOCK GLOBAL` harus **tetap sama**.
3. Kalau ada yang tidak sesuai, jangan coba-coba memperbaiki sendiri: laporkan apa yang terjadi beserta nomor barisnya.

### Langkah 7: Update posisi terakhir
Update bagian 6 di file ini dengan nomor baris terakhir yang terisi di tiap tab dan tanggalnya.

## 5. Laporan ke Hizkia (Manager)

Balas singkat dengan format:
- **Ditulis:** tab + nomor baris + isi ringkas per baris (atau "tidak ada yang ditulis").
- **Stok sebelum → sesudah** untuk tiap item + warna + size + lokasi yang berubah.
- **Perlu konfirmasi:** daftar pertanyaan (kalau ada).
- **Catatan:** stok minus, duplikat, nama yang tidak cocok, atau keanehan lain.

## 6. Posisi terakhir (diperbarui setiap selesai input)

| Tab | Baris terakhir berisi | Dicek tanggal |
|---|---|---|
| BARANG MASUK | 1897 | 2026-11-19 |
| BARANG KELUAR | 1029 | 2026-11-19 |

### Penjualan
Penjualan dicatat di 2 tempat: (1) STOCK KOUKIE, BARANG KELUAR, `TUJUAN` = `PENJUALAN`, `NOTES` = channel (mis. `BAZAAR TOKYO`); (2) LAPORAN PENJUALAN KOUKIE, tab DATA PENJUALAN BARU (baris baru di bawah data terakhir; kolom J–N pakai rumus; diskon 10% = harga jual x 10%, kalau tidak ada diskon kolom L dikosongkan). Ukuran harga: `SIZE KECIL` kecuali disebut `SIZE BESAR`.

Sena juga bisa input manual langsung di sheet, jadi angka ini hanya titik awal pencarian: selalu verifikasi (Langkah 4).
