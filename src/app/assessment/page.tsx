import type { Metadata } from "next";
import AssessmentFlow from "@/components/assessment/AssessmentFlow";

export const metadata: Metadata = {
  title: "Free AI Readiness Assessment — Speedwell AI",
  description:
    "Find out how ready your business is for AI automation. Get a personalized report with your score and specific recommendations in under 3 minutes.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free AI Readiness Assessment — Speedwell AI",
    description:
      "Find out how ready your business is for AI automation. Get a personalized report with your score and specific recommendations in under 3 minutes.",
    type: "website",
  },
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[#0F1B2D] text-[#FAFAF8]">
      <AssessmentFlow />
    </main>
  );
}
