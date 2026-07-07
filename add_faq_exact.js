const fs = require('fs');
const cheerio = require('cheerio');

// 1. Add CSS
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const faqV2Css = `
/* =========================================
   QUALITY FAQ: EXACT VISEN DESIGN
   ========================================= */
.faq-v2-section {
    background-color: #ffffff;
    padding: 120px 20px;
    font-family: 'Inter', sans-serif;
}

.faq-v2-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    gap: 80px;
}

.faq-v2-left {
    flex: 1;
}

.faq-v2-right {
    flex: 1;
    position: relative;
}

/* Typography & Pill */
.faq-v2-pill {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 25px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.faq-v2-pill::before {
    content: '';
    width: 6px; height: 6px;
    background: #00b853;
    border-radius: 50%;
}

.faq-v2-heading {
    font-size: 46px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
    margin: 0 0 50px 0;
}

/* Accordion using Details/Summary */
.faq-v2-accordion {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.faq-v2-item {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 20px;
}
.faq-v2-item[open] {
    border-bottom-color: transparent;
}
.faq-v2-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    cursor: pointer;
    list-style: none;
    transition: color 0.3s ease;
}
.faq-v2-summary::-webkit-details-marker {
    display: none;
}
.faq-v2-summary:hover {
    color: #00b853;
}
.faq-v2-icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: #00b853;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    transition: transform 0.3s ease, background 0.3s ease;
}
.faq-v2-item[open] .faq-v2-icon {
    background: #0f172a;
    transform: rotate(180deg);
}
.faq-v2-content {
    padding-top: 15px;
    font-size: 16px;
    line-height: 1.7;
    color: #475569;
    padding-right: 40px;
}
.faq-v2-content ul {
    margin: 10px 0 0 0;
    padding-left: 20px;
}
.faq-v2-content ul li {
    margin-bottom: 5px;
}

/* Right Image Box */
.faq-v2-image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
.faq-v2-image-wrapper img {
    width: 100%;
    display: block;
    border-radius: 20px;
}
.faq-v2-float-card {
    position: absolute;
    bottom: -20px;
    left: -20px;
    background: #ffffff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    max-width: 250px;
}
.faq-v2-float-icon {
    width: 50px; height: 50px;
    background: #00b853;
    border-radius: 12px;
    color: #ffffff;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}
.faq-v2-float-text {
    font-size: 20px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.3;
}

@media (max-width: 992px) {
    .faq-v2-container { flex-direction: column; gap: 60px; }
    .faq-v2-float-card { bottom: 20px; left: 20px; }
    .faq-v2-heading { font-size: 36px; }
}
`;

css += '\n' + faqV2Css;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Replace HTML
let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const faqV2Html = `
<!-- SECTION 7: FAQ (Visen Exact Design) -->
<div class="faq-v2-section">
    <div class="faq-v2-container">
        
        <!-- Left: Accordion -->
        <div class="faq-v2-left">
            <div class="faq-v2-pill">Frequently Asked Question</div>
            <h2 class="faq-v2-heading">Quality & Compliance</h2>
            
            <div class="faq-v2-accordion">
                <details class="faq-v2-item" open>
                    <summary class="faq-v2-summary">
                        1. How do you ensure product quality?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Quality is ensured through:
                        <ul>
                            <li>Approved manufacturing partners</li>
                            <li>Raw material testing</li>
                            <li>In-process quality checks</li>
                            <li>Finished product testing</li>
                            <li>Batch documentation review</li>
                            <li>Quality assurance and quality control procedures</li>
                        </ul>
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        2. Do you work with manufacturers having international standards?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Yes. We prioritize partnerships with manufacturers operating under internationally recognized quality systems, including WHO-GMP, EU-GMP aligned facilities, and ISO-certified quality management systems where applicable.
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        3. Do your products undergo quality testing before release?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Yes. Products undergo rigorous quality evaluation and approval processes before they are released for commercial distribution.
                    </div>
                </details>
            </div>
        </div>

        <!-- Right: Image -->
        <div class="faq-v2-right">
            <div class="faq-v2-image-wrapper">
                <img src="/assets/images/quality_faq.png" alt="Quality FAQ">
                <div class="faq-v2-float-card">
                    <div class="faq-v2-float-icon"><i class="fa fa-question-circle"></i></div>
                    <div class="faq-v2-float-text">Relax, We've Got the Answers</div>
                </div>
            </div>
        </div>
        
    </div>
</div>
`;

// Insert the FAQ before the promise section
$('.q-promise-v2').before(faqV2Html);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Added exact Visen FAQ section with Impact colors to Quality page.");
