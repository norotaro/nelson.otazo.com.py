#!/bin/sh
# Renders scripts/og-image.html to public/og.png (1200x630). macOS: Chrome + sips.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,900 --virtual-time-budget=5000 \
  --screenshot="$TMP/og.png" "file://$PWD/scripts/og-image.html" 2>/dev/null
sips -c 630 1200 "$TMP/og.png" --out public/og.png >/dev/null
rm -r "$TMP"
