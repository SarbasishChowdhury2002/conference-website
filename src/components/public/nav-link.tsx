"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { isRouteActive } from "@/lib/nav";

interface NavLinkProps {
  href: string;
  label: string;
}

/**
 * A single desktop primary-nav link. Active state is a bottom border +
 * color change (not color alone), and carries aria-current="page" so it's
 * conveyed to assistive tech, not just visually.
 */
export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const active = isRouteActive(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-full items-center whitespace-nowrap border-b-2 px-0.5 text-[13px] font-medium transition-colors xl:text-sm",
        "focus-visible:ring-ring focus-visible:ring-offset-background rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        active
          ? "border-primary text-primary"
          : "border-transparent text-foreground/80 hover:border-border hover:text-primary"
      )}
    >
      {label}
    </Link>
  );
}
