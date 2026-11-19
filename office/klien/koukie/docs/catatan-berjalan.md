# Catatan berjalan Koukie

- **2026-11-18**: Sena memberi izin edit sheet STOCK KOUKIE, hanya tab BARANG MASUK dan BARANG KELUAR.
- **2026-11-18**: `MASUK BAZAAR` = stok awal untuk season bazaar baru. `RESTOCK` = tambah stok ke bazaar yang sedang berjalan.
- **2026-11-18**: Input stok rutin dikerjakan dengan model haiku, mengikuti `docs/sop-input-stok.md`.
- **2026-11-18**: Barang kembali ke GUDANG setelah bazaar di lokasi itu tutup: masuk GUDANG dengan tujuan `DATA STOK`
  (keluar dari lokasi bazaar dengan `PINDAH GUDANG`).
- **2026-11-18**: STATUS RETUR = barang terjual yang dikembalikan pembeli. Baris PENJUALAN aslinya ditandai `RETUR`
  supaya stoknya kembali.
- **2026-11-18**: PIK AVENUE belum buka bazaar lagi; diabaikan dulu (belum ada tab STOCK, tidak dihitung di STOCK GLOBAL).
- **2026-11-19**: Transfer JISOO BLUE/PINK/BUTTER dari CENTRAL MARKET ke GUDANG tanggal 16-Sep-2026 (permintaan Sena, bazaar CM tutup).
  28 pasang (56 baris): BARANG KELUAR baris 689–716 (PINDAH GUDANG, KE GUDANG), BARANG MASUK baris 1542–1569 (DATA STOK, DARI CENTRAL MARKET).
  Sudah dicek: stok CM cukup, stok CM sekarang 0 untuk semua size yang dipindah (kecuali JISOO PINK & BUTTER size 6 tidak ikut, sisa 1).
- **2026-11-19**: Transfer GRACE TOP dari CENTRAL MARKET ke GUDANG tanggal 16-Sep-2026, 31 pasang (62 baris): SKY BLUE (tanpa M),
  FUSHIA (tanpa 2), BABY PINK (tanpa 2, 4), MINT (tanpa M). BARANG KELUAR baris 717–747, BARANG MASUK baris 1570–1600.
  Sena akan update stok per tanggal satu-satu; minus yang sudah ada di GUDANG (mis. BABY PINK size 4) diabaikan dulu atas permintaan Sena.
- **2026-11-19**: Transfer SMS ke GUDANG tanggal 23-Sep-2026, 59 pasang (118 baris): BARANG KELUAR baris 748–806, BARANG MASUK baris 1601–1659.
  Ditahan (belum ditulis, perlu konfirmasi Sena): DA HAE TERRACOTTA size 2 (stok SMS 0), DA HAE FUSHIA size 2 (stok SMS 0),
  DA HAE BABY PINK size 10 (diminta 2, stok SMS 1), LIGHT DRESS WHITE (nama item LIGHT, warna WHITE?), SALLY (warna tidak disebut),
  GRACE TOP BLUE (GRACE TOP tidak punya warna BLUE; SKY BLUE?).
  Catatan: qty di daftar Sena adalah jumlah pcs per size (bukan jumlah baris). Sudah salah input sekali lalu diperbaiki di baris yang sama.
