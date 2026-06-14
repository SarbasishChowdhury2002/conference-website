"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const CONFERENCE_ID =
  "540c9aa6-9af7-457e-a762-1c4824710a08";

export async function createImportantDate(
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const eventDate =
    formData.get("eventDate") as string;

  const displayOrder = Number(
    formData.get("displayOrder")
  );

  const isVisible =
    formData.get("isVisible") === "on";

  const { error } = await supabase
    .from("important_dates")
    .insert({
      conference_id: CONFERENCE_ID,
      title,
      description,
      event_date: eventDate,
      display_order: displayOrder,
      is_visible: isVisible,
    });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/important-dates");
}


export async function updateImportantDate(
  id: string,
  formData: FormData
) {
  const supabase =
    await createServerSupabaseClient();

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const eventDate =
    formData.get("eventDate") as string;

  const displayOrder = Number(
    formData.get("displayOrder")
  );

  const isVisible =
    formData.get("isVisible") === "on";

  const { error } = await supabase
    .from("important_dates")
    .update({
      title,
      description,
      event_date: eventDate,
      display_order: displayOrder,
      is_visible: isVisible,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin/important-dates");
}

export async function deleteImportantDate(
  id: string
) {
  const supabase =
    await createServerSupabaseClient();

  const { error } = await supabase
    .from("important_dates")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

