import { SectionTitle } from "@/components/public/section-title";
import { getConference } from "@/lib/data/conference";

export default async function ContactPage() {
  const conference = await getConference();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Contact Us"
        subtitle="Get in touch with the conference organizers"
      />

      <div className="mx-auto max-w-3xl rounded-xl border bg-white p-8 shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold">
          {conference.name}
        </h3>

        <div className="space-y-3">
          <p>
            <strong>Venue:</strong>{" "}
            {conference.venue_name}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {conference.city}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {conference.country}
          </p>

          <p>
            <strong>Conference Dates:</strong>{" "}
            {conference.start_date} – {conference.end_date}
          </p>
        </div>
      </div>
    </div>
  );
}