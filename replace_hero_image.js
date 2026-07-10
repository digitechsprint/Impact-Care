const fs = require('fs');

const file = 'src/content/bodies/products.html';
let content = fs.readFileSync(file, 'utf8');

if (content.includes('products_bg_3d.png')) {
    content = content.replace(/products_bg_3d\.png/g, 'Gemini_Generated_Image_dy0xh7dy0xh7dy0x.png');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully replaced products_bg_3d.png in products.html');
} else {
    console.log('products_bg_3d.png not found in products.html');
}
