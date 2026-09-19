> ⚠️ STALE — this document does not match production. `tracks` and
> `settings` below are dead tables; the application actually uses
> `conference_tracks`, `registration_settings`, and `contact_settings`
> (which aren't listed here at all), and `conferences` has 4 additional
> columns (`about`, `cmt_link`, `registration_link`, `contact_email`) not
> reflected below. See `docs/database/production-schema-baseline.sql` for
> the verified, as-built production schema (documented 2026-09-19).

1. Enums
user_role
- admin
- committee

conference_status
- draft
- published
- completed

registration_status
- pending
- verified
- rejected


2. Core Tables
conferences
profiles
settings


3. Content Tables
important_dates
announcements
speakers
committee_members
programme
tracks
pages
sponsors
downloads
gallery


4. Operational Tables
registrations
contact_messages


5. External Systems
CMT
├── Paper Submission
├── Reviews
├── Acceptance
└── Camera Ready

Conference Website
├── Registration
├── Content Management
├── Speakers
├── Programme
└── Contact Forms