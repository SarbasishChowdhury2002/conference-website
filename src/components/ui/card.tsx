import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Card variants for IC-COMEN 2027. Deliberately restrained — not every
 * section of the site should be a floating rounded white card (see Phase 2
 * design brief). Pick the variant that matches the content's role:
 *
 *  - default:     the normal case — bordered, flat background. Committee
 *                  members, tracks, announcements.
 *  - elevated:     adds shadow for content that should visually lift off
 *                  the page (e.g. a featured speaker, a pricing card).
 *  - flat:         no border/shadow, just a muted background tint — for
 *                  grouping content inside an already-bordered/dark section.
 *  - dark:         for cards placed on top of a dark section (rare —
 *                  most dark-section content shouldn't need cards at all).
 *  - highlighted:  accent-bordered, for the one thing that should stand
 *                  out (e.g. "next deadline" on the Important Dates page).
 */
const cardVariants = cva("rounded-lg text-card-foreground", {
  variants: {
    variant: {
      default: "bg-card border border-border",
      elevated: "bg-card border border-border shadow-md",
      flat: "bg-muted",
      dark: "bg-surface-dark text-surface-dark-foreground border border-surface-dark-border",
      highlighted: "bg-card border-2 border-accent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-h4 leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
