"use client";
import React, { useEffect, useRef } from "react";

export default function HeroScrollVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isUserScrolling = false;
    let scrollTimeout = null;

    // Ensure video plays at top
    const startPlayback = () => {
      if (video.paused && window.scrollY < 25) {
        video.play().catch(() => {});
      }
    };

    const handleLoadedMetadata = () => {
      startPlayback();
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Mobile touch unlock
    const handleFirstInteraction = () => {
      startPlayback();
    };
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("click", handleFirstInteraction, { passive: true, once: true });

    // Track scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = container.clientHeight || window.innerHeight;
      const progress = Math.min(Math.max(scrollY / (heroHeight * 1.1), 0), 1);

      // 3D Scale and Depth translation on container
      const scale = 1 + progress * 0.18;
      const translateY = scrollY * 0.32; // Parallax
      const opacity = Math.max(0.2, 1 - progress * 0.7);

      video.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      video.style.opacity = `${opacity}`;

      if (scrollY >= 20) {
        isUserScrolling = true;
        if (!video.paused) {
          video.pause();
        }
        if (video.duration) {
          targetTime = progress * video.duration;
        }
      } else {
        // At the very top, resume natural ambient playback
        if (isUserScrolling) {
          isUserScrolling = false;
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (window.scrollY < 20 && video.paused) {
              video.play().catch(() => {});
            }
          }, 150);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Smooth lerp loop for video time scrubbing when scrolling
    const updateVideoScrub = () => {
      animationFrameId = requestAnimationFrame(updateVideoScrub);

      if (isUserScrolling && video.duration && Math.abs(targetTime - currentTime) > 0.04) {
        currentTime += (targetTime - currentTime) * 0.15;
        if (!isSeeking && isFinite(currentTime) && video.readyState >= 2) {
          isSeeking = true;
          video.currentTime = currentTime;
          setTimeout(() => {
            isSeeking = false;
          }, 35);
        }
      } else if (!isUserScrolling && !video.paused) {
        currentTime = video.currentTime;
      }
    };

    updateVideoScrub();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        backgroundColor: "#080808",
      }}
      aria-hidden="true"
    >
      {/* Background Cinematic Video with Scroll Scrub Effect */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 40%",
          opacity: 0.85,
          transition: "transform 0.08s ease-out, opacity 0.15s ease-out",
          willChange: "transform, opacity",
          filter: "brightness(0.75) contrast(1.15)",
        }}
      >
        <source src="/Scroll%20Video.mp4" type="video/mp4" />
        <source src="/scroll-video.mp4" type="video/mp4" />
      </video>

      {/* Radial Dark Vignette Overlay for Text Legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(8, 8, 8, 0.3) 0%, rgba(8, 8, 8, 0.75) 60%, rgba(8, 8, 8, 0.98) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom Gradient Fade to next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to top, #080808 0%, rgba(8, 8, 8, 0.8) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Gradient for Navbar Header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "140px",
          background: "linear-gradient(to bottom, rgba(8, 8, 8, 0.85) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
