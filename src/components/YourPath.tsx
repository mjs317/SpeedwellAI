"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const paths = [
  {
    step: "01",
    title: "Take the Free Scorecard",
    subtext: "2 minutes. See where you stand.",
    cta: "Get Your Free Score →",
    href: "/assessment",
    external: false,
  },
  {
    step: "02",
    title: "Book a Free Discovery Call",
    subtext: "30 minutes. Walk through your operations with us.",
    cta: "Book a Call →",
    href: SITE_CONFIG.calendlyUrl,
    external: true,
  },
  {
    step: "03",
    title: "Start the $499 Deep-Dive Assessment",
    subtext:
      "A full audit with a prioritized automation roadmap. Credited toward your project.",
    cta: "Start the Assessment →",
    href: SITE_CONFIG.calendlyUrl,
    external: true,
  },
];

// Desktop arrow connector between cards
function ArrowConnector() {
  return (
    <div
      className="hidden lg:flex items-center justify-center flex-shrink-0 w-8"
      aria-hidden="true"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#00C9A7" strokeOpacity="0.25" strokeWidth="1.5" />
        <path
          d="M10 14h8M15 11l3 3-3 3"
          stroke="#00C9A7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function YourPath() {
  return (
    <section className="bg-[#FAFAF8] py-16 px-6 lg:px-8 border-b border-black/5">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeUp className="text-center mb-12">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Not sure where to start?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight">
            Three ways in. All free to start.
          </h2>
        </FadeUp>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">
          {paths.map((path, i) => (
            <div key={path.step} className="flex flex-col lg:flex-row items-stretch flex-1">
              <FadeUp delay={0.1 + i * 0.12} className="flex-1">
                <div className="h-full flex flex-col p-7 rounded-2xl border border-[#0F1B2D]/10 bg-white shadow-sm hover:border-[#00C9A7]/40 transition-colors duration-300">
                  {/* Step number */}
                  <span className="text-xs font-bold font-mono text-[#00C9A7]/60 mb-3">
                    {path.step}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#0F1B2D] mb-2">
                    {path.title}
                  </h3>

                  {/* Subtext */}
                  <p className="text-[#6B7280] text-sm leading-relaxed flex-1 mb-5">
                    {path.subtext}
                  </p>

                  {/* CTA */}
                  {path.external ? (
                    <a
                      href={path.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition"
                    >
                      {path.cta}
                    </a>
                  ) : (
                    <a
                      href={path.href}
                      className="text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition"
                    >
                      {path.cta}
                    </a>
                  )}
                </div>
              </FadeUp>

              {/* Arrow between cards (desktop only) */}
              {i < paths.length - 1 && <ArrowConnector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
