const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const $ = cheerio.load(html);

console.log('Header class:', $('.ekit-template-content-header').attr('class'));
console.log('Header parent class:', $('.ekit-template-content-header').parent().attr('class'));
console.log('Footer class:', $('.ekit-template-content-footer').attr('class'));
console.log('Footer parent class:', $('.ekit-template-content-footer').parent().attr('class'));

// Let's see the main containers at the root of body
$('body > *').each((i, el) => {
  console.log(`Child ${i}:`, $(el).attr('class') || $(el).attr('id') || el.tagName);
});
