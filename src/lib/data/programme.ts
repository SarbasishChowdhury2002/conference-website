import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getProgrammeItems() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("programme")
    .select(`
      *,
      speaker:speaker_id (
        id,
        name,
        designation,
        organization,
        photo_url
      )
    `)
    .order("session_date")
    .order("start_time");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}