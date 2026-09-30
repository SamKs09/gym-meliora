"use client";
import React, { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Shorter duration on mobile for instant snappy UX
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const fadeDelay = isMobile ? 1100 : 2200;
    const destroyDelay = isMobile ? 1600 : 2800;

    const loadTimer = setTimeout(() => {
      setFadeOut(true);
    }, fadeDelay);

    const destroyTimer = setTimeout(() => {
      setLoading(false);
    }, destroyDelay);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(destroyTimer);
    };
  }, []);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => setLoading(false), 400);
  };

  if (!loading) return null;

  return (
    <div
      className="preloader-container"
      onClick={handleDismiss}
      style={{
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(1.05)" : "scale(1)",
        pointerEvents: fadeOut ? "none" : "all",
        cursor: "pointer",
      }}
    >
      {/* Grid Lines */}
      <div className="preloader-grid" />

      {/* Radial Vignette Overlay */}
      <div className="preloader-vignette" />

      {/* Main Core Content Wrapper */}
      <div className="preloader-content">
        
        {/* Emblem Wrapper */}
        <div className="preloader-logo-wrapper">
          {/* Golden Rotating Laser Ring */}
          <div className="preloader-laser" />

          {/* Golden Ambient Pulsing Glow */}
          <div className="preloader-pulse" />

          {/* 3D Coin-Rotating Emblem */}
          <div className="preloader-coin">
            {/* Shimmer metallic light layer */}
            <div className="preloader-shimmer" />

            {/* Logo Image */}
            <img
              src="/logo.png"
              alt="Meliora Gym Logo"
              className="preloader-img"
            />
          </div>
        </div>

        {/* Loading text and linear track indicator */}
        <div className="preloader-text-container">
          <h2 className="preloader-text">
            MELIORA
          </h2>
          
          {/* Progress Track */}
          <div className="preloader-track">
            {/* Sliding progress bar */}
            <div className="preloader-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
