const fs = require('fs');

// Read products
const productsStr = fs.readFileSync('src/lib/data/products.ts', 'utf8');
const regex = /{\s*id:[\s\S]*?}/g;
let match;
const products = [];
while ((match = regex.exec(productsStr)) !== null) {
  try {
    // This is a naive parse, better to just require the compiled js, but it's typescript.
    // Instead of parsing, I will just grep the titles and slugs and then manually map them based on the rules.
  } catch (e) {}
}
