-- Add contact_person column to owners table
-- Run this in VS Code using Ctrl+E (Inline SQL Editor Panel)

ALTER TABLE owners 
ADD COLUMN IF NOT EXISTS contact_person text NOT NULL DEFAULT '';

-- Remove the default after adding the column
ALTER TABLE owners 
ALTER COLUMN contact_person DROP DEFAULT;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'owners' 
ORDER BY ordinal_position;
