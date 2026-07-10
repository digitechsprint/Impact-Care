const fs = require('fs');

const pContent = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const rdContent = fs.readFileSync('src/content/bodies/rd.html', 'utf8');

const pRegex = /background-image:[^;]*;/g;
let match;
console.log('Backgrounds in products.html:');
while ((match = pRegex.exec(pContent)) !== null) {
    console.log(match[0]);
}

const rdRegex = /background-image:[^"']*(?:["']|&quot;)([^"']*)(?:["']|&quot;)/g;
console.log('\nBackgrounds in rd.html:');
while ((match = rdRegex.exec(rdContent)) !== null) {
    console.log(match[0]);
}

// check images in rd.html
const rdImgRegex = /<img[^>]*>/g;
console.log('\nImages in rd.html:');
while ((match = rdImgRegex.exec(rdContent)) !== null) {
    console.log(match[0]);
}
