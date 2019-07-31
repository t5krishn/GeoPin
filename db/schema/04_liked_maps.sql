-- Drop and recreate liked_maps table

DROP TABLE IF EXISTS liked_maps CASCADE;
CREATE TABLE liked_maps (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE
);
