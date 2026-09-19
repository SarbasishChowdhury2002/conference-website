/**
 * Whether `href` should be shown as the active nav item for the current
 * `pathname`. Exact match always counts; a prefix match only counts when
 * followed by a real path segment boundary ("/"), so `/submission` does
 * not incorrectly light up for some future `/submission-guide` route, and
 * `/` (Home) only activates on the actual homepage.
 */
export function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
