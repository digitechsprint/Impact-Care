const fs = require('fs');
const { JSDOM } = require('jsdom');

const products = require('./src/data/products.json');

// 1. Build the products catalog grid (products.html)
const catalogHtmlPath = 'd:/Impac/dispnsary-next/src/content/bodies/products.html';
const catalogHtml = fs.readFileSync(catalogHtmlPath, 'utf8');
const catalogDom = new JSDOM(catalogHtml);
const catalogDoc = catalogDom.window.document;

// Find the grid container (assumes Elementor post list grid)
// We'll just find all cards and keep one as a template
const cards = catalogDoc.querySelectorAll('.elementor-widget-elementskit-post-list .elementor-post, .elementor-posts-container .elementor-post, .elementor-posts-container article');

if (cards.length > 0) {
    const templateCard = cards[0].cloneNode(true);
    const container = cards[0].parentNode;
    container.innerHTML = ''; // Clear all existing cards

    products.forEach(product => {
        const newCard = templateCard.cloneNode(true);
        
        // Update Title
        const title = newCard.querySelector('.elementor-post__title a, .elementskit-post-title a');
        if (title) {
            title.textContent = product.name;
            title.href = `/products/${product.slug}`;
        }
        
        // Update Image
        const img = newCard.querySelector('img');
        if (img) {
            img.src = product.image;
            img.srcset = '';
            // Make image clickable too
            const imgLink = newCard.querySelector('a.elementor-post__thumbnail__link, a.elementskit-entry-thumb');
            if(imgLink) imgLink.href = `/products/${product.slug}`;
        }

        // Update Category tag if exists
        const catTag = newCard.querySelector('.elementor-post-category, .elementskit-post-cat');
        if (catTag) catTag.textContent = product.category;

        // Update excerpt if exists
        const excerpt = newCard.querySelector('.elementor-post__excerpt p, .elementskit-post-excerpt p');
        if (excerpt) excerpt.textContent = product.composition;
        
        // Update Read More link
        const readMore = newCard.querySelector('.elementor-post__read-more, .elementskit-btn-link');
        if (readMore) readMore.href = `/products/${product.slug}`;

        container.appendChild(newCard);
    });
    
    let outHtml = catalogDom.serialize();
    outHtml = outHtml.replace('<html><head></head><body>', '').replace('</body></html>', '');
    fs.writeFileSync(catalogHtmlPath, outHtml);
    console.log('Successfully updated products.html catalog grid.');
}

// 2. Generate the 12 specific Product Detail templates
const detailTemplatePath = 'd:/Impac/dispnsary-next/src/content/bodies/services__chronic-care.html';
const detailHtml = fs.readFileSync(detailTemplatePath, 'utf8');

products.forEach(product => {
    const detailDom = new JSDOM(detailHtml);
    const doc = detailDom.window.document;

    // Update H1 (Hero Title)
    const h1 = doc.querySelector('h1');
    if (h1) h1.textContent = product.name;

    // Update Breadcrumb
    const breadcrumb = doc.querySelector('.ekit-breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `<li class="ekit_breadcrumbs_start"><a href="/">Home</a></li>
                                <li><a href="/products">Products</a></li>
                                <li>${product.name}</li>`;
    }

    // Update Main Image
    const mainImg = doc.querySelector('.service-entry-img img, .service-featured-image img, .at-image-animation img');
    if (mainImg) {
        mainImg.src = product.image;
        mainImg.srcset = '';
    }

    // Update Main Text Content (we'll replace the text editor blocks)
    // There are usually two text editors in the main body of services__chronic-care.html
    const textEditors = doc.querySelectorAll('.elementor-widget-text-editor .elementor-widget-container');
    
    // First editor: Description
    if (textEditors.length > 0) {
        textEditors[0].innerHTML = `<p>${product.description}</p>`;
    }
    
    // Replace the icon list with our Specs
    const iconListItems = doc.querySelectorAll('.service-details-icon-list .elementor-icon-list-text');
    if (iconListItems.length >= 3) {
        iconListItems[0].innerHTML = `<strong>Category:</strong> ${product.category}`;
        iconListItems[1].innerHTML = `<strong>Composition:</strong> ${product.composition}`;
        iconListItems[2].innerHTML = `<strong>Dosage Form:</strong> ${product.dosageForm}`;
        if (iconListItems[3]) iconListItems[3].innerHTML = `<strong>Pack Details:</strong> ${product.packDetails}`;
    }

    // We can also find H2s and change them to make sense
    const h2s = doc.querySelectorAll('h2');
    h2s.forEach(h2 => {
        if (h2.textContent.includes('Cutting-edge')) h2.textContent = 'Product Overview';
        if (h2.textContent.includes('Comfort and convenience')) h2.textContent = 'Specifications';
        if (h2.textContent.includes('Services Category')) h2.textContent = 'Our Categories';
    });
    
    // Update Sidebar categories links
    const sidebarList = doc.querySelectorAll('.service-sidebar .elementor-icon-list-item');
    if (sidebarList.length > 0) {
        // We'll just change the text of the existing 6 links to product categories
        const cats = ['Antibiotic', 'Antidiabetic', 'Herbal', 'Nsaid', 'Statin', 'Calcium Channel Blocker'];
        sidebarList.forEach((li, idx) => {
            if (cats[idx]) {
                li.querySelector('.elementor-icon-list-text').textContent = cats[idx];
                li.querySelector('a').href = '/products';
            } else {
                li.remove();
            }
        });
    }

    // Remove FAQ and Testimonial if they exist in this template
    const h3s = doc.querySelectorAll('h3');
    h3s.forEach(h3 => {
        if (h3.textContent.includes('Frequently Asked Questions')) {
            const container = h3.closest('.e-con.e-parent') || h3.closest('.elementor-section');
            if (container) container.remove();
        }
    });

    // Save HTML
    let outDetail = detailDom.serialize();
    outDetail = outDetail.replace('<html><head></head><body>', '').replace('</body></html>', '');
    const outputPath = `d:/Impac/dispnsary-next/src/content/bodies/product__${product.slug}.html`;
    fs.writeFileSync(outputPath, outDetail);
});
console.log('Successfully generated 12 detail pages.');

// 3. Update pages-manifest.json
const manifestPath = 'd:/Impac/dispnsary-next/src/content/pages-manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Remove old products route if any
manifest.pages = manifest.pages.filter(p => !p.path.startsWith('/products'));

// Add main products page
manifest.pages.push({ path: "/products", body: "products" });

// Add the 12 dynamic detail routes
products.forEach(p => {
    manifest.pages.push({ path: `/products/${p.slug}`, body: `product__${p.slug}` });
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Updated pages-manifest.json');
