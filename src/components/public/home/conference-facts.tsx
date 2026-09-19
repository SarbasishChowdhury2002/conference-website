import { CalendarDays, MapPin, FileText, ClipboardList } from "lucide-react";

import { Container } from "@/components/public/section";
import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/utils";
import type { Conference, RegistrationSettings } from "@/types/database";

interface ConferenceFactsProps {
  conference: Conference | null;
  registrationSettings: RegistrationSettings | null;
}

interface Fact {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}

export function ConferenceFacts({
  conference,
  registrationSettings,
}: ConferenceFactsProps) {
  const venueLine = conference
    ? [conference.venue_name, conference.city, conference.country]
        .filter(Boolean)
        .join(", ")
    : null;

  const registrationOpen = registrationSettings?.registration_open ?? false;

  const facts: Fact[] = [
    {
      icon: CalendarDays,
      label: "Dates",
      value:
        conference?.start_date && conference?.end_date
          ? formatDateRange(conference.start_date, conference.end_date)
          : "To be announced",
    },
    {
      icon: MapPin,
      label: "Location",
      value: venueLine ?? "To be announced",
    },
    {
      icon: FileText,
      label: "Paper Submission",
      value: conference?.cmt_link ? "Microsoft CMT" : "To be announced",
    },
    {
      icon: ClipboardList,
      label: "Registration",
      value: (
        <Badge variant={registrationOpen ? "success" : "outline"}>
          {registrationOpen ? "Open" : "Currently Closed"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="border-b border-border bg-muted">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 sm:grid-cols-4">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-primary"
              />
              <div>
                <dt className="text-label">{label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-foreground">
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
