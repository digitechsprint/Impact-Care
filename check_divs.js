const fs = require('fs');
const index = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const about = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const footerStartStr = '<div class="elementor-element elementor-element-0151cb0';

const indexFooter = index.substring(index.indexOf(footerStartStr));
const open1 = (indexFooter.match(/<div/gi) || []).length;
const close1 = (indexFooter.match(/<\/div>/gi) || []).length;
console.log('Index Footer - Open:', open1, 'Close:', close1);

const aboutFooterOrig = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
// To see about us footer before replace, we have to pull from git again
require('child_process').execSync('git checkout 67d4161 -- src/content/bodies/about-us.html');
const about2 = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const aboutFooterStr = about2.substring(about2.indexOf(footerStartStr));
const open2 = (aboutFooterStr.match(/<div/gi) || []).length;
const close2 = (aboutFooterStr.match(/<\/div>/gi) || []).length;
console.log('About Footer (orig) - Open:', open2, 'Close:', close2);

// Let's check entire about2 balance
console.log('About entire orig - Open:', (about2.match(/<div/gi) || []).length, 'Close:', (about2.match(/<\/div>/gi) || []).length);
