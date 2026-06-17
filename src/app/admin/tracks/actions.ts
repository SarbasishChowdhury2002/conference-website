"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const CONFERENCE_ID =
  "540c9aa6-9af7-457e-a762-1c4824710a08";

export async function createTrack(
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const displayOrder =
    formData.get("display_order") as string;

  const isVisible =
    formData.get("is_visible") as string;

  const { error } = await supabase
    .from("conference_tracks")
    .insert({
      conference_id: CONFERENCE_ID,
      title,
      description,
      display_order:
        parseInt(displayOrder) || 0,
      is_visible: isVisible === "on",
    });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/admin/tracks");
}

export async function updateTrack(
  id: string,
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const displayOrder =
    formData.get("display_order") as string;

  const isVisible =
    formData.get("is_visible") as string;

  const { error } = await supabase
    .from("conference_tracks")
    .update({
      title,
      description,
      display_order:
        parseInt(displayOrder) || 0,
      is_visible: isVisible === "on",
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/admin/tracks");
}

export async function deleteTrack(
  id: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("conference_tracks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}