-- Add contact_person column to owners table
-- This migration adds the missing contact_person field

ALTER TABLE owners 
ADD COLUMN IF NOT EXISTS contact_person text NOT NULL DEFAULT '';

-- Remove the default after adding the column
ALTER TABLE owners 
ALTER COLUMN contact_person DROP DEFAULT;
