const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

let modifiedCount = 0;

for (const file of files) {
    const filePath = path.join(dirPath, file);
    let html = fs.readFileSync(filePath, 'utf8');

    if (html.includes('\\n\\n')) {
        // Replace all literal \n\n with empty string (since real newlines already exist)
        // Actually, replacing with empty string is best to avoid extra spaces
        const newHtml = html.replace(/\\n\\n/g, '');
        fs.writeFileSync(filePath, newHtml, 'utf8');
        modifiedCount++;
    }
}

console.log('Cleaned up \\n\\n in ' + modifiedCount + ' files.');
