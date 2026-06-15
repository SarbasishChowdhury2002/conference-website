import { notFound } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateProgrammeItem } from "../../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProgrammePage({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createServerSupabaseClient();

  const { data: item } =
    await supabase
      .from("programme")
      .select("*")
      .eq("id", id)
      .single();

  if (!item) {
    notFound();
  }

  const { data: speakers } =
    await supabase
      .from("speakers")
      .select("id,name")
      .order("name");

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Edit Programme Item
      </h1>

      <form
        action={updateProgrammeItem.bind(
          null,
          item.id
        )}
        className="max-w-3xl space-y-4"
      >
        <div>
          <label className="mb-1 block">
            Session Title
          </label>

          <input
            name="title"
            required
            defaultValue={item.title}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            defaultValue={
              item.description ?? ""
            }
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Session Date
          </label>

          <input
            type="date"
            name="sessionDate"
            required
            defaultValue={item.session_date}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block">
              Start Time
            </label>

            <input
              type="time"
              name="startTime"
              required
              defaultValue={item.start_time}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block">
              End Time
            </label>

            <input
              type="time"
              name="endTime"
              required
              defaultValue={item.end_time}
              className="w-full rounded border p-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block">
            Venue
          </label>

          <input
            name="venue"
            defaultValue={item.venue ?? ""}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Speaker
          </label>

          <select
            name="speakerId"
            className="w-full rounded border p-2"
            defaultValue={
              item.speaker_id ?? ""
            }
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
        </div>

        <div>
          <label className="mb-1 block">
            Display Order
          </label>

          <input
            type="number"
            name="displayOrder"
            defaultValue={
              item.display_order
            }
            className="w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Update Programme Item
        </button>
      </form>
    </div>
  );
}