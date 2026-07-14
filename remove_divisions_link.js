const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    let modified = false;

    if (html.includes('href="/divisions/"')) {
        html = html.replace(/href="\/divisions\/"/g, 'href="javascript:void(0)"');
        modified = true;
    }
    if (html.includes('href="/divisions"')) {
        html = html.replace(/href="\/divisions"/g, 'href="javascript:void(0)"');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files: replaced /divisions links with javascript:void(0).`);
