const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const origHtml = fs.readFileSync('src/content/bodies/index_orig.html', 'utf8');

const regex = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
console.log("Current e-parents:");
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[1]);
}

console.log("\nOriginal e-parents:");
const regex2 = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
while ((match = regex2.exec(origHtml)) !== null) {
    console.log(match[1]);
}
