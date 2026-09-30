import React from "react";

export default function Memberships({ t }) {
  const tiers = [
    {
      name: t.tiersData.initiate.name,
      subtitle: t.tiersData.initiate.sub,
      price: t.tiersData.initiate.price,
      features: t.tiersData.initiate.features || [],
      popular: false,
      btnText: t.tiersData.initiate.btn
    },
    {
      name: t.tiersData.elite.name,
      subtitle: t.tiersData.elite.sub,
      price: t.tiersData.elite.price,
      features: t.tiersData.elite.features || [],
      popular: true,
      btnText: t.tiersData.elite.btn
    },
    {
      name: t.tiersData.black.name,
      subtitle: t.tiersData.black.sub,
      price: t.tiersData.black.price,
      features: t.tiersData.black.features || [],
      popular: false,
      btnText: t.tiersData.black.btn
    }
  ];

  return (
    <section id="memberships" className="section-padding" style={{ backgroundColor: "#080808", paddingBottom: "2rem" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 5rem)" }} className="reveal-up">
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
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            {t.description}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            alignItems: "stretch"
          }}
        >
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`glass-panel price-card reveal-scale delay-${(i + 1) * 100}`}
              style={{
                position: "relative",
                padding: "clamp(2.5rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
                border: tier.popular ? "1px solid var(--accent-gold)" : "1px solid var(--glass-border)",
                backgroundColor: tier.popular ? "rgba(18, 18, 18, 0.85)" : "var(--glass-bg)",
                boxShadow: tier.popular ? "0 15px 50px rgba(197, 168, 128, 0.1)" : "none",
                transform: tier.popular ? "scale(1.03)" : "scale(1)"
              }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <span
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "var(--accent-gold)",
                    color: "#000000",
                    fontFamily: "var(--font-body)",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "0",
                    display: "inline-block"
                  }}
                >
                  {t.mostChosen}
                </span>
              )}

              {/* Tier Name */}
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#ffffff",
                  marginBottom: "0.25rem",
                  letterSpacing: "0.02em"
                }}
              >
                {tier.name}
              </h3>

              {/* Subtitle */}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: tier.popular ? "var(--accent-gold)" : "var(--text-muted)",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "2rem"
                }}
              >
                {tier.subtitle}
              </span>

              {/* Price */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: "2.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  paddingBottom: "1.5rem"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-header)",
                    fontSize: "3.5rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: "1"
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    fontWeight: 500
                  }}
                >
                  {t.perMonth}
                </span>
              </div>

              {/* Features List */}
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "3.5rem",
                  flexGrow: 1
                }}
              >
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)"
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={tier.popular ? "var(--accent-gold)" : "rgba(255,255,255,0.3)"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <a
                href="#contact"
                className={tier.popular ? "btn-primary" : "btn-secondary"}
                style={{ width: "100%", textAlign: "center" }}
              >
                {tier.btnText}
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .price-card {
            transform: scale(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
