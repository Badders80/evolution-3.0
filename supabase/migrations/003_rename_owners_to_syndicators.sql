-- 003_rename_owners_to_syndicators.sql
-- Rename owners table to syndicators and update term_sheets.owner_id to syndicator_id

-- 1) Rename owners → syndicators
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'owners'
  ) THEN
    ALTER TABLE public.owners RENAME TO syndicators;
  END IF;
END$$;

-- 2) Add contact_person column (if missing)
ALTER TABLE public.syndicators
ADD COLUMN IF NOT EXISTS contact_person text;

-- 3) Rename any "owner_*" declaration columns → "syndicator_*" (if they exist)

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'syndicators'
      AND column_name = 'owner_confirms_right_to_lease'
  ) THEN
    ALTER TABLE public.syndicators
      RENAME COLUMN owner_confirms_right_to_lease
      TO syndicator_confirms_right_to_lease;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'syndicators'
      AND column_name = 'owner_approves_digital_syndication'
  ) THEN
    ALTER TABLE public.syndicators
      RENAME COLUMN owner_approves_digital_syndication
      TO syndicator_approves_digital_syndication;
  END IF;
END$$;

-- 4) Update term_sheets.owner_id → term_sheets.syndicator_id

-- Drop old FK if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'term_sheets'
      AND constraint_type = 'FOREIGN KEY'
      AND constraint_name = 'term_sheets_owner_id_fkey'
  ) THEN
    ALTER TABLE public.term_sheets
      DROP CONSTRAINT term_sheets_owner_id_fkey;
  END IF;
END$$;

-- Rename column
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'term_sheets'
      AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE public.term_sheets
      RENAME COLUMN owner_id TO syndicator_id;
  END IF;
END$$;

-- Recreate FK to syndicators
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE table_schema = 'public'
      AND table_name = 'term_sheets'
      AND constraint_name = 'term_sheets_syndicator_id_fkey'
  ) THEN
    ALTER TABLE public.term_sheets
      ADD CONSTRAINT term_sheets_syndicator_id_fkey
      FOREIGN KEY (syndicator_id)
      REFERENCES public.syndicators (id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
  END IF;
END$$;
