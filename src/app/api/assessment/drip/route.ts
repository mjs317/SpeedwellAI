import { NextRequest, NextResponse } from "next/server";
import { getSupabase, AssessmentLeadRow } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/resend";
import { day3Email, day7Email } from "@/lib/email/templates";
import {
  getLowestDimension,
  getDimensionLabel,
  getRecommendations,
  Tier,
} from "@/lib/assessment/scoring";
import { PainPoint } from "@/lib/assessment/questions";

export const runtime = "nodejs";

// Vercel Cron sends: Authorization: Bearer $CRON_SECRET
function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization") || "";
  return header === `Bearer ${secret}`;
}

async function leadsForDay(
  client: ReturnType<typeof getSupabase>,
  daysAgo: number,
  flag: "drip_day3_sent" | "drip_day7_sent"
): Promise<AssessmentLeadRow[]> {
  if (!client) return [];
  // Leads whose created_at date equals today - daysAgo (UTC)
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - daysAgo);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  const { data, error } = await client
    .from("assessment_leads")
    .select("*")
    .gte("created_at", start.toISOString())
    .lt("created_at", end.toISOString())
    .eq(flag, false);

  if (error) {
    console.error("[drip] query error", flag, error);
    return [];
  }
  return (data || []) as AssessmentLeadRow[];
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  let day3Count = 0;
  let day7Count = 0;

  // ── Day 3 ──
  const day3Leads = await leadsForDay(supabase, 3, "drip_day3_sent");
  for (const lead of day3Leads) {
    if (
      !lead.dimension_scores ||
      lead.overall_score == null ||
      !lead.tier ||
      !lead.pain_point
    ) {
      continue;
    }
    const lowest = getLowestDimension(lead.dimension_scores);
    const recs = getRecommendations(
      lead.dimension_scores,
      lead.pain_point as PainPoint
    );
    const { subject, html } = day3Email({
      name: lead.name,
      overall: lead.overall_score,
      tier: lead.tier as Tier,
      lowestDimensionLabel: getDimensionLabel(lowest),
      topRecommendation: recs[0],
    });
    const result = await sendEmail({ to: lead.email, subject, html });
    if (result.ok) {
      await supabase
        .from("assessment_leads")
        .update({ drip_day3_sent: true })
        .eq("id", lead.id);
      day3Count++;
    } else {
      console.error("[drip] day3 send failed", lead.id, result.error);
    }
  }

  // ── Day 7 ──
  const day7Leads = await leadsForDay(supabase, 7, "drip_day7_sent");
  for (const lead of day7Leads) {
    if (lead.overall_score == null || !lead.pain_point) continue;
    const painArea =
      lead.pain_point === "Other" && lead.pain_point_other
        ? lead.pain_point_other
        : lead.pain_point;
    const { subject, html } = day7Email({
      name: lead.name,
      company: lead.company,
      overall: lead.overall_score,
      painPointArea: painArea,
    });
    const result = await sendEmail({ to: lead.email, subject, html });
    if (result.ok) {
      await supabase
        .from("assessment_leads")
        .update({ drip_day7_sent: true })
        .eq("id", lead.id);
      day7Count++;
    } else {
      console.error("[drip] day7 send failed", lead.id, result.error);
    }
  }

  return NextResponse.json({
    ok: true,
    day3Sent: day3Count,
    day7Sent: day7Count,
  });
}
