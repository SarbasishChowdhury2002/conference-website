import Link from "next/link";
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

  // Dashboard Stats

  const { count: speakersCount } =
    await supabase
      .from("speakers")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: datesCount } =
    await supabase
      .from("important_dates")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: announcementsCount } =
    await supabase
      .from("announcements")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: programmeCount } =
  await supabase
    .from("programme")
    .select("*", {
      count: "exact",
      head: true,
    });

  // Recent Announcements

  const {
    data: recentAnnouncements,
  } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mb-8 text-gray-600">
        Welcome {user.email}
      </p>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Speakers"
          value={speakersCount ?? 0}
        />

        <StatCard
          title="Important Dates"
          value={datesCount ?? 0}
        />

        <StatCard
          title="Announcements"
          value={announcementsCount ?? 0}
        />

        <StatCard
          title="Programme Items"
          value={programmeCount ?? 0}
        />
      </div>

      {/* Quick Actions */}

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/speakers/new"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add Speaker
          </Link>

          <Link
            href="/admin/important-dates/new"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add Date
          </Link>

          <Link
            href="/admin/announcements/new"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add Announcement
          </Link>

          <Link
            href="/admin/programme/new"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add Programme Item
          </Link>
        </div>
      </div>

      {/* Recent Announcements */}

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Announcements
        </h2>

        <div className="overflow-hidden rounded border">
          {recentAnnouncements?.length ? (
            recentAnnouncements.map(
              (announcement) => (
                <div
                  key={announcement.id}
                  className="border-b p-4 last:border-b-0"
                >
                  <p className="font-medium">
                    {announcement.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {announcement.is_published
                      ? "Published"
                      : "Draft"}
                  </p>
                </div>
              )
            )
          ) : (
            <div className="p-4 text-gray-500">
              No announcements yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}