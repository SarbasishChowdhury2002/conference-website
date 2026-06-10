CREATE TABLE conferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,
    short_name TEXT NOT NULL,

    year INTEGER NOT NULL,

    theme TEXT NOT NULL,
    tagline TEXT,

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    venue_name TEXT NOT NULL,
    venue_address TEXT,

    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL DEFAULT 'India',

    status conference_status NOT NULL DEFAULT 'draft',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_dates
        CHECK (end_date >= start_date)
);


CREATE INDEX idx_conferences_status
ON conferences(status);

CREATE INDEX idx_conferences_year
ON conferences(year);