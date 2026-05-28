const fs = require('fs');
const path = require('path');

const genProductsCode = fs.readFileSync('generate_products.js', 'utf8');
const productsMatch = genProductsCode.match(/const products = (\[[\s\S]+?\]);\r?\n/);
let products = [];
if (productsMatch) {
    products = eval(productsMatch[1]);
}

function getImageUrl(dosageForm) {
    const df = dosageForm.toLowerCase();
    if (df.includes('tablet')) return '/assets/uploads/products/tablet_mockup.png';
    if (df.includes('syrup') || df.includes('suspension') || df.includes('solution')) return '/assets/uploads/products/syrup_mockup.png';
    if (df.includes('injection') || df.includes('ampoule')) return '/assets/uploads/products/injection_mockup.png';
    if (df.includes('capsule')) return '/assets/uploads/products/capsule_mockup.png';
    if (df.includes('cream') || df.includes('jelly')) return '/assets/uploads/products/cream_mockup.png';
    if (df.includes('drop')) return '/assets/uploads/products/drops_mockup.png';
    if (df.includes('kit')) return '/assets/uploads/products/kit_mockup.png';
    return '/assets/uploads/products/tablet_mockup.png'; // fallback
}

// Master template is product__acofan-tablet.html
const masterContent = fs.readFileSync('src/content/bodies/product__acofan-tablet.html', 'utf8');

products.forEach(p => {
    let newContent = masterContent;
    
    // Replace Title
    // In Acofan, it's usually `Acofan 100mg/500mg Tablet: Pain and Inflammation Medication` or similar
    newContent = newContent.replace(/Acofan 100mg\/500mg Tablet: Pain and Inflammation Medication/g, p.title);
    newContent = newContent.replace(/Acofan 100mg\/500mg Tablet/g, p.title);
    
    // Replace URL paths
    newContent = newContent.replace(/acofan-tablet/g, p.slug);
    
    // Replace Composition / Description
    // Acofan composition is "Aceclofenac BP 100 mg"
    newContent = newContent.replace(/Aceclofenac BP 100 mg/g, p.composition);
    
    // Replace Categories
    newContent = newContent.replace(/Calcium Channel Blocker, Nsaid/g, p.category);
    
    // Replace Dosage Form
    newContent = newContent.replace(/>Tablet</g, `>${p.dosageForm}<`);
    
    // Replace Pack Detail
    newContent = newContent.replace(/3 x 10 Tablets/g, p.packDetail);
    
    // Replace Image
    // The master content has: `/assets/uploads/products/acofan_tablet_1779861526962.png`
    const imgUrl = getImageUrl(p.dosageForm);
    newContent = newContent.replace(/\/assets\/uploads\/products\/acofan_tablet_1779861526962\.png/g, imgUrl);
    
    // Optional: Update breadcrumb "Acofan Tablet" -> p.title
    newContent = newContent.replace(/>Acofan Tablet</g, `>${p.title}<`);
    
    fs.writeFileSync(`src/content/bodies/product__${p.slug}.html`, newContent, 'utf8');
});

console.log('All 36 individual product pages regenerated successfully!');
