# -*- coding: utf-8 -*-
"""
Red Devils Stand · Visual asset generator
Hand-drawn favicon, apple-touch-icon and OG share image with Pillow.
No official club crest is used — all original geometric shapes + text.
"""
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "images")
os.makedirs(IMG, exist_ok=True)

RED = (218, 41, 28)
RED_DARK = (124, 21, 14)
INK = (20, 20, 20)
GOLD = (201, 162, 39)
GOLD_SOFT = (227, 199, 102)
WHITE = (255, 255, 255)

FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"
FONT_REG = r"C:\Windows\Fonts\arial.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def draw_stripes(draw, w, h, step=46):
    """Stand stripes: a layer of translucent dark stripes over red."""
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(-h, w + h, step):
        od.polygon([(x, 0), (x + step // 2, 0),
                    (x + step // 2 + h, h), (x + h, h)],
                   fill=(0, 0, 0, 26))
    return overlay


def shield_points(cx, cy, scale):
    """Shield points centred on (cx, cy), sized by scale."""
    hw = scale * 0.34
    top = cy - scale * 0.36
    bottom_v = cy + scale * 0.40
    side = cy + scale * 0.12
    return [(cx - hw, top), (cx + hw, top),
            (cx + hw, side), (cx, bottom_v),
            (cx - hw, side)]


def make_icon(size):
    """A square icon (rounded red base + dark shield + white MU + gold edge)."""
    S = size * 8  # Supersample, then shrink for smoother edges
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    radius = int(S * 0.18)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=radius, fill=RED)
    img.alpha_composite(draw_stripes(d, S, S, step=S // 6))

    # Gold outline
    d.rounded_rectangle([int(S*0.05), int(S*0.05), S-int(S*0.05), S-int(S*0.05)],
                        radius=int(radius*0.8), outline=GOLD, width=max(3, S//70))

    # Dark shield
    pts = shield_points(S // 2, S // 2, S * 0.62)
    d.polygon(pts, fill=INK)
    d.line(pts + [pts[0]], fill=GOLD_SOFT, width=max(3, S//80))

    # MU inside the shield
    f = font(FONT_BOLD, int(S * 0.34))
    text = "MU"
    tb = d.textbbox((0, 0), text, font=f)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text((S//2 - tw//2, S//2 - th//2 - int(S*0.03)), text,
           font=f, fill=WHITE)

    return img.resize((size, size), Image.LANCZOS)


def make_og(w=1200, h=630):
    """Build the social share image."""
    img = Image.new("RGBA", (w, h), RED)
    d = ImageDraw.Draw(img)
    img.alpha_composite(draw_stripes(d, w, h, step=70))

    # Gold bar on the left
    d.rectangle([0, 0, 14, h], fill=GOLD)

    # Small shield in the top right
    crest = make_icon(150)
    img.alpha_composite(crest, (w - 205, 60))

    # Main title (English)
    f_title = font(FONT_BOLD, 72)
    d.text((70, 150), "RED DEVILS STAND", font=f_title, fill=WHITE)

    # Subtitle
    f_sub = font(FONT_BOLD, 38)
    d.text((74, 278), "A MANCHESTER UNITED FAN SITE",
           font=f_sub, fill=GOLD_SOFT)

    # Divider
    d.line([74, 350, 820, 350], fill=(255, 255, 255, 120), width=3)

    # Feature line
    f_foot = font(FONT_REG, 32)
    d.text((74, 380), "Real fixtures · First team · History & legends · Original match notes",
           font=f_foot, fill=(255, 255, 255))
    f_small = font(FONT_REG, 26)
    d.text((74, h - 70), "Hand-written HTML · CSS · JavaScript  ·  Hosted on GitHub Pages",
           font=f_small, fill=(255, 220, 200))

    return img


def main():
    # Favicon 32
    make_icon(32).save(os.path.join(IMG, "favicon-32.png"))
    # Apple touch icon 180
    make_icon(180).save(os.path.join(IMG, "apple-touch-icon.png"))
    # An extra 64 favicon as backup
    make_icon(64).save(os.path.join(IMG, "favicon-64.png"))
    # OG image
    og = make_og().convert("RGB")
    og.save(os.path.join(IMG, "og-image.jpg"), quality=88)
    print("assets generated:")
    for f in sorted(os.listdir(IMG)):
        p = os.path.join(IMG, f)
        print(" ", f, os.path.getsize(p), "bytes")


if __name__ == "__main__":
    main()
