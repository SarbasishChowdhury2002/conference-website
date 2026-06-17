"use client";

import { useTransition } from "react";
import { updateConference } from "./actions";

export default function ConferenceForm({
  conference,
}: {
  conference: any;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4 max-w-4xl"
      action={(formData) =>
        startTransition(async () => {
          await updateConference(formData);
          alert("Conference updated successfully");
        })
      }
    >
      <input
        name="name"
        defaultValue={conference.name}
        placeholder="Conference Name"
        className="w-full border rounded p-2"
      />

      <input
        name="short_name"
        defaultValue={conference.short_name}
        placeholder="Short Name"
        className="w-full border rounded p-2"
      />

      <input
        type="number"
        name="year"
        defaultValue={conference.year}
        className="w-full border rounded p-2"
      />

      <input
        name="theme"
        defaultValue={conference.theme}
        placeholder="Theme"
        className="w-full border rounded p-2"
      />

      <input
        name="tagline"
        defaultValue={conference.tagline}
        placeholder="Tagline"
        className="w-full border rounded p-2"
      />

      <textarea
        name="about"
        defaultValue={conference.about ?? ""}
        rows={6}
        className="w-full border rounded p-2"
      />

      <input
        name="venue_name"
        defaultValue={conference.venue_name ?? ""}
        placeholder="Venue Name"
        className="w-full border rounded p-2"
      />

      <input
        name="venue_address"
        defaultValue={conference.venue_address ?? ""}
        placeholder="Venue Address"
        className="w-full border rounded p-2"
      />

      <input
        name="city"
        defaultValue={conference.city ?? ""}
        placeholder="City"
        className="w-full border rounded p-2"
      />

      <input
        name="state"
        defaultValue={conference.state ?? ""}
        placeholder="State"
        className="w-full border rounded p-2"
      />

      <input
        name="country"
        defaultValue={conference.country ?? ""}
        placeholder="Country"
        className="w-full border rounded p-2"
      />

      <input
        type="date"
        name="start_date"
        defaultValue={conference.start_date}
        className="w-full border rounded p-2"
      />

      <input
        type="date"
        name="end_date"
        defaultValue={conference.end_date}
        className="w-full border rounded p-2"
      />


      <div>
        <label className="mb-1 block text-sm font-medium">
          CMT Submission Link
        </label>

        <input
          name="cmt_link"
          defaultValue={conference.cmt_link ?? ""}
          className="w-full rounded border p-2"
          placeholder="https://cmt3.research.microsoft.com/..."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Registration Link
        </label>

        <input
          name="registration_link"
          defaultValue={conference.registration_link ?? ""}
          className="w-full rounded border p-2"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Contact Email
        </label>

        <input
          type="email"
          name="contact_email"
          defaultValue={conference.contact_email ?? ""}
          className="w-full rounded border p-2"
          placeholder="conference@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}