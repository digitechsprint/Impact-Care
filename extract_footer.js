const fs = require('fs');
const index = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const start = index.indexOf('<div class="elementor-element elementor-element-0151cb0');
console.log(index.substring(start, start + 300));
const footerStr = index.substring(start);
fs.writeFileSync('footer_snippet.html', footerStr);
