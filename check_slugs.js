const fs = require('fs');
const path = require('path');

const productsTsPath = path.join('src', 'lib', 'data', 'products.ts');
let tsContent = fs.readFileSync(productsTsPath, 'utf8');

const regex = /\"slug\"\:\s*\"([^\"]+)\"/g;
let match;
const tsSlugs = [];
while ((match = regex.exec(tsContent)) !== null) {
  tsSlugs.push(match[1]);
}

const bodiesDir = path.join('src', 'content', 'bodies');
const htmlFiles = fs.readdirSync(bodiesDir).filter(f => f.startsWith('product__') && f.endsWith('.html'));
const htmlSlugs = htmlFiles.map(f => f.replace('product__', '').replace('.html', ''));

console.log('Slugs in products.ts but NO HTML FILE:');
for (const slug of tsSlugs) {
  if (!htmlSlugs.includes(slug)) console.log(slug);
}

console.log('\nHTML FILES but no slug in products.ts:');
for (const slug of htmlSlugs) {
  if (!tsSlugs.includes(slug)) console.log(slug);
}
