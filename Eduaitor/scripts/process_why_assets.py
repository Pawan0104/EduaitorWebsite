import glob
import os
import shutil
from PIL import Image

SRC = r"C:\Users\pawan\.cursor\projects\d-EduAitor-Website\assets"
DEST = r"D:\EduAitor-Website\Eduaitor\public\why"
NAV_CROP = 100

MAPPINGS = [
    ("*01_Why_EduAItor_Hero*", "01-hero.png"),
    ("*02_Reality*", "02-reality.png"),
    ("*03_Why_Schools*", "03-choose.png"),
    ("*04_The_EduAItor_Philosophy*", "04-philosophy.png"),
    ("*05_The_EduAItor_Difference*", "05-difference.png"),
    ("*06_Designed*", "06-pillars.png"),
    ("*07_Our_Promise*", "07-promise.png"),
    ("*08_Our_Vision*", "08-vision.png"),
    ("*09_Why_It_Matters*", "09-matters.png"),
    ("*10_Final_CTA*", "10-cta.png"),
]

PHOTO_CROPS = {
    "02-reality.png": [
        ("challenge-photo.png", lambda body: photo_bbox(body, 0, 520, 80, 520)),
        ("solution-photo.png", lambda body: photo_bbox(body, 520, 1024, 80, 520)),
    ],
    "07-promise.png": [
        ("promise-photo.png", lambda body: photo_bbox(body, 640, 1024, 60, 520)),
    ],
    "08-vision.png": [
        ("vision-photo.png", lambda body: photo_bbox(body, 640, 1024, 60, 520)),
    ],
    "09-matters.png": [
        ("matters-photo.png", lambda body: photo_bbox(body, 320, 704, 80, 520)),
    ],
    "10-cta.png": [
        ("cta-photo.png", lambda body: photo_bbox(body, 640, 1024, 60, 520)),
    ],
}


def find_source(pattern: str) -> str:
    matches = glob.glob(os.path.join(SRC, pattern))
    if not matches:
        raise FileNotFoundError(f"No file matching {pattern} in {SRC}")
    if len(matches) > 1:
        matches.sort(key=lambda p: os.path.getmtime(p), reverse=True)
    return matches[0]


def photo_bbox(im, x0, x1, y0, y1, thresh=735, pad=4):
    px = im.load()
    minx, miny, maxx, maxy = 10**9, 10**9, -1, -1
    for y in range(max(0, y0), min(im.height, y1)):
        for x in range(max(0, x0), min(im.width, x1)):
            r, g, b = px[x, y]
            if r + g + b < thresh:
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if maxx < 0:
        return None
    minx = max(0, minx - pad)
    miny = max(0, miny - pad)
    maxx = min(im.width - 1, maxx + pad)
    maxy = min(im.height - 1, maxy + pad)
    return (minx, miny, maxx + 1, maxy + 1)


os.makedirs(DEST, exist_ok=True)
created = []

for pattern, dest_name in MAPPINGS:
    src_path = find_source(pattern)
    dest_path = os.path.join(DEST, dest_name)
    shutil.copy2(src_path, dest_path)
    created.append(dest_path)

    im = Image.open(dest_path).convert("RGB")
    w, h = im.size
    body = im.crop((0, NAV_CROP, w, h))
    body_name = dest_name.replace(".png", "-body.png")
    body_path = os.path.join(DEST, body_name)
    body.save(body_path, optimize=True)
    created.append(body_path)

    if dest_name in PHOTO_CROPS:
        for photo_name, bbox_fn in PHOTO_CROPS[dest_name]:
            box = bbox_fn(body)
            if not box:
                print(f"WARN: no photo region for {photo_name}")
                continue
            photo = body.crop(box)
            photo_path = os.path.join(DEST, photo_name)
            photo.save(photo_path, optimize=True)
            created.append(photo_path)

print("=== Files under public/why ===")
for path in sorted(created):
    im = Image.open(path)
    size_bytes = os.path.getsize(path)
    print(f"{os.path.basename(path)}\t{im.width}x{im.height}\t{size_bytes:,} bytes")
