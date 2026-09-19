import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import type { Conference } from "@/types/database";

interface VenuePreviewProps {
  conference: Conference | null;
}

export function VenuePreview({ conference }: VenuePreviewProps) {
  const venueLine = conference
    ? [conference.venue_name, conference.city, conference.country]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <SectionHeader
          eyebrow="Venue"
          title="Where IC-COMEN 2027 takes place"
          description={
            venueLine
              ? undefined
              : "Full venue details — address, travel, and accommodation information — will be published here once confirmed."
          }
        />
        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted p-6">
          <MapPin aria-hidden="true" className="size-8 shrink-0 text-primary" />
          <div>
            <p className="text-h4">{venueLine ?? "Venue details coming soon"}</p>
            <Link
              href="/venue"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View Venue
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
