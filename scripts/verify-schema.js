#!/usr/bin/env node

/**
 * Verify database schema
 */

const https = require('https');

const ACCESS_TOKEN = 'sbp_7d807f27a2680cea34335d53b884689c2acdecf4';
const PROJECT_REF = 'coqtijrftaklcwgbnqef';

const verifySQL = `
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'owners' 
ORDER BY ordinal_position;
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
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '[]'));
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
  console.log('🔍 Verifying owners table schema...\n');

  try {
    const result = await runSQL(verifySQL);
    console.log('📊 Owners table columns:\n');
    console.table(result);
    
    const hasContactPerson = result.some(col => col.column_name === 'contact_person');
    if (hasContactPerson) {
      console.log('\n✅ contact_person column exists!');
      console.log('🎉 Your form should now work correctly.');
    } else {
      console.log('\n❌ contact_person column NOT found');
    }
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

main();
