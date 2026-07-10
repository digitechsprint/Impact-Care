"use client";

import React, { useState, useMemo } from "react";
import { products } from "@/lib/data/products";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";

export function ProductsCatalog() {
  const [activeCategory, setActiveCategory] = useState("All");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      p.category.split(",").forEach((c) => cats.add(c.trim()));
    });
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) =>
      p.category.split(",").map((c) => c.trim()).includes(activeCategory)
    );
  }, [activeCategory]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "30px"
        }}
      >
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
