import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateImportantDate }
from "../../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditDatePage({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createServerSupabaseClient();

  const { data: date } =
    await supabase
      .from("important_dates")
      .select("*")
      .eq("id", id)
      .single();

  if (!date) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Edit Important Date
      </h1>

      <form
        action={updateImportantDate.bind(
          null,
          date.id
        )}
        className="max-w-2xl space-y-4"
      >
        <input
          name="title"
          defaultValue={date.title}
          className="w-full rounded border p-2"
        />

        <textarea
          name="description"
          defaultValue={
            date.description ?? ""
          }
          className="w-full rounded border p-2"
        />

        <input
          type="date"
          name="eventDate"
          defaultValue={date.event_date}
          className="w-full rounded border p-2"
        />

        <input
          type="number"
          name="displayOrder"
          defaultValue={
            date.display_order
          }
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVisible"
            defaultChecked={
              date.is_visible
            }
          />
          Visible
        </label>

        <button
          className="rounded bg-black px-4 py-2 text-white"
        >
          Update Date
        </button>
      </form>
    </div>
  );
}