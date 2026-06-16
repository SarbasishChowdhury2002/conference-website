import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAnnouncements() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}