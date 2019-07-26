-- Drop and recreate Pins table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  longitude FLOAT NOT NULL,
  latitude FLOAT NOT NULL,
  pin_thumbnail_url TEXT NOT NULL,
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE
);
