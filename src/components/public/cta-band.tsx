import * as React from "react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/public/section";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Buttons (typically one `cta` variant + one `outline`/ghost variant). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * The dark, "intentional and premium" CTA band used for sections like the
 * Call for Papers CTA and the Registration CTA. Deliberately not just
 * `bg-blue-600` — uses the surface-dark tokens so it reads as a distinct,
 * designed moment rather than an arbitrary colored box.
 */
function CtaBand({ eyebrow, title, description, children, className }: CtaBandProps) {
  return (
    <Section variant="dark" className={className}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-eyebrow mb-3 text-accent">{eyebrow}</p>
        )}
        <h2 className="text-h2">{title}</h2>
        {description && (
          <p className={cn("text-lead mt-4 text-surface-dark-muted")}>
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {children}
          </div>
        )}
      </div>
    </Section>
  );
}

export { CtaBand };
