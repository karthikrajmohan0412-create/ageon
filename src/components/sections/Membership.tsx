"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Discover",
    price: "Day Pass",
    sub: "A single visit. See the space. Try a therapy.",
    accent: "#FFCA05",
    highlights: [
      "Full diagnostic intro",
      "One signature therapy",
      "Personalised recommendation",
    ],
  },
  {
    name: "Restore",
    price: "Quarterly",
    sub: "12 weeks of guided protocol. Designed to move the data.",
    accent: "#00b09b",
    featured: true,
    highlights: [
      "Bi-weekly therapy sessions",
      "Doctor + dietician check-ins",
      "Quarterly diagnostic re-test",
      "Recovery + sleep tracking",
    ],
  },
  {
    name: "Ageon",
    price: "Annual",
    sub: "A year of total care. The full continuous journey.",
    accent: "#C3161C",
    highlights: [
      "Unlimited therapy access",
      "Monthly clinical review",
      "Quarterly bloodwork",
      "Personal longevity strategist",
    ],
  },
];

export function Membership() {
  return (
    <section id="membership" className="relative py-20 md:py-32 px-4 md:px-12 bg-cream text-ink">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.4em] text-ink/40 mb-4">— C6 / MEMBERSHIP —</p>
          <h2 className="font-display text-3xl md:text-6xl font-light leading-tight">
            Three plans.
            <br />
            <span className="italic" style={{ color: "#00b09b" }}>
              A continuous journey.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[480px] ${
                p.featured
                  ? "text-white shadow-2xl scale-[1.02]"
                  : "bg-white text-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)]"
              }`}
              style={{
                background: p.featured ? p.accent : undefined,
              }}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink text-white text-[10px] tracking-[0.3em] px-3 py-1.5 rounded-full">
                  MOST CHOSEN
                </div>
              )}
              <div>
                <p
                  className={`text-xs tracking-[0.3em] mb-3 ${
                    p.featured ? "text-white/70" : "text-ink/40"
                  }`}
                >
                  {p.price.toUpperCase()}
                </p>
                <h3
                  className="font-display text-4xl md:text-5xl font-light"
                  style={{ color: p.featured ? "white" : p.accent }}
                >
                  {p.name}
                </h3>
                <p
                  className={`mt-3 text-sm ${
                    p.featured ? "text-white/80" : "text-ink/60"
                  }`}
                >
                  {p.sub}
                </p>
              </div>

              <ul className="my-8 space-y-3">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className={`flex items-start gap-3 text-sm ${
                      p.featured ? "text-white/90" : "text-ink/80"
                    }`}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: p.featured ? "white" : p.accent,
                      }}
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-full py-3.5 text-sm tracking-[0.2em] transition ${
                  p.featured
                    ? "bg-white text-ink hover:bg-ink hover:text-white"
                    : "bg-ink text-white hover:bg-teal"
                }`}
              >
                BEGIN →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
