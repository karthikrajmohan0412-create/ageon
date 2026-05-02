"use client";

import { motion } from "framer-motion";
import { LogoMark } from "../Logo";

export function Footer() {
  return (
    <footer className="relative bg-black text-white px-6 md:px-12 pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-teal blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-b border-white/10 pb-16 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <LogoMark size={56} />
            <div>
              <p className="font-display text-3xl md:text-4xl font-light tracking-[0.18em]">
                AGEON
              </p>
              <p className="text-xs tracking-[0.3em] text-white/40 mt-1">
                FEEL ALIVE. AGAIN. EVERY DAY.
              </p>
            </div>
          </div>
          <a
            href="#membership"
            className="bg-teal text-white rounded-full px-8 py-4 text-sm tracking-[0.2em] hover:bg-white hover:text-teal transition"
          >
            BEGIN YOUR JOURNEY →
          </a>
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-5">PAGES</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="hover:text-teal transition" href="#">Our story</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#pillars">Therapies</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#membership">Membership</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#location">Locations</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#">Corporate</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-5">CONTACT</p>
            <ul className="space-y-3 text-sm">
              <li className="text-white/70">
                <span className="block text-xs text-white/40 mb-1">VISIT US</span>
                Anchor Centre, NH Bypass, Kochi
              </li>
              <li className="text-white/70">
                <span className="block text-xs text-white/40 mb-1">CALL US</span>
                +91 — — — — — —
              </li>
              <li className="text-white/70">
                <span className="block text-xs text-white/40 mb-1">WRITE</span>
                <a href="mailto:hello@ageon.in" className="hover:text-teal transition">
                  hello@ageon.in
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-5">FOLLOW</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="hover:text-teal transition" href="#">Instagram ↗</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#">Facebook ↗</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#">LinkedIn ↗</a>
              </li>
              <li>
                <a className="hover:text-teal transition" href="#">YouTube ↗</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] text-white/40 mb-5">INVESTOR</p>
            <p className="text-sm text-white/70 mb-4">
              Interested in bringing Ageon to your city?
            </p>
            <a
              href="#"
              className="inline-block text-sm border-b border-teal text-teal hover:text-white hover:border-white transition pb-1"
            >
              Franchise &amp; investor enquiries →
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/40">
          <p>© 2025 Ageon Health Pvt. Ltd. · Powered by EBG Group · ageon.in</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition" href="#">Privacy</a>
            <a className="hover:text-white transition" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
