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
  "Big 4 Background",
  "Former Business Owners",
  "AI & Automation Specialists",
  "Fixed-Price Projects",
];

// ─── About Section ────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#FAFAF8] py-24 px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section label */}
        <FadeUp className="mb-10">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase">
            About
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight mb-5">
            Built by people who&apos;ve been on both sides of the table.
          </h2>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-8">
            Our team brings together former business owners and Big 4 AI
            consultants who spent years helping large enterprises streamline
            operations — and watched that same thinking never reach the
            businesses that needed it most. Small and mid-sized businesses were
            either handed tools with no implementation support, or quoted
            six-figure retainers they couldn&apos;t justify. We started
            Speedwell to close that gap: enterprise-grade automation strategy,
            delivered directly, at a price that makes sense for a business your
            size.
          </p>
        </FadeUp>

        {/* Credential badges */}
        <FadeUp delay={0.26} className="flex flex-wrap justify-center gap-2.5">
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
    </section>
  );
}
