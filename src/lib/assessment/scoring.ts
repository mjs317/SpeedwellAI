// ─── Scoring + Recommendation Engine ─────────────────────────────────────────

import { Dimension, PainPoint } from "./questions";

export interface Answers {
  q1_process_documentation: 1 | 2 | 3 | 4;
  q2_repetitive_task_load: 1 | 2 | 3 | 4;
  q3_tool_stack: 1 | 2 | 3 | 4;
  q4_data_quality: 1 | 2 | 3 | 4;
  q5_ai_experience: 1 | 2 | 3 | 4;
  q6_decision_speed: 1 | 2 | 3 | 4;
  q7_budget_mindset: 1 | 2 | 3 | 4;
}

export type Tier =
  | "Early Stage"
  | "Building Foundations"
  | "Ready to Scale"
  | "Advanced";

export interface DimensionScores {
  process_maturity: number;
  technical_readiness: number;
  organizational_readiness: number;
}

export interface ScoreResult {
  overall: number;
  dimensions: DimensionScores;
  tier: Tier;
  tierDescription: string;
}

export interface Recommendation {
  title: string;
  body: string;
}

const TIER_DESCRIPTIONS: Record<Tier, string> = {
  "Early Stage":
    "Your business has significant opportunity to benefit from AI automation, but some foundational work is needed first.",
  "Building Foundations":
    "You have the basics in place. Targeted automations can start delivering value quickly.",
  "Ready to Scale":
    "Your operations are well-positioned for AI. The right implementations could transform your efficiency.",
  Advanced:
    "You're ahead of most businesses. Focus on high-impact, complex automations for your next level.",
};

function tierFromScore(score: number): Tier {
  if (score <= 35) return "Early Stage";
  if (score <= 60) return "Building Foundations";
  if (score <= 80) return "Ready to Scale";
  return "Advanced";
}

function avgToPct(values: number[]): number {
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
  return Math.round((avg / 4) * 100);
}

export function calculateScores(answers: Answers): ScoreResult {
  const {
    q1_process_documentation,
    q2_repetitive_task_load,
    q3_tool_stack,
    q4_data_quality,
    q5_ai_experience,
    q6_decision_speed,
    q7_budget_mindset,
  } = answers;

  const sum =
    q1_process_documentation +
    q2_repetitive_task_load +
    q3_tool_stack +
    q4_data_quality +
    q5_ai_experience +
    q6_decision_speed +
    q7_budget_mindset;

  // 7 questions × 4 points max = 28 → scale to 0–100
  const overall = Math.round((sum / 28) * 100);

  const dimensions: DimensionScores = {
    process_maturity: avgToPct([
      q1_process_documentation,
      q2_repetitive_task_load,
    ]),
    technical_readiness: avgToPct([q3_tool_stack, q4_data_quality]),
    organizational_readiness: avgToPct([
      q5_ai_experience,
      q6_decision_speed,
      q7_budget_mindset,
    ]),
  };

  const tier = tierFromScore(overall);

  return {
    overall,
    dimensions,
    tier,
    tierDescription: TIER_DESCRIPTIONS[tier],
  };
}

// ─── Recommendations ────────────────────────────────────────────────────────

const PAIN_POINT_RECOMMENDATIONS: Record<PainPoint, Recommendation> = {
  "Lead follow-up and CRM management": {
    title: "Automated Lead Qualification & Follow-Up",
    body: "AI can score inbound leads, route them to the right person, and trigger personalized follow-up sequences — eliminating manual CRM updates and ensuring no lead falls through the cracks. Typical build time: 1–2 weeks.",
  },
  "Invoicing, billing, or accounts payable": {
    title: "AI Invoice Processing Pipeline",
    body: "Automatically extract, validate, and route invoice data. Catches duplicates, matches to POs, and pushes clean data to your accounting stack. Typical build time: 2–3 weeks.",
  },
  "Scheduling, coordination, and calendar management": {
    title: "Smart Scheduling Automation",
    body: "Eliminate scheduling back-and-forth with AI-powered booking flows that sync with your calendar, CRM, and team availability. Typical build time: 1–2 weeks.",
  },
  "Reporting, data entry, or document processing": {
    title: "Automated Reporting Pipeline",
    body: "Pull data from multiple sources into clean, formatted reports delivered on a fixed schedule — no manual assembly required. Typical build time: 1–3 weeks.",
  },
  "Customer onboarding or intake": {
    title: "AI-Powered Client Onboarding",
    body: "Automate document collection, e-signatures, and CRM updates so new clients go from signed to fully onboarded in hours, not days. Typical build time: 2–4 weeks.",
  },
  Other: {
    title: "Start With a $499 AI Readiness Assessment",
    body: "Based on your answer, the right next step is a deep-dive audit of your actual workflows. We'll map your biggest time sinks and hand you a prioritized roadmap. The $499 is credited toward any implementation project.",
  },
};

const DIMENSION_RECOMMENDATIONS: Record<Dimension, Recommendation> = {
  process_maturity: {
    title: "Process Documentation & Workflow Audit",
    body: "Your lowest-scoring area is Process Maturity. Before automating, we'd recommend a light-touch process audit to document the handful of core workflows that matter most — automation built on undocumented processes tends to amplify chaos.",
  },
  technical_readiness: {
    title: "Tool Stack Integration Review",
    body: "Your lowest-scoring area is Technical Readiness. A focused integration review — connecting the 2–3 tools you already use every day — will unlock automations that were previously blocked by data silos.",
  },
  organizational_readiness: {
    title: "Start With a Small, Visible Pilot",
    body: "Your lowest-scoring area is Organizational Readiness. The fastest way to build momentum is a single, high-visibility pilot automation your team can feel in week one — confidence and buy-in compound from there.",
  },
};

export function getLowestDimension(dimensions: DimensionScores): Dimension {
  const entries = Object.entries(dimensions) as [Dimension, number][];
  entries.sort((a, b) => a[1] - b[1]);
  return entries[0][0];
}

export function getDimensionLabel(d: Dimension): string {
  switch (d) {
    case "process_maturity":
      return "Process Maturity";
    case "technical_readiness":
      return "Technical Readiness";
    case "organizational_readiness":
      return "Organizational Readiness";
  }
}

export function getRecommendations(
  dimensions: DimensionScores,
  painPoint: PainPoint
): Recommendation[] {
  const recs: Recommendation[] = [];
  recs.push(PAIN_POINT_RECOMMENDATIONS[painPoint]);

  const lowest = getLowestDimension(dimensions);
  const dimensionRec = DIMENSION_RECOMMENDATIONS[lowest];
  // Avoid duplicate titles if pain point already covered the same ground
  if (!recs.some((r) => r.title === dimensionRec.title)) {
    recs.push(dimensionRec);
  }
  return recs;
}
