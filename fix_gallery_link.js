const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let count = 0;

for (const file of files) {
    const fullPath = path.join(dirPath, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes('href="/gallery/"')) {
        content = content.replace(/href="\/gallery\/"/g, 'href="/image-gallery/"');
        fs.writeFileSync(fullPath, content, 'utf8');
        count++;
    }
}

console.log(`Updated GALLERY link in ${count} files.`);
