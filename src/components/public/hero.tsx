import Link from "next/link";

interface HeroProps {
  name: string;
  theme: string;
  tagline: string;
  dates: string;
  venue: string;
}

export function Hero({
  name,
  theme,
  tagline,
  dates,
  venue,
}: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-28 text-center">
        <p className="mb-4 text-lg text-blue-200">
          {theme}
        </p>

        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
          {name}
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-200">
          {tagline}
        </p>

        <div className="mb-10 space-y-2 text-lg">
          <p>{dates}</p>
          <p>{venue}</p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/registration"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Register Now
          </Link>

          <Link
            href="/important-dates"
            className="rounded-lg border border-white px-6 py-3 font-medium text-white hover:bg-white hover:text-slate-900"
          >
            Important Dates
          </Link>
        </div>
      </div>
    </section>
  );
}