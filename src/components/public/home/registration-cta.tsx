import Link from "next/link";

import { CtaBand } from "@/components/public/cta-band";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { RegistrationSettings } from "@/types/database";

interface RegistrationCtaProps {
  registrationSettings: RegistrationSettings | null;
}

export function RegistrationCta({ registrationSettings }: RegistrationCtaProps) {
  const registrationOpen = registrationSettings?.registration_open ?? false;

  return (
    <CtaBand
      eyebrow="Registration"
      title="Join IC-COMEN 2027"
      description={
        registrationOpen
          ? "Registration is now open. Visit the registration page for categories, fees, and instructions."
          : "Registration is currently closed. Full categories, fees, and instructions will be published on the registration page once available."
      }
    >
      <Badge
        variant={registrationOpen ? "success" : "outline"}
        className={
          registrationOpen
            ? undefined
            : "border-surface-dark-border bg-transparent text-surface-dark-foreground"
        }
      >
        {registrationOpen ? "Registration Open" : "Registration Currently Closed"}
      </Badge>
      <Button asChild variant="cta">
        <Link href="/registration">
          {registrationOpen ? "Register Now" : "View Registration Details"}
        </Link>
      </Button>
    </CtaBand>
  );
}
