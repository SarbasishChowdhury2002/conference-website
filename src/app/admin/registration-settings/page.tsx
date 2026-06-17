import { createServerSupabaseClient } from "@/lib/supabase/server";
import RegistrationForm from "./registration-form";

export default async function RegistrationSettingsPage() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("registration_settings")
    .select("*")
    .single();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Registration Settings
      </h1>

      <RegistrationForm settings={data} />
    </div>
  );
}