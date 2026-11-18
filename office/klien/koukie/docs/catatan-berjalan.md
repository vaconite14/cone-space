# Catatan berjalan Koukie

- **2026-11-18**: Sena memberi izin edit sheet STOCK KOUKIE, hanya tab BARANG MASUK dan BARANG KELUAR.
- **2026-11-18**: `MASUK BAZAAR` = stok awal untuk season bazaar baru. `RESTOCK` = tambah stok ke bazaar yang sedang berjalan.
- **2026-11-18**: Input stok rutin dikerjakan dengan model haiku, mengikuti `docs/sop-input-stok.md`.
- **2026-11-18**: Barang kembali ke GUDANG setelah bazaar di lokasi itu tutup: masuk GUDANG dengan tujuan `DATA STOK`
  (keluar dari lokasi bazaar dengan `PINDAH GUDANG`).
- **2026-11-18**: STATUS RETUR = barang terjual yang dikembalikan pembeli. Baris PENJUALAN aslinya ditandai `RETUR`
  supaya stoknya kembali.
- **2026-11-18**: PIK AVENUE belum buka bazaar lagi; diabaikan dulu (belum ada tab STOCK, tidak dihitung di STOCK GLOBAL).
