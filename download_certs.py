import urllib.request
import os

images = {
    'cert_who.svg': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/WHO_logo.svg',
    'cert_iso.svg': 'https://upload.wikimedia.org/wikipedia/commons/9/91/ISO_Logo_%28Red_square%29.svg'
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
