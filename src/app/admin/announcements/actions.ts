"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { CONFERENCE_ID } from "@/constants/conference";

export async function createAnnouncement(
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const content =
    formData.get("content") as string;

  const isPublished =
    formData.get("isPublished") === "on";

  const { error } = await supabase
    .from("announcements")
    .insert({
      conference_id: CONFERENCE_ID,
      title,
      content,
      is_published: isPublished,
      published_at: isPublished
        ? new Date().toISOString()
        : null,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/announcements");
}


export async function updateAnnouncement(
  id: string,
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const content =
    formData.get("content") as string;

  const isPublished =
    formData.get("isPublished") === "on";

  const { error } = await supabase
    .from("announcements")
    .update({
      title,
      content,
      is_published: isPublished,
      published_at: isPublished
        ? new Date().toISOString()
        : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/announcements");
}


export async function deleteAnnouncement(
  id: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}