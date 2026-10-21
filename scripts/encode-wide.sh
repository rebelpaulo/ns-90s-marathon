#!/usr/bin/env bash
# Uso: scripts/encode-wide.sh <pasta com clip-01..11.mp4 em 16:9>  → media/wide/clip-NN.mp4 + still-NN.webp
set -euo pipefail
RAW="${1:?pasta raw}"; OUT="$(cd "$(dirname "$0")/.." && pwd)/media/wide"; mkdir -p "$OUT"
for f in "$RAW"/clip-*.mp4; do
  n=$(basename "$f" .mp4 | sed 's/clip-//')
  ffmpeg -v error -y -i "$f" -an -vf "scale=1280:-2:flags=lanczos" \
    -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$OUT/clip-$n.mp4"
  ffmpeg -v error -y -i "$OUT/clip-$n.mp4" -frames:v 1 -c:v libwebp -quality 80 "$OUT/still-$n.webp"
  echo "ok $n $(du -h "$OUT/clip-$n.mp4" | cut -f1)"
done
