"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { imagery } from "@/lib/imagery";

const cards = [
  {
    quote:
      "Ageon was the first place that actually looked at my data before telling me what to do. Six months in, my energy is back and I sleep better than I have in years.",
    name: "Rajesh K.",
    role: "Entrepreneur, Kochi",
    avatar: imagery.testimonials.rajesh,
  },
  {
    quote:
      "Post-marathon recovery used to take me 3 weeks. With Ageon it's under 10 days. The cold plunge and infrared sauna together are remarkable.",
    name: "Ananya M.",
    role: "Competitive runner, Kochi",
    avatar: imagery.testimonials.ananya,
  },
  {
    quote:
      "We put the whole leadership team through the programme. Energy, focus, absence rates — all measurably better. The impact is real.",
    name: "Vivek P.",
    role: "Chief People Officer, Kochi",
    avatar: imagery.testimonials.vivek,
  },
  {
    quote:
      "I came in sceptical. Three months later I have data showing my HRV improved by 28% and my resting heart rate dropped by 8 points. Numbers don't lie.",
    name: "Suresh K.",
    role: "Cardiologist, Kochi",
    avatar: imagery.testimonials.suresh,
  },
  {
    quote:
      "The dietician and doctor work together on your protocol. It's not a one-size approach. Every month I see the data moving in the right direction.",
    name: "Priya L.",
    role: "Business owner, Kochi",
    avatar: imagery.testimonials.priya,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const next = () => setActive((a) => (a + 1) % cards.length);
  const prev = () => setActive((a) => (a - 1 + cards.length) % cards.length);

  return (
    <section className="relative py-32 px-6 md:px-12 bg-cream text-ink overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] text-ink/40 mb-4">— C8 —</p>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
            Real people.{" "}
            <span className="italic" style={{ color: "#00b09b" }}>
              Measurable outcomes.
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-[440px] md:h-[420px] flex items-center justify-center px-4">
          {cards.map((c, i) => {
            const offset = i - active;
            const isActive = offset === 0;
            return (
              <motion.div
                key={i}
                animate={{
                  x: offset * 90 + "%",
                  scale: isActive ? 1 : 0.85,
                  opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[88%] sm:w-full max-w-xl"
              >
                <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)]">
                  <svg width="40" height="40" viewBox="0 0 40 40" className="mb-6 opacity-30">
                    <path
                      d="M14 30 V18 H6 V12 Q6 6, 12 6 V10 Q10 10, 10 12 V14 H14 V30 Z M30 30 V18 H22 V12 Q22 6, 28 6 V10 Q26 10, 26 12 V14 H30 V30 Z"
                      fill="#00b09b"
                    />
                  </svg>
                  <p className="font-display text-base sm:text-xl md:text-2xl font-light text-ink leading-relaxed mb-6 sm:mb-8">
                    {c.quote}
                  </p>
                  <div className="flex items-center gap-3 pt-6 border-t border-ink/10">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display text-ink">{c.name}</p>
                      <p className="text-xs text-ink/50">{c.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-white transition flex items-center justify-center"
            aria-label="Previous"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "bg-ink w-8" : "bg-ink/30 w-1.5"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-white transition flex items-center justify-center"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
