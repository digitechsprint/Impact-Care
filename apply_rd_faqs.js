const fs = require('fs');
const cheerio = require('cheerio');

// 1. Append CSS for R&D FAQ Grid
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const rdFaqCss = `
/* =========================================
   R&D FAQ GRID SECTION
   ========================================= */
.rd-faq-section {
    background-color: #fdfcfc;
    padding: 100px 20px;
    font-family: 'Inter', sans-serif;
}

.rd-faq-container {
    max-width: 1200px;
    margin: 0 auto;
}

.rd-faq-header {
    text-align: center;
    margin-bottom: 60px;
}

.rd-faq-heading {
    font-size: 42px;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 15px;
}

.rd-faq-subheading {
    font-size: 18px;
    color: #475569;
}

.rd-faq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.rd-faq-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 50px 40px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.04);
    border: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
}

.rd-faq-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 184, 83, 0.1);
    border-color: #00b853;
}

.rd-faq-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 5px;
    background: linear-gradient(90deg, #00b853, #f97316);
}

.rd-faq-question {
    font-size: 24px;
    font-weight: 800;
    color: #2b3a8c; /* Brand Dark Blue */
    margin-bottom: 25px;
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 15px;
}

.rd-faq-q-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    background: #f0fdf4;
    color: #00b853;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.rd-faq-answer {
    font-size: 17px;
    color: #475569;
    line-height: 1.8;
}

.rd-faq-list {
    margin-top: 15px;
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.rd-faq-list li {
    position: relative;
    padding-left: 25px;
    font-size: 16px;
    color: #334155;
    font-weight: 500;
}

.rd-faq-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0;
    color: #f97316;
    font-weight: bold;
}

@media (max-width: 992px) {
    .rd-faq-grid { grid-template-columns: 1fr; }
}
`;

css = css + '\n' + rdFaqCss;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Append HTML to rd.html
let html = fs.readFileSync('src/content/bodies/rd.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const rdFaqHtml = `
<!-- R&D SECTION 4: FAQ (GRID) -->
<div class="rd-faq-section">
    <div class="rd-faq-container">
        <div class="rd-faq-header">
            <h2 class="rd-faq-heading">Frequently Asked Questions</h2>
            <p class="rd-faq-subheading">Learn more about our Research & Development process.</p>
        </div>
        
        <div class="rd-faq-grid">
            <!-- FAQ 1 -->
            <div class="rd-faq-card">
                <div class="rd-faq-question">
                    <div class="rd-faq-q-icon"><i class="fa fa-lightbulb"></i></div>
                    Do you develop new products?
                </div>
                <div class="rd-faq-answer">
                    Yes. We continuously evaluate healthcare needs and work with formulation experts and manufacturing partners to expand and strengthen our product portfolio.
                </div>
            </div>
            
            <!-- FAQ 2 -->
            <div class="rd-faq-card">
                <div class="rd-faq-question">
                    <div class="rd-faq-q-icon"><i class="fa fa-flask"></i></div>
                    Which therapeutic areas are your future focus?
                </div>
                <div class="rd-faq-answer">
                    Our upcoming focus areas include:
                    <ul class="rd-faq-list">
                        <li>Neuro-Psychiatry</li>
                        <li>Orthopedics</li>
                        <li>Respiratory Care</li>
                        <li>Women's Healthcare</li>
                        <li>Gastroenterology</li>
                        <li>Dermatology</li>
                        <li>Ophthalmology</li>
                        <li>Nutraceuticals</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
`;

$('[data-elementor-type="wp-page"]').append(rdFaqHtml);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/rd.html', finalHtml);
console.log("Appended R&D FAQs.");
