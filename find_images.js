const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');

const regex = /<img[^>]*>/g;
let match;
console.log('Images in products.html:');
while ((match = regex.exec(content)) !== null) {
    console.log(match[0]);
}

const bgRegex = /background-image:[^;]*;/g;
console.log('\nBackgrounds in products.html:');
while ((match = bgRegex.exec(content)) !== null) {
    console.log(match[0]);
}
