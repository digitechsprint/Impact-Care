const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const homeFile = path.join(bodiesDir, 'home-image.html');

// Read home-image.html
const homeHtml = fs.readFileSync(homeFile, 'utf-8');
const $home = cheerio.load(homeHtml);

// Extract the header block
const headerBlock = $home('.ekit-template-content-header').parent().html();
if (!headerBlock) {
    console.error("Could not find header in home-image.html");
    process.exit(1);
}

// Extract the exact HTML string for the header
const headerHtmlString = $home.html($home('.ekit-template-content-header'));

const filesToUpdate = [
    'about-us.html',
    'products.html',
    'manufacturing.html',
    'contact-us.html',
    'blog.html',
    'careers.html'
];

for (const file of filesToUpdate) {
    const filePath = path.join(bodiesDir, file);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${file}`);
        continue;
    }
    
    const html = fs.readFileSync(filePath, 'utf-8');
    const $file = cheerio.load(html);
    
    // Replace the header
    $file('.ekit-template-content-header').replaceWith(headerHtmlString);
    
    // Cheerio adds html/head/body wrappers sometimes, but we want to preserve the raw format if possible.
    // However, cheerio.load() handles whole documents fine.
    // We can just dump the whole document.
    let outHtml = $file.html();
    
    fs.writeFileSync(filePath, outHtml, 'utf-8');
    console.log(`Updated ${file}`);
}
console.log("Done.");
