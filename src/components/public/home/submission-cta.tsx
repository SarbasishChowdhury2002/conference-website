import Link from "next/link";

import { CtaBand } from "@/components/public/cta-band";
import { Button } from "@/components/ui/button";

export function SubmissionCta() {
  return (
    <CtaBand
      eyebrow="Get Involved"
      title="Contribute to IC-COMEN 2027"
      description="Present your research to an international audience of engineers and computational-intelligence researchers."
    >
      <Button asChild variant="cta">
        <Link href="/submission">Submit Your Paper</Link>
      </Button>
      <Button asChild variant="outline" className="border-surface-dark-border text-surface-dark-foreground hover:bg-surface-dark-border/20">
        <Link href="/tracks">Explore Tracks</Link>
      </Button>
    </CtaBand>
  );
}
