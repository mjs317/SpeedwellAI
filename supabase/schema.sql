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

-- Enable RLS to prevent public access via the anon key.
alter table assessment_leads enable row level security;

-- Allow anonymous form submissions (INSERT only).
-- Reads, updates, and deletes are performed server-side via service_role, which bypasses RLS.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'assessment_leads'
    and policyname = 'Allow anonymous inserts'
  ) then
    create policy "Allow anonymous inserts"
      on assessment_leads for insert
      with check (true);
  end if;
end
$$;
