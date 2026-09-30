"use client";
import React, { useState } from "react";

export default function Gallery({ t, lang }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const images = [
    {
      title: "Iron",
      src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800",
      largeSrc: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1600",
      subtitle: "Eleiko Olympic Setup"
    },
    {
      title: "Velocity",
      src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800",
      largeSrc: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1600",
      subtitle: "High Intensity Turf"
    },
    {
      title: "Power",
      src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800",
      largeSrc: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600",
      subtitle: "Strength Platforms"
    },
    {
      title: "Combat",
      src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800",
      largeSrc: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600",
      subtitle: "Cinematic Boxing Room"
    }
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const isRtl = lang === "tn";

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "5rem",
            flexWrap: "wrap",
            gap: "2rem",
            flexDirection: isRtl ? "row-reverse" : "row"
          }}
          className="reveal-up"
        >
          <div style={{ textAlign: isRtl ? "right" : "left" }}>
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
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.1" }}>
              {isRtl ? "في قلب الصالة." : "Inside the room."}
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary reveal-up delay-100"
            style={{ padding: "0.75rem 2rem", fontSize: "0.8rem" }}
          >
            {t.follow}
          </a>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {images.map((img, index) => (
            <div
              key={img.title}
              onClick={() => setLightboxIndex(index)}
              style={{
                position: "relative",
                height: "350px",
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}
              className={`gallery-item reveal-scale delay-${(index + 1) * 100}`}
            >
              {/* Photo */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url('${img.src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                className="gallery-img"
              />

              {/* Hover Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(8, 8, 8, 0.8)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "var(--transition-smooth)",
                  zIndex: 2,
                  padding: "2rem",
                  textAlign: "center"
                }}
                className="gallery-overlay"
              >
                <h4 style={{ color: "#ffffff", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  {isRtl ? (img.title === "Iron" ? "حديد" : img.title === "Velocity" ? "سرعة" : img.title === "Power" ? "قوة" : "قتال") : img.title}
                </h4>
                <p style={{ color: "var(--accent-gold)", fontSize: "0.85rem", fontWeight: 600 }}>
                  {isRtl ? (img.title === "Iron" ? "بلاتفورم إليكو" : img.title === "Velocity" ? "منطقة الكارديو" : img.title === "Power" ? "منطقة الأوزان" : "الحلبة والقتال") : img.subtitle}
                </p>
                <span
                  style={{
                    marginTop: "2rem",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid var(--accent-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold)"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            cursor: "zoom-out",
            animation: "fade-in 0.3s ease"
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "absolute",
              top: "40px",
              right: isRtl ? "auto" : "40px",
              left: isRtl ? "40px" : "auto",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              padding: "0.5rem"
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Prev Button */}
          <button
            onClick={isRtl ? handleNext : handlePrev}
            className="lightbox-nav-btn lightbox-prev"
            style={{
              position: "absolute",
              left: "40px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              cursor: "pointer",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Large Image */}
          <div
            className="lightbox-content"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "default"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].largeSrc}
              alt={images[lightboxIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            />
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.75rem", marginBottom: "0.25rem" }}>
                {isRtl ? (images[lightboxIndex].title === "Iron" ? "حديد" : images[lightboxIndex].title === "Velocity" ? "سرعة" : images[lightboxIndex].title === "Power" ? "قوة" : "قتال") : images[lightboxIndex].title}
              </h3>
              <p style={{ color: "var(--accent-gold)", fontSize: "0.9rem" }}>
                {isRtl ? (images[lightboxIndex].title === "Iron" ? "بلاتفورم إليكو" : images[lightboxIndex].title === "Velocity" ? "منطقة الكارديو" : images[lightboxIndex].title === "Power" ? "منطقة الأوزان" : "الحلبة والقتال") : images[lightboxIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={isRtl ? handlePrev : handleNext}
            className="lightbox-nav-btn lightbox-next"
            style={{
              position: "absolute",
              right: "40px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              cursor: "pointer",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* HOVER HOOKS */}
      <style jsx>{`
        .gallery-item:hover .gallery-img {
          transform: scale(1.06);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .gallery-item {
            height: 280px !important;
          }
          .gallery-overlay {
            opacity: 1 !important;
            background: linear-gradient(to top, rgba(8, 8, 8, 0.95) 0%, rgba(8, 8, 8, 0.5) 40%, transparent 100%) !important;
            justify-content: flex-end !important;
            padding: 1.5rem 1rem !important;
          }
          .gallery-overlay span {
            display: none !important;
          }
          .lightbox-nav-btn {
            width: 44px !important;
            height: 44px !important;
          }
          .lightbox-prev {
            left: 12px !important;
          }
          .lightbox-next {
            right: 12px !important;
          }
          .lightbox-content {
            max-width: 92% !important;
          }
        }
      `}</style>
    </section>
  );
}
