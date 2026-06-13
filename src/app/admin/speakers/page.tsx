import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DeleteSpeakerButton from "@/components/admin/delete-speaker-button";

export default async function SpeakersPage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: speakers } =
    await supabase
      .from("speakers")
      .select("*")
      .order("display_order");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Speakers
        </h1>

        <Link
          href="/admin/speakers/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Speaker
        </Link>
      </div>

      <div className="overflow-hidden rounded border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Slug
              </th>

              <th className="p-3 text-left">
                Designation
              </th>

              <th className="p-3 text-left">
                Organization
              </th>

              <th className="p-3 text-left">
                Talk Title
              </th>

              <th className="p-3 text-left">
                Bio
              </th>

              <th className="p-3 text-left">
                Display Order
              </th>

              <th className="p-3 text-left">
                Visible
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {speakers?.map((speaker) => (
              <tr
                key={speaker.id}
                className="border-t"
              >
                <td className="p-3">
                  {speaker.name}
                </td>

                <td className="p-3">
                  {speaker.slug}
                </td>

                <td className="p-3">
                  {speaker.designation}
                </td>

                <td className="p-3">
                  {speaker.organization}
                </td>

                <td className="p-3">
                  {speaker.talk_title}
                </td>

                <td className="p-3">
                  {speaker.bio}
                </td>

                <td className="p-3">
                  {speaker.display_order}
                </td>

                <td className="p-3">
                  {speaker.is_visible ? (
                    <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                      Visible
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                      Hidden
                    </span>
                  )}
                </td>

                <td className="p-3 space-x-3">
                  <Link
                    href={`/admin/speakers/${speaker.id}/edit`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <DeleteSpeakerButton
                    id={speaker.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}