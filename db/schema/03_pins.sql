-- Drop and recreate Pins table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  description TEXT,
  longitude FLOAT NOT NULL,
  latitude FLOAT NOT NULL,
  pin_thumbnail_url TEXT NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT (FALSE),
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
