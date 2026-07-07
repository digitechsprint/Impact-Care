const fs = require('fs');
const cheerio = require('cheerio');

// 1. Add CSS
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const genlabCss = `
/* =========================================
   GENLAB EXACT DESIGN (REGULATORY & PACKAGING)
   ========================================= */
.genlab-wrapper {
    background-color: #06394c;
    background-image: radial-gradient(circle at 15% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 85% 30%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    /* Basic Hex pattern overlay if needed, but solid dark teal is the base */
    padding: 120px 20px;
    font-family: 'Inter', sans-serif;
    color: #ffffff;
}

.genlab-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 120px;
}

.genlab-row {
    display: flex;
    align-items: center;
    gap: 80px;
}

.genlab-row.genlab-reverse {
    flex-direction: row-reverse;
}

.genlab-content {
    flex: 1;
}

.genlab-image {
    flex: 1;
}

.genlab-image img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
    display: block;
}

/* Pill */
.genlab-pill {
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 25px;
    letter-spacing: 0.5px;
}
.genlab-pill::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #00e0a5;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

/* Headings */
.genlab-heading {
    font-size: 46px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 30px;
    color: #ffffff;
}
.genlab-heading span {
    color: #00e0a5;
    font-weight: 300;
}

.genlab-subheading {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #ffffff;
}

/* Description */
.genlab-desc {
    font-size: 16px;
    line-height: 1.8;
    color: #b0c7cf;
    margin-bottom: 35px;
}

/* List */
.genlab-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 30px;
    list-style: none;
    padding: 0;
    margin: 0;
}
.genlab-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
}
.genlab-list li i {
    color: #00e0a5;
    font-size: 18px;
}

@media (max-width: 992px) {
    .genlab-row, .genlab-row.genlab-reverse {
        flex-direction: column;
        gap: 50px;
    }
    .genlab-list {
        grid-template-columns: 1fr;
    }
    .genlab-heading {
        font-size: 36px;
    }
}
`;

css += '\n' + genlabCss;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Replace HTML
let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const newGenlabHtml = `
<div class="genlab-wrapper">
    <div class="genlab-container">
        
        <!-- Row 1: Regulatory Compliance -->
        <div class="genlab-row">
            <div class="genlab-content">
                <div class="genlab-pill">Our Standards</div>
                <h2 class="genlab-heading">Regulatory <span>Compliance</span></h2>
                <p class="genlab-desc">We ensure compliance with applicable pharmaceutical regulations and quality guidelines through our manufacturing partnerships and internal quality systems.</p>
                
                <ul class="genlab-list">
                    <li><i class="fa fa-check-circle"></i> Good Manufacturing Practices</li>
                    <li><i class="fa fa-check-circle"></i> Product Documentation</li>
                    <li><i class="fa fa-check-circle"></i> Pharmacovigilance Support</li>
                    <li><i class="fa fa-check-circle"></i> Complaint Handling System</li>
                    <li><i class="fa fa-check-circle"></i> Product Recall Readiness</li>
                    <li><i class="fa fa-check-circle"></i> Quality Improvement</li>
                </ul>
            </div>
            <div class="genlab-image">
                <img src="/assets/images/genlab_scientist.png" alt="Regulatory Compliance Scientist">
            </div>
        </div>

        <!-- Row 2: Packaging Quality -->
        <div class="genlab-row genlab-reverse">
            <div class="genlab-content">
                <h3 class="genlab-subheading">Packaging Quality</h3>
                <p class="genlab-desc">Product packaging plays a critical role in maintaining product integrity and patient safety.</p>
                
                <ul class="genlab-list">
                    <li><i class="fa fa-check-circle"></i> Tamper-Evident Packaging</li>
                    <li><i class="fa fa-check-circle"></i> Accurate Labeling</li>
                    <li><i class="fa fa-check-circle"></i> Batch Traceability</li>
                    <li><i class="fa fa-check-circle"></i> Shelf-Life Protection</li>
                    <li><i class="fa fa-check-circle"></i> Transport Stability</li>
                    <li><i class="fa fa-check-circle"></i> Authentication Measures</li>
                </ul>
            </div>
            <div class="genlab-image">
                <img src="/assets/images/genlab_equipment.png" alt="Packaging Quality Lab Equipment">
            </div>
        </div>
        
    </div>
</div>
`;

$('.q-saas-section').replaceWith(newGenlabHtml);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Replaced SaaS section with Genlab exact design.");
