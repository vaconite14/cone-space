@echo off
rem Klik dua kali: ambil versi terbaru dari GitHub, nyalakan server kantor + Sena, lalu buka rapat video tim.
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%LOCALAPPDATA%\Programs\Python\Python312;%APPDATA%\npm;C:\Program Files\nodejs;%PATH%"

echo Mengambil perubahan dari device lain...
git pull --rebase --autostash -q || echo [!] Sinkron gagal. Kantor tetap dibuka; minta Sena bantu cek "git status".

rem Halaman rapat video yang terbaru dipakai server (server membaca dari dist\)
if exist "claude-office\dist" copy /y "claude-office\public\vidcall.html" "claude-office\dist\vidcall.html" >nul

start "Claude Office server" /min cmd /c "cd /d claude-office && node server/index.js"
timeout /t 3 /nobreak >nul
start "Sena bridge" /min cmd /c "node sena-bridge.mjs"
start "" "http://127.0.0.1:3334/vidcall.html"
