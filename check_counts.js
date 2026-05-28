const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
console.log('Count:', (content.match(/<div class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item/g) || []).length);
console.log('gen items:', (content.match(/elementor-element-gen/g) || []).length);
