CREATE TABLE downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    description TEXT,

    file_url TEXT NOT NULL,

    category TEXT NOT NULL,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_visible BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);