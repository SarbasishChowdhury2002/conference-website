import Link from "next/link";
import { SectionTitle } from "@/components/public/section-title";

export default function SubmissionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Paper Submission"
        subtitle="Submit your research paper to the conference"
      />

      <div className="space-y-8">
        {/* Submission Portal */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Microsoft CMT Submission System
          </h2>

          <p className="mb-6 text-gray-700">
            All paper submissions must be made through
            the Microsoft Conference Management Toolkit
            (CMT). Authors should create an account,
            prepare their manuscript according to the
            conference guidelines, and submit their paper
            through the official submission portal.
          </p>

          <Link
            href="https://cmt3.research.microsoft.com/"
            target="_blank"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Submit via Microsoft CMT
          </Link>
        </div>

        {/* Submission Guidelines */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Submission Guidelines
          </h2>

          <ul className="list-disc space-y-2 pl-5 text-gray-700">
            <li>
              Papers must be original and unpublished.
            </li>

            <li>
              Papers must not be under review elsewhere.
            </li>

            <li>
              Submissions should follow the conference
              paper template.
            </li>

            <li>
              Accepted papers must be presented at the
              conference.
            </li>

            <li>
              All submissions will undergo peer review.
            </li>
          </ul>
        </div>

        {/* Paper Template */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Paper Template
          </h2>

          <p className="mb-4 text-gray-700">
            Authors are required to use the official
            conference paper template.
          </p>

          <button
            disabled
            className="cursor-not-allowed rounded-lg bg-gray-300 px-6 py-3 text-gray-600"
          >
            Template Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}