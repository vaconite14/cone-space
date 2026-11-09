# Panduan Keuangan (Menahem)

> Status: **DRAFT, menunggu konfirmasi Sena** untuk poin-poin bertanda (?) di bawah.
> Mode: uji coba. Draft baris dikirim di chat dan ditulis ke sheet hanya setelah Sena bilang oke.
> File ini hanya berisi struktur dan aturan, tanpa nomor rekening, saldo, atau mutasi mentah.

## Cakupan
Menahem **hanya** memegang sheet **KEUNGAN CAINI**. Sheet "Keuangan Format Keren" (milik Val) tidak disentuh;
logika pencatatannya (`panduan-logika-pencatatan.md`) dipakai sebagai dasar, lalu disesuaikan untuk CAINI di bawah ini.
Kalau aturan di file ini berbeda dengan panduan Format Keren, **file ini yang menang** untuk CAINI.

- Nama: **KEUNGAN CAINI** (template "versi Maret 2026"), locale `en_US`, zona waktu Asia/Bangkok (= WIB)
- ID: `1ee7TjTLNG7cmBPm4bV4QDVbdLutxhXVr7zsvkjyKfvE`
- Link: https://docs.google.com/spreadsheets/d/1ee7TjTLNG7cmBPm4bV4QDVbdLutxhXVr7zsvkjyKfvE/edit

## 1. Struktur sheet
Hanya tab berawalan `Catat -` yang diisi. Header di **baris 6**, data mulai **baris 7**, kolom A kosong.

| Tab | Kolom |
|---|---|
| `Catat - Pengeluaran` | B:F = Tanggal, Kategori, Rincian, Rekening, Nominal |
| `Catat - Pendapatan` | B:F = Tanggal, Kategori, Rincian, Rekening, Nominal |
| `Catat - Pindah Kas/Nabung` | B:F = Tanggal, Dari Rekening, Ke Rekening, Nominal, Biaya Admin. Tabel saldo per rekening di H9:I16, Total Kas di I2 |
| `Catat - Utang`, `Catat - Piutang`, `Catat - Beli Jual Barang`, `Catat - Investasi` | belum dipakai/dipelajari; baca strukturnya dulu sebelum menulis |

Tab lain (DASHBOARD, Profil, Laporan, Atur Budgeting, Mutasi Rekening Otomatis, Financial Goal Tracker, backend,
tab tersembunyi) terhitung otomatis: **jangan ditimpa**. `Atur Budgeting` hanya dibaca untuk cek budget.

## 2. Rekening di sheet CAINI
BCA, GoPay, Uang Tunai, OCBC, CIMB, SOCIABUZZ, TIKTOK.
- OCBC: rekening yang menerima gaji dari SGD (Bareness, gaji worker); biasanya diteruskan ke BCA.
- SOCIABUZZ, TIKTOK: saldo platform (pendapatan Vtuber) sebelum ditarik. (?) konfirmasi.
- Akhiran nomor GoPay/rekening milik Caini: (?) belum diketahui. Ini penting untuk aturan top up di bagian 4.

## 3. Kategori (pakai persis, kategori baru hanya ditambah Sena)
- **Pengeluaran:** Asuransi, BPJS, Daily Food, Darurat, Digital, Gaji Worker, Gigi, Household, Iuran Pemuda, Jajan,
  Keluarga, Pajak, Persembahan, Perpuluhan, Sedekah, Self Reward, SG26, Transport, Vtuber, Weekend, Wifi
- **Pendapatan:** Bunga Tabungan, Gaji, Gaji Worker, Hadiah, Iuran Wifi, Lainnya, Vtuber

Kategori Format Keren yang **tidak ada** di CAINI (Pemborosan, Living, Cooking, Jualan, SpayLater, Freelance,
Online Shop, Lainnya untuk pengeluaran) tidak dipakai. Padanannya ada di bagian 5.

## 4. Aturan penulisan (dari panduan Format Keren, berlaku di CAINI)
- Tanggal ditulis `M/D/YYYY` sesuai **tanggal posting bank**, nominal angka polos tanpa Rp dan tanpa titik.
- **Tidak boleh ada baris kosong** di tengah tabel. **Selalu urut tanggal (lama → baru)** di Pengeluaran, Pendapatan,
  dan Pindah Kas; setelah menulis, urutkan kolom B:F tanpa header.
