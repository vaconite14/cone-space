# Panduan logika pencatatan keuangan Val (untuk Fern / agen keuangan)

Ringkasan semua aturan yang sudah Val ajarkan, tanpa transaksi ke rekening orang lain. Dibuat 2 Nov 2026 supaya bisa dipakai di kantor lain yang tidak punya memory. Sumber lengkap: `catatan-berjalan.md` dan `README.md` di folder yang sama.

## 1. Sheet dan struktur
- Google Sheets "Keuangan Format Keren" (ID `1QFqEIa2Pzo66eQYTQobbyg4ui8SJ5tOuDCRUc1aP2xM`). Hanya sheet berawalan `Catat -` yang diisi; sheet lain terhitung otomatis dan **jangan ditimpa** (DASHBOARD, Laporan, Profil Kekayaan Awal/Kemampuan Menabung ubah hanya kalau Val minta).
- `Catat - Pengeluaran`, `Catat - Pendapatan`: kolom B:F = Tanggal, Kategori, Rincian, Rekening, Nominal. Data mulai baris 7.
- `Catat - Pindah Kas/Nabung`: B:F = Tanggal, Dari, Ke, Nominal, Biaya Admin. Tabel saldo per rekening di H2:J14 (Total Kas di I2).
- `Catat - Utang` (kiri E:I bayar utang; kanan K:O terima utang), `Catat - Piutang`, `Catat - Investasi` (tabel pembelian F:L, baris pertama F11).
- Kekayaan Bersih ada di DASHBOARD L11. Rekening: BCA, Seabank, Gopay, Dana, Uang Tunai. BRI (milik Val) tidak jadi rekening di sheet: uang keluar ke BRI = pengeluaran, uang masuk dari BRI = pemasukan.
- Kategori pengeluaran (dropdown): Asuransi, BPJS, Daily Food, Digital, Gigi, Household, Keluarga, Perpuluhan, Persembahan, Sedekah, Transport, Weekend, Wifi, Vtuber, Jajan, Pemborosan, SpayLater, Cooking, Living, Jualan, Darurat, Self Reward, Lainnya. Pendapatan: Gaji, Freelance, Online Shop, Hadiah, Bunga Tabungan Seabank, Kembalian, Lainnya.

## 2. Aturan penulisan (wajib)
- **Rincian = teks mutasi apa adanya** (nama merchant/penerima). Fern tidak menebak isi belanjaan; catatan tambahan boleh di kurung, mis. "(TGL 29/09)". Untuk Dana pakai nama transaksi di app Dana (Steam Purchase, TikTok, dll.).
- Tanggal format M/D/YYYY, nominal angka polos. Tanggal pakai **tanggal posting bank** (BCA memposting malam hari, bisa geser 1 hari dari app).
- **Tidak boleh ada baris kosong** di tengah tabel. Baris yang dihapus: kosongkan lalu urutkan ulang supaya rapat.
- **Selalu urut tanggal (lama ke baru)** untuk Pengeluaran, Pendapatan, Pindah Kas (dan tabel Utang). Cara: `sortRange` kolom Tanggal, B sampai F, tanpa header (baris kosong ikut ke bawah).
- **Baris kosong pertama dicari dari data**: `get_values` kolom B sampai ujung; jangan hitung manual atau percaya hitungan lama. Cek tujuan masih kosong sebelum menulis. Dua kali ada baris lama tertimpa karena salah hitung. Tulis per blok (40-60 baris). Kalau grid habis, tambah baris (appendDimension) lalu salin format+dropdown dari baris contoh (copyPaste PASTE_FORMAT dan PASTE_DATA_VALIDATION).
- **Hanya satu penulis pada satu waktu.** Maksimal 3-4 agen paralel (pernah kena rate limit).
- Selisih kecil lama jangan diperbaiki diam-diam; list dan tanya Val. Anomali lama tidak disentuh kecuali diminta.
- Selisih akhir yang tidak ada sebabnya diselesaikan dengan **satu baris penyesuaian** (Pengeluaran Digital "Penyesuaian saldo ...") hanya dengan persetujuan Val.
- Transaksi pending di bank yang uangnya sudah keluar boleh dicatat sekarang (tanggal sesuai TGL di teks).

