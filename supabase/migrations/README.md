# Evolution Engine Database Schema

This directory contains Supabase migration files for the Evolution Engine.

## Tables

### 1. `owners`
Owner profile, contact details, and compliance declarations.

**Key fields:**
- `name`, `email`, `phone`
- `owner_confirms_right_to_lease`
- `owner_approves_digital_syndication`

### 2. `trainers`
Trainer registry (placeholder for future expansion).

### 3. `racing_managers`
Racing manager registry (placeholder for future expansion).

### 4. `horses`
Horse identity and NZTR compliance details.

**Key fields:**
- `horse_name`, `microchip_number`, `life_number`
- `sex`, `height_hands`
- `trainer_id` (FK to trainers)
- `training_location`, `property_name`

### 5. `term_sheets` (SSOK - Single Source of Knowledge)
The core table linking owners, horses, and lease economics.

**Contains:**
- Lease details (dates, duration, pricing)
- Token economics (supply, fees, revenue share)
- Tokenisation metadata (symbol, network, custodian)
- Authority checks (racing manager, trainer confirmations)

## Relationships

```
owner ---< term_sheets >--- horse
horse ---< term_sheets
trainer ---< horses
racing_manager ---< term_sheets
```

## Running Migrations

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Navigate to SQL Editor
3. Copy contents of `001_create_engine_tables.sql`
4. Execute

### Option 2: Supabase CLI (if installed)
```bash
supabase db push
```

## Features

- ✅ UUID primary keys
- ✅ Automatic timestamps (`created_at`, `updated_at`)
- ✅ Foreign key constraints
- ✅ Unique constraints on critical fields
- ✅ Indexes for common queries
- ✅ Row Level Security enabled (policies to be configured)
- ✅ Auto-updating `updated_at` triggers

## Next Steps

After running migrations:
1. Configure RLS policies for auth
2. Test with sample data
3. Connect to frontend forms
4. Build service layer functions
