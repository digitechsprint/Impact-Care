const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/product__acofan-tablet.html', 'utf8');
const $ = cheerio.load(html);

console.log('Body children:');
$('body > *').each((i, el) => {
  console.log(`Child ${i}:`, $(el).attr('class') || $(el).attr('id') || el.tagName);
});

// Let's check the elementor element structure
const mainContent = $('.elementor').last(); // get page elementor
console.log('Main content class:', mainContent.attr('class'));
mainContent.children().each((i, el) => {
  console.log(`Child of main ${i}:`, $(el).attr('class') || $(el).attr('id') || el.tagName);
});
