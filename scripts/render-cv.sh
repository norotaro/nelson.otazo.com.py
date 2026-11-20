#!/bin/sh
# Builds the site and prints /cv to public/nelson-otazo-cv.pdf. macOS: Chrome.
# Re-run after any change to the CV content (experience, projects, src/data/cv.ts)
# and commit the PDF: Netlify serves the committed file as is.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4329}"

ASTRO=./node_modules/.bin/astro

# Otherwise the PDF could be printed from whatever server already holds the port.
if curl -s "http://localhost:$PORT" >/dev/null; then
  echo "port $PORT is in use; set PORT to a free one" >&2
  exit 1
fi

"$ASTRO" build >/dev/null
# Served over HTTP, not file://: built pages load their CSS and fonts from absolute /_astro paths.
# The astro CLI serves from a detached child that outlives its parent, so stop
# whatever listens on the port; the check above proved nothing else did.
"$ASTRO" preview --port "$PORT" >/dev/null 2>&1 &
trap 'lsof -ti "tcp:$PORT" -sTCP:LISTEN | xargs kill 2>/dev/null' EXIT

for _ in $(seq 1 50); do
  curl -sf "http://localhost:$PORT/cv" >/dev/null && break
  sleep 0.2
done

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="$PWD/public/nelson-otazo-cv.pdf" "http://localhost:$PORT/cv" 2>/dev/null
echo "wrote public/nelson-otazo-cv.pdf"
