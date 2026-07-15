@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ==========================================
echo   NEXUS AI Workspace OS
echo   Opening http://localhost:8899
echo ==========================================
start "" "http://localhost:8899"
python -m http.server 8899
pause
