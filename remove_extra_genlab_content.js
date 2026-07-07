const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const exactPolicyHtml = `
<!-- SECTION 2: Policy (Genlab Exact Design - Content Strictly Matched) -->
<div class="gl-policy-section">
    <div class="gl-policy-container">
        
        <!-- Left Content -->
        <div class="gl-policy-left">
            <p class="gl-policy-desc" style="font-size: 24px; font-weight: 300; line-height: 1.6; color: #0f172a; font-style: italic; margin-bottom: 20px;">
                "We are committed to providing high-quality pharmaceutical, nutraceutical, and herbal healthcare products that consistently meet customer expectations and applicable regulatory requirements through continuous improvement, ethical business practices, and a culture of quality excellence."
            </p>
            <div style="font-size: 16px; font-weight: 700; color: #00b853; text-transform: uppercase; letter-spacing: 2px;">
                Our Quality Policy
            </div>
        </div>
        
        <!-- Right Image -->
        <div class="gl-policy-right">
            <div class="gl-policy-arc"></div>
            <img src="/assets/images/scientist_cutout.png" alt="Scientist" class="gl-policy-image">
        </div>
        
    </div>
</div>
`;

$('.gl-policy-section').replaceWith(exactPolicyHtml);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Removed extra Genlab elements, kept only the user's quote.");
