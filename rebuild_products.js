const fs = require('fs');
const path = require('path');

const first12Products = [
    { title: "Acofan Tablet", cat: "Calcium Channel Blocker, Nsaid", img: "/assets/uploads/products/acofan_tablet_1779861526962.png" },
    { title: "Acumol Tablet", cat: "Nsaid", img: "/assets/uploads/products/acumol_tablet_1779861543662.png" },
    { title: "AFSC Kit", cat: "Antimicrobial", img: "/assets/uploads/products/afsc_kit_1779861558320.png" },
    { title: "Amloclass-5", cat: "Calcium Channel Blocker", img: "/assets/uploads/products/amloclass_tablet_1779861571411.png" },
    { title: "Amloclass-AT", cat: "Calcium Channel Blocker", img: "/assets/uploads/products/amloclass_at_tablet_1779861586240.png" },
    { title: "Amloclass-10", cat: "Calcium Channel Blocker", img: "/assets/uploads/products/amloclass_tablet_1779861571411.png" }, // Reusing Amloclass
    { title: "Applift Syrup", cat: "Herbal", img: "/assets/uploads/products/applift_syrup_1779861603024.png" },
    { title: "Atroclass 10", cat: "Statin", img: "/assets/uploads/products/atroclass_tablet_generated.png" },
    { title: "Atroclass 20", cat: "Statin", img: "/assets/uploads/products/atroclass_tablet_generated.png" }, // Reusing Atroclass
    { title: "Cefezone 1gm", cat: "Antibiotic", img: "/assets/uploads/products/cefezone_injection_1779861625763.png" },
    { title: "Cefezone -S 1.5gm", cat: "Antibiotic", img: "/assets/uploads/products/cefezone_injection_1779861625763.png" }, // Reusing Cefezone
    { title: "Cipotax Tablet", cat: "Antibiotic", img: "/assets/uploads/products/cipotax_tablet_1779861642554.png" }
];

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

let content = fs.readFileSync('src/content/bodies/products.html', 'utf8');
const isAlready48 = (content.match(/service-item/g) || []).length >= 48;

// Let's restore the file if it's already modified to be safe and clean.
if (isAlready48) {
    console.error("File already has 48 items! Please run git restore src/content/bodies/products.html first.");
    process.exit(1);
}

// 1. EXTRACT TEMPLATE
const acofanStart = content.indexOf('<div class="elementor-element elementor-element-98f5a55 e-con-full service-item');
const match = /<div class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item/g;
match.exec(content); // first
const acumolMatch = match.exec(content);
const acumolStart = acumolMatch.index;
const templateHtml = content.substring(acofanStart, acumolStart);

// 2. GENERATE HTML FOR 36 NEW PRODUCTS
let generatedHtml = '';
products.forEach((p, index) => {
    const newId1 = 'gen' + p.id + 'a';
    const newId2 = 'gen' + p.id + 'b';
    const newId3 = 'gen' + p.id + 'c';
    const newId4 = 'gen' + p.id + 'd';
    const imgUrl = getImageUrl(p.dosageForm);
    const catData = p.category.replace(/, /g, ' ').toLowerCase();

    let itemHtml = templateHtml
        .replace(/98f5a55/g, newId1)
        .replace(/5fd3057/g, newId2)
        .replace(/>Acofan 100mg\/500mg Tablet</, ">" + p.title + "<")
        .replace(/acofan-tablet/g, p.slug)
        .replace(/ef9b0e5/g, newId3)
        .replace(/>Aceclofenac 100mg \+ Paracetamol 500mg \| Tablet</, ">" + p.composition + " | " + p.dosageForm + "<")
        .replace(/c81802f/g, newId4)
        .replace(/\/assets\/uploads\/products\/acofan_tablet_1779861526962\.png/g, imgUrl)
        .replace(/class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item e-flex  e-con e-child"/, 
                 `class="elementor-element elementor-element-${newId1} e-con-full service-item e-flex  e-con e-child" data-category="${catData}"`);
    
    generatedHtml += itemHtml;
});

