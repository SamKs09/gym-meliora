"use client";
import { useEffect } from "react";
import gsap from "gsap";

export default function Gsap3dController() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Initial 3D Entrance Animation for Hero
    const heroCtx = gsap.context(() => {
      const heroTitle = document.querySelector("#top h1");
      const heroSubtitle = document.querySelector("#top .reveal-up:first-child");
      const heroDesc = document.querySelector("#top p");
      const heroBtns = document.querySelector("#top .reveal-up:nth-of-type(4)");

      if (heroTitle) {
        gsap.set("#top h1, #top p, #top .btn-primary, #top .btn-secondary", {
          transformPerspective: 1000,
        });

        const tl = gsap.timeline({ delay: 0.4 });

        if (heroSubtitle) {
          tl.from(heroSubtitle, {
            opacity: 0,
            y: 30,
            rotateX: 30,
            duration: 1.0,
            ease: "power3.out",
          });
        }

        tl.from(
          heroTitle,
          {
            opacity: 0,
            y: 60,
            rotateX: 45,
            scale: 0.95,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.7"
        );

        if (heroDesc) {
          tl.from(
            heroDesc,
            {
              opacity: 0,
              y: 40,
              duration: 1.0,
              ease: "power3.out",
            },
            "-=0.8"
          );
        }

        if (heroBtns) {
          tl.from(
            "#top .btn-primary, #top .btn-secondary",
            {
              opacity: 0,
              y: 30,
              scale: 0.9,
              stagger: 0.15,
              duration: 0.8,
              ease: "back.out(1.5)",
            },
            "-=0.6"
          );
        }
      }
    });

    // 2. 3D Card Hover Tilt with GSAP
    const cards = document.querySelectorAll(
      ".glass-panel, .facility-card, .price-card, .gallery-item, .vanguard-card"
    );

    const tiltCleanups = [];

    cards.forEach((card) => {
      // Ensure 3D transform preserve
      card.style.transformStyle = "preserve-3d";
      card.style.willChange = "transform";

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (cardX - centerX) / centerX;
        const percentY = (cardY - centerY) / centerY;

        // Max tilt angles: ±8 deg
        const tiltX = -percentY * 8;
        const tiltY = percentX * 8;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          translateZ: 14,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      tiltCleanups.push(() => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    // 3. Magnetic Button Effect
    const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
    const magneticCleanups = [];

    buttons.forEach((btn) => {
      const onBtnMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.28,
          y: y * 0.28,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onBtnMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1.2, 0.4)",
          overwrite: "auto",
        });
      };

      btn.addEventListener("mousemove", onBtnMouseMove);
      btn.addEventListener("mouseleave", onBtnMouseLeave);

      magneticCleanups.push(() => {
        btn.removeEventListener("mousemove", onBtnMouseMove);
        btn.removeEventListener("mouseleave", onBtnMouseLeave);
      });
    });

    return () => {
      heroCtx.revert();
      tiltCleanups.forEach((fn) => fn());
      magneticCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
