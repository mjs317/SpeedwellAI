"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Persona data — icons removed, numbers used instead ──────────────────────

const personas = [
  {
    number: "01",
    title: "The Overwhelmed Owner",
    description:
      "You're doing the work of three people. You know there's a better way — you just haven't had the time to find it. We do the finding for you.",
  },
  {
    number: "02",
    title: "The Lean Ops Team",
    description:
      "Your team is sharp but stretched thin. You need leverage, not more headcount. AI automation is the multiplier you've been looking for.",
  },
  {
    number: "03",
    title: "The Scaling Company",
    description:
      "You've grown fast and your processes haven't kept up. We help you systematize what's working so your team can focus on what's next.",
  },
];

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

// ─── Who We Work With ─────────────────────────────────────────────────────────

export default function WhoWeWorkWith() {
  return (
    <section
      id="who-we-work-with"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-6">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Who We Work With
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight">
            Built for the operators in the middle.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} className="text-center mb-16">
          <p className="text-[#FAFAF8]/60 text-lg max-w-2xl mx-auto leading-relaxed">
            We work with owners and operators of growing businesses — typically
            5 to 250 employees — who know they should be using AI but don&apos;t
            know where to start or who to trust.
          </p>
        </FadeUp>

        {/* Persona cards — left-border style, numbered, distinct from service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <FadeUp key={persona.number} delay={0.15 + i * 0.1}>
              <div className="relative overflow-hidden flex flex-col gap-3 px-6 py-7 border-l-2 border-[#00C9A7]/50 bg-white/[0.04] rounded-r-xl hover:bg-white/[0.07] hover:border-[#00C9A7]/80 transition-colors duration-300">
                {/* Large decorative number — low-opacity teal, background element */}
                <span
                  className="absolute -top-3 -left-1 text-8xl font-bold leading-none select-none pointer-events-none"
                  style={{ color: "rgba(0,201,167,0.10)" }}
                  aria-hidden="true"
                >
                  {persona.number}
                </span>

                {/* Content sits above the number */}
                <h3 className="relative text-base font-bold text-[#FAFAF8] mt-1">
                  {persona.title}
                </h3>
                <p className="relative text-sm text-[#FAFAF8]/55 leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
