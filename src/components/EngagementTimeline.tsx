"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipboardList, FileText, Wrench, TrendingUp } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/speedwellai/discovery";

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

// ─── Stage data ───────────────────────────────────────────────────────────────

const stages = [
  {
    icon: ClipboardList,
    label: "Discovery",
    timing: "Week 1–2",
    description:
      "We audit your workflows, tools, and pain points. You get a prioritized automation roadmap.",
  },
  {
    icon: FileText,
    label: "Roadmap",
    timing: "Week 2–3",
    description:
      "We scope the project, agree on fixed pricing, and get to work — no surprises.",
  },
  {
    icon: Wrench,
    label: "Implementation",
    timing: "Week 3–8",
    description:
      "We build, test, and deploy your automations. Your team gets trained. Everything is documented.",
  },
  {
    icon: TrendingUp,
    label: "Optimization",
    timing: "Ongoing",
    description:
      "Monthly retainer: new builds, monitoring, quarterly reviews, and dedicated support.",
  },
];

// ─── Engagement Timeline Section ──────────────────────────────────────────────

export default function EngagementTimeline() {
  return (
    <section
      id="timeline"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <FadeUp className="text-center mb-16">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            How Engagements Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight">
            From first call to running automations.
          </h2>
        </FadeUp>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-[2.6rem] left-0 right-0 h-px"
            style={{ background: "rgba(0,201,167,0.25)" }}
            aria-hidden="true"
          />

          {/* Mobile connector line */}
          <div
            className="lg:hidden absolute top-0 bottom-0 left-[1.6rem] w-px"
            style={{ background: "rgba(0,201,167,0.25)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <FadeUp key={stage.label} delay={0.1 + i * 0.12}>
                  {/* Mobile: row layout with left icon column */}
                  <div className="flex lg:flex-col items-start gap-5 lg:gap-0 lg:items-center lg:text-center">
                    {/* Icon circle */}
                    <div className="relative flex-shrink-0 w-[3.25rem] h-[3.25rem] rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/40 flex items-center justify-center z-10">
                      <Icon size={20} className="text-[#00C9A7]" />
                    </div>

                    {/* Content */}
                    <div className="lg:mt-6 flex-1">
                      <p className="text-[#00C9A7] text-xs font-semibold tracking-widest uppercase mb-1">
                        {stage.timing}
                      </p>
                      <h3 className="text-base font-bold text-[#FAFAF8] mb-2">
                        {stage.label}
                      </h3>
                      <p className="text-sm text-[#FAFAF8]/50 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeUp delay={0.55} className="text-center mt-16">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold hover:bg-[#00a88c] transition-colors duration-200 shadow-lg shadow-[#00C9A7]/20"
          >
            Book Your Free Discovery Call
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
