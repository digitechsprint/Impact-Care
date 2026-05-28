const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(html);

const mainContent = $('.elementor.elementor-947');
console.log('Main content found:', mainContent.length);

mainContent.children().each((i, el) => {
  console.log(`Child ${i}:`, $(el).attr('class') || $(el).attr('id') || el.tagName);
});
