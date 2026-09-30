"use client";
import React, { useState } from "react";

export default function Faq({ t, lang }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isRtl = lang === "tn";

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: "#080808", position: "relative" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "5rem",
            flexDirection: isRtl ? "row-reverse" : "row"
          }}
          className="faq-grid"
        >
          {/* Left Column: Title Block */}
          <div
            className="reveal-left"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: isRtl ? "right" : "left"
            }}
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
                lineHeight: "1.1",
                marginBottom: "2rem"
              }}
            >
              {t.title}
            </h2>
            <div
              style={{
                width: "60px",
                height: "2px",
                backgroundColor: "var(--accent-gold)",
                alignSelf: isRtl ? "flex-end" : "flex-start",
                marginBottom: "2.5rem"
              }}
            />
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6" }}>
              {isRtl
                ? "عندك أي استفسارات أخرى قبل ما تدخل للفورجة متاعنا ؟ اتصل بالكونسيرج ديما حاضرين للخدمة."
                : "Have other details you wish to discuss? Our concierge is always available to curate your onboarding experience."}
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div
            className="reveal-right delay-100"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            {t.items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="glass-panel"
                  style={{
                    border: isOpen ? "1px solid var(--accent-gold)" : "1px solid var(--glass-border)",
                    backgroundColor: isOpen ? "rgba(18, 18, 18, 0.8)" : "var(--glass-bg)",
                    transition: "var(--transition-smooth)",
                    overflow: "hidden"
                  }}
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: "100%",
                      padding: "clamp(1.25rem, 3.5vw, 2rem) clamp(1.2rem, 4vw, 2.5rem)",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: isRtl ? "right" : "left",
                      flexDirection: isRtl ? "row-reverse" : "row"
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "clamp(0.95rem, 3.5vw, 1.15rem)",
                        fontWeight: 700,
                        color: isOpen ? "var(--accent-gold)" : "#ffffff",
                        transition: "color 0.3s ease"
                      }}
                    >
                      {item.q}
                    </span>

                    {/* Expand/Collapse Plus Sign */}
                    <span
                      style={{
                        color: isOpen ? "var(--accent-gold)" : "var(--text-secondary)",
                        transition: "transform 0.4s ease",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        fontSize: "1.5rem",
                        lineHeight: "1",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: isRtl ? "0" : "1.5rem",
                        marginRight: isRtl ? "1.5rem" : "0"
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Accordion Body panel */}
                  <div
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.4s ease, opacity 0.4s ease",
                      borderTop: isOpen ? "1px solid rgba(255,255,255,0.03)" : "1px solid transparent"
                    }}
                  >
                    <p
                      style={{
                        padding: "clamp(1.25rem, 3.5vw, 2rem) clamp(1.2rem, 4vw, 2.5rem)",
                        color: "var(--text-secondary)",
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        textAlign: isRtl ? "right" : "left"
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 991px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
