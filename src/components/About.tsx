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

const credentials = [
  "7 Years at PwC",
  "AI Governance & Assurance",
  "Founder-Led Delivery",
  "Fixed-Price, No Surprises",
];

// LinkedIn SVG icon
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#FAFAF8] py-20 px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section label */}
        <FadeUp className="mb-10">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase">
            About
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1B2D] leading-tight mb-6">
            Built by people who&apos;ve been on both sides of the table.
          </h2>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-4 text-left">
            I spent nearly seven years at PwC — first in audit, then leading AI
            governance and automation strategy for large enterprises. I watched
            firsthand as Big 4 firms charged six-figure retainers for AI
            transformations that never reached the businesses that needed them
            most. Small and mid-sized companies were either handed tools with no
            support, or priced out entirely.
          </p>
          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-8 text-left">
            I started Speedwell to close that gap: enterprise-grade automation
            thinking, delivered directly, at a price that makes sense for a
            business your size. Every project is founder-led — I scope it, I
            build it, and I make sure it works.
          </p>
        </FadeUp>

        {/* Founder photo + name row */}
        <FadeUp delay={0.24} className="mb-8">
          <div className="flex items-center gap-4">
            {/* TODO: Replace placeholder with real headshot */}
            <div className="relative w-20 h-20 rounded-full bg-[#0F1B2D] flex items-center justify-center flex-shrink-0 ring-2 ring-[#00C9A7]/30 overflow-hidden">
              {/* Initials shown if photo not available */}
              <span className="text-[#00C9A7] font-bold text-lg select-none" aria-hidden="true">
                MS
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/michael-solimini.jpg"
                alt="Michael Solimini, Founder of Speedwell AI"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Name + title + LinkedIn */}
            <div className="text-left">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[#0F1B2D]">
                  Michael Solimini
                </p>
                <a
                  href={SITE_CONFIG.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Michael Solimini on LinkedIn"
                  className="text-[#6B7280] hover:text-[#00C9A7] transition-colors duration-200"
                >
                  <LinkedInIcon size={14} />
                </a>
              </div>
              <p className="text-xs text-[#6B7280]">Founder, Speedwell AI</p>
            </div>
          </div>
        </FadeUp>

        {/* Credential badges */}
        <FadeUp delay={0.30} className="flex flex-wrap justify-center gap-2.5">
          {credentials.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] text-xs font-semibold"
            >
              <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
              {tag}
            </span>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
