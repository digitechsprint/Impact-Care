const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/index.html', 'utf8') + fs.readFileSync('src/content/bodies/products.html', 'utf8');

const idx = content.toUpperCase().indexOf('MONSIEUR');
if (idx !== -1) {
    console.log(content.substring(Math.max(0, idx - 200), idx + 200));
} else {
    console.log('MONSIEUR not found.');
}
