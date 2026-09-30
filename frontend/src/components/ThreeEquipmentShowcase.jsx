"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeEquipmentShowcase({ lang = "en" }) {
  const mountRef = useRef(null);
  const [activeModel, setActiveModel] = useState("barbell"); // "barbell" | "kettlebell" | "dumbbell"
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // References across render cycles
  const sceneRef = useRef(null);
  const modelsGroupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0.002, y: 0.005 });
  const autoRotateRef = useRef(true);
  const activeModelRef = useRef(activeModel);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
    activeModelRef.current = activeModel;
  }, [autoRotate, activeModel]);

  const content = {
    en: {
      badge: "ENGINEERING EXCELLENCE",
      title: "Interactive 3D Equipment Studio",
      desc: "Every bar, bell, and plate at Meliora is forged to IWF and Olympic competition tolerance. Inspect our bespoke equipment in 360 degrees.",
      dragTip: "Drag to rotate 360° • Click hotspots for specs",
      autoRotateLabel: "Turntable",
      models: {
        barbell: "Olympic Barbell",
        kettlebell: "Pro Kettlebell",
        dumbbell: "Hex Dumbbell"
      },
      specs: {
        barbell: [
          { title: "215,000 PSI Steel", desc: "Heat-treated Swedish carbon steel engineered for maximum whip without permanent deflection." },
          { title: "Volcano Knurl 1.2mm", desc: "Aggressive yet skin-preserving diamond pattern providing immovable lock without tearing calluses." },
          { title: "Dual Needle Bearings", desc: "Four precision roller bearings per sleeve guarantee effortless spin under maximal loads." }
        ],
        kettlebell: [
          { title: "Single-Piece Gravity Cast", desc: "Zero welds or weak points. Void-free cast iron body balanced to 0.1% accuracy." },
          { title: "Surgical 33mm Handle", desc: "Ergonomic raw-finish stainless handle optimized for high-volume snatch and clean turnover." },
          { title: "Machined Flat Base", desc: "Precision CNC milled base for unwavering stability during floor renegade rows and push-ups." }
        ],
        dumbbell: [
          { title: "Anti-Roll Hex Geometry", desc: "6-sided faceted heads coated in impact-absorbing virgin urethane that shields platforms." },
          { title: "Contoured Hard Chrome Grip", desc: "Ergonomically tapered diameter with laser knurling for centered, balanced grip tension." },
          { title: "Electrostatically Welded", desc: "Internal threaded steel head-to-shaft bond tested to survive 10,000 continuous drop cycles." }
        ]
      }
    },
    fr: {
      badge: "EXCELLENCE DE L'INGÉNIERIE",
      title: "Studio 3D interactif des équipements",
      desc: "Chaque barre, kettlebell et disque à Meliora est calibré selon les normes de compétition olympique. Inspectez nos équipements en 360 degrés.",
      dragTip: "Glissez pour faire pivoter à 360° • Cliquez pour les spécifications",
      autoRotateLabel: "Rotation auto",
      models: {
        barbell: "Barre Olympique",
        kettlebell: "Kettlebell Pro",
        dumbbell: "Haltère Hex"
      },
      specs: {
        barbell: [
          { title: "Acier 215 000 PSI", desc: "Acier au carbone suédois traité thermiquement pour un fouet optimal sans déformation." },
          { title: "Moletage Volcan 1,2mm", desc: "Gravure diamant offrant un verrouillage absolu tout en préservant les paumes." },
          { title: "Roulements à aiguilles doubles", desc: "Quatre roulements de précision par manchon assurant une rotation fluide sous charge maximale." }
        ],
        kettlebell: [
          { title: "Fonte monobloc par gravité", desc: "Aucune soudure. Équilibrage usiné avec une tolérance de 0,1%." },
          { title: "Poignée chirurgicale 33mm", desc: "Finition brute ergonomique pour des transitions fluides à haute répétition." },
          { title: "Base usinée CNC", desc: "Stabilité parfaite au sol pour les renegade rows et les appuis stricts." }
        ],
        dumbbell: [
          { title: "Géométrie hexagonale stable", desc: "Têtes à 6 faces en uréthane vierge amortissant les chocs." },
          { title: "Prise chromée profilée", desc: "Diamètre ergonomique moleté au laser pour un confort d'équilibre naturel." },
          { title: "Liaison soudée par friction", desc: "Tête ancrée au manche par fusion acier garantie à vie." }
        ]
      }
    },
    tn: {
      badge: "دقة التصنيع الأولمبي",
      title: "استوديو المعدات ثلاثي الأبعاد",
      desc: "كل معدات ميليورا مصنوعة بمعايير عالمية دقيقة. استكشف معداتنا بتقنية 360 درجة التفاعلية.",
      dragTip: "حرك الفأرة للتدوير 360° • انقر على النقاط للاطلاع على المواصفات",
      autoRotateLabel: "تدوير تلقائي",
      models: {
        barbell: "بار أولمبي",
        kettlebell: "كيتل بل احترافي",
        dumbbell: "دامبل سداسي"
      },
      specs: {
        barbell: [
          { title: "فولاذ معالج 215,000 PSI", desc: "فولاذ كربوني صلب مصمم لتحمل أقصى الأوزان العالمية." },
          { title: "نقش بركاني ماسي 1.2 مم", desc: "ثبات قوي في اليد دون التسبب في جروح أو تمزق الجلد." },
          { title: "محامل دائرية مزدوجة", desc: "دوران حر وسلس للغاية حتى تحت أثقل الأحمال." }
        ],
        kettlebell: [
          { title: "حديد مصبوب قطعة واحدة", desc: "توازن فائق الدقة بدون أي نقاط ضعف أو لحام خارجي." },
          { title: "مقبض قياسي 33 مم", desc: "قبضة مريحة واحترافية للحركات السريعة والتكرارات العالية." },
          { title: "قاعدة مسطحة دقيقة", desc: "ثبات كامل على الأرض لتمارين الدفع والتجديف." }
        ],
        dumbbell: [
          { title: "رؤوس سداسية مضادة للدحرجة", desc: "طبقة يوريثان ممتصة للصدمات تحمي الأرضيات والمعدات." },
          { title: "مقبض كروم مريح", desc: "تصميم منحني ومحفور بالليزر لقبضة محكمة ومتوازنة." },
          { title: "لحام عالي المتانة", desc: "ارتباط قوي تم اختباره لآلاف السقطات المتتالية." }
        ]
      }
    }
  };

  const t = content[lang] || content.en;

  // Build the 3D Scene
  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;

    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight || 550;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // 3. Lighting (Atmospheric Studio)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xffdfa8, 3.5);
    goldKeyLight.position.set(4, 5, 4);
    goldKeyLight.castShadow = true;
    scene.add(goldKeyLight);

    const blueRimLight = new THREE.DirectionalLight(0x7090b8, 2.2);
    blueRimLight.position.set(-5, 2, -4);
    scene.add(blueRimLight);

    const bottomGlow = new THREE.PointLight(0xc5a880, 2.5, 8);
    bottomGlow.position.set(0, -1.8, 1);
    scene.add(bottomGlow);

    // 4. Subtle Pedestal & Floor Shadow Plane
    const pedestalGeo = new THREE.CylinderGeometry(2.4, 2.7, 0.25, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.3,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.6;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    const pedestalRingGeo = new THREE.TorusGeometry(2.42, 0.02, 16, 64);
    const pedestalRingMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.95,
      roughness: 0.15,
    });
    const pedestalRing = new THREE.Mesh(pedestalRingGeo, pedestalRingMat);
    pedestalRing.rotation.x = Math.PI / 2;
    pedestalRing.position.y = -1.48;
    scene.add(pedestalRing);

    // 5. Container Group for all switchable models
    const modelsGroup = new THREE.Group();
    modelsGroupRef.current = modelsGroup;
    scene.add(modelsGroup);

    // Helper: Shared Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.2,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8d8,
      metalness: 0.96,
      roughness: 0.18,
    });
    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.7,
      roughness: 0.45,
    });
    const urethaneMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      metalness: 0.2,
      roughness: 0.65,
    });

    // --- MODEL A: OLYMPIC BARBELL ---
    const barbellGroup = new THREE.Group();
    barbellGroup.name = "barbell";

    // Bar shaft (Length: 4.8)
    const shaftGeo = new THREE.CylinderGeometry(0.065, 0.065, 4.8, 32);
    const shaft = new THREE.Mesh(shaftGeo, chromeMat);
    shaft.rotation.z = Math.PI / 2;
    barbellGroup.add(shaft);

    // Knurling rings (visual knurling pattern)
    [-1.2, -0.6, 0.6, 1.2].forEach((offset) => {
      const knurlGeo = new THREE.CylinderGeometry(0.068, 0.068, 0.4, 24);
      const knurlMat = new THREE.MeshStandardMaterial({
        color: 0xb59972,
        metalness: 0.85,
        roughness: 0.5,
        wireframe: false,
      });
      const knurl = new THREE.Mesh(knurlGeo, knurlMat);
      knurl.rotation.z = Math.PI / 2;
      knurl.position.x = offset;
      barbellGroup.add(knurl);
    });

    // Sleeves and Weight Plates (Left & Right)
    [-1, 1].forEach((dir) => {
      // Rotating Sleeve
      const sleeveGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 32);
      const sleeve = new THREE.Mesh(sleeveGeo, chromeMat);
      sleeve.rotation.z = Math.PI / 2;
      sleeve.position.x = dir * 2.1;
      barbellGroup.add(sleeve);

      // Sleeve Collar Ring (Gold)
      const collarRingGeo = new THREE.TorusGeometry(0.17, 0.04, 16, 32);
      const collarRing = new THREE.Mesh(collarRingGeo, goldMat);
      collarRing.rotation.y = Math.PI / 2;
      collarRing.position.x = dir * 1.5;
      barbellGroup.add(collarRing);

      // 20KG Heavy Bumper Plate
      const plateGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.16, 48);
      const plate = new THREE.Mesh(plateGeo, urethaneMat);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = dir * 1.7;
      barbellGroup.add(plate);

      // Gold Inset Ring on Plate
      const plateGoldRingGeo = new THREE.TorusGeometry(0.82, 0.02, 16, 48);
      const plateGoldRing = new THREE.Mesh(plateGoldRingGeo, goldMat);
      plateGoldRing.rotation.y = Math.PI / 2;
      plateGoldRing.position.x = dir * 1.7;
      barbellGroup.add(plateGoldRing);

      // Outer Lock Clamp
      const clampGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 24);
      const clamp = new THREE.Mesh(clampGeo, goldMat);
      clamp.rotation.z = Math.PI / 2;
      clamp.position.x = dir * 2.55;
      barbellGroup.add(clamp);
    });

    modelsGroup.add(barbellGroup);

    // --- MODEL B: PRO KETTLEBELL ---
    const kettlebellGroup = new THREE.Group();
    kettlebellGroup.name = "kettlebell";
    kettlebellGroup.visible = false;

    // Bell Spherical Body
    const bellGeo = new THREE.SphereGeometry(0.9, 48, 48);
    const bell = new THREE.Mesh(bellGeo, darkSteelMat);
    bell.scale.set(1.0, 0.95, 1.0);
    bell.position.y = -0.3;
    kettlebellGroup.add(bell);

    // Flat Base Disc
    const flatBaseGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.1, 32);
    const flatBase = new THREE.Mesh(flatBaseGeo, darkSteelMat);
    flatBase.position.y = -1.15;
    kettlebellGroup.add(flatBase);

    // Meliora Gold Emblem Medallion
    const emblemGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 32);
    const emblem = new THREE.Mesh(emblemGeo, goldMat);
    emblem.rotation.x = Math.PI / 2;
    emblem.position.set(0, -0.3, 0.88);
    kettlebellGroup.add(emblem);

    // Handle Arch
    const handleArchGeo = new THREE.TorusGeometry(0.55, 0.09, 24, 48, Math.PI);
    const handleArch = new THREE.Mesh(handleArchGeo, chromeMat);
    handleArch.position.y = 0.65;
    kettlebellGroup.add(handleArch);

    // Handle Vertical Stems
    [-0.55, 0.55].forEach((xPos) => {
      const stemGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.45, 24);
      const stem = new THREE.Mesh(stemGeo, chromeMat);
      stem.position.set(xPos, 0.42, 0);
      kettlebellGroup.add(stem);
    });

    // Color-Coded Competition Ring (Gold)
    const compRingGeo = new THREE.TorusGeometry(0.91, 0.02, 16, 48);
    const compRing = new THREE.Mesh(compRingGeo, goldMat);
    compRing.rotation.x = Math.PI / 2;
    compRing.position.y = -0.2;
    kettlebellGroup.add(compRing);

    modelsGroup.add(kettlebellGroup);

    // --- MODEL C: HEX DUMBBELL ---
    const dumbbellGroup = new THREE.Group();
    dumbbellGroup.name = "dumbbell";
    dumbbellGroup.visible = false;

    // Handle
    const dbHandleGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.4, 32);
    const dbHandle = new THREE.Mesh(dbHandleGeo, chromeMat);
    dbHandle.rotation.z = Math.PI / 2;
    dumbbellGroup.add(dbHandle);

    // Knurled center grip
    const dbKnurlGeo = new THREE.CylinderGeometry(0.094, 0.094, 0.8, 24);
    const dbKnurl = new THREE.Mesh(dbKnurlGeo, goldMat);
    dbKnurl.rotation.z = Math.PI / 2;
    dumbbellGroup.add(dbKnurl);

    // Dual Hexagonal Heads
    [-1, 1].forEach((dir) => {
      const hexGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.55, 6);
      const hex = new THREE.Mesh(hexGeo, urethaneMat);
      hex.rotation.z = Math.PI / 2;
      hex.position.x = dir * 0.95;
      dumbbellGroup.add(hex);

      // Gold Inlaid End Cap
      const capGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.03, 24);
      const cap = new THREE.Mesh(capGeo, goldMat);
      cap.rotation.z = Math.PI / 2;
      cap.position.x = dir * 1.24;
      dumbbellGroup.add(cap);

      // Gold Chamfer Rings
      const hexBevelGeo = new THREE.TorusGeometry(0.55, 0.02, 6, 6);
      const hexBevel = new THREE.Mesh(hexBevelGeo, goldMat);
      hexBevel.rotation.y = Math.PI / 2;
      hexBevel.position.x = dir * 1.22;
      dumbbellGroup.add(hexBevel);
    });

    modelsGroup.add(dumbbellGroup);

    // 6. Mouse Drag Interaction (360° rotation)
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;

      rotationVelocityRef.current = {
        x: deltaY * 0.006,
        y: deltaX * 0.006,
      };

      modelsGroup.rotation.y += rotationVelocityRef.current.y;
      modelsGroup.rotation.x += rotationVelocityRef.current.x;

      // Clamp X rotation to prevent upside-down flip
      modelsGroup.rotation.x = Math.max(-0.6, Math.min(0.6, modelsGroup.rotation.x));

      previousMousePosRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      isDraggingRef.current = true;
      previousMousePosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosRef.current.y;

      modelsGroup.rotation.y += deltaX * 0.008;
      modelsGroup.rotation.x += deltaY * 0.008;
      modelsGroup.rotation.x = Math.max(-0.6, Math.min(0.6, modelsGroup.rotation.x));

      previousMousePosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize Handler
    const onResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight || 550;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Switch visibility depending on active model state
      barbellGroup.visible = activeModelRef.current === "barbell";
      kettlebellGroup.visible = activeModelRef.current === "kettlebell";
      dumbbellGroup.visible = activeModelRef.current === "dumbbell";

      if (!isDraggingRef.current) {
        if (autoRotateRef.current) {
          modelsGroup.rotation.y += 0.006;
          // Slowly recover X tilt back to subtle showcase angle
          modelsGroup.rotation.x += (0.15 - modelsGroup.rotation.x) * 0.02;
        } else {
          // Apply gentle friction to manual spin
          rotationVelocityRef.current.y *= 0.94;
          rotationVelocityRef.current.x *= 0.94;
          modelsGroup.rotation.y += rotationVelocityRef.current.y;
          modelsGroup.rotation.x += rotationVelocityRef.current.x;
        }
      }

      // Gentle floating hover on Y
      const time = performance.now() * 0.0015;
      modelsGroup.position.y = Math.sin(time) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      // Dispose
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section
      id="equipment-3d"
      className="section-padding"
      style={{
        backgroundColor: "#060606",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(197, 168, 128, 0.12)",
        borderBottom: "1px solid rgba(197, 168, 128, 0.12)",
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(197, 168, 128, 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }} className="reveal-up">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--accent-gold)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            {t.badge}
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: "1.1",
              marginBottom: "1.5rem",
            }}
          >
            {t.title}
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
            }}
          >
            {t.desc}
          </p>
        </div>

        {/* Model Switcher Tabs & Turntable Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem",
            padding: "0.75rem 1.25rem",
            backgroundColor: "rgba(18, 18, 18, 0.7)",
            border: "1px solid var(--glass-border)",
            borderRadius: "40px",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Model Selection Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "barbell", label: t.models.barbell },
              { id: "kettlebell", label: t.models.kettlebell },
              { id: "dumbbell", label: t.models.dumbbell },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModel(item.id);
                  setActiveHotspot(null);
                }}
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "30px",
                  border: activeModel === item.id ? "1px solid var(--accent-gold)" : "1px solid transparent",
                  backgroundColor: activeModel === item.id ? "rgba(197, 168, 128, 0.15)" : "transparent",
                  color: activeModel === item.id ? "#ffffff" : "var(--text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "var(--transition-fast)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls: Auto-Rotate & Tip */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                display: "none",
                // will show on desktop via media or flex
              }}
              className="desktop-only-tip"
            >
              {t.dragTip}
            </span>

            <button
              onClick={() => setAutoRotate(!autoRotate)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                backgroundColor: autoRotate ? "rgba(197, 168, 128, 0.2)" : "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(197, 168, 128, 0.3)",
                color: autoRotate ? "var(--accent-gold)" : "#ffffff",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: autoRotate ? "spin 4s linear infinite" : "none",
                }}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              {t.autoRotateLabel}
            </button>
          </div>
        </div>

        {/* 3D Canvas Box */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "520px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--glass-border)",
            backgroundColor: "#090909",
            cursor: "grab",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          }}
          onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
          onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
        >
          {/* Mount Three.js canvas */}
          <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

          {/* 3D Interaction Tip Pill */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.45rem 1.1rem",
              borderRadius: "30px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "1px solid rgba(197, 168, 128, 0.25)",
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-gold)",
                display: "inline-block",
                boxShadow: "0 0 8px var(--accent-gold)",
              }}
            />
            {t.dragTip}
          </div>
        </div>

        {/* Interactive Engineering Specs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "2.5rem",
          }}
        >
          {t.specs[activeModel].map((spec, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "1.75rem 1.5rem",
                borderRadius: "12px",
                border: activeHotspot === idx ? "1px solid var(--accent-gold)" : "1px solid var(--glass-border)",
                backgroundColor: activeHotspot === idx ? "rgba(197, 168, 128, 0.08)" : "var(--glass-bg)",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
              }}
              onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "1px solid var(--accent-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                  }}
                >
                  0{idx + 1}
                </span>
                <h4 style={{ fontSize: "1.05rem", color: "#ffffff", letterSpacing: "0.02em" }}>{spec.title}</h4>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
