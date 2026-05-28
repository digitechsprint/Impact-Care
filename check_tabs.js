const fs = require('fs');
const cheerio = require('cheerio');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(content);
console.log('Category Tabs text:', $('.category-tabs').text());
