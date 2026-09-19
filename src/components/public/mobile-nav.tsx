"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { isRouteActive } from "@/lib/nav";
import { PRIMARY_NAV } from "@/constants/navigation";
import { Button } from "@/components/ui/button";

/**
 * Mobile navigation drawer. Built on Radix Dialog rather than a hand-rolled
 * `open && <div>` panel, so focus containment, Escape-to-close, and
 * aria-modal wiring come from a well-tested primitive instead of being
 * re-implemented (and likely under-implemented) here.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close automatically on navigation, so the drawer never lingers open
  // after a link is followed. Derived during render (React's documented
  // pattern for "reset state when a value changes") rather than in a
  // useEffect, which would call setState after an extra render pass.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground outline-none transition hover:bg-muted focus-visible:ring-2 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-surface-dark/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:hidden" />
        <Dialog.Content
          id="mobile-nav-panel"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-background shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <Dialog.Title className="text-h4">Menu</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="focus-visible:ring-ring inline-flex size-10 items-center justify-center rounded-md text-foreground outline-none transition hover:bg-muted focus-visible:ring-2"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-2">
            {PRIMARY_NAV.map((item) => {
              const active = isRouteActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-visible:ring-ring block rounded-md px-4 py-3 text-base font-medium outline-none transition focus-visible:ring-2",
                    active
                      ? "bg-secondary text-primary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="shrink-0 border-t border-border p-4">
            <Button asChild variant="cta" className="w-full">
              <Link href="/submission">Submit Your Paper</Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
