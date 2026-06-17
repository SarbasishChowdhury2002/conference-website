import { Hero } from "@/components/public/hero";
import { SectionTitle } from "@/components/public/section-title";

import { getConference } from "@/lib/data/conference";
import { getAnnouncements } from "@/lib/data/announcements";
import { getImportantDates } from "@/lib/data/important-dates";
import { getSpeakers } from "@/lib/data/speakers";

import { StatsSection } from "@/components/public/stats-section";
import { getProgrammeItems } from "@/lib/data/programme";
import { SpeakerCard } from "@/components/public/speaker-card";
import { getTracks } from "@/lib/data/tracks";
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
  const tracks = await getTracks();
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


      {/* Conference Tracks */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Conference Tracks"
          subtitle="Core research areas covered by the conference"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.slice(0, 6).map((track) => (
            <div
              key={track.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-lg font-semibold">
                {track.title}
              </h3>

              <p className="text-sm text-gray-600">
                {track.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tracks"
            className="font-medium text-blue-600 hover:underline"
          >
            View All Tracks →
          </Link>
        </div>
      </section>


      {/* Call For Papers */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-center text-4xl font-bold">
              Call For Papers
            </h2>

            <p className="mb-10 text-center text-lg text-gray-300">
              Authors are invited to submit
              original and unpublished research
              contributions aligned with the
              conference theme and tracks.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-semibold">
                  Topics of Interest
                </h3>

                <ul className="space-y-2 text-gray-300">
                  {tracks.slice(0, 6).map((track) => (
                    <li key={track.id}>
                      • {track.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-2xl font-semibold">
                  Publication
                </h3>

                <p className="text-gray-300">
                  Accepted papers will be
                  presented during the conference
                  and included in the conference
                  proceedings. Further publication
                  details will be announced soon.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/tracks"
                className="rounded-lg bg-blue-600 px-6 py-3 text-center font-medium"
              >
                View Tracks
              </Link>

              <Link
                href="/important-dates"
                className="rounded-lg border border-white px-6 py-3 text-center font-medium"
              >
                Submission Deadlines
              </Link>

              <Link
              href={conference.cmt_link}
              target="_blank"
              className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600"
              >
              Submit via Microsoft CMT
              </Link>
            </div>
          </div>
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


      {/* Registration Banner */}    
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-blue-600 p-10 text-center text-white">
            <h2 className="mb-4 text-4xl font-bold">
              Join {conference.short_name}
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


      <StatsSection
        speakers={speakers.length}
        sessions={programme.length}
      />
    </>
  );
}