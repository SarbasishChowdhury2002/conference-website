import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getImportantDates() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("important_dates")
    .select("*")
    .eq("is_visible", true)
    .order("event_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}