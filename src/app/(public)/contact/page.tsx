import { SectionTitle } from "@/components/public/section-title";
import { getConference } from "@/lib/data/conference";
import { getContactSettings } from "@/lib/data/contact";

export default async function ContactPage() {
  const conference = await getConference();
  const contact = await getContactSettings();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Contact Us"
        subtitle="Get in touch with the conference organizers"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conference Information */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
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

        {/* Contact Information */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold">
            Contact Information
          </h3>

          <div className="space-y-3">
            {contact?.email && (
              <p>
                <strong>Email:</strong>{" "}
                {contact.email}
              </p>
            )}

            {contact?.phone && (
              <p>
                <strong>Phone:</strong>{" "}
                {contact.phone}
              </p>
            )}

            {contact?.website && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={contact.website}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </p>
            )}

            {contact?.address && (
              <p>
                <strong>Address:</strong>{" "}
                {contact.address}
              </p>
            )}

            {contact?.google_maps_url && (
              <p>
                <a
                  href={contact.google_maps_url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View on Google Maps
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      {(contact?.linkedin_url ||
        contact?.facebook_url ||
        contact?.twitter_url ||
        contact?.youtube_url) && (
        <div className="mt-8 rounded-xl border bg-white p-8 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold">
            Follow Us
          </h3>

          <div className="flex flex-wrap gap-4">
            {contact.linkedin_url && (
              <a
                href={contact.linkedin_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}

            {contact.facebook_url && (
              <a
                href={contact.facebook_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </a>
            )}

            {contact.twitter_url && (
              <a
                href={contact.twitter_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                X / Twitter
              </a>
            )}

            {contact.youtube_url && (
              <a
                href={contact.youtube_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}