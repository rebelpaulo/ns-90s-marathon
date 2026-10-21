"""Gera public/og.jpg (1200x630) a partir do diorama 1. Uso: python3 scripts/make-og.py <still-1.png>"""
import sys, pathlib
from PIL import Image, ImageDraw, ImageFont, ImageFilter

root = pathlib.Path(__file__).resolve().parent.parent
fonts = root / "node_modules/@fontsource"
W, H = 1200, 630
bg = (15, 10, 36)
im = Image.new("RGB", (W, H), bg)

# brilho magenta
glow = Image.new("RGB", (W, H), bg)
d = ImageDraw.Draw(glow)
d.ellipse((760, 80, 1240, 640), fill=(120, 20, 90))
glow = glow.filter(ImageFilter.GaussianBlur(120))
im = Image.blend(im, glow, 0.8)

still = Image.open(sys.argv[1]).convert("RGB")
h = 760
w = round(still.width * h / still.height)
still = still.resize((w, h), Image.LANCZOS)
im.paste(still, (W - w + 30, -70))

# fade para o texto
fade = Image.new("L", (W, H), 0)
fd = ImageDraw.Draw(fade)
for x in range(W):
    a = max(0, min(255, int(255 * (1 - (x - 790) / 200))))
    fd.line([(x, 0), (x, H)], fill=a)
im = Image.composite(Image.new("RGB", (W, H), bg), im, fade)

d = ImageDraw.Draw(im)
mono = ImageFont.truetype(str(fonts / "vt323/files/vt323-latin-400-normal.woff"), 40)
shade = ImageFont.truetype(str(fonts / "bungee-shade/files/bungee-shade-latin-400-normal.woff"), 100)
bungee = ImageFont.truetype(str(fonts / "bungee/files/bungee-latin-400-normal.woff"), 30)

d.text((64, 70), "REVENGE OF THE 90s APRESENTA", font=mono, fill=(0, 226, 207))
for dx, col in ((5, (255, 46, 136)), (-5, (0, 226, 207)), (0, (255, 210, 63))):
    d.text((64 + dx, 130), "THE 90'S", font=shade, fill=col)
    d.text((64 + dx, 240), "MARATHON", font=shade, fill=col)
d.text((64, 420), "11 DEZ 2026 · MYRIAD BY SANA", font=bungee, fill=(243, 236, 255))
d.text((64, 470), "TEAM BUILDING · ANOS 90", font=mono, fill=(207, 197, 236))
# scanlines
for y in range(0, H, 4):
    d.line([(0, y), (W, y)], fill=(0, 0, 0), width=1)
im.save(root / "public/og.jpg", quality=86, optimize=True, progressive=True)
print("og ok")
