from PIL import Image
import os

img_path = r'C:\Users\akkik\.gemini\antigravity-ide\brain\1d3b75fe-d1a1-42e9-8fe0-1e79de4de6fd\media__1783333914888.png'
img = Image.open(img_path)
width, height = img.size

piece_width = width // 5

os.makedirs('public/gallery', exist_ok=True)

for i in range(5):
    left = i * piece_width
    right = (i + 1) * piece_width
    box = (left, 0, right, height)
    piece = img.crop(box)
    piece.save(f'public/gallery/cert_{i+1}.png')

print("Cropped into 5 images.")
