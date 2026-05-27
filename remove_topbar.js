const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const bodiesDir = path.resolve(__dirname, 'src/content/bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });

    let changed = false;

    // Find the top bar container by its consistent data-id or class
    const topBar = $('.elementor-element-b1a20bc');
    if (topBar.length > 0) {
        topBar.remove();
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        updatedCount++;
        console.log(`Deleted top bar from ${file}`);
    }
});

console.log(`\n✔ Done! Removed top bar from ${updatedCount} files.`);
