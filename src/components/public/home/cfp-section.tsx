import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ConferenceTrack } from "@/types/database";

interface CfpSectionProps {
  tracks: ConferenceTrack[];
  tracksFailed: boolean;
}

export function CfpSection({ tracks, tracksFailed }: CfpSectionProps) {
  return (
    <Section variant="muted">
      <SectionHeader
        eyebrow="Call for Papers"
        title="Share your research at IC-COMEN 2027"
        description="We invite original, unpublished research contributions from academia and industry across the conference's research areas."
      />

      {tracks.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tracks.map((track) => (
            <Badge key={track.id} variant="outline" className="px-3 py-1.5">
              {track.title}
            </Badge>
          ))}
        </div>
      )}
      {tracks.length === 0 && !tracksFailed && (
        <p className="mt-8 text-sm text-muted-foreground">
          Research tracks will be announced soon.
        </p>
      )}
      {tracksFailed && (
        <p className="mt-8 text-sm text-muted-foreground">
          Research areas are temporarily unavailable — see the Tracks page for details.
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button asChild variant="cta" size="lg">
          <Link href="/submission">Submit Your Paper</Link>
        </Button>
        <Link
          href="/tracks"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Explore All Tracks
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
