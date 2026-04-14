"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

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

// ─── Comparison data ──────────────────────────────────────────────────────────

const rows = [
  { label: "Starting investment", big: "$50,000+", diy: "$0 – $2,000", speedwell: "$499" },
  { label: "Time to ROI", big: "6 – 12 months", diy: "Uncertain", speedwell: "~90 days" },
  { label: "Who does the work", big: "Junior consultants", diy: "You (or a contractor)", speedwell: "Founder-led delivery" },
  { label: "Ongoing support", big: "Expensive retainer", diy: "None", speedwell: "Affordable monthly plans" },
  { label: "Commitment", big: "Long-term contract", diy: "None", speedwell: "Month-to-month" },
  { label: "Scope clarity", big: "Scope creep common", diy: "Undefined", speedwell: "Fixed-price, scoped upfront" },
];

// ─── Comparison Table Section ─────────────────────────────────────────────────

export default function ComparisonTable() {
  return (
    <section
      id="why-speedwell"
      className="bg-[#FAFAF8] py-16 px-4 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Why Speedwell?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight">
            Not another enterprise pitch deck.
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-xl mx-auto">
            See how we compare to the alternatives.
          </p>
        </FadeUp>

        {/* Desktop table (md+) */}
        <FadeUp delay={0.1}>
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-black/8 shadow-sm">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr>
                  <th className="bg-[#F5F5F3] px-5 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider w-[32%]">
                    &nbsp;
                  </th>
                  <th className="bg-[#F5F5F3] px-5 py-4 text-center text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    Big Consultancy
                  </th>
                  <th className="bg-[#F5F5F3] px-5 py-4 text-center text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
                    DIY / Freelancer
                  </th>
                  <th className="bg-[#0F1B2D] px-5 py-4 text-center text-xs font-bold text-[#00C9A7] uppercase tracking-wider">
                    Speedwell AI ✓
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {rows.map((row, i) => (
                  <tr key={i} className="bg-white">
                    <td className="px-5 py-4 text-[#0F1B2D] font-medium">{row.label}</td>
                    <td className="px-5 py-4 text-center text-[#6B7280]">{row.big}</td>
                    <td className="px-5 py-4 text-center text-[#6B7280]">{row.diy}</td>
                    <td className="px-5 py-4 text-center bg-[#0F1B2D]/[0.03] border-l border-r border-[#00C9A7]/15">
                      <span className="font-semibold text-[#0F1B2D]">{row.speedwell}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Mobile stacked cards (below md) */}
        <div className="md:hidden flex flex-col gap-4">
          {/* Speedwell AI card — highlighted, shown first */}
          <FadeUp delay={0.08}>
            <div className="rounded-2xl border-2 border-[#00C9A7] bg-[#0F1B2D]/[0.03] overflow-hidden">
              <div className="bg-[#0F1B2D] px-5 py-3">
                <p className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider">Speedwell AI ✓</p>
              </div>
              <div className="divide-y divide-black/5">
                {rows.map((row, i) => (
                  <div key={i} className="px-5 py-3 flex justify-between items-start gap-4">
                    <p className="text-[#6B7280] text-xs font-medium min-w-0 shrink-0">{row.label}</p>
                    <p className="text-[#0F1B2D] text-xs font-semibold text-right">{row.speedwell}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Big Consultancy card */}
          <FadeUp delay={0.14}>
            <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
              <div className="bg-[#F5F5F3] px-5 py-3">
                <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">Big Consultancy</p>
              </div>
              <div className="divide-y divide-black/5">
                {rows.map((row, i) => (
                  <div key={i} className="px-5 py-3 flex justify-between items-start gap-4">
                    <p className="text-[#6B7280] text-xs font-medium min-w-0 shrink-0">{row.label}</p>
                    <p className="text-[#6B7280] text-xs text-right">{row.big}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* DIY / Freelancer card */}
          <FadeUp delay={0.2}>
            <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
              <div className="bg-[#F5F5F3] px-5 py-3">
                <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider">DIY / Freelancer</p>
              </div>
              <div className="divide-y divide-black/5">
                {rows.map((row, i) => (
                  <div key={i} className="px-5 py-3 flex justify-between items-start gap-4">
                    <p className="text-[#6B7280] text-xs font-medium min-w-0 shrink-0">{row.label}</p>
                    <p className="text-[#6B7280] text-xs text-right">{row.diy}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* CTA */}
        <FadeUp delay={0.25} className="text-center mt-10">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold hover:bg-[#00a88c] transition-colors duration-200 shadow-md shadow-[#00C9A7]/20"
          >
            Book a Free Discovery Call
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
