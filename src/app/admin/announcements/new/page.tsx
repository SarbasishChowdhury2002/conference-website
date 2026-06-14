import { createAnnouncement }
from "../actions";

export default function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add Announcement
      </h1>

      <form
        action={createAnnouncement}
        className="max-w-3xl space-y-4"
      >
        <input
          name="title"
          required
          placeholder="Announcement Title"
          className="w-full rounded border p-2"
        />

        <textarea
          name="content"
          required
          rows={8}
          placeholder="Announcement Content"
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
          />

          Publish Immediately
        </label>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Announcement
        </button>
      </form>
    </div>
  );
}