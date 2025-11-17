#!/usr/bin/env node

/**
 * Automated SQL Migration Runner
 * Runs migrations directly via Supabase REST API
 */

const fs = require('fs');
const path = require('path');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

async function runSQL(sql) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    // Try alternative method using the PostgREST API
    const altResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        query: sql
      })
    });
    
    if (!altResponse.ok) {
      throw new Error(`SQL execution failed: ${response.status} ${response.statusText}`);
    }
    return altResponse.json();
  }

  return response.json();
}

async function runMigration() {
  console.log('🚀 Running database migration...\n');

  const migration = `
-- Add contact_person column to owners table
ALTER TABLE owners 
ADD COLUMN IF NOT EXISTS contact_person text NOT NULL DEFAULT '';

-- Remove the default after adding the column  
ALTER TABLE owners 
ALTER COLUMN contact_person DROP DEFAULT;
  `.trim();

  try {
    console.log('📝 Executing SQL:\n');
    console.log(migration);
    console.log('\n⏳ Running migration...');

    await runSQL(migration);

    console.log('\n✅ Migration completed successfully!');
    console.log('\n🔍 Verifying schema...');

    // Verify the column was added
    const verifySQL = `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'owners' 
      ORDER BY ordinal_position;
    `;

    const result = await runSQL(verifySQL);
    console.log('\n📊 Current owners table schema:');
    console.log(result);

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n💡 Falling back to direct connection method...\n');
    
    // Fallback: Use node-postgres to connect directly
    await runMigrationDirectly();
  }
}

async function runMigrationDirectly() {
  console.log('📦 Installing postgres client...');
  
  const { execSync } = require('child_process');
  try {
    execSync('npm list pg', { stdio: 'ignore' });
  } catch {
    execSync('npm install --no-save pg', { stdio: 'inherit' });
  }

  const { Client } = require('pg');

  const connectionString = `postgresql://postgres.coqtijrftaklcwgbnqef:[YOUR-PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres`;

  console.log('\n🔌 Connecting to database...');

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    const migration = `
      ALTER TABLE owners 
      ADD COLUMN IF NOT EXISTS contact_person text NOT NULL DEFAULT '';

      ALTER TABLE owners 
      ALTER COLUMN contact_person DROP DEFAULT;
    `;

    console.log('📝 Executing migration...');
    await client.query(migration);
    console.log('✅ Migration completed successfully!');

    // Verify
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'owners' 
      ORDER BY ordinal_position;
    `);

    console.log('\n📊 Owners table schema:');
    console.table(result.rows);

  } catch (error) {
    console.error('❌ Direct connection failed:', error.message);
    console.log('\n📋 Please run this SQL manually in Supabase Dashboard:');
    console.log('https://supabase.com/dashboard/project/coqtijrftaklcwgbnqef/sql\n');
    console.log(`
ALTER TABLE owners 
ADD COLUMN IF NOT EXISTS contact_person text NOT NULL DEFAULT '';

ALTER TABLE owners 
ALTER COLUMN contact_person DROP DEFAULT;
    `);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the migration
runMigration().catch(console.error);
