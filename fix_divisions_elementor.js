const fs = require('fs');

const pageFile = 'src/app/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pageFile, 'utf8');

// Replace elementorConfig fallback from "{}" to null
pageContent = pageContent.replace('elementorConfig={page?.elementorConfig || "{}"}', 'elementorConfig={page?.elementorConfig || null}');

fs.writeFileSync(pageFile, pageContent, 'utf8');
console.log('Fixed elementorConfig fallback for division routes');
