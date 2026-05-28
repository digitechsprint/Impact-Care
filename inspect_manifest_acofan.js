const fs = require('fs');
const manifest = require('./src/content/pages-manifest.json');
const acofan = manifest.pages.find(p => p.path === '/products/acofan-tablet');
console.log(JSON.stringify(acofan, null, 2));
