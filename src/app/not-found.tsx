// ─── Custom 404 Page ──────────────────────────────────────────────────────────

import { SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Speedwell AI",
  description: "This page doesn't exist — but your automation opportunities do.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F1B2D] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* 404 number */}
        <p className="text-9xl font-bold text-[#00C9A7]/20 leading-none mb-4 select-none">
          404
        </p>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FAFAF8] leading-tight mb-4">
          This page doesn&apos;t exist — but your automation opportunities do.
        </h1>

        {/* Subtext */}
        <p className="text-[#FAFAF8]/50 text-base mb-8 leading-relaxed">
          Looks like you followed a link that&apos;s gone. Let&apos;s get you back to something useful.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors duration-200"
          >
            Back to homepage
          </a>
          <a
            href={SITE_CONFIG.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-white/20 text-[#FAFAF8] font-semibold text-sm hover:border-[#00C9A7]/50 hover:text-[#00C9A7] transition-colors duration-200"
          >
            Book a Free Call
          </a>
        </div>

        {/* Brand mark */}
        <p className="mt-12 text-xs text-[#FAFAF8]/20">
          {SITE_CONFIG.siteName} · {SITE_CONFIG.siteUrl}
        </p>
      </div>
    </div>
  );
}
