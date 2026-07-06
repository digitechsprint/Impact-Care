import urllib.request
import os

images = {
    'cert_iso9001.svg': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/ISO_Logo_%28Red_square%29.svg',
    'cert_iso14001.svg': 'https://upload.wikimedia.org/wikipedia/commons/9/98/ISO_14001_Logo.svg',
    'cert_iso45001.svg': 'https://upload.wikimedia.org/wikipedia/commons/7/75/ISO_45001_Logo.svg'
}

os.makedirs('public/gallery', exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in images.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(f'public/gallery/{name}', 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
