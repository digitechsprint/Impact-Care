const fs = require('fs');

const rdFile = 'src/content/bodies/rd.html';
let rdContent = fs.readFileSync(rdFile, 'utf8');

// Undo the acumol-tablets replacement
rdContent = rdContent.replace(/rd_hero_banner_final\.png/g, 'acumol-tablets.jpeg');

// Replace the actual hero background image
rdContent = rdContent.replace(/\/assets\/images\/rd-hero-banner\.png/g, '/assets/uploads/images/rd_hero_banner_final.png');

fs.writeFileSync(rdFile, rdContent, 'utf8');
console.log('Fixed rd.html hero image properly.');
