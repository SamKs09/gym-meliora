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
    camera.position.set(0, 0, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // Soft Radial Feather Alpha Map for Seamless Blending
    const alphaCanvas = document.createElement("canvas");
    alphaCanvas.width = 512;
    alphaCanvas.height = 512;
    const alphaCtx = alphaCanvas.getContext("2d");
    if (alphaCtx) {
      const grad = alphaCtx.createRadialGradient(256, 256, 140, 256, 256, 256);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.65, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.9, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      alphaCtx.fillStyle = grad;
      alphaCtx.fillRect(0, 0, 512, 512);
    }
    const alphaTexture = new THREE.CanvasTexture(alphaCanvas);

    // 5. 3D Athlete Mesh with Cylindrical Curvature
    const textureLoader = new THREE.TextureLoader();
    const athleteTexture = textureLoader.load("/hero-athlete.png");
    athleteTexture.generateMipmaps = true;
    athleteTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Plane geometry with 16:9 ratio (width 7.2, height 4.05) with 48 subdivisions for 3D curved warp
    const athleteGeo = new THREE.PlaneGeometry(7.4, 4.16, 48, 48);

    // Apply gentle curved wrap to create 3D IMAX perspective
    const posAttribute = athleteGeo.attributes.position;
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const curve = Math.pow(x / 3.7, 2) * 0.4;
      posAttribute.setZ(i, -curve);
    }
    athleteGeo.computeVertexNormals();

    const athleteMat = new THREE.MeshStandardMaterial({
      map: athleteTexture,
      alphaMap: alphaTexture,
      transparent: true,
      opacity: 0.92,
      roughness: 0.4,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });

    const athleteMesh = new THREE.Mesh(athleteGeo, athleteMat);
    athleteMesh.position.set(0, 0.1, 0);
    heroGroup.add(athleteMesh);

    // 6. Halo of Excellence: 3D Orbital Rings Behind the Athlete
    const haloGroup = new THREE.Group();
    haloGroup.position.set(0, 0.3, -0.6);
    heroGroup.add(haloGroup);

    // Inner Gold Halo Ring
    const halo1Geo = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const halo1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });
    const halo1 = new THREE.Mesh(halo1Geo, halo1Mat);
    halo1.rotation.x = Math.PI / 6;
    haloGroup.add(halo1);

    // Outer Chrome Kinetic Ring
    const halo2Geo = new THREE.TorusGeometry(2.8, 0.018, 16, 100);
    const halo2Mat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.98,
      roughness: 0.1,
    });
    const halo2 = new THREE.Mesh(halo2Geo, halo2Mat);
    halo2.rotation.y = Math.PI / 4;
    haloGroup.add(halo2);

    // Tilted Equatorial Accent Ring
    const halo3Geo = new THREE.TorusGeometry(3.3, 0.015, 16, 120);
    const halo3 = new THREE.Mesh(halo3Geo, halo1Mat);
    halo3.rotation.x = -Math.PI / 4;
    halo3.rotation.z = Math.PI / 5;
    haloGroup.add(halo3);

    // 7. Depth Particles (Floating in FRONT and BEHIND the athlete)
    const particleCount = 650;
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

      // Subtle breathing motion for athlete mesh
      const breath = Math.sin(elapsedTime * 1.2) * 0.02;
      athleteMesh.position.z = breath;
      athleteMesh.scale.set(1 + breath * 0.015, 1 + breath * 0.015, 1);

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

      athleteGeo.dispose();
      athleteMat.dispose();
      athleteTexture.dispose();
      alphaTexture.dispose();
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
