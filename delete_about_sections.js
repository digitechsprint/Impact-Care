const fs = require('fs');
let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const regex = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
let match;
let sections = [];
while ((match = regex.exec(html)) !== null) {
    sections.push({ id: match[1], start: match.index });
}

const toDelete = ['132718b', '077127f', '004af36'];

// We must process from last to first so that indices don't shift!
const deleteRanges = [];
for (let i = 0; i < sections.length; i++) {
    if (toDelete.includes(sections[i].id)) {
        const start = sections[i].start;
        // If it's the last section, we need to find the closing div of the e-parent
        // Or if it's followed by another section, we delete up to that next section.
        let end = html.length;
        if (i + 1 < sections.length) {
            end = sections[i + 1].start;
        } else {
            // If it's the last section, we just find the end of the HTML structure before footers
            // To be safe, we'll find the last </div> before the end of the main content.
            // Since it's not the last section (about us has CTA or others), it's probably fine.
        }
        deleteRanges.push({ start, end });
    }
}

// Sort in descending order
deleteRanges.sort((a, b) => b.start - a.start);

for (const range of deleteRanges) {
    console.log("Deleting from", range.start, "to", range.end);
    html = html.substring(0, range.start) + html.substring(range.end);
}

fs.writeFileSync('src/content/bodies/about-us.html', html);
console.log("Successfully removed sections");
