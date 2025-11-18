# Owners → Syndicators Unification Complete

## Summary
Successfully unified the terminology from "owners" to "syndicators" across the entire Evolution Stables codebase.

## Changes Made

### 1. ✅ Folder Structure
- **Renamed:** `src/app/engine/owners/` → `src/app/engine/syndicators/`
- **Renamed:** `src/services/owners.ts` → `src/services/syndicators.ts`

### 2. ✅ Service Layer (`src/services/syndicators.ts`)
- Renamed all functions:
  - `createOwner()` → `createSyndicator()`
  - `getOwnerById()` → `getSyndicatorById()`
  - `listOwners()` → `listSyndicators()`
- Updated type exports:
  - `OwnerRow` → `SyndicatorRow`
  - `OwnerInsert` → `SyndicatorInsert`
  - `OwnerUpdate` → `SyndicatorUpdate`
- Updated function parameters:
  - `ownerConfirmsRightToLease` → `syndicatorConfirmsRightToLease`
  - `ownerApprovesDigitalSyndication` → `syndicatorApprovesDigitalSyndication`
- **Updated table references:** `.from('owners')` → `.from('syndicators')`
- **Updated column names:**
  - `owner_confirms_right_to_lease` → `syndicator_confirms_right_to_lease`
  - `owner_approves_digital_syndication` → `syndicator_approves_digital_syndication`

### 3. ✅ Engine Pages (Wizard Flow)
**`src/app/engine/syndicators/profile/create/page.tsx`:**
- Component renamed: `CreateOwnerProfilePage` → `CreateSyndicatorProfilePage`
- Import updated: `@/services/owners` → `@/services/syndicators`
- Function calls: `createOwner()` → `createSyndicator()`
- State fields: `ownerConfirms*` → `syndicatorConfirms*`
- Redirect path: `/engine/horses/profile/create?ownerId=` → `?syndicatorId=`

**`src/app/engine/horses/profile/create/page.tsx`:**
- Query param: `ownerId` → `syndicatorId`
- Form field: `horseOwnerName` → `horseSyndicatorName`
- Label: "Registered Owner Name" → "Registered Syndicator Name"
- Redirect path: `/engine/owners/term-sheet/lease?ownerId=` → `/engine/syndicators/term-sheet/lease?syndicatorId=`

**`src/app/engine/syndicators/term-sheet/lease/page.tsx`:**
- Query param: `ownerId` → `syndicatorId`
- Error message: "requires an owner" → "requires a syndicator"
- Redirect path: `/engine/owners/profile/create` → `/engine/syndicators/profile/create`
- Next step redirect: `/engine/owners/term-sheet/authority?ownerId=` → `/engine/syndicators/term-sheet/authority?syndicatorId=`

**`src/app/engine/syndicators/term-sheet/authority/page.tsx`:**
- Query param: `ownerId` → `syndicatorId`
- Redirect: `/engine/owners/term-sheet/review?ownerId=` → `/engine/syndicators/term-sheet/review?syndicatorId=`

**`src/app/engine/syndicators/term-sheet/review/page.tsx`:**
- Import: `getOwnerById` → `getSyndicatorById` from `@/services/syndicators`
- Query param: `ownerId` → `syndicatorId`
- State variable: `owner` → `syndicator`
- Function calls: `getOwnerById()` → `getSyndicatorById()`
- Error messages: "Missing owner ID" → "Missing syndicator ID"
- Section header: Already says "Syndicator" ✅
- Display: `owner.name` → `syndicator.name`
- createTermSheet: `ownerId` parameter now receives `syndicatorId` value

### 4. ✅ Horses Service (`src/services/horses.ts`)
- Input parameter: `horseOwnerName` → `horseSyndicatorName`
- Database column stays as: `horse_owner_name` (for now - matches NZTR terminology)

### 5. ✅ Admin Pages
**`src/app/admin/syndicators/page.tsx`:**
- Table query: `.from('owners')` → `.from('syndicators')`
- Redirect link: `/engine/owners/profile/create` → `/engine/syndicators/profile/create`

**`src/app/admin/syndicators/[id]/page.tsx`:**
- Table query: `.from('owners')` → `.from('syndicators')`
- Column references:
  - `owner_confirms_right_to_lease` → `syndicator_confirms_right_to_lease`
  - `owner_approves_digital_syndication` → `syndicator_approves_digital_syndication`

**`src/app/admin/term-sheets/page.tsx`:**
- Query: `.from('owners')` → `.from('syndicators')`
- Variable name: `ownerResult` → `syndicatorResult`
- Variable name: `ownerName` → `syndicatorName`
- Display: `{ts.ownerName}` → `{ts.syndicatorName}`

**`src/app/admin/term-sheets/[id]/page.tsx`:**
- Import: `getOwnerById` → `getSyndicatorById` from `@/services/syndicators`
- Variable: `owner` → `syndicator`
- Display: `owner?.name` → `syndicator?.name`

