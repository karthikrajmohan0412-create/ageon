"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { imagery } from "@/lib/imagery";

export function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.6, 0.3]);

  return (
    <section
      id="location"
      ref={ref}
      className="relative min-h-[80vh] overflow-hidden bg-ink text-white"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,176,155,0.4),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,202,5,0.15),transparent_50%)]"
      />
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <p className="text-xs tracking-[0.4em] text-teal mb-4">— C7 / VISIT —</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-6xl font-light leading-tight">
              Find us in
              <br />
              <span className="italic text-teal">Kochi.</span>
            </h2>
            <p className="text-white/60 mt-6 max-w-md">
              The first Ageon centre is in Kerala&apos;s most vibrant city. Anchor Centre, NH Bypass.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-baseline gap-4">
                <span className="text-white/40 text-xs tracking-[0.3em] w-20">VISIT</span>
                <span className="text-white">Anchor Centre, NH Bypass, Kochi</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-white/40 text-xs tracking-[0.3em] w-20">CALL</span>
                <span className="text-white">+91 — — — — — —</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-white/40 text-xs tracking-[0.3em] w-20">WRITE</span>
                <a
                  href="mailto:hello@ageon.in"
                  className="text-teal hover:text-white transition"
                >
                  hello@ageon.in
                </a>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-teal text-white rounded-full px-5 sm:px-6 py-3 text-xs sm:text-sm tracking-[0.2em] hover:bg-white hover:text-teal transition">
                BOOK A VISIT →
              </button>
              <button className="border border-white/30 rounded-full px-5 sm:px-6 py-3 text-xs sm:text-sm tracking-[0.2em] hover:border-white transition">
                CALL US
              </button>
            </div>
          </div>

          {/* Location photo card */}
          <div className="relative h-[420px] rounded-3xl overflow-hidden border border-white/10">
            <img
              src={imagery.location.kochi}
              alt="Kochi"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,176,155,0.15),transparent)]" />

            {/* Pulse pin */}
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-[42%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-teal shadow-[0_0_40px_rgba(0,176,155,0.9)] ring-4 ring-teal/30"
            />

            {/* Address card */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] tracking-[0.3em] text-teal mb-1">AGEON KOCHI</p>
              <p className="text-white text-sm">Anchor Centre, NH Bypass</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
