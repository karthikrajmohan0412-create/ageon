"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "A deep diagnostic. Bloodwork, ECG, HRV, body composition, lifestyle. We see you in data, not assumption.",
  },
  {
    n: "02",
    title: "Design",
    body: "A protocol built around your numbers. Therapies, nutrition, recovery — sequenced for the result you want.",
  },
  {
    n: "03",
    title: "Deliver",
    body: "Sessions delivered by a clinical team. Cold plunge, infrared sauna, PEMF, red light, hydrogen — applied precisely.",
  },
  {
    n: "04",
    title: "Measure",
    body: "Every visit logged. Every marker tracked. You see the line move week over week.",
  },
  {
    n: "05",
    title: "Adapt",
    body: "Your plan changes as you do. Doctor and dietician check in monthly. The protocol evolves with your life.",
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [range, setRange] = useState({ start: 0, end: 1 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + el.offsetHeight;
      setRange({ start: top, end: bottom - window.innerHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const progress = useTransform(scrollY, [range.start, range.end], [0, 1], { clamp: true });
  const rotation = useTransform(progress, [0, 1], [0, 360]);
  const counterRotation = useTransform(rotation, (v) => -v);

  // Auto-advance the active step based on scroll progress
  useEffect(() => {
    return progress.on("change", (v) => {
      const idx = Math.min(steps.length - 1, Math.floor(v * steps.length));
      setActive(idx);
    });
  }, [progress]);

  return (
    <section
      ref={ref}
      className="relative bg-black text-white"
      style={{ height: `${steps.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,176,155,0.15),transparent_50%)]" />
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 py-16 md:py-0">
          {/* LEFT — orbiting step icons (hidden on mobile to save space) */}
          <div className="relative h-[280px] md:h-[400px] hidden md:flex items-center justify-center">
            <motion.div style={{ rotate: rotation }} className="relative w-[340px] h-[340px]">
              {steps.map((s, i) => {
                const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
                const r = 140;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                const isActive = i === active;
                return (
                  <button
                    key={s.n}
                    onClick={() => setActive(i)}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <motion.div
                      style={{ rotate: counterRotation }}
                      animate={{
                        scale: isActive ? 1.25 : 1,
                        backgroundColor: isActive ? "#00b09b" : "rgba(255,255,255,0.06)",
                      }}
                      className="w-16 h-16 rounded-full flex items-center justify-center font-display text-lg border border-white/20 backdrop-blur-sm"
                    >
                      {s.n}
                    </motion.div>
                  </button>
                );
              })}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-teal/30 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.3em] text-white/50">YOUR</p>
                  <p className="font-display text-xl">Path</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — step content */}
          <div className="relative max-h-full overflow-y-auto scrollbar-hide">
            <p className="text-xs tracking-[0.4em] text-teal mb-3">— C4 / WHAT HAPPENS —</p>
            <h2 className="font-display text-2xl md:text-5xl font-light leading-tight mb-6 md:mb-8">
              Begin your <span className="italic text-teal">transformation</span>.
              <span className="block text-white/60 text-lg md:text-2xl mt-2">
                Personalised. Step by step.
              </span>
            </h2>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => setActive(i)}
                  className={`block w-full text-left p-4 rounded-2xl border transition-all ${
                    i === active
                      ? "border-teal bg-teal/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs ${
                        i === active ? "text-teal" : "text-white/40"
                      }`}
                    >
                      {s.n}
                    </span>
                    <h3 className="font-display text-lg font-light">{s.title}</h3>
                  </div>
                  {i === active && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 text-white/70 text-sm leading-relaxed pl-8"
                    >
                      {s.body}
                    </motion.p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
