CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL UNIQUE
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    registration_open BOOLEAN NOT NULL DEFAULT FALSE,

    contact_email TEXT,

    contact_phone TEXT,

    website_email TEXT,

    linkedin_url TEXT,

    facebook_url TEXT,

    twitter_url TEXT,

    youtube_url TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);