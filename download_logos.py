import urllib.request
import os

images = {
    'cert_who.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/640px-WHO_logo.svg.png',
    'cert_iso9001.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ISO_Logo_%28Red_square%29.svg/640px-ISO_Logo_%28Red_square%29.svg.png',
    'cert_iso14001.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/ISO_14001_Logo.svg/640px-ISO_14001_Logo.svg.png',
    'cert_iso45001.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/ISO_45001_Logo.svg/640px-ISO_45001_Logo.svg.png',
    'cert_glp.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/GLP_Logo.png/640px-GLP_Logo.png'
}

os.makedirs('public/gallery', exist_ok=True)
headers = {'User-Agent': 'ImpactCareBot/1.0'}

for name, url in images.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(f'public/gallery/{name}', 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
