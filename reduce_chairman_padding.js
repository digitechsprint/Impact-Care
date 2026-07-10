const fs = require('fs');
const cssPath = 'src/styles/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
    /\.chairman-message-section-exact\s*\{\s*padding:\s*120px 20px;/g,
    '.chairman-message-section-exact {\n    padding: 70px 20px;'
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully adjusted padding in globals.css');
