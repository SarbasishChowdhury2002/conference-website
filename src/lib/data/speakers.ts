import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getSpeakers() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("speakers")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}