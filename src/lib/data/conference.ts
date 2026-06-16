import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getConference() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("conferences")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}