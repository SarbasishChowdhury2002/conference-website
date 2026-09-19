import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { getConference } from "@/lib/data/conference";

export const metadata: Metadata = {
  title: "Venue — IC-COMEN 2027",
};

/**
 * Minimal placeholder. The full Venue page (dedicated schema, address,
 * travel/accommodation info) is a separate, later phase — this exists only
 * so the homepage's "View Venue" link resolves instead of 404ing.
 */
export default async function VenuePage() {
  const conference = await getConference().catch(() => null);

  const venueLine = conference
    ? [conference.venue_name, conference.city, conference.country]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <Section>
      <SectionHeader eyebrow="Venue" title="Conference Venue" />
      <div className="mt-10 flex items-center gap-4 rounded-lg border border-border bg-muted p-8">
        <MapPin aria-hidden="true" className="size-8 shrink-0 text-primary" />
        <div>
          <p className="text-h4">{venueLine ?? "Venue details coming soon"}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Full venue details, including address, travel, and accommodation
            information, will be published here once confirmed.
          </p>
        </div>
      </div>
    </Section>
  );
}
