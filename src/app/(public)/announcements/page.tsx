import { AnnouncementCard } from "@/components/public/announcement-card";
import { SectionTitle } from "@/components/public/section-title";
import { getAnnouncements } from "@/lib/data/announcements";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionTitle
        title="Announcements"
        subtitle="Latest conference updates"
      />

      {announcements.length === 0 ? (
        <div className="text-center text-gray-500">
          No announcements have been published yet.
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              content={announcement.content}
              createdAt={announcement.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}