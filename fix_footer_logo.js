const fs = require('fs');
const cssPath = 'src/styles/globals.css';

const customCss = `

/* =========================================
   FOOTER LOGO FIX
   ========================================= */
.elementor-element-bfc54a3,
.elementor-element-522973c,
.elementor-element-522973c .elementor-widget-container {
    background: transparent !important;
    background-color: transparent !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
}

.elementor-element-522973c img.wp-image-8193 {
    width: 250px !important;
    max-width: 100% !important;
    height: auto !important;
    object-fit: contain !important;
}
`;

fs.appendFileSync(cssPath, customCss, 'utf8');
console.log('Successfully appended footer logo CSS fix.');
