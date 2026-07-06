import os
import time
import urllib.request
from duckduckgo_search import DDGS

queries = {
    'cert_who.png': 'WHO GMP certified logo transparent',
    'cert_iso9001.png': 'ISO 9001:2015 certified logo',
    'cert_iso14001.png': 'ISO 14001:2015 certified logo',
    'cert_iso45001.png': 'ISO 45001:2018 certified logo',
    'cert_glp.png': 'GLP certified logo'
}

os.makedirs('public/gallery', exist_ok=True)
ddgs = DDGS()
headers = {'User-Agent': 'Mozilla/5.0'}

for name, query in queries.items():
    try:
        results = ddgs.images(query, max_results=3)
        if results:
            url = results[0]['image']
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=5) as response, open(f'public/gallery/{name}', 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {name} from {url}")
        else:
            print(f"No results for {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")
    time.sleep(1)
