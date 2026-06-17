import { createTrack } from "../actions";

export default function NewTrackPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add Track
      </h1>

      <form
        action={createTrack}
        className="max-w-2xl space-y-4"
      >
        <div>
          <label className="mb-1 block">
            Title
          </label>

          <input
            name="title"
            type="text"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Description
          </label>

          <textarea
            name="description"
            rows={6}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Display Order
          </label>

          <input
            name="display_order"
            type="number"
            defaultValue={0}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_visible"
            defaultChecked
          />

          <label>
            Visible
          </label>
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Track
        </button>
      </form>
    </div>
  );
}