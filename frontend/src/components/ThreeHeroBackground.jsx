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

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Lighting (Warm Gold & Cool Rim Studio)
    const ambientLight = new THREE.AmbientLight(0x151515, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffdfa8, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6080a0, 2.0);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xc5a880, 2.5, 10);
    accentLight.position.set(0, 1, 3);
    scene.add(accentLight);

    // 4. Kinetic 3D Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Core Luxury Torus Knot
    const coreGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 160, 32, 2, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.9,
      roughness: 0.22,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // Subtle Wireframe Ghost overlay for architectural tech feel
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.setScalar(1.015);
    sculptureGroup.add(wireMesh);

    // Orbital Ring 1 (Gold)
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.035, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    // Orbital Ring 2 (Obsidian Chrome)
    const ring2Geo = new THREE.TorusGeometry(3.0, 0.025, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.98,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    sculptureGroup.add(ring2);

    // Orbital Ring 3 (Tilted Equatorial Gold)
    const ring3Geo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ring3 = new THREE.Mesh(ring3Geo, ring1Mat);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;
    sculptureGroup.add(ring3);

    // 5. Floating Dust / Energy Particles
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xdfc49c,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Interactive Mouse & Scroll Tracking
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

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Rotate central sculpture
      coreMesh.rotation.x += delta * 0.25;
      coreMesh.rotation.y += delta * 0.35;
      wireMesh.rotation.copy(coreMesh.rotation);

      // Rotate orbital rings at distinct harmonic speeds
      ring1.rotation.x += delta * 0.2;
      ring1.rotation.y += delta * 0.3;
      ring2.rotation.y -= delta * 0.25;
      ring2.rotation.z += delta * 0.15;
      ring3.rotation.x -= delta * 0.18;
      ring3.rotation.z -= delta * 0.22;

      // Group responds smoothly to mouse parallax & scroll depth
      sculptureGroup.rotation.y = mouseX * 0.8 + elapsedTime * 0.05;
      sculptureGroup.rotation.x = -mouseY * 0.6;
      
      // As user scrolls down, push sculpture slightly back and upward
      const scrollFactor = Math.min(scrollY / 1000, 1.5);
      sculptureGroup.position.y = -scrollFactor * 2.5;
      sculptureGroup.position.z = -scrollFactor * 3.0;
      sculptureGroup.rotation.z = scrollFactor * 0.5;

      // Gently orbit floating particle cloud
      particleSystem.rotation.y = elapsedTime * 0.03 + mouseX * 0.3;
      particleSystem.rotation.x = elapsedTime * 0.02 - mouseY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
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
        opacity: 0.9,
      }}
      aria-hidden="true"
    />
  );
}
