const fs = require('fs');
const cheerio = require('cheerio');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(content);
const boxes = $('.elementskit-info-box-title');
console.log('Title boxes found:', boxes.length);
if (boxes.length > 0) {
    console.log(boxes.first().text().trim());
}
