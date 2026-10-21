#!/usr/bin/env bash
# Uso: scripts/encode.sh <pasta com clip-01..11.mp4>  → media/clip-NN.mp4 + media/still-NN.webp (1.º frame)
set -euo pipefail
RAW="${1:?pasta raw}"; OUT="$(cd "$(dirname "$0")/.." && pwd)/media"; mkdir -p "$OUT"
for f in "$RAW"/clip-*.mp4; do
  n=$(basename "$f" .mp4 | sed 's/clip-//')
  ffmpeg -v error -y -i "$f" -an -vf "scale=540:-2:flags=lanczos" \
    -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$OUT/clip-$n.mp4"
  ffmpeg -v error -y -i "$OUT/clip-$n.mp4" -frames:v 1 -c:v libwebp -quality 80 "$OUT/still-$n.webp"
  echo "ok $n $(du -h "$OUT/clip-$n.mp4" | cut -f1)"
done
