"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Truck, Briefcase, BarChart2 } from "lucide-react";

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

// ─── Case study data ──────────────────────────────────────────────────────────

const cases = [
  {
    Icon: Truck,
    industry: "Regional Logistics",
    employees: "32 employees",
    metric: "12 hrs/week saved",
    metricSub: "ROI in 8 weeks",
    challenge: "Manual invoice processing and shipment tracking consuming 15+ hours per week.",
    solution: "Automated invoice extraction, validation, and routing — plus a real-time tracking dashboard.",
    results: ["12 hours/week saved", "90% reduction in data entry errors", "ROI achieved in 8 weeks"],
  },
  {
    Icon: Briefcase,
    industry: "Professional Services",
    employees: "18 employees",
    metric: "24-hr onboarding",
    metricSub: "Down from 5+ days",
    challenge: "Inconsistent client onboarding taking 5+ days with manual follow-ups and missed steps.",
    solution: "Automated onboarding workflow with document collection, e-signatures, and CRM integration.",
    results: ["Onboarding reduced to 24 hours", "100% consistency — zero missed steps", "Client satisfaction improved"],
  },
  {
    Icon: BarChart2,
    industry: "Financial Advisory",
    employees: "24 employees",
    metric: "6 hrs/analyst/week",
    metricSub: "Delivered every Monday at 7am",
    challenge: "Weekly reporting compiled manually from 4 different systems, taking 6+ hours per analyst.",
    solution: "Automated data aggregation and formatted report generation delivered on a fixed schedule.",
    results: ["6 hours/week saved per analyst", "Reports delivered faster with fewer errors", "Analysts focused on billable work"],
  },
];

// ─── Case Studies Section ─────────────────────────────────────────────────────

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="bg-[#FAFAF8] py-24 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-14">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Client Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
            What gets built. What gets saved.
          </h2>
        </FadeUp>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => {
            const Icon = c.Icon;
            return (
              <FadeUp key={i} delay={0.1 + i * 0.12}>
                <div className="card-hover-glow h-full flex flex-col p-7 rounded-2xl border border-[#0F1B2D]/10 bg-white">
                  {/* Industry tag + icon */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#00C9A7]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#00C9A7]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0F1B2D]">{c.industry}</p>
                      <p className="text-xs text-[#6B7280]">{c.employees}</p>
                    </div>
                  </div>

                  {/* Key metric */}
                  <div className="mb-5 pb-5 border-b border-black/5">
                    <p className="text-2xl font-bold text-[#0F1B2D] leading-tight">{c.metric}</p>
                    <p className="text-xs text-[#00C9A7] font-semibold mt-0.5">{c.metricSub}</p>
                  </div>

                  {/* Challenge + Solution */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <p className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{c.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <ul className="mt-5 space-y-1.5">
                    {c.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#0F1B2D]">
                        <span className="text-[#00C9A7] font-bold flex-shrink-0 mt-px">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
