import { SectionTitle } from "@/components/public/section-title";
import { getProgrammeItems } from "@/lib/data/programme";

export default async function ProgrammePage() {
  const sessions = await getProgrammeItems();

  type Session = (typeof sessions)[number];

  const groupedSessions = sessions.reduce<Record<string, Session[]>>(
    (acc, session) => {
      const date = session.session_date;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(session);

      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Conference Programme"
        subtitle="Schedule of sessions and events"
      />

      {sessions.length === 0 ? (
        <div className="text-center text-gray-500">
          Programme details will be announced soon.
        </div>
      ) : (
        Object.keys(groupedSessions).map((date) => (
          <div key={date} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">
              {new Date(date).toLocaleDateString()}
            </h2>

            <div className="space-y-4">
              {groupedSessions[date].map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="mb-2 text-sm font-medium text-blue-600">
                    {session.start_time} – {session.end_time}
                  </div>

                  <h3 className="text-xl font-semibold">
                    {session.title}
                  </h3>

                  {session.description && (
                    <p className="mt-2 text-gray-600">
                      {session.description}
                    </p>
                  )}

                  <div className="mt-3 text-sm text-gray-500">
                    Venue: {session.venue}
                  </div>

                  {session.speaker && (
                    <div className="mt-1 text-sm text-gray-500">
                      Speaker: {session.speaker.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}