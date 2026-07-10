"use client";

import React from "react";
import { Product } from "@/lib/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { divisionConfig } from "@/lib/division-mapper";

interface DivisionPageProps {
  divisionSlug: string;
  products: Product[];
}

export function DivisionPage({ divisionSlug, products }: DivisionPageProps) {
  const config = divisionConfig[divisionSlug] || {
    title: divisionSlug.replace("-", " ").toUpperCase(),
    description: "Explore our specialized healthcare solutions.",
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", paddingBottom: "80px" }}>
      {/* Premium Hero Banner for Division */}
      <div
        style={{
          background: "linear-gradient(135deg, #0d2657 0%, #0a1d42 100%)",
          padding: "100px 20px",
          textAlign: "center",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              marginBottom: "20px",
              fontFamily: "'Inter', sans-serif",
              color: "#ffffff",
            }}
          >
            {config.title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {config.description}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "-40px auto 0", position: "relative", zIndex: 2, padding: "0 20px" }}>
        {products.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "30px",
              background: "#ffffff",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              padding: "80px 40px",
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "30px" }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 style={{ fontSize: "32px", color: "#1f2937", marginBottom: "16px", fontWeight: 700 }}>
              Coming Soon
            </h2>
            <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "500px", margin: "0 auto 30px", lineHeight: 1.6 }}>
              We are currently formulating and preparing premium healthcare solutions for the <strong>{config.title}</strong> division. Check back soon for updates!
            </p>
            <a
              href="/products"
              style={{
                display: "inline-block",
                background: "#0d2657",
                color: "#ffffff",
                padding: "12px 30px",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: 600,
                transition: "background 0.2s",
              }}
            >
              Explore Existing Products
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
