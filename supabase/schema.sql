-- Run this in the Supabase SQL editor once per project.
-- It is idempotent — safe to re-run.

create table if not exists assessment_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  team_size text,
  answers jsonb,
  dimension_scores jsonb,
  overall_score integer,
  tier text,
  pain_point text,
  pain_point_other text,
  drip_day3_sent boolean default false,
  drip_day7_sent boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_assessment_leads_created_at
  on assessment_leads(created_at desc);

create index if not exists idx_assessment_leads_drip
  on assessment_leads(created_at, drip_day3_sent, drip_day7_sent);
