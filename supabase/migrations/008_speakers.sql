CREATE TABLE speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    designation TEXT NOT NULL,

    slug TEXT UNIQUE NOT NULL,

    organization TEXT NOT NULL,

    bio TEXT,

    photo_url TEXT,

    talk_title TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_visible BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX idx_speakers_conference
ON speakers(conference_id);

CREATE INDEX idx_speakers_visible
ON speakers(is_visible);