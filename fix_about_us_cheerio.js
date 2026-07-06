const fs = require('fs');
const cheerio = require('cheerio');

// Load pristine about-us.html from git
require('child_process').execSync('git checkout 67d4161 -- src/content/bodies/about-us.html');
console.log("Restored about-us.html");

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const $ = cheerio.load(html, { decodeEntities: false }, false);

// The IDs to remove
const toDelete = ['132718b', '077127f', 'bee7fb8', '004af36'];

toDelete.forEach(id => {
    const el = $(`[data-id="${id}"]`);
    if (el.length) {
        el.remove();
        console.log(`Removed ${id}`);
    } else {
        console.log(`Could not find ${id}`);
    }
});

let finalHtml = $.html();
fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Saved about-us.html");

// Now update the footer string replacement
const index = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const footerStartStr = '<div class="elementor-element elementor-element-0151cb0';

const indexFooterStart = index.indexOf(footerStartStr);
const indexFooter = index.substring(indexFooterStart);

const aboutFooterStart = finalHtml.indexOf(footerStartStr);
if (aboutFooterStart !== -1) {
    const newAbout = finalHtml.substring(0, aboutFooterStart) + indexFooter;
    fs.writeFileSync('src/content/bodies/about-us.html', newAbout);
    console.log("Successfully copied footer from index.html to about-us.html");
} else {
    console.log("Could not find footer in about-us.html");
}
