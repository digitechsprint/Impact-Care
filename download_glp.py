import urllib.request
import os

images = {
    'cert_glp.png': 'https://upload.wikimedia.org/wikipedia/commons/3/36/GLP_Logo.png'
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
