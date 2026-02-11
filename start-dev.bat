@echo off
echo Starting DyslexiaFont.org dev server...
echo.
echo The app will open in your browser at http://localhost:3000
echo Press Ctrl+C to stop the server when you're done.
echo.

cd /d "%~dp0app"
start "" http://localhost:3000
npm run dev