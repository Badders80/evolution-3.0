-- Migration: Rename 'owners' table to 'syndicators' and update column names
-- This unifies the terminology across the entire application

-- Step 1: Rename the table
ALTER TABLE public.owners RENAME TO syndicators;

-- Step 2: Rename columns to match new terminology
ALTER TABLE public.syndicators 
  RENAME COLUMN owner_confirms_right_to_lease TO syndicator_confirms_right_to_lease;

ALTER TABLE public.syndicators 
  RENAME COLUMN owner_approves_digital_syndication TO syndicator_approves_digital_syndication;

-- Step 3: Update foreign key column in horses table (if needed)
-- Note: The actual column name should stay as is for now since it's a reference
-- We can update it in a separate migration if needed

-- Step 4: Update foreign key column in term_sheets table
-- Note: Keep owner_id as is since it's already in use. 
-- We can rename to syndicator_id in a future migration if needed.

-- Step 5: Update RLS policies to reference new table name
DROP POLICY IF EXISTS "Users can view syndicators" ON public.syndicators;
DROP POLICY IF EXISTS "Admins can insert syndicators" ON public.syndicators;
DROP POLICY IF EXISTS "Admins can update syndicators" ON public.syndicators;
DROP POLICY IF EXISTS "Admins can delete syndicators" ON public.syndicators;

-- Recreate RLS policies with new table name
CREATE POLICY "Users can view syndicators" 
  ON public.syndicators FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admins can insert syndicators" 
  ON public.syndicators FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update syndicators" 
  ON public.syndicators FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete syndicators" 
  ON public.syndicators FOR DELETE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 6: Add comment to table
COMMENT ON TABLE public.syndicators IS 'Horse syndicators who lease horses for digital syndication';
