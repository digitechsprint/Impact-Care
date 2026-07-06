const fs = require('fs');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');

// 1. Fix the image - replace team-3.jpg with a real gallery image from the homepage
html = html.replace(
    'src="/assets/uploads/2024/12/backup/team-3.jpg"',
    'src="/gallery/WhatsApp%20Image%202026-07-03%20at%205.25.17%20PM.jpeg"'
);

// 2. Fix the Accordion so only one stays open at a time
// In HTML, adding the same 'name' attribute to multiple <details> tags 
// makes them act as an exclusive accordion (opening one closes others).
html = html.replace(/<details class="faq-clean-item"/g, '<details class="faq-clean-item" name="faq-group"');

fs.writeFileSync('src/content/bodies/about-us.html', html);
console.log("Fixed accordion exclusive toggling and updated the gallery image.");
