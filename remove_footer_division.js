const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const filesToUpdate = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let successCount = 0;
for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Look for the specific DIVISIONS footer link and remove it
    const searchString = '<li class="menu-item menu-item-type-post_type menu-item-object-page nav-item elementskit-mobile-builder-content"><a href="javascript:void(0)" class="ekit-menu-nav-link">DIVISIONS</a></li>';
    
    if (html.includes(searchString)) {
        html = html.replace(searchString, '');
        fs.writeFileSync(filePath, html, 'utf-8');
        successCount++;
    }
}
console.log(`Updated ${successCount} files: removed DIVISIONS link from footer.`);
