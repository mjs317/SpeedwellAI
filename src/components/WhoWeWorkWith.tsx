"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
// ─── Persona data ─────────────────────────────────────────────────────────────

const personas = [
  {
    number: "01",
    title: "The Overwhelmed Owner",
    description:
      "You're doing the work of three people. You know there's a better way — you just haven't had the time to find it. We do the finding for you.",
    services: ["CRM & Lead Follow-Up", "Scheduling & Calendar", "Invoice Processing"],
    ctaHref: "/assessment?utm_source=persona&utm_content=overwhelmed-owner",
  },
  {
    number: "02",
    title: "The Lean Ops Team",
    description:
      "Your team is sharp but stretched thin. You need leverage, not more headcount. AI automation is the multiplier you've been looking for.",
    services: ["Reporting & Data", "Email Triage", "Customer Onboarding"],
    ctaHref: "/assessment?utm_source=persona&utm_content=lean-ops",
  },
  {
    number: "03",
    title: "The Scaling Company",
    description:
      "You've grown fast and your processes haven't kept up. We help you systematize what's working so your team can focus on what's next.",
    services: ["CRM & Lead Follow-Up", "Customer Onboarding", "Reporting & Data"],
    ctaHref: "/assessment?utm_source=persona&utm_content=scaling-company",
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
      className="bg-[#0F1B2D] py-16 px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-4">
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

        {/* 3 always-visible cards — side-by-side desktop, stacked mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {personas.map((persona, i) => (
            <FadeUp key={persona.number} delay={0.12 + i * 0.1}>
              <div className="h-full flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-[#00C9A7]/30 transition-colors duration-300">
                {/* Number */}
                <span className="text-xs font-bold font-mono text-[#00C9A7]/60 mb-3">
                  {persona.number}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-[#FAFAF8] mb-3">
                  {persona.title}
                </h3>

                {/* Description */}
                <p className="text-[#FAFAF8]/55 text-sm leading-relaxed flex-1 mb-4">
                  {persona.description}
                </p>

                {/* Service tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {persona.services.map((svc) => (
                    <span
                      key={svc}
                      className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-medium"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={persona.ctaHref}
                  className="text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition"
                >
                  See what we&apos;d automate for you →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
