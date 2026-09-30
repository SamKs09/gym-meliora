"use client";
import React, { useState, useEffect } from "react";

export default function Navbar({ lang, setLang, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRtl = lang === "tn";

  return (
    <>
      <header
        className="header-entrance"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4rem",
          zIndex: 99,
          transition: "var(--transition-smooth)",
          backgroundColor: scrolled ? "rgba(8, 8, 8, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(197, 168, 128, 0.1)" : "1px solid transparent",
          flexDirection: isRtl ? "row-reverse" : "row"
        }}
      >
        {/* LOGO */}
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-header)",
            fontSize: "1.6rem",
            fontWeight: 800,
            textDecoration: "none",
            color: "#ffffff",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
          }}
        >
          MELIORA
        </a>

        {/* DESKTOP NAV */}
        <nav
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
            flexDirection: isRtl ? "row-reverse" : "row"
          }}
          className="desktop-nav"
        >
          {[
            { label: t.manifesto, href: "#about" },
            { label: t.zones, href: "#facilities" },
            { label: t.tiers, href: "#memberships" },
            { label: t.vanguard, href: "#trainers" },
            { label: t.schedule || "Planning", href: "#schedule" },
            { label: t.gallery, href: "#gallery" },
            { label: t.contact, href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent-gold)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA BUTTON & LANGUAGE SELECTOR */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexDirection: isRtl ? "row-reverse" : "row" }}>
          {/* LANGUAGE SELECTOR */}
          <div
            style={{
              display: "flex",
              gap: "2px",
              background: "rgba(255,255,255,0.03)",
              padding: "2px",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0",
              flexDirection: isRtl ? "row-reverse" : "row"
            }}
          >
            {["en", "fr", "tn"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? "var(--accent-gold)" : "transparent",
                  color: lang === l ? "#000000" : "#ffffff",
                  border: "none",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "var(--transition-fast)",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#memberships"
            className="btn-secondary"
            style={{
              padding: "0.75rem 1.75rem",
              fontSize: "0.75rem",
            }}
          >
            {t.join}
          </a>

          {/* HAMBURGER BUTTON (MOBILE) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: "6px",
              padding: "0.5rem",
              zIndex: 101,
            }}
            className="hamburger-btn"
          >
            <span
              style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "var(--transition-fast)",
                transform: isOpen ? "rotate(45deg) translate(5px, 6px)" : "none",
              }}
            />
            <span
              style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "var(--transition-fast)",
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#ffffff",
                transition: "var(--transition-fast)",
                transform: isOpen ? "rotate(-45deg) translate(5px, -6px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(8, 8, 8, 0.98)",
          zIndex: 98,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          transition: "var(--transition-smooth)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        {[
          { label: t.manifesto, href: "#about" },
          { label: t.zones, href: "#facilities" },
          { label: t.tiers, href: "#memberships" },
          { label: t.vanguard, href: "#trainers" },
          { label: t.schedule || "Planning", href: "#schedule" },
          { label: t.gallery, href: "#gallery" },
          { label: t.contact, href: "#contact" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setIsOpen(false)}
            style={{
              fontFamily: "var(--font-header)",
              fontSize: "2rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#ffffff",
              textDecoration: "none",
              transition: "var(--transition-fast)",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--accent-gold)")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#memberships"
          onClick={() => setIsOpen(false)}
          className="btn-primary"
          style={{ marginTop: "2rem" }}
        >
          {t.join}
        </a>
      </div>

      {/* GLOBAL RESPONSIVE NAV STYLES */}
      <style jsx global>{`
        @media (max-width: 1040px) {
          header {
            padding: 0 2rem !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
          header .btn-secondary {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
