"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Essential",
    cadence: "Once a month",
    accent: "text-white/70",
  },
  {
    name: "Optimal",
    cadence: "Twice a month",
    accent: "text-teal",
    featured: true,
  },
  {
    name: "Ultimate",
    cadence: "Three times a month",
    accent: "text-white/70",
  },
];

const features = [
  "Physician consultation",
  "Dietician guidance",
  "Full diagnostics",
  "Complete therapy access",
];

export function Membership() {
  return (
    <section
      id="membership"
      className="relative py-20 md:py-32 px-6 md:px-16 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.1]">
            Three plans.
            <span className="block italic text-white/55 mt-1">
              A continuous journey.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative bg-black p-8 md:p-10 flex flex-col ${
                p.featured ? "md:-my-4" : ""
              }`}
            >
              <p
                className={`text-[10px] md:text-xs tracking-[0.4em] mb-4 ${p.accent}`}
              >
                {p.name.toUpperCase()}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-8">
                {p.cadence}
              </h3>
              <ul className="space-y-3 border-t border-white/10 pt-6">
                {features.map((f) => (
                  <li
                    key={f}
                    className={`text-sm ${
                      p.featured ? "text-white/80" : "text-white/55"
                    }`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
