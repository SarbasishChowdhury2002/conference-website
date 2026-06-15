import { createCommitteeMember }
from "../actions";

export default function NewCommitteeMemberPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add Committee Member
      </h1>

      <form
        action={createCommitteeMember}
        className="max-w-2xl space-y-4"
      >
        <input
          name="name"
          placeholder="Name"
          required
          className="w-full rounded border p-2"
        />

        <input
          name="designation"
          placeholder="Designation"
          required
          className="w-full rounded border p-2"
        />

        <input
          name="organization"
          placeholder="Organization"
          className="w-full rounded border p-2"
        />

        <input
          name="committeeGroup"
          placeholder="Committee Group"
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
            type="checkbox"
            name="isVisible"
            defaultChecked
          />

          Visible
        </label>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Member
        </button>
      </form>
    </div>
  );
}