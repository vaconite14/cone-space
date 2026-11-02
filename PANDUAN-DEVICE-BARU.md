# Pasang Cone Space di komputer khusus

Repo: https://github.com/vaconite14/cone-space (**privat**: jangan pernah diubah jadi publik, nanti berisi data klien).
Cone Space dipakai di 1 komputer khusus (Windows); GitHub dipakai sebagai backup.

## Sekali saja (±15–30 menit, kebanyakan menunggu download)

1. Buka **PowerShell** (Start → ketik "PowerShell"), lalu jalankan satu per satu:

   ```powershell
   winget install --id Git.Git -e
   winget install --id GitHub.cli -e
   ```

2. **Tutup PowerShell, buka lagi**, lalu login GitHub (pakai akun `vaconite14`):

   ```powershell
   gh auth login --web --git-protocol https
   ```

   Jawab `Y`, salin kodenya, tekan Enter, lalu Authorize di browser.

3. Ambil folder kantor:

   ```powershell
   gh repo clone vaconite14/cone-space C:\Cone-Space
   ```

4. Buka `C:\Cone-Space` di File Explorer, klik dua kali **`Setup-Kantor.cmd`**. Skrip ini memasang Node, Python, ffmpeg,
   Claude CLI, suara AI, menyiapkan server kantor dan hook, membuat shortcut **"Cone Space"** di Desktop,
   dan di akhir minta login Claude (sekali). Kalau ada peringatan Google Chrome belum terpasang, pasang dari google.com/chrome
   (dibutuhkan untuk render video).

5. Install **aplikasi Claude desktop** kalau belum ada, login, lalu buka folder kantor di tab **Code**.

## Setiap hari

- Mulai kerja: klik **Cone Space** di Desktop (ambil versi terbaru dari GitHub, nyalakan server, lalu buka rapat video).
  Server kantor dan bridge tim jalan tanpa jendela (catatannya di `.office-server.log` dan `.sena-bridge.log`)
  dan ikut mati saat komputer dimatikan.
- Kerjaan lewat chat Hizkia otomatis di-backup ke GitHub setelah setiap jawaban.
- Kerja lewat sesi Claude biasa atau edit file sendiri: klik **`Sinkron.cmd`** untuk backup.

## Kalau rapat video tidak terbuka ("This site can't be reached")

Server kantor belum jalan. Cek di PowerShell:

```powershell
cd C:\Cone-Space\claude-office; node -v; Test-Path dist\vidcall.html; node server/index.js
```

Kalau `Test-Path` menjawab `False`, build ulang: `npm.cmd install --no-fund --no-audit; npm.cmd run build`.

## Yang tidak ikut ke GitHub

- Login Claude, GitHub, Google Drive.
- Riwayat chat tim di rapat video (hasil kerjanya tetap ter-backup).
- File video (MP4/MOV/WebM) dan hasil render di `out/` / `render/`: tetap di komputer ini saja.
