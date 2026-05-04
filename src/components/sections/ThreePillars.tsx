"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { imagery } from "@/lib/imagery";

const pillars = [
  {
    title: "Prevention",
    subtitle: "Stop decline before it starts.",
    detail: "Maintain vitality before decline begins.",
    accent: "#00b09b",
    image: imagery.pillars.prevention,
    therapies: [
      "Red Light Therapy",
      "PEMF",
      "Hydrogen Inhalation",
      "ECG & HRV",
      "Smart Health Checkup",
    ],
  },
  {
    title: "Regeneration",
    subtitle: "Rebuild what has been lost.",
    detail: "Restore your capacity to recover and perform.",
    accent: "#FFCA05",
    image: imagery.pillars.regeneration,
    therapies: [
      "Arctic Cold Plunge",
      "Far Infrared Sauna",
      "Air Compression",
      "Massage Chair",
    ],
  },
  {
    title: "Adaptation",
    subtitle: "Keep your body responding.",
    detail: "A plan that evolves as you do.",
    accent: "#C3161C",
    image: imagery.pillars.adaptation,
    therapies: [
      "Doctor Consultation",
      "Dietician Consultation",
      "Diet Plan",
      "Follow Up",
    ],
  },
];

export function ThreePillars() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="pillars" className="relative py-20 md:py-32 px-4 md:px-12" style={{ background: "#f6f1e7" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl md:text-6xl text-ink font-light leading-tight max-w-3xl mx-auto">
            What we do to add{" "}
            <span className="italic" style={{ color: "#00b09b" }}>
              life
            </span>{" "}
            to your years.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              onClick={() => setFlipped(flipped === i ? null : i)}
              className={`flip-card h-[440px] sm:h-[460px] cursor-pointer ${flipped === i ? "is-flipped" : ""}`}
            >
              <div className="flip-card-inner relative w-full h-full">
                {/* Front */}
                <div
                  className="flip-face absolute inset-0 rounded-3xl overflow-hidden flex flex-col bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]"
                  style={{ borderTop: `3px solid ${p.accent}` }}
                >
                  {/* Photo */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, transparent 40%, ${p.accent}22 100%)`,
                      }}
                    />
                    <p className="absolute top-4 left-4 text-xs tracking-[0.3em] text-white drop-shadow-md">
                      0{i + 1}
                    </p>
                  </div>
                  {/* Body */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                    <p className="text-ink/70 text-sm leading-relaxed">
                      {p.detail}
                    </p>
                    <div className="mt-6">
                      <h3
                        className="font-display text-3xl md:text-4xl font-light"
                        style={{ color: p.accent }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-ink/60 text-sm mt-1">{p.subtitle}</p>
                      <p className="text-[10px] text-ink/30 tracking-[0.3em] mt-4">
                        TAP / HOVER →
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="flip-face flip-back absolute inset-0 rounded-3xl p-8 flex flex-col justify-center"
                  style={{ background: p.accent }}
                >
                  <p className="text-white/70 text-xs tracking-[0.3em] mb-6">
                    THERAPIES
                  </p>
                  <ul className="space-y-3">
                    {p.therapies.map((t, j) => (
                      <li
                        key={t}
                        className="text-white text-lg font-light flex items-baseline gap-3 border-b border-white/20 pb-2"
                      >
                        <span className="text-xs text-white/60">
                          0{j + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarIcon({ index, color }: { index: number; color: string }) {
  if (index === 0)
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="2" />
        <circle cx="20" cy="20" r="6" fill={color} />
      </svg>
    );
  if (index === 1)
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M8 28 L20 8 L32 28 Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M14 28 L20 18 L26 28 Z" fill={color} />
      </svg>
    );
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M6 20 Q 13 8, 20 20 T 34 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <circle cx="20" cy="20" r="3" fill={color} />
    </svg>
  );
}
