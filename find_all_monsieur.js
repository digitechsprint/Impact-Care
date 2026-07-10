const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else {
            if (fullPath.endsWith('.html')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (content.toUpperCase().includes('MONSIEUR')) {
                    console.log('Found MONSIEUR in ' + fullPath);
                    const idx = content.toUpperCase().indexOf('MONSIEUR');
                    console.log(content.substring(Math.max(0, idx - 150), idx + 150));
                }
            }
        }
    }
}

walkDir(bodiesDir);
