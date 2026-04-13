// ─── AI Readiness Assessment — Question Bank ────────────────────────────────
//
// Q1–Q7 are single-select scored questions (1–4). Q8 is a pain-point picker
// (not scored) used to personalize recommendations.
//
// Dimension mapping (see scoring.ts):
//   Process Maturity           — Q1, Q2
//   Technical Readiness        — Q3, Q4
//   Organizational Readiness   — Q5, Q6, Q7

export type Dimension =
  | "process_maturity"
  | "technical_readiness"
  | "organizational_readiness";

export interface QuestionOption {
  label: string;
  score: 1 | 2 | 3 | 4;
}

export interface ScoredQuestion {
  id: string;
  dimension: Dimension;
  prompt: string;
  options: QuestionOption[];
}

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: "q1_process_documentation",
    dimension: "process_maturity",
    prompt: "How well are your core business processes documented?",
    options: [
      { label: "We don't have documented processes", score: 1 },
      { label: "Some processes are loosely documented", score: 2 },
      {
        label: "Most key processes are documented but not always followed",
        score: 3,
      },
      {
        label: "Core processes are well-documented and consistently followed",
        score: 4,
      },
    ],
  },
  {
    id: "q2_repetitive_task_load",
    dimension: "process_maturity",
    prompt:
      "How much of your team's time is spent on repetitive, manual tasks?",
    options: [
      {
        label: "Almost all of it — we're drowning in manual work",
        score: 4,
      },
      {
        label: "A significant amount — probably 30–50% of our week",
        score: 3,
      },
      { label: "Some, but we've automated the obvious stuff", score: 2 },
      {
        label: "Very little — most routine work is already handled",
        score: 1,
      },
    ],
  },
  {
    id: "q3_tool_stack",
    dimension: "technical_readiness",
    prompt: "What does your current software stack look like?",
    options: [
      { label: "Mostly spreadsheets, email, and paper", score: 1 },
      { label: "A few cloud tools but they don't talk to each other", score: 2 },
      { label: "We use several SaaS tools with some integrations", score: 3 },
      {
        label: "Integrated stack with APIs and automations already in place",
        score: 4,
      },
    ],
  },
  {
    id: "q4_data_quality",
    dimension: "technical_readiness",
    prompt: "How would you describe the state of your business data?",
    options: [
      {
        label: "Scattered across spreadsheets, inboxes, and people's heads",
        score: 1,
      },
      {
        label: "In a few systems but inconsistent and often outdated",
        score: 2,
      },
      { label: "Mostly centralized with some gaps and duplicates", score: 3 },
      { label: "Clean, centralized, and regularly maintained", score: 4 },
    ],
  },
  {
    id: "q5_ai_experience",
    dimension: "organizational_readiness",
    prompt: "Has your team tried AI or automation tools before?",
    options: [
      { label: "Never — we haven't explored it", score: 1 },
      {
        label: "We've looked into it but haven't implemented anything",
        score: 2,
      },
      { label: "We've tried tools like ChatGPT for ad hoc tasks", score: 3 },
      { label: "We have automations running in production", score: 4 },
    ],
  },
  {
    id: "q6_decision_speed",
    dimension: "organizational_readiness",
    prompt: "How quickly can your business act on new operational changes?",
    options: [
      { label: "Very slow — changes take months and lots of approval", score: 1 },
      { label: "Moderate — we can move but it takes coordination", score: 2 },
      { label: "Fairly fast — leadership can greenlight changes quickly", score: 3 },
      { label: "Very fast — we test and implement new things weekly", score: 4 },
    ],
  },
  {
    id: "q7_budget_mindset",
    dimension: "organizational_readiness",
    prompt: "How does your business think about investing in operational tools?",
    options: [
      {
        label: "We avoid spending on tools unless absolutely necessary",
        score: 1,
      },
      { label: "We'll invest if someone proves the ROI first", score: 2 },
      {
        label: "We regularly invest in tools that save time or money",
        score: 3,
      },
      {
        label: "We actively seek and budget for operational improvements",
        score: 4,
      },
    ],
  },
];

// ─── Q8 — Pain point (not scored) ──────────────────────────────────────────

export const PAIN_POINT_OPTIONS = [
  "Lead follow-up and CRM management",
  "Invoicing, billing, or accounts payable",
  "Scheduling, coordination, and calendar management",
  "Reporting, data entry, or document processing",
  "Customer onboarding or intake",
  "Other",
] as const;

export type PainPoint = (typeof PAIN_POINT_OPTIONS)[number];

export const PAIN_POINT_QUESTION =
  "What's the single biggest time sink in your operations?";

// ─── Team size options (Step 1) ────────────────────────────────────────────

export const TEAM_SIZE_OPTIONS = [
  "Just me",
  "2-5",
  "6-15",
  "16-50",
  "51-250",
] as const;

export type TeamSize = (typeof TEAM_SIZE_OPTIONS)[number];
