"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import type {
  DimensionScores,
  Recommendation,
  Tier,
} from "@/lib/assessment/scoring";

interface ResultsViewProps {
  email: string;
  overall: number;
  tier: Tier;
  tierDescription: string;
  dimensions: DimensionScores;
  recommendations: Recommendation[];
}

function tierColor(tier: Tier): string {
  switch (tier) {
    case "Early Stage":
      return "#F59E0B"; // amber
    case "Building Foundations":
      return "#FACC15"; // yellow
    case "Ready to Scale":
      return "#00C9A7"; // teal
    case "Advanced":
      return "#22D3A8"; // brighter teal
  }
}

function DimensionBar({
  label,
  pct,
}: {
  label: string;
  pct: number;
}) {
  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-1.5">
        <span className="text-[#FAFAF8]/85">{label}</span>
        <span className="font-semibold text-[#FAFAF8]">{pct}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full bg-[#00C9A7]"
        />
      </div>
    </div>
  );
}

export default function ResultsView({
  email,
  overall,
  tier,
  tierDescription,
  dimensions,
  recommendations,
}: ResultsViewProps) {
  const topRec = recommendations[0];
  const color = tierColor(tier);

  // Permanently suppress the site-wide assessment popup for this visitor.
  useEffect(() => {
    try {
      window.localStorage.setItem("sw_assessment_completed", "1");
    } catch {
      /* localStorage unavailable — fine, popup will still suppress on dismiss */
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      <div className="flex items-center gap-2 text-[#00C9A7] text-sm font-semibold">
        <CheckCircle2 size={18} />
        <span>Report sent to {email}</span>
      </div>

      <div className="text-center py-4">
        <div className="text-xs font-semibold tracking-wide uppercase text-[#FAFAF8]/60 mb-2">
          Your AI Readiness Score
        </div>
        <div
          className="text-7xl sm:text-8xl font-bold"
          style={{ color }}
        >
          {overall}
          <span className="text-3xl sm:text-4xl text-[#FAFAF8]/50 font-normal">
            /100
          </span>
        </div>
        <div
          className="mt-3 text-xl sm:text-2xl font-bold"
          style={{ color }}
        >
          {tier}
        </div>
        <p className="mt-3 text-sm text-[#FAFAF8]/70 max-w-xl mx-auto leading-relaxed">
          {tierDescription}
        </p>
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 flex flex-col gap-5">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-[#FAFAF8]/60">
          Dimension Breakdown
        </h3>
        <DimensionBar
          label="Process Maturity"
          pct={dimensions.process_maturity}
        />
        <DimensionBar
          label="Technical Readiness"
          pct={dimensions.technical_readiness}
        />
        <DimensionBar
          label="Organizational Readiness"
          pct={dimensions.organizational_readiness}
        />
      </div>

      {topRec && (
        <div className="rounded-2xl bg-[#00C9A7]/[0.06] border border-[#00C9A7]/20 p-6">
          <div className="text-xs font-semibold tracking-wide uppercase text-[#00C9A7] mb-2">
            Your Top Opportunity
          </div>
          <h3 className="text-lg font-bold text-[#FAFAF8] mb-2">
            {topRec.title}
          </h3>
          <p className="text-sm text-[#FAFAF8]/75 leading-relaxed">
            {topRec.body}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-2">
        <a
          href={SITE_CONFIG.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-base hover:bg-[#00a88c] transition-colors duration-200 shadow-lg shadow-[#00C9A7]/20"
        >
          <Calendar size={18} />
          Book a Free Discovery Call
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#FAFAF8]/65 font-medium text-sm hover:text-[#FAFAF8] transition-colors underline underline-offset-4 decoration-[#FAFAF8]/30 hover:decoration-[#FAFAF8]/60"
        >
          <ArrowLeft size={14} />
          Back to Speedwell AI
        </Link>
      </div>
    </motion.div>
  );
}
