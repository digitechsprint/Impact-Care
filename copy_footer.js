const fs = require('fs');
const index = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const about = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const footerStartStr = '<div class="elementor-element elementor-element-0151cb0';

const indexFooterStart = index.indexOf(footerStartStr);
const indexFooter = index.substring(indexFooterStart);

const aboutFooterStart = about.indexOf(footerStartStr);
if (aboutFooterStart !== -1) {
    const newAbout = about.substring(0, aboutFooterStart) + indexFooter;
    fs.writeFileSync('src/content/bodies/about-us.html', newAbout);
    console.log("Successfully copied footer from index.html to about-us.html");
} else {
    console.log("Could not find footer in about-us.html");
}
