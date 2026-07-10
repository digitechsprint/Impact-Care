const fs = require('fs');

const filesToFix = [
    'src/lib/data/products.ts',
    'src/data/products.json',
    'src/data/new_parsed_products.json'
];

filesToFix.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        let modified = false;
        
        // Find IPOZOLE 20mg Tablets and replace it with IPOZOLE 20mg Capsule
        if (content.includes('IPOZOLE 20mg Tablets') || content.includes('IPOZOLE 20mg Tablet')) {
            content = content.replace(/IPOZOLE 20mg Tablets/g, 'IPOZOLE 20mg Capsule');
            content = content.replace(/IPOZOLE 20mg Tablet/g, 'IPOZOLE 20mg Capsule');
            modified = true;
        }
        
        // Find the IPOZOLE 20mg block specifically to change its category
        const titleMatch = content.indexOf('"title": "IPOZOLE 20mg Capsule"');
        if (titleMatch !== -1) {
            let substring = content.substring(titleMatch, titleMatch + 300);
            
            // Replace Tablets with Capsules
            let newSubstring = substring.replace('"category": "Tablets"', '"category": "Capsules"');
            newSubstring = newSubstring.replace('"dosageForm": "Tablet"', '"dosageForm": "Capsule"');
            
            if (newSubstring !== substring) {
                content = content.substring(0, titleMatch) + newSubstring + content.substring(titleMatch + 300);
                modified = true;
            }
        }
        
        // Let's also check if the title was capitalized differently, e.g., "IPOZOLE 20mg TABLETS"
        if (content.includes('IPOZOLE')) {
            // A more robust regex replace for just the title
            content = content.replace(/"title"\s*:\s*"IPOZOLE 20mg[^"]*"/g, '"title": "IPOZOLE 20mg Capsule"');
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed IPOZOLE in ' + file);
        }
    }
});
