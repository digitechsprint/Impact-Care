const fs = require('fs');
const path = require('path');

const bodiesDir = path.join('src', 'content', 'bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

const regex = /<div class="elementor-element elementor-element-c512355[\s\S]*?(?=<div class="elementor-element elementor-element-b5d0d70)/;

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

console.log(`Successfully removed Healthcare section from ${updatedCount} HTML files.`);
