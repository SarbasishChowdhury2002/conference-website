CREATE TABLE programme (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    description TEXT,

    session_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    venue TEXT,

    speaker_name TEXT,

    speaker_id UUID
        REFERENCES speakers(id)
        ON DELETE SET NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_session_time
        CHECK (end_time > start_time)
);

CREATE INDEX idx_programme_conference
ON programme(conference_id);

CREATE INDEX idx_programme_date
ON programme(session_date);

CREATE INDEX idx_programme_visible
ON programme(is_visible);