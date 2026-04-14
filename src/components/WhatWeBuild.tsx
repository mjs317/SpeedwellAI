"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Users, GitMerge, BarChart2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const CALENDLY_URL = SITE_CONFIG.calendlyUrl;

// ─── Automation capability data ───────────────────────────────────────────────

const automations = [
  {
    Icon: FileText,
    title: "Invoice Processing Pipeline",
    description:
      "Extract, validate, and route invoice data automatically. Catches duplicates, validates line items, and pushes clean data to your accounting stack — no copy-paste, no manual entry.",
    detail: "Connects to QuickBooks, Xero, or your existing system.",
    buildTime: "Typical build time: 2–3 weeks",
  },
  {
    Icon: Users,
    title: "CRM Lead Routing",
    description:
      "Auto-qualify inbound leads and route them to the right rep or trigger the right follow-up sequence — no manual triage, no leads falling through the cracks.",
    detail: "Works with HubSpot, Salesforce, or your CRM of choice.",
    buildTime: "Typical build time: 1–2 weeks",
  },
  {
    Icon: GitMerge,
    title: "Client Onboarding Workflow",
    description:
      "Automate document collection, e-signatures, and CRM updates so new clients go from signed to fully onboarded in hours, not days. Consistent every time, zero missed steps.",
    detail: "Integrates with DocuSign, Notion, and your project management tool.",
    buildTime: "Typical build time: 2–4 weeks",
  },
  {
    Icon: BarChart2,
    title: "Automated Reporting",
    description:
      "Pull data from multiple sources and deliver clean, formatted reports on a fixed schedule — every Monday at 7am, every month-end, or whenever your team needs them.",
    detail: "Connects to spreadsheets, CRMs, accounting tools, and more.",
    buildTime: "Typical build time: 1–3 weeks",
  },
];

// ─── Tools list (moved from ToolsRow) ────────────────────────────────────────

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

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────

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

// ─── What We Build Section ────────────────────────────────────────────────────

export default function WhatWeBuild() {
  return (
    <section id="services" className="bg-[#0F1B2D] py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-8">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAFAF8] leading-tight">
            Automations that run while you work.
          </h2>
          <p className="mt-4 text-[#FAFAF8]/60 text-lg max-w-2xl mx-auto">
            Real-world systems for the tasks your team does every day — scoped
            upfront, priced transparently, and delivered end-to-end.
          </p>
        </FadeUp>

        {/* Tools row — integrated here */}
        <FadeUp delay={0.08} className="mb-10">
          <div className="text-center">
            <p className="text-[#FAFAF8]/40 text-xs font-semibold tracking-widest uppercase mb-4">
              Integrates with your existing tools
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[#FAFAF8]/70 text-xs font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#FAFAF8]/35">
              Don&apos;t see your stack?{" "}
              <a
                href="#contact"
                className="text-[#00C9A7] hover:underline underline-offset-2"
              >
                We work with most business tools — ask us.
              </a>
            </p>
          </div>
        </FadeUp>

        {/* Cards grid — 1-col mobile, 2-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automations.map((a, i) => {
            const Icon = a.Icon;
            return (
              <FadeUp key={a.title} delay={0.1 + (i % 2) * 0.1}>
                <div className="h-full flex flex-col p-7 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-[#00C9A7]/30 transition-colors duration-300">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#00C9A7]/15 flex items-center justify-center mb-5 flex-shrink-0">
                    <Icon size={20} className="text-[#00C9A7]" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#FAFAF8] mb-2">
                    {a.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#FAFAF8]/60 text-sm leading-relaxed flex-1 mb-5">
                    {a.description}
                  </p>

                  {/* Meta footer */}
                  <div className="border-t border-white/8 pt-4 flex items-center justify-between gap-4 mb-3">
                    <p className="text-[#FAFAF8]/30 text-xs">{a.detail}</p>
                    <span className="text-[#00C9A7] text-xs font-semibold whitespace-nowrap">
                      {a.buildTime}
                    </span>
                  </div>

                  {/* CTA */}
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00C9A7] text-sm font-semibold hover:underline underline-offset-4 transition"
                  >
                    Talk to us about this →
                  </a>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Section-level CTA */}
        <FadeUp delay={0.35} className="text-center mt-10">
          <p className="text-[#FAFAF8]/50 text-sm mb-4">
            Don&apos;t see your workflow? We build custom automations too.
          </p>
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
