import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCommitteeMembers() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("committee_members")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}