const fs = require('fs');
let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const regex = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
let match;
let sections = [];
while ((match = regex.exec(html)) !== null) {
    sections.push({ id: match[1], start: match.index });
}

const toDelete = ['132718b', '077127f', 'bee7fb8', '004af36'];

const deleteRanges = [];
for (let i = 0; i < sections.length; i++) {
    if (toDelete.includes(sections[i].id)) {
        const start = sections[i].start;
        let end = html.length;
        if (i + 1 < sections.length) {
            end = sections[i + 1].start;
        } else {
            console.log("WARNING: deleting last section");
        }
        deleteRanges.push({ start, end });
    }
}

// Sort descending
deleteRanges.sort((a, b) => b.start - a.start);

for (const range of deleteRanges) {
    console.log("Deleting from", range.start, "to", range.end);
    html = html.substring(0, range.start) + html.substring(range.end);
}

fs.writeFileSync('src/content/bodies/about-us.html', html);
console.log("Successfully removed sections");
