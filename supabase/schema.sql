-- IFSA NIT Trichy — Supabase schema
-- Run this in Supabase SQL editor or as a migration

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text not null,
  date text not null,
  venue text not null,
  description text not null,
  registration_link text,
  is_upcoming boolean not null default true,
  attendance integer,
  created_at timestamptz not null default now()
);

-- Publications
create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text not null,
  category text not null,
  year integer not null,
  abstract text not null,
  pdf_link text,
  is_free boolean not null default true,
  read_time integer not null default 5,
  created_at timestamptz not null default now()
);

-- Team members
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  vertical text,
  headshot_url text,
  linkedin_url text,
  created_at timestamptz not null default now()
);

-- FAQs
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text not null,
  headshot_url text,
  created_at timestamptz not null default now()
);

-- Partnership inquiries (form submissions)
create table if not exists partnership_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security (anon can read public tables)
alter table events enable row level security;
alter table publications enable row level security;
alter table team_members enable row level security;
alter table faqs enable row level security;
alter table testimonials enable row level security;
alter table partnership_inquiries enable row level security;

create policy "Public read events" on events for select using (true);
create policy "Public read publications" on publications for select using (true);
create policy "Public read team" on team_members for select using (true);
create policy "Public read faqs" on faqs for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Insert inquiries" on partnership_inquiries for insert with check (true);
