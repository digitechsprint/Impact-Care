const fs = require('fs');
const cheerio = require('cheerio');

// 1. Append New CSS
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const v2PromiseCss = `
/* =========================================
   QUALITY PAGE: PROMISE REDESIGN (AWAKEN)
   ========================================= */
.q-promise-v2 {
    background-color: #fdfcfc; /* Very clean background */
    padding: 120px 20px;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
}

.q-promise-v2::before {
    content: '';
    position: absolute;
    top: -150px;
    left: -150px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0,184,83,0.05) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
}

.q-promise-v2-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    text-align: center;
}

.q-promise-v2-quote-icon {
    font-size: 50px;
    color: #f97316;
    margin-bottom: 25px;
    opacity: 0.8;
}

.q-promise-v2-quote {
    font-size: 34px;
    font-weight: 800;
    color: #1e293b;
    line-height: 1.4;
    max-width: 1000px;
    margin: 0 auto 70px;
}

.q-promise-v2-quote span {
    color: #00b853;
}

.q-counters-v2-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
}

.q-counter-v2-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 40px 25px;
    width: calc(20% - 20px);
    min-width: 200px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.04);
    border: 1px solid rgba(0, 184, 83, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
}

.q-counter-v2-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00b853, #f97316);
    border-radius: 0 0 20px 20px;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.q-counter-v2-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 184, 83, 0.12);
    border-color: #00b853;
}

.q-counter-v2-card:hover::after {
    opacity: 1;
}

.q-counter-v2-icon {
    width: 70px;
    height: 70px;
    background: #f0fdf4;
    color: #00b853;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin: 0 auto 25px;
    transition: all 0.4s ease;
}

.q-counter-v2-card:hover .q-counter-v2-icon {
    background: #00b853;
    color: #ffffff;
    transform: scale(1.1);
}

.q-counter-v2-card h4 {
    font-size: 17px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.5;
    margin: 0;
}

@media (max-width: 1024px) {
    .q-counter-v2-card { width: calc(33.33% - 16px); }
}
@media (max-width: 768px) {
    .q-counter-v2-card { width: calc(50% - 12px); }
    .q-promise-v2-quote { font-size: 26px; }
}
@media (max-width: 480px) {
    .q-counter-v2-card { width: 100%; }
}
`;

css += '\n' + v2PromiseCss;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Replace HTML
let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const promiseV2Html = `
<!-- SECTION 8: Promise & Counters (Awaken V2) -->
<div class="q-promise-v2">
    <div class="q-promise-v2-container">
        <i class="fa fa-quote-left q-promise-v2-quote-icon"></i>
        <div class="q-promise-v2-quote">
            "Every product we offer reflects our commitment to <span>quality, safety, efficacy, and trust</span>—because better quality means better healthcare."
        </div>
        
        <div class="q-counters-v2-grid">
            <div class="q-counter-v2-card">
                <div class="q-counter-v2-icon"><i class="fa fa-qrcode"></i></div>
                <h4>100% Batch Traceability</h4>
            </div>
            <div class="q-counter-v2-card">
                <div class="q-counter-v2-icon"><i class="fa fa-check-double"></i></div>
                <h4>Multi-Level Quality Checks</h4>
            </div>
            <div class="q-counter-v2-card">
                <div class="q-counter-v2-icon"><i class="fa fa-industry"></i></div>
                <h4>GMP-Compliant Manufacturing Partners</h4>
            </div>
            <div class="q-counter-v2-card">
                <div class="q-counter-v2-icon"><i class="fa fa-microscope"></i></div>
                <h4>Stringent QA & QC Processes</h4>
            </div>
            <div class="q-counter-v2-card">
                <div class="q-counter-v2-icon"><i class="fa fa-globe"></i></div>
                <h4>Commitment to Global Quality Standards</h4>
            </div>
        </div>
    </div>
</div>
`;

$('.q-promise-section').replaceWith(promiseV2Html);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Replaced footer promise section with Awaken V2 design.");
