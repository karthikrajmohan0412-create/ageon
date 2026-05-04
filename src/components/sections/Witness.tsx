"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  {
    value: 87,
    suffix: "%",
    arrow: "↑",
    label: "Energy and cognitive performance",
    sub: "Sustained recovery between sessions",
  },
  {
    value: 34,
    suffix: "%",
    arrow: "↓",
    label: "Inflammation markers",
    sub: "Measurable improvement in metabolic health",
  },
  {
    value: 62,
    suffix: "%",
    arrow: "↑",
    label: "Sleep quality and recovery speed",
    sub: "Improved HRV — a direct measure of your body's resilience",
  },
  {
    value: 3,
    suffix: "×",
    arrow: "→",
    label: "Habits that sustain",
    sub: "Long after you begin",
  },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, count, to]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl font-light tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-white/80">{suffix}</span>
    </span>
  );
}

export function Witness() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 bg-[#0c2421] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,rgba(0,176,155,0.18),transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-display text-3xl md:text-6xl font-light leading-[1.1] max-w-4xl">
            Here&apos;s what you&apos;ll witness at Ageon.
            <span className="block italic text-white/55 mt-2">
              Through the journey.
            </span>
          </h2>
          <p className="text-white/50 mt-6 max-w-xl text-sm md:text-base">
            Measurable, science-based improvements within days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-10 md:gap-y-14 border-t border-white/10 pt-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="text-teal text-2xl md:text-3xl font-light leading-none">
                {s.arrow}
              </span>
              <Counter to={s.value} suffix={s.suffix} />
              <h3 className="font-semibold text-base md:text-lg text-white mt-1">
                {s.label}
              </h3>
              <p className="text-white/50 text-sm">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
