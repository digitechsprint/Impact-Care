const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const fixCSS = `
/* =========================================
   PRODUCTS LEFT SHIFT FIX
   ========================================= */
@media (min-width: 1025px) {
    .elementor-element-c512355 {
        transform: translateX(-40px);
    }
}
`;

if (!css.includes('PRODUCTS LEFT SHIFT FIX')) {
    fs.writeFileSync(cssPath, css + '\n' + fixCSS, 'utf8');
    console.log('Appended Products shift CSS.');
} else {
    console.log('Fix already exists.');
}
