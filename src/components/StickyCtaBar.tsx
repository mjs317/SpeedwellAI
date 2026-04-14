"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    // Show bar after user scrolls past ~65% of the page
    const handleScroll = () => {
      if (dismissed || hasShown.current) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total > 0.65) {
        setVisible(true);
        hasShown.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F1B2D] border-t border-white/10 shadow-2xl"
          role="complementary"
          aria-label="Sticky call to action"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Text — hidden on very small screens */}
            <p className="hidden sm:block text-[#FAFAF8]/80 text-sm font-medium">
              Ready to see what AI can automate?
            </p>

            <div className="flex items-center gap-3 ml-auto">
              <a
                href={SITE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors duration-200 whitespace-nowrap"
              >
                Book a Free Call
              </a>

              {/* Dismiss button */}
              <button
                onClick={() => {
                  setVisible(false);
                  setDismissed(true);
                }}
                aria-label="Dismiss"
                className="p-1.5 rounded-md text-[#FAFAF8]/40 hover:text-[#FAFAF8]/80 hover:bg-white/8 transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
