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

// ─── Opportunity framing (used in PDF + emails) ───────────────────────────────

export type OpportunityTier =
  | "Very High Potential"
  | "High Potential"
  | "Moderate Potential"
  | "Optimized";

const OPPORTUNITY_TIER_DESCRIPTIONS: Record<OpportunityTier, string> = {
  "Very High Potential":
    "Your business has significant automation opportunities across multiple areas. Even small changes will drive major efficiency gains.",
  "High Potential":
    "There are clear, high-impact workflows ready to be automated. You're in the sweet spot for quick wins.",
  "Moderate Potential":
    "You've already automated some basics. Targeted automations in key areas will unlock the next level of efficiency.",
  Optimized:
    "You're ahead of most businesses your size. Opportunities exist in advanced AI applications and optimization of existing systems.",
};

/** Inverts a readiness score (0–100) into an automation potential (0–100). */
export function getAutomationPotential(readinessScore: number): number {
  return 100 - readinessScore;
}

export function getOpportunityTier(potential: number): OpportunityTier {
  if (potential >= 70) return "Very High Potential";
  if (potential >= 50) return "High Potential";
  if (potential >= 30) return "Moderate Potential";
  return "Optimized";
}

export function getOpportunityTierDescription(potential: number): string {
  return OPPORTUNITY_TIER_DESCRIPTIONS[getOpportunityTier(potential)];
}

export interface OpportunityDimension {
  label: string;
  pct: number;
  explanation: string;
}

export interface OpportunityDimensions {
  processAutomationPotential: OpportunityDimension;
  toolIntegrationOpportunity: OpportunityDimension;
  teamEfficiencyOpportunity: OpportunityDimension;
}

/**
 * Converts raw readiness dimension scores into opportunity-framed values.
 *
 * - Process Automation Potential: keep raw value (50% maturity = 50% potential)
 * - Tool Integration Opportunity: invert (low tech readiness = high integration upside)
 * - Team Efficiency Opportunity: keep raw value
 */
export function getOpportunityDimensions(
  d: DimensionScores
): OpportunityDimensions {
  return {
    processAutomationPotential: {
      label: "Process Automation Potential",
      pct: d.process_maturity,
      explanation: "How much of your day-to-day workflow can be automated.",
    },
    toolIntegrationOpportunity: {
      label: "Tool Integration Opportunity",
      pct: 100 - d.technical_readiness,
      explanation:
        "How much efficiency you can unlock by connecting your existing tools.",
    },
    teamEfficiencyOpportunity: {
      label: "Team Efficiency Opportunity",
      pct: d.organizational_readiness,
      explanation: "How much time your team can reclaim through automation.",
    },
  };
}

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
    title: "Tool Stack Integration Review",
    body: "Based on your answers, a focused integration review — connecting the tools you already use every day — is likely your highest-leverage starting point. We'd map your workflows and identify the 2–3 automations with the fastest payback.",
  },
};

const DIMENSION_RECOMMENDATIONS: Record<Dimension, Recommendation> = {
  process_maturity: {
    title: "Process Documentation & Workflow Audit",
    body: "Your highest opportunity is in Process Automation. A light-touch workflow audit to document your core processes will unlock automations that deliver immediate time savings.",
  },
  technical_readiness: {
    title: "Tool Stack Integration Review",
    body: "Your highest opportunity is in Tool Integration. Connecting the 2–3 tools you already use every day will unlock automations that were previously blocked by data silos.",
  },
  organizational_readiness: {
    title: "Start With a Small, Visible Pilot",
    body: "The fastest way to build momentum is a single, high-visibility pilot automation your team can feel in week one — confidence and buy-in compound from there.",
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
