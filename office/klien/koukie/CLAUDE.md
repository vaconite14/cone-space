# Klien: Koukie (brand baju anak)

Brand baju anak milik Sena. Pekerjaan utama sejauh ini: **pencatatan stok barang** (masuk/keluar antar gudang & bazaar)
di Google Sheets **STOCK KOUKIE**.

## Aturan klien
- Semua input stok **wajib** mengikuti `docs/sop-input-stok.md`. Baca seluruh SOP sebelum menulis ke sheet.
- Izin tulis (2026-11-18): hanya tab `BARANG MASUK` dan `BARANG KELUAR`. Tab lain dan rumus: baca saja.
- Input stok rutin dikerjakan oleh **Menahem** (`keuangan`) dengan model **haiku** (permintaan Sena 2026-11-18).
  Hizkia memanggilnya dengan tool Agent (`subagent_type: keuangan`, `model: haiku`), lalu mengecek laporannya.
- Ragu soal nama item/warna, lokasi, atau jenis transaksi: tanya Sena, jangan menebak.
- Keputusan baru dari Sena dicatat di `docs/catatan-berjalan.md`.

## Docs
- `docs/sop-input-stok.md`: struktur sheet, jenis transaksi, langkah input, cara cek stok, format laporan.
- `docs/catatan-berjalan.md`: keputusan dan aturan baru dari Sena.