**`src/app/admin/page.tsx`:**
- Query: `.from('owners')` → `.from('syndicators')`
- Variable: `ownersResult` → `syndicatorsResult`
- Variable: `owners` → `syndicators`
- Stats: `ownersCount` → `syndicatorsCount`

### 6. ✅ Database Migration Created
**File:** `supabase/migrations/rename_owners_to_syndicators.sql`

The migration performs:
- Renames table: `owners` → `syndicators`
- Renames columns:
  - `owner_confirms_right_to_lease` → `syndicator_confirms_right_to_lease`
  - `owner_approves_digital_syndication` → `syndicator_approves_digital_syndication`
- Updates RLS policies to reference new table name
- Adds table comment

## Next Steps Required

### Step 1: Run Database Migration
You need to execute the migration SQL in your Supabase dashboard:

1. Go to: https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql
2. Open the SQL Editor
3. Copy the contents of `supabase/migrations/rename_owners_to_syndicators.sql`
4. Paste and execute

**OR** use psql:
```bash
# If you have direct database access
psql "postgresql://postgres:[YOUR_PASSWORD]@db.coqtijrftaklcwgbnqef.supabase.co:5432/postgres" < supabase/migrations/rename_owners_to_syndicators.sql
```

### Step 2: Regenerate TypeScript Types
After the migration runs successfully:

```bash
npx supabase gen types typescript --project-id coqtijrftaklcwgbnqef > src/lib/supabase.types.ts
```

This will update the generated types to reflect:
- New table name: `syndicators` instead of `owners`
- New column names: `syndicator_confirms_*` instead of `owner_confirms_*`

### Step 3: Verify Everything Works
```bash
npm run dev
```

Test the complete wizard flow:
1. Create Syndicator Profile → `/engine/syndicators/profile/create`
2. Create Horse Profile → should receive `syndicatorId` query param
3. Lease Details → should pass `syndicatorId` correctly
4. Authority Checks → should maintain `syndicatorId`
5. Review → should load syndicator data correctly
6. Admin pages should display syndicators correctly

## Files Changed

### Created:
- `supabase/migrations/rename_owners_to_syndicators.sql`
- `scripts/migrate-rename-owners.js` (helper - optional)
- `OWNERS_TO_SYNDICATORS_UNIFICATION.md` (this file)

### Renamed:
- `src/services/owners.ts` → `src/services/syndicators.ts`
- `src/app/engine/owners/` → `src/app/engine/syndicators/`

### Modified (20+ files):
- `src/services/syndicators.ts`
- `src/services/horses.ts`
- `src/app/engine/syndicators/profile/create/page.tsx`
- `src/app/engine/horses/profile/create/page.tsx`
- `src/app/engine/syndicators/term-sheet/lease/page.tsx`
- `src/app/engine/syndicators/term-sheet/authority/page.tsx`
- `src/app/engine/syndicators/term-sheet/review/page.tsx`
- `src/app/admin/syndicators/page.tsx`
- `src/app/admin/syndicators/[id]/page.tsx`
- `src/app/admin/term-sheets/page.tsx`
- `src/app/admin/term-sheets/[id]/page.tsx`
- `src/app/admin/page.tsx`

## Benefits of This Unification

✅ **Consistent Terminology:** "Syndicator" used everywhere - no more confusion
✅ **Better Type Safety:** Generated types will now match actual usage
✅ **Clearer Intent:** Business language matches technical implementation
✅ **Easier Onboarding:** New developers won't be confused by dual terminology
✅ **Correct Data Linking:** Horse → Syndicator relationship now clear
✅ **Professional Appearance:** Consistent branding in UI

## Breaking Changes

⚠️ **Important:** The migration will rename the database table and columns. Any existing queries directly referencing the old names will break until types are regenerated.

**What's preserved:**
- All existing data remains intact
- Foreign key relationships maintained (column `owner_id` in other tables still works)
- is_favorite column stays as is

**What needs updating after migration:**
- TypeScript types (`npm run types` or manual generation)
- Any external integrations querying the `owners` table directly

## Rollback Plan (if needed)

If you need to revert:

```sql
-- Rollback migration
ALTER TABLE public.syndicators RENAME TO owners;
ALTER TABLE public.owners RENAME COLUMN syndicator_confirms_right_to_lease TO owner_confirms_right_to_lease;
ALTER TABLE public.owners RENAME COLUMN syndicator_approves_digital_syndication TO owner_approves_digital_syndication;

-- Update RLS policies back
DROP POLICY IF EXISTS "Users can view syndicators" ON public.owners;
-- ... (recreate old policies)
```

Then revert code changes using git:
```bash
git checkout HEAD~1 -- src/services/ src/app/engine/ src/app/admin/
```

---

**Date:** January 2025
**Issue:** Terminology inconsistency causing type mismatches and confusion
**Solution:** Complete unification to "syndicator" across all layers
**Status:** ✅ Code changes complete | ⏳ Database migration pending | ⏳ Type regeneration pending
