"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "../Logo";
import { HeroSceneRaw } from "../three/HeroSceneRaw";
import { imagery } from "@/lib/imagery";

export function HeroSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Horizontal parallax only makes sense on the side-by-side desktop layout —
  // on mobile the columns stack and shifting them ±150px clips text off-screen.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const leftX = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black">
      {/* Background split — photo layers behind a colour wash */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — "living": muted photo + dark overlay */}
        <div className="relative overflow-hidden">
          <img
            src={imagery.hero.living}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/85 via-zinc-950/90 to-black" />
        </div>
        {/* RIGHT — "alive": vibrant photo with teal wash */}
        <div className="relative overflow-hidden">
          <img
            src={imagery.hero.alive}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,176,155,0.78) 0%, rgba(0,122,108,0.85) 100%)",
            }}
          />
        </div>
      </div>

      {/* Single shared 3D scene covering the whole hero. The scene
          itself decides what to show per-viewport (mobile hides the
          centre mark and keeps only the ambient orbs at the edges). */}
      <motion.div
        style={{ scale: sceneScale, y: sceneY }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <HeroSceneRaw />
      </motion.div>

      {/* Vignette layers to darken edges and improve readability */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.3)_100%)]" />

      {/* Top nav */}
      <motion.header
        style={{ opacity: fade }}
        className="relative z-30 flex items-center justify-between px-4 md:px-16 py-4 md:py-6"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <LogoMark size={32} className="md:w-9 md:h-9" />
          <span className="font-display tracking-[0.18em] text-white text-xs md:text-sm">AGEON</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] text-white/70">
          <a href="#story" className="hover:text-white transition">STORY</a>
          <a href="#pillars" className="hover:text-white transition">THERAPIES</a>
          <a href="#membership" className="hover:text-white transition">MEMBERSHIP</a>
          <a href="#location" className="hover:text-white transition">VISIT</a>
        </nav>
        <a
          href="#membership"
          className="text-[10px] md:text-xs tracking-[0.2em] border border-white/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 hover:border-white hover:bg-white hover:text-black transition"
        >
          BEGIN →
        </a>
      </motion.header>

      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-100px)]">
        {/* LEFT — living */}
        <motion.div
          style={isDesktop ? { x: leftX } : undefined}
          className="relative flex items-end md:items-center px-6 pb-12 pt-24 md:p-16"
        >
          <div className="max-w-md">
            <h2 className="font-display text-2xl md:text-5xl text-white leading-tight font-light">
              There is a difference between
              <span className="block mt-2 md:mt-3 italic font-light text-white/60">living</span>
              and feeling alive.
            </h2>
            <p className="mt-4 md:mt-8 text-white/50 text-sm md:text-base">Which one are you doing?</p>
          </div>
        </motion.div>

        {/* RIGHT — alive */}
        <motion.div
          style={isDesktop ? { x: rightX } : undefined}
          className="relative flex items-start md:items-center justify-start md:justify-end px-6 pt-12 pb-24 md:p-16"
        >
          <div className="max-w-md">
            <h2 className="font-display text-2xl md:text-5xl text-white leading-tight font-light">
              <span className="font-semibold">Ageon</span> is the transformation
              <span className="block mt-2 md:mt-3 text-white/90">from one to the other.</span>
            </h2>
            <p className="mt-4 md:mt-8 text-white text-sm md:text-base font-medium">
              Adding life to your years.
            </p>
          </div>
        </motion.div>
      </div>

      {/* scroll prompt */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
