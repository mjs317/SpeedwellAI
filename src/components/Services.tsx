"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Mail,
  FileText,
  Calendar,
  BarChart2,
  GitMerge,
  Cpu,
} from "lucide-react";

// ─── Service card data ────────────────────────────────────────────────────────

const services = [
  {
    icon: Users,
    title: "CRM & Lead Follow-Up",
    description:
      "Auto-qualify leads, trigger personalized follow-ups, and keep your pipeline moving — without manual data entry.",
    example: "e.g., Auto-qualify HubSpot leads and trigger a 3-step email sequence",
  },
  {
    icon: Mail,
    title: "AI Inbox & Email Triage",
    description:
      "Route, prioritize, and draft replies to inbound emails using AI trained on your voice and workflows.",
    example: "e.g., Route, label, and draft replies using your writing style and team workflows",
  },
  {
    icon: FileText,
    title: "Invoice & Document Processing",
    description:
      "Extract, validate, and route data from invoices, contracts, and forms automatically — no more copy-paste.",
    example: "e.g., Extract line items from PDF invoices and push them directly to QuickBooks",
  },
  {
    icon: Calendar,
    title: "Scheduling & Calendar Automation",
    description:
      "Eliminate scheduling back-and-forth with smart booking flows that sync with your existing calendar stack.",
    example: "e.g., Smart booking flow that syncs Calendly, Google Cal, and your CRM",
  },
  {
    icon: BarChart2,
    title: "Reporting & Data Aggregation",
    description:
      "Pull data from multiple sources into clean, automated reports delivered to your team on a schedule.",
    example: "e.g., Weekly P&L pulled from 3 sources, formatted, and emailed every Monday",
  },
  {
    icon: GitMerge,
    title: "Customer Onboarding Workflows",
    description:
      "Turn a multi-day onboarding process into a seamless, consistent experience that runs itself.",
    example: "e.g., Automated document collection, e-signatures, and CRM entry on client sign-up",
  },
  {
    icon: Cpu,
    title: "Custom AI Applications",
    description:
      "When off-the-shelf platforms don't fit, we build from scratch — bespoke AI agents, internal tools, and custom workflows coded to exactly how your business operates. Scoped and fixed-price like every other project we take on.",
    example: null,
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#FAFAF8] py-24 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Automations we build.
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-xl mx-auto">
            Real-world automations for the tasks your team does every day.
          </p>
        </FadeUp>

        {/* Cards grid — 2-col on mobile, 3-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeUp key={service.title} delay={0.05 + (i % 3) * 0.08}>
                <div className="card-hover-glow h-full flex flex-col gap-3 p-4 sm:p-6 rounded-2xl border border-[#0F1B2D]/10 bg-white cursor-default">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#00C9A7]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#00C9A7]" strokeWidth={1.8} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-base font-bold text-[#0F1B2D]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {service.description}
                    </p>
                    {service.example && (
                      <p className="text-xs text-[#6B7280]/60 italic mt-auto">
                        {service.example}
                      </p>
                    )}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
