"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export function NavLink({
  href,
  label,
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition ${
        isActive
          ? "text-blue-600"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  );
}