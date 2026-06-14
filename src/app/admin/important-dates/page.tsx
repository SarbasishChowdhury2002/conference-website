import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DeleteImportantDateButton
from "@/components/admin/delete-important-date-button";

export default async function ImportantDatesPage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: dates } =
    await supabase
      .from("important_dates")
      .select("*")
      .order("display_order");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Important Dates
        </h1>

        <Link
          href="/admin/important-dates/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Date
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
                Date
              </th>

              <th className="p-3 text-left">
                Order
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
            {dates?.map((date) => (
              <tr
                key={date.id}
                className="border-t"
              >
                <td className="p-3">
                  {date.title}
                </td>

                <td className="p-3">
                  {date.event_date}
                </td>

                <td className="p-3">
                  {date.display_order}
                </td>

                <td className="p-3">
                  {date.is_visible
                    ? "Visible"
                    : "Hidden"}
                </td>

                <td className="p-3">
                  <div className="space-x-3">
                    <Link
                      href={`/admin/important-dates/${date.id}/edit`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>

                    <DeleteImportantDateButton
                      id={date.id}
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