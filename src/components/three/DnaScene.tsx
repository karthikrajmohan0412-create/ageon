"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DnaScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Lighting — keeps the strand readable on pure black background
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const tealLight = new THREE.PointLight(0x00b09b, 1.6, 22);
    tealLight.position.set(-3, 1, 4);
    scene.add(tealLight);
    const warmLight = new THREE.PointLight(0xffca05, 0.6, 20);
    warmLight.position.set(4, -2, 3);
    scene.add(warmLight);

    // === DNA double helix ===
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const turns = 3.2;
    const height = 7.2;
    const radius = 0.95;

    function buildStrand(phase: number, color: number, emissive: number) {
      const points: THREE.Vector3[] = [];
      const segments = 240;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = t * turns * Math.PI * 2 + phase;
        const y = (t - 0.5) * height;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius,
          ),
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, 480, 0.07, 10, false);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: 0.55,
        metalness: 0.35,
        roughness: 0.35,
      });
      return new THREE.Mesh(geo, mat);
    }

    const strandA = buildStrand(0, 0x00d9b8, 0x00b09b);
    const strandB = buildStrand(Math.PI, 0xf6f1e7, 0xffca05);
    dnaGroup.add(strandA, strandB);

    // === Rungs (base pairs) — cylinder spanning the helix diameter ===
    const rungCount = 26;
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00b09b,
      emissiveIntensity: 0.25,
      metalness: 0.3,
      roughness: 0.55,
      transparent: true,
      opacity: 0.6,
    });
    const rungGeo = new THREE.CylinderGeometry(
      0.028,
      0.028,
      radius * 2,
      8,
    );
    const rungWrappers: THREE.Group[] = [];
    for (let i = 0; i < rungCount; i++) {
      const t = i / (rungCount - 1);
      const y = (t - 0.5) * height;
      const angle = t * turns * Math.PI * 2;
      const wrapper = new THREE.Group();
      const cyl = new THREE.Mesh(rungGeo, rungMat);
      cyl.rotation.z = Math.PI / 2; // lay it horizontally
      wrapper.add(cyl);
      wrapper.position.y = y;
      wrapper.rotation.y = angle;
      dnaGroup.add(wrapper);
      rungWrappers.push(wrapper);
    }

    // Slight initial tilt so the helix reads as 3D from the first frame
    dnaGroup.rotation.x = 0.18;

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop — slow rotation; the section's scroll-tied opacity
    // handles the fade-out as the cream background takes over.
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      dnaGroup.rotation.y = t * 0.25;
      dnaGroup.rotation.x = 0.18 + Math.sin(t * 0.35) * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      strandA.geometry.dispose();
      strandB.geometry.dispose();
      (strandA.material as THREE.Material).dispose();
      (strandB.material as THREE.Material).dispose();
      rungGeo.dispose();
      rungMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
