"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Orb = {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  speed: number;
  floatPhase: number;
};

export function HeroSceneRaw() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dir1.position.set(3, 4, 5);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0x00b09b, 0.6);
    dir2.position.set(-4, -2, 3);
    scene.add(dir2);
    const point1 = new THREE.PointLight(0xffca05, 0.8, 20);
    point1.position.set(5, -1, -2);
    scene.add(point1);
    const point2 = new THREE.PointLight(0xc3161c, 0.5, 20);
    point2.position.set(4, 2, -2);
    scene.add(point2);

    // Helper to create a glowing distorted sphere
    function createOrb(
      color: number,
      position: [number, number, number],
      scale: number,
      emissiveIntensity = 0.18,
    ) {
      const geo = new THREE.SphereGeometry(1, 64, 64);
      // Apply organic noise distortion to vertex positions
      const positions = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const v = new THREE.Vector3(
          positions[i],
          positions[i + 1],
          positions[i + 2],
        );
        const noise =
          0.18 * Math.sin(v.x * 3 + v.y * 2) +
          0.12 * Math.cos(v.y * 2.5 - v.z * 3) +
          0.1 * Math.sin(v.z * 3 + v.x * 2);
        v.normalize().multiplyScalar(1 + noise);
        positions[i] = v.x;
        positions[i + 1] = v.y;
        positions[i + 2] = v.z;
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity,
        metalness: 0.55,
        roughness: 0.18,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...position);
      mesh.scale.setScalar(scale);
      scene.add(mesh);
      return mesh;
    }

    const orbs: Orb[] = [
      // Left dark orbs (behind dark half) — pulled outward.
      // Vertically separated and shrunk so they don't pile up when the
      // mobile resize handler pulls them inward toward the centre.
      {
        mesh: createOrb(0x3a3a40, [-4.6, -1.8, -1.5], 0.7, 0.05),
        basePosition: new THREE.Vector3(-4.6, -1.8, -1.5),
        speed: 0.6,
        floatPhase: 0,
      },
      {
        mesh: createOrb(0x4a4a52, [-4.2, 2.0, -2.5], 0.5, 0.06),
        basePosition: new THREE.Vector3(-4.2, 2.0, -2.5),
        speed: 0.8,
        floatPhase: 1.7,
      },
      // Right warm orbs — pulled outward and scaled down so the centre mark dominates
      {
        mesh: createOrb(0xffca05, [4.6, 1.4, -1.5], 0.75, 0.28),
        basePosition: new THREE.Vector3(4.6, 1.4, -1.5),
        speed: 0.9,
        floatPhase: 0.6,
      },
      {
        mesh: createOrb(0xc3161c, [4.2, -1.5, -2.0], 0.6, 0.25),
        basePosition: new THREE.Vector3(4.2, -1.5, -2.0),
        speed: 1.1,
        floatPhase: 2.2,
      },
      {
        mesh: createOrb(0x00d9b8, [5.5, -0.2, -3.0], 0.55, 0.3),
        basePosition: new THREE.Vector3(5.5, -0.2, -3.0),
        speed: 0.7,
        floatPhase: 3.1,
      },
    ];

    // === AGEON 3D mark — yellow descender + red zig-zag, sharing the centre ===
    // Yellow side: M descender — a thick angled stroke on the left
    const yellowShape = new THREE.Shape();
    yellowShape.moveTo(-1.0, -1.2);
    yellowShape.lineTo(-0.5, -1.2);
    yellowShape.lineTo(0.0, 0.0);
    yellowShape.lineTo(0.0, 1.2);
    yellowShape.lineTo(-0.5, 1.2);
    yellowShape.lineTo(-1.0, 0.5);
    yellowShape.closePath();

    // Red side: zig-zag arrow head on the right
    const redShape = new THREE.Shape();
    redShape.moveTo(0.5, 1.2);
    redShape.lineTo(1.0, 1.2);
    redShape.lineTo(1.0, -0.5);
    redShape.lineTo(0.5, -1.2);
    redShape.lineTo(0.0, -1.2);
    redShape.lineTo(0.0, 0.0);
    redShape.lineTo(0.0, 0.4);
    redShape.lineTo(0.5, 0.4);
    redShape.closePath();

    const extrudeSettings = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.07,
      bevelSegments: 6,
      curveSegments: 12,
    };

    // Build geometries WITHOUT centering — they share x=0 boundary by design,
    // so the shapes already form a single visual mark when used at native coords.
    const yellowGeo = new THREE.ExtrudeGeometry(yellowShape, extrudeSettings);
    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xffca05,
      metalness: 0.55,
      roughness: 0.22,
      emissive: 0xffca05,
      emissiveIntensity: 0.18,
    });
    const yellowMesh = new THREE.Mesh(yellowGeo, yellowMat);

    const redGeo = new THREE.ExtrudeGeometry(redShape, extrudeSettings);
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xc3161c,
      metalness: 0.55,
      roughness: 0.25,
      emissive: 0xc3161c,
      emissiveIntensity: 0.12,
    });
    const redMesh = new THREE.Mesh(redGeo, redMat);

    const markGroup = new THREE.Group();
    markGroup.add(yellowMesh);
    markGroup.add(redMesh);
    // Center the group as a whole and depth-offset to camera
    markGroup.position.z = -0.2;
    scene.add(markGroup);

    // Remember the design-time (wide-viewport) orb X positions so we can
    // pull them inward when the viewport is narrow.
    const orbBaseXOriginal = orbs.map((o) => o.basePosition.x);

    // Vertical offset applied to the centre mark — set by onResize and
    // honoured by the animation loop so its float doesn't clobber it.
    let markBaseY = 0;

    // Mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize — also re-fits the scene for the current aspect ratio so
    // the side orbs and centre mark remain visible on portrait/mobile.
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Pull orbs in toward the centre on narrow viewports so they stay
      // inside the camera's visible horizontal extent.
      const orbXScale = Math.min(1, Math.max(0.32, aspect / 1.6));
      orbs.forEach((o, i) => {
        o.basePosition.x = orbBaseXOriginal[i] * orbXScale;
      });

      // Shrink the centre mark on portrait/mobile — at 0.85 it dominates
      // the screen and overlaps the headline text. Desktop keeps 0.85.
      const markScale = aspect < 1 ? 0.45 : 0.85;
      markGroup.scale.setScalar(markScale);

      // Push the mark up into the empty area above the headline on mobile
      // so it stops colliding with the stacked LIVING / ALIVE text blocks.
      markBaseY = aspect < 1 ? 1.7 : 0;
    };
    onResize();
    window.addEventListener("resize", onResize);

    // Animation loop
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();

      // Orbs — subtle float + rotate
      orbs.forEach((o) => {
        o.mesh.rotation.x = t * 0.15 * o.speed;
        o.mesh.rotation.y = t * 0.2 * o.speed;
        o.mesh.position.y =
          o.basePosition.y + Math.sin(t * 0.8 + o.floatPhase) * 0.25;
        o.mesh.position.x =
          o.basePosition.x + Math.cos(t * 0.6 + o.floatPhase) * 0.15;
      });

      // AGEON mark — gentle oscillating rotation
      markGroup.rotation.y = Math.sin(t * 0.45) * 0.55;
      markGroup.rotation.x = Math.sin(t * 0.3) * 0.12;
      markGroup.position.y = markBaseY + Math.sin(t * 0.7) * 0.08;

      // Mouse parallax — gentle camera drift
      camera.position.x += (mouseRef.current.x * 0.35 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 0.25 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      orbs.forEach((o) => {
        o.mesh.geometry.dispose();
        (o.mesh.material as THREE.Material).dispose();
      });
      yellowGeo.dispose();
      redGeo.dispose();
      yellowMat.dispose();
      redMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
