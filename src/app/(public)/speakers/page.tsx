import { SpeakerCard } from "@/components/public/speaker-card";
import { SectionTitle } from "@/components/public/section-title";
import { getSpeakers } from "@/lib/data/speakers";

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Speakers"
        subtitle="Meet our distinguished speakers"
      />

      {speakers.length === 0 ? (
        <div className="text-center text-gray-500">
          No speakers have been announced yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              name={speaker.name}
              designation={speaker.designation}
              organization={speaker.organization}
              photoUrl={speaker.photo_url}
            />
          ))}
        </div>
      )}
    </div>
  );
}