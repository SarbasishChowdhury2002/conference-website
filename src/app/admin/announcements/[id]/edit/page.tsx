import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateAnnouncement } from "../../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAnnouncementPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createServerSupabaseClient();

  const { data: announcement } =
    await supabase
      .from("announcements")
      .select("*")
      .eq("id", id)
      .single();

  if (!announcement) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Edit Announcement
      </h1>

      <form
        action={updateAnnouncement.bind(
          null,
          announcement.id
        )}
        className="max-w-3xl space-y-4"
      >
        <input
          name="title"
          defaultValue={announcement.title}
          className="w-full rounded border p-2"
        />

        <textarea
          name="content"
          rows={8}
          defaultValue={announcement.content}
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            defaultChecked={
              announcement.is_published
            }
          />

          Published
        </label>

        <button
          className="rounded bg-black px-4 py-2 text-white"
        >
          Update Announcement
        </button>
      </form>
    </div>
  );
}