const fs = require('fs');
let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

const regex = /<div class="elementor-element elementor-element-([a-z0-9]+) [^"]*e-parent/g;
let match;
let sections = [];
while ((match = regex.exec(html)) !== null) {
    sections.push({ id: match[1], start: match.index });
}

for (let i = 0; i < sections.length; i++) {
    const start = sections[i].start;
    const end = (i + 1 < sections.length) ? sections[i+1].start : html.length;
    const chunk = html.substring(start, end);
    if (chunk.includes('Why Choose')) console.log('Why Choose Us:', sections[i].id);
    if (chunk.includes('How We Work')) console.log('How We Work:', sections[i].id);
    if (chunk.includes('Testimonials')) console.log('Testimonials:', sections[i].id);
    if (chunk.includes('Take the first step')) console.log('CTA:', sections[i].id);
}
