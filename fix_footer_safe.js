const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Find the start of the bad blocks
const badBlocksStart = css.indexOf('/* =========================================\r\n   FOOTER LOGO FIX');
const fallbackIndex = css.indexOf('/* =========================================\n   FOOTER LOGO FIX');

const startIndex = badBlocksStart !== -1 ? badBlocksStart : fallbackIndex;

if (startIndex !== -1) {
    // Remove everything from the start of the bad blocks to the end of the file
    css = css.substring(0, startIndex);
    
    // Append the clean, safe fix
    const cleanFix = `
/* =========================================
   SAFE FOOTER LOGO FIX
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

.elementor-element-522973c {
    /* Safely scale the entire image container visually without breaking flex layout */
    transform: scale(1.5);
    transform-origin: left center;
    margin-top: 10px;
    margin-bottom: 20px;
}
`;
    css += cleanFix;
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Successfully reverted bad CSS and applied safe footer logo fix.');
} else {
    console.log('Could not find the bad CSS blocks.');
}
