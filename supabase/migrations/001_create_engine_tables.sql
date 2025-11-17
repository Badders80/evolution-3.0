-- Evolution Engine Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. OWNERS TABLE
-- ============================================================================
-- Owner profile + declarations + contact details

create table if not exists owners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_person text not null,
  email text not null,
  phone text,
  owner_confirms_right_to_lease boolean not null default false,
  owner_approves_digital_syndication boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add unique constraint on email
create unique index if not exists owners_email_idx on owners(email);

-- ============================================================================
-- 2. TRAINERS TABLE
-- ============================================================================
-- Simple placeholder, will expand later

create table if not exists trainers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 3. RACING MANAGERS TABLE
-- ============================================================================
-- Simple placeholder for now

create table if not exists racing_managers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================================
-- 4. HORSES TABLE
-- ============================================================================
-- Horse identity + trainer + location + linkage

create table if not exists horses (
  id uuid primary key default gen_random_uuid(),
  horse_name text not null,
  microchip_number text not null,
  life_number text not null,
  sex text not null,
  height_hands text,
  training_location text,
  property_name text,
  horse_owner_name text,
  trainer_id uuid references trainers(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add unique constraint on microchip and life number
create unique index if not exists horses_microchip_idx on horses(microchip_number);
create unique index if not exists horses_life_number_idx on horses(life_number);

-- ============================================================================
-- 5. TERM SHEETS TABLE (SSOK - Single Source of Knowledge)
-- ============================================================================
-- The heart of the onboarding workflow

create table if not exists term_sheets (
  id uuid primary key default gen_random_uuid(),

  -- Foreign Keys
  owner_id uuid not null references owners(id) on delete cascade,
  horse_id uuid not null references horses(id) on delete cascade,

  -- Lease Details
  syndicate_name text not null,
  lease_type text not null,
  lease_start date not null,
  lease_end date not null,
  lease_duration_months integer not null,
  minimum_token_size numeric not null,
  number_of_tokens_available integer not null,
  lease_price_per_one_percent numeric not null,
  token_holder_revenue_share_percent integer not null,
  tokinvest_platform_fee_percent integer not null,
  evolution_fee_percent integer not null,

  -- Tokenisation Metadata
  token_symbol text not null,
  token_network text not null,
  custodian text not null,
  token_mint_authority text not null,
  token_transfer_restrictions text not null,

  -- Authority Checks
  racing_manager_id uuid references racing_managers(id),
  racing_manager_approves_syndication boolean not null default false,
  trainer_confirms_horse_details boolean not null default false,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add indexes for common queries
create index if not exists term_sheets_owner_id_idx on term_sheets(owner_id);
create index if not exists term_sheets_horse_id_idx on term_sheets(horse_id);
create index if not exists term_sheets_racing_manager_id_idx on term_sheets(racing_manager_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Enable but configure later
-- ============================================================================

-- Enable RLS on all tables (policies to be added later)
alter table owners enable row level security;
alter table trainers enable row level security;
alter table racing_managers enable row level security;
alter table horses enable row level security;
alter table term_sheets enable row level security;

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

-- Function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply trigger to all tables (use DROP IF EXISTS to make idempotent)
drop trigger if exists update_owners_updated_at on owners;
create trigger update_owners_updated_at
  before update on owners
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_trainers_updated_at on trainers;
create trigger update_trainers_updated_at
  before update on trainers
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_racing_managers_updated_at on racing_managers;
create trigger update_racing_managers_updated_at
  before update on racing_managers
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_horses_updated_at on horses;
create trigger update_horses_updated_at
  before update on horses
  for each row
  execute function update_updated_at_column();

drop trigger if exists update_term_sheets_updated_at on term_sheets;
create trigger update_term_sheets_updated_at
  before update on term_sheets
  for each row
  execute function update_updated_at_column();

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================

-- Verification query (optional - run separately to check)
-- select table_name from information_schema.tables 
-- where table_schema = 'public' 
-- and table_name in ('owners', 'trainers', 'racing_managers', 'horses', 'term_sheets');
