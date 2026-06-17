import { createServerSupabaseClient } from "@/lib/supabase/server";
import ConferenceForm from "./conference-form";

export default async function ConferencePage() {
  const supabase = await createServerSupabaseClient();

  const { data: conference, error } = await supabase
    .from("conferences")
    .select("*")
    .single();

  if (error || !conference) {
    return (
      <div>
        Failed to load conference settings.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Conference Settings
        </h1>

        <p className="text-gray-600">
          Manage conference information displayed
          throughout the website.
        </p>
      </div>

      <ConferenceForm conference={conference} />
    </div>
  );
}