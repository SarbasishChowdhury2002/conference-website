import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateSpeaker } from "../../actions";
import SpeakerImageUpload from "@/components/admin/speaker-image-upload";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSpeakerPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createServerSupabaseClient();

  const { data: speaker } =
    await supabase
      .from("speakers")
      .select("*")
      .eq("id", id)
      .single();

  if (!speaker) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Edit Speaker
      </h1>

      
      <SpeakerImageUpload
        speakerId={speaker.id}
      />

      <form
        action={updateSpeaker.bind(
            null,
            speaker.id
        )}
        className="space-y-4 max-w-2xl"
        >
        <input
          name="name"
          defaultValue={speaker.name}
          className="w-full rounded border p-2"
        />

        <input
          name="slug"
          defaultValue={speaker.slug}
          className="w-full rounded border p-2"
        />

        <input
          name="designation"
          defaultValue={speaker.designation}
          className="w-full rounded border p-2"
        />

        <input
          name="organization"
          defaultValue={speaker.organization}
          className="w-full rounded border p-2"
        />

        <input
          name="talk_title"
          defaultValue={speaker.talk_title}
          className="w-full rounded border p-2"
        />

        <input
          name="bio"
          defaultValue={speaker.bio}
          className="w-full rounded border p-2"
        />

        <input
          name="display_order"
          defaultValue={speaker.display_order}
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVisible"
            defaultChecked={speaker.is_visible}
          />
          Visible
        </label>

        <button
          className="rounded bg-black px-4 py-2 text-white"
        >
          Update Speaker
        </button>
      </form>
    </div>

  );
}