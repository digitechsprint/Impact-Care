const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\akkik\\.gemini\\antigravity-ide\\brain\\1744ef03-8a70-468e-93db-8c0c4ec93a1e';
const targetDir = path.join(__dirname, 'public', 'assets', 'uploads', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Find the generated images
const allFiles = fs.readdirSync(brainDir);
const imageFiles = [
  allFiles.find(f => f.startsWith('logistics_map')),
  allFiles.find(f => f.startsWith('logistics_plane')),
  allFiles.find(f => f.startsWith('logistics_ship')),
  allFiles.find(f => f.startsWith('logistics_command_center')),
  allFiles.find(f => f.startsWith('logistics_drone')),
  allFiles.find(f => f.startsWith('logistics_container')),
  allFiles.find(f => f.startsWith('logistics_fleet')),
].filter(Boolean);

console.log('Found images:', imageFiles);

const newImagePaths = [];

imageFiles.forEach((file, index) => {
  const sourcePath = path.join(brainDir, file);
  const targetName = `global_logistics_${index + 1}.png`;
  const targetPath = path.join(targetDir, targetName);
  fs.copyFileSync(sourcePath, targetPath);
  newImagePaths.push(`/assets/uploads/images/${targetName}`);
});

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const htmlFiles = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

let imageIndex = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(bodiesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const imgRegex = /<img[^>]*service-img-3\.jpg[^>]*>/g;
  
  content = content.replace(imgRegex, (match) => {
    changed = true;
    const newSrc = newImagePaths[imageIndex % newImagePaths.length];
    imageIndex++;
    
    // Replace src
    let updatedMatch = match.replace(/src="[^"]+"/, `src="${newSrc}"`);
    // Remove srcset and sizes to prevent broken responsive images
    updatedMatch = updatedMatch.replace(/srcset="[^"]+"/g, '');
    updatedMatch = updatedMatch.replace(/sizes="[^"]+"/g, '');
    
    return updatedMatch;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});
