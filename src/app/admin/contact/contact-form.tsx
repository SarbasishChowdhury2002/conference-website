"use client";

import { updateContactSettings } from "./actions";

export default function ContactForm({
  settings,
}: {
  settings: any;
}) {
  return (
    <form
      action={updateContactSettings}
      className="space-y-6 max-w-4xl"
    >
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Contact Information
        </h2>

        <div className="space-y-4">
          <input
            name="email"
            defaultValue={settings.email ?? ""}
            placeholder="Email"
            className="w-full rounded border p-2"
          />

          <input
            name="phone"
            defaultValue={settings.phone ?? ""}
            placeholder="Phone"
            className="w-full rounded border p-2"
          />

          <textarea
            name="address"
            defaultValue={settings.address ?? ""}
            placeholder="Address"
            rows={4}
            className="w-full rounded border p-2"
          />

          <input
            name="google_maps_url"
            defaultValue={settings.google_maps_url ?? ""}
            placeholder="Google Maps URL"
            className="w-full rounded border p-2"
          />

          <input
            name="website"
            defaultValue={settings.website ?? ""}
            placeholder="Website URL"
            className="w-full rounded border p-2"
          />
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">
          Social Media
        </h2>

        <div className="space-y-4">
          <input
            name="facebook_url"
            defaultValue={settings.facebook_url ?? ""}
            placeholder="Facebook URL"
            className="w-full rounded border p-2"
          />

          <input
            name="linkedin_url"
            defaultValue={settings.linkedin_url ?? ""}
            placeholder="LinkedIn URL"
            className="w-full rounded border p-2"
          />

          <input
            name="twitter_url"
            defaultValue={settings.twitter_url ?? ""}
            placeholder="Twitter/X URL"
            className="w-full rounded border p-2"
          />

          <input
            name="youtube_url"
            defaultValue={settings.youtube_url ?? ""}
            placeholder="YouTube URL"
            className="w-full rounded border p-2"
          />
        </div>
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