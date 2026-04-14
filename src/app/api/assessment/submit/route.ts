import { NextRequest, NextResponse } from "next/server";
import {
  PAIN_POINT_OPTIONS,
  TEAM_SIZE_OPTIONS,
  PainPoint,
  TeamSize,
} from "@/lib/assessment/questions";
import {
  Answers,
  calculateScores,
  getRecommendations,
} from "@/lib/assessment/scoring";
import { generateReportPdf } from "@/lib/assessment/pdf";
import {
  sendEmail,
  INTERNAL_NOTIFICATION_TO,
} from "@/lib/email/resend";
import {
  reportEmail,
  internalNotificationEmail,
} from "@/lib/email/templates";
import { getSupabase } from "@/lib/supabase/server";

// Force Node runtime (jsPDF + crypto + Buffer)
export const runtime = "nodejs";

interface SubmitPayload {
  name: string;
  email: string;
  company: string;
  teamSize?: TeamSize;
  answers: Answers;
  painPoint: PainPoint;
  painPointOther?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(body: SubmitPayload): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !isValidEmail(body.email)) return "Valid email is required.";
  if (!body.company?.trim()) return "Company is required.";
  if (body.teamSize && !TEAM_SIZE_OPTIONS.includes(body.teamSize)) {
    return "Invalid team size.";
  }
  if (!body.painPoint || !PAIN_POINT_OPTIONS.includes(body.painPoint)) {
    return "Pain point selection is required.";
  }
  if (body.painPoint === "Other" && !body.painPointOther?.trim()) {
    return "Please describe your pain point.";
  }
  const required: (keyof Answers)[] = [
    "q1_process_documentation",
    "q2_repetitive_task_load",
    "q3_tool_stack",
    "q4_data_quality",
    "q5_ai_experience",
    "q6_decision_speed",
    "q7_budget_mindset",
  ];
  for (const k of required) {
    const v = body.answers?.[k];
    if (v !== 1 && v !== 2 && v !== 3 && v !== 4) {
      return `Invalid answer for ${k}.`;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: SubmitPayload;
  try {
    body = (await req.json()) as SubmitPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const {
    name,
    email,
    company,
    teamSize,
    answers,
    painPoint,
    painPointOther,
  } = body;

  const score = calculateScores(answers);
  const recommendations = getRecommendations(score.dimensions, painPoint);

  // ── Generate PDF ──
  let pdfBuffer: Buffer | null = null;
  try {
    const bytes = generateReportPdf({
      name,
      company,
      overall: score.overall,
      dimensions: score.dimensions,
      recommendations,
      painPoint,
    });
    pdfBuffer = Buffer.from(bytes);
  } catch (err) {
    console.error("[assessment/submit] PDF generation failed:", err);
  }

  // ── Insert into Supabase (if configured) ──
  let dbStored = false;
  let dbError: string | undefined;
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("assessment_leads").insert({
      name,
      email,
      company,
      team_size: teamSize ?? null,
      answers,
      dimension_scores: score.dimensions,
      overall_score: score.overall,
      tier: score.tier,
      pain_point: painPoint,
      pain_point_other: painPointOther ?? null,
    });
    if (error) {
      dbError = error.message;
      console.error("[assessment/submit] Supabase insert error:", error);
    } else {
      dbStored = true;
    }
  } else {
    dbError = "Supabase not configured";
  }

  // ── Send report email to lead ──
  let emailError: string | undefined;
  const { subject, html } = reportEmail({
    name,
    company,
    overall: score.overall,
    dimensions: score.dimensions,
  });
  const leadEmailResult = await sendEmail({
    to: email,
    subject,
    html,
    attachments: pdfBuffer
      ? [
          {
            filename: `Speedwell-AI-Automation-Opportunity-Report-${company.replace(/[^a-z0-9]+/gi, "-")}.pdf`,
            content: pdfBuffer,
          },
        ]
      : undefined,
  });
  if (!leadEmailResult.ok) {
    emailError = leadEmailResult.error;
    console.error("[assessment/submit] Lead email failed:", emailError);
  }

  // ── Send internal notification (always — fallback safety net) ──
  const internal = internalNotificationEmail({
    name,
    email,
    company,
    teamSize,
    overall: score.overall,
    tier: score.tier,
    dimensions: score.dimensions,
    painPoint,
    painPointOther,
    answers: answers as unknown as Record<string, number>,
    dbStored,
    dbError,
    emailError,
  });
  const internalResult = await sendEmail({
    to: INTERNAL_NOTIFICATION_TO,
    subject: internal.subject,
    html: internal.html,
    replyTo: email,
  });
  if (!internalResult.ok) {
    console.error(
      "[assessment/submit] Internal notification failed:",
      internalResult.error
    );
  }

  // ── Response for the UI ──
  return NextResponse.json({
    success: true,
    email,
    scores: {
      overall: score.overall,
      tier: score.tier,
      tierDescription: score.tierDescription,
      dimensions: score.dimensions,
    },
    recommendations,
  });
}
