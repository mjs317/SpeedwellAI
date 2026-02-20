"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

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

// ─── Testimonial data ─────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "Speedwell identified three automations we never would have found ourselves — invoice processing, lead follow-up sequences, and weekly reporting. We cut 12 hours of manual work per week within 60 days, and the ROI paid for the entire project in under 3 months.",
    name: "Operations Manager",
    company: "Regional Logistics Firm",
    detail: "32 employees",
    metric: "12 hrs/week saved",
  },
  {
    quote:
      "The assessment alone was worth every dollar. We got a prioritized roadmap with clear cost-benefit analysis for each automation, honest advice on what not to automate yet, and a team that delivered exactly what they scoped — on time and on budget.",
    name: "Founder & CEO",
    company: "Professional Services Firm",
    detail: "18 employees",
    metric: "On time. On budget.",
  },
  {
    quote:
      "We were spending 15+ hours a week on client onboarding paperwork. Speedwell automated the entire intake workflow — document collection, data validation, and CRM updates. Our team now spends that time on billable client work instead.",
    name: "Director of Operations",
    company: "Financial Advisory Firm",
    detail: "24 employees",
    metric: "15 hrs/week reclaimed",
  },
];

// ─── Testimonials Section ─────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Client Results
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight">
            Real businesses. Real outcomes.
          </h2>
        </FadeUp>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.12}>
              <div className="relative flex flex-col h-full p-7 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-[#00C9A7]/30 transition-colors duration-300">
                {/* Metric callout */}
                <div className="inline-flex items-center self-start mb-5 px-3 py-1.5 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/20">
                  <span className="text-[#00C9A7] text-xs font-bold tracking-wide">
                    {t.metric}
                  </span>
                </div>

                {/* Quote icon */}
                <Quote
                  size={18}
                  className="text-[#00C9A7]/40 mb-3 flex-shrink-0"
                  aria-hidden="true"
                />

                {/* Quote */}
                <p className="text-[#FAFAF8]/70 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="border-t border-white/8 pt-4">
                  <p className="text-[#FAFAF8] text-sm font-semibold">
                    {t.name}
                  </p>
                  <p className="text-[#FAFAF8]/40 text-xs mt-0.5">
                    {t.company} · {t.detail}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Verification note */}
        <FadeUp delay={0.45} className="text-center mt-8">
          <p className="text-xs text-[#FAFAF8]/30">
            Verified client results. Details shared with permission.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
