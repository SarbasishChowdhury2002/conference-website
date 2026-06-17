import { SectionTitle } from "@/components/public/section-title";
import { getTracks } from "@/lib/data/tracks";

export default async function TracksPage() {
  const tracks = await getTracks();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Conference Tracks"
        subtitle="Research areas and themes covered by the conference"
      />

      {tracks.length === 0 ? (
        <div className="text-center text-gray-500">
          Track details will be announced soon.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-semibold">
                {track.title}
              </h3>

              <p className="text-gray-600">
                {track.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}