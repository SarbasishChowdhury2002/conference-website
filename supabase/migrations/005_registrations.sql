CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conference_id UUID NOT NULL
        REFERENCES conferences(id)
        ON DELETE CASCADE,

    full_name TEXT NOT NULL,

    email TEXT NOT NULL,

    phone TEXT NOT NULL,

    organization TEXT NOT NULL,

    designation TEXT,

    country TEXT NOT NULL DEFAULT 'India',

    paper_id TEXT NOT NULL,

    paper_title TEXT NOT NULL,

    amount_paid NUMERIC(10,2) NOT NULL,

    transaction_id TEXT NOT NULL,

    payment_date DATE NOT NULL,

    receipt_url TEXT NOT NULL,

    status registration_status NOT NULL DEFAULT 'pending',

    remarks TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE INDEX idx_registrations_status
ON registrations(status);

CREATE INDEX idx_registrations_email
ON registrations(email);

CREATE INDEX idx_registrations_conference
ON registrations(conference_id);

CREATE INDEX idx_registrations_paper
ON registrations(paper_id);
