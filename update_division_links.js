const fs = require('fs');
const path = require('path');

const bodiesDir = 'src/content/bodies';

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            // Replace /divisions#something or /divisions/#something with /divisions/something
            const regex = /href="\/divisions\/?#([^"]+)"/g;
            if (regex.test(content)) {
                content = content.replace(regex, 'href="/divisions/$1"');
                modified = true;
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed division links in ' + fullPath);
            }
        }
    }
}

walkDir(bodiesDir);
