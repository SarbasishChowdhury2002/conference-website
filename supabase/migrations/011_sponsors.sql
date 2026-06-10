CREATE TABLE sponsors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    website_url TEXT,

    logo_url TEXT,

    sponsor_level TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_visible BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsors_conference
ON sponsors(conference_id);

CREATE INDEX idx_sponsors_visible
ON sponsors(is_visible);