const fs = require('fs');
const content = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const matches = content.match(/<img[^>]+>/g) || [];
matches.forEach(m => {
  const srcMatch = m.match(/src="([^"]+)"/);
  if (srcMatch) console.log(srcMatch[1]);
});
