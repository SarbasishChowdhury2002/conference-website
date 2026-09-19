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
 * Breakpoints: full primary nav (all 10 items, no hamburger) appears from
 * `lg:` (1024px) up — tuned typography/spacing (13px nav text, tight gaps)
 * makes that fit without wrapping. The "Submit Your Paper" CTA is the one
 * genuinely optional element per the brief, so it only appears from `xl:`
 * (1280px) up, once there's real breathing room — below that it's still
 * reachable via the mobile drawer.
 */
export function Navbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 border-b border-border backdrop-blur">
      <Container className="flex h-16 items-stretch justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center">
          <ConferenceMark showTagline />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden h-full items-stretch gap-x-3 lg:flex xl:gap-x-5"
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
            className="hidden xl:inline-flex"
          >
            <Link href="/submission">Submit Your Paper</Link>
          </Button>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
