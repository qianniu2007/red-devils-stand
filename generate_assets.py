# -*- coding: utf-8 -*-
"""
红魔看台 · 视觉资产生成脚本
用 Pillow 手绘 favicon、apple-touch-icon 与 OG 分享图。
不使用任何官方队徽，全部为原创几何图形 + 文字。
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
FONT_CN = r"C:\Windows\Fonts\simhei.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def draw_stripes(draw, w, h, step=46):
    """看台斜纹：在红色底上叠一层半透明深色条纹。"""
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(-h, w + h, step):
        od.polygon([(x, 0), (x + step // 2, 0),
                    (x + step // 2 + h, h), (x + h, h)],
                   fill=(0, 0, 0, 26))
    return overlay


def shield_points(cx, cy, scale):
    """以 (cx,cy) 为中心、scale 为整体尺寸的盾形顶点。"""
    hw = scale * 0.34
    top = cy - scale * 0.36
    bottom_v = cy + scale * 0.40
    side = cy + scale * 0.12
    return [(cx - hw, top), (cx + hw, top),
            (cx + hw, side), (cx, bottom_v),
            (cx - hw, side)]


def make_icon(size):
    """生成一个正方形图标（红色圆角底 + 深色盾 + 白 MU + 金边）。"""
    S = size * 8  # 超采样，最后缩小，边缘更平滑
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    radius = int(S * 0.18)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=radius, fill=RED)
    img.alpha_composite(draw_stripes(d, S, S, step=S // 6))

    # 金色描边
    d.rounded_rectangle([int(S*0.05), int(S*0.05), S-int(S*0.05), S-int(S*0.05)],
                        radius=int(radius*0.8), outline=GOLD, width=max(3, S//70))

    # 深色盾形
    pts = shield_points(S // 2, S // 2, S * 0.62)
    d.polygon(pts, fill=INK)
    d.line(pts + [pts[0]], fill=GOLD_SOFT, width=max(3, S//80))

    # 盾内 MU
    f = font(FONT_BOLD, int(S * 0.34))
    text = "MU"
    tb = d.textbbox((0, 0), text, font=f)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text((S//2 - tw//2, S//2 - th//2 - int(S*0.03)), text,
           font=f, fill=WHITE)

    return img.resize((size, size), Image.LANCZOS)


def make_og(w=1200, h=630):
    """生成社交分享图。"""
    img = Image.new("RGBA", (w, h), RED)
    d = ImageDraw.Draw(img)
    img.alpha_composite(draw_stripes(d, w, h, step=70))

    # 左侧深色竖块
    d.rectangle([0, 0, 14, h], fill=GOLD)

    # 右上小盾
    crest = make_icon(200)
    img.alpha_composite(crest, (w - 260, 70))

    # 主标题（中文）
    f_cn = font(FONT_CN, 118)
    d.text((70, 150), "红魔看台", font=f_cn, fill=WHITE)

    # 副标题（含中文，用黑体以保证中文正常）
    f_sub = font(FONT_CN, 38)
    d.text((74, 300), "RED DEVILS STAND · 曼联中文球迷站",
           font=f_sub, fill=GOLD_SOFT)

    # 分隔线
    d.line([74, 372, 760, 372], fill=(255, 255, 255, 120), width=3)

    # 底部技术说明
    f_foot = font(FONT_CN, 30)
    d.text((74, 400), "真实赛程 · 一线队 · 队史传奇 · 原创观赛笔记",
           font=f_foot, fill=(255, 255, 255))
    f_small = font(FONT_BOLD, 26)
    d.text((74, h - 70), "Hand-written HTML · CSS · JavaScript  ·  Hosted on GitHub Pages",
           font=f_small, fill=(255, 220, 200))

    return img


def main():
    # favicon 32
    make_icon(32).save(os.path.join(IMG, "favicon-32.png"))
    # apple touch icon 180
    make_icon(180).save(os.path.join(IMG, "apple-touch-icon.png"))
    # 额外一个 64 的 favicon 备用
    make_icon(64).save(os.path.join(IMG, "favicon-64.png"))
    # OG 图
    og = make_og().convert("RGB")
    og.save(os.path.join(IMG, "og-image.jpg"), quality=88)
    print("assets generated:")
    for f in sorted(os.listdir(IMG)):
        p = os.path.join(IMG, f)
        print(" ", f, os.path.getsize(p), "bytes")


if __name__ == "__main__":
    main()
