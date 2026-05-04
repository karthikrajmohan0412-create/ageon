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
  // Title fully clears before the labels start appearing, so they never
  // sit on top of each other.
  const titleOpacity = useTransform(progress, [0, 0.5, 0.68], [1, 1, 0]);
  const labelsOpacity = useTransform(progress, [0.7, 0.92], [0, 1]);
  const labelsXRight = useTransform(progress, [0.7, 0.92], [40, 0]);
  const labelsXLeft = useTransform(progress, [0.7, 0.92], [-40, 0]);
  // Title gets a dark text-shadow halo to read against the helix; once
  // the cream background has taken over there's no helix to read against
  // and the heavy shadow looks weighty, so fade its alpha to 0.
  const shadowAlpha = useTransform(progress, [0.32, 0.55], [1, 0]);
  const titleShadow = useTransform(
    shadowAlpha,
    (a) =>
      `0 1px 3px rgba(0,0,0,${0.95 * a}), 0 4px 14px rgba(0,0,0,${
        0.85 * a
      }), 0 8px 32px rgba(0,0,0,${0.6 * a})`,
  );
  const eyebrowShadow = useTransform(
    shadowAlpha,
    (a) =>
      `0 1px 4px rgba(0,0,0,${0.9 * a}), 0 0 16px rgba(0,0,0,${0.6 * a})`,
  );

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
              textShadow: eyebrowShadow,
            }}
          >
            — LONGEVITY —
          </motion.p>
          {/* Stacked text-shadow creates a soft halo that follows the
              letterforms — readable against the helix, no hard-edged
              scrim patch on the background. The shadow alpha fades out
              as the cream background arrives. */}
          <motion.h2
            className="font-display text-3xl md:text-7xl font-light max-w-4xl mx-auto leading-[1.05] px-4"
            style={{
              color: titleColor,
              textShadow: titleShadow,
            }}
          >
            Longevity is <span className="italic">not</span> measured in years.
          </motion.h2>
        </motion.div>

        <motion.div
          style={{ opacity: labelsOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-24 py-16 pointer-events-none z-20"
        >
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-2 gap-4 md:gap-12 border-b border-zinc-400/30 pb-3 mb-1">
              <motion.p
                style={{ x: labelsXLeft }}
                className="text-[10px] md:text-xs tracking-[0.4em] text-zinc-500"
              >
                LIFESPAN
              </motion.p>
              <motion.p
                style={{ x: labelsXRight }}
                className="text-[10px] md:text-xs tracking-[0.4em] text-teal"
              >
                HEALTHSPAN
              </motion.p>
            </div>
            {[
              {
                left: "Built to manage illness, not aliveness",
                right: (
                  <>
                    Energy that makes you feel{" "}
                    <span className="text-teal">truly</span> alive
                  </>
                ),
              },
              {
                left: "Years that accumulate",
                right: "A life that gives you confidence",
              },
              {
                left: "Living with decline",
                right: "Living without limits. Every day.",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-4 md:gap-12 border-b border-zinc-400/20 py-4 md:py-6"
              >
                <motion.p
                  style={{ x: labelsXLeft }}
                  className="font-display italic text-zinc-500 text-sm md:text-lg leading-snug"
                >
                  {row.left}
                </motion.p>
                <motion.p
                  style={{ x: labelsXRight }}
                  className="font-display text-ink text-sm md:text-lg leading-snug"
                >
                  {row.right}
                </motion.p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
