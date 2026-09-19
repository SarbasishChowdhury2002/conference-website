import { getConference } from "@/lib/data/conference";
import { getTracks } from "@/lib/data/tracks";
import { getImportantDates } from "@/lib/data/important-dates";
import { getRegistrationSettings } from "@/lib/data/registration";
import { getAnnouncements } from "@/lib/data/announcements";
import { getCommitteeMembers } from "@/lib/data/committee";
import { safeFetch } from "@/lib/safe-fetch";

import { Hero } from "@/components/public/home/hero";
import { ConferenceFacts } from "@/components/public/home/conference-facts";
import { AboutSection } from "@/components/public/home/about-section";
import { CfpSection } from "@/components/public/home/cfp-section";
import { TracksPreview } from "@/components/public/home/tracks-preview";
import { ImportantDatesPreview } from "@/components/public/home/important-dates-preview";
import { RegistrationCta } from "@/components/public/home/registration-cta";
import { VenuePreview } from "@/components/public/home/venue-preview";
import { AttractionsPreview } from "@/components/public/home/attractions-preview";
import { AnnouncementsPreview } from "@/components/public/home/announcements-preview";
import { CommitteePreview } from "@/components/public/home/committee-preview";
import { SubmissionCta } from "@/components/public/home/submission-cta";

import type {
  Conference,
  ConferenceTrack,
  ImportantDate,
  RegistrationSettings,
  Announcement,
  CommitteeMember,
} from "@/types/database";

/**
 * Homepage. `conference` and `registrationSettings` are allowed to come
 * back null (the page still renders sensibly — every downstream component
 * treats them as optional). `tracks`/`dates`/`announcements`/`committee`
 * each go through `safeFetch` so a genuine Supabase error surfaces as a
 * distinct "temporarily unavailable" message rather than either crashing
 * the whole homepage or looking identical to "no content yet".
 */
export default async function HomePage() {
  const [
    conference,
    tracksResult,
    datesResult,
    registrationSettings,
    announcementsResult,
    committeeResult,
  ] = await Promise.all([
    getConference().catch((): Conference | null => null),
    safeFetch<ConferenceTrack[]>(getTracks()),
    safeFetch<ImportantDate[]>(getImportantDates()),
    getRegistrationSettings().catch((): RegistrationSettings | null => null),
    safeFetch<Announcement[]>(getAnnouncements()),
    safeFetch<CommitteeMember[]>(getCommitteeMembers()),
  ]);

  const tracks = tracksResult.data ?? [];
  const dates = datesResult.data ?? [];
  const announcements = announcementsResult.data ?? [];
  const committeeMembers = committeeResult.data ?? [];

  return (
    <>
      <Hero conference={conference} />
      <ConferenceFacts
        conference={conference}
        registrationSettings={registrationSettings}
      />
      <AboutSection />
      <CfpSection tracks={tracks} tracksFailed={tracksResult.failed} />
      <TracksPreview tracks={tracks} failed={tracksResult.failed} />
      <ImportantDatesPreview dates={dates} failed={datesResult.failed} />
      <RegistrationCta registrationSettings={registrationSettings} />
      <VenuePreview conference={conference} />
      <AttractionsPreview />
      <AnnouncementsPreview
        announcements={announcements}
        failed={announcementsResult.failed}
      />
      <CommitteePreview members={committeeMembers} failed={committeeResult.failed} />
      <SubmissionCta />
    </>
  );
}
