import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminUser() {
  const supabase =
    await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mb-6 border-b pb-4">
      <p className="text-sm text-gray-500">
        Logged in as
      </p>

      <p className="font-medium">
        {user?.email}
      </p>
    </div>
  );
}