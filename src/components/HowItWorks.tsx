"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step {
  number: string;
  title: string;
  price: string;
  description: string;
  detail: string;
}

// ─── Step data ────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    number: "01",
    title: "Assessment",
    price: "$997",
    description: "Understand your operations.",
    detail:
      "We audit your operations, workflows, and tools. You get a prioritized roadmap of automation opportunities — credited toward your project if you move forward.",
  },
  {
    number: "02",
    title: "Implementation",
    price: "Fixed-price proposal after assessment",
    description: "We build. You grow.",
    detail:
      "We build and deploy the automations. Fixed-price, scoped from your assessment. No scope creep, no surprise invoices — just working software.",
  },
  {
    number: "03",
    title: "Optimization Retainer",
    price: "Flexible monthly plans — most clients start under $2k/mo",
    description: "Stay ahead, continuously.",
    detail:
      "Ongoing support, new builds, staff training, and quarterly reviews. Your automations improve as your business grows.",
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

// ─── How It Works ─────────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#0F1B2D] py-24 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header — mb reduced from 16→8 to cut dead space before cards */}
        <FadeUp className="text-center mb-8">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight">
            A process built for clarity.
          </h2>
          <p className="mt-4 text-[#FAFAF8]/60 text-lg max-w-xl mx-auto">
            Three straightforward phases. Fixed pricing. No guesswork.
          </p>
        </FadeUp>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={0.1 + i * 0.12}>
              <div className="relative h-full flex flex-col p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C9A7]/40 transition-colors duration-300 group">
                {/* Step number */}
                <span className="text-5xl font-bold text-[#00C9A7]/20 group-hover:text-[#00C9A7]/40 transition-colors font-mono leading-none mb-6 select-none">
                  {step.number}
                </span>

                {/* Title + price */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#FAFAF8] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#00C9A7] text-sm font-semibold">
                    {step.price}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base font-medium text-[#FAFAF8]/80 mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-[#FAFAF8]/50 leading-relaxed flex-1">
                  {step.detail}
                </p>

                {/* Connector arrow — only between steps on desktop */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-white/20 bg-[#0F1B2D] flex items-center justify-center z-10"
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke="#00C9A7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeUp delay={0.5} className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold hover:bg-[#00a88c] transition-colors duration-200"
          >
            Start with an Assessment
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
