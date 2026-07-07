const fs = require('fs');

let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// Replace light green transparent with solid green for the numbers
css = css.replace(/color:\s*rgba\(0,\s*184,\s*83,\s*0\.2\);/g, 'color: #00b853;');

fs.writeFileSync('src/styles/globals.css', css);
console.log("Made workflow numbers solid dark green.");
