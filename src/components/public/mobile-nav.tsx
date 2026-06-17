"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
  { href: "/registration", label: "Registration" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl font-bold"
      >
        ☰
      </button>

      {open && (
        <div className="absolute left-0 top-20 w-full border-b bg-white shadow-lg">
          <nav className="flex flex-col p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b py-3 ${
                pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}