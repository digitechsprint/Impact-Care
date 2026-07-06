const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index_orig.html', 'utf16le');
const startGallery = html.indexOf('gallery-highlight');
const startHowWeWork = html.indexOf('6adab8f');
console.log('How we work start:', html.substring(startHowWeWork - 100, startHowWeWork + 100));
console.log('\\n\\nGallery start:', html.substring(startGallery - 200, startGallery + 100));
