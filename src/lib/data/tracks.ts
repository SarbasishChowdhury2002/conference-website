import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getTracks() {
  const supabase =
    await createServerSupabaseClient();

  const { data, error } =
    await supabase
      .from("conference_tracks")
      .select("*")
      .eq("is_visible", true)
      .order("display_order");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}