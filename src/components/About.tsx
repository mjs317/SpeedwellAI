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

const credentials = [
  "Big 4 Experience",
  "AI & Automation Specialist",
  "Fixed-Price Projects",
  "Direct Founder Access",
];

// ─── About Section ────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#FAFAF8] py-24 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <FadeUp className="text-center mb-10">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase">
            About
          </p>
        </FadeUp>

        {/* Two-column layout: headshot left, text right */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16">

          {/* ── Left: Headshot placeholder ── */}
          <FadeUp delay={0.1} className="flex-shrink-0">
            {/* Replace with actual headshot: <img src="/headshot.jpg" ... /> */}
            <div
              className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#0F1B2D] border-4 border-[#00C9A7]/30 flex items-center justify-center shadow-xl shadow-black/10"
              aria-label="Founder headshot placeholder"
            >
              <span className="text-5xl font-bold text-[#00C9A7]">M</span>
            </div>
          </FadeUp>

          {/* ── Right: Copy ── */}
          <div className="flex-1 text-center md:text-left">
            <FadeUp delay={0.15}>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight mb-5">
                Built by someone who&apos;s been in the trenches.
              </h2>
            </FadeUp>

            <FadeUp delay={0.22}>
              <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-4">
                Speedwell AI was founded by Michael, a former Big 4 assurance
                professional with 7+ years of experience who saw firsthand how
                transformative the right automation could be inside enterprise
                organizations. He helped global companies identify inefficiencies,
                streamline operations, and implement technology at scale — then
                realized almost none of that thinking was reaching small and
                mid-sized businesses.
              </p>
              <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-6">
                Now an AI specialist focused exclusively on SMBs, Michael helps
                growing businesses close the gap between enterprise-grade
                automation and practical, affordable implementation — without the
                fluff, jargon, or six-figure retainers.
              </p>
            </FadeUp>

            {/* Credential badges */}
            <FadeUp delay={0.3} className="flex flex-wrap justify-center md:justify-start gap-2.5">
              {credentials.map((tag) => (
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
        </div>
      </div>
    </section>
  );
}
