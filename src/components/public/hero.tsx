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
    <section className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="mb-3 text-lg">
          {theme}
        </p>

        <h1 className="mb-4 text-5xl font-bold">
          {name}
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-xl">
          {tagline}
        </p>

        <div className="space-y-2 text-lg">
          <p>{dates}</p>
          <p>{venue}</p>
        </div>
      </div>
    </section>
  );
}