- **Baris kosong pertama dicari dari data** (`get_values` kolom B sampai ujung), lalu cek tujuannya masih kosong sebelum
  menulis. Tulis per blok 40-60 baris. Kalau grid habis, tambah baris dan salin format serta dropdown dari baris contoh.
- Hanya satu penulis pada satu waktu.
- Cek duplikat (tanggal + nominal + rincian) sebelum menambah baris. Nominal kembar di hari yang sama bukan otomatis
  ganda; cocokkan dengan mutasi.
- Anomali lama tidak diperbaiki diam-diam: buat daftar dan tanyakan Sena. Selisih akhir yang tidak ada sebabnya diselesaikan
  dengan satu baris penyesuaian, dan hanya dengan persetujuan Sena.
- Setelah menulis, baca ulang baris yang ditulis.
- **Rincian:** CAINI selama ini memakai deskripsi singkat ("tije", "mrt", "Gaji Bareness"), bukan teks mutasi mentah.
  (?) Ikuti gaya CAINI, atau pakai teks mutasi seperti di Format Keren?

## 5. Logika Pindah Kas (disesuaikan)
- Pindah antar rekening sendiri dicatat **satu kali** di Pindah Kas, bukan sebagai pengeluaran + pemasukan.
- Pola yang sudah ada di CAINI:
  - BCA → GoPay (top up): nominal bersih + Biaya Admin Rp1.000. Contoh: mutasi Rp200.000 = Rp199.000 dipindah + Rp1.000 admin.
  - BCA → Uang Tunai (tarik tunai): admin Rp0, kecuali bank memotong (pernah Rp2.500).
  - Uang Tunai → BCA (setor tunai), OCBC → BCA, CIMB → OCBC: admin Rp0 kecuali bank memotong.
- Sisi pencatatan: transaksi yang melibatkan BCA dicatat dari sisi BCA. Sebelum mencatat dari rekening lain, cek dulu
  barisnya belum ada.
- Top up GoPay hanya masuk Pindah Kas kalau tujuannya GoPay milik Caini; top up ke nomor lain = Pengeluaran. (?) akhiran nomor.
- Top up GoPay yang tidak ada pasangannya di BCA = uang masuk dari luar = Pendapatan Lainnya.
- Pengeluaran tunai dicatat dengan Rekening Uang Tunai; saldo Uang Tunai dikonfirmasi Sena.

## 6. Kategori per merchant (aturan Format Keren yang dipetakan ke CAINI)
- **Makan:** restoran/warung/kafe = Daily Food; makan di luar saat Sabtu/Minggu atau jalan-jalan = Weekend (pola CAINI sama).
  Jajanan kecil (es, snack, minuman) = Jajan (CAINI punya kategori ini; Format Keren tidak). Hal yang di Format Keren
  masuk Pemborosan (Mixue, Steam): (?) Jajan atau Self Reward?
- **Toko tidak jelas** (Indomaret, Alfamart, toko kelontong, apotek, MR DIY) = Household. Belanja bahan makanan:
  Daily Food atau Household sesuai pola (indomaret/grandlucky di CAINI pernah dicatat Daily Food). (?) konfirmasi.
- **Transport:** Gojek/Gocar (nama lokasi di mutasi GoPay), MRT, KRL, Transjakarta ("tije"), Flazz, bensin, CityTrans.
- **Wifi:** tagihan wifi. Uang wifi dari orang lain = Pendapatan **Iuran Wifi** (CAINI punya kategori khusus, bukan Lainnya).
- **Persembahan / Perpuluhan / Sedekah:** sesuai nama. **Iuran Pemuda:** iuran komunitas pemuda gereja.
- **Digital:** langganan (Google One, Netflix, Spotify), belanja online, **biaya transfer** (mis. "biaya adm tf").
- **Darurat:** talangan, denda, service, GoSend, biaya mendadak.
- **Vtuber:** pengeluaran terkait kegiatan Vtuber (top up koin, Trakteer, komisi art).
- **SG26:** pengeluaran proyek/acara SG26. (?) konfirmasi artinya.
- **Gaji Worker:** bayar SPG/worker. Pasangannya di Pendapatan **Gaji Worker** (uang dari klien untuk worker): dua-duanya dicatat.
- **Asuransi, BPJS, Pajak, Gigi, Keluarga, Self Reward:** sesuai nama.

