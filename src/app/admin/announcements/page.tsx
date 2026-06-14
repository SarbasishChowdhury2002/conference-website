import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DeleteAnnouncementButton
from "@/components/admin/delete-announcement-button";

export default async function AnnouncementsPage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: announcements } =
    await supabase
      .from("announcements")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Announcements
        </h1>

        <Link
          href="/admin/announcements/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Announcement
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
                Status
              </th>

              <th className="p-3 text-left">
                Published
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {announcements?.map(
              (announcement) => (
                <tr
                  key={announcement.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {announcement.title}
                  </td>

                  <td className="p-3">
                    {announcement.is_published
                      ? "Published"
                      : "Draft"}
                  </td>

                  <td className="p-3">
                    {announcement.published_at
                      ? new Date(
                          announcement.published_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    <div className="space-x-3">
                      <Link
                        href={`/admin/announcements/${announcement.id}/edit`}
                        className="text-blue-600"
                      >
                        Edit
                      </Link>

                      <DeleteAnnouncementButton
                        id={announcement.id}
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}