// 3. ADD data-category TO FIRST 12 PRODUCTS
let modifiedFirst12Html = '';
let currentIdx = acofanStart;
const cipotaxStr = 'Cipotax 500mg/600mg Tablet';
const cipotaxIdx = content.indexOf(cipotaxStr);

// We find the end of the 12th product block
const normalizedContent = content.replace(/\r\n/g, '\n');
const searchCloseStr = '\t\t\t\t</div></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t<div class="elementor-element elementor-element-c4db441';
let insertIdx = normalizedContent.indexOf(searchCloseStr, cipotaxIdx);
if (insertIdx === -1) {
    insertIdx = normalizedContent.indexOf('</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t<div class="elementor-element elementor-element-c4db441', cipotaxIdx);
}
if (insertIdx === -1) {
    insertIdx = normalizedContent.indexOf('</a></div>\n\t\t\t\t</div></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t<div class="elementor-element elementor-element-c4db441', cipotaxIdx);
}

let first12Html = normalizedContent.substring(acofanStart, insertIdx);

// Inject data-category into each of the 12 items
let f12match;
const f12regex = /<div class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item e-flex  e-con e-child"/g;
let f12indices = [];
while ((f12match = f12regex.exec(first12Html)) !== null) {
    f12indices.push(f12match.index);
}

for (let i = f12indices.length - 1; i >= 0; i--) {
    let cat = first12Products[i].cat.replace(/, /g, ' ').toLowerCase();
    let idx = first12Html.indexOf('e-con e-child"', f12indices[i]) + 'e-con e-child"'.length;
    first12Html = first12Html.substring(0, idx) + ` data-category="${cat}"` + first12Html.substring(idx);
}

// 4. GENERATE TABS HTML
const allCategories = first12Products.map(p => p.cat).concat(products.map(p => p.category));
const uniqueCats = ["All"];
allCategories.forEach(c => {
    c.split(', ').forEach(sub => {
        if (!uniqueCats.includes(sub)) uniqueCats.push(sub);
    });
});

let tabsHtml = `<div class="category-tabs-container" style="text-align: center; margin-bottom: 40px; padding: 0 20px;">
    <div class="category-tabs" style="display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 10px; background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 50px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05);">
`;

uniqueCats.forEach(c => {
    let active = c === "All" ? "active-tab" : "";
    let dataCat = c === "All" ? "all" : c.toLowerCase();
    tabsHtml += `        <button class="cat-tab ${active}" data-filter="${dataCat}" style="background: transparent; border: none; padding: 10px 20px; font-weight: 600; font-family: 'Inter', sans-serif; color: #0B1030; cursor: pointer; border-radius: 30px; transition: all 0.3s ease;">${c}</button>\n`;
});

tabsHtml += `    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.cat-tab');
        const items = document.querySelectorAll('.service-item');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.style.background = 'transparent';
                    t.style.color = '#0B1030';
                    t.classList.remove('active-tab');
                });
                
                tab.style.background = 'linear-gradient(135deg, #00505A, #001937)';
                tab.style.color = '#ffffff';
                tab.classList.add('active-tab');
                
                const filter = tab.getAttribute('data-filter');
                
                items.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else {
                        const itemCat = item.getAttribute('data-category');
                        if (itemCat && itemCat.includes(filter)) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Initial active styling
        const activeTab = document.querySelector('.cat-tab.active-tab');
        if (activeTab) {
            activeTab.style.background = 'linear-gradient(135deg, #00505A, #001937)';
            activeTab.style.color = '#ffffff';
        }
    });
</script>
`;

// 5. ASSEMBLE NEW CONTENT
const gridStartStr = '<div class="elementor-element elementor-element-7e00e1b';
const gridIdx = normalizedContent.indexOf(gridStartStr);
const gridInnerIdx = normalizedContent.indexOf('>', gridIdx) + 1; // start of grid children

const finalContent = 
    normalizedContent.substring(0, gridIdx) + 
    tabsHtml + 
    normalizedContent.substring(gridIdx, gridInnerIdx) + 
    first12Html + 
    generatedHtml + 
    normalizedContent.substring(insertIdx);

fs.writeFileSync('src/content/bodies/products.html', finalContent, 'utf8');
console.log('Rebuilt products.html successfully with 48 items and category filtering!');
