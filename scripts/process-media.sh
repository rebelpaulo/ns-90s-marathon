#!/usr/bin/env bash
# Converte os renders do Higgsfield (raw/) nos ficheiros servidos pelo site (public/media/).
# Uso: scripts/process-media.sh <pasta-raw>   (still-1..6.png, clip-1..6.mp4)
set -euo pipefail
RAW="${1:?pasta raw}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/media"
mkdir -p "$OUT"
for n in 1 2 3 4 5 6; do
  # capa da cassete (still em alta)
  ffmpeg -v error -y -i "$RAW/still-$n.png" -vf "scale=760:-2" -c:v libwebp -quality 78 "$OUT/still-$n.webp"
  # clip para scrub: 540x960, GOP curto (seeks baratos no telemóvel), sem áudio
  ffmpeg -v error -y -i "$RAW/clip-$n.mp4" -an \
    -vf "scale=540:-2:flags=lanczos,unsharp=5:5:0.5:5:5:0.0" \
    -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -profile:v high \
    -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$OUT/clip-$n.mp4"
  # poster = 1.º frame do clip (sem salto poster→vídeo)
  ffmpeg -v error -y -i "$OUT/clip-$n.mp4" -frames:v 1 -c:v libwebp -quality 80 "$OUT/clip-$n.webp"
  echo "ok $n: $(du -h "$OUT/clip-$n.mp4" | cut -f1) clip, $(du -h "$OUT/still-$n.webp" | cut -f1) still"
done
