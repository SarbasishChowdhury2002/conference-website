import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getContactSettings() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("contact_settings")
    .select("*")
    .single();

  return data;
}