import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { AnnouncementCard } from "@/components/public/announcement-card";
import type { Announcement } from "@/types/database";

interface AnnouncementsPreviewProps {
  announcements: Announcement[];
  failed: boolean;
}

/**
 * Deliberately self-hiding: with no published announcements (the current
 * production state — the one existing row is unpublished) this renders
 * nothing rather than an empty section or a fabricated announcement. Once
 * real announcements are published, it appears automatically.
 */
export function AnnouncementsPreview({ announcements, failed }: AnnouncementsPreviewProps) {
  if (announcements.length === 0 && !failed) {
    return null;
  }

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader eyebrow="Latest News" title="Announcements" className="mb-0" />
        <Link
          href="/announcements"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          View All Announcements
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {failed ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Announcements are temporarily unavailable.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {announcements.slice(0, 3).map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              content={announcement.content}
              createdAt={announcement.created_at}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
