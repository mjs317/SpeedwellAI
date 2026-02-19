"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Settings, TrendingUp } from "lucide-react";

// ─── Persona data ─────────────────────────────────────────────────────────────

const personas = [
  {
    icon: Zap,
    title: "The Overwhelmed Owner",
    description:
      "You're doing the work of three people. You know there's a better way — you just haven't had the time to find it. We do the finding for you.",
  },
  {
    icon: Settings,
    title: "The Lean Ops Team",
    description:
      "Your team is sharp but stretched thin. You need leverage, not more headcount. AI automation is the multiplier you've been looking for.",
  },
  {
    icon: TrendingUp,
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

        {/* Persona cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {personas.map((persona, i) => {
            const Icon = persona.icon;
            return (
              <FadeUp key={persona.title} delay={0.15 + i * 0.1}>
                <div className="flex flex-col gap-4 p-7 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C9A7]/30 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-xl bg-[#00C9A7]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[#00C9A7]" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-[#FAFAF8]">
                    {persona.title}
                  </h3>
                  <p className="text-sm text-[#FAFAF8]/55 leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
