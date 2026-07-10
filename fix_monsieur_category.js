const fs = require('fs');

const filesToFix = [
    'src/lib/data/products.ts',
    'src/data/products.json',
    'src/data/new_parsed_products.json'
];

filesToFix.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find MONSIEUR Capules block and replace category
        const titleMatch = content.indexOf('"title": "MONSIEUR Capules"');
        if (titleMatch !== -1) {
            // Find the category within the next 200 characters
            let substring = content.substring(titleMatch, titleMatch + 300);
            
            // Replace Tablets with Capsules
            let newSubstring = substring.replace('"category": "Tablets"', '"category": "Capsules"');
            newSubstring = newSubstring.replace('"dosageForm": "Tablet"', '"dosageForm": "Capsule"');
            
            content = content.substring(0, titleMatch) + newSubstring + content.substring(titleMatch + 300);
            
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed category in ' + file);
        }
    }
});
