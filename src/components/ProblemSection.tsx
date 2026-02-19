"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// ─── Reusable scroll-triggered fade-up wrapper ────────────────────────────────

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

// ─── Stats data ───────────────────────────────────────────────────────────────

const stats = [
  {
    figure: "40%",
    label: "of business tasks can be automated today",
  },
  {
    figure: "20+ hrs",
    label: "per week lost to manual work in the average SMB",
  },
  {
    figure: "90 days",
    label: "typical timeline to measurable ROI",
  },
];

// ─── Problem / Credibility Bar ────────────────────────────────────────────────

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative bg-[#FAFAF8] py-24 px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Main copy */}
        <FadeUp>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F1B2D] leading-snug text-center max-w-3xl mx-auto">
            Most businesses are leaving{" "}
            <span className="text-[#00C9A7]">hours on the table</span> every
            week.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-6 text-center">
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Invoicing. Follow-ups. Scheduling. Document processing. These
            aren&apos;t problems you need to live with — they&apos;re
            opportunities waiting to be automated.
          </p>
        </FadeUp>

        {/* Stats row — single col on mobile, 3-col on md+ */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {stats.map((stat, i) => (
            <FadeUp key={stat.figure} delay={0.15 + i * 0.1}>
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-bold text-[#0F1B2D] tracking-tight">
                  {stat.figure}
                </p>
                <p className="mt-2 text-sm text-[#6B7280] leading-snug">
                  {stat.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
