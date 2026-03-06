"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "We were losing leads because we couldn't follow up fast enough — a customer would fill out the form on our site and wouldn't hear back for hours, sometimes a full day. Speedwell built us an automated system that qualifies the lead, sends a personalized follow-up within minutes, and books them directly onto our technicians' calendars. We went from maybe 40% follow-up rate to close to 100%, and we're booking more jobs without adding office staff. The whole thing was up and running in under three weeks.",
    name: "Miles N.",
    title: "Owner",
    company: "Garage Door Wizard",
    industry: "Home Services",
    automations: ["CRM & Lead Follow-Up", "Scheduling"],
  },
  {
    quote:
      "Our business is extremely seasonal — we go from quiet to hundreds of pickups and deliveries in a two-week window. Before Speedwell, our team was buried in spreadsheets trying to track sign-ups, schedule box drop-offs, and coordinate moves across multiple campuses. They automated our entire customer onboarding flow — from sign-up confirmation to box delivery scheduling to move-day reminders — and built us a reporting dashboard that pulls everything together in one place. What used to take our team 15+ hours a week of manual coordination basically runs itself now.",
    name: "Mike S.",
    title: "Owner",
    company: "Store Your Dorm LLC",
    industry: "Logistics / Student Services",
    automations: ["Customer Onboarding", "Scheduling", "Reporting"],
  },
];

// ─── Results / Testimonials Section ──────────────────────────────────────────

export default function Results() {
  return (
    <section id="results" className="bg-[#0F1B2D] py-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FAFAF8] leading-tight">
            What our clients are seeing.
          </h2>
        </FadeUp>

        {/* Testimonial cards — 2-col desktop, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <FadeUp key={t.company} delay={0.1 + i * 0.12}>
              <div className="flex flex-col h-full p-7 rounded-2xl border border-white/10 bg-white/[0.04]">
                {/* Decorative quote mark */}
                <svg
                  className="mb-4 text-[#00C9A7]/40 flex-shrink-0"
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 24V14.4C0 6.08 4.48 1.28 13.44 0l1.28 2.56C10.24 3.52 8 6.08 8 9.6H13.44V24H0Zm18.56 0V14.4C18.56 6.08 23.04 1.28 32 0l1.28 2.56C28.8 3.52 26.56 6.08 26.56 9.6H32V24H18.56Z" />
                </svg>

                {/* Industry tag */}
                <span className="inline-block self-start px-2.5 py-1 rounded-full bg-[#FAFAF8]/8 text-[#FAFAF8]/50 text-xs font-medium mb-4">
                  {t.industry}
                </span>

                {/* Quote */}
                <p className="text-[#FAFAF8]/70 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="mb-4">
                  <p className="text-[#FAFAF8] text-sm font-semibold">
                    {t.name} &mdash; {t.title}
                  </p>
                  <p className="text-[#FAFAF8]/45 text-xs mt-0.5">{t.company}</p>
                </div>

                {/* Automation tags */}
                <div className="flex flex-wrap gap-1.5">
                  {t.automations.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-semibold"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.35} className="text-center">
          <a
            href={SITE_CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition-colors"
          >
            Book a Free Discovery Call →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
