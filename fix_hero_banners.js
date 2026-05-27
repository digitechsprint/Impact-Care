const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const bodiesDir = path.resolve(__dirname, 'src/content/bodies');
const skipFiles = new Set([
    'index.html',
    'home-image.html', 
    'home-slider.html',
    'home-video.html'
]);

const newBgUrl = '/assets/uploads/images/pharma_hero_banner_3d.png';

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html') && !skipFiles.has(f));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });

    // Target all elements that have BOTH 'bg-section' and 'e-child' classes
    // These are the inner page hero banners
    let changed = false;
    
    $('.bg-section.e-child').each((i, el) => {
        const existing = $(el).attr('style') || '';
        // Only apply to the FIRST one (the hero banner at top of page)
        if (i === 0) {
            const newStyle = `background-image: url('${newBgUrl}') !important; background-size: cover !important; background-position: center center !important; background-repeat: no-repeat !important; position: relative !important; min-height: 250px;`;
            $(el).attr('style', newStyle);
            // Also update data-settings to use classic background
            $(el).attr('data-settings', `{"background_background":"classic"}`);
            changed = true;
            console.log(`  [${file}] Banner ${i + 1}: Applied bg to .${$(el).attr('class').split(' ').slice(0,4).join('.')}`);
        }
    });
    
    // Also replace old wp-content page header bg
    if (content.includes('/wp-content/uploads/2025/01/page-header-bg.png')) {
        content = content.replaceAll('/wp-content/uploads/2025/01/page-header-bg.png', newBgUrl);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        console.log(`✅ Updated: ${file}`);
        updatedCount++;
    }
});

console.log(`\n✔ Done! Updated ${updatedCount} files.`);
