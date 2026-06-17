import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateTrack } from "../../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTrackPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createServerSupabaseClient();

  const { data: track } =
    await supabase
      .from("conference_tracks")
      .select("*")
      .eq("id", id)
      .single();

  if (!track) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Edit Track
      </h1>

      <form
        action={updateTrack.bind(
          null,
          track.id
        )}
        className="max-w-2xl space-y-4"
      >
        <input
          name="title"
          defaultValue={track.title}
          className="w-full rounded border p-2"
        />

        <textarea
          name="description"
          rows={6}
          defaultValue={
            track.description ?? ""
          }
          className="w-full rounded border p-2"
        />

        <input
          name="display_order"
          type="number"
          defaultValue={
            track.display_order
          }
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_visible"
            defaultChecked={
              track.is_visible
            }
          />
          Visible
        </label>

        <button
          className="rounded bg-black px-4 py-2 text-white"
        >
          Update Track
        </button>
      </form>
    </div>
  );
}