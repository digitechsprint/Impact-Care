const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const fixStart = css.indexOf('/* =========================================\n   FOOTER LAYOUT FIX (QUICK LINKS & CONTACT)');
const fixStart2 = css.indexOf('/* =========================================\r\n   FOOTER LAYOUT FIX (QUICK LINKS & CONTACT)');

const startIndex = fixStart !== -1 ? fixStart : fixStart2;

if (startIndex !== -1) {
    css = css.substring(0, startIndex);
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Removed faulty footer layout CSS.');
} else {
    console.log('CSS block not found.');
}
