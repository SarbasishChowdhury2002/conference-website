import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tracks", label: "Tracks" },
  { href: "/call-for-papers", label: "Call For Papers" },
  { href: "/submission", label: "Submission" },
  { href: "/speakers", label: "Speakers" },
  { href: "/programme", label: "Programme" },
  { href: "/committee", label: "Committee" },
  { href: "/important-dates", label: "Important Dates" },
  { href: "/announcements", label: "Announcements" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo / Conference Name */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          CONF2026
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
            />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/registration"
            className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 lg:block"
          >
            Register
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}