CREATE TABLE committee_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    designation TEXT NOT NULL,

    organization TEXT,

    committee_group TEXT NOT NULL,

    photo_url TEXT,

    display_order INTEGER NOT NULL DEFAULT 0,

    is_visible BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_committee_members_conference
ON committee_members(conference_id);

CREATE INDEX idx_committee_members_visible
ON committee_members(is_visible);