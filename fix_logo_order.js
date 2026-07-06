const fs = require('fs');

let html = fs.readFileSync('src/content/bodies/index.html', 'utf8');

// The correct mapping based on OCR:
// WHO GMP -> real_logo_5.jpg
// ISO 9001:2015 -> real_logo_4.jpg
// ISO 14001:2015 -> real_logo_3.jpg
// ISO 45001:2018 -> real_logo_2.jpg
// GLP -> real_logo_1.jpg

html = html.replace('<div class="cert-title">WHO GMP</div>', 'MARKER_WHO');
html = html.replace('src="/gallery/real_logo_1.jpg" alt="WHO Logo"', 'src="/gallery/real_logo_5.jpg" alt="WHO Logo"');
html = html.replace('MARKER_WHO', '<div class="cert-title">WHO GMP</div>');

html = html.replace('<div class="cert-title">ISO<br>9001:2015</div>', 'MARKER_9001');
html = html.replace('src="/gallery/real_logo_2.jpg" alt="ISO 9001 Logo"', 'src="/gallery/real_logo_4.jpg" alt="ISO 9001 Logo"');
html = html.replace('MARKER_9001', '<div class="cert-title">ISO<br>9001:2015</div>');

html = html.replace('<div class="cert-title">ISO<br>45001:2018</div>', 'MARKER_45001');
html = html.replace('src="/gallery/real_logo_4.jpg" alt="ISO 45001 Logo"', 'src="/gallery/real_logo_2.jpg" alt="ISO 45001 Logo"');
html = html.replace('MARKER_45001', '<div class="cert-title">ISO<br>45001:2018</div>');

html = html.replace('<div class="cert-title">GLP</div>', 'MARKER_GLP');
html = html.replace('src="/gallery/real_logo_5.jpg" alt="GLP Logo"', 'src="/gallery/real_logo_1.jpg" alt="GLP Logo"');
html = html.replace('MARKER_GLP', '<div class="cert-title">GLP</div>');

fs.writeFileSync('src/content/bodies/index.html', html);
console.log('Successfully fixed the logo arrangement.');
