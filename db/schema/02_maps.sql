-- Drop and recreate Maps table

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  pin_count INTEGER NOT NULL DEFAULT(0),
  deleted BOOLEAN NOT NULL DEFAULT (FALSE),
  created_at TIMESTAMP,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
