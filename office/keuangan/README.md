# Panduan Keuangan (Menahem)

> Status: **DRAFT, belum dikonfirmasi Sena.** Selama status ini, Menahem hanya membaca sheet.
> Mode: uji coba. Draft baris dikirim di chat, ditulis ke sheet hanya setelah Sena bilang oke.
> File ini hanya berisi struktur dan aturan. Tidak ada nomor rekening, saldo, atau mutasi mentah.

## Spreadsheet
- Nama: **KEUNGAN CAINI** (template "versi Maret 2026")
- ID: `1ee7TjTLNG7cmBPm4bV4QDVbdLutxhXVr7zsvkjyKfvE`
- Link: https://docs.google.com/spreadsheets/d/1ee7TjTLNG7cmBPm4bV4QDVbdLutxhXVr7zsvkjyKfvE/edit
- Locale `en_US`, zona waktu `Asia/Bangkok` (sama dengan WIB)

## Tab input (boleh ditulis setelah disetujui)
Semua tab input: header di **baris 6**, data mulai **baris 7**, kolom A kosong.

| Tab | Kolom (B → ...) |
|---|---|
| `Catat - Pengeluaran` | Tanggal, Kategori, Rincian, Rekening, Nominal |
| `Catat - Pendapatan` | Tanggal, Kategori, Rincian, Rekening, Nominal |
| `Catat - Pindah Kas/Nabung` | Tanggal, Dari Rekening, Ke Rekening, Nominal, Biaya Admin |
| `Catat - Utang`, `Catat - Piutang`, `Catat - Beli Jual Barang`, `Catat - Investasi` | belum dipelajari, baca dulu sebelum dipakai |

Format: tanggal ditulis sebagai tanggal (tampil `M/D/YYYY`), nominal angka polos tanpa "Rp" dan tanpa titik.

## Tab yang TIDAK boleh disentuh
`DASHBOARD`, `Profil ...`, `Cek Kesehatan Finansial`, `Level Kekayaan`, `Saran Budgeting`, `Pergerakan Kekayaan Bersih`,
`Laporan ...`, `Atur Budgeting` (hanya dibaca untuk cek budget), `Mutasi Rekening Otomatis` (terisi otomatis),
`Financial Goal Tracker`, `backend`, dan tab tersembunyi (`CARA PAKAI`, `Tutorial`, `Analisa`, `Cash Flow`).

## Kategori yang sudah dipakai
Pakai persis seperti ini. Kategori baru hanya ditambah oleh Sena (lewat `Atur Budgeting`).

- **Pengeluaran:** Asuransi, BPJS, Daily Food, Darurat, Digital, Gaji Worker, Gigi, Household, Iuran Pemuda, Jajan,
  Keluarga, Pajak, Persembahan, Perpuluhan, Sedekah, Self Reward, SG26, Transport, Vtuber, Weekend, Wifi
- **Pendapatan:** Bunga Tabungan, Gaji, Gaji Worker, Hadiah, Iuran Wifi, Lainnya, Vtuber

## Rekening (nama saja)
Yang sudah terlihat: BCA, GoPay, Uang Tunai, OCBC, CIMB. **Perlu konfirmasi Sena** apakah ada yang lain.

## Aturan pencatatan
- Transfer antar rekening sendiri (tarik/setor tunai, top up GoPay) → `Catat - Pindah Kas/Nabung`, bukan pengeluaran.
  Biaya admin transfer ditulis di kolom Biaya Admin.
- Sebelum menulis: baca baris terakhir, tulis di baris kosong berikutnya, cek duplikat (tanggal + nominal + rincian).
- Setelah menulis: baca ulang barisnya.
