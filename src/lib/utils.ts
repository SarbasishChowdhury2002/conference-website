import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "27 March 2027" */
export function formatDate(dateString: string): string {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * "27–28 March 2027" when both dates share a month/year, otherwise falls
 * back to "27 March 2027 – 3 April 2028" style for the general case.
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const sameMonthYear =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonthYear) {
    const month = end.toLocaleDateString("en-GB", { month: "long" });
    const year = end.getFullYear();
    return `${start.getDate()}–${end.getDate()} ${month} ${year}`;
  }

  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}
