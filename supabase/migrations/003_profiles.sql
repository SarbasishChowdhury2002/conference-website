CREATE TABLE profiles (
    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    full_name TEXT NOT NULL,

    role user_role NOT NULL,

    designation TEXT,

    organization TEXT,

    phone TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



CREATE INDEX idx_profiles_role
ON profiles(role);

CREATE INDEX idx_profiles_active
ON profiles(is_active);