const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('src/content/bodies/products.html', 'utf8');

const $ = cheerio.load('<div id="dummy-root">' + html + '</div>', { decodeEntities: false }, false);

// 1. Remove any existing FAQ sections we injected
$('.faq-v2-section').remove();

const productsFaqHtml = `
<!-- Products FAQ (Visen Exact Design) -->
<div class="faq-v2-section">
    <div class="faq-v2-container">
        
        <!-- Left: Accordion -->
        <div class="faq-v2-left">
            <div class="faq-v2-pill">Frequently Asked Question</div>
            <h2 class="faq-v2-heading">Our Products</h2>
            
            <div class="faq-v2-accordion">
                <details class="faq-v2-item" open>
                    <summary class="faq-v2-summary">
                        1. What types of products do you offer?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Our portfolio includes:
                        <ul>
                            <li>Tablets</li>
                            <li>Capsules</li>
                            <li>Syrups</li>
                            <li>Injectables</li>
                            <li>Herbal Products</li>
                            <li>Nutraceuticals</li>
                            <li>Topical Preparations</li>
                        </ul>
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        2. Do you offer generic medicines?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Yes. Through our Generic Division, we provide quality-assured and cost-effective generic medicines across multiple therapeutic categories.
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        3. Do you have pediatric products?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Yes. Our Pediatrics Division offers formulations specifically developed for children's healthcare needs.
                    </div>
                </details>

                <details class="faq-v2-item">
                    <summary class="faq-v2-summary">
                        4. Do you provide herbal and nutraceutical products?
                        <div class="faq-v2-icon"><i class="fa fa-chevron-down"></i></div>
                    </summary>
                    <div class="faq-v2-content">
                        Yes. Our Herbals Division offers scientifically developed herbal and wellness products, while our Nutraceutical portfolio focuses on preventive healthcare and wellness support.
                    </div>
                </details>
            </div>
        </div>

        <!-- Right: Image -->
        <div class="faq-v2-right">
            <div class="faq-v2-image-wrapper">
                <img src="/assets/images/products_faq.png" alt="Products FAQ">
                <div class="faq-v2-float-card">
                    <div class="faq-v2-float-icon"><i class="fa fa-question-circle"></i></div>
                    <div class="faq-v2-float-text">Relax, We've Got the Answers</div>
                </div>
            </div>
        </div>
        
    </div>
</div>
`;

// 2. Insert into .elementor-947 so Next.js parser picks it up as lowerContent
let mainContent = $('.elementor-947');
if (mainContent.length) {
    mainContent.append(productsFaqHtml);
} else {
    $('#dummy-root').append(productsFaqHtml);
}

let finalHtml = $('#dummy-root').html();

fs.writeFileSync('src/content/bodies/products.html', finalHtml);
console.log("Moved FAQ section to exactly above the footer (inside elementor-947).");
