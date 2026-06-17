import Link from "next/link";
import { SectionTitle } from "@/components/public/section-title";
import { getTracks } from "@/lib/data/tracks";

export default async function CallForPapersPage() {
  const tracks = await getTracks();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Call For Papers"
        subtitle="Invitation for original research contributions"
      />

      <div className="space-y-10">
        {/* Overview */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Overview
          </h2>

          <p className="text-gray-700">
            Authors are invited to submit
            original and unpublished research
            papers aligned with the conference
            theme and tracks. Submissions will
            undergo peer review and accepted
            papers will be presented during
            the conference.
          </p>
        </div>

        {/* Topics */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">
            Topics of Interest
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="rounded-lg border p-4"
              >
                <h3 className="font-semibold">
                  {track.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Submission Guidelines
          </h2>

          <ul className="list-disc space-y-2 pl-5 text-gray-700">
            <li>
              Papers must be original and not
              under consideration elsewhere.
            </li>

            <li>
              All submissions will undergo
              peer review.
            </li>

            <li>
              Authors should follow the
              conference paper template.
            </li>

            <li>
              Accepted papers must be
              presented at the conference.
            </li>
          </ul>
        </div>

        {/* Publication */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Publication
          </h2>

          <p className="text-gray-700">
            Accepted papers will be included
            in the conference proceedings.
            Additional publication details
            will be announced soon.
          </p>
        </div>


        {/* CTA */}
        <div className="rounded-xl bg-blue-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Submit?
          </h2>

          <p className="mb-6">
            Check the important deadlines
            before preparing your submission.
          </p>

          <Link
            href="/important-dates"
            className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600"
          >
            View Important Dates
          </Link>
          
          
          <Link
            href="https://cmt3.research.microsoft.com/"
            target="_blank"
            className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600"
            >
            Submit via Microsoft CMT
          </Link>
        </div>
      </div>
    </div>
  );
}