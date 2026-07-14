const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const dir = 'src/content/bodies';
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html, { decodeEntities: false }, false);
        const footer = $('.ekit-template-content-footer');
        if (footer.length > 0) {
            footer.remove();
            fs.writeFileSync(filePath, $.html());
            console.log('Removed footer from ' + file);
        }
    }
});
