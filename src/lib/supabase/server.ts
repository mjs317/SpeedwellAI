// ─── Supabase Server Client ─────────────────────────────────────────────────
//
// SETUP — required before leads will be stored:
//   1. Create a free Supabase project at https://supabase.com (500 MB free).
//   2. In the SQL editor, run the SQL from `supabase/schema.sql` in this repo
//      to create the `assessment_leads` table.
//   3. In Supabase → Settings → API, copy the Project URL and the
//      service_role key (NOT the anon key — service_role bypasses RLS so
//      server-side inserts work).
//   4. In Vercel → Project → Settings → Environment Variables, add:
//        NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//        SUPABASE_SERVICE_ROLE_KEY=eyJ...
//
// If these env vars are missing, `getSupabase()` returns null and the submit
// route falls back to emailing the lead internally so nothing is ever lost.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface AssessmentLeadRow {
  id: string;
  name: string;
  email: string;
  company: string;
  team_size: string | null;
  answers: Record<string, number> | null;
  dimension_scores: {
    process_maturity: number;
    technical_readiness: number;
    organizational_readiness: number;
  } | null;
  overall_score: number | null;
  tier: string | null;
  pain_point: string | null;
  pain_point_other: string | null;
  drip_day3_sent: boolean;
  drip_day7_sent: boolean;
  created_at: string;
}

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
