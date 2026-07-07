const fs = require('fs');

let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// Replace Genlab Teal background with Impact Dark Blue
css = css.replace(/background-color:\s*#06394c;/g, 'background-color: #0f172a;');

// Replace Genlab Cyan-Green with Impact Green
css = css.replace(/#00e0a5/g, '#00b853');

// Replace Genlab Light Teal-Gray text with Tailwind Slate-400 (which fits Impact Dark Blue better)
css = css.replace(/color:\s*#b0c7cf;/g, 'color: #94a3b8;');

fs.writeFileSync('src/styles/globals.css', css);
console.log("Updated Genlab colors to match Impact Healthcare theme.");