## 3. Logika Pindah Kas antar rekening Val
- Pindah antar rekening sendiri dicatat **satu kali** di Pindah Kas, bukan sebagai pengeluaran + pemasukan.
- **Sisi pencatatan:** yang melibatkan BCA ditulis dari sisi BCA; Seabank<->Gopay/Dana dari sisi Seabank; Gopay<->Dana dari sisi Dana. Saat mengerjakan rekening lain, periksa dulu barisnya sudah ada supaya tidak dobel.
- **Top up Gopay/Dana hanya Pindah Kas kalau nomor tujuan akhiran 3800 (milik Val).** Nomor lain = Pengeluaran (biasanya bensin atau tip ojol, kategori Transport; tanya Val kalau ragu) + biaya admin terpisah (Digital "Biaya Transfer").
- **Biaya admin** (kolom Biaya Admin Pindah Kas): top up Gopay dari BCA/Seabank Rp1.000, ke Dana dari Seabank Rp400, BI-FAST Rp2.500. Contoh: mutasi top up Gopay Rp51.000 = Rp50.000 dipindah + Rp1.000 admin.
- Top up Gopay/Dana yang **tidak ada pasangannya** di BCA, Seabank, atau Dana = uang masuk dari luar = Pendapatan **Lainnya** (rekening Gopay/Dana, Rincian "GoPay top up").
- **Tarik tunai (Indomaret dll.) dari bank = Pindah Kas ke Uang Tunai** (admin 0). Pengeluaran tunai dicatat dengan Rekening Uang Tunai.
- Saldo Uang Tunai dikonfirmasi Val (sisa uang tunai harus pas).

## 4. Kategori per merchant / jenis transaksi (bukan orang)
- **Makan:** restoran/warung/kafe/minuman umum = Daily Food. **Hari Sabtu/Minggu** untuk restoran yang ambigu (aturan Imperial, Pappajack Tokyo Hub, dll.) = **Weekend**; hari lain Daily Food. OVO untuk jajan = Weekend (dulu Daily Food; mulai Oktober 2026 Weekend). Mixue, ShopeePay = **Pemborosan**. McDonald's = Daily Food. YOUTAP (mesin McD) = Daily Food.
- **Toko tidak jelas** (Indomaret, Alfamart/Alfa, Familymart, BLTS PIK 2, IDM Indoma, Dua Saudara, Anggrek Snack, toko kelontong) = **Household**. **Wellings = apotek = Household**. **Toko Yanti** = daging ayam (Household). Rahma Buah dll. buah = Cooking atau Household sesuai pola; Tokosusun Courier Service = makan delivery = Daily Food.
- **Transport:** nama tempat/lokasi di mutasi Gopay (apartemen, rumah sakit, stasiun, halte, mall, bandara, ICE BSD, "Osaka/Tokyo Riverside Apartment", Allegro, Puri Cinere, Tzu Chi) = Gojek/Gocar = **Transport**. MRT, KRL, Transjakarta, Flazz (top up kartu) = Transport. Bensin = Transport. Kalau tidak yakin, tanya Val.
- **GoSend** = Darurat (kirim barang). **GoTagihan wifi** (Biznet; Rp250.000 dulu, sekarang Rp150.000 di Gopay atau Rp155.000 di Seabank) = **Wifi**. Daftar/tagihan wifi lain = Wifi. CircleOne = wifi apartemen.
- **Living:** sewa/pelunasan apartemen, listrik/air/IPL, Securindo/Secureparkin (membership parkir; pakai Living kalau milik Val). **Persembahan:** "Gereja Presbiterian" (Bukit Sion), biasanya QRIS BCA, selalu Persembahan. "Grha Pengharapan" = nama tempat (Transport).
- **Vtuber** (pengeluaran terkait channel Aizora Sena): Trakteer (PT Komunika Lintas Maya, PT Apresia/Apresiasi Karya Nusant), **Google Play = top up koin TikTok untuk sawer**, TikTok (koin), hadiah acara/komisi art. Nominal kembar di hari yang sama bukan ganda: catat semuanya. Google Play yang kemudian di-refund = Pemborosan.
- **Digital:** "Settlement amount paid for order number ..." (belanja online), biaya transfer, langganan (Netflix, Spotify). **Jualan:** keperluan bisnis CF. **Darurat:** talangan, denda (mis. Popbox telat ambil paket), service motor, GoSend, biaya mendadak. **SpayLater:** bayar tagihan SPinjam/SpayLater (pengeluaran), sedangkan **SPinjam masuk = Pendapatan Lainnya** (bukan Utang). **Sedekah/Hadiah/Lainnya** sesuai penjelasan Val.
- **Steam Purchase** = Pemborosan.
- **Dana "Merchants"** di PDF = lihat app: Steam (Pemborosan), TikTok/Trakteer (Vtuber), gereja (Persembahan). **Dana Bisnis Withdrawal** = Pendapatan Lainnya. Dana "Cash Code/Sendmoney 11 Jun" bukan transaksi nyata (artefak PDF), steam "Failed" tidak dicatat.

