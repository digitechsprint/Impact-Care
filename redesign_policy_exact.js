const fs = require('fs');
const cheerio = require('cheerio');

// 1. Add CSS
let css = fs.readFileSync('src/styles/globals.css', 'utf8');

const glPolicyCss = `
/* =========================================
   QUALITY POLICY: GENLAB EXACT DESIGN
   ========================================= */
.gl-policy-section {
    background-color: #f8fafc;
    background-image: radial-gradient(circle at 10% 90%, rgba(0, 184, 83, 0.05) 0%, transparent 50%),
                      url('data:image/svg+xml;utf8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M20 0l20 10v20L20 40 0 30V10z" fill="none" stroke="rgba(0,184,83,0.03)"/></svg>');
    padding: 120px 20px;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
}

.gl-policy-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 60px;
    position: relative;
    z-index: 2;
}

.gl-policy-left {
    flex: 1;
    max-width: 550px;
}

.gl-policy-right {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

/* Pill */
.gl-policy-pill {
    display: inline-block;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 30px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 25px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}
.gl-policy-pill::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #00b853;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

/* Headings */
.gl-policy-heading {
    font-size: 52px;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 25px;
    color: #0f172a;
    letter-spacing: -1px;
}
.gl-policy-heading span {
    color: #00b853;
    font-weight: 400;
}

/* Description */
.gl-policy-desc {
    font-size: 16px;
    line-height: 1.8;
    color: #475569;
    margin-bottom: 40px;
}

/* Progress Bar */
.gl-policy-progress-box {
    margin-bottom: 40px;
}
.gl-policy-progress-top {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
    font-size: 15px;
}
.gl-policy-progress-bar {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    position: relative;
}
.gl-policy-progress-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    width: 100%; /* Setting to 100% since it's quality compliance */
    background: linear-gradient(90deg, #0f172a, #00b853);
    border-radius: 4px;
}

/* Stats Cards */
.gl-policy-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
}
.gl-policy-stat-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 25px 20px;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
    border: 1px solid rgba(0, 184, 83, 0.05);
}
.gl-policy-stat-card i {
    font-size: 30px;
    color: #00b853;
}
.gl-policy-stat-info h4 {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 5px 0;
}
.gl-policy-stat-info p {
    font-size: 13px;
    color: #64748b;
    margin: 0;
    line-height: 1.4;
}

/* Actions */
.gl-policy-actions {
    display: flex;
    align-items: center;
    gap: 30px;
}
.gl-policy-btn {
    background: #00b853;
    color: #ffffff;
    padding: 14px 28px;
    border-radius: 30px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}
.gl-policy-btn i {
    background: #ffffff;
    color: #00b853;
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
.gl-policy-btn:hover {
    background: #0f172a;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,184,83,0.3);
}

.gl-policy-phone {
    display: flex;
    align-items: center;
    gap: 12px;
}
.gl-policy-phone i {
    width: 40px; height: 40px;
    background: #ffffff;
    color: #00b853;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.gl-policy-phone-text {
    display: flex;
    flex-direction: column;
}
.gl-policy-phone-text span {
    font-size: 12px;
    color: #64748b;
}
.gl-policy-phone-text strong {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
}

/* Right Side - Image and Arc */
.gl-policy-arc {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    border: 20px solid #00b853;
    border-radius: 50%;
    border-left-color: transparent;
    border-bottom-color: transparent;
    z-index: 1;
    opacity: 0.9;
}
.gl-policy-image {
    position: relative;
    z-index: 2;
    width: 90%;
    max-width: 500px;
    mix-blend-mode: multiply;
}

/* Floating Card */
.gl-policy-float-card {
    position: absolute;
    bottom: 50px;
    left: -30px;
    background: #ffffff;
    padding: 15px 25px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    z-index: 3;
}
.gl-policy-float-avatar {
    width: 45px;
    height: 45px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00b853;
    font-size: 20px;
}
.gl-policy-float-text h5 {
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 2px 0;
}
.gl-policy-float-text p {
    font-size: 12px;
    color: #64748b;
    margin: 0;
}

@media (max-width: 992px) {
    .gl-policy-container { flex-direction: column; }
    .gl-policy-right { margin-top: 50px; }
    .gl-policy-arc { width: 400px; height: 400px; }
}
@media (max-width: 768px) {
    .gl-policy-stats { flex-direction: column; }
    .gl-policy-actions { flex-direction: column; align-items: flex-start; }
    .gl-policy-heading { font-size: 40px; }
}
`;

css += '\n' + glPolicyCss;
fs.writeFileSync('src/styles/globals.css', css);

// 2. Replace HTML
let html = fs.readFileSync('src/content/bodies/quality.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const exactPolicyHtml = `
<!-- SECTION 2: Policy (Genlab Exact Design) -->
<div class="gl-policy-section">
    <div class="gl-policy-container">
        
        <!-- Left Content -->
        <div class="gl-policy-left">
            <div class="gl-policy-pill">What We Do</div>
            <h2 class="gl-policy-heading">Our Quality<br><span>Policy</span></h2>
            
            <p class="gl-policy-desc">
                "We are committed to providing high-quality pharmaceutical, nutraceutical, and herbal healthcare products that consistently meet customer expectations and applicable regulatory requirements through continuous improvement, ethical business practices, and a culture of quality excellence."
            </p>
            
            <div class="gl-policy-progress-box">
                <div class="gl-policy-progress-top">
                    <span>Quality Compliance</span>
                    <span>100%</span>
                </div>
                <div class="gl-policy-progress-bar">
                    <div class="gl-policy-progress-fill"></div>
                </div>
            </div>
            
            <div class="gl-policy-stats">
                <div class="gl-policy-stat-card">
                    <i class="fa fa-globe"></i>
                    <div class="gl-policy-stat-info">
                        <h4>100%</h4>
                        <p>Global<br>Standards</p>
                    </div>
                </div>
                <div class="gl-policy-stat-card">
                    <i class="fa fa-headset"></i>
                    <div class="gl-policy-stat-info">
                        <h4>24/7</h4>
                        <p>Quality<br>Assurance</p>
                    </div>
                </div>
            </div>
            
            <div class="gl-policy-actions">
                <a href="/contact-us" class="gl-policy-btn">Contact Us <i class="fa fa-arrow-right"></i></a>
                <div class="gl-policy-phone">
                    <i class="fa fa-phone-alt"></i>
                    <div class="gl-policy-phone-text">
                        <span>Call Us!</span>
                        <strong>+91 999 999 9999</strong>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Right Image -->
        <div class="gl-policy-right">
            <div class="gl-policy-arc"></div>
            <img src="/assets/images/scientist_cutout.png" alt="Scientist" class="gl-policy-image">
            
            <div class="gl-policy-float-card">
                <div class="gl-policy-float-avatar"><i class="fa fa-user-shield"></i></div>
                <div class="gl-policy-float-text">
                    <h5>Quality Team</h5>
                    <p>Dedicated Experts</p>
                </div>
            </div>
        </div>
        
    </div>
</div>
`;

$('.q-policy-v3').replaceWith(exactPolicyHtml);

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/quality.html', finalHtml);
console.log("Replaced Quality Policy section with exact Genlab screenshot design.");
