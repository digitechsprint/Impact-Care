const fs = require('fs');
const html = fs.readFileSync('src/content/bodies/index_orig.html', 'utf16le');
const start = html.indexOf('6adab8f');
const end = html.indexOf('b93f3c2');
const between = html.substring(start, end);

const regex = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
let match;
const matches = [];
while ((match = regex.exec(between)) !== null) {
    matches.push(match[1]);
}
console.log('Parents between HowWeWork and Gallery:', matches);
