import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/public/section";
import { ConferenceMark } from "@/components/public/conference-mark";
import { FULL_CONFERENCE_NAME } from "@/constants/conference";
import { formatDateRange } from "@/lib/utils";
import type { Conference } from "@/types/database";

interface HeroProps {
  conference: Conference | null;
}

/**
 * Abstract node-network motif — original, CSS/SVG only (no stock imagery,
 * no external asset). Stands in for "computational intelligence" without
 * literal robot/AI-cliche imagery. Purely decorative, hidden from
 * assistive tech.
 */
function HeroGraphic() {
  const nodes = [
    [40, 60], [140, 30], [230, 90], [330, 40], [400, 110],
    [90, 150], [200, 170], [310, 160], [380, 220], [60, 230],
    [180, 250], [280, 260],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6],
    [3, 7], [4, 8], [5, 6], [6, 7], [7, 8], [5, 9], [6, 10],
    [7, 11], [10, 11], [9, 10],
  ];

  return (
    <svg
      viewBox="0 0 420 300"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4} fill="currentColor" />
      ))}
    </svg>
  );
}

export function Hero({ conference }: HeroProps) {
  const dateRange =
    conference?.start_date && conference?.end_date
      ? formatDateRange(conference.start_date, conference.end_date)
      : null;

  // CMS-driven, deliberately not hardcoded — whatever admin sets for
  // venue_name/city/country on the conference record is what renders here.
  // (Note for the org: the current values look swapped — see written notes.)
  const venueLine = conference
    ? [conference.venue_name, conference.city, conference.country]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <section className="relative overflow-hidden border-b border-border bg-background text-primary">
      <HeroGraphic />
      <Container className="relative py-20 md:py-28">
        <div className="max-w-3xl">
          <ConferenceMark className="mb-6" />
          <p className="text-lead mt-2 max-w-2xl">{FULL_CONFERENCE_NAME}</p>

          {(dateRange || venueLine) && (
            <p className="text-label mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              {dateRange && <span>{dateRange}</span>}
              {dateRange && venueLine && (
                <span aria-hidden="true" className="text-border">
                  •
                </span>
              )}
              {venueLine && <span>{venueLine}</span>}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="cta" size="lg">
              <Link href="/submission">Submit Your Paper</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/important-dates">View Important Dates</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
