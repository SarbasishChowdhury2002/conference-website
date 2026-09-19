import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

import { Section } from "@/components/public/section";
import { SectionHeader } from "@/components/public/section-header";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { ImportantDate } from "@/types/database";

interface ImportantDatesPreviewProps {
  dates: ImportantDate[];
  failed: boolean;
}

export function ImportantDatesPreview({ dates, failed }: ImportantDatesPreviewProps) {
  if (dates.length === 0 && !failed) {
    return null;
  }

  return (
    <Section variant="muted">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader
          eyebrow="Key Deadlines"
          title="Important Dates"
          className="mb-0"
        />
        <Link
          href="/important-dates"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Full Schedule
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {failed ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Important dates are temporarily unavailable — please check back shortly.
        </p>
      ) : (
        // Single-column list of milestone cards works whether there's one
        // date or many — a 1-item "timeline" would look like a bug, this
        // doesn't.
        <ol className="mt-10 space-y-4">
          {dates.map((date, index) => (
            <li key={date.id}>
              <Card
                variant={index === 0 ? "highlighted" : "default"}
                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-3 sm:w-64 sm:shrink-0">
                  <CalendarClock
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary"
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {formatDate(date.event_date)}
                  </span>
                </div>
                <div>
                  <p className="text-h4">{date.title}</p>
                  {date.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {date.description}
                    </p>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
