const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/rd.html', 'utf8');

const regex = /background-image:[^"']*(?:["']|&quot;)([^"']*)(?:["']|&quot;)/g;
let match;
console.log('Background URLs in rd.html:');
while ((match = regex.exec(content)) !== null) {
    console.log(match[0]);
}

// Just find the index of "background-image" and print 100 chars around it
const idx = content.indexOf('background-image');
if (idx !== -1) {
    console.log('\nContext around background-image:');
    console.log(content.substring(Math.max(0, idx - 50), idx + 200));
}
