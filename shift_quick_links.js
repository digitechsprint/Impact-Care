const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const fixCSS = `
/* =========================================
   QUICK LINKS LEFT SHIFT FIX
   ========================================= */
@media (min-width: 1025px) {
    .elementor-element-b5d0d70 {
        transform: translateX(-40px);
    }
}
`;

if (!css.includes('QUICK LINKS LEFT SHIFT FIX')) {
    fs.writeFileSync(cssPath, css + '\n' + fixCSS, 'utf8');
    console.log('Appended Quick Links shift CSS.');
} else {
    console.log('Fix already exists.');
}
