const fs = require('fs');

// Fix products.html
const productsFile = 'src/content/bodies/products.html';
let productsContent = fs.readFileSync(productsFile, 'utf8');
productsContent = productsContent.replace(/Gemini_Generated_Image_dy0xh7dy0xh7dy0x\.png/g, 'products_bg_3d.png');
fs.writeFileSync(productsFile, productsContent, 'utf8');
console.log('Reverted products.html');

// Update rd.html
const rdFile = 'src/content/bodies/rd.html';
let rdContent = fs.readFileSync(rdFile, 'utf8');
// Replace acumol-tablets.jpeg with rd_hero_banner_final.png in rd.html
rdContent = rdContent.replace(/acumol-tablets\.jpeg/g, 'rd_hero_banner_final.png');
fs.writeFileSync(rdFile, rdContent, 'utf8');
console.log('Updated rd.html hero image');
