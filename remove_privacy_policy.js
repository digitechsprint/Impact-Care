const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/content/bodies';
const footerTsPath = 'c:/Users/akkik/OneDrive/Desktop/New-Impact-Care/src/components/sections/content/footer.ts';

const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html')).map(f => path.join(bodiesDir, f));

function updateHtml(htmlStr) {
  const $ = cheerio.load(htmlStr, null, false);
  
  // Remove the privacy policy links container entirely
  $('.privacy-policy-links').remove();

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

let str = fs.readFileSync(footerTsPath, 'utf8');
let htmlStart = str.indexOf('`') + 1;
let htmlEnd = str.lastIndexOf('`');
let htmlStr = str.substring(htmlStart, htmlEnd);
let newHtml = updateHtml(htmlStr);
if (newHtml !== htmlStr) {
  let newTsContent = str.substring(0, htmlStart) + newHtml + str.substring(htmlEnd);
  fs.writeFileSync(footerTsPath, newTsContent, 'utf8');
  console.log('Modified footer.ts');
}
