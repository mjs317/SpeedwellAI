"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

// ─── About Section ────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#FAFAF8] py-24 px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <FadeUp className="text-center mb-10">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase">
            About
          </p>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight mb-6 text-center">
            Built by someone who&apos;s been in the trenches.
          </h2>
        </FadeUp>

        {/* Bio copy — no placeholder brackets, plain body weight */}
        <FadeUp delay={0.2}>
          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-5 text-center">
            Speedwell AI was founded by Michael, a Big 4 assurance professional
            and AI specialist who saw firsthand how much time and money small
            businesses lose to manual, repetitive work.
          </p>
          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed text-center">
            We exist to close that gap — with practical tools, real
            implementations, and zero fluff. No enterprise jargon, no
            six-figure retainers, no consultants who disappear after the
            slide deck.
          </p>
        </FadeUp>

        {/* Trust signal pill tags */}
        <FadeUp delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "Fixed-price projects",
            "No long-term lock-in",
            "Real implementations",
            "Human support",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-semibold"
            >
              <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
              {tag}
            </span>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
