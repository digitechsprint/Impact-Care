const fs = require('fs');

const first12Products = [
    { id: 1, title: "Acofan Tablet", slug: "acofan-tablet", category: "Calcium Channel Blocker, Nsaid", dosageForm: "Tablet", composition: "Aceclofenac BP 100 mg", packDetail: "3 x 10 Tablets", img: "/assets/uploads/products/acofan_tablet_1779861526962.png" },
    { id: 2, title: "Acumol Tablet", slug: "acumol-tablet", category: "Nsaid", dosageForm: "Tablet", composition: "Acelofenac BP 100 mg; Paracetamol BP 500mg", packDetail: "2 x 10 Tablets", img: "/assets/uploads/products/acumol_tablet_1779861543662.png" },
    { id: 3, title: "AFSC Kit", slug: "afsc-kit", category: "Antimicrobial", dosageForm: "Kit", composition: "2 Secnidazole 1 Gm, 1 Azithromycin USP 1 Gm, 1 Fluconazole 150 mg", packDetail: "1 Kit", img: "/assets/uploads/products/afsc_kit_1779861558320.png" },
    { id: 4, title: "Amloclass-5", slug: "amloclass-5", category: "Calcium Channel Blocker", dosageForm: "Tablet", composition: "Amlodipine besilate BP 5 mg", packDetail: "3 x 10 Tablets", img: "/assets/uploads/products/amloclass_tablet_1779861571411.png" },
    { id: 5, title: "Amloclass-AT", slug: "amloclass-at", category: "Calcium Channel Blocker", dosageForm: "Tablet", composition: "Amlodipine besilate BP 5 mg; Atenolol BP 50mg", packDetail: "3 x 10 Tablets", img: "/assets/uploads/products/amloclass_at_tablet_1779861586240.png" },
    { id: 6, title: "Amloclass-10", slug: "amloclass-10", category: "Calcium Channel Blocker", dosageForm: "Tablet", composition: "Amlodipine besilate BP 10 mg", packDetail: "3 x 10 Tablets", img: "/assets/uploads/products/amloclass_tablet_1779861571411.png" },
    { id: 7, title: "Applift Syrup", slug: "applift-syrup", category: "Herbal", dosageForm: "Syrup", composition: "Cyprihepradine 2mg, Tricholine Citrate 275mg, Sorbitol (70%)", packDetail: "200ml", img: "/assets/uploads/products/applift_syrup_1779861603024.png" },
    { id: 8, title: "Atroclass 10", slug: "atroclass-10", category: "Statin", dosageForm: "Tablet", composition: "Atorvastatin Calcium BP 10 mg", packDetail: "1 x 10 Tablets", img: "/assets/uploads/products/atroclass_tablet_generated.png" },
    { id: 9, title: "Atroclass 20", slug: "atroclass-20", category: "Statin", dosageForm: "Tablet", composition: "Atorvastatin Calcium BP 20 mg", packDetail: "3 x 10 Tablets", img: "/assets/uploads/products/atroclass_tablet_generated.png" },
    { id: 10, title: "Cefezone 1gm", slug: "cefezone-1gm", category: "Antibiotic", dosageForm: "Injection", composition: "Ceftriaxone Sodium USP 1 Gm", packDetail: "1 Vial + WFI", img: "/assets/uploads/products/cefezone_injection_1779861625763.png" },
    { id: 11, title: "Cefezone -S 1.5gm", slug: "cefezone-s-1-5gm", category: "Antibiotic", dosageForm: "Injection", composition: "Ceftriaxone Sodium USP 1 Gm, Sulbactam Sodium USP 500 Mg", packDetail: "1 Vial + WFI", img: "/assets/uploads/products/cefezone_injection_1779861625763.png" },
    { id: 12, title: "Cipotax Tablet", slug: "cipotax-tablet", category: "Antibiotic", dosageForm: "Tablet", composition: "Ciprofloxacin USP 500mg, Tinidazole BP 600mg", packDetail: "1 x 10 Tablets", img: "/assets/uploads/products/cipotax_tablet_1779861642554.png" }
];

const genProductsCode = fs.readFileSync('generate_products.js', 'utf8');
const productsMatch = genProductsCode.match(/const products = (\[[\s\S]+?\]);\r?\n/);
let otherProducts = [];
if (productsMatch) {
    otherProducts = eval(productsMatch[1]);
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

otherProducts.forEach(p => {
    p.img = getImageUrl(p.dosageForm);
});

const allProducts = [...first12Products, ...otherProducts];

// Let's generate a proper TypeScript file for it
let tsContent = `export type Product = {
  id: number;
  title: string;
  slug: string;
  category: string;
  dosageForm: string;
  composition: string;
  packDetail: string;
  img: string;
};

export const products: Product[] = ${JSON.stringify(allProducts, null, 2)};
`;

if (!fs.existsSync('src/lib/data')) {
    fs.mkdirSync('src/lib/data', { recursive: true });
}
fs.writeFileSync('src/lib/data/products.ts', tsContent, 'utf8');
console.log('src/lib/data/products.ts created with 48 products!');
