import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import StatCard from "@/components/admin/stat-card";

export default async function AdminPage() {
  const supabase =
    await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mb-8 text-gray-600">
        Welcome {user.email}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Speakers"
          value={0}
        />

        <StatCard
          title="Important Dates"
          value={0}
        />

        <StatCard
          title="Announcements"
          value={0}
        />

        <StatCard
          title="Programme Items"
          value={0}
        />
      </div>
    </div>
  );
}