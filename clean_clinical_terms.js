const fs = require('fs');
const path = require('path');

const bodiesDir = path.join(__dirname, 'src/content/bodies');

const replacements = [
  { search: /Talk to our 48\+ Doctors/g, replace: 'Consult our R&D Experts' },
  { search: /Care \& Cure/g, replace: 'Quality & Precision' },
  { search: /From Care to Cure/g, replace: 'From Concept to Commercialization' },
  { search: /cared for to be cured/g, replace: 'developed for optimal efficacy' },
  { search: /Opening Hours/g, replace: 'Business Hours' },
  { search: /VIDEO CALL SUPPORT/g, replace: 'GLOBAL SUPPORT' },
  { search: /Our neurology department provides expert care for conditions affecting the brain, spine, and nervous system/g, replace: 'Our quality control department ensures the highest standards of safety, purity, and efficacy' },
  { search: /Neurology/g, replace: 'Quality Control' },
  { search: /neurology/g, replace: 'quality-control' },
  { search: /transform the lives of our patients/g, replace: 'transform the healthcare landscape' },
  { search: /'From Care to Cure' inspires all/g, replace: "'From Concept to Commercialization' inspires all" },
  { search: /more than 15,000 doctors/g, replace: 'more than 15,000 global partners' },
  { search: /personalized healthcare/g, replace: 'specialized manufacturing' },
  { search: /patient-centered approach/g, replace: 'quality-centered approach' },
  { search: /Why patients trust us with their care/g, replace: 'Why partners trust us with their products' },
  { search: /Pain-Free Treatment/g, replace: 'Defect-Free Production' }
];

const files = fs.readdirSync(bodiesDir);
for (const file of files) {
  if (file.endsWith('.html') || file.endsWith('.json')) {
    const filePath = path.join(bodiesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const { search, replace } of replacements) {
      content = content.replace(search, replace);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  }
}

// Update pages-manifest.json too
const manifestPath = path.join(__dirname, 'src/content/pages-manifest.json');
let manifestContent = fs.readFileSync(manifestPath, 'utf8');
let origManifestContent = manifestContent;
for (const { search, replace } of replacements) {
  manifestContent = manifestContent.replace(search, replace);
}
if (manifestContent !== origManifestContent) {
  fs.writeFileSync(manifestPath, manifestContent);
  console.log('Updated pages-manifest.json');
}

console.log('Done cleaning clinical text references');
