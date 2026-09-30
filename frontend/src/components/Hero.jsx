import React from "react";
import ThreeHeroBackground from "./ThreeHeroBackground";

export default function Hero({ t, onWatchFilm }) {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(8,8,8,0.96) 80%), url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600') no-repeat center center/cover",
        padding: "0 2rem",
        overflow: "hidden",
      }}
    >
      {/* 3D Kinetic Three.js Sculpture Background */}
      <ThreeHeroBackground />

      {/* Decorative Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(197, 168, 128, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Cinematic Subtitle */}
        <span
          className="reveal-up"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "var(--accent-gold)",
            letterSpacing: "0.3em",
            marginBottom: "1.5rem",
            display: "inline-block",
          }}
        >
          {t.subtitle}
        </span>

        {/* Hero Title */}
        <h1
          className="reveal-up delay-100"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
            lineHeight: "0.98",
            marginBottom: "2rem",
            textTransform: "uppercase",
            fontFamily: "var(--font-header)",
            fontWeight: 800,
          }}
        >
          {t.title.split(".").map((part, idx) => {
            if (!part.trim()) return null;
            const isLast = idx === t.title.split(".").length - 2; // Split leaves trailing empty string
            return (
              <React.Fragment key={idx}>
                {isLast ? (
                  <span className="text-gradient">{part.trim()}.</span>
                ) : (
                  <span>{part.trim()}.</span>
                )}
                {idx < t.title.split(".").length - 2 && <br />}
              </React.Fragment>
            );
          })}
        </h1>

        {/* Hero Description */}
        <p
          className="reveal-up delay-200"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "700px",
            marginBottom: "3rem",
            fontWeight: 400,
            lineHeight: "1.6",
          }}
        >
          {t.description}
        </p>

        {/* Action Buttons */}
        <div
          className="reveal-up delay-300"
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a href="#memberships" className="btn-primary">
            {t.ctaPrimary}
          </a>
          <button
            onClick={onWatchFilm}
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            {t.ctaSecondary}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#about"
        className="reveal-up delay-400"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "rgba(255,255,255,0.4)",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          transition: "var(--transition-fast)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
      >
        {t.scroll}
        <div
          className="pulse-indicator"
          style={{
            width: "24px",
            height: "24px",
            border: "1px solid currentColor",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </a>
    </section>
  );
}
