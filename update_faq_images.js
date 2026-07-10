const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to replace the image inside faq-v2-image-wrapper
    // The regex should find the wrapper and the immediate img tag
    const regex = /(<div class="faq-v2-image-wrapper">\s*<img src=")[^"]+(" alt="[^"]*">)/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, '$1/assets/uploads/images/faq-new-image.png$2');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated FAQ image in: ' + filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

walkDir(bodiesDir);
console.log('Finished updating FAQ images.');
