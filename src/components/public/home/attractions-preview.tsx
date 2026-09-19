import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";

export function AttractionsPreview() {
  return (
    <Section variant="muted">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader
          eyebrow="Beyond the Conference"
          title="Discover the host city and region"
          description="A guide to local attractions, culture, and travel tips will be published closer to the conference."
          className="mb-0"
        />
        <div className="flex shrink-0 items-center gap-3 rounded-lg border border-border bg-background px-5 py-4">
          <Compass aria-hidden="true" className="size-6 text-primary" />
          <Link
            href="/attractions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Explore Attractions
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
