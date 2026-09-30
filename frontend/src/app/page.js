"use client";
import React, { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Facilities from "@/components/Facilities";
import Memberships from "@/components/Memberships";
import Vanguard from "@/components/Vanguard";
import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BrandMarquee from "@/components/BrandMarquee";
import Faq from "@/components/Faq";
import ThreeBackgroundCanvas from "@/components/ThreeBackgroundCanvas";
import ThreeEquipmentShowcase from "@/components/ThreeEquipmentShowcase";
import Gsap3dController from "@/components/Gsap3dController";
import ClassSchedule from "@/components/ClassSchedule";
import { translations } from "@/translations";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [videoOpen, setVideoOpen] = useState(false);
  const t = translations[lang];

  // Interactive Custom Liquid Cursor
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(max-width: 1023px)").matches) return;

    const cursorDot = document.createElement("div");
    const cursorRing = document.createElement("div");
    
    cursorDot.id = "custom-cursor-dot";
    cursorRing.id = "custom-cursor-ring";
    
    cursorDot.className = "custom-cursor-dot";
    cursorRing.className = "custom-cursor-ring";
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    
    const onMouseMove = (e) => {
      cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursorRing.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    
    const onMouseEnterActive = () => {
      cursorRing.classList.add("cursor-hover");
      cursorDot.classList.add("cursor-hover");
    };
    const onMouseLeaveActive = () => {
      cursorRing.classList.remove("cursor-hover");
      cursorDot.classList.remove("cursor-hover");
    };
    
    window.addEventListener("mousemove", onMouseMove);
    
    const hookInteractions = () => {
      const elements = document.querySelectorAll("a, button, select, input, .facility-card, .price-card, .gallery-item, option");
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterActive);
        el.removeEventListener("mouseleave", onMouseLeaveActive);
        el.addEventListener("mouseenter", onMouseEnterActive);
        el.addEventListener("mouseleave", onMouseLeaveActive);
      });
    };
    
    hookInteractions();
    const interval = setInterval(hookInteractions, 1500);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(interval);
      if (document.body.contains(cursorDot)) document.body.removeChild(cursorDot);
      if (document.body.contains(cursorRing)) document.body.removeChild(cursorRing);
    };
  }, []);

  // Dynamic LTR/RTL and Language binding to document element
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    
    // Smooth transition styling for absolute elements on RTL changes
    document.body.style.transition = "direction 0.5s ease";
    document.body.style.direction = t.dir;
  }, [lang, t.dir]);
  // Intersection Observer for scroll-driven reveals, delayed to align perfectly with cinematic preloader fade-out
  useEffect(() => {
    let observer;
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('[class*="reveal-"]');
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      revealElements.forEach((el) => observer.observe(el));
    }, 2800);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  const testimonials = [
    {
      quote: "Meliora rewired how I think about training. The room itself demands you show up better.",
      author: "Sofia C.",
      title: "Founder, Aero Studio"
    },
    {
      quote: "I've trained in 30 cities. Nothing comes close to the equipment curation and coaching here.",
      author: "Marcus L.",
      title: "Former pro athlete"
    },
    {
      quote: "The recovery suite alone is worth it. I leave more rested than I arrive.",
      author: "Priya M.",
      title: "Surgeon"
    },
    {
      quote: "It's the first gym that actually feels like an investment, not a chore.",
      author: "Daniel R.",
      title: "Investor"
    }
  ];

  return (
    <>
      <Preloader />
      {/* 3D Global Ambient Particle Background */}
      <ThreeBackgroundCanvas />
      {/* GSAP 3D Interactive Card Tilts & Physics */}
      <Gsap3dController />

      <Navbar lang={lang} setLang={setLang} t={t.navbar} />
      
      <main style={{ textAlign: lang === "tn" ? "right" : "left" }}>
        {/* HERO SECTION */}
        <Hero t={t.hero} onWatchFilm={() => setVideoOpen(true)} />

        {/* MANIFESTO SECTION */}
        <Manifesto t={t.manifesto} />

        {/* CURATED EQUIPMENT BRAND SCROLLING MARQUEE */}
        <BrandMarquee />

        {/* 3D INTERACTIVE EQUIPMENT SHOWCASE */}
        <ThreeEquipmentShowcase lang={lang} />

        {/* FACILITIES / ZONES SECTION */}
        <Facilities t={t.facilities} />

        {/* MEMBERSHIPS / TIERS SECTION */}
        <Memberships t={t.memberships} />

        {/* VANGUARD / TRAINERS SECTION */}
        <Vanguard t={t.vanguard} lang={lang} />

        {/* PLANNING DES COURS / CLASS SCHEDULE SECTION */}
        <ClassSchedule lang={lang} />

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="section-padding" style={{ backgroundColor: "#080808" }}>
          <div className="container">
            {/* Header */}
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
                {t.testimonials.subtitle}
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.1" }}>
                {t.testimonials.title}
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem"
              }}
            >
              {t.testimonials.items.map((test, index) => (
                <div
                  key={test.author}
                  className={`glass-panel reveal-scale delay-${(index + 1) * 100}`}
                  style={{
                    padding: "3rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "300px",
                    border: "1px solid var(--glass-border)",
                    position: "relative",
                    textAlign: lang === "tn" ? "right" : "left"
                  }}
                >
                  {/* Quote icon overlay */}
                  <span
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: lang === "tn" ? "auto" : "30px",
                      right: lang === "tn" ? "30px" : "auto",
                      fontSize: "6rem",
                      fontFamily: "var(--font-header)",
                      fontWeight: 900,
                      color: "rgba(197, 168, 128, 0.04)",
                      pointerEvents: "none",
                      lineHeight: "1"
                    }}
                  >
                    “
                  </span>

                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "#ffffff",
                      lineHeight: "1.6",
                      marginBottom: "2rem",
                      position: "relative",
                      zIndex: 2
                    }}
                  >
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem" }}>
                    <h4 style={{ color: "var(--accent-gold)", fontSize: "1.1rem", textTransform: "none", fontWeight: 700 }}>
                      {test.author}
                    </h4>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        display: "block",
                        marginTop: "0.25rem"
                      }}
                    >
                      {test.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <Gallery t={t.gallery} lang={lang} />

        {/* FAQ ACCORDION SECTION */}
        <Faq t={t.faq} lang={lang} />

        {/* CONTACT / BOOK TOUR SECTION */}
        <ContactForm t={t.contact} lang={lang} />
      </main>

      <Footer t={t.footer} />

      {videoOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setVideoOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setVideoOpen(false)}
            style={{
              position: "absolute",
              top: "40px",
              right: lang === "tn" ? "auto" : "40px",
              left: lang === "tn" ? "40px" : "auto",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              zIndex: 100000
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Video Player Wrapper */}
          <div
            style={{
              width: "min(1000px, 90%)",
              position: "relative",
              border: "1px solid var(--accent-gold)",
              boxShadow: "0 25px 80px rgba(197, 168, 128, 0.25)",
              backgroundColor: "#000000"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-battle-ropes-in-gym-23114-large.mp4"
              controls
              autoPlay
              style={{
                width: "100%",
                display: "block",
                maxHeight: "80vh"
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
