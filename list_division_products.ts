import { getProductsByDivision, divisionConfig } from "./src/lib/division-mapper";

console.log("Product Categorization Report:\n");

for (const divisionSlug of Object.keys(divisionConfig)) {
  const products = getProductsByDivision(divisionSlug);
  console.log(`--- ${divisionConfig[divisionSlug].title.toUpperCase()} ---`);
  if (products.length === 0) {
    console.log("  (No products - Coming Soon)");
  } else {
    products.forEach(p => console.log(`  - ${p.title}`));
  }
  console.log("\n");
}
