# 🏢 Cone Space — Panduan

Kantor virtual berisi tim agen AI yang dikoordinasi Sena (Manager). Salinan sistem dari kantor Val yang lain,
dikosongkan untuk scope baru: isi klien/proyek dan sesuaikan agennya sesuai kebutuhan.

| | Agen | Kerjaannya |
|---|---|---|
| 👓 | **Sena** – Manager | Terima brief, bagi tugas, cek hasil, lapor ke kamu |
| 🔎 | **Salomo** – Riset Tren & Ide | Tren, ide, analisis kompetitor (pakai web search) |
| 📊 | **Omri** – Analis Data | Analisis data/performa dari file yang kamu berikan, rekap + grafik |
| ✍️ | **Daud** – Scriptwriter & Caption | Naskah video pendek/panjang, carousel, thread, caption |
| 📅 | **Saul** – Planner & Strategi | Kalender konten, jadwal, timeline produksi, strategi |
| ✉️ | **Yerobeam** – Email Marketing & Brand | Copy email, brand deal, follow-up (hanya draft) |
| 🎬 | **Yehu** – Video Editor (Remotion) | Storyboard, motion graphic, video dari kode, render MP4 |
| 💰 | **Menahem** – Keuangan | Catat transaksi & cek budget di Google Sheets |

Klien/proyek ada di `office/klien/<klien>/` (lihat `office/klien/README.md`): `CLAUDE.md` berisi aturan,
`docs/` berisi pengetahuan, dan folder kerja. Daftarkan setiap klien di tabel "Pekerjaan Val" di `CLAUDE.md`.

## Mulai pakai
1. Isi tabel klien di `CLAUDE.md` dan buat folder kliennya (atau minta Sena: "bantu aku siapin klien baru, tanya aku satu-satu").
2. Klik dua kali `Mulai-Kantor.cmd` (atau shortcut **Cone Space** di Desktop) untuk membuka **rapat video tim**: tiap agen tampil sebagai avatar pixel art, menyala hijau dan ngomong lewat gelembung chat saat bekerja.
3. Kasih brief langsung dari panel **Chat** di rapat video (dijawab lewat `sena-bridge.mjs`, yang ikut dinyalakan `Mulai-Kantor.cmd`),
   atau buka sesi Claude Code di folder ini, lalu kasih brief.

## Struktur
```
CLAUDE.md                 ← instruksi Manager (Sena) + alur kerja
.claude/agents/           ← definisi tiap agen
office/klien/             ← satu folder per klien/proyek
office/data/tasks.js      ← catatan tugas (diupdate Sena), dibaca office/dashboard.html
video/                    ← proyek video Remotion (dibuat saat dibutuhkan)
```

Rapat video ada di `claude-office/public/vidcall.html` (`npm run build` menyalinnya ke `dist/` agar disajikan server kantor).

Repo privat `vaconite14/cone-space`; cara pasang: [PANDUAN-DEVICE-BARU.md](PANDUAN-DEVICE-BARU.md).

## Kustomisasi
- Ganti nama/kepribadian agen: edit file di `.claude/agents/`, tabel di `CLAUDE.md`, `TEAM` di `sena-bridge.mjs`,
  `AGENT_NAME_MAP` di `claude-office/hooks/py/tracker.py`, `TEAM` + `LOOKS` di `vidcall.html`, dan `AGENTS` di `office/dashboard.html`.
