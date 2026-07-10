const fs = require('fs');
const indexContent = fs.readFileSync('src/content/bodies/index.html', 'utf8');

const regex = /<h4[^>]*>Cardio-Diabetics<\/h4>[\s\S]*?Read more/i;
const match = regex.exec(indexContent);
if (match) {
    const idx = match.index;
    console.log(indexContent.substring(Math.max(0, idx - 200), idx + 500));
} else {
    console.log("Not found in this exact format. Searching generally for Read more...");
    const generalRegex = /Cardio-Diabetics[\s\S]{0,300}Read more/i;
    const gMatch = generalRegex.exec(indexContent);
    if (gMatch) {
        const idx = gMatch.index;
        console.log(indexContent.substring(Math.max(0, idx - 200), idx + 500));
    } else {
        console.log("Still not found.");
    }
}
