"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SpeedwellLogo } from "@/components/SpeedwellLogo";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** Minimal sticky nav with blur-on-scroll, mobile drawer, and mobile bottom CTA bar */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      setPastHero(window.scrollY > 500); // show bottom bar after scrolling past hero
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0F1B2D]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* ── Logo ── */}
          <a href="#" className="flex items-center" aria-label="Speedwell AI home">
            <SpeedwellLogo variant="dark" size="1.1rem" />
          </a>

          {/* ── Desktop links ── */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#FAFAF8]/70 hover:text-[#FAFAF8] transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA + Mobile toggle ── */}
          <div className="flex items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-[#00C9A7] text-[#0F1B2D] text-sm font-semibold hover:bg-[#00a88c] transition-colors duration-200"
            >
              Book a Free Call
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-[#FAFAF8] p-1"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0F1B2D] border-t border-white/10 px-6 py-6 flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-[#FAFAF8] text-base font-medium hover:text-[#00C9A7] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="mt-2 inline-flex justify-center items-center px-4 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold hover:bg-[#00a88c] transition-colors"
            >
              Book a Free Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile sticky bottom CTA bar — appears after scrolling past hero ── */}
      <AnimatePresence>
        {pastHero && !mobileOpen && (
          <motion.div
            key="mobile-bottom-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F1B2D]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-area-inset-bottom"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-6 py-3.5 rounded-xl bg-[#00C9A7] text-[#0F1B2D] text-sm font-bold hover:bg-[#00a88c] transition-colors duration-200 shadow-lg shadow-[#00C9A7]/20"
            >
              Book a Free Call — 30 min, no commitment
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
