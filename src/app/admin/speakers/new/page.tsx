import { createSpeaker } from "../actions";

export default function NewSpeakerPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add Speaker
      </h1>

      <form
        action={createSpeaker}
        className="space-y-4 max-w-2xl"
        >
        <div>
          <label className="block mb-1">
            Name
          </label>

          <input
            name="name"
            type="text"
            required
            className="w-full rounded border p-2"
            />
        </div>

        <div>
          <label className="block mb-1">
            Slug
          </label>

          <input
            name="slug"
            type="text"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Designation
          </label>

          <input
            name="designation"
            type="text"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Organization
          </label>

          <input
            name="organization"
            type="text"
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Talk Title
          </label>

          <input
            name="talkTitle"
            type="text"
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block mb-1">
            Bio
          </label>

          <textarea
            name="bio"
            rows={6}
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Speaker
        </button>
      </form>
    </div>
  );
}