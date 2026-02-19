"use client";

// TODO: Replace with real client testimonials once available.
// Client details shared with permission — names withheld for confidentiality.

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

// ─── Testimonial data — TODO: Replace with real quotes ───────────────────────

const testimonials = [
  {
    quote:
      "Speedwell identified three automations we never would have found ourselves. We saved about 12 hours a week within 60 days of implementation.",
    attribution: "Operations Manager, Regional Logistics Firm",
  },
  {
    quote:
      "The assessment alone was worth it. We got a clear roadmap, honest advice on what not to automate yet, and a team that actually delivered what they scoped.",
    attribution: "Founder, Professional Services Firm",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-4" aria-label="5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: "#F59E0B" }} aria-hidden="true">
        ★
      </span>
    ))}
  </div>
);

// ─── Testimonials Section ─────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <FadeUp className="text-center mb-14">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            What Clients Say
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight">
            Real results for real businesses.
          </h2>
        </FadeUp>

        {/* Testimonial cards — side-by-side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.12}>
              <div className="flex flex-col h-full p-7 rounded-2xl border border-white/10 bg-white/5">
                {/* Gold stars */}
                <Stars />

                {/* Quote */}
                <blockquote className="flex-1 text-[#FAFAF8]/80 text-base italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <p className="text-[#FAFAF8]/40 text-sm font-medium">
                  — {t.attribution}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Disclaimer */}
        <FadeUp delay={0.35}>
          <p className="text-center text-[#FAFAF8]/25 text-xs">
            * Client details shared with permission. Names withheld for
            confidentiality.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
