#!/bin/bash
echo "Starting DyslexiaFont.org dev server..."
echo ""
echo "The app will open in your browser at http://localhost:3000"
echo "Press Ctrl+C to stop the server when you're done."
echo ""

cd "$(dirname "$0")/app"
open http://localhost:3000 &
npm run dev
