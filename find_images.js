const fs = require('fs');
const path = require('path');
const bodiesDir = path.join('src', 'content', 'bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));
const counts = {};
files.forEach(f => {
  const content = fs.readFileSync(path.join(bodiesDir, f), 'utf8');
  const matches = content.match(/src="([^"]+)"/g) || [];
  matches.forEach(m => {
    const src = m.replace('src="', '').replace('"', '');
    counts[src] = (counts[src] || 0) + 1;
  });
});
const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]);
console.log(sorted.slice(0, 50));
