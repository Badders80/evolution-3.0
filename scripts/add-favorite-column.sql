-- Add is_favorite column to owners table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql

ALTER TABLE owners 
ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT false;

-- Optional: Set some initial favorites for testing
-- UPDATE owners SET is_favorite = true WHERE name IN ('Evolution Stables', 'Te Akau Racing', 'Wexford Stables');
