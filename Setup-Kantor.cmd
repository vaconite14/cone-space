@echo off
rem Klik dua kali SEKALI di setiap device baru (setelah folder kantor di-clone dari GitHub).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup\Setup-Kantor.ps1"
pause
