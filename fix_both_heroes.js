const fs = require('fs');

// Fix products.html
const pFile = 'src/content/bodies/products.html';
let pContent = fs.readFileSync(pFile, 'utf8');
pContent = pContent.replace(/\/assets\/uploads\/images\/products_bg_3d\.png/g, '/assets/uploads/images/Gemini_Generated_Image_dy0xh7dy0xh7dy0x.png');
fs.writeFileSync(pFile, pContent, 'utf8');
console.log('Fixed products.html hero image');

// Fix rd.html
const rdFile = 'src/content/bodies/rd.html';
let rdContent = fs.readFileSync(rdFile, 'utf8');
// Replace all instances of /assets/images/rd-hero-banner.png with /assets/uploads/images/rd_hero_banner_final.png
rdContent = rdContent.replace(/\/assets\/images\/rd-hero-banner\.png/g, '/assets/uploads/images/rd_hero_banner_final.png');
fs.writeFileSync(rdFile, rdContent, 'utf8');
console.log('Fixed rd.html hero image');
