-- ============================================================================
-- IC-COMEN 2027 — PRODUCTION SCHEMA BASELINE (AS-BUILT DOCUMENTATION)
-- ============================================================================
--
-- Generated: 2026-09-19, by direct introspection of the live Supabase
-- project (ref: quwqucsaamnoyocxpydd) via the Supabase MCP connector.
--
-- STATUS: DOCUMENTATION ONLY.
--   - This file has NOT been applied to production.
--   - It is NOT registered in Supabase's migration history.
--   - Do NOT run this file against production — every table, policy and
--     function below already exists; running it is unnecessary and several
--     statements (CREATE POLICY, CREATE TYPE) are not idempotent and would
--     error or (worse, if adapted carelessly) duplicate objects.
--   - It exists solely so the repository has an accurate record of what is
--     actually live, since `supabase migrations list` returns zero rows —
--     this schema was built by hand (SQL editor / dashboard), never through
--     the migration system, which is why supabase/migrations/*.sql in this
--     repo does not match reality.
--
-- FROM THIS POINT FORWARD: every new schema change must be a real migration
-- (via `apply_migration` / a reviewed .sql file in supabase/migrations/),
-- applied to production only after review. This baseline is not a template
-- to build new migrations on top of — new migrations should assume this
-- baseline is already live and only contain the incremental change.
--
-- ============================================================================
-- ENUM TYPES
-- ============================================================================

CREATE TYPE public.user_role AS ENUM ('admin', 'committee');
CREATE TYPE public.conference_status AS ENUM ('draft', 'published', 'completed');
CREATE TYPE public.registration_status AS ENUM ('pending', 'verified', 'rejected');

-- ============================================================================
-- LIVE TABLES — actively read/written by the application
-- ============================================================================

-- conferences: singleton-in-practice (exactly 1 row today, id below).
-- Note: `about`, `cmt_link`, `registration_link`, `contact_email` are real
-- production columns that do NOT exist in supabase/migrations/002_conferences.sql.
CREATE TABLE public.conferences (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name               text NOT NULL,
  short_name         text NOT NULL,
  year               integer NOT NULL,
  theme              text NOT NULL,
  tagline            text,
  start_date         date NOT NULL,
  end_date           date NOT NULL,
  venue_name         text NOT NULL,
  venue_address      text,
  city               text NOT NULL,
  state              text,
  country            text NOT NULL DEFAULT 'India',
  status             public.conference_status NOT NULL DEFAULT 'draft',
  about              text,
  cmt_link           text,
  registration_link  text,
  contact_email      text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
-- The only production row: id = 540c9aa6-9af7-457e-a762-1c4824710a08
-- (see src/constants/conference.ts, added in Phase 1).

-- conference_tracks: the REAL tracks table. `application code queries this,
-- not the "tracks" table below (which is dead — see Dead Tables section).
CREATE TABLE public.conference_tracks (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text NOT NULL,
  description    text,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.committee_members (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id    uuid REFERENCES public.conferences(id),
  name             text NOT NULL,
  designation      text NOT NULL,
  organization     text,
  committee_group  text NOT NULL,
  photo_url        text,
  display_order    integer NOT NULL DEFAULT 0,
  is_visible       boolean NOT NULL DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.speakers (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  slug           text NOT NULL,
  name           text NOT NULL,
  designation    text NOT NULL,
  organization   text NOT NULL,
  bio            text,
  photo_url      text,
  talk_title     text,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.important_dates (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text NOT NULL,
  description    text,
  event_date     date NOT NULL,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.announcements (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text NOT NULL,
  content        text NOT NULL,
  is_published   boolean NOT NULL DEFAULT false,
  published_at   timestamptz,
  created_by     uuid REFERENCES public.profiles(id),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.programme (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text NOT NULL,
  description    text,
  session_date   date NOT NULL,
  start_time     time NOT NULL,
  end_time       time NOT NULL,
  venue          text,
  speaker_id     uuid REFERENCES public.speakers(id),
  display_order  integer NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- registration_settings: standalone singleton table (NOT part of `settings`,
-- which is dead — see below). No `conference_id` column; single-row-in-practice.
CREATE TABLE public.registration_settings (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_open  boolean DEFAULT false,
  registration_url   text,
  author_fee         text,
  student_fee        text,
  industry_fee       text,
  international_fee  text,
  instructions       text,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now()
);

-- contact_settings: standalone singleton table (NOT part of `settings`).
-- No `conference_id` column; single-row-in-practice.
CREATE TABLE public.contact_settings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email            text,
  phone            text,
  address          text,
  google_maps_url  text,
  website          text,
  facebook_url     text,
  linkedin_url     text,
  twitter_url      text,
  youtube_url      text,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

-- profiles: exists, FK'd to auth.users, referenced by announcements.created_by.
-- Currently 0 rows — admin auth checks only "is there a logged-in Supabase
-- Auth user", NOT profiles.role. is_admin()/is_committee() (below) were
-- clearly built to enforce role-based access but are not called by any
-- policy or application code today.
CREATE TABLE public.profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name     text NOT NULL,
  role          public.user_role NOT NULL,
  designation   text,
  organization  text,
  phone         text,
  avatar_url    text,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- registrations: exists, FK'd to conferences, but has NO admin UI and NO
-- public-facing form — nothing in the app reads or writes it today.
CREATE TABLE public.registrations (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id   uuid REFERENCES public.conferences(id),
  full_name       text NOT NULL,
  email           text NOT NULL,
  phone           text NOT NULL,
  organization    text NOT NULL,
  designation     text,
  country         text NOT NULL DEFAULT 'India',
  paper_id        text NOT NULL,
  paper_title     text NOT NULL,
  amount_paid     numeric NOT NULL,
  transaction_id  text NOT NULL,
  payment_date    date NOT NULL,
  receipt_url     text NOT NULL,
  status          public.registration_status NOT NULL DEFAULT 'pending',
  remarks         text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- contact_messages: exists, but the /contact page has no working contact
-- form in the current codebase — nothing writes to this table today.
CREATE TABLE public.contact_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  subject     text NOT NULL,
  message     text NOT NULL,
  is_read     boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- DEAD TABLES — exist in production, 0 rows, no application code reads or
-- writes them. RLS is enabled with NO policies, so they are fully
-- inaccessible via the API today (locked, not a security hole).
-- Not dropped in this phase per explicit instruction — flagged for a future
-- cleanup decision, not acted on here.
-- ============================================================================

-- tracks: the migration-named duplicate of conference_tracks. Dead.
CREATE TABLE public.tracks (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text NOT NULL,
  description    text,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- settings: the migration-named duplicate of registration_settings +
-- contact_settings combined into one table. Dead.
CREATE TABLE public.settings (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id     uuid UNIQUE REFERENCES public.conferences(id),
  registration_open boolean NOT NULL DEFAULT false,
  contact_email     text,
  contact_phone     text,
  website_email     text,
  linkedin_url      text,
  facebook_url      text,
  twitter_url       text,
  youtube_url       text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.pages (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  slug           text NOT NULL,
  title          text NOT NULL,
  excerpt        text,
  content        text NOT NULL,
  is_published   boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.sponsors (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  name           text NOT NULL,
  website_url    text,
  logo_url       text,
  sponsor_level  text,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.downloads (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text NOT NULL,
  category       text NOT NULL,
  description    text,
  file_url       text NOT NULL,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.gallery (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id  uuid REFERENCES public.conferences(id),
  title          text,
  description    text,
  image_url      text NOT NULL,
  display_order  integer NOT NULL DEFAULT 0,
  is_visible     boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Used by `updated_at` triggers across most tables above (trigger definitions
-- themselves were not individually enumerated in this pass).
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Vestigial: built to support a profiles.role-based permission model.
-- Not called by any RLS policy or application code today (every policy
-- checks only `authenticated`, not these). Not removed in this phase.
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin' AND is_active = true
  );
$function$;

CREATE OR REPLACE FUNCTION public.is_committee()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'committee') AND is_active = true
  );
$function$;

-- ============================================================================
-- ROW LEVEL SECURITY — POLICY SUMMARY (all tables have RLS enabled)
-- ============================================================================
--
-- Live tables follow one consistent shape:
--   public/anon : SELECT (qual: true)
--   authenticated : INSERT, UPDATE, DELETE (qual/with_check: true — i.e. ANY
--                   authenticated user, not gated by profiles.role)
--
-- Applies to: announcements, committee_members, conference_tracks,
-- important_dates, programme, speakers.
--
-- conferences has 3 overlapping SELECT policies (one each for `public`,
-- `anon`, and `authenticated` — all qual: true). Redundant but harmless;
-- a cleanup candidate for later, not touched in this phase.
--
-- registration_settings and contact_settings: as of Phase 1 (2026-09-19)
-- these now also follow the standard shape after
--   "Public can read registration_settings" / "Public can read contact_settings"
-- were added (see migration `add_public_read_registration_contact_settings`).
-- Before that fix, these two tables had NO anon/public SELECT policy — a
-- real bug that silently blocked the public /registration and /contact
-- pages from ever showing real data to anonymous visitors.
--
-- Dead tables (tracks, settings, pages, sponsors, downloads, gallery,
-- registrations, contact_messages, profiles) all have RLS enabled with
-- ZERO policies — fully inaccessible via the API by any role. This is safe
-- (nothing can read or write them) but also means any future feature that
-- tries to reuse one of these tables as-is will need policies added first.

-- ============================================================================
-- STORAGE BUCKETS (all created 2026-06-10, at initial project setup)
-- ============================================================================
--
--   speaker_photos          public
--   committee_photos        public
--   gallery                 public
--   downloads               public
--   sponsors_logos          public
--   registration_receipts   private
--
-- Note (Phase 1 finding, fixed 2026-09-19): the speaker and committee-member
-- admin upload components previously targeted buckets named "speakers" and
-- "committee-members", which do not exist — every new-photo upload failed.
-- Fixed to point at the real bucket names above; no bucket was renamed and
-- no existing stored image was affected.
