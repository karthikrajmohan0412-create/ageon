"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { imagery } from "@/lib/imagery";

const stats = [
  {
    value: 87,
    suffix: "%",
    label: "Energy and cognitive performance",
    sub: "Sustained recovery between sessions.",
  },
  {
    value: 34,
    suffix: "%",
    label: "Inflammation markers",
    sub: "Measurable improvement in metabolic health.",
  },
  {
    value: 62,
    suffix: "%",
    label: "Sleep quality and recovery speed",
    sub: "Improved HRV — a direct measure of your body's resilience.",
  },
  {
    value: 3,
    suffix: "×",
    label: "Habits that sustain",
    sub: "Long after you begin.",
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
    <span ref={ref} className="font-display text-5xl md:text-8xl font-light tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-teal">{suffix}</span>
    </span>
  );
}

export function Witness() {
  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,rgba(255,202,5,0.15),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-3xl md:text-6xl font-light leading-tight max-w-4xl mx-auto">
            Here&apos;s what you&apos;ll witness at Ageon.
            <span className="block italic text-white/55 mt-2 md:mt-3">
              Through the journey.
            </span>
          </h2>
          <p className="text-white/50 mt-6 max-w-xl mx-auto">
            Measurable, science-based improvements within days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9 }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src={imagery.witness.lifestyle}
                alt="Active recovery"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] tracking-[0.3em] text-teal mb-2">— LIVED —</p>
                <p className="text-white text-base font-light">
                  Vitality is a curve you can move. We help you bend it back.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats column */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex flex-col gap-3 border-t border-white/10 pt-6"
              >
                <Counter to={s.value} suffix={s.suffix} />
                <h3 className="font-display text-xl md:text-2xl font-light text-white">
                  {s.label}
                </h3>
                <p className="text-white/50 text-sm">{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
