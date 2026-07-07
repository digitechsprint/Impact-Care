const fs = require('fs');

let css = fs.readFileSync('src/styles/globals.css', 'utf8');

// Replace Brown line color with Impact Green
css = css.replace(/background-color:\s*#b57738;/g, 'background-color: #00b853;');
css = css.replace(/border:\s*4px\s*solid\s*#b57738;/g, 'border: 4px solid #00b853;');

// Replace Georgia font with Inter
css = css.replace(/font-family:\s*'Georgia',\s*serif;/g, "font-family: 'Inter', sans-serif;");

// Update big number styling
css = css.replace(/color:\s*#5d3f2c;/g, 'color: rgba(0, 184, 83, 0.2); font-weight: 900;'); // Light green, very bold
css = css.replace(/font-size:\s*100px;/g, 'font-size: 80px;'); // slightly smaller so it doesn't take too much vertical space without desc

// Reduce empty space (margin-bottom of wf-item)
css = css.replace(/margin-bottom:\s*120px;/g, 'margin-bottom: 60px;');

// Make the images shorter so there isn't empty space on the text side
css = css.replace(/box-shadow:\s*0\s*30px\s*60px\s*rgba\(0,0,0,0\.15\);\s*display:\s*block;/g, 
  'box-shadow: 0 30px 60px rgba(0,0,0,0.15); display: block; height: 250px; object-fit: cover; aspect-ratio: 16/9;');

fs.writeFileSync('src/styles/globals.css', css);
console.log("Updated workflow CSS to Impact theme and fixed empty space.");
