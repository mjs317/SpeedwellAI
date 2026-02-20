"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

// ─── Persona data ─────────────────────────────────────────────────────────────

const personas = [
  {
    number: "01",
    title: "The Overwhelmed Owner",
    description:
      "You're doing the work of three people. You know there's a better way — you just haven't had the time to find it. We do the finding for you.",
    detail:
      "You're answering emails, managing schedules, following up on invoices, and trying to run a business at the same time. Sound familiar? We start by finding the 3-5 tasks eating the most hours, build automations for them, and free up your calendar for actual leadership.",
    services: ["CRM & Lead Follow-Up", "Scheduling & Calendar", "Invoice Processing"],
    cta: "Ready to stop doing the work of three people? →",
  },
  {
    number: "02",
    title: "The Lean Ops Team",
    description:
      "Your team is sharp but stretched thin. You need leverage, not more headcount. AI automation is the multiplier you've been looking for.",
    detail:
      "Your people are talented but buried in repetitive work that doesn't require their skills. We audit your workflows, identify where AI can act as a force multiplier, and build the systems so your team can focus on what actually matters.",
    services: ["Reporting & Data Aggregation", "Email Triage", "Customer Onboarding"],
    cta: "Give your team back their time →",
  },
  {
    number: "03",
    title: "The Scaling Company",
    description:
      "You've grown fast and your processes haven't kept up. We help you systematize what's working so your team can focus on what's next.",
    detail:
      "Growth breaks manual processes. What worked with 5 people doesn't scale to 50. We help you build automation infrastructure that scales with you — systematizing your best processes so you can grow without proportionally growing headcount.",
    services: ["CRM & Lead Follow-Up", "Customer Onboarding", "Reporting & Data Aggregation"],
    cta: "Build automation that scales with you →",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const active = personas[activeIndex];

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

        <FadeUp delay={0.1} className="text-center mb-12">
          <p className="text-[#FAFAF8]/60 text-lg max-w-2xl mx-auto leading-relaxed">
            We work with owners and operators of growing businesses — typically
            5 to 250 employees — who know they should be using AI but don&apos;t
            know where to start or who to trust.
          </p>
        </FadeUp>

        {/* Persona selector tabs */}
        <FadeUp delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-8 p-1.5 rounded-xl bg-white/[0.05] border border-white/10">
            {personas.map((persona, i) => (
              <button
                key={persona.number}
                onClick={() => setActiveIndex(i)}
                className={[
                  "flex-1 flex items-center gap-2.5 px-4 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium",
                  activeIndex === i
                    ? "bg-[#00C9A7] text-[#0F1B2D] shadow-md"
                    : "text-[#FAFAF8]/60 hover:text-[#FAFAF8] hover:bg-white/[0.05]",
                ].join(" ")}
                aria-pressed={activeIndex === i}
              >
                <span
                  className={[
                    "text-xs font-bold font-mono flex-shrink-0",
                    activeIndex === i ? "text-[#0F1B2D]/60" : "text-[#00C9A7]/60",
                  ].join(" ")}
                >
                  {persona.number}
                </span>
                {persona.title}
              </button>
            ))}
          </div>

          {/* Expanded active persona panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative overflow-hidden flex flex-col gap-5 px-7 py-8 border-l-2 border-[#00C9A7]/60 bg-white/[0.04] rounded-r-2xl"
            >
              {/* Decorative number */}
              <span
                className="absolute -top-3 -left-1 text-9xl font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(0,201,167,0.08)" }}
                aria-hidden="true"
              >
                {active.number}
              </span>

              <div className="relative">
                <h3 className="text-lg sm:text-xl font-bold text-[#FAFAF8] mb-2">
                  {active.title}
                </h3>
                <p className="text-[#FAFAF8]/60 text-sm sm:text-base leading-relaxed mb-4">
                  {active.detail}
                </p>

                {/* Relevant services */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {active.services.map((svc) => (
                    <span
                      key={svc}
                      className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-medium"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                {/* Tailored CTA */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition"
                >
                  {active.cta}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeUp>
      </div>
    </section>
  );
}
