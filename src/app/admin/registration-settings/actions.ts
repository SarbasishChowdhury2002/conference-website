"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateRegistrationSettings(
  formData: FormData
) {
  const supabase = await createServerSupabaseClient();

  const { data: settings } = await supabase
    .from("registration_settings")
    .select("id")
    .single();

  if (!settings) {
    throw new Error("Settings not found");
  }

  const result = await supabase
    .from("registration_settings")
    .update({
      registration_open:
        formData.get("registration_open") === "on",

      registration_url:
        formData.get("registration_url"),

      author_fee:
        formData.get("author_fee"),

      student_fee:
        formData.get("student_fee"),

      industry_fee:
        formData.get("industry_fee"),

      international_fee:
        formData.get("international_fee"),

      instructions:
        formData.get("instructions"),
    })
    .eq("id", settings.id)
    .select();

  console.log(result);

  if (result.error) {
    throw result.error;
  }

  revalidatePath("/registration");
}