"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const CONFERENCE_ID =
  "540c9aa6-9af7-457e-a762-1c4824710a08";

export async function createSpeaker(
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const designation =
    formData.get("designation") as string;
  const organization =
    formData.get("organization") as string;
  const talkTitle =
    formData.get("talkTitle") as string;
  const bio =
    formData.get("bio") as string;

  const { error } = await supabase
    .from("speakers")
    .insert({
      conference_id: CONFERENCE_ID,
      name,
      slug,
      designation,
      organization,
      talk_title: talkTitle,
      bio,
      is_visible: true,
      display_order: 0,
    });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/admin/speakers");
}


export async function updateSpeaker(
  id: string,
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const designation =
    formData.get("designation") as string;
  const organization =
    formData.get("organization") as string;
  const talkTitle =
    formData.get("talkTitle") as string;
  const bio =
    formData.get("bio") as string;
  const displayOrder =
    formData.get("displayOrder") as string;
  const isVisible =
    formData.get("isVisible") as string;
  const { error } = await supabase
    .from("speakers")
    .update({
      name,
      slug,
      designation,
      organization,
      talk_title: talkTitle,
      bio,
      display_order: parseInt(displayOrder),
      is_visible: isVisible === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect("/admin/speakers");
}


export async function deleteSpeaker(
  id: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("speakers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}


export async function updateSpeakerPhoto(
  speakerId: string,
  photoUrl: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("speakers")
    .update({
      photo_url: photoUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", speakerId);

  if (error) {
    throw new Error(error.message);
  }
}