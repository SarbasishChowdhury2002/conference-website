/**
 * Single source of truth for site navigation. The desktop navbar and the
 * mobile menu both consume PRIMARY_NAV from here — do not maintain a
 * second copy of the link list anywhere else.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Set for links that leave the site (e.g. Microsoft CMT, Google Maps). */
  external?: boolean;
}

/**
 * Canonical route paths. Defined once so the primary nav and the footer
 * groups (which overlap but aren't identical) never disagree on a URL.
 */
export const ROUTES = {
  home: "/",
  callForPapers: "/call-for-papers",
  tracks: "/tracks",
  submission: "/submission",
  importantDates: "/important-dates",
  registration: "/registration",
  committee: "/committee",
  venue: "/venue",
  attractions: "/attractions",
  contact: "/contact",
  about: "/about",
  speakers: "/speakers",
  programme: "/programme",
  announcements: "/announcements",
} as const;

/**
 * The primary navbar — exact order and exact visible labels as specified.
 * About/Speakers/Programme/Announcements are deliberately NOT here; they
 * stay reachable by direct URL and from the footer only.
 */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Call for Papers", href: ROUTES.callForPapers },
  { label: "Tracks", href: ROUTES.tracks },
  { label: "Paper Submission", href: ROUTES.submission },
  { label: "Important Dates", href: ROUTES.importantDates },
  { label: "Registrations", href: ROUTES.registration },
  { label: "Committees", href: ROUTES.committee },
  { label: "Venue", href: ROUTES.venue },
  { label: "Attractions", href: ROUTES.attractions },
  { label: "Contact", href: ROUTES.contact },
];

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Conference",
    links: [
      { label: "Call for Papers", href: ROUTES.callForPapers },
      { label: "Tracks", href: ROUTES.tracks },
      { label: "Paper Submission", href: ROUTES.submission },
      { label: "Important Dates", href: ROUTES.importantDates },
    ],
  },
  {
    title: "Attend",
    links: [
      { label: "Registrations", href: ROUTES.registration },
      { label: "Venue", href: ROUTES.venue },
      { label: "Attractions", href: ROUTES.attractions },
      { label: "Committees", href: ROUTES.committee },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Contact", href: ROUTES.contact },
      { label: "Programme", href: ROUTES.programme },
      { label: "Announcements", href: ROUTES.announcements },
      { label: "Speakers", href: ROUTES.speakers },
    ],
  },
];
