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
