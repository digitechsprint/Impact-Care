const fs = require('fs');
const path = 'next.config.ts';
let content = fs.readFileSync(path, 'utf8');
fs.writeFileSync(path, content + '\n// trigger reload 6', 'utf8');
console.log('Touched next.config.ts to restart Next.js dev server for monsieur category');
