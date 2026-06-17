"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateConference(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { data: conference, error } = await supabase
    .from("conferences")
    .select("id")
    .single();

  console.log("CONFERENCE:", conference);
  console.log("FETCH ERROR:", error);

  if (error || !conference) {
    throw new Error("Conference record not found");
  }

  const result = await supabase
    .from("conferences")
    .update({
      name: formData.get("name"),
      short_name: formData.get("short_name"),
      year: Number(formData.get("year")),
      theme: formData.get("theme"),
      tagline: formData.get("tagline"),
      about: formData.get("about"),
      venue_name: formData.get("venue_name"),
      venue_address: formData.get("venue_address"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      cmt_link: formData.get("cmt_link"),
      registration_link: formData.get("registration_link"),
      contact_email: formData.get("contact_email"),
    })
    .eq("id", conference.id)
    .select();

  console.log("UPDATE RESULT:", result);

  if (result.error) {
    console.error("UPDATE ERROR:", result.error);
    throw result.error;
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/venue");
  revalidatePath("/contact");
}