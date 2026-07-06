const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/about-us.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false }, false);

const faqSplitHTML = `
<!-- NEW SPLIT FAQ SECTION -->
<div class="faq-split-wrapper">
    <div class="faq-split-container">
        
        <!-- Left Column: Visuals & Contact Box -->
        <div class="faq-visual-col">
            <div class="faq-vertical-text">IMPACT</div>
            <img src="/assets/uploads/2024/12/backup/team-3.jpg" alt="Impact Team" class="faq-main-img" onerror="this.src='/assets/uploads/2024/11/about-img-2.jpg'">
            
            <div class="faq-contact-box">
                <div class="faq-avatars">
                    <img src="/assets/uploads/2024/12/author-1.jpg" alt="User" class="faq-avatar">
                    <img src="/assets/uploads/2024/12/author-2.jpg" alt="User" class="faq-avatar">
                    <img src="/assets/uploads/2024/12/author-3.jpg" alt="User" class="faq-avatar">
                </div>
                <h3 class="faq-contact-title">Still Have Any Questions?</h3>
                <p class="faq-contact-desc">We take the time to understand your business needs and provide tailored solutions.</p>
                <div class="faq-contact-phone">
                    <div class="faq-phone-icon">
                        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    +91 99965-06775
                </div>
            </div>
        </div>

        <!-- Right Column: FAQs -->
        <div class="faq-content-col">
            <div class="faq-badge-alt">
                <div class="faq-badge-dot-alt"></div>
                FREQUENTLY ASKED QUESTIONS
            </div>
            
            <h2 class="faq-split-heading">Business Partnerships</h2>
            <p class="faq-split-desc">Get clear and concise answers to the most common questions about partnering with us, so you can start your business journey confidently.</p>
            
            <div class="faq-clean-accordion">
                <!-- FAQ 1 -->
                <details class="faq-clean-item" open>
                    <summary class="faq-clean-question">
                        12. Do you offer third-party manufacturing services?
                        <div class="faq-clean-icon">+</div>
                    </summary>
                    <div class="faq-clean-answer">
                        Yes. We facilitate third-party manufacturing through our qualified manufacturing partners.
                    </div>
                </details>

                <!-- FAQ 2 -->
                <details class="faq-clean-item">
                    <summary class="faq-clean-question">
                        13. Do you provide private labeling services?
                        <div class="faq-clean-icon">+</div>
                    </summary>
                    <div class="faq-clean-answer">
                        Yes. We support private label and customized branding opportunities subject to minimum order quantities and product feasibility.
                    </div>
                </details>

                <!-- FAQ 3 -->
                <details class="faq-clean-item">
                    <summary class="faq-clean-question">
                        14. Can distributors work with your company?
                        <div class="faq-clean-icon">+</div>
                    </summary>
                    <div class="faq-clean-answer">
                        Yes. We welcome distributors, stockists, institutional buyers, and healthcare business partners interested in expanding quality healthcare solutions.
                    </div>
                </details>

                <!-- FAQ 4 -->
                <details class="faq-clean-item">
                    <summary class="faq-clean-question">
                        15. Do you support pharmaceutical exports?
                        <div class="faq-clean-icon">+</div>
                    </summary>
                    <div class="faq-clean-answer">
                        Yes. We actively explore international business opportunities and support export-oriented partnerships in accordance with applicable regulatory requirements.
                    </div>
                </details>
            </div>
        </div>
        
    </div>
</div>
<!-- END NEW SPLIT FAQ SECTION -->
`;

const oldFaq = $('.faq-section-wrapper');
if (oldFaq.length) {
    oldFaq.replaceWith(faqSplitHTML);
    console.log("Replaced old FAQ with new split FAQ.");
} else {
    console.log("Could not find .faq-section-wrapper. Appending to wp-page instead.");
    $('[data-elementor-type="wp-page"]').append(faqSplitHTML);
}

let finalHtml = $.html();
if (finalHtml.includes('<html><head>')) {
    finalHtml = finalHtml.replace(/<html><head>.*?<\/head><body>/s, '');
    finalHtml = finalHtml.replace(/<\/body><\/html>/, '');
}

fs.writeFileSync('src/content/bodies/about-us.html', finalHtml);
console.log("Successfully updated about-us.html with split FAQ section.");
