const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index.html', 'utf8');

const regex = /<div class="elementor-element[^>]*e-parent[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(`Found at index ${match.index}: ${match[0].substring(0, 80)}...`);
}
