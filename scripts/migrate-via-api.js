#!/usr/bin/env node

/**
 * Automated SQL Migration via Supabase Management API
 * Uses your access token to run SQL directly
 */

const https = require('https');

const ACCESS_TOKEN = 'sbp_7d807f27a2680cea34335d53b884689c2acdecf4';
const PROJECT_REF = 'coqtijrftaklcwgbnqef';

const migration = `
ALTER TABLE owners 
ADD COLUMN IF NOT EXISTS contact_person text NOT NULL DEFAULT '';

ALTER TABLE owners 
ALTER COLUMN contact_person DROP DEFAULT;
`;

function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });

    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, body: JSON.parse(body || '{}') });
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('🚀 Running database migration via Supabase API...\n');
  console.log('📝 SQL to execute:\n');
  console.log(migration);
  console.log('\n⏳ Executing...\n');

  try {
    const result = await runSQL(migration);
    console.log('✅ Migration completed successfully!');
    console.log('\n📊 Response:', JSON.stringify(result.body, null, 2));
    console.log('\n🎉 Done! The contact_person column has been added to the owners table.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n📋 Please run this SQL manually in Supabase Dashboard:');
    console.log(`https://supabase.com/dashboard/project/${PROJECT_REF}/sql\n`);
    console.log(migration);
    process.exit(1);
  }
}

main();
