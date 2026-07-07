const fs = require('fs');
const cheerio = require('cheerio');

// 1. Add CSS
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const workflowV2Css = `
/* =========================================
   QUALITY WORKFLOW: EXACT TIMELINE DESIGN
   ========================================= */
.wf-section {
    background-color: #fafafa;
    padding: 120px 20px;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
}

.wf-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}

/* The Center Vertical Line */
.wf-container::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background-color: #b57738;
}

.wf-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 120px;
    position: relative;
    width: 100%;
}
.wf-item:last-child {
    margin-bottom: 0;
}

/* The Center Circle Node */
.wf-item::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    background-color: #fafafa;
    border: 4px solid #b57738;
    border-radius: 50%;
    z-index: 2;
}

.wf-content {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.wf-image-box {
    width: 45%;
    position: relative;
}

.wf-image-box img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    display: block;
}

/* Typography */
.wf-number {
    font-family: 'Georgia', serif;
    font-size: 100px;
    font-weight: 400;
    color: #5d3f2c;
    line-height: 1;
    margin-bottom: 20px;
}

.wf-heading {
    font-size: 42px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
    margin: 0;
}

/* Alternating Layout */
/* Odd Items: Text Left, Image Right */
.wf-item:nth-child(odd) {
    flex-direction: row;
}
.wf-item:nth-child(odd) .wf-content {
    align-items: flex-end;
    text-align: right;
    padding-right: 50px;
}
.wf-item:nth-child(odd) .wf-image-box {
    padding-left: 50px;
}

/* Even Items: Text Right, Image Left */
.wf-item:nth-child(even) {
    flex-direction: row-reverse;
}
.wf-item:nth-child(even) .wf-content {
    align-items: flex-start;
    text-align: left;
    padding-left: 50px;
}
.wf-item:nth-child(even) .wf-image-box {
    padding-right: 50px;
}

@media (max-width: 992px) {
    .wf-container::before { left: 30px; }
    .wf-item { flex-direction: column !important; align-items: flex-start; margin-bottom: 80px; }
    .wf-item::after { left: 30px; top: 0; transform: translate(-50%, 0); }
    
    .wf-content, .wf-image-box { width: 100%; padding-left: 80px !important; padding-right: 0 !important; text-align: left !important; align-items: flex-start !important; }
    .wf-content { margin-bottom: 30px; }
    .wf-number { font-size: 70px; }
    .wf-heading { font-size: 32px; }
}
`;

css += '\n' + workflowV2Css;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Replace HTML
let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const images = [
    '/assets/images/workflow_vendor.png',
    '/assets/images/workflow_inspection.png',
    '/assets/images/workflow_mfg.png',
    '/assets/images/workflow_testing.png'
];

const steps = [
    "Approved Vendor",
    "Raw Material Inspection",
    "Manufacturing Process Control",
    "In-Process Quality Checks",
    "Finished Product Testing",
    "Batch Review & Approval",
    "Packaging Verification",
    "Market Release"
];

let itemsHtml = '';
steps.forEach((step, index) => {
    const num = (index + 1).toString().padStart(2, '0');
    const imgObj = images[index % images.length];
    
    itemsHtml += `
        <div class="wf-item">
            <div class="wf-content">
                <div class="wf-number">${num}</div>
                <h3 class="wf-heading">${step}</h3>
            </div>
            <div class="wf-image-box">
                <img src="${imgObj}" alt="${step}">
            </div>
        </div>
    `;
});

const newWorkflowHtml = `
<!-- SECTION 5: Workflow (Timeline Exact Design) -->
<div class="wf-section">
    <div class="wf-container">
        ${itemsHtml}
    </div>
</div>
`;

$('.q-workflow-section').replaceWith(newWorkflowHtml);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Replaced Workflow section with exact Timeline design.");
