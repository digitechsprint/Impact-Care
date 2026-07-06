from PIL import Image
import os

os.makedirs('public/gallery', exist_ok=True)

for i in range(1, 6):
    try:
        img = Image.open(f'public/gallery/cert_{i}.png')
        # The image is 204x72. The logo is usually on the left.
        # Let's crop the leftmost 72x72 pixels.
        logo = img.crop((0, 0, 72, 72))
        logo.save(f'public/gallery/logo_{i}.png')
        print(f"Cropped logo_{i}.png")
    except Exception as e:
        print(f"Error {i}: {e}")
