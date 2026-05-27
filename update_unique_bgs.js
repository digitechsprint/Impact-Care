const fs = require('fs');
const path = require('path');

const srcFiles = [
    { dest: 'public/assets/uploads/images/about_us_bg_3d.png', targetHtml: 'src/content/bodies/about-us.html' },
    { dest: 'public/assets/uploads/images/manufacturing_bg_3d.png', targetHtml: 'src/content/bodies/manufacturing.html' },
    { dest: 'public/assets/uploads/images/products_bg_3d.png', targetHtml: 'src/content/bodies/products.html' },
    { dest: 'public/assets/uploads/images/contact_us_bg_3d.png', targetHtml: 'src/content/bodies/contact-us.html' }
];

srcFiles.forEach(item => {
    // Update HTML
    const htmlPath = path.resolve(__dirname, item.targetHtml);
    if (fs.existsSync(htmlPath)) {
        let content = fs.readFileSync(htmlPath, 'utf8');
        
        // Update the injected style rule with the new background
        const wrongBgUrl = `/${item.dest.replace(/\\/g, '/')}`; // /public/assets/...
        const rightBgUrl = `/assets/uploads/images/${path.basename(item.dest)}`; // /assets/...
        
        if (content.includes(wrongBgUrl)) {
            content = content.replace(wrongBgUrl, rightBgUrl);
            fs.writeFileSync(htmlPath, content, 'utf8');
            console.log(`Updated ${path.basename(htmlPath)} to use ${rightBgUrl}`);
        }
    }
});
