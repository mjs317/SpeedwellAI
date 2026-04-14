import type { Metadata } from "next";
import AssessmentFlow from "@/components/assessment/AssessmentFlow";

export const metadata: Metadata = {
  title: "Free AI Readiness Scorecard — Speedwell AI",
  description:
    "Find out how ready your business is for AI automation. Get your personalized AI readiness scorecard with your score and specific recommendations in under 3 minutes.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://speedwellai.com/assessment",
  },
  openGraph: {
    title: "Free AI Readiness Scorecard — Speedwell AI",
    description:
      "Find out how ready your business is for AI automation. Get your personalized AI readiness scorecard with your score and specific recommendations in under 3 minutes.",
    type: "website",
    url: "https://speedwellai.com/assessment",
  },
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[#0F1B2D] text-[#FAFAF8]">
      <AssessmentFlow />
    </main>
  );
}
