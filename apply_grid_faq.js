const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const faqGridHTML = `
<!-- NEW CORPORATE GRID FAQ SECTION -->
<div class="faq-grid-wrapper">
    <div class="faq-grid-container">
        
        <div class="faq-grid-header">
            <div class="faq-grid-badge">
                <div class="faq-grid-badge-dot"></div>
                Business Partnerships
            </div>
            <h2 class="faq-grid-heading">Frequently Asked Questions</h2>
            <p class="faq-grid-subtext">Explore opportunities to collaborate and grow with us. Here are answers to some of the most common questions from our partners.</p>
        </div>

        <div class="faq-cards-grid">
            
            <!-- Card 1 -->
            <div class="faq-service-card">
                <div class="faq-card-header">
                    <div class="faq-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <h3 class="faq-card-title">Do you offer third-party manufacturing services?</h3>
                </div>
                <p class="faq-card-answer">Yes. We facilitate third-party manufacturing through our qualified manufacturing partners.</p>
            </div>

            <!-- Card 2 -->
            <div class="faq-service-card">
                <div class="faq-card-header">
                    <div class="faq-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    </div>
                    <h3 class="faq-card-title">Do you provide private labeling services?</h3>
                </div>
                <p class="faq-card-answer">Yes. We support private label and customized branding opportunities subject to minimum order quantities and product feasibility.</p>
            </div>

            <!-- Card 3 -->
            <div class="faq-service-card">
                <div class="faq-card-header">
                    <div class="faq-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 class="faq-card-title">Can distributors work with your company?</h3>
                </div>
                <p class="faq-card-answer">Yes. We welcome distributors, stockists, institutional buyers, and healthcare business partners interested in expanding quality healthcare solutions.</p>
            </div>

            <!-- Card 4 -->
            <div class="faq-service-card">
                <div class="faq-card-header">
                    <div class="faq-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <h3 class="faq-card-title">Do you support pharmaceutical exports?</h3>
                </div>
                <p class="faq-card-answer">Yes. We actively explore international business opportunities and support export-oriented partnerships in accordance with applicable regulatory requirements.</p>
            </div>

        </div>
        
    </div>
</div>
<!-- END NEW CORPORATE GRID FAQ SECTION -->
`;

const oldFaq = $('.faq-split-wrapper');
if (oldFaq.length) {
    oldFaq.replaceWith(faqGridHTML);
    console.log("Replaced split FAQ with new Corporate Grid FAQ.");
} else {
    console.log("Could not find .faq-split-wrapper. Appending to wp-page instead.");
    $('[data-elementor-type="wp-page"]').append(faqGridHTML);
}

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully updated about-us.html with Grid FAQ section.");
