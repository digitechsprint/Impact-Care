const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["']/g;
let match;
const images = new Set();
while ((match = regex.exec(html)) !== null) {
    images.add(match[1]);
}
console.log(Array.from(images));
