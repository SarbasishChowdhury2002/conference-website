import Link from "next/link";

import { PRIMARY_NAV } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/public/section";
import { ConferenceMark } from "@/components/public/conference-mark";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";

/**
 * Global site header. Server component (no hooks of its own) — active-state
 * and the mobile drawer are the only client islands, kept in NavLink /
 * MobileNav respectively.
 *
 * Breakpoints: the full 10-item primary nav (no hamburger) appears from
 * `lg:` (1024px) up and must never clip or force horizontal scroll through
 * the entire "laptop" range (1024–1439px). That's tight — 10 items
 * including "Paper Submission" and "Important Dates" — so spacing/type
 * scale is deliberately compact at `lg`/`xl` and only relaxes at `2xl:`
 * (1536px+), where the tagline subtitle and the "Submit Your Paper" CTA
 * also reappear. Below `lg:`, everything collapses to the mobile drawer.
 */
export function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 border-b border-border backdrop-blur">
      <Container className="flex h-16 items-stretch justify-between gap-2 px-4 sm:px-6 lg:gap-3 lg:px-4 xl:px-6 2xl:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <ConferenceMark showTagline />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden h-full min-w-0 items-stretch gap-x-2 lg:flex xl:gap-x-4 2xl:gap-x-5"
        >
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Button
            asChild
            variant="cta"
            size="sm"
            className="hidden 2xl:inline-flex"
          >
            <Link href="/submission">Submit Your Paper</Link>
          </Button>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
