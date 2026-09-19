import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { CommitteeCard } from "@/components/public/committee-card";
import type { CommitteeMember } from "@/types/database";

interface CommitteePreviewProps {
  members: CommitteeMember[];
  failed: boolean;
}

export function CommitteePreview({ members, failed }: CommitteePreviewProps) {
  if (members.length === 0 && !failed) {
    return null;
  }

  return (
    <Section variant="muted">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Leadership"
          title="Committees"
          description="A preview of the organizing team behind IC-COMEN 2027."
          className="mb-0"
        />
        <Link
          href="/committee"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          View Committees
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {failed ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Committee information is temporarily unavailable.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {members.slice(0, 4).map((member) => (
            <CommitteeCard
              key={member.id}
              name={member.name}
              designation={member.designation}
              organization={member.organization ?? ""}
              committeeGroup={member.committee_group}
              photoUrl={member.photo_url}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
