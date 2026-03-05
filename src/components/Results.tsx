"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

// ─── Scroll-triggered fade-up wrapper ────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Results / Social Proof Section ──────────────────────────────────────────

export default function Results() {
  return (
    <section
      id="results"
      className="bg-[#0F1B2D] py-20 px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAF8] leading-tight">
            What our clients are seeing.
          </h2>
        </FadeUp>

        {/* TODO: Replace with real case study once first engagement is complete */}
        <FadeUp delay={0.15}>
          <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-white/10 bg-white/[0.04]">
            {/* Industry tag */}
            <span className="inline-block px-3 py-1 rounded-full bg-[#00C9A7]/15 text-[#00C9A7] text-xs font-semibold mb-4">
              Professional Services
            </span>

            {/* Headline */}
            <h3 className="text-xl font-bold text-[#FAFAF8] mb-3">
              Coming Soon: Our First Published Case Study
            </h3>

            {/* Body */}
            <p className="text-[#FAFAF8]/60 text-sm leading-relaxed mb-6">
              We&apos;re currently wrapping up our first client engagements and
              documenting real results — hours saved, costs reduced, and
              workflows transformed. Check back soon, or book a discovery call
              to become one of our first case studies.
            </p>

            {/* CTA link */}
            <a
              href={SITE_CONFIG.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition-colors"
            >
              Book a Discovery Call →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
