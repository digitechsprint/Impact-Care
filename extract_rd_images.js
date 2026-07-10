const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/rd.html', 'utf8');

const regex = /background-image:[^;]*;/g;
let match;
console.log('Backgrounds in rd.html:');
while ((match = regex.exec(content)) !== null) {
    console.log(match[0]);
}

const imgRegex = /<img[^>]*>/g;
console.log('\nImages in rd.html:');
while ((match = imgRegex.exec(content)) !== null) {
    console.log(match[0]);
}
