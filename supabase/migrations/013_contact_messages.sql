CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    email TEXT NOT NULL,

    phone TEXT,

    subject TEXT NOT NULL,

    message TEXT NOT NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);