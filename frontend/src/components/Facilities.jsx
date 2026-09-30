import React from "react";

export default function Facilities({ t }) {
  const zones = [
    {
      title: t.zone1Title,
      desc: t.zone1Desc,
      bgImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000",
      tag: "STRENGTH"
    },
    {
      title: t.zone2Title,
      desc: t.zone2Desc,
      bgImage: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?q=80&w=1000",
      tag: "COMBAT"
    },
    {
      title: t.zone3Title,
      desc: t.zone3Desc,
      bgImage: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000",
      tag: "RECOVERY"
    }
  ];

  return (
    <section id="facilities" className="section-padding" style={{ backgroundColor: "#0b0b0b" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }} className="reveal-up">
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
              lineHeight: "1.1",
              marginBottom: "1.5rem"
            }}
          >
            {t.title1}<br /><span className="text-gradient">{t.title2}</span>
          </h2>
          <div
            style={{
              width: "50px",
              height: "2px",
              backgroundColor: "var(--accent-gold)",
              margin: "0 auto"
            }}
          />
        </div>

        {/* Zones Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)"
          }}
        >
          {zones.map((zone, i) => (
            <div
              key={zone.title}
              style={{
                position: "relative",
                height: "clamp(380px, 45vh, 500px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)",
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
              className={`facility-card reveal-scale delay-${(i + 1) * 100}`}
            >
              {/* Background Image with Zoom hover effect */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `linear-gradient(to bottom, rgba(8, 8, 8, 0.1) 0%, rgba(8, 8, 8, 0.95) 85%), url('${zone.bgImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  zIndex: 1
                }}
                className="card-bg"
              />

              {/* Accent Border Line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  backgroundColor: "var(--accent-gold)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "var(--transition-smooth)",
                  zIndex: 3
                }}
                className="top-bar"
              />

              {/* Tag */}
              <span
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  color: "var(--accent-gold)",
                  marginBottom: "1rem",
                  display: "inline-block"
                }}
              >
                {zone.tag}
              </span>

              {/* Title */}
              <h3
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontSize: "1.8rem",
                  color: "#ffffff",
                  marginBottom: "1rem"
                }}
              >
                {zone.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                  transition: "var(--transition-smooth)",
                  maxHeight: "150px"
                }}
              >
                {zone.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* STYLING HOVERS */}
      <style jsx>{`
        .facility-card:hover .card-bg {
          transform: scale(1.08);
        }
        .facility-card:hover .top-bar {
          transform: scaleX(1);
        }
        @media (max-width: 768px) {
          .facility-card {
            height: 420px !important;
          }
        }
      `}</style>
    </section>
  );
}
