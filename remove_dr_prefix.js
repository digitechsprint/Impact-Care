const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src/content/bodies');
const manifestPath = path.join(__dirname, 'src/content/pages-manifest.json');

// 1. Read manifest and update paths and fileKeys
let manifestContent = fs.readFileSync(manifestPath, 'utf8');
manifestContent = manifestContent.replace(/\/our-team\/dr-/g, '/our-team/');
manifestContent = manifestContent.replace(/"fileKey":\s*"our-team__dr-/g, '"fileKey": "our-team__');
fs.writeFileSync(manifestPath, manifestContent);

// 2. Rename files in src/content/bodies
const files = fs.readdirSync(bodiesDir);
for (const file of files) {
  if (file.startsWith('our-team__dr-')) {
    const oldPath = path.join(bodiesDir, file);
    const newFile = file.replace('our-team__dr-', 'our-team__');
    const newPath = path.join(bodiesDir, newFile);
    fs.renameSync(oldPath, newPath);
  }
}

// 3. Search and replace in all HTML and JSON files in src/content/bodies
const newFiles = fs.readdirSync(bodiesDir);
for (const file of newFiles) {
  const filePath = path.join(bodiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('/our-team/dr-')) {
    content = content.replace(/\/our-team\/dr-/g, '/our-team/');
    changed = true;
  }
  
  if (content.includes('our-team__dr-')) {
    content = content.replace(/our-team__dr-/g, 'our-team__');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}
console.log('Done removing dr- prefixes');
