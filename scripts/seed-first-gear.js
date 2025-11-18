/**
 * Seed script to add First Gear horse
 * Run with: node scripts/seed-first-gear.js
 */

require('dotenv').config({ path: '.env.local' });
const https = require('https');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: Missing SUPABASE environment variables in .env.local');
  process.exit(1);
}

// Get Stephen Gray Racing syndicator ID
function getStephenGrayId() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evolutionstables.supabase.co',
      port: 443,
      path: '/rest/v1/owners?name=eq.Stephen%20Gray%20Racing&select=id',
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const result = JSON.parse(data);
          if (result.length > 0) {
            resolve(result[0].id);
          } else {
            reject(new Error('Stephen Gray Racing not found'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function insertHorse(ownerId) {
  return new Promise((resolve, reject) => {
    const horse = {
      horse_name: 'First Gear',
      microchip_number: '985125000126713',
      life_number: 'NZ00428364',
      sex: 'Gelding',
      height_hands: null,
      training_location: 'Copper Belt Lodge, Palmerston North',
      property_name: 'Evolution Stables',
      horse_owner_name: 'J Angus, A & C Bary, R Boyd, C Shaw-Boyd, Evolution Stables, R Fleetwood, Haydee Syndicate, D Kainey, D Lake, G McLeod, K Ovens, C Tan, The Mcinteer Family Trust, A Vigar & B Williams',
      trainer_id: null,
    };

    const postData = JSON.stringify([horse]);

    const options = {
      hostname: 'evolutionstables.supabase.co',
      port: 443,
      path: '/rest/v1/horses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Successfully inserted First Gear!');
          console.log(`Status Code: ${res.statusCode}`);
          try {
            const result = JSON.parse(data);
            console.log(`\n📊 Horse Details:`);
            console.log(`   ID: ${result[0].id}`);
            console.log(`   Name: ${result[0].horse_name}`);
            console.log(`   Microchip: ${result[0].microchip_number}`);
            console.log(`   Life Number: ${result[0].life_number}`);
            console.log(`   Trainer: ${result[0].trainer_name}`);
            console.log(`   Location: ${result[0].training_location}`);
          } catch (e) {
            console.log('Response:', data);
          }
          resolve(data);
        } else {
          console.error('❌ Error inserting horse');
          console.error(`Status Code: ${res.statusCode}`);
          console.error('Response:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🐴 Seeding First Gear into database...\n');
  
  try {
    console.log('🔍 Finding Stephen Gray Racing syndicator...');
    const ownerId = await getStephenGrayId();
    console.log(`✅ Found syndicator ID: ${ownerId}\n`);
    
    console.log('📝 Inserting First Gear...');
    await insertHorse(ownerId);
    
    console.log('\n✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

main();
