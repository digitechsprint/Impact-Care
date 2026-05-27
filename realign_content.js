const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const bodiesDir = path.join(__dirname, 'src', 'content', 'bodies');
const files = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.html'));

console.log(`Scanning ${files.length} HTML files...`);

files.forEach(file => {
    const filePath = path.join(bodiesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    let modified = false;

    // 1. Replace all Book Appointment buttons / links in headers, content, footers
    const links = doc.querySelectorAll('a, button');
    links.forEach(el => {
        const href = el.getAttribute('href');
        if (href && (href.includes('/appointment/') || href.includes('/appointment'))) {
            el.setAttribute('href', '/contact-us/');
            modified = true;
        }

        const text = el.textContent.trim();
        if (/Book\s+A?\s*Appointment(\s+Now)?/i.test(text)) {
            // Find the span inside or replace the text directly
            const textSpan = el.querySelector('.elementor-button-text');
            if (textSpan) {
                textSpan.textContent = 'Contact Us';
            } else {
                el.textContent = 'Contact Us';
            }
            modified = true;
        }
    });

    // 2. Align footer vertical menu (Doctors, Diagnostics, etc. -> Antibiotics, Antidiabetics, etc.)
    const footerMenuItems = doc.querySelectorAll('#menu-footer-healthcare-menu a, .ekit-vertical-navbar-nav a');
    footerMenuItems.forEach(item => {
        const text = item.textContent.trim();
        if (text === 'Doctors') {
            item.textContent = 'Antibiotics';
            item.setAttribute('href', '/products/');
            modified = true;
        } else if (text === 'Diagnostics') {
            item.textContent = 'Antidiabetic';
            item.setAttribute('href', '/products/');
            modified = true;
        } else if (text === 'Caregiver') {
            item.textContent = 'Cardio-diabetics';
            item.setAttribute('href', '/products/');
            modified = true;
        } else if (text === 'Hospitality') {
            item.textContent = 'Statins';
            item.setAttribute('href', '/products/');
            modified = true;
        } else if (text === 'Emergency') {
            item.textContent = 'Herbal Products';
            item.setAttribute('href', '/products/');
            modified = true;
        } else if (text === 'Our Team') {
            item.textContent = 'About Us';
            item.setAttribute('href', '/about-us/');
            modified = true;
        }
    });

    // 3. Align How We Work Steps (homepage & careers workflow steps)
    const steps = doc.querySelectorAll('.work-step-item');
    steps.forEach((step, idx) => {
        const titleEl = step.querySelector('.elementor-icon-box-title span, .elementor-icon-box-title');
        const descEl = step.querySelector('.elementor-icon-box-description');
        
        if (idx === 0) {
            if (titleEl) { titleEl.textContent = 'Submit Inquiry'; modified = true; }
            if (descEl) { descEl.textContent = 'Submit your formulation, packaging, and shipping requirements.'; modified = true; }
        } else if (idx === 1) {
            if (titleEl) { titleEl.textContent = 'Custom Formulation'; modified = true; }
            if (descEl) { descEl.textContent = 'Work with our R&D specialists to refine ingredients and dosage forms.'; modified = true; }
        } else if (idx === 2) {
            if (titleEl) { titleEl.textContent = 'Quality Assurance'; modified = true; }
            if (descEl) { descEl.textContent = 'Rigorous cGMP testing and regulatory compliance verification.'; modified = true; }
        } else if (idx === 3) {
            if (titleEl) { titleEl.textContent = 'Global Logistics'; modified = true; }
            if (descEl) { descEl.textContent = 'Secure packaging and efficient export to over 50+ countries.'; modified = true; }
        }
    });

    // 4. Align Manufacturing highlights / icons
    const iconBoxes = doc.querySelectorAll('.elementor-widget-icon-box');
    iconBoxes.forEach(box => {
        const titleEl = box.querySelector('.elementor-icon-box-title span, .elementor-icon-box-title');
        const descEl = box.querySelector('.elementor-icon-box-description');
        if (titleEl) {
            const titleText = titleEl.textContent.trim();
            if (titleText.includes('50+ Expert Doctor')) {
                titleEl.textContent = '50+ Export Markets';
                if (descEl) descEl.textContent = 'We export high-quality medications to over 50 countries worldwide.';
                modified = true;
            } else if (titleText.includes('24/7 Instant Support')) {
                titleEl.textContent = '24/7 Supply Support';
                if (descEl) descEl.textContent = 'Dedicated customer support and coordination for global shipments.';
                modified = true;
            } else if (titleText.includes('Expert Medical Team')) {
                titleEl.textContent = 'Expert R&D Team';
                if (descEl) descEl.textContent = 'Over 200+ formulation specialists and quality control scientists.';
                modified = true;
            }
        }
    });

    // 5. Align Global Footprints / Team member cards (only on Home and About pages)
    if (file === 'index.html' || file.startsWith('home-') || file === 'about-us.html') {
        const teamItems = doc.querySelectorAll('.team-member-item');
        teamItems.forEach((item, idx) => {
            const nameLink = item.querySelector('.elementor-icon-box-title a, .elementor-icon-box-title');
            const descEl = item.querySelector('.elementor-icon-box-description');
            if (idx === 0) {
                if (nameLink) {
                    nameLink.textContent = 'West Africa Hub';
                    if (nameLink.setAttribute) nameLink.setAttribute('href', '/about-us/');
                    modified = true;
                }
                if (descEl) { descEl.textContent = 'Burkina Faso, Côte d\'Ivoire, Senegal, Togo, Benin, Guinea, Mali, Niger, Gabon'; modified = true; }
            } else if (idx === 1) {
                if (nameLink) {
                    nameLink.textContent = 'Southeast Asia Hub';
                    if (nameLink.setAttribute) nameLink.setAttribute('href', '/about-us/');
                    modified = true;
                }
                if (descEl) { descEl.textContent = 'Vietnam, Myanmar, Cambodia'; modified = true; }
            } else if (idx === 2) {
                if (nameLink) {
                    nameLink.textContent = 'Middle East Operations';
                    if (nameLink.setAttribute) nameLink.setAttribute('href', '/about-us/');
                    modified = true;
                }
                if (descEl) { descEl.textContent = 'Oman and regional partners'; modified = true; }
            } else if (idx === 3) {
                if (nameLink) {
                    nameLink.textContent = 'European Logistics';
                    if (nameLink.setAttribute) nameLink.setAttribute('href', '/about-us/');
                    modified = true;
                }
                if (descEl) { descEl.textContent = 'Strategic partnerships & distribution, Belgium'; modified = true; }
            }
        });
    }

    // 6. Align rating boxes
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, span');
    headings.forEach(h => {
        const text = h.textContent.trim();
        if (text === 'Google Rating 5.0') {
            h.textContent = 'WHO & GMP Certified';
            modified = true;
        } else if (text === 'Based On 500 Reviews') {
            h.textContent = 'Government Recognized Star Export House';
            modified = true;
        } else if (text === 'Talk to our 48+ Doctors') {
            h.textContent = 'Serving 50+ Global Markets';
            modified = true;
        } else if (text === 'Healing Starts Here Caring for You Always') {
            h.textContent = 'Curing Diseases, Caring for Health';
            modified = true;
        } else if (text === 'Your Health, Our Priority in Wellcare') {
            h.textContent = 'Your Health, Our Priority';
            modified = true;
        } else if (text === 'Highly Qualified Doctor') {
            h.textContent = 'State-of-the-Art Labs';
            modified = true;
        }
    });

    // 7. Align manufacturing highly qualified doctor text paragraph (for manufacturing page)
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach(p => {
        const text = p.textContent.trim();
        if (text.includes('highly qualified doctors') && text.includes('patient care')) {
            p.textContent = 'We ensure premium pharmaceutical formulations through state-of-the-art labs and cGMP-compliant processes.';
            modified = true;
        }
    });

    // 8. Align Homepage FAQ Accordions (Index and Home variants)
    if (file === 'index.html' || file.startsWith('home-') || file === 'faqs.html') {
        const faqCards = doc.querySelectorAll('.elementskit-card');
        const correctFAQs = [
            {
                q: "What is Impact's mission and vision?",
                a: "The Impact Healthcare mission and vision is named the Purpose of Impact, which is to Care and to Cure."
            },
            {
                q: "What fundamental values does Impact uphold?",
                a: "The four guiding principles of Impact culture are satisfaction, ownership, quality, and courage."
            },
            {
                q: "What is Impact recognized for?",
                a: "Some of the most effective medications and vaccines in the world have been created by Impact, addressing major global healthcare needs."
            },
            {
                q: "When did Impact begin?",
                a: "Impact was incorporated in 2004, serving patients and healthcare professionals globally."
            }
        ];

        faqCards.forEach((card, idx) => {
            if (idx < correctFAQs.length) {
                const titleEl = card.querySelector('.ekit-accordion-title');
                const bodyEl = card.querySelector('.elementskit-card-body p, .accordion-body p');
                if (titleEl && bodyEl) {
                    titleEl.textContent = correctFAQs[idx].q;
                    bodyEl.textContent = correctFAQs[idx].a;
                    modified = true;
                }
            } else {
                // Remove extra FAQ cards to match the 4 specific ones
                card.remove();
                modified = true;
            }
        });
    }

    if (modified) {
        fs.writeFileSync(filePath, dom.serialize(), 'utf8');
        console.log(`  Aligned file: ${file}`);
    }
});

// 9. Now replace 'Dispnsary' in pages-manifest.json
const manifestPath = path.join(__dirname, 'src', 'content', 'pages-manifest.json');
if (fs.existsSync(manifestPath)) {
    let manifestData = fs.readFileSync(manifestPath, 'utf8');
    // Replace all "Dispnsary" titles
    manifestData = manifestData.replace(/ – Dispnsary/g, ' – Impact Healthcare');
    manifestData = manifestData.replace(/Dispnsary – Medical WordPress Theme/g, 'Impact Healthcare – Global Pharmaceutical & Medicine Export Brand');
    fs.writeFileSync(manifestPath, manifestData, 'utf8');
    console.log('Manifest aligned.');
}

// 10. Clean up individual .meta.json files
const metaFiles = fs.readdirSync(bodiesDir).filter(f => f.endsWith('.meta.json'));
metaFiles.forEach(metaFile => {
    const metaPath = path.join(bodiesDir, metaFile);
    let meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    if (meta.title && meta.title.includes('Dispnsary')) {
        meta.title = meta.title.replace(/ – Dispnsary/g, ' – Impact Healthcare');
        meta.title = meta.title.replace(/Dispnsary – Medical WordPress Theme/g, 'Impact Healthcare – Global Pharmaceutical & Medicine Export Brand');
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf8');
        console.log(`  Aligned meta file: ${metaFile}`);
    }
});

console.log('Complete alignment process completed successfully.');
