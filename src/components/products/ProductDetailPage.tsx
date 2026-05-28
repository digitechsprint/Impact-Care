"use client";

import React from "react";
import type { Product } from "@/lib/data/products";
import Link from "next/link";

export function ProductDetailPage({ product }: { product: Product }) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      
      {/* Breadcrumb */}
      <div style={{ marginBottom: "40px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6c757d" }}>
        <Link href="/" style={{ color: "#00505A", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 10px" }}>/</span>
        <Link href="/products" style={{ color: "#00505A", textDecoration: "none" }}>Products</Link>
        <span style={{ margin: "0 10px" }}>/</span>
        <span style={{ color: "#0B1030", fontWeight: 600 }}>{product.title}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 15px 50px rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.03)"
        }}
      >
        {/* Left Side: Image */}
        <div
          style={{
            background: "#f9fbfd",
            borderRadius: "16px",
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: "400px"
          }}
        >
          <img
            src={product.img}
            alt={product.title}
            style={{
              width: "100%",
              maxWidth: "400px",
              aspectRatio: "4/3",
              objectFit: "contain",
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.1))"
            }}
          />
        </div>

        {/* Right Side: Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                background: "rgba(0, 80, 90, 0.1)",
                color: "#00505A",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              {product.category}
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: "36px",
                fontWeight: 700,
                color: "#0B1030",
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.2
              }}
            >
              {product.title}
            </h1>
          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.05)", width: "100%" }}></div>

          {/* Details Table */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#6c757d", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                Composition
              </span>
              <span style={{ fontSize: "16px", color: "#0B1030", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                {product.composition}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#6c757d", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  Dosage Form
                </span>
                <span style={{ fontSize: "16px", color: "#0B1030", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  {product.dosageForm}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "13px", color: "#6c757d", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  Pack Detail
                </span>
                <span style={{ fontSize: "16px", color: "#0B1030", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  {product.packDetail}
                </span>
              </div>
            </div>

          </div>

          <div style={{ height: "1px", background: "rgba(0,0,0,0.05)", width: "100%", marginTop: "10px" }}></div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <Link
              href="/contact-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #00505A, #001937)",
                color: "#ffffff",
                padding: "15px 30px",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(0, 80, 90, 0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 80, 90, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 80, 90, 0.2)";
              }}
            >
              Inquire Now
            </Link>
          </div>

        </div>
      </div>
      
      {/* Mobile responsive styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .product-info-container, .product-image-container {
            padding: 20px !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          div[style*="grid-template-columns: repeat"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </div>
  );
}
