from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
QA = ROOT / ".qa" / "forms"

for folder in sorted(path for path in QA.iterdir() if path.is_dir()):
    pages = sorted(folder.glob("page-*.png"))
    if not pages:
        continue
    thumbs = []
    for index, page in enumerate(pages, start=1):
        image = Image.open(page).convert("RGB")
        image.thumbnail((700, 990))
        canvas = Image.new("RGB", (image.width + 24, image.height + 54), "#e2e8f0")
        canvas.paste(image, (12, 40))
        draw = ImageDraw.Draw(canvas)
        draw.text((14, 12), f"{folder.name} · Seite {index}", fill="#0b2545")
        thumbs.append(canvas)
    columns = 2
    rows = (len(thumbs) + columns - 1) // columns
    width = max(item.width for item in thumbs) * columns + 20
    height = max(item.height for item in thumbs) * rows + 20
    sheet = Image.new("RGB", (width, height), "#94a3b8")
    cell_w = max(item.width for item in thumbs)
    cell_h = max(item.height for item in thumbs)
    for index, item in enumerate(thumbs):
        x = 10 + (index % columns) * cell_w
        y = 10 + (index // columns) * cell_h
        sheet.paste(item, (x, y))
    sheet.save(QA / f"{folder.name}-contact.png", optimize=True)
    print(QA / f"{folder.name}-contact.png")
