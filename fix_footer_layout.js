const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const fixCSS = `
/* =========================================
   FOOTER LAYOUT FIX (QUICK LINKS & CONTACT)
   ========================================= */
@media (min-width: 1025px) {
    /* Logo container */
    .elementor-element-9a82e37 {
        width: 25% !important;
    }
    
    /* Products container */
    .elementor-element-c512355 {
        width: 20% !important;
    }
    
    /* Quick Links container */
    .elementor-element-b5d0d70 {
        width: 20% !important;
        margin-right: 20px !important;
    }
    
    /* Contact Us container */
    .elementor-element-3709540 {
        width: 35% !important; /* More space to prevent squishing */
        padding-left: 10px !important;
    }
}
`;

if (!css.includes('FOOTER LAYOUT FIX (QUICK LINKS & CONTACT)')) {
    fs.writeFileSync(cssPath, css + '\n' + fixCSS, 'utf8');
    console.log('Appended footer layout fix CSS.');
} else {
    console.log('Footer layout fix already exists.');
}
