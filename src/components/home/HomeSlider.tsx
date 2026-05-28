"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/assets/uploads/medicine_hero_1.png",
    subtitle: "Welcome to Impact Healthcare",
    title: "Premium Quality Medicines For Better Life",
    description: "We are committed to providing the highest quality pharmaceutical products to improve global health and wellbeing.",
    ctaText: "Discover More",
    ctaLink: "/about-us"
  },
  {
    id: 2,
    image: "/assets/uploads/medicine_hero_2.png",
    subtitle: "Advanced Medical Research",
    title: "Innovative Healthcare Solutions",
    description: "Our diverse team of scientists is dedicated to researching and developing cutting-edge medicines for a healthier future.",
    ctaText: "View Products",
    ctaLink: "/products"
  }
];

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-slider-hero" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", minHeight: "600px" }}>
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: isActive ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: isActive ? 1 : 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* Overlay for better text readability */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 25, 55, 0.2)" }}></div>
            
            <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 20px", width: "100%" }}>
              <div
                style={{
                  maxWidth: "700px",
                  transform: isActive ? "translateY(0)" : "translateY(30px)",
                  opacity: isActive ? 1 : 0,
                  transition: "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 20px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    color: "#ffffff",
                    borderRadius: "30px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}
                >
                  {slide.subtitle}
                </span>
                <h1
                  style={{
                    fontSize: "64px",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontFamily: "'Outfit', sans-serif",
                    lineHeight: 1.1,
                    marginBottom: "25px",
                    textShadow: "0 4px 20px rgba(0,0,0,0.2)"
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#ffffff",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                    marginBottom: "40px",
                    maxWidth: "600px",
                    background: "rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(12px)",
                    padding: "20px 30px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderLeft: "4px solid rgba(255,255,255,0.7)"
                  }}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.ctaLink}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#ffffff",
                    color: "#001937",
                    padding: "16px 36px",
                    borderRadius: "30px",
                    fontSize: "16px",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: "none",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          zIndex: 10
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: index === currentSlide ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          h1 {
            font-size: 40px !important;
          }
          p {
            font-size: 16px !important;
          }
        }
      `}} />
    </div>
  );
}
