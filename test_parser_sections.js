const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(html);

const mainContent = $('.elementor.elementor-947');
console.log('Main content length:', mainContent.length);

let heroBanner = "";
let lowerContent = "";

mainContent.children().each((i, el) => {
  if (i === 0) {
    heroBanner = $.html(el);
  } else if (i > 1) {
    lowerContent += $.html(el);
  }
});

console.log('Hero Banner Length:', heroBanner.length);
console.log('Lower Content Length:', lowerContent.length);
console.log('Hero Banner sample:', heroBanner.substring(0, 100));
console.log('Lower Content sample:', lowerContent.substring(0, 100));