## 5. Pendapatan
- **Gaji** = Gaji kantor/penggajian tetap (Avenue Property). Honor/fee freelance (PayPal, OCBC via transfer SGD, Orenji, V-Gen, Sociabuzz, Fliptech) = **Freelance**; gaji Bareness ± 300 SGD = Freelance.
- **Online Shop:** Shopee/Tokopedia Seller Wallet. **Bunga Tabungan Seabank:** bunga harian dan bonus Seabank (Rp5-68). Pendapatan Tudor/fee besar sesuai penjelasan Val (Freelance). Pemasukan yang tidak jelas pengirimnya: **konfirmasi Val dulu**.
- **Refund:** pembelian tetap dicatat (kategori Pemborosan kalau ia di-refund), pengembalian = Pendapatan **Lainnya** ("Pengembalian Dana - ...").
- **Uang lewat/numpang** (masuk lalu diteruskan): dicatat dua-duanya, masuk **Lainnya** dan keluar **Lainnya**.
- **Utang/Piutang:** jangan jadikan Piutang untuk uang wifi/uang masak dari orang lain (itu Pendapatan Lainnya dan Pengeluaran Wifi). Pembayaran utang masuk `Catat - Utang` tabel bayar; penerimaan pinjaman di tabel terima.
- **Investasi (BIBIT.ID, Sucorinvest Money Market Fund):** bukan pengeluaran; tulis di `Catat - Investasi` (Tanggal, nama produk, harga beli NAV, jumlah unit, rekening).

## 6. Rekonsiliasi dan ritme kerja
- **Ritme final (Val):** tiap hari kirim screenshot transaksi (+ pengeluaran Tunai dan konteks singkat bila perlu); **saldo semua rekening seminggu sekali**; **awal bulan berikutnya PDF mutasi bulan lalu** untuk pengecekan penuh.
- Alur: catat batch → urutkan → baca saldo di Pindah Kas H2:J14 → cocokkan dengan saldo Val → tanya hanya yang tidak jelas → catat aturan baru di `catatan-berjalan.md`.
- PDF mutasi dibaca dengan `pdftotext -layout` (BCA, Seabank, Gopay, Dana semua punya lapisan teks). Mutasi Gopay punya "Coins" yang memotong nominal: catat nominal yang benar-benar keluar dari saldo (nominal bersih).
- Saldo bank diurutkan per bulan: cocokkan saldo awal+kredit−debit dengan saldo akhir; Seabank dan BCA harus cocok ke rupiah; Gopay dan Dana dibandingkan dengan saldo app (Dana tidak punya saldo berjalan di PDF).
- Mutasi Dana bisa terbatas (batas unduh 3 bulan per hari); screenshot app bisa dipakai sebagai cross-check tapi PDF lebih lengkap; scroll berurutan agar tidak loncat.
- Tanya Val dalam daftar ringkas berkelompok **dengan rekening + tanggal + nominal** supaya bisa dicek manual, dan tahan baris yang belum jelas (jangan ditulis).

## 7. Batasan keamanan
- Agen keuangan hanya mengelola Google Sheets Val di atas. Google Drive lain read-only; Notion hanya di Val's Creator HQ. Tidak mengirim apa pun atas nama Val.
- Jangan menyimpan nomor rekening lengkap atau PDF mentah di repo (cukup 4 digit terakhir; milik Val: BCA akhiran 2761, Seabank 8855, BRI 0505, Gopay/Dana 3800).
