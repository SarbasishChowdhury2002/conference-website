import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getRegistrationSettings() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("registration_settings")
    .select("*")
    .single();

  return data;
}