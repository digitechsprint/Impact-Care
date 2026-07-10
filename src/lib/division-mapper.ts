import { Product, products } from "./data/products";

export const divisionConfig: Record<string, { title: string; description: string; keywords: string[] }> = {
  "general-medicine": {
    title: "General Medicine",
    description: "Our comprehensive range of general medicine products covers essential therapeutic categories to manage common illnesses, infections, and pain.",
    keywords: ["fever", "pain", "infection", "malaria", "paracetamol", "antibiotic", "cough", "syrup", "tablet", "suspension", "r-lume", "iz", "levoray", "fekey", "cipotax", "acofan", "fizo", "sidegra", "imuclav"],
  },
  "cardio-diabetics": {
    title: "Cardio-Diabetics",
    description: "Advanced formulations to support cardiovascular health and manage diabetes effectively, ensuring better patient outcomes.",
    keywords: ["cardio", "diabetic", "diabetes", "heart", "sugar", "blood pressure", "metformin", "glimepiride", "metclass", "glimsy"],
  },
  "critical-care": {
    title: "Critical Care",
    description: "Life-saving critical care medications and injections designed for immediate action and emergency medical settings.",
    keywords: ["critical", "emergency", "injection", "severe", "hospital", "iv", "tramaclass", "imuclav injection"],
  },
  "pediatrics": {
    title: "Pediatrics",
    description: "Safe, effective, and child-friendly formulations specially developed for infants and children's healthcare needs.",
    keywords: ["pediatric", "child", "infant", "baby", "drops", "gripe water", "kidjoy", "kolicure", "syrup"],
  },
  "herbals": {
    title: "Herbals",
    description: "Natural and ayurvedic formulations blending traditional wisdom with modern science for holistic wellness.",
    keywords: ["herbal", "natural", "ayurvedic", "aloe", "botanical", "glow act", "monsieur", "fitjoy"],
  },
  "generic": {
    title: "Generic",
    description: "High-quality, affordable generic medicines ensuring accessible healthcare across diverse therapeutic segments.",
    keywords: ["generic", "affordable", "ipozole"],
  },
  "upcoming": {
    title: "Upcoming Innovations",
    description: "A sneak peek into our robust R&D pipeline featuring next-generation healthcare solutions and advanced formulations.",
    keywords: ["upcoming", "future", "pipeline"],
  }
};

export function getProductsByDivision(divisionSlug: string): Product[] {
  const config = divisionConfig[divisionSlug];
  if (!config) return [];

  // Manual hardcoded mappings for better accuracy
  const hardcodedMap: Record<string, string[]> = {
    "cardio-diabetics": ["metclass-g-1-tablet-sr", "metclass-g-2-tablet-sr", "metclass-sr-500", "metclass-1000mg-tablet-sr", "glimsy-1-tablet", "glimsy-2mg-tablet", "glimsy-4-tablet"],
    "pediatrics": ["kidjoy-gripe-water", "kolicure-15-ml-drops", "cough-off-sugar-free-syrup", "cough-off-syrup-100-ml", "imuclav-dry-30-ml-syrup", "imuclav-bid-30-ml-syrup", "imuclav-duo-60-ml-syrup", "imuclav-ultra-syrup"],
    "critical-care": ["tramaclass-100mg-injection", "imuclav-1-2-gm-injection", "r-lume-injection"],
    "herbals": ["glow-act-cream", "monsieur-capules", "fitjoy-capsule"],
    "generic": ["ipozole-20mg-tablets", "ipozole-capsule"],
  };

  const exactSlugs = hardcodedMap[divisionSlug] || [];

  return products.filter((product) => {
    // 1. Check exact slug match
    if (exactSlugs.includes(product.slug)) return true;

    // 2. Check keyword match in title, category, or description
    const textToSearch = `${product.title} ${product.category} ${product.description}`.toLowerCase();
    
    // Generic medicine gets a lot, so we only add it if it's not strictly pediatrics/cardio/herbals/critical/generic
    if (divisionSlug === "general-medicine") {
      const isCardio = hardcodedMap["cardio-diabetics"].includes(product.slug) || textToSearch.includes("diabetes") || textToSearch.includes("sugar");
      const isPediatric = hardcodedMap["pediatrics"].includes(product.slug) || textToSearch.includes("baby") || textToSearch.includes("gripe water");
      const isHerbal = hardcodedMap["herbals"].includes(product.slug) || textToSearch.includes("herbal");
      const isCritical = hardcodedMap["critical-care"].includes(product.slug) || textToSearch.includes("injection");
      const isGeneric = hardcodedMap["generic"].includes(product.slug);
      
      if (!isCardio && !isPediatric && !isHerbal && !isCritical && !isGeneric) {
        return true; // Catch-all for other medicines
      }
      return false;
    }

    // For other divisions, use keyword matching if not already caught by exact match
    return config.keywords.some(kw => textToSearch.includes(kw));
  });
}
