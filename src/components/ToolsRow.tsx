"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Tool list ────────────────────────────────────────────────────────────────

const tools = [
  "Zapier",
  "Make",
  "HubSpot",
  "Notion",
  "Airtable",
  "OpenAI",
  "Slack",
  "Google Workspace",
  "QuickBooks",
  "Salesforce",
];

// ─── Tools Row Section ────────────────────────────────────────────────────────

export default function ToolsRow() {
  return (
    <section
      id="tools"
      className="bg-[#F5F5F3] py-14 px-6 lg:px-8 border-y border-black/5"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Label */}
        <FadeUp>
          <p className="text-[#00C9A7] text-xs font-semibold tracking-widest uppercase mb-6">
            Tools We Work With
          </p>
        </FadeUp>

        {/* Pill badges */}
        <FadeUp delay={0.08}>
          <div className="flex flex-wrap justify-center gap-2.5 mb-5">
            {tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-[#0F1B2D] text-sm font-medium shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* Muted note */}
        <FadeUp delay={0.16}>
          <p className="text-xs text-[#6B7280]">
            Don&apos;t see your stack?{" "}
            <a
              href="#contact"
              className="text-[#00C9A7] hover:underline underline-offset-2"
            >
              We work with most business tools — ask us.
            </a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
