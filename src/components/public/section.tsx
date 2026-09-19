import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Shared content container — consistent max-width and horizontal padding.
 * Use this directly when you need the container without a full <Section>
 * wrapper (e.g. inside a CtaBand, or in the navbar in a later phase).
 */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

type SectionVariant = "default" | "muted" | "dark";

const sectionVariantClasses: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-surface-dark text-surface-dark-foreground",
};

interface SectionProps extends React.ComponentProps<"section"> {
  variant?: SectionVariant;
  /** Set false when a page needs tighter control over its own padding. */
  padded?: boolean;
  containerClassName?: string;
}

/**
 * The standard page-section wrapper: consistent vertical rhythm (py-16 on
 * mobile, py-24 from md up) and the shared Container inside it. This is
 * what every homepage/page section should use instead of independently
 * writing `<div className="container mx-auto px-4 py-...">` with
 * unrelated values per page.
 */
function Section({
  variant = "default",
  padded = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        padded && "py-16 md:py-24",
        sectionVariantClasses[variant],
        className
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export { Section, Container };