## 7. Pendapatan
- **Gaji:** gaji tetap dan fee kerja (Koukie Olivetree, Bareness, Orenji, Burgundy, Pagar Ayu). CAINI tidak punya kategori
  Freelance, jadi fee freelance juga masuk Gaji.
- **Gaji Worker:** uang dari klien untuk dibayarkan ke worker (termasuk pencairan SGD di OCBC untuk Penpen).
- **Vtuber:** hasil Vtuber (Sociabuzz, TikTok).
- **Iuran Wifi:** iuran wifi dari orang lain. **Hadiah:** angpao, kado. **Bunga Tabungan:** bunga bank.
- **Lainnya:** patungan (Spotify/Netflix), ganti uang makan, reimburse, refund, uang lewat/numpang bayar.
- **Uang lewat** (masuk lalu diteruskan): catat dua-duanya. Pemasukan yang tidak jelas pengirimnya: **tanya Sena dulu**,
  jangan ditulis "Gatau ini apaan".
- **Refund:** pembelian tetap dicatat; pengembaliannya = Pendapatan Lainnya ("Pengembalian Dana - ...").
- Uang dari orang lain untuk wifi/masak bukan Piutang.

## 8. Ritme dan rekonsiliasi
- Ritme yang diusulkan (sama dengan Format Keren): kirim screenshot transaksi harian; saldo semua rekening seminggu sekali;
  PDF mutasi bulan lalu di awal bulan.
- Alur: catat batch → urutkan → baca saldo di Pindah Kas → cocokkan dengan saldo dari Sena → tanya yang tidak jelas
  → catat aturan baru di `catatan-berjalan.md`.
- Pertanyaan ke Sena dibuat berkelompok, lengkap dengan rekening + tanggal + nominal. Baris yang belum jelas ditahan.

## 10. Utang, Piutang, Investasi, dan pembayaran gabungan (dipelajari dari data Januari)
- **Transfer dari/ke orang lain** sering masuk `Catat - Piutang` atau `Catat - Utang`, bukan Pendapatan/Pengeluaran.
  Selalu cek kedua tab itu dulu sebelum mencatat transfer orang sebagai pemasukan/pengeluaran baru.
- `Catat - Piutang`: tabel kiri F:I = **memberi piutang** (uang keluar: Tanggal, Peminjam, Rekening, Nominal);
  tabel kanan K:N = **piutang dibayar** (uang masuk). Ringkasan sisa per peminjam di B:C.
  - Uang yang ditalangi untuk **Olivetree & Koukie** (Lalamove, belanja Shopee, dll.) = piutang ke "Olivetree & Koukie".
  - **Pettycash** dari Olivetree/Koukie = pembayaran piutang (tabel kanan), bukan pendapatan.
  - Patungan acara (mis. "Kokas Gabungan"): bagian teman = piutang keluar, iuran yang masuk = piutang dibayar,
    bagian Caini sendiri = Pengeluaran.
- `Catat - Utang`: tabel kiri F:J = **bayar utang** (Tanggal, Rincian/pemberi, Rekening, Nominal, Biaya Bunga);
  tabel kanan L:P = **terima pinjaman**. Pemberi utang yang dipakai: BCA Credit Card, Cicilan Ipad, Gigi,
  Shopee Pay Later, HORA ASIA.
- **Pembayaran gabungan (SPayLater, kartu kredit BCA)**: satu debit besar di mutasi dirinci jadi beberapa baris di
  tanggal yang sama (pengeluaran per kategori, piutang, dan/atau bayar utang) yang **tidak muncul satu-satu di mutasi**.
  Cara cek: jumlah baris rincian di tanggal itu = nominal debit. Contoh pola: bayar SPayLater = beberapa makan + kas
  piutang + cicilan.
- **Kartu kredit BCA** (dua kartu: Mastercard dan UnionPay, satu tagihan gabungan). Tagihan terbit sekitar tanggal 12,
  dibayar dari BCA (dana sering dari OCBC). Belanja dari tagihan dirinci di tanggal pembayaran: belanja = Pengeluaran
  per kategori (rekening BCA), talangan orang = Piutang, cicilan/pembelian besar = Utang "BCA Credit Card". Biaya
  overlimit dan bea meterai ikut dihitung. Cek: jumlah rincian = nominal pembayaran.
- **GoPay**: di riwayat GoPay, transaksi dengan metode pembayaran kartu (bukan "GoPay Saldo") dibayar pakai kartu kredit,
  jadi masuk rincian tagihan kartu kredit, bukan rekening GoPay. Pasangan pembelian + refund di hari yang sama (mis.
  YouTube Music) selama ini tidak dicatat. Transfer ke merchant perorangan lewat GoPay = beli makanan (lihat rincian Sena).
- **Bayar ke Koukie (QR "Koukie" di mutasi BCA)**: kasir Koukie memberi Caini uang tunai hasil penjualan, lalu Caini
  mentransfer nilainya ke rekening Koukie. Dicatat sebagai **Pindah Kas BCA → Uang Tunai** (bukan pengeluaran).
- **Transfer ke OVO/e-wallet SPG** (mis. SPG menalangi kembalian customer, Caini mengganti lewat OVO dan menerima tunai
  dari SPG): dicatat **Pindah Kas BCA → Uang Tunai**.
- **Google Play** di GoPay: nominal di tagihan sudah termasuk pajak (mis. Rp15.000 + PPN = Rp16.650). Catat sesuai tagihan.
- Top up GoPay yang masuk di GoPay akhir bulan tapi baru terposting di BCA tanggal 1 bulan berikutnya: tetap dicatat dengan
  tanggal BCA. Saldo GoPay akhir bulan di sheet akan kurang sebesar top up itu; ini wajar.
- **Potong utang (non-tunai)**: kalau bagian orang lain atas pengeluaran Caini dibayar dengan mengurangi utang Caini ke
  orang itu, catat dua baris di rekening yang sama: bayar utang (Catat - Utang) dan Pendapatan Lainnya dengan nominal sama.
  Saldo tidak berubah, sisa utang berkurang.
- **Pembayaran kartu kredit sebagian**: rincian diambil dari item di tagihan secara berurutan; item yang belum lunas dibawa
  ke pembayaran berikutnya dan dicatat di `catatan-berjalan.md`.
- **Cicilan kartu kredit** (belanja yang diubah jadi cicilan BCA): catat tiap cicilan sebagai Pengeluaran di tanggal
  pembayaran kartu kredit, rincian "<nama> (cicilan x/n, kartu kredit)". Biaya bunga kartu kredit = Darurat.
- **Refund e-wallet**: pembelian tetap dicatat sebesar nominal asli, refund dicatat terpisah sebagai Pendapatan Lainnya.
- **Selalu baca seluruh tab** (Investasi, Utang, Piutang) sampai baris terakhir sebelum menyimpulkan ada transaksi yang
  belum tercatat.
- **Kas Timotius** (dana kelompok yang dikelola Caini): selalu tanya Sena dulu untuk transaksi yang terkait.
- `Catat - Investasi`: pencairan reksa dana (BIBIT, Sucorinvest Money Market Fund) dicatat di tabel jual (N:V),
  rekening tujuan BCA. Bukan pendapatan.

- **Cek akhir setiap bulan (wajib):** setelah rekonsiliasi, bandingkan saldo akhir bulan tiap rekening di sheet dengan
  saldo akhir di mutasi bank (lihat `Mutasi Rekening Otomatis`, atau hitung dari semua tab `Catat -`). Nama rekening harus
  **persis** sama dengan daftar (huruf besar/kecil berpengaruh: "bca" tidak terhitung sebagai BCA). Bulan belum dianggap
  selesai sebelum saldo akhir sama sampai ke rupiah.

## 9. Batasan
- Hanya sheet KEUNGAN CAINI. Tidak transfer, bayar, atau mengirim apa pun.
- Nomor rekening, saldo, dan mutasi mentah tidak disimpan di repo (paling banyak 4 digit terakhir kalau Sena mengizinkan).
