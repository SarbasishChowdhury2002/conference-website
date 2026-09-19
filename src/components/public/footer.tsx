import Link from "next/link";

import { getConference } from "@/lib/data/conference";
import { getContactSettings } from "@/lib/data/contact";
import { FOOTER_LINK_GROUPS } from "@/constants/navigation";
import { FULL_CONFERENCE_NAME } from "@/constants/conference";
import { Container } from "@/components/public/section";

/**
 * Global site footer. Async server component — pulls the conference record
 * and contact settings so the name/year/venue/email aren't hardcoded.
 *
 * `getConference()` throws on a Supabase error (see lib/data/conference.ts);
 * since the footer renders on every single page via the shared layout, a
 * transient DB error here must not take down the entire site. It's caught
 * locally and falls back to the canonical static identity rather than
 * propagating — a page-specific data fetch failing is one thing, the
 * global chrome failing is another.
 */
export async function Footer() {
  const [conference, contactSettings] = await Promise.all([
    getConference().catch(() => null),
    getContactSettings().catch(() => null),
  ]);

  const shortName = conference?.short_name
    ? `${conference.short_name}${conference.year ? ` ${conference.year}` : ""}`
    : "IC-COMEN 2027";

  const email = contactSettings?.email ?? conference?.contact_email ?? null;

  const venueLine = conference
    ? [conference.venue_name, conference.city, conference.country]
        .filter(Boolean)
        .join(", ")
    : null;

  const year = conference?.year ?? new Date().getFullYear();

  return (
    <footer className="border-t border-surface-dark-border bg-surface-dark text-surface-dark-foreground">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="text-h4 text-surface-dark-foreground">
              {shortName}
            </p>
            <p className="mt-2 max-w-xs text-sm text-surface-dark-muted">
              {FULL_CONFERENCE_NAME}
            </p>
            {email && (
              <p className="mt-4 text-sm">
                <a
                  href={`mailto:${email}`}
                  className="text-surface-dark-foreground transition hover:text-accent"
                >
                  {email}
                </a>
              </p>
            )}
            {venueLine && (
              <p className="mt-1 text-sm text-surface-dark-muted">
                {venueLine}
              </p>
            )}
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-eyebrow text-surface-dark-muted">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-dark-muted transition hover:text-surface-dark-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-dark-border pt-8 text-sm text-surface-dark-muted md:flex-row">
          <p>
            © {year} {shortName}. All rights reserved.
          </p>
          <Link
            href="/login"
            className="font-medium transition hover:text-surface-dark-foreground"
          >
            Organizer Login
          </Link>
        </div>
      </Container>
    </footer>
  );
}
