import { SectionTitle } from "@/components/public/section-title";
import { getImportantDates } from "@/lib/data/important-dates";

export default async function ImportantDatesPage() {
  const dates = await getImportantDates();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Important Dates"
        subtitle="Key deadlines and milestones"
      />

      {dates.length === 0 ? (
        <div className="text-center text-gray-500">
          No important dates available.
        </div>
      ) : (
        <div className="space-y-6">
          {dates.map((date) => (
            <div
              key={date.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="mb-2 text-sm font-medium text-blue-600">
                {new Date(date.event_date).toLocaleDateString()}
              </div>

              <h3 className="mb-2 text-xl font-semibold">
                {date.title}
              </h3>

              {date.description && (
                <p className="text-gray-600">
                  {date.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}