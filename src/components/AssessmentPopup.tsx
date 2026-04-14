"use client";

// ─── AssessmentPopup ────────────────────────────────────────────────────────
//
// Teaser modal that sends users to /assessment. Mounted once in the root
// layout. Self-governing: decides when to show, when to suppress.
//
// Triggers (whichever fires first):
//   1. 45 seconds on the page
//   2. Scrolled past 50% of the page
//   3. Exit-intent (mouse leaves toward browser chrome) — desktop only
//
// Suppression rules (localStorage):
//   - `sw_assessment_completed` = "1" → never show again
//   - `sw_assessment_dismissed_at` = timestamp → suppress for 7 days
//
// Routes excluded: /assessment, /admin/*

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

const TIME_TRIGGER_MS = 45_000;
const SCROLL_TRIGGER_PCT = 0.5;
const DISMISS_SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const COMPLETED_KEY = "sw_assessment_completed";
const DISMISSED_KEY = "sw_assessment_dismissed_at";

function shouldSuppress(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.localStorage.getItem(COMPLETED_KEY) === "1") return true;
    const dismissedAt = Number(
      window.localStorage.getItem(DISMISSED_KEY) || 0
    );
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_SUPPRESS_MS) {
      return true;
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through and show
  }
  return false;
}

function isExcludedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname.startsWith("/assessment") || pathname.startsWith("/admin");
}

function isLikelyMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function AssessmentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  // Once fired or dismissed during this SPA session, never re-arm — even if
  // the user navigates between pages (prevents re-triggering on /assessment).
  const sessionDoneRef = useRef(false);

  // Decide eligibility on every route change. Important: this must also
  // DISARM when we land on an excluded route (otherwise a previously-armed
  // popup will keep firing on /assessment after client-side navigation).
  useEffect(() => {
    if (sessionDoneRef.current) {
      setArmed(false);
      return;
    }
    if (isExcludedPath(pathname)) {
      setArmed(false);
      return;
    }
    if (shouldSuppress()) {
      setArmed(false);
      return;
    }
    setArmed(true);
  }, [pathname]);

  // Wire up the three triggers
  useEffect(() => {
    if (!armed || open) return;
    // Defensive double-check — if suppression was set asynchronously
    // (e.g. via another tab), don't fire.
    if (shouldSuppress()) {
      setArmed(false);
      return;
    }

    let cancelled = false;
    const fire = () => {
      if (cancelled) return;
      cancelled = true;
      sessionDoneRef.current = true;
      setArmed(false);
      setOpen(true);
    };

    const timeoutId = window.setTimeout(fire, TIME_TRIGGER_MS);

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= SCROLL_TRIGGER_PCT) {
        fire();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let onMouseOut: ((e: MouseEvent) => void) | null = null;
    if (!isLikelyMobile()) {
      onMouseOut = (e: MouseEvent) => {
        // Mouse left toward the top of the viewport (browser chrome)
        if (!e.relatedTarget && e.clientY <= 8) {
          fire();
        }
      };
      document.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
      if (onMouseOut) document.removeEventListener("mouseout", onMouseOut);
    };
  }, [armed, open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function dismiss() {
    try {
      window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      /* noop */
    }
    sessionDoneRef.current = true;
    setArmed(false);
    setOpen(false);
  }

  function handleCtaClick() {
    // Treat clicking through as engagement — suppress the same way as
    // dismissal so the modal doesn't reappear during this visit (or on
    // subsequent pages via client-side navigation).
    try {
      window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      /* noop */
    }
    sessionDoneRef.current = true;
    setArmed(false);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 bg-black/65 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="assessment-popup-title"
        >
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-[#0F1B2D] border border-[#00C9A7]/30 shadow-2xl shadow-black/50 p-7 sm:p-8 text-[#FAFAF8]"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-md text-[#FAFAF8]/50 hover:text-[#FAFAF8] hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-[11px] font-semibold tracking-wide uppercase mb-4">
              <Sparkles size={12} />
              Free · 3 minutes
            </span>

            <h2
              id="assessment-popup-title"
              className="text-2xl sm:text-[1.7rem] font-bold leading-tight mb-3"
            >
              How ready is your business for{" "}
              <span className="text-[#00C9A7]">AI automation?</span>
            </h2>

            <p className="text-sm text-[#FAFAF8]/70 leading-relaxed mb-6">
              Take our free AI Readiness Scorecard and get a personalized
              report with your score and 2&ndash;3 specific automations to start
              with. Delivered to your inbox in seconds.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/assessment"
                onClick={handleCtaClick}
                className="inline-flex justify-center items-center gap-1.5 px-6 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors shadow-lg shadow-[#00C9A7]/20"
              >
                Get My AI Readiness Score
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="text-[#FAFAF8]/55 text-xs font-medium hover:text-[#FAFAF8]/85 transition-colors"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
