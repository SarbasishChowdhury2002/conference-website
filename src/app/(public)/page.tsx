import { Hero } from "@/components/public/hero";
import { SectionTitle } from "@/components/public/section-title";

import { getConference } from "@/lib/data/conference";
import { getAnnouncements } from "@/lib/data/announcements";
import { getImportantDates } from "@/lib/data/important-dates";
import { getSpeakers } from "@/lib/data/speakers";

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
        <SectionTitle title="Important Dates" />

        <div className="space-y-3">
          {dates.slice(0, 5).map((date) => (
            <div
              key={date.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="font-semibold">
                {date.title}
              </div>

              <div className="text-sm text-gray-500">
                {new Date(
                  date.event_date
                ).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle title="Featured Speakers" />

        <div className="grid gap-6 md:grid-cols-3">
          {speakers.slice(0, 3).map((speaker) => (
            <div
              key={speaker.id}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold">
                {speaker.name}
              </h3>

              <p className="text-sm text-gray-600">
                {speaker.designation}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}