const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/content/bodies';
const headerTsPath = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/components/sections/content/header.ts';

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html')).map(f => path.join(bodiesDir, f));

function updateHtml(htmlStr) {
  const $ = cheerio.load(htmlStr, null, false);
  
  // Find the header section, or just do it globally if it's the header.ts file itself
  const isHeaderTs = htmlStr.includes('ekit-template-content-header');
  const target = isHeaderTs ? $('body').addBack() : $('.ekit-template-content-header');
  
  // 1. Change the button text
  target.find('.elementor-button-text').each((i, el) => {
    if ($(el).text().trim() === 'Contact Us') {
      $(el).text('Get in Touch');
    }
  });

  // 2. Change the mobile menu button text
  target.find('.mobile-menu-quote-btn').each((i, el) => {
    if ($(el).text().trim() === 'Contact Us') {
      $(el).text('Get in Touch');
    }
  });

  return $.html();
}

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const newContent = updateHtml(content);
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
  }
}
console.log('Modified HTML files:', count);

if (fs.existsSync(headerTsPath)) {
  let str = fs.readFileSync(headerTsPath, 'utf8');
  let htmlStart = str.indexOf('`') + 1;
  let htmlEnd = str.lastIndexOf('`');
  if (htmlStart > 0 && htmlEnd > htmlStart) {
    let htmlStr = str.substring(htmlStart, htmlEnd);
    let newHtml = updateHtml(htmlStr);
    if (newHtml !== htmlStr) {
      let newTsContent = str.substring(0, htmlStart) + newHtml + str.substring(htmlEnd);
      fs.writeFileSync(headerTsPath, newTsContent, 'utf8');
      console.log('Modified header.ts');
    }
  }
}
