export type Product = {
  id: number;
  title: string;
  slug: string;
  category: string;
  dosageForm: string;
  composition: string;
  packDetail: string;
  img: string;
};

export const products: Product[] = [
  {
    "id": 1,
    "title": "Acofan Tablet",
    "slug": "acofan-tablet",
    "category": "Calcium Channel Blocker, Nsaid",
    "dosageForm": "Tablet",
    "composition": "Aceclofenac BP 100 mg",
    "packDetail": "3 x 10 Tablets",
    "img": "/assets/uploads/products/acofan_tablet_1779861526962.png"
  },
  {
    "id": 2,
    "title": "Acumol Tablet",
    "slug": "acumol-tablet",
    "category": "Nsaid",
    "dosageForm": "Tablet",
    "composition": "Acelofenac BP 100 mg; Paracetamol BP 500mg",
    "packDetail": "2 x 10 Tablets",
    "img": "/assets/uploads/products/acumol_tablet_1779861543662.png"
  },
  {
    "id": 3,
    "title": "AFSC Kit",
    "slug": "afsc-kit",
    "category": "Antimicrobial",
    "dosageForm": "Kit",
    "composition": "2 Secnidazole 1 Gm, 1 Azithromycin USP 1 Gm, 1 Fluconazole 150 mg",
    "packDetail": "1 Kit",
    "img": "/assets/uploads/products/afsc_kit_1779861558320.png"
  },
  {
    "id": 4,
    "title": "Amloclass-5",
    "slug": "amloclass-5",
    "category": "Calcium Channel Blocker",
    "dosageForm": "Tablet",
    "composition": "Amlodipine besilate BP 5 mg",
    "packDetail": "3 x 10 Tablets",
    "img": "/assets/uploads/products/amloclass_tablet_1779861571411.png"
  },
  {
    "id": 5,
    "title": "Amloclass-AT",
    "slug": "amloclass-at",
    "category": "Calcium Channel Blocker",
    "dosageForm": "Tablet",
    "composition": "Amlodipine besilate BP 5 mg; Atenolol BP 50mg",
    "packDetail": "3 x 10 Tablets",
    "img": "/assets/uploads/products/amloclass_at_tablet_1779861586240.png"
  },
  {
    "id": 6,
    "title": "Amloclass-10",
    "slug": "amloclass-10",
    "category": "Calcium Channel Blocker",
    "dosageForm": "Tablet",
    "composition": "Amlodipine besilate BP 10 mg",
    "packDetail": "3 x 10 Tablets",
    "img": "/assets/uploads/products/amloclass_tablet_1779861571411.png"
  },
  {
    "id": 7,
    "title": "Applift Syrup",
    "slug": "applift-syrup",
    "category": "Herbal",
    "dosageForm": "Syrup",
    "composition": "Cyprihepradine 2mg, Tricholine Citrate 275mg, Sorbitol (70%)",
    "packDetail": "200ml",
    "img": "/assets/uploads/products/applift_syrup_1779861603024.png"
  },
  {
    "id": 8,
    "title": "Atroclass 10",
    "slug": "atroclass-10",
    "category": "Statin",
    "dosageForm": "Tablet",
    "composition": "Atorvastatin Calcium BP 10 mg",
    "packDetail": "1 x 10 Tablets",
    "img": "/assets/uploads/products/atroclass_tablet_generated.png"
  },
  {
    "id": 9,
    "title": "Atroclass 20",
    "slug": "atroclass-20",
    "category": "Statin",
    "dosageForm": "Tablet",
    "composition": "Atorvastatin Calcium BP 20 mg",
    "packDetail": "3 x 10 Tablets",
    "img": "/assets/uploads/products/atroclass_tablet_generated.png"
  },
  {
    "id": 10,
    "title": "Cefezone 1gm",
    "slug": "cefezone-1gm",
    "category": "Antibiotic",
    "dosageForm": "Injection",
    "composition": "Ceftriaxone Sodium USP 1 Gm",
    "packDetail": "1 Vial + WFI",
    "img": "/assets/uploads/products/cefezone_injection_1779861625763.png"
  },
  {
    "id": 11,
    "title": "Cefezone -S 1.5gm",
    "slug": "cefezone-s-1-5gm",
    "category": "Antibiotic",
    "dosageForm": "Injection",
    "composition": "Ceftriaxone Sodium USP 1 Gm, Sulbactam Sodium USP 500 Mg",
    "packDetail": "1 Vial + WFI",
    "img": "/assets/uploads/products/cefezone_injection_1779861625763.png"
  },
  {
    "id": 12,
    "title": "Cipotax Tablet",
    "slug": "cipotax-tablet",
    "category": "Antibiotic",
    "dosageForm": "Tablet",
    "composition": "Ciprofloxacin USP 500mg, Tinidazole BP 600mg",
    "packDetail": "1 x 10 Tablets",
    "img": "/assets/uploads/products/cipotax_tablet_1779861642554.png"
  },
  {
    "id": 13,
    "title": "Cough Off Sugar Free Syrup",
    "category": "Herbal",
    "dosageForm": "Syrup",
    "composition": "Adhatoda vasica 5mg, Piper longum 25mg, Piper nigrum 20mg, Zingiber afficinale 12mg, Glycyrrhiza glabra 10mg, Emblica officinale 16mg, Curcuma Ionga 15mg, Acacia catechu 17mg, Foeniculum vulgare 18mg, Ocimum sanctum 5mg, Terminelia chebula 5mg, Terminelia bellerica 5mg, Alpinia galanga 20mg, Abrus precatorious 20mg, Menthol 2mg, Aqua 2.805ml Sugar Syrup, Sodium-2ml, Benzoate-0.20%, Bronopol-0.05%, Citric Acid Monohydrate-0.50%, Sodium Citrate-0.20%",
    "packDetail": "100 ml Bottle",
    "slug": "cough-off-sugar-free-syrup",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 14,
    "title": "Cough Off Syrup 100 ml : Dry Cough and Allergy Medication",
    "category": "Herbal",
    "dosageForm": "Syrup",
    "composition": "Adhatoda vasica 5mg, Piper longum 25mg, Piper nigrum 20mg, Zingiber afficinale 12mg Glycyrrhiza glabra 10mg, Emblica officinale 16mg, Curcuma Ionga 15mg, Acacia catechu 17mg, Foeniculum vulgare 18mg, Ocimum sanctum 5mg, Terminelia chebula 5mg, Terminelia bellerica 5mg, Alpinia galanga 20mg, Abrus precatorious 20mg, Menthol 2mg, Aqua 2.805ml, Sorbitol2ml, Sodium Benzoate0.20%, Bronopol0.05%, Citric Acid Monohydrate0.50%, Sodium Citrate0.20%.",
    "packDetail": "100 ml Bottle",
    "slug": "cough-off-syrup-100-ml",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 15,
    "title": "Fekey: Iron and Folic Acid Supplement Medication",
    "category": "Antioxidant",
    "dosageForm": "Syrup",
    "composition": "Sodium Feredetate BP Eq. to El. Iron-33mg + Vit. B12- BP 7.5 mcg + Folic Acid BP 1.5 mg + Pyridoxine HCL-BP 1.5 mg",
    "packDetail": "200 ml Bottle",
    "slug": "fekey-syrup",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 16,
    "title": "Fitjoy Capsule: Multivitamin and Multi-Mineral Supplement",
    "category": "Herbal",
    "dosageForm": "Capsule",
    "composition": "Bolsarnodendron roxburghi 120mg, Garclnia purpuria 50mg, Ipomoea turpethum 10mg combination of three Herbs 40mg, Embelia ribes 25mg, Piper longum 25mg, Piper nigrum 25mg, Plumbago zeylnnica 30mg, Cyperus rotundus 30mg, Zingibe officinnle 25mg, Tinospera cordifolia 30mg, Acacia catechu 30mg, Fregonella arthex 20mg Picrorhiza kurroa 10mg, Allium sativum 10mg, Ananos comosus 10mg, Ferrum 10mg, Sodium Benzoate 0.02mg",
    "packDetail": "3 x 10 Capsules",
    "slug": "fitjoy-capsule",
    "img": "/assets/uploads/products/capsule_mockup.png"
  },
  {
    "id": 17,
    "title": "Fizo 20mg Tablet: Acid Reflux and Peptic Ulcers Medication",
    "category": "Sexual Stimulator, PPI",
    "dosageForm": "Tablet",
    "composition": "Rabeprazole Sodium 20 mg",
    "packDetail": "1 x 10 Tablets",
    "slug": "fizo-20mg-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 18,
    "title": "Fizo Tablet",
    "category": "Sexual Stimulator, PPI",
    "dosageForm": "Tablet",
    "composition": "Rabeprazole Sodium 20 mg",
    "packDetail": "3 x 10 Tablets",
    "slug": "fizo-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 19,
    "title": "Glimpse 2mg Tablet: Type 2 Diabetes Medication",
    "category": "Sulfonylureas",
    "dosageForm": "Tablet",
    "composition": "Glimepiride USP 2 mg",
    "packDetail": "3 x 10 Tablets",
    "slug": "glimsy-2mg-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 20,
    "title": "Glimsy 4 Tablet: Diabetes Medication",
    "category": "Sulfonylureas",
    "dosageForm": "Tablet",
    "composition": "Glimepiride USP 4 mg",
    "packDetail": "3 x 10 Tablets",
    "slug": "glimsy-4-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 21,
    "title": "Glimsy1 Tablet: Diabetes Medication",
    "category": "Antidiabetic",
    "dosageForm": "Tablet",
    "composition": "Glimepiride USP 1 Mg",
    "packDetail": "3x 10 Tablets",
    "slug": "glimsy-1-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 22,
    "title": "Glow Act Cream – Skin Conditions Medication",
    "category": "Herbal",
    "dosageForm": "Cream",
    "composition": "Aloe Indica 600 mg, Calendula officinalis 200 mg, Bee's Wax 200 mg, Aqua-Q.s, Methyl Paraben 1.5 mg, Propyl Paraben 1.5 mg",
    "packDetail": "30 gm Cream",
    "slug": "glow-act-cream",
    "img": "/assets/uploads/products/cream_mockup.png"
  },
  {
    "id": 23,
    "title": "Imuclav 1.2 gm Injection – Antibiotic Medication",
    "category": "Antibiotic",
    "dosageForm": "Injection",
    "composition": "Amoxicillin- BP 1 Gm & Clavulanic Acid-BP .2 gm",
    "packDetail": "1 Vial for I.V. Use Only",
    "slug": "imuclav-1-2-gm-injection",
    "img": "/assets/uploads/products/injection_mockup.png"
  },
  {
    "id": 24,
    "title": "Imuclav 1125 Tablet: Bacterial Infection Medication",
    "category": "Antibiotic",
    "dosageForm": "Tablet",
    "composition": "Amoxicillin-BP 1000 mg & Clavulanic Acid- BP 125 mg",
    "packDetail": "2 x 6 Tablets",
    "slug": "imuclav-1125-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 25,
    "title": "Imuclav BID 30 ml Syrup: Antibiotic for Child's Infections",
    "category": "Antibiotic",
    "dosageForm": "Syrup",
    "composition": "Amoxicillin-BP 200 mg & Clavulanic Acid- BP 28.5 mg",
    "packDetail": "30 ml Syrup",
    "slug": "imuclav-bid-30-ml-syrup",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 26,
    "title": "Imuclav Dry 30 ml Syrup: Child's Infection Medication",
    "category": "Antibiotic",
    "dosageForm": "Syrup",
    "composition": "Amoxicillin- USP 125 mg & Clavulanic Acid-USP 31.5 mg",
    "packDetail": "30 ml Syrup",
    "slug": "imuclav-dry-30-ml-syrup",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 27,
    "title": "Imuclav DUO 60 ml Syrup – Antibiotic Medication",
    "category": "Antibiotic",
    "dosageForm": "Syrup",
    "composition": "Amoxicillin-USP 100 mg & Clavulanic Acid- USP 12.5 mg",
    "packDetail": "60 ml Syrup",
    "slug": "imuclav-duo-60-ml-syrup",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 28,
    "title": "Imuclav Ultra Syrup",
    "category": "Antibiotic",
    "dosageForm": "Syrup",
    "composition": "Amoxicillin-USP 250 mg & Clavulanic Acid- USP 31.25 mg",
    "packDetail": "60 ml Syrup",
    "slug": "imuclav-ultra-syrup",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 29,
    "title": "Indclav 1000 Tablet: Bacterial Infection Medication",
    "category": "Antibiotic",
    "dosageForm": "Tablet",
    "composition": "Amoxicillin-BP 875 mg & Clavulanic Acid-BP 125 mg",
    "packDetail": "2 x 6 Tablets",
    "slug": "imuclav-1000-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 30,
    "title": "Ipozole Capsule: Heartburn, Acid Reflux, and Peptic Ulcers Medication",
    "category": "Sexual Stimulator, PPI",
    "dosageForm": "Capsule",
    "composition": "Omeprazole USP 20 mg",
    "packDetail": "1 x 10 Tablets",
    "slug": "ipozole-capsule",
    "img": "/assets/uploads/products/capsule_mockup.png"
  },
  {
    "id": 31,
    "title": "Kidjoy Gripe Water 120 ml Bottle – Infant Discomfort Relief Medication",
    "category": "Herbal",
    "dosageForm": "Oral Solution",
    "composition": "Peppermint (Mentha piperita) 0.007ml, Glycerin 0.13gm Soya (Feniculam vulgare) 0.005ml, Sugar Syrup 2ml, Auqa Q.s, Sajjikhar (Sodium salt) 2Smg, Sodium Benzoate 0.20%, Bronopol 0.05%, Citric Acid Monohydrate 0.50%, Sodium citrate 0.20%",
    "packDetail": "120 ml Bottle",
    "slug": "kidjoy-gripe-water",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 32,
    "title": "Kolicure15 ml Drops: Child's Tummy Trouble Medication",
    "category": "Antispasmodic",
    "dosageForm": "Drops",
    "composition": "Simethicone-USP 40 mg + Dill Oil-BP 0.005ml + Fennel Oil-USP 0.0007 ml",
    "packDetail": "15 ml Drops",
    "slug": "kolicure-15-ml-drops",
    "img": "/assets/uploads/products/drops_mockup.png"
  },
  {
    "id": 33,
    "title": "Metclass 1000mg Tablet SR: Type 2 Diabetes Medication",
    "category": "Biguanides",
    "dosageForm": "Tablet",
    "composition": "Metformin Hydrochloride USP 1000 mg (As sustained release form)",
    "packDetail": "3 x 10 Tablets",
    "slug": "metclass-1000mg-tablet-sr",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 34,
    "title": "Metclass 500mg Tablet SR: Diabetes Medication",
    "category": "Biguanides",
    "dosageForm": "Tablet",
    "composition": "Metformin Hydrochloride USP 500 mg (As sustained release form)",
    "packDetail": "3 x 10 Tablets",
    "slug": "metclass-sr-500",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 35,
    "title": "Metclass G 1 Tablet SR: Type 2 Diabetes Medication",
    "category": "Antidiabetic",
    "dosageForm": "Tablet",
    "composition": "Glimepiride USP 1 mg + Metformin Hydrochloride USP 500 mg (As sustained release form)",
    "packDetail": "3x 10 Tablets",
    "slug": "metclass-g-1-tablet-sr",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 36,
    "title": "Metclass G 2 Tablet SR: Type 2 Diabetes Medication",
    "category": "Antidiabetic",
    "dosageForm": "Tablet",
    "composition": "Glimepiride USP 2 mg + Metformin Hydrochloride USP 500 mg (As sustained release form)",
    "packDetail": "3x 10 Tablets",
    "slug": "metclass-g-2-tablet-sr",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 37,
    "title": "Monsieur Capsule – Fungal Infection Medication",
    "category": "Herbal",
    "dosageForm": "Capsule",
    "composition": "Myristica officinalis 20mg, Withania somnifera 40mg, Mukuna Pruciens 40mg, Pedalium murex 40mg, Asphalatum 50mg, Curculigo orchioides 40mg, Abrus precatorious 40mg, Moskus 40mg, Adds Kendens 30mg, Myristica fragrans 10mg, Ocymum sanctum 10mg, Crocistigmata 2mg, Anacvclus pyrethrum 20mg, Astercantha Longifolia 20mg, Caryophllus aromaticus 10mg, Convolvulus paniculatu 10mg, Orchid mascula 10mg, Cubeba officinalis 5mg, Sida Cordifolia 20mg, loh Bhasam 25mg, Makar Dhawaj 8mg, Swarn Vang Bhasam 0.25mg",
    "packDetail": "1 x 10 Capsules",
    "slug": "monsieur-capsule",
    "img": "/assets/uploads/products/capsule_mockup.png"
  },
  {
    "id": 38,
    "title": "PKG Cream: Skin Condition Medication",
    "category": "Herbal",
    "dosageForm": "Cream",
    "composition": "Eucalyptus globulus 2.50%, Menthaspicata 1.50%, Lemon Grass 1%, Cinnamomum Camphora 2%, Syzygium Aromaticus 1%, Gaultheria procumbens 3%, Trachyspermumamml 2.50%, Turpentine 1%, Cedrusdeodara 3%, Zingiber Offldnale 3%, Myristica Officinale 1%, Aqua 60%, Methyl Paraben 1.5 mg, Propyl Paraben 1.5 mg, Precipitate Silica 20%",
    "packDetail": "30 gm Cream",
    "slug": "pkg-cream",
    "img": "/assets/uploads/products/cream_mockup.png"
  },
  {
    "id": 39,
    "title": "R-Lume 20/120 mg Tablet: Malaria Medication",
    "category": "Antimalarial",
    "dosageForm": "Tablet",
    "composition": "Artemether-20 mg & Lumefantrine-120 mg",
    "packDetail": "1 x 6 Tablets",
    "slug": "r-lume-20-120-mg-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 40,
    "title": "R-Lume 40mg/240mg Tablet: Treats Malaria in Adults and Children",
    "category": "Antimalarial",
    "dosageForm": "Tablet",
    "composition": "Artemether-40 mg & Lumefantrine-240 mg",
    "packDetail": "1 x 6 Tablets",
    "slug": "r-lume-40mg-240mg-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 41,
    "title": "R-Lume 80/480 Tablet: Malaria Medication",
    "category": "Antimalarial",
    "dosageForm": "Tablet",
    "composition": "Arthemether 80 mg + Lumefantrine 480 mg",
    "packDetail": "1 x 6 Tablets",
    "slug": "r-lume-80-480-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 42,
    "title": "R-Lume Injection: Malaria Medication",
    "category": "Antimalarial",
    "dosageForm": "Injection",
    "composition": "Artemether – 80 mg",
    "packDetail": "1 x 6 Ampoules",
    "slug": "r-lume-injection",
    "img": "/assets/uploads/products/injection_mockup.png"
  },
  {
    "id": 43,
    "title": "R-Lume Oral Suspension: Malaria Medication",
    "category": "Antimalarial",
    "dosageForm": "Suspension",
    "composition": "Artemether – 180 mg & Lumefantrine – 1080 mg",
    "packDetail": "60 ml Suspension",
    "slug": "r-lume-oral-suspension",
    "img": "/assets/uploads/products/syrup_mockup.png"
  },
  {
    "id": 44,
    "title": "Sidegra 100mg Jelly Tablet: Erectile Dysfunction Medication",
    "category": "Sexual Stimulator",
    "dosageForm": "Jelly",
    "composition": "Sildenafil 100 mg",
    "packDetail": "Jelly",
    "slug": "sidegra-100mg-jelly-tablet",
    "img": "/assets/uploads/products/cream_mockup.png"
  },
  {
    "id": 45,
    "title": "Sidegra 100mg Tablet: Erectile Dysfunction Medication",
    "category": "Sexual Stimulator",
    "dosageForm": "Tablet",
    "composition": "Sildenafil 100 mg",
    "packDetail": "1 x 4 Tablets",
    "slug": "sidegra-100mg-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 46,
    "title": "Sidegra 50mg Tablet: Citrate De Slidenafil Comprimes",
    "category": "Sexual Stimulator",
    "dosageForm": "Tablet",
    "composition": "Sildenafil 50 mg",
    "packDetail": "1 x 4 Tablets",
    "slug": "sidegra-50mg-tablet",
    "img": "/assets/uploads/products/tablet_mockup.png"
  },
  {
    "id": 47,
    "title": "Tramaclass 100mg Injection: Pain Relief Medication",
    "category": "Nsaid",
    "dosageForm": "Injection",
    "composition": "Tramadol HCl- BP 100 mg",
    "packDetail": "5 Ampoules of 2 ml Each",
    "slug": "tramaclass-100mg-injection",
    "img": "/assets/uploads/products/injection_mockup.png"
  },
  {
    "id": 48,
    "title": "Tramaclass 50 Capsule – Hypertension Medication",
    "category": "Nsaid",
    "dosageForm": "Capsule",
    "composition": "Tramadol HCl – BP 50 mg",
    "packDetail": "1 x 10 Capsules",
    "slug": "tramaclass-50-capsule",
    "img": "/assets/uploads/products/capsule_mockup.png"
  }
];
