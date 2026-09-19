import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Set when this section sits on a dark surface (CtaBand, footer, etc). */
  dark?: boolean;
}

/**
 * The standard "eyebrow + title + description" header used at the top of
 * (almost) every page section. Keeps heading scale, spacing and the
 * eyebrow treatment consistent everywhere instead of each page composing
 * its own <p>/<h2>/<p> stack with slightly different classes.
 */
function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn("text-eyebrow mb-3", dark && "text-accent")}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-h2">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-lead mt-4",
            dark && "text-surface-dark-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionHeader };
