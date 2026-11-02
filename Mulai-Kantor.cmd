@echo off
rem Klik dua kali: ambil versi terbaru dari GitHub, nyalakan server kantor + Hizkia, lalu buka rapat video tim.
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\bin;%LOCALAPPDATA%\Programs\Python\Python312;%APPDATA%\npm;C:\Program Files\nodejs;%PATH%"

echo Mengambil perubahan dari device lain...
git pull --rebase --autostash -q || echo [!] Sinkron gagal. Kantor tetap dibuka; minta Hizkia bantu cek "git status".

rem Halaman rapat video yang terbaru dipakai server (server membaca dari dist\)
if exist "claude-office\dist" copy /y "claude-office\public\vidcall.html" "claude-office\dist\vidcall.html" >nul

rem Server kantor jalan tanpa jendela; catatannya ada di .office-server.log
powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/c cd /d claude-office && node server/index.js > ..\.office-server.log 2>&1' -WindowStyle Hidden"
timeout /t 3 /nobreak >nul
rem Bridge tim jalan tanpa jendela; catatannya ada di .sena-bridge.log
powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/c node sena-bridge.mjs > .sena-bridge.log 2>&1' -WindowStyle Hidden"
start "" "http://127.0.0.1:3334/vidcall.html"
