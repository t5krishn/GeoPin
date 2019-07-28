-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  -- username instead of name
  name TEXT NOT NULL,
  password TEXT NOT NULL
  -- deleted flag instead of dropping user from db
);
