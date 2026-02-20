"use client";

import { useState, useRef } from "react";
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

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

// ─── ROI Calculator Section ───────────────────────────────────────────────────

export default function ROICalculator() {
  const [employees, setEmployees] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);

  // Calculations
  const weeklyHoursRecoverable = employees * hoursPerWeek * 0.4;
  const monthlyCost = employees * hoursPerWeek * hourlyRate * 4.33;
  const monthlySavings = monthlyCost * 0.4;
  const annualSavings = monthlySavings * 12;
  const roiPercent =
    annualSavings > 10000
      ? Math.round(((annualSavings - 10000) / 10000) * 100)
      : 0;

  const sliderClass =
    "w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#00C9A7] bg-white/10";

  return (
    <section
      id="roi-calculator"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            ROI Calculator
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAF8] leading-tight mb-4">
            See what AI could save you.
          </h2>
          <p className="text-[#FAFAF8]/50 text-base max-w-lg mx-auto">
            Adjust the sliders to model your situation. Results update in real time.
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* ── Inputs ── */}
              <div className="space-y-8">
                {/* Employees */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-[#FAFAF8]/70">
                      Number of employees
                    </label>
                    <span className="text-[#00C9A7] font-bold text-sm min-w-[3rem] text-right">
                      {employees}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className={sliderClass}
                    aria-label="Number of employees"
                  />
                  <div className="flex justify-between text-xs text-[#FAFAF8]/25 mt-1">
                    <span>1</span><span>100</span>
                  </div>
                </div>

                {/* Hourly rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-[#FAFAF8]/70">
                      Average hourly cost per employee
                    </label>
                    <span className="text-[#00C9A7] font-bold text-sm min-w-[3rem] text-right">
                      ${hourlyRate}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={150}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className={sliderClass}
                    aria-label="Average hourly cost per employee"
                  />
                  <div className="flex justify-between text-xs text-[#FAFAF8]/25 mt-1">
                    <span>$20</span><span>$150</span>
                  </div>
                </div>

                {/* Hours per week */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-[#FAFAF8]/70">
                      Hours/week on repetitive tasks (per employee)
                    </label>
                    <span className="text-[#00C9A7] font-bold text-sm min-w-[3rem] text-right">
                      {hoursPerWeek} hrs
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className={sliderClass}
                    aria-label="Hours per week on repetitive tasks"
                  />
                  <div className="flex justify-between text-xs text-[#FAFAF8]/25 mt-1">
                    <span>1 hr</span><span>20 hrs</span>
                  </div>
                </div>
              </div>

              {/* ── Results ── */}
              <div className="flex flex-col justify-between gap-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Weekly hours */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/8">
                    <p className="text-[#FAFAF8]/40 text-xs mb-1">Weekly hours recoverable</p>
                    <p className="text-2xl font-bold text-[#FAFAF8]">
                      {weeklyHoursRecoverable.toFixed(0)}
                      <span className="text-sm font-normal text-[#FAFAF8]/40 ml-1">hrs</span>
                    </p>
                  </div>

                  {/* Monthly cost */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/8">
                    <p className="text-[#FAFAF8]/40 text-xs mb-1">Monthly cost of manual work</p>
                    <p className="text-2xl font-bold text-[#FAFAF8]">
                      {formatCurrency(monthlyCost)}
                    </p>
                  </div>

                  {/* Monthly savings */}
                  <div className="p-4 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/20">
                    <p className="text-[#00C9A7]/70 text-xs mb-1">Est. monthly savings</p>
                    <p className="text-2xl font-bold text-[#00C9A7]">
                      {formatCurrency(monthlySavings)}
                    </p>
                  </div>

                  {/* Annual savings */}
                  <div className="p-4 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/20">
                    <p className="text-[#00C9A7]/70 text-xs mb-1">Est. annual savings</p>
                    <p className="text-2xl font-bold text-[#00C9A7]">
                      {formatCurrency(annualSavings)}
                    </p>
                  </div>
                </div>

                {/* ROI callout */}
                <div className="p-5 rounded-xl bg-[#00C9A7] text-[#0F1B2D]">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">
                    Est. ROI on a $10k project
                  </p>
                  <p className="text-3xl font-bold">
                    {roiPercent > 0 ? `${roiPercent}%` : "< breakeven"}
                  </p>
                  <p className="text-xs mt-1 opacity-60">
                    annualized, first year
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-[#0F1B2D] font-semibold text-sm hover:bg-[#FAFAF8] transition-colors duration-200"
                >
                  See how we&apos;d achieve these savings →
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-8 text-xs text-[#FAFAF8]/25 text-center">
              Estimates based on industry averages assuming 40% of repetitive tasks are automatable. Your actual results may vary. A Speedwell Assessment provides precise projections for your business.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
