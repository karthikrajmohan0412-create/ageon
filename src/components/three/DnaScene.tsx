"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

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
    renderer.toneMappingExposure = 0.95;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Pre-baked indoor environment map — gives the strands soft realistic
    // reflections rather than the flat self-glow that read as plastic.
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envMap;

    // Subtle key + rim lighting; the env map carries most of the look.
    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xb8e0d8, 0.45);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // === DNA double helix ===
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const turns = 3.2;
    const height = 7.2;
    const radius = 0.95;

    function buildStrand(phase: number, mat: THREE.Material) {
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
      const geo = new THREE.TubeGeometry(curve, 480, 0.075, 14, false);
      return new THREE.Mesh(geo, mat);
    }

    // Strand A — polished steel / chrome with the faintest cool tint.
    // Strand B — brushed champagne; warmer to read against strand A.
    // Both rely on env-map reflections rather than emissive glow.
    const strandMatA = new THREE.MeshPhysicalMaterial({
      color: 0xe6ecee,
      metalness: 1.0,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.1,
    });
    const strandMatB = new THREE.MeshPhysicalMaterial({
      color: 0xd9c8a8,
      metalness: 1.0,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.0,
    });
    const strandA = buildStrand(0, strandMatA);
    const strandB = buildStrand(Math.PI, strandMatB);
    dnaGroup.add(strandA, strandB);

    // === Rungs (base pairs) — anodised dark metal, matte but reflective.
    const rungCount = 26;
    const rungMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1f22,
      metalness: 0.85,
      roughness: 0.45,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
      envMapIntensity: 0.7,
    });
    const rungGeo = new THREE.CylinderGeometry(0.032, 0.032, radius * 2, 12);
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
    }

    // Slight initial tilt so the helix reads as 3D from the first frame
    dnaGroup.rotation.x = 0.18;

    // Resize — also fits the helix to portrait/mobile viewports so it
    // doesn't fill the entire screen and bury the headline text.
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Shrink the helix on portrait viewports so it reads as a focal
      // element behind the headline rather than swallowing the screen.
      const groupScale = aspect < 1 ? 0.55 : 1;
      dnaGroup.scale.setScalar(groupScale);
    };
    onResize();
    window.addEventListener("resize", onResize);

    // Slow, deliberate rotation — premium feel, not spinny.
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      dnaGroup.rotation.y = t * 0.15;
      dnaGroup.rotation.x = 0.18 + Math.sin(t * 0.25) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      pmrem.dispose();
      envMap.dispose();
      renderer.dispose();
      strandA.geometry.dispose();
      strandB.geometry.dispose();
      strandMatA.dispose();
      strandMatB.dispose();
      rungGeo.dispose();
      rungMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
