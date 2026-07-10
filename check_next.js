const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');

console.log(html.substring(95364, 95364 + 200));
