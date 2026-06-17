"use client";

import { updateRegistrationSettings } from "./actions";

export default function RegistrationForm({
  settings,
}: {
  settings: any;
}) {
  return (
    <form
      action={updateRegistrationSettings}
      className="space-y-6 max-w-4xl"
    >
      {/* Registration Status */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Registration Status
        </h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="registration_open"
            defaultChecked={settings.registration_open}
          />
          Registration Open
        </label>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium">
            Registration URL
          </label>

          <input
            type="url"
            name="registration_url"
            defaultValue={settings.registration_url ?? ""}
            className="w-full rounded border p-2"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Fees */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Registration Fees
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Author Fee
            </label>

            <input
              name="author_fee"
              defaultValue={settings.author_fee ?? ""}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Student Fee
            </label>

            <input
              name="student_fee"
              defaultValue={settings.student_fee ?? ""}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Industry Fee
            </label>

            <input
              name="industry_fee"
              defaultValue={settings.industry_fee ?? ""}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              International Fee
            </label>

            <input
              name="international_fee"
              defaultValue={settings.international_fee ?? ""}
              className="w-full rounded border p-2"
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Registration Instructions
        </h2>

        <textarea
          name="instructions"
          rows={6}
          defaultValue={settings.instructions ?? ""}
          className="w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Save Changes
      </button>
    </form>
  );
}