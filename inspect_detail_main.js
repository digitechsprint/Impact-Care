const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/product__acofan-tablet.html', 'utf8');
const $ = cheerio.load(html);

const mainContent = $('.elementor-10083');
console.log('Main content length:', mainContent.length);
mainContent.children().each((i, el) => {
  console.log(`Child of 10083 ${i}:`, $(el).attr('class') || $(el).attr('id') || el.tagName);
});
