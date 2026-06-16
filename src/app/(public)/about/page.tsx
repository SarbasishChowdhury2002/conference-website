import { SectionTitle } from "@/components/public/section-title";
import { getConference } from "@/lib/data/conference";

export default async function AboutPage() {
  const conference = await getConference();

  if (!conference) {
    return (
      <div className="container mx-auto px-4 py-12">
        Conference information not available.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="About the Conference"
        subtitle={conference.theme}
      />

      <div className="mx-auto max-w-4xl rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">
          {conference.name}
        </h2>

        <p className="mb-6 text-gray-600">
          {conference.tagline}
        </p>

        <div className="prose max-w-none">
          {conference.about || (
            <p>
              Conference description will be updated soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}