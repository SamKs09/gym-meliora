"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x181818, 1.8);
    scene.add(ambientLight);

    // Dynamic warm gold mouse spotlight that highlights muscle contours
    const mouseSpotlight = new THREE.PointLight(0xe5c89f, 4.5, 14);
    mouseSpotlight.position.set(0, 1, 3.5);
    scene.add(mouseSpotlight);

    // Cool titanium rim light from upper left
    const coolRimLight = new THREE.DirectionalLight(0x7090b0, 2.2);
    coolRimLight.position.set(-6, 4, -2);
    scene.add(coolRimLight);

    // Warm key light from right
    const warmKeyLight = new THREE.DirectionalLight(0xc5a880, 2.0);
    warmKeyLight.position.set(6, -2, 2);
    scene.add(warmKeyLight);

    // 4. Hero Main 3D Group
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    // 5. Kinetic 3D Orbital Rings (Halo of Excellence)
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, 0, 0);
    heroGroup.add(haloGroup);

    // Gold Ring
    const halo1Geo = new THREE.TorusGeometry(3.0, 0.03, 16, 120);
    const halo1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });
    const halo1 = new THREE.Mesh(halo1Geo, halo1Mat);
    halo1.rotation.x = Math.PI / 4;
    haloGroup.add(halo1);

    // Outer Obsidian Ring
    const halo2Geo = new THREE.TorusGeometry(3.6, 0.02, 16, 120);
    const halo2Mat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.98,
      roughness: 0.1,
    });
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2.rotation.y = Math.PI / 3;
    haloGroup.add(halo2);

    // Tilted Equatorial Accent Ring
    const halo3Geo = new THREE.TorusGeometry(4.2, 0.018, 16, 120);
    const halo3 = new THREE.Mesh(halo3Geo, halo1Mat);
    halo3.rotation.x = -Math.PI / 4;
    halo3.rotation.z = Math.PI / 5;
    haloGroup.add(halo3);

    // 6. Depth Particles (Floating around the scene in 3D)
    const particleCount = isMobile ? 220 : 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      // Spread across Z from behind (-2.5) to in front (+2.5)
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5.5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe0c6a3,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Interactive Mouse & Scroll Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // 9. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render calculations when hero is completely scrolled out of view
      if (scrollY > height * 1.3) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.055;
      mouseY += (targetY - mouseY) * 0.055;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Update 3D spotlight position tracking cursor across athlete's muscular back
      mouseSpotlight.position.x = mouseX * 6.5;
      mouseSpotlight.position.y = mouseY * 4.5 + 0.5;

      // 3D Parallax Tilt for the Athlete
      heroGroup.rotation.y = mouseX * 0.35;
      heroGroup.rotation.x = -mouseY * 0.25;
      heroGroup.position.x = mouseX * 0.4;
      heroGroup.position.y = mouseY * 0.3;

      // Rotate orbital rings
      halo1.rotation.z += delta * 0.25;
      halo2.rotation.x += delta * 0.2;
      halo2.rotation.y -= delta * 0.15;
      halo3.rotation.z -= delta * 0.18;

      // Scroll depth push
      const scrollFactor = Math.min(scrollY / 1000, 1.5);
      heroGroup.position.z = -scrollFactor * 3.5;
      heroGroup.position.y = mouseY * 0.3 - scrollFactor * 1.8;

      // Drift particle cloud
      particleSystem.rotation.y = elapsedTime * 0.02 + mouseX * 0.2;
      particleSystem.rotation.x = elapsedTime * 0.015 - mouseY * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      halo1Geo.dispose();
      halo1Mat.dispose();
      halo2Geo.dispose();
      halo2Mat.dispose();
      halo3Geo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
      aria-hidden="true"
    />
  );
}
