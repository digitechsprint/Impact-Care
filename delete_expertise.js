const fs = require('fs');
const htmlPath = 'src/content/bodies/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const startIndex = 79224;
const endIndex = 95364;

// Verify start string
if (html.substring(startIndex, startIndex + 50) === '<div class="elementor-element elementor-element-fe') {
    html = html.substring(0, startIndex) + html.substring(endIndex);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Successfully deleted Our Expertise section');
} else {
    console.log('Verification failed: Start index content mismatch');
}
