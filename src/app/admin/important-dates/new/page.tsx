import { createImportantDate }
from "../actions";

export default function NewDatePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add Important Date
      </h1>

      <form
        action={createImportantDate}
        className="max-w-2xl space-y-4"
      >
        <input
          name="title"
          placeholder="Title"
          required
          className="w-full rounded border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full rounded border p-2"
        />

        <input
          name="eventDate"
          type="date"
          required
          className="w-full rounded border p-2"
        />

        <input
          name="displayOrder"
          type="number"
          defaultValue={0}
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            name="isVisible"
            type="checkbox"
            defaultChecked
          />

          Visible
        </label>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Date
        </button>
      </form>
    </div>
  );
}