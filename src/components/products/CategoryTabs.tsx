"use client";

import React from "react";

type CategoryTabsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "50px", padding: "0 20px" }}>
      <div
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          padding: "15px 25px",
          borderRadius: "50px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.05)"
        }}
      >
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              style={{
                background: isActive ? "linear-gradient(135deg, #00505A, #001937)" : "transparent",
                color: isActive ? "#ffffff" : "#0B1030",
                border: "none",
                padding: "10px 20px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                borderRadius: "30px",
                transition: "all 0.3s ease",
                boxShadow: isActive ? "0 4px 15px rgba(0, 80, 90, 0.2)" : "none"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
