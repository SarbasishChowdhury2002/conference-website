import type { Metadata } from "next";
import { Compass } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";

export const metadata: Metadata = {
  title: "Attractions — IC-COMEN 2027",
};

/**
 * Minimal placeholder. The full Attractions page (dedicated schema, real
 * host-city content) is a separate, later phase — this exists only so the
 * homepage's "Explore Attractions" link resolves instead of 404ing.
 */
export default function AttractionsPage() {
  return (
    <Section>
      <SectionHeader eyebrow="Attractions" title="Discover the Host City" />
      <div className="mt-10 flex items-center gap-4 rounded-lg border border-border bg-muted p-8">
        <Compass aria-hidden="true" className="size-8 shrink-0 text-primary" />
        <div>
          <p className="text-h4">Coming soon</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A guide to local attractions, culture, and travel tips will be
            published here closer to the conference.
          </p>
        </div>
      </div>
    </Section>
  );
}
