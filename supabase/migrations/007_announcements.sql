CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    content TEXT NOT NULL,

    is_published BOOLEAN NOT NULL DEFAULT FALSE,

    published_at TIMESTAMPTZ,

    created_by UUID
        REFERENCES profiles(id),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX idx_announcements_published
ON announcements(is_published);

CREATE INDEX idx_announcements_conference
ON announcements(conference_id);