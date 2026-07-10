const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Find the products shift block and replace the value
if (css.includes('PRODUCTS LEFT SHIFT FIX')) {
    // Replace the transform value specifically for c512355
    const regex = /(\.elementor-element-c512355\s*\{\s*transform:\s*translateX\()-[0-9]+px(\);)/g;
    css = css.replace(regex, '$1-80px$2');
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Shifted Products more to the left.');
} else {
    console.log('Block not found.');
}
