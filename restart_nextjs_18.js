const fs = require('fs');
const path = 'next.config.ts';
let content = fs.readFileSync(path, 'utf8');
fs.writeFileSync(path, content + '\n// trigger reload 18', 'utf8');
console.log('Touched next.config.ts to hard restart Next.js dev server for gallery link');
