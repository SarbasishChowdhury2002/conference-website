-- User Roles
CREATE TYPE user_role AS ENUM (
  'admin',
  'committee'
);

-- Conference Status
CREATE TYPE conference_status AS ENUM (
  'draft',
  'published',
  'completed'
);