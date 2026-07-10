const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newRule = `
/* AGGRESSIVE FOOTER LOGO FIX */
.elementor-element-bfc54a3,
.elementor-element-bfc54a3 *,
.elementor-element-522973c,
.elementor-element-522973c *,
.elementor-element-522973c img,
.elementor-element-522973c img.wp-image-8193 {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
}

.elementor-element-522973c img.wp-image-8193 {
    width: 320px !important; /* Made even larger as requested */
    max-width: 100% !important;
    height: auto !important;
    object-fit: contain !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    filter: drop-shadow(0 0 0 transparent) !important;
    margin-left: -20px !important;
}
`;

fs.appendFileSync(cssPath, newRule, 'utf8');
console.log('Appended aggressive CSS fix for footer logo.');
