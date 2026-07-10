const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to remove flex: 1 and reduce the gap to move items to the left and prevent overlap
    let modified = false;
    if (content.includes('<div style="display: flex; gap: 30px;">')) {
        content = content.replace(/<div style="display: flex; gap: 30px;">/g, '<div style="display: flex; gap: 15px;">');
        modified = true;
    }
    
    if (content.includes('style="flex: 1; padding: 0; margin: 0;"')) {
        content = content.replace(/style="flex: 1; padding: 0; margin: 0;"/g, 'style="padding: 0; margin: 0; width: 45%;"');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed Quick Links layout in: ' + filePath);
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
console.log('Finished fixing Quick Links layout.');
