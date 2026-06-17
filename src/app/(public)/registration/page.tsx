import { SectionTitle } from "@/components/public/section-title";
import { getRegistrationSettings } from "@/lib/data/registration";
import Link from "next/link";

export default async function RegistrationPage() {
  const settings = await getRegistrationSettings();

  if (!settings) {
    return (
      <div className="container mx-auto px-4 py-12">
        Registration opening soon.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Registration"
        subtitle="Conference registration information"
      />

      {/* Status */}
      <div className="mb-8 rounded-xl border bg-white p-8 shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold">
          {settings.registration_open
            ? "Registration Open"
            : "Registration Closed"}
        </h3>

        <p className="text-gray-600">
          {settings.registration_open
            ? "Registrations are currently being accepted."
            : "Registrations are currently closed."}
        </p>

        {settings.registration_open &&
          settings.registration_url && (
            <div className="mt-6">
              <Link
                href={settings.registration_url}
                target="_blank"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
              >
                Register Now
              </Link>
            </div>
          )}
      </div>

      {/* Fee Structure */}
      <div className="mb-8 rounded-xl border bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-2xl font-semibold">
          Registration Fees
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded border p-4">
            <strong>Authors</strong>
            <p>{settings.author_fee || "TBA"}</p>
          </div>

          <div className="rounded border p-4">
            <strong>Students</strong>
            <p>{settings.student_fee || "TBA"}</p>
          </div>

          <div className="rounded border p-4">
            <strong>Industry</strong>
            <p>{settings.industry_fee || "TBA"}</p>
          </div>

          <div className="rounded border p-4">
            <strong>International</strong>
            <p>{settings.international_fee || "TBA"}</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h3 className="mb-4 text-2xl font-semibold">
          Registration Instructions
        </h3>

        <div className="whitespace-pre-line text-gray-700">
          {settings.instructions ||
            "Instructions will be announced soon."}
        </div>
      </div>
    </div>
  );
}