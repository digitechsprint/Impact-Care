const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const searchStr = '<div class="elementor-element elementor-element-7e00e1b';
const idx = content.indexOf(searchStr);
console.log(content.substring(idx - 500, idx + 500));
