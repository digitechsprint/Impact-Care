const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const faqHTML = `
<!-- FAQ SECTION -->
<div class="faq-section-wrapper">
    <div class="faq-container">
        
        <div class="faq-header">
            <div class="faq-badge">
                <div class="faq-badge-dot"></div>
                FAQS
            </div>
            <h2 class="faq-heading">Business Partnerships</h2>
            <p class="faq-subtext">Find answers to common questions about partnering with us.</p>
        </div>

        <div class="faq-accordion">
            <!-- FAQ 1 -->
            <details class="faq-item">
                <summary class="faq-question">
                    12. Do you offer third-party manufacturing services?
                    <div class="faq-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </summary>
                <div class="faq-answer">
                    Yes. We facilitate third-party manufacturing through our qualified manufacturing partners.
                </div>
            </details>

            <!-- FAQ 2 -->
            <details class="faq-item">
                <summary class="faq-question">
                    13. Do you provide private labeling services?
                    <div class="faq-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </summary>
                <div class="faq-answer">
                    Yes. We support private label and customized branding opportunities subject to minimum order quantities and product feasibility.
                </div>
            </details>

            <!-- FAQ 3 -->
            <details class="faq-item">
                <summary class="faq-question">
                    14. Can distributors work with your company?
                    <div class="faq-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </summary>
                <div class="faq-answer">
                    Yes. We welcome distributors, stockists, institutional buyers, and healthcare business partners interested in expanding quality healthcare solutions.
                </div>
            </details>

            <!-- FAQ 4 -->
            <details class="faq-item">
                <summary class="faq-question">
                    15. Do you support pharmaceutical exports?
                    <div class="faq-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </summary>
                <div class="faq-answer">
                    Yes. We actively explore international business opportunities and support export-oriented partnerships in accordance with applicable regulatory requirements.
                </div>
            </details>
        </div>
        
    </div>
</div>
<!-- END FAQ SECTION -->
`;

const qualityWrapper = $('.quality-section-wrapper');
if (qualityWrapper.length) {
    qualityWrapper.after(faqHTML);
    console.log("Appended FAQ section after quality section.");
} else {
    // fallback if not found
    console.log("Could not find .quality-section-wrapper, appending to wp-page instead.");
    $('[data-elementor-type="wp-page"]').append(faqHTML);
}

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully updated about-us.html with FAQ section.");
