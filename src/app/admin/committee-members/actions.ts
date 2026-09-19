"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { CONFERENCE_ID } from "@/constants/conference";

export async function createCommitteeMember(
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const name =
    formData.get("name") as string;

  const designation =
    formData.get("designation") as string;

  const organization =
    formData.get("organization") as string;

  const committeeGroup =
    formData.get("committeeGroup") as string;

  const displayOrder = Number(
    formData.get("displayOrder")
  );

  const isVisible =
    formData.get("isVisible") === "on";

  const { error } = await supabase
    .from("committee_members")
    .insert({
      conference_id: CONFERENCE_ID,
      name,
      designation,
      organization,
      committee_group: committeeGroup,
      display_order: displayOrder,
      is_visible: isVisible,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/committee-members");
}


export async function updateCommitteeMember(
  id: string,
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const name =
    formData.get("name") as string;

  const designation =
    formData.get("designation") as string;

  const organization =
    formData.get("organization") as string;

  const committeeGroup =
    formData.get("committeeGroup") as string;

  const displayOrder = Number(
    formData.get("displayOrder")
  );

  const isVisible =
    formData.get("isVisible") === "on";

  const { error } = await supabase
    .from("committee_members")
    .update({
      name,
      designation,
      organization,
      committee_group: committeeGroup,
      display_order: displayOrder,
      is_visible: isVisible,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/committee-members");
}


export async function deleteCommitteeMember(
  id: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("committee_members")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}


export async function updateCommitteeMemberPhoto(
  memberId: string,
  photoUrl: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("committee_members")
    .update({
      photo_url: photoUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", memberId);

  if (error) {
    throw new Error(error.message);
  }
}