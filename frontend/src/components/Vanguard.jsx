"use client";
import React, { useState, useEffect } from "react";

export default function Vanguard({ t, lang }) {
  const [trainers, setTrainers] = useState([]);
  const [activeTrainer, setActiveTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Philosophy translations based on selected language
  const philosophies = {
    en: {
      t1: "We train to survive, react, and conquer. Strength is nothing without the mental fortitude to apply it.",
      t2: "Structure yields strength. Technique is the gatekeeper of absolute athletic potential.",
      t3: "Movement is fluid, intentional, and infinite. Align the breath, align the body, extend the limit."
    },
    fr: {
      t1: "Nous nous entraînons pour survivre, réagir et conquérir. La force n'est rien sans la force mentale de l'appliquer.",
      t2: "La structure produit la force. La technique est le gardien du potentiel athlétique absolu.",
      t3: "Le mouvement est fluide, intentionnel et infini. Alignez la respiration, alignez le corps, repoussez les limites."
    },
    tn: {
      t1: "نتمرنو باش نعيشو، نتحركو، وننتصرو. القوة ما تسوى شيء بلاش عقل صحيح يخدم باها.",
      t2: "النظام هو الساس متع القوة. التكنيك الصحيح هو اللي يحل بواب الكبس والربح الكبار.",
      t3: "الحركة انسيابية، مقصودة، وما توفاش. ريكل النفس، ريكل البدن، واكبس للي مباعد."
    }
  };

  const fallbackTrainers = [
    {
      _id: "t1",
      name: "Coach Mohamed",
      role: "Boxing & Combat Specialist",
      handle: "@gymmeliora",
      image: "/coach-photo.jpg",
      specialties: ["Cuban Boxe", "Combat Conditioning", "Power"],
      number: "01"
    },
    {
      _id: "t2",
      name: "Coach Haroun",
      role: "Strength & Hypertrophy",
      handle: "@gymmeliora",
      image: "/coach-photo.jpg",
      specialties: ["Hypertrophy", "Olympic Lifting", "Stretching"],
      number: "02"
    },
    {
      _id: "t3",
      name: "Dr. Badr",
      role: "Mobility & Private Yoga",
      handle: "@gymmeliora",
      image: "/coach-photo.jpg",
      specialties: ["Mobility", "Yoga (Private)", "Recovery"],
      number: "03"
    }
  ];

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/trainers");
        if (response.ok) {
          const data = await response.json();
          setTrainers(data);
          setActiveTrainer(data[0]);
        } else {
          throw new Error("Failed to load backend trainers");
        }
      } catch (err) {
        console.warn("Backend trainers API unreachable. Falling back to local data.", err);
        setTrainers(fallbackTrainers);
        setActiveTrainer(fallbackTrainers[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "8rem 0", textAlign: "center", backgroundColor: "#0b0b0b" }}>
        <p style={{ color: "var(--accent-gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Loading Vanguard profiles...</p>
      </div>
    );
  }

  const isRtl = lang === "tn";
  // Get active philosophy based on current language and active trainer's number
  const getPhilosophy = (trainer) => {
    const defaultText = t.defaultPhilosophy;
    if (!trainer) return defaultText;
    const key = trainer.number === "01" ? "t1" : trainer.number === "02" ? "t2" : "t3";
    return philosophies[lang]?.[key] || defaultText;
  };

  return (
    <section id="trainers" className="section-padding" style={{ backgroundColor: "#0b0b0b", paddingTop: "2rem" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: "5rem" }} className="reveal-up">
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
            {t.title}
          </h2>
        </div>

        {/* Dynamic Interactive Splitscreen */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "center"
          }}
          className="splitscreen-grid"
        >
          {/* Left Side: Dynamic Display Card */}
          {activeTrainer && (
            <div
              className="glass-panel reveal-left delay-100"
              style={{
                position: "relative",
                height: "600px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "4rem 3rem",
                overflow: "hidden",
                border: "1px solid var(--accent-gold)",
                textAlign: isRtl ? "right" : "left"
              }}
            >
              {/* Dynamic Image background */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `linear-gradient(to bottom, rgba(8, 8, 8, 0.1) 0%, rgba(8, 8, 8, 0.95) 85%), url('${activeTrainer.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 1,
                  transition: "background-image 0.5s ease"
                }}
              />

              {/* Number overlay */}
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: isRtl ? "auto" : "40px",
                  left: isRtl ? "40px" : "auto",
                  fontFamily: "var(--font-header)",
                  fontSize: "8rem",
                  fontWeight: 800,
                  color: "rgba(197, 168, 128, 0.08)",
                  zIndex: 2,
                  lineHeight: "1"
                }}
              >
                {activeTrainer.number}
              </span>

              {/* Info Overlay */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.5rem"
                  }}
                >
                  {activeTrainer.role}
                </span>
                <h3
                  style={{
                    fontSize: "2.5rem",
                    color: "#ffffff",
                    marginBottom: "1rem",
                    textTransform: "uppercase"
                  }}
                >
                  {activeTrainer.name}
                </h3>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                    maxWidth: "500px",
                    borderLeft: isRtl ? "none" : "2px solid var(--accent-gold)",
                    borderRight: isRtl ? "2px solid var(--accent-gold)" : "none",
                    paddingLeft: isRtl ? "0" : "1.25rem",
                    paddingRight: isRtl ? "1.25rem" : "0"
                  }}
                >
                  &ldquo;{getPhilosophy(activeTrainer)}&rdquo;
                </p>

                {/* Specialties & social */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem", justifyContent: isRtl ? "flex-start" : "flex-start", flexDirection: isRtl ? "row-reverse" : "row" }}>
                  {activeTrainer.specialties.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        color: "var(--text-secondary)",
                        padding: "0.4rem 1rem",
                        border: "1px solid rgba(255,255,255,0.08)",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://instagram.com/${activeTrainer.handle.substring(1)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    flexDirection: isRtl ? "row-reverse" : "row"
                  }}
                >
                  {activeTrainer.handle}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Right Side: Interactive List Toggles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="reveal-right delay-200">
            {trainers.map((t) => {
              const isSelected = activeTrainer?._id === t._id;
              return (
                <button
                  key={t._id}
                  onClick={() => setActiveTrainer(t)}
                  className="coach-tab-btn"
                  style={{
                    background: isSelected ? "rgba(197, 168, 128, 0.05)" : "transparent",
                    border: "none",
                    borderLeft: isRtl ? "none" : (isSelected ? "4px solid var(--accent-gold)" : "4px solid rgba(255,255,255,0.1)"),
                    borderRight: isRtl ? (isSelected ? "4px solid var(--accent-gold)" : "4px solid rgba(255,255,255,0.1)") : "none",
                    padding: "2rem 2.5rem",
                    cursor: "pointer",
                    textAlign: isRtl ? "right" : "left",
                    transition: "var(--transition-fast)"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      if (isRtl) e.currentTarget.style.borderRight = "4px solid rgba(197, 168, 128, 0.5)";
                      else e.currentTarget.style.borderLeft = "4px solid rgba(197, 168, 128, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      if (isRtl) e.currentTarget.style.borderRight = "4px solid rgba(255,255,255,0.1)";
                      else e.currentTarget.style.borderLeft = "4px solid rgba(255,255,255,0.1)";
                    }
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: isSelected ? "var(--accent-gold)" : "var(--text-muted)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem"
                    }}
                  >
                    {t.coachLabel} {t.number}
                  </span>
                  <h4
                    style={{
                      fontSize: "1.75rem",
                      color: isSelected ? "#ffffff" : "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      transition: "var(--transition-fast)"
                    }}
                  >
                    {t.name}
                  </h4>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: isSelected ? "var(--text-secondary)" : "rgba(255,255,255,0.2)",
                      fontFamily: "var(--font-body)",
                      display: "block",
                      marginTop: "0.25rem"
                    }}
                  >
                    {t.role}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* STYLING HOVERS */}
      <style jsx global>{`
        @media (max-width: 991px) {
          .splitscreen-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .splitscreen-grid .glass-panel {
            height: 480px !important;
            padding: 2.5rem 1.75rem !important;
          }
        }
        @media (max-width: 640px) {
          .splitscreen-grid .glass-panel {
            height: clamp(380px, 50vh, 440px) !important;
            padding: 1.75rem 1.25rem !important;
          }
          .coach-tab-btn {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
