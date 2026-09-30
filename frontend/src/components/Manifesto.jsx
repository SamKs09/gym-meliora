import React from "react";

export default function Manifesto({ t }) {
  const pillars = [
    {
      num: "01",
      title: t.pillar1Title,
      desc: t.pillar1Desc
    },
    {
      num: "02",
      title: t.pillar2Title,
      desc: t.pillar2Desc
    },
    {
      num: "03",
      title: t.pillar3Title,
      desc: t.pillar3Desc
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            maxWidth: "700px",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
          className="manifesto-header reveal-up"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--accent-gold)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem"
            }}
          >
            {t.subtitle}
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.05",
              marginBottom: "2rem",
            }}
          >
            {t.title1}<br />{t.title2}
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
            }}
          >
            {t.description}
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(1.25rem, 3vw, 2rem)",
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.num}
              className={`glass-panel reveal-scale delay-${(i + 1) * 100}`}
              style={{
                padding: "clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                borderWidth: "1px",
              }}
            >
              {/* Pillar Number */}
              <span
                style={{
                  fontFamily: "var(--font-header)",
                  fontSize: "4.5rem",
                  fontWeight: 800,
                  color: "rgba(197, 168, 128, 0.15)",
                  lineHeight: "1",
                  marginBottom: "1.5rem",
                  display: "block"
                }}
              >
                {pillar.num}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#ffffff",
                  marginBottom: "1rem",
                  letterSpacing: "0.02em"
                }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                  position: "relative",
                  zIndex: 2
                }}
              >
                {pillar.desc}
              </p>

              {/* Decorative Accent Dot */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  width: "4px",
                  height: "4px",
                  backgroundColor: "var(--accent-gold)",
                  opacity: 0.5
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
