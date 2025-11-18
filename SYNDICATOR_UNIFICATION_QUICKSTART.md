# QUICK START: Complete the Syndicator Unification

## ✅ What's Done
- All code updated: folders renamed, services updated, routes fixed
- Migration SQL created and ready to run
- 20+ files updated with consistent "syndicator" terminology

## ⏳ What You Need to Do (2 minutes)

### Step 1: Run the Database Migration
Go to your Supabase SQL Editor and execute the migration:

**URL:** https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql/new

**Copy & paste this entire SQL:**
```sql
-- Migration: Rename 'owners' to 'syndicators'
ALTER TABLE public.owners RENAME TO syndicators;

ALTER TABLE public.syndicators 
  RENAME COLUMN owner_confirms_right_to_lease TO syndicator_confirms_right_to_lease;

ALTER TABLE public.syndicators 
  RENAME COLUMN owner_approves_digital_syndication TO syndicator_approves_digital_syndication;

-- Update RLS policies
DROP POLICY IF EXISTS "Users can view syndicators" ON public.syndicators;
DROP POLICY IF EXISTS "Admins can insert syndicators" ON public.syndicators;
DROP POLICY IF EXISTS "Admins can update syndicators" ON public.syndicators;
DROP POLICY IF EXISTS "Admins can delete syndicators" ON public.syndicators;

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

COMMENT ON TABLE public.syndicators IS 'Horse syndicators who lease horses for digital syndication';
```

**Click:** RUN ▶️

### Step 2: Regenerate TypeScript Types
In your terminal:
```bash
npx supabase gen types typescript --project-id coqtijrftaklcwgbnqef > src/lib/supabase.types.ts
```

### Step 3: Test It
```bash
npm run dev
```

Visit: http://localhost:3000/engine/syndicators/profile/create

Test the full wizard flow:
1. Create Syndicator Profile
2. Create Horse Profile  
3. Lease Details
4. Authority Checks
5. Review

Check admin pages:
- http://localhost:3000/admin/syndicators
- http://localhost:3000/admin/term-sheets

## ✅ Expected Results
- No TypeScript errors
- Wizard flows smoothly with `syndicatorId` query params
- Admin pages show "Syndicators" correctly
- Database queries work with new table name
- All data preserved from previous `owners` table

## 🚨 If Something Breaks
See `OWNERS_TO_SYNDICATORS_UNIFICATION.md` for:
- Complete list of changes
- Rollback instructions
- Detailed verification steps

---

**That's it!** Two commands and you're unified. 🎉
