const fs = require('fs');

const file = 'src/lib/data/products.ts';
const content = fs.readFileSync(file, 'utf8');

const titleMatch = content.indexOf('"title": "IPOZOLE');
if (titleMatch !== -1) {
    console.log(content.substring(titleMatch, titleMatch + 300));
} else {
    console.log("Not found");
}
