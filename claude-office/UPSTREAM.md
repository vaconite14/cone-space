# claude-office (vendored)

Salinan dari https://github.com/W17ant/Claude-Office (MIT, lihat LICENSE) pada commit 1a9ba71,
dengan modifikasi untuk Cone Space Sena:

- hooks/agent-tracker.sh + hooks/py/: kode Python dipindah ke file (Git Bash 5.3 di Windows macet di heredoc besar,
  dan argumen 65 KB melebihi batas command line Windows); fallback python3 kalau PATH aplikasi masih lama.
- hooks/py/tracker.py: nama agen Cone Space (Salomo, Daud, Saul, Yerobeam, Yehu, Omri, Menahem), status googling/opening.
- server/index.js: "/" dialihkan ke /vidcall.html (kantor isometrik lama dimatikan).
- src/events.ts: kejadian acak deploy-fail / who-broke-build / deploy-success dimatikan.
- public/vidcall.html: rapat video tim pixel art + chat dengan Hizkia.
- office.config.json: nama bos "Bos".

