import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createProgrammeItem } from "../actions";

export default async function NewProgrammePage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: speakers } =
    await supabase
      .from("speakers")
      .select("id,name")
      .order("name");

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add Programme Item
      </h1>

      <form
        action={createProgrammeItem}
        className="max-w-3xl space-y-4"
      >
        <input
          name="title"
          required
          placeholder="Session Title"
          className="w-full rounded border p-2"
        />

        <textarea
          name="description"
          rows={4}
          placeholder="Description"
          className="w-full rounded border p-2"
        />

        <input
          type="date"
          name="sessionDate"
          required
          className="w-full rounded border p-2"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            name="startTime"
            required
            className="rounded border p-2"
          />

          <input
            type="time"
            name="endTime"
            required
            className="rounded border p-2"
          />
        </div>

        <input
          name="venue"
          placeholder="Venue"
          className="w-full rounded border p-2"
        />

        <select
          name="speakerId"
          className="w-full rounded border p-2"
        >
          <option value="">
            Select Speaker
          </option>

          {speakers?.map((speaker) => (
            <option
              key={speaker.id}
              value={speaker.id}
            >
              {speaker.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="displayOrder"
          defaultValue={0}
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Programme Item
        </button>
      </form>
    </div>
  );
}