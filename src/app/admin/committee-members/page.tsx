import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import DeleteCommitteeMemberButton
from "@/components/admin/delete-committee-member-button";

export default async function CommitteeMembersPage() {
  const supabase =
    await createServerSupabaseClient();

  const { data: members, error } =
    await supabase
      .from("committee_members")
      .select("*")
      .order("committee_group")
      .order("display_order");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Committee Members
        </h1>

        <Link
          href="/admin/committee-members/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Member
        </Link>
      </div>

      <div className="overflow-hidden rounded border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Photo
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Designation
              </th>

              <th className="p-3 text-left">
                Organization
              </th>

              <th className="p-3 text-left">
                Committee Group
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
            {members?.length ? (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200" />
                    )}
                  </td>

                  <td className="p-3">
                    {member.name}
                  </td>

                  <td className="p-3">
                    {member.designation}
                  </td>

                  <td className="p-3">
                    {member.organization || "-"}
                  </td>

                  <td className="p-3">
                    {member.committee_group}
                  </td>

                  <td className="p-3">
                    {member.display_order}
                  </td>

                  <td className="p-3">
                    {member.is_visible ? (
                      <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                        Visible
                      </span>
                    ) : (
                      <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                        Hidden
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    <div className="space-x-3">
                    <Link
                        href={`/admin/committee-members/${member.id}/edit`}
                        className="text-blue-600"
                    >
                        Edit
                    </Link>

                    <DeleteCommitteeMemberButton
                        id={member.id}
                    />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-gray-500"
                >
                  No committee members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}