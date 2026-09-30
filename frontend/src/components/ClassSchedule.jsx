"use client";
import React, { useState } from "react";

export default function ClassSchedule({ lang = "fr" }) {
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [activeFilter, setActiveFilter] = useState("ALL");

  const scheduleData = [
    {
      dayId: "MON",
      dayName: { fr: "MON", en: "MON", tn: "الاثنين" },
      dayFull: { fr: "Lundi", en: "Monday", tn: "الاثنين" },
      classes: [
        {
          id: "m1",
          name: "YOGA",
          type: "yoga",
          sub: "(PRIVATE)",
          time: "5:45 PM",
          coach: "AVEC DR. BADR",
        },
        {
          id: "m2",
          name: "AFRO-DANCE",
          type: "dance",
          sub: "",
          time: "7:00 PM",
          coach: "AVEC COACH AMINA",
        },
        {
          id: "m3",
          name: "STRETCHING",
          type: "mobility",
          sub: "",
          time: "8:00 PM",
          coach: "AVEC COACH HAROUN",
        },
      ],
      emptySlots: 1,
    },
    {
      dayId: "TUES",
      dayName: { fr: "TUES", en: "TUES", tn: "الثلاثاء" },
      dayFull: { fr: "Mardi", en: "Tuesday", tn: "الثلاثاء" },
      classes: [
        {
          id: "t1",
          name: "YOGA",
          type: "yoga",
          sub: "(PRIVATE)",
          time: "5:45 PM",
          coach: "AVEC DR. BADR",
        },
        {
          id: "t2",
          name: "FLOOR PILATE",
          type: "core",
          sub: "",
          time: "7:00 PM",
          coach: "AVEC COACH HADIA",
        },
        {
          id: "t3",
          name: "C.A.F",
          type: "core",
          sub: "",
          time: "8:00 PM",
          coach: "AVEC COACH ISSRA",
        },
      ],
      emptySlots: 1,
    },
    {
      dayId: "WED",
      dayName: { fr: "WED", en: "WED", tn: "الأربعاء" },
      dayFull: { fr: "Mercredi", en: "Wednesday", tn: "الأربعاء" },
      classes: [
        { isSlotEmpty: true, id: "w-empty-1" },
        {
          id: "w1",
          name: "C.A.F",
          type: "core",
          sub: "",
          time: "6:30 PM",
          coach: "AVEC COACH ISSRA",
        },
        {
          id: "w2",
          name: "AERO-DANCE",
          type: "dance",
          sub: "",
          time: "7:00 PM",
          coach: "AVEC COACH HADIA",
        },
      ],
      emptySlots: 1,
    },
    {
      dayId: "THUR",
      dayName: { fr: "THUR", en: "THUR", tn: "الخميس" },
      dayFull: { fr: "Jeudi", en: "Thursday", tn: "الخميس" },
      classes: [
        {
          id: "th1",
          name: "CUBAN BOXE",
          type: "combat",
          sub: "",
          time: "6:00 PM",
          coach: "AVEC COACH MOHAMED",
        },
        {
          id: "th2",
          name: "FLOOR PILATE",
          type: "core",
          sub: "",
          time: "7:00 PM",
          coach: "AVEC COACH HADIA",
        },
        {
          id: "th3",
          name: "STRETCHING",
          type: "mobility",
          sub: "",
          time: "8:00 PM",
          coach: "AVEC COACH HAROUN",
        },
      ],
      emptySlots: 1,
    },
    {
      dayId: "FRI",
      dayName: { fr: "FRI", en: "FRI", tn: "الجمعة" },
      dayFull: { fr: "Vendredi", en: "Friday", tn: "الجمعة" },
      classes: [
        {
          id: "f1",
          name: "MOBILITY",
          type: "mobility",
          sub: "",
          time: "5:30 PM",
          coach: "AVEC COACH ZIED",
        },
        {
          id: "f2",
          name: "ORIENTAL DANCE",
          type: "dance",
          sub: "",
          time: "6:30 PM",
          coach: "AVEC COACH IMEN",
        },
        {
          id: "f3",
          name: "YOGA",
          type: "yoga",
          sub: "(PRIVATE)",
          time: "7:30 PM",
          coach: "AVEC DR. BADR",
        },
        {
          id: "f4",
          name: "ORIENTAL DANCE",
          type: "dance",
          sub: "",
          time: "8:45 PM",
          coach: "AVEC COACH IMEN",
        },
      ],
      emptySlots: 0,
    },
    {
      dayId: "SAT",
      dayName: { fr: "SAT", en: "SAT", tn: "السبت" },
      dayFull: { fr: "Samedi", en: "Saturday", tn: "السبت" },
      classes: [
        { isSlotEmpty: true, id: "sa-empty-1" },
        {
          id: "sa1",
          name: "CUBAN BOXE",
          type: "combat",
          sub: "",
          time: "6:00 PM",
          coach: "AVEC COACH MOHAMED",
        },
      ],
      emptySlots: 2,
    },
    {
      dayId: "SUN",
      dayName: { fr: "SUN", en: "SUN", tn: "الأحد" },
      dayFull: { fr: "Dimanche", en: "Sunday", tn: "الأحد" },
      classes: [
        { isSlotEmpty: true, id: "su-empty-1" },
        {
          id: "su1",
          name: "CUBAN BOXE",
          type: "combat",
          sub: "",
          time: "6:00 PM",
          coach: "AVEC COACH MOHAMED",
        },
      ],
      emptySlots: 2,
    },
  ];

  const filterOptions = [
    { id: "ALL", label: { fr: "Tous les cours", en: "All Classes", tn: "كل الحصص" } },
    { id: "combat", label: { fr: "Boxe Cubaine", en: "Cuban Boxing", tn: "ملاكمة كوبية" } },
    { id: "dance", label: { fr: "Danse (Afro/Aero/Oriental)", en: "Dance", tn: "رقص" } },
    { id: "yoga", label: { fr: "Yoga Privé", en: "Private Yoga", tn: "يوغا خاصة" } },
    { id: "core", label: { fr: "Pilates & C.A.F", en: "Pilates & C.A.F", tn: "بيلاتس و C.A.F" } },
    { id: "mobility", label: { fr: "Mobilité & Stretch", en: "Mobility & Stretch", tn: "تمديد وحركية" } },
  ];

  const isRtl = lang === "tn";

  return (
    <section
      id="schedule"
      className="section-padding"
      style={{
        backgroundColor: "#050505",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(230, 40, 40, 0.04) 0%, rgba(197, 168, 128, 0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Reservation Notice */}
        <div
          style={{
            textAlign: isRtl ? "right" : "left",
            marginBottom: "1.5rem",
          }}
          className="reveal-up"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255, 255, 255, 0.6)",
              textTransform: "uppercase",
              display: "inline-block",
              maxWidth: "600px",
              lineHeight: "1.4",
            }}
          >
            {lang === "fr"
              ? "LA RÉSERVATION DES COURS SE FAIT PAR MESSAGE INSTAGRAM OU À LA RÉCEPTION"
              : lang === "tn"
              ? "الحجز للحصص يتم عبر رسالة إنستغرام أو عند الاستقبال مباشرة"
              : "CLASS RESERVATIONS ARE MADE VIA INSTAGRAM DM OR DIRECTLY AT RECEPTION"}
          </span>
        </div>

        {/* Main Header with Logo & Action Button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "1.5rem",
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
          className="reveal-up delay-100"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "var(--font-header)",
                fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: 0,
                lineHeight: "1",
              }}
            >
              PLANNING DES COURS
            </h2>

            <div
              style={{
                height: "36px",
                width: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                display: "none",
              }}
              className="desktop-divider"
            />

            <a
              href="https://www.instagram.com/gymmeliora/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.6rem",
                borderRadius: "30px",
                backgroundColor: "#e62828",
                color: "#ffffff",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "var(--transition-fast)",
                boxShadow: "0 0 25px rgba(230, 40, 40, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ff3b3b";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e62828";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {lang === "fr" ? "RÉSERVER" : lang === "tn" ? "احجز الآن" : "RESERVE"}
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-header)",
                fontSize: "1.1rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              WEEK
            </span>

            {/* Meliora Shield God Logo Mark */}
            <div
              style={{
                width: "48px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.9,
              }}
            >
              <svg viewBox="0 0 100 120" width="46" height="54" fill="none">
                <path
                  d="M50 5 L90 25 L90 75 L50 115 L10 75 L10 25 Z"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  fill="rgba(255,255,255,0.03)"
                />
                <circle cx="50" cy="40" r="14" stroke="#ffffff" strokeWidth="3" />
                <path d="M42 58 L58 58 L66 85 L34 85 Z" stroke="#ffffff" strokeWidth="3" />
                <path d="M30 40 L20 28 L28 20 L38 32 Z" fill="#e62828" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "20px",
                border: activeFilter === opt.id ? "1px solid #e62828" : "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: activeFilter === opt.id ? "rgba(230, 40, 40, 0.15)" : "rgba(255, 255, 255, 0.03)",
                color: activeFilter === opt.id ? "#ffffff" : "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
            >
              {opt.label[lang] || opt.label.fr}
            </button>
          ))}
        </div>

        {/* Mobile Day Selector Tabs */}
        <div
          className="mobile-day-tabs"
          style={{
            display: "none",
            gap: "0.4rem",
            overflowX: "auto",
            paddingBottom: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {scheduleData.map((col) => (
            <button
              key={col.dayId}
              onClick={() => setSelectedDay(col.dayId)}
              style={{
                flex: "0 0 auto",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: selectedDay === col.dayId ? "1px solid #e62828" : "1px solid rgba(255,255,255,0.08)",
                backgroundColor: selectedDay === col.dayId ? "#e62828" : "rgba(18, 18, 18, 0.8)",
                color: "#ffffff",
                fontFamily: "var(--font-header)",
                fontSize: "0.85rem",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {col.dayName[lang] || col.dayName.fr}
            </button>
          ))}
          <button
            onClick={() => setSelectedDay("ALL")}
            style={{
              flex: "0 0 auto",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: selectedDay === "ALL" ? "1px solid var(--accent-gold)" : "1px solid rgba(255,255,255,0.08)",
              backgroundColor: selectedDay === "ALL" ? "rgba(197, 168, 128, 0.2)" : "rgba(18, 18, 18, 0.8)",
              color: selectedDay === "ALL" ? "var(--accent-gold)" : "#ffffff",
              fontFamily: "var(--font-header)",
              fontSize: "0.85rem",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {lang === "fr" ? "TOUS" : lang === "tn" ? "الكل" : "ALL"}
          </button>
        </div>

        {/* Schedule Table Grid */}
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "1.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(150px, 1fr))",
              gap: "0",
              minWidth: "1050px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "#080808",
            }}
          >
            {scheduleData.map((col) => {
              if (selectedDay !== "ALL" && selectedDay !== col.dayId) return null;

              return (
                <div
                  key={col.dayId}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                    backgroundColor: "#090909",
                  }}
                >
                  {/* Day Header */}
                  <div
                    style={{
                      padding: "1.2rem 0.5rem",
                      textAlign: "center",
                      borderBottom: "2px solid rgba(255, 255, 255, 0.15)",
                      backgroundColor: "#0d0d0d",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-header)",
                        fontSize: "1.45rem",
                        fontWeight: 900,
                        color: "#e62828",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        display: "block",
                      }}
                    >
                      {col.dayName.fr}
                    </span>
                  </div>

                  {/* Class Cells */}
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    {col.classes.map((cls, cIdx) => {
                      if (cls.isSlotEmpty) {
                        return <EmptyHatchSlot key={cls.id || cIdx} />;
                      }

                      const matchesFilter =
                        activeFilter === "ALL" || cls.type === activeFilter;

                      return (
                        <div
                          key={cls.id || cIdx}
                          className="schedule-class-cell"
                          style={{
                            padding: "1.6rem 0.9rem",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "155px",
                            opacity: matchesFilter ? 1 : 0.25,
                            transition: "var(--transition-fast)",
                            backgroundColor: matchesFilter
                              ? "rgba(255, 255, 255, 0.01)"
                              : "transparent",
                            position: "relative",
                          }}
                        >
                          {/* Class Name */}
                          <h4
                            style={{
                              fontFamily: "var(--font-header)",
                              fontSize: "1.15rem",
                              fontWeight: 900,
                              color: "#ffffff",
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                              lineHeight: "1.15",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {cls.name}
                          </h4>

                          {/* Subtitle (e.g. PRIVATE) */}
                          {cls.sub && (
                            <span
                              style={{
                                fontFamily: "var(--font-header)",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                color: "rgba(255, 255, 255, 0.65)",
                                letterSpacing: "0.05em",
                                display: "block",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {cls.sub}
                            </span>
                          )}

                          {/* Time */}
                          <div
                            style={{
                              fontFamily: "var(--font-header)",
                              fontSize: "1.1rem",
                              fontWeight: 900,
                              color: "#e62828",
                              marginTop: "0.75rem",
                              marginBottom: "0.35rem",
                              letterSpacing: "0.02em",
                              textShadow: "0 0 15px rgba(230, 40, 40, 0.3)",
                            }}
                          >
                            {cls.time}
                          </div>

                          {/* Coach */}
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.68rem",
                              fontWeight: 800,
                              color: "rgba(255, 255, 255, 0.85)",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {cls.coach}
                          </span>
                        </div>
                      );
                    })}

                    {/* Empty Striated Hatch Slots */}
                    {Array.from({ length: col.emptySlots }).map((_, eIdx) => (
                      <EmptyHatchSlot key={`empty-${col.dayId}-${eIdx}`} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Footer Contact Bar */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem 2rem",
            backgroundColor: "#080808",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
          className="reveal-up delay-200"
        >
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/gymmeliora/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "var(--font-header)",
              fontSize: "0.95rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "var(--transition-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e62828")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            GYMMELIORA
          </a>

          {/* Phone / WhatsApp */}
          <a
            href="https://wa.me/21698703405"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "var(--font-header)",
              fontSize: "1.1rem",
              fontWeight: 900,
              letterSpacing: "0.1em",
              transition: "var(--transition-fast)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            98 703 405
          </a>

          {/* Meliora Gym Logo */}
          <div
            style={{
              fontFamily: "var(--font-header)",
              fontSize: "1.2rem",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: "0.9",
            }}
          >
            MELIORA
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                color: "#e62828",
                fontWeight: 800,
                marginTop: "3px",
              }}
            >
              — GYM —
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-divider {
            display: none !important;
          }
          .mobile-day-tabs {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}

// Graphic Diagonal Hatch Slot Component replicating the exact poster visual
function EmptyHatchSlot() {
  return (
    <div
      style={{
        minHeight: "155px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#070707",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.85,
        }}
      >
        <line
          x1="-20"
          y1="100%"
          x2="100%"
          y2="-20"
          stroke="#ffffff"
          strokeWidth="3.5"
        />
        <line
          x1="0"
          y1="120%"
          x2="120%"
          y2="0"
          stroke="#ffffff"
          strokeWidth="3.5"
        />
        <line
          x1="-40"
          y1="80%"
          x2="80%"
          y2="-40"
          stroke="#ffffff"
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
}
