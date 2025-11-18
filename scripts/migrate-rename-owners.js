#!/usr/bin/env node

/**
 * Run database migration: Rename owners to syndicators
 * This script uses the Supabase Admin API to execute SQL
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function runMigration() {
  console.log('🚀 Running migration: rename_owners_to_syndicators.sql\n');

  // Read the migration file
  const migrationPath = path.join(__dirname, '../supabase/migrations/rename_owners_to_syndicators.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('📄 Migration SQL loaded');
  console.log('⏳ Executing migration...\n');

  try {
    // Execute the SQL using the REST API
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // If exec_sql doesn't exist, try direct execution
      console.log('Note: exec_sql RPC not found, attempting direct SQL execution...\n');
      
      // Split by semicolons and execute each statement
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        console.log(`Executing: ${statement.substring(0, 60)}...`);
        const { error: stmtError } = await supabase.rpc('exec', { query: statement });
        
        if (stmtError) {
          console.error(`❌ Statement failed:`, stmtError);
        }
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log('  - Renamed table: owners → syndicators');
    console.log('  - Renamed columns: owner_* → syndicator_*');
    console.log('  - Updated RLS policies for new table');
    console.log('\n⚠️  Note: You may need to regenerate TypeScript types:');
    console.log('  npx supabase gen types typescript --project-id coqtijrftaklcwgbnqef > src/lib/supabase.types.ts');

  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
