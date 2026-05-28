const fs = require('fs');

const first12Categories = [
    "Calcium Channel Blocker, Nsaid", // Acofan
    "Nsaid", // Acumol
    "Antimicrobial", // AFSC Kit
    "Calcium Channel Blocker", // Amloclass 5
    "Calcium Channel Blocker", // Amloclass AT
    "Calcium Channel Blocker", // Amloclass 10
    "Herbal", // Applift
    "Statin", // Atroclass 10
    "Statin", // Atroclass 20
    "Antibiotic", // Cefaxone
    "Antibiotic", // Cefzone-S
    "Antibiotic" // Cipotax
];

const genProductsCode = fs.readFileSync('generate_products.js', 'utf8');
const productsMatch = genProductsCode.match(/const products = (\[[\s\S]+?\]);\r?\n/);
let products = [];
if (productsMatch) {
    products = eval(productsMatch[1]);
}

const allCategories = first12Categories.concat(products.map(p => p.category));

let content = fs.readFileSync('src/content/bodies/products.html', 'utf8');

// Find all service-item blocks
// Using the precise string `<div class="elementor-element elementor-element-[hash] e-con-full service-item`
let match;
const regex = /<div class="elementor-element elementor-element-[a-z0-9]+ e-con-full service-item/g;
let indices = [];
while ((match = regex.exec(content)) !== null) {
    indices.push(match.index);
}

console.log('Found service items:', indices.length);
if (indices.length !== 48) {
    console.error('Expected 48 items, found', indices.length);
}

// Replace each one backward to preserve indices
for (let i = indices.length - 1; i >= 0; i--) {
    let cat = allCategories[i].replace(/, /g, '-').replace(/ /g, '-').toLowerCase();
    // Some products have multiple categories like "calcium-channel-blocker-nsaid". We'll just assign it both by space in data-category if needed, 
    // but a single string is fine. Wait, let's keep it as is, or use lowercase space-separated.
    cat = allCategories[i].replace(/, /g, ' ').toLowerCase();

    let insertion = ` data-category="${cat}"`;
    // Insert after `service-item`
    let idx = content.indexOf('service-item', indices[i]) + 'service-item'.length;
    content = content.substring(0, idx) + insertion + content.substring(idx);
}

// Add Category Tabs
const uniqueCats = ["All"];
allCategories.forEach(c => {
    c.split(', ').forEach(sub => {
        if (!uniqueCats.includes(sub)) uniqueCats.push(sub);
    });
});

let tabsHtml = `<div class="category-tabs-container" style="text-align: center; margin-bottom: 40px;">
    <div class="category-tabs" style="display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 10px; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 15px 25px; border-radius: 50px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.2);">
`;

uniqueCats.forEach(c => {
    let active = c === "All" ? "active-tab" : "";
    let dataCat = c === "All" ? "all" : c.toLowerCase();
    tabsHtml += `        <button class="cat-tab \${active}" data-filter="\${dataCat}" style="background: transparent; border: none; padding: 10px 20px; font-weight: 600; font-family: 'Inter', sans-serif; color: #0B1030; cursor: pointer; border-radius: 30px; transition: all 0.3s ease;">\${c}</button>\n`;
});

tabsHtml += `    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const tabs = document.querySelectorAll('.cat-tab');
        const items = document.querySelectorAll('.service-item');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.style.background = 'transparent');
                tabs.forEach(t => t.style.color = '#0B1030');
                
                tab.style.background = 'linear-gradient(135deg, #00505A, #001937)';
                tab.style.color = '#ffffff';
                
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

// Inject tabs before the grid
const gridStartStr = '<div class="elementor-element elementor-element-7e00e1b';
const gridIdx = content.indexOf(gridStartStr);

content = content.substring(0, gridIdx) + tabsHtml + content.substring(gridIdx);

fs.writeFileSync('src/content/bodies/products.html', content, 'utf8');
console.log('Categories and tabs added successfully.');
