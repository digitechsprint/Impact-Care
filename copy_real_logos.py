import shutil
import os

source_files = [
    r"d:\Downloads\7lggz56559H7m7KWJif1RIH1L9syMswK8EXB4ghNkZ4G3--3bNa2yKznARoaeQAvGY28O1ZTab5YnDkPTwGRiQgHidz9dVhs2QMbrC9NPvKGhIX0i6VhfDdE8wNxXMyrZIBizlGHSaPDyDCCUVQapOaVJqJRPgm8AqrJqj_errY.jpg",
    r"d:\Downloads\9UpzX2_mlNt-CeW06FxjX546matx-gzs76zjHRlW8tHG9FvhXaMTj3brrHxmbO4UzzX8pmUmUHGzICoz9OVB7zihVyh8qCHTORgB4NijifZd1kB2x3u5_2ggblcfreUHhhqt8e5BSmUDonNamw8NLlMn2fJA0WCseqjCmeUxDHlZuyFJHj-qDPiqgTrqG0RT.jpg",
    r"d:\Downloads\H6IRqHact37prBEDdQydtKoha7D3oz6P7ujkPCYI_m83Tmhq6bkZEVhuajmQquGQCfzLw4msdV3cj8018ZXRglRXZUXafhR1Sruw3wKc8Dvtx_HfM-InrbkernH1COsn0GpJH_h1AFBcUFRtopNrxq7cl7y7yD7WlCw472rBI3M.jpg",
    r"d:\Downloads\AaevVr4ciy0JyQgTXpvkNQ19E1IMebeyuHyTOdk4yiicKZ4xj8WuENrvjeV_US4G-1kUyXBATBml-mPK-_13qeYMWOnBDw1j2sMhyqrYnZtRZVIMztqyfMADrvpCw9CBLbkpieyeAh8-Ub4HRTsUteqsNvNbNi1YJb3OdlXNVtQ.jpg",
    r"d:\Downloads\bd2rIn2qZE6oeHwIMNZHv7UPc7F3I8KxYYGXxJZgG9_ziEp40de-4HgbBljlYtGcDZ2wONMh4pEbTzVLsBiP2R_V-G-Ul2h9Rad-hLzdYaLjmvGAWi-XJy9O8Gn74aukOP45S3gmJJyRwXbeqb1MHnVjHWyGpFh0VaKF6SoJY9s.jpg"
]

dest_dir = "public/gallery"
os.makedirs(dest_dir, exist_ok=True)

for i, src in enumerate(source_files):
    dest = os.path.join(dest_dir, f"real_logo_{i+1}.jpg")
    try:
        shutil.copy2(src, dest)
        print(f"Copied to {dest}")
    except Exception as e:
        print(f"Failed to copy {src}: {e}")
