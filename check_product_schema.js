const fs = require('fs');
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
console.log(Object.keys(products[0]));
console.log(products[0]);
