@echo off
rem Simpan semua perubahan di device ini, ambil perubahan dari device lain, lalu kirim ke GitHub.
rem Dijalankan otomatis oleh sena-bridge setelah setiap jawaban; boleh juga diklik dua kali sebelum pindah device.
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;%PATH%"

git add -A
git diff --cached --quiet || git commit -q -m "Sinkron dari %COMPUTERNAME%"
git pull --rebase --autostash -q
if errorlevel 1 (
  echo [!] Ada perubahan yang bentrok dengan device lain. Minta Sena: "bantu beresin sinkron git".
  exit /b 1
)
git push -q
if errorlevel 1 (
  echo [!] Gagal kirim ke GitHub. Cek internet atau login "gh auth status".
  exit /b 1
)
echo Sinkron selesai.
