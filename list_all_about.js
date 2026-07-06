const fs = require('fs');
let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const regex = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
let match;
let sections = [];
while ((match = regex.exec(html)) !== null) {
    sections.push({ id: match[1], start: match.index });
}
console.log("All section IDs:", sections.map(s => s.id));
