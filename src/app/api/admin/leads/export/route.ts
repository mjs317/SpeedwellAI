import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/admin/session";
import { getSupabase, AssessmentLeadRow } from "@/lib/supabase/server";

export const runtime = "nodejs";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = typeof v === "string" ? v : JSON.stringify(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("assessment_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data || []) as AssessmentLeadRow[];

  const headers = [
    "created_at",
    "name",
    "email",
    "company",
    "team_size",
    "overall_score",
    "tier",
    "process_maturity",
    "technical_readiness",
    "organizational_readiness",
    "pain_point",
    "pain_point_other",
    "drip_day3_sent",
    "drip_day7_sent",
    "answers",
  ];

  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.created_at,
        r.name,
        r.email,
        r.company,
        r.team_size,
        r.overall_score,
        r.tier,
        r.dimension_scores?.process_maturity,
        r.dimension_scores?.technical_readiness,
        r.dimension_scores?.organizational_readiness,
        r.pain_point,
        r.pain_point_other,
        r.drip_day3_sent,
        r.drip_day7_sent,
        r.answers,
      ]
        .map(csvEscape)
        .join(",")
    );
  }

  const csv = lines.join("\n");
  const filename = `speedwell-leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
