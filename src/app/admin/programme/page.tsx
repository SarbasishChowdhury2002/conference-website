import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DeleteProgrammeItemButton from "@/components/admin/delete-programme-item-button";

export default async function ProgrammePage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: items } =
    await supabase
      .from("programme")
      .select(`
        *,
        speakers (
          name
        )
      `)
      .order("session_date")
      .order("start_time");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Programme
        </h1>

        <Link
          href="/admin/programme/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Session
        </Link>
      </div>

      <div className="overflow-hidden rounded border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Time
              </th>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Speaker
              </th>

              <th className="p-3 text-left">
                Venue
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items?.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-3">
                  {item.session_date}
                </td>

                <td className="p-3">
                  {item.start_time}
                  {" - "}
                  {item.end_time}
                </td>

                <td className="p-3">
                  {item.title}
                </td>

                <td className="p-3">
                  {item.speakers?.name ?? "-"}
                </td>

                <td className="p-3">
                  {item.venue ?? "-"}
                </td>

                <td className="p-3">
                  <div className="space-x-3">
                    <Link
                      href={`/admin/programme/${item.id}/edit`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>

                    <DeleteProgrammeItemButton
                      id={item.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}