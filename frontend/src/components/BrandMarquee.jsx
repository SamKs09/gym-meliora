"use client";
import React from "react";

export default function BrandMarquee() {
  const brands = [
    "ELEIKO",
    "ROGUE",
    "TECHNOGYM",
    "WATSON",
    "KEISER",
    "THERAGUN",
    "IVANKO",
    "WOODWAY"
  ];

  // Double the array to ensure smooth continuous infinite loop
  const doubleBrands = [...brands, ...brands, ...brands];

  return (
    <div
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
        padding: "2.5rem 0",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* Dark Ambient Vignettes at sides */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(30px, 12vw, 150px)",
          height: "100%",
          background: "linear-gradient(90deg, #080808 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "clamp(30px, 12vw, 150px)",
          height: "100%",
          background: "linear-gradient(270deg, #080808 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none"
        }}
      />

      <div className="marquee-track">
        {doubleBrands.map((brand, idx) => (
          <span
            key={idx}
            className="marquee-item"
            style={{
              fontFamily: "var(--font-header)",
              fontSize: "clamp(1.3rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.08)",
              textTransform: "uppercase",
              padding: "0 clamp(1.5rem, 4vw, 4rem)",
              display: "inline-block",
              transition: "color 0.4s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent-gold)";
              e.target.style.textShadow = "0 0 15px rgba(197, 168, 128, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "rgba(255,255,255,0.08)";
              e.target.style.textShadow = "none";
            }}
          >
            {brand}
          </span>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          width: max-content;
          animation: scroll-marquee 25s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
