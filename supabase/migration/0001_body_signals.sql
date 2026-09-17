-- The body's nervous system: raw signals from visitors, and a log of what it said.
-- Written server-side only (service role). No client ever talks to Supabase directly.

create table if not exists body_signals (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,           -- anon fingerprint, generated client-side, no PII
  section text not null,              -- 'hero' | 'work' | 'about' | 'contact' | etc
  signal_type text not null check (signal_type in (
    'dwell', 'hover', 'rage_click', 'idle', 'scroll_stall', 'form_abandon'
  )),
  intensity numeric not null default 0,  -- seconds for dwell/idle, click count for rage_click
  metadata jsonb default '{}'::jsonb,    -- optional: element id, field name, etc
  created_at timestamptz not null default now()
);

create index if not exists body_signals_created_at_idx on body_signals (created_at desc);
create index if not exists body_signals_session_idx on body_signals (session_id);

-- Log of what the body has actually said, so the aggregator can enforce cooldowns
-- and never repeat itself blindly.
create table if not exists body_posts (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  trigger_state jsonb not null,      -- the state object that caused this post
  bluesky_uri text,                  -- returned by AT Protocol on success
  posted_at timestamptz not null default now()
);

create index if not exists body_posts_posted_at_idx on body_posts (posted_at desc);

-- Lock both tables down. Only the service role (used server-side only) can touch these.
-- No anon/authenticated policies are defined on purpose — there should be zero direct
-- client access to this data, ever.
alter table body_signals enable row level security;
alter table body_posts enable row level security;

-- Housekeeping: signals older than a few hours are noise, not history. Keep the table small.
-- Run this periodically (the aggregate route does a light version of this after each run).
-- delete from body_signals where created_at < now() - interval '6 hours';