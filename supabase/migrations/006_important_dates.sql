CREATE TABLE important_dates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    description TEXT,

    event_date DATE NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_visible BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX idx_important_dates_conference
ON important_dates(conference_id);

CREATE INDEX idx_important_dates_date
ON important_dates(event_date);

CREATE INDEX idx_important_dates_visible
ON important_dates(is_visible);