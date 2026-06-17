"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateContactSettings(
  formData: FormData
) {
  const supabase = await createServerSupabaseClient();

  const { data: settings } = await supabase
    .from("contact_settings")
    .select("id")
    .single();

  if (!settings) {
    throw new Error("Contact settings not found");
  }

  const result = await supabase
    .from("contact_settings")
    .update({
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      google_maps_url: formData.get("google_maps_url"),
      website: formData.get("website"),
      facebook_url: formData.get("facebook_url"),
      linkedin_url: formData.get("linkedin_url"),
      twitter_url: formData.get("twitter_url"),
      youtube_url: formData.get("youtube_url"),
    })
    .eq("id", settings.id)
    .select();

  if (result.error) {
    throw result.error;
  }

  revalidatePath("/contact");
}