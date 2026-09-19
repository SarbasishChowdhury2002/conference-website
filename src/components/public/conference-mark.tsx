import { cn } from "@/lib/utils";
import { FULL_CONFERENCE_NAME } from "@/constants/conference";

interface ConferenceMarkProps {
  className?: string;
  /** Show the full conference name beneath the short mark, where there's room. */
  showTagline?: boolean;
}

/**
 * Text-based conference mark, standing in for an official IC-COMEN 2027
 * logo — none exists in the project yet (public/ only has the default
 * create-next-app placeholder SVGs; see Phase 3 audit notes). Swap this
 * component's contents for an <Image> once a real logo/wordmark exists —
 * every caller only ever renders <ConferenceMark />, so nothing else needs
 * to change.
 */
export function ConferenceMark({ className, showTagline = false }: ConferenceMarkProps) {
  return (
    <span className={cn("flex flex-col justify-center leading-none", className)}>
      <span className="text-lg font-bold tracking-tight text-primary sm:text-xl">
        IC-COMEN <span className="text-accent">2027</span>
      </span>
      {showTagline && (
        <span className="mt-0.5 hidden max-w-[320px] truncate text-[10px] font-medium tracking-wide text-muted-foreground xl:block 2xl:max-w-[520px]">
          {FULL_CONFERENCE_NAME}
        </span>
      )}
    </span>
  );
}
