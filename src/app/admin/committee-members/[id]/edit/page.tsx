import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateCommitteeMember } from "../../actions";
import CommitteeMemberImageUpload
from "@/components/admin/committee-member-image-upload";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCommitteeMemberPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createServerSupabaseClient();

  const { data: member } =
    await supabase
      .from("committee_members")
      .select("*")
      .eq("id", id)
      .single();

  if (!member) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Edit Committee Member
      </h1>

      {member.photo_url && (
        <img
          src={member.photo_url}
          alt={member.name}
          className="mb-4 h-32 w-32 rounded object-cover border"
        />
      )}

      <CommitteeMemberImageUpload
        memberId={member.id}
      />

      <form
        action={updateCommitteeMember.bind(
          null,
          member.id
        )}
        className="max-w-2xl space-y-4"
      >
        <input
          name="name"
          defaultValue={member.name}
          className="w-full rounded border p-2"
        />

        <input
          name="designation"
          defaultValue={member.designation}
          className="w-full rounded border p-2"
        />

        <input
          name="organization"
          defaultValue={
            member.organization ?? ""
          }
          className="w-full rounded border p-2"
        />

        <input
          name="committeeGroup"
          defaultValue={
            member.committee_group
          }
          className="w-full rounded border p-2"
        />

        <input
          type="number"
          name="displayOrder"
          defaultValue={
            member.display_order
          }
          className="w-full rounded border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVisible"
            defaultChecked={
              member.is_visible
            }
          />
          Visible
        </label>

        <button
          className="rounded bg-black px-4 py-2 text-white"
        >
          Update Member
        </button>
      </form>
    </div>
  );
}