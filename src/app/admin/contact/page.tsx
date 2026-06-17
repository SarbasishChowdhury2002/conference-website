import { createServerSupabaseClient } from "@/lib/supabase/server";
import ContactForm from "./contact-form";

export default async function ContactPage() {
  const supabase = await createServerSupabaseClient();

  const { data } = await supabase
    .from("contact_settings")
    .select("*")
    .single();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Contact Settings
      </h1>

      <ContactForm settings={data} />
    </div>
  );
}