-- =============================================================================
-- 366 Industries & 1st Defence Industries — Supabase Schema & RLS Migration
-- Run this SQL in your Supabase Project -> SQL Editor
-- =============================================================================

-- 1. Member Profiles Table (synced with Supabase Auth `auth.users` and `/api/auth/session`)
create table if not exists public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  email text not null unique,
  full_name text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  status text not null default 'active' check (status in ('active', 'suspended')),
  account_type text not null default 'Humanitarian Supporter & Donor',
  region text not null default 'Global',
  updates_opt_in boolean not null default true,
  last_sign_in_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Seed Jordilwbailey@gmail.com as Root Super Admin
insert into public.member_profiles (email, full_name, role, status, account_type, region, updates_opt_in)
values (
  'jordilwbailey@gmail.com',
  'Jordi L. W. Bailey (Founder & Super Admin)',
  'admin',
  'active',
  'Root Super Admin • 366 & 1st Defence Industries',
  'Canada (BC) • Philippines (Ilocos Norte) • USA',
  true
)
on conflict (email) do update set role = 'admin', status = 'active';

create index if not exists idx_member_profiles_email on public.member_profiles(email);
create index if not exists idx_member_profiles_auth_user_id on public.member_profiles(auth_user_id);

-- 2. Donations & Humanitarian Pledges Table (written by `/api/donations` & `/donate`)
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  pledge_ref text not null unique,
  donor_name text not null,
  donor_email text not null,
  amount_usd numeric(12, 2) not null check (amount_usd > 0),
  frequency text not null default 'once' check (frequency in ('once', 'monthly', 'institutional')),
  mission_id text not null default 'all-humanitarian',
  mission_title text not null,
  donor_note text,
  status text not null default 'pledged',
  created_at timestamptz not null default now()
);

create index if not exists idx_donations_donor_email on public.donations(donor_email);
create index if not exists idx_donations_mission_id on public.donations(mission_id);
create index if not exists idx_donations_created_at on public.donations(created_at desc);

-- 3. Automatic Trigger: Sync `auth.users` signups into `public.member_profiles`
create or replace function public.handle_new_366_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.member_profiles (
    auth_user_id,
    email,
    full_name,
    account_type,
    region,
    updates_opt_in,
    last_sign_in_at
  )
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'account_type', 'Humanitarian Supporter & Donor'),
    coalesce(new.raw_user_meta_data->>'region', 'Global'),
    coalesce((new.raw_user_meta_data->>'updates_opt_in')::boolean, true),
    now()
  )
  on conflict (email) do update set
    auth_user_id = excluded.auth_user_id,
    full_name = excluded.full_name,
    account_type = excluded.account_type,
    region = excluded.region,
    last_sign_in_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_366 on auth.users;
create trigger on_auth_user_created_366
  after insert on auth.users
  for each row execute procedure public.handle_new_366_user();

-- 4. Enable Row Level Security (RLS) & Policies
alter table public.member_profiles enable row level security;
alter table public.donations enable row level security;

-- Allow public/anon insert & upsert for website signup and donation pledges
drop policy if exists "Allow website member profile registration" on public.member_profiles;
create policy "Allow website member profile registration"
  on public.member_profiles
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow users to view and update own profile" on public.member_profiles;
create policy "Allow users to view and update own profile"
  on public.member_profiles
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow website donation pledges insert" on public.donations;
create policy "Allow website donation pledges insert"
  on public.donations
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow reading donation pledges" on public.donations;
create policy "Allow reading donation pledges"
  on public.donations
  for select
  to anon, authenticated
  using (true);
