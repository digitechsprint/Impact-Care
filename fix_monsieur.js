const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We are looking for the block containing "MONSIEUR" or "Monsieur" and the tag "TABLETS".
    // It could be in products.html, index.html, etc.
    
    // Let's use a regex that finds the MONSIEUR product card and replaces TABLETS with CAPSULES
    // A product card usually looks like a div containing the category and title.
    
    // We will do a generic search/replace around the word MONSIEUR if it is close to TABLETS.
    if (content.includes('MONSIEUR') || content.includes('Monsieur')) {
        let modified = false;
        
        // Find index of MONSIEUR
        const idx = content.toUpperCase().indexOf('MONSIEUR');
        if (idx !== -1) {
            // Look for TABLETS before it (e.g. within 500 characters)
            const beforeStr = content.substring(Math.max(0, idx - 500), idx);
            if (beforeStr.includes('TABLETS')) {
                // Replace the last occurrence of TABLETS in beforeStr
                const lastTabletsIdx = beforeStr.lastIndexOf('TABLETS');
                const absoluteIdx = Math.max(0, idx - 500) + lastTabletsIdx;
                
                content = content.substring(0, absoluteIdx) + 'CAPSULES' + content.substring(absoluteIdx + 'TABLETS'.length);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed category for Monsieur in ' + filePath);
        }
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
