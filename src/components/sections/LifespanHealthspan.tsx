"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DnaScene } from "../three/DnaScene";

export function LifespanHealthspan() {
  const ref = useRef<HTMLElement>(null);
  const [range, setRange] = useState({ start: 0, end: 1 });
  const { scrollY } = useScroll();

  // Measure the section's scroll range once mounted (and on resize)
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + el.offsetHeight;
      const vh = window.innerHeight;
      // Sticky child stays pinned while: sectionTop <= scrollY <= sectionBottom - vh
      setRange({ start: sectionTop, end: sectionBottom - vh });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const progress = useTransform(scrollY, [range.start, range.end], [0, 1], {
    clamp: true,
  });

  const bgOpacity = useTransform(progress, [0.25, 0.6], [0, 1]);
  // Section opens on pure black; the helix emerges into view as the user
  // scrolls, holds for a beat, then fades out before the cream takes over.
  const dnaOpacity = useTransform(
    progress,
    [0.05, 0.22, 0.45, 0.6],
    [0, 1, 1, 0],
  );
  // Subtle scale + lift as it enters — Apple-style materialise.
  const dnaScale = useTransform(progress, [0.05, 0.28], [0.86, 1]);
  const dnaY = useTransform(progress, [0.05, 0.28], [40, 0]);
  const beamWidth = useTransform(progress, [0.3, 0.85], ["0%", "100%"]);
  const titleY = useTransform(progress, [0, 0.6], [0, -120]);
  const titleScale = useTransform(progress, [0, 0.6, 0.85], [1, 0.7, 0.55]);
  const titleColor = useTransform(
    progress,
    [0.25, 0.6],
    ["#ffffff", "#231f20"],
  );
  const titleOpacity = useTransform(progress, [0, 0.55, 0.75], [1, 1, 0]);
  const labelsOpacity = useTransform(progress, [0.6, 0.9], [0, 1]);
  const labelsXRight = useTransform(progress, [0.6, 0.9], [40, 0]);
  const labelsXLeft = useTransform(progress, [0.6, 0.9], [-40, 0]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-black"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black" />

        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-cream" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#fff7e0_0%,#f6f1e7_55%,#e8dfc8_100%)]" />
        </motion.div>

        <motion.div
          style={{ width: beamWidth, opacity: bgOpacity }}
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent blur-2xl"
        />

        {/* DNA helix — section opens on pure black; the helix fades in
            as the user begins to scroll, holds, then fades out as the
            cream background takes over. */}
        <motion.div
          style={{ opacity: dnaOpacity, scale: dnaScale, y: dnaY }}
          className="absolute inset-0 z-[5] pointer-events-none"
        >
          <DnaScene />
        </motion.div>

        <motion.div
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="relative z-10 text-center px-8"
        >
          <motion.p
            className="text-xs tracking-[0.4em] mb-6"
            style={{
              color: titleColor,
              opacity: 0.7,
              textShadow:
                "0 1px 4px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.6)",
            }}
          >
            — THE GAP —
          </motion.p>
          {/* Stacked text-shadow creates a soft halo that follows the
              letterforms — readable against the helix, no hard-edged
              scrim patch on the background. */}
          <motion.h2
            className="font-display text-3xl md:text-7xl font-light max-w-4xl mx-auto leading-[1.05] px-4"
            style={{
              color: titleColor,
              textShadow:
                "0 1px 3px rgba(0,0,0,0.95), 0 4px 14px rgba(0,0,0,0.85), 0 8px 32px rgba(0,0,0,0.6)",
            }}
          >
            Longevity is <span className="italic">not</span> measured in years.
          </motion.h2>
        </motion.div>

        <motion.div
          style={{ opacity: labelsOpacity }}
          className="absolute inset-0 flex flex-col md:grid md:grid-cols-2 items-center md:items-center justify-center md:justify-center gap-8 md:gap-0 px-6 md:px-24 py-16 pointer-events-none z-20"
        >
          <motion.div
            style={{ x: labelsXLeft }}
            className="w-full max-w-xs text-center md:text-left"
          >
            <p className="text-[10px] tracking-[0.4em] text-zinc-500 mb-3">LIFESPAN</p>
            <h3 className="font-display text-2xl md:text-3xl text-zinc-900 font-light leading-tight mb-4">
              The number of years you exist.
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["Decline", "Fatigue", "Compromise", "Reaction"].map((w) => (
                <span
                  key={w}
                  className="inline-block px-3 py-1 rounded-full border border-zinc-400/50 text-zinc-600 text-xs"
                >
                  {w}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            style={{ x: labelsXRight }}
            className="w-full max-w-xs text-center md:text-right md:ml-auto"
          >
            <p className="text-[10px] tracking-[0.4em] text-teal mb-3">HEALTHSPAN</p>
            <h3 className="font-display text-2xl md:text-3xl text-ink font-light leading-tight mb-4">
              The number of years you live.
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {["Vitality", "Energy", "Capacity", "Prevention"].map((w) => (
                <span
                  key={w}
                  className="inline-block px-3 py-1 rounded-full bg-teal/15 border border-teal/40 text-teal text-xs"
                >
                  {w}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
