const fs = require('fs');

// Check index.html for divisions
const indexContent = fs.readFileSync('src/content/bodies/index.html', 'utf8');
const idx = indexContent.toLowerCase().indexOf('cardio-diabetics');
if (idx !== -1) {
    console.log('--- Cardio-Diabetics Context in index.html ---');
    console.log(indexContent.substring(Math.max(0, idx - 500), idx + 500));
} else {
    // maybe "Cardio Diabetics" without hyphen?
    const idx2 = indexContent.toLowerCase().indexOf('cardio');
    if (idx2 !== -1) {
        console.log('--- Cardio Context in index.html ---');
        console.log(indexContent.substring(Math.max(0, idx2 - 500), idx2 + 500));
    }
}

// Check how categories are defined in products.ts
const productsContent = fs.readFileSync('src/lib/data/products.ts', 'utf8');
// Extract all unique categories
const regex = /"category"\s*:\s*"([^"]+)"/g;
const categories = new Set();
let match;
while ((match = regex.exec(productsContent)) !== null) {
    categories.add(match[1]);
}
console.log('\n--- Product Categories ---');
console.log(Array.from(categories));
