@echo off
REM TheEquals_Game sunucusunu her zaman 8080 portunda başlatır ve portu meşgul eden işlemi kapatır

REM 8080 portunu kullanan işlemi bul ve öldür
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /F /PID %%a

REM Sunucuyu başlat
npx serve -l 8080 .
pause 