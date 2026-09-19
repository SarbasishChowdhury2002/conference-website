/**
 * Row shapes for the tables the public site reads, matching the verified
 * production schema — see docs/database/production-schema-baseline.sql.
 * Not exhaustive (admin-only fields/tables are left untyped for now); add
 * to this as more of the app is typed.
 */

export interface Conference {
  id: string;
  name: string;
  short_name: string;
  year: number;
  theme: string;
  tagline: string | null;
  start_date: string;
  end_date: string;
  venue_name: string;
  venue_address: string | null;
  city: string;
  state: string | null;
  country: string;
  status: "draft" | "published" | "completed";
  about: string | null;
  cmt_link: string | null;
  registration_link: string | null;
  contact_email: string | null;
}

export interface ConferenceTrack {
  id: string;
  title: string;
  description: string | null;
  display_order: number;
  is_visible: boolean;
}

export interface ImportantDate {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  display_order: number;
  is_visible: boolean;
}

export interface RegistrationSettings {
  id: string;
  registration_open: boolean | null;
  registration_url: string | null;
  author_fee: string | null;
  student_fee: string | null;
  industry_fee: string | null;
  international_fee: string | null;
  instructions: string | null;
}

export interface ContactSettings {
  id: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  google_maps_url: string | null;
  website: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  organization: string | null;
  committee_group: string;
  photo_url: string | null;
  display_order: number;
}
