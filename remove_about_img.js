const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const homePages = [
    'index.html',
    'home-image.html',
    'home-slider.html',
    'home-video.html'
];

const bodiesDir = path.resolve(__dirname, 'src/content/bodies');

homePages.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });

        let changed = false;

        // Find the image by src
        const img = $('img[src*="about-img-2.jpg"]');
        if (img.length > 0) {
            // Remove the closest Elementor widget container
            const widget = img.closest('.elementor-widget');
            if (widget.length > 0) {
                widget.remove();
            } else {
                img.remove();
            }
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, $.html(), 'utf8');
            console.log(`Deleted about-img-2.jpg from ${file}`);
        }
    }
});
