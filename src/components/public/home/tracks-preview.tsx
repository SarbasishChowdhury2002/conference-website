import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ConferenceTrack } from "@/types/database";

interface TracksPreviewProps {
  tracks: ConferenceTrack[];
  failed: boolean;
}

export function TracksPreview({ tracks, failed }: TracksPreviewProps) {
  if (tracks.length === 0 && !failed) {
    // Nothing fabricated — omit the section entirely rather than show an
    // empty grid when no tracks exist yet.
    return null;
  }

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Research Tracks"
          title="Conference Tracks"
          className="mb-0"
        />
        <Link
          href="/tracks"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          View All Tracks
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {failed ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Tracks are temporarily unavailable — please check back shortly.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tracks.map((track, index) => (
            <Card key={track.id} variant="elevated">
              <CardHeader>
                <p className="text-eyebrow">
                  Track {String(index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="mt-1">{track.title}</CardTitle>
              </CardHeader>
              {track.description && (
                <CardContent>
                  <p className="line-clamp-4 text-sm text-muted-foreground">
                    {track.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
