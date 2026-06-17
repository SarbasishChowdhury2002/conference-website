import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DeleteTrackButton from "@/components/admin/delete-track-button";

export default async function TracksPage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: tracks } =
    await supabase
      .from("conference_tracks")
      .select("*")
      .order("display_order");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Conference Tracks
        </h1>

        <Link
          href="/admin/tracks/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Track
        </Link>
      </div>

      <div className="overflow-hidden rounded border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Description
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
            {tracks?.map((track) => (
              <tr
                key={track.id}
                className="border-t"
              >
                <td className="p-3">
                  {track.title}
                </td>

                <td className="p-3">
                  {track.description}
                </td>

                <td className="p-3">
                  {track.display_order}
                </td>

                <td className="p-3">
                  {track.is_visible ? (
                    <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                      Visible
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                      Hidden
                    </span>
                  )}
                </td>

                <td className="space-x-3 p-3">
                  <Link
                    href={`/admin/tracks/${track.id}/edit`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <DeleteTrackButton
                    id={track.id}
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