import { Hero } from "@/components/public/hero";
import { SectionTitle } from "@/components/public/section-title";

import { getConference } from "@/lib/data/conference";
import { getAnnouncements } from "@/lib/data/announcements";
import { getImportantDates } from "@/lib/data/important-dates";
import { getSpeakers } from "@/lib/data/speakers";

import { StatsSection } from "@/components/public/stats-section";
import { getProgrammeItems } from "@/lib/data/programme";
import { SpeakerCard } from "@/components/public/speaker-card";
import Link from "next/link";

export default async function HomePage() {
  const conference = await getConference();

  if (!conference) {
    return (
      <div className="container mx-auto py-12">
        Conference information not available.
      </div>
    );
  }

  const announcements = await getAnnouncements();
  const dates = await getImportantDates();
  const speakers = await getSpeakers();
  const programme = await getProgrammeItems();

  return (
    <>
      <Hero
        name={conference.name}
        theme={conference.theme}
        tagline={conference.tagline}
        dates={`${conference.start_date} - ${conference.end_date}`}
        venue={`${conference.venue_name}, ${conference.city}`}
      />

      <StatsSection
        speakers={speakers.length}
        sessions={programme.length}
      />

      {/* About */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle title="About the Conference" />

        <div className="mx-auto max-w-4xl text-center">
          {conference.about || (
            <p>
              Conference information will be updated soon.
            </p>
          )}
        </div>
      </section>

      {/* Announcements */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle title="Latest Announcements" />

        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">
            No announcements available.
          </p>
        ) : (
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <h3 className="font-semibold">
                  {announcement.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {announcement.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Important Dates */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Important Dates"
          subtitle="Key milestones and deadlines"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {dates.slice(0, 4).map((date) => (
            <div
              key={date.id}
              className="rounded-xl border-l-4 border-blue-600 bg-white p-6 shadow-sm"
            >
              <div className="mb-2 text-sm font-medium text-blue-600">
                {new Date(date.event_date).toLocaleDateString()}
              </div>

              <h3 className="font-semibold">
                {date.title}
              </h3>

              {date.description && (
                <p className="mt-2 text-sm text-gray-600">
                  {date.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Featured Speakers"
          subtitle="Distinguished experts from academia and industry"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {speakers.slice(0, 3).map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              name={speaker.name}
              designation={speaker.designation}
              organization={speaker.organization}
              photoUrl={speaker.photo_url}
            />
          ))}
        </div>
      </section>


      {/* Call For Papers */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Call For Papers
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-300">
            Researchers, academicians, industry
            professionals, and students are invited
            to submit original research papers for
            presentation at the conference.
          </p>

          <Link
            href="/important-dates"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            View Important Dates
          </Link>
        </div>
      </section>

      {/* Registration Banner */}    
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-blue-600 p-10 text-center text-white">
            <h2 className="mb-4 text-4xl font-bold">
              Join CONF2026
            </h2>

            <p className="mb-8 text-lg">
              Register now and be part of a premier
              platform for research, innovation,
              and collaboration.
            </p>

            <Link
              href="/registration"
              className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600"
            >
              Register Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}