
-- Ngelana: initial database schema
-- Migration: 001_initial_schema.sql

create extension if not exists pgcrypto;

-- 1. User profiles
-- Account identity is managed by Supabase Auth.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'hiker'
    check (role in ('hiker', 'operator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Prevent a new user from assigning themselves operator/admin.
create or replace function public.handle_new_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    'hiker'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_profile();

-- Protect role changes made by ordinary authenticated users.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' then
    new.role := old.role;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

create trigger protect_profile_role_before_update
before update on public.profiles
for each row execute procedure public.protect_profile_role();


-- 2. Destinations
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  province text not null,
  regency text,
  category text not null
    check (category in ('mountain', 'hill')),
  description text,
  image_url text,
  verification_status text not null default 'draft'
    check (
      verification_status in ('draft', 'pending', 'verified', 'rejected')
    ),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- 3. Trails belonging to destinations
create table public.trails (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null
    references public.destinations(id) on delete cascade,
  name text not null,
  start_point text,
  distance_km numeric(7,2)
    check (distance_km is null or distance_km >= 0),
  estimated_duration_hours numeric(6,2)
    check (
      estimated_duration_hours is null
      or estimated_duration_hours >= 0
    ),
  difficulty text not null default 'unverified'
    check (
      difficulty in ('easy', 'moderate', 'hard', 'unverified')
    ),
  verification_status text not null default 'draft'
    check (
      verification_status in ('draft', 'pending', 'verified', 'rejected')
    ),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- 4. Trail status update history
create table public.trail_status_updates (
  id uuid primary key default gen_random_uuid(),
  trail_id uuid not null
    references public.trails(id) on delete cascade,
  status text not null
    check (
      status in (
        'open',
        'restricted',
        'closed',
        'emergency'
      )
    ),
  message text not null,
  source_name text not null,
  source_url text,
  observed_at timestamptz not null,
  published_by uuid references public.profiles(id) on delete set null,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);


-- 5. Reservations
create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  booking_code text not null unique,
  user_id uuid not null references public.profiles(id),
  trail_id uuid not null references public.trails(id),
  hiking_date date not null,
  participant_count integer not null
    check (participant_count between 1 and 50),
  status text not null default 'pending'
    check (
      status in (
        'pending',
        'confirmed',
        'rejected',
        'cancelled',
        'completed'
      )
    ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- 6. Participants in a reservation
create table public.reservation_members (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null
    references public.reservations(id) on delete cascade,
  full_name text not null,
  identity_reference text,
  created_at timestamptz not null default now()
);


-- Indexes for common lookups
create index idx_destinations_province
  on public.destinations(province);

create index idx_destinations_published
  on public.destinations(is_published);

create index idx_trails_destination
  on public.trails(destination_id);

create index idx_trail_status_trail_time
  on public.trail_status_updates(trail_id, observed_at desc);

create index idx_reservations_user_date
  on public.reservations(user_id, hiking_date);

create index idx_reservations_trail_date
  on public.reservations(trail_id, hiking_date);


-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.destinations enable row level security;
alter table public.trails enable row level security;
alter table public.trail_status_updates enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_members enable row level security;


-- Profiles: users can read their own profile.
create policy "Users can read own profile"
on public.profiles
for select to authenticated
using ((select auth.uid()) = id);

-- Users can update their own non-role fields.
create policy "Users can update own profile"
on public.profiles
for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);


-- Public catalog: only published and verified destinations.
create policy "Public can read verified destinations"
on public.destinations
for select to anon, authenticated
using (
  is_published = true
  and verification_status = 'verified'
);


-- Public catalog: only published trails of verified destinations.
create policy "Public can read verified trails"
on public.trails
for select to anon, authenticated
using (
  is_published = true
  and verification_status = 'verified'
  and exists (
    select 1
    from public.destinations d
    where d.id = destination_id
      and d.is_published = true
      and d.verification_status = 'verified'
  )
);


-- Public can read published status updates for visible trails.
create policy "Public can read published trail updates"
on public.trail_status_updates
for select to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.trails t
    join public.destinations d
      on d.id = t.destination_id
    where t.id = trail_id
      and t.is_published = true
      and t.verification_status = 'verified'
      and d.is_published = true
      and d.verification_status = 'verified'
  )
);


-- Users can read their own reservations.
-- Writes will be added through validated server-side booking logic.
create policy "Users can read own reservations"
on public.reservations
for select to authenticated
using ((select auth.uid()) = user_id);


-- Users can read participant names for their own reservations.
create policy "Users can read own reservation members"
on public.reservation_members
for select to authenticated
using (
  exists (
    select 1
    from public.reservations r
    where r.id = reservation_id
      and r.user_id = (select auth.uid())
  )
);
