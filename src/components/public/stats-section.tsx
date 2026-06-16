interface StatsSectionProps {
  speakers: number;
  sessions: number;
}

export function StatsSection({
  speakers,
  sessions,
}: StatsSectionProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 text-center md:grid-cols-4">
          <div>
            <div className="text-4xl font-bold text-blue-600">
              {speakers}+
            </div>
            <p>Speakers</p>
          </div>

          <div>
            <div className="text-4xl font-bold text-blue-600">
              {sessions}+
            </div>
            <p>Sessions</p>
          </div>

          <div>
            <div className="text-4xl font-bold text-blue-600">
              3
            </div>
            <p>Conference Days</p>
          </div>

          <div>
            <div className="text-4xl font-bold text-blue-600">
              100+
            </div>
            <p>Participants</p>
          </div>
        </div>
      </div>
    </section>
  );
}