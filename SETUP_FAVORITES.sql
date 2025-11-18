-- Run this SQL in Supabase Dashboard to enable favorites feature
-- https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new

ALTER TABLE owners ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false;

-- Create an index for better performance when sorting by favorites
CREATE INDEX IF NOT EXISTS idx_owners_is_favorite ON owners(is_favorite);
