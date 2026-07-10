const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We will match the entire img tag that has footer-logo-new.png or Logo.png and wp-image-8193
    // and completely replace it with a clean tag.
    const regex = /<img[^>]*src="\/assets\/uploads\/images\/(footer-logo-new|Logo)\.png"[^>]*wp-image-8193[^>]*>/g;
    
    if (regex.test(content)) {
        content = content.replace(regex, '<img src="/assets/uploads/images/c95ff92b-7a1f-43d9-a457-646fea0c0995.png" alt="Footer Logo" style="max-width: 250px;">');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Cleaned and replaced tag in: ' + filePath);
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
console.log('Finished clean replacement.');
