import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/speakers", label: "Speakers" },
  { href: "/committee", label: "Committee" },
  { href: "/programme", label: "Programme" },
  { href: "/important-dates", label: "Important Dates" },
  { href: "/announcements", label: "Announcements" },
  { href: "/registration", label: "Registration" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          CONF2026
        </Link>

        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}