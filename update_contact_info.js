const fs = require('fs');
const path = require('path');

const newPhone = '+91 9999976844';
const newPhoneHref = 'tel:+919999976844';
const newEmail = 'info@impactcare.co.in';
const newAddress = 'Impact Healthcare Private Limited, 302, Maharaja Aggarsain Shopping Complex, LSC - 7, Sector - 9, Rohini, New Delhi - 110085';

const directoriesToScan = ['.', 'src/content/bodies'];

let updatedCount = 0;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            // Phones (visible and href)
            const phoneReplacements = [
                { from: '+(91) 8595-872-604', to: newPhone },
                { from: '+91 8595-872-604', to: newPhone },
                { from: '+918595872604', to: newPhone },
                { from: '+91 8595872604', to: newPhone },
                { from: 'tel:+918595872604', to: newPhoneHref },
                { from: 'tel:+1%20(213)%20465%20789', to: newPhoneHref }
            ];

            for (const r of phoneReplacements) {
                if (content.includes(r.from)) {
                    content = content.split(r.from).join(r.to);
                    modified = true;
                }
            }

            // Emails
            const emailReplacements = [
                { from: 'info@domain.com', to: newEmail },
                { from: 'mailto:%20info@domain.com', to: 'mailto:' + newEmail },
                { from: 'mailto:info@domain.com', to: 'mailto:' + newEmail }
            ];

            for (const r of emailReplacements) {
                if (content.includes(r.from)) {
                    content = content.split(r.from).join(r.to);
                    modified = true;
                }
            }

            // Address
            const oldAddress1 = '210-302, Maharaja Agrasen Shopping Complex, L.S.C.7, Sector 9, Rohini, Delhi - 110085. INDIA';
            
            if (content.includes(oldAddress1)) {
                content = content.split(oldAddress1).join(newAddress);
                modified = true;
            } else {
                // For cases where it's split across lines
                const regexAddress = /210-302, Maharaja Agrasen Shopping Complex, L\.S\.C\.7, Sector 9,[\s\S]*?Rohini, Delhi - 110085\. INDIA/g;
                if (regexAddress.test(content)) {
                    content = content.replace(regexAddress, newAddress);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                updatedCount++;
            }
        }
    }
}

for (const dir of directoriesToScan) {
    if (fs.existsSync(dir)) {
        processDirectory(dir);
    }
}

console.log(`Successfully updated ${updatedCount} HTML files.`);
