-- Run this in Supabase: Dashboard → SQL Editor → New query → paste → Run

create table if not exists leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz default now(),
  intent          boolean,
  timeline        text,
  budget          text,
  finance_status  text,
  verification_score integer default 0,
  location        text,
  build_type      text,
  lead_score      integer default 0,
  status          text default 'Warm',
  channel         text,
  utm_campaign    text,
  utm_medium      text,
  assigned_builder_id uuid
);

-- Allow public inserts (for the qualification form)
alter table leads enable row level security;

create policy "Allow public insert"
  on leads for insert
  with check (true);

create policy "Allow public select"
  on leads for select
  using (true);
