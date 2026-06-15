"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const CONFERENCE_ID =
  "540c9aa6-9af7-457e-a762-1c4824710a08";

export async function createProgrammeItem(
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const sessionDate =
    formData.get("sessionDate") as string;

  const startTime =
    formData.get("startTime") as string;

  const endTime =
    formData.get("endTime") as string;

  const venue =
    formData.get("venue") as string;

  const speakerId =
    formData.get("speakerId") as string;

  const displayOrder = Number(
    formData.get("displayOrder")
  );

  const { error } = await supabase
    .from("programme")
    .insert({
      conference_id: CONFERENCE_ID,
      title,
      description,
      session_date: sessionDate,
      start_time: startTime,
      end_time: endTime,
      venue,
      speaker_id: speakerId || null,
      display_order: displayOrder,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/programme");
}


export async function updateProgrammeItem(
  id: string,
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const sessionDate =
    formData.get("sessionDate") as string;

  const startTime =
    formData.get("startTime") as string;

  const endTime =
    formData.get("endTime") as string;

  const venue =
    formData.get("venue") as string;

  const speakerId =
    formData.get("speakerId") as string;

  const displayOrder = Number(
    formData.get("displayOrder")
  );

  const { error } = await supabase
    .from("programme")
    .update({
      title,
      description,
      session_date: sessionDate,
      start_time: startTime,
      end_time: endTime,
      venue,
      speaker_id: speakerId || null,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/programme");
}

export async function deleteProgrammeItem(
  id: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("programme")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}