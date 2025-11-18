/**
 * Seed script to preload syndicators into the database
 * Run with: node scripts/seed-syndicators.js
 */

require('dotenv').config({ path: '.env.local' });
const https = require('https');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: Missing SUPABASE environment variables in .env.local');
  process.exit(1);
}

const syndicators = [
  {
    name: 'Mynott Racing',
    contact_person: 'Sam Mynott',
    email: 'sam@mynottracing.co.nz',
    phone: '021 050 4427',
    owner_confirms_right_to_lease: true,
    owner_approves_digital_syndication: true,
  },
  {
    name: 'Inspire Racing',
    contact_person: 'Matthew Corban',
    email: 'racing@inspireracing.co.nz',
    phone: '027 410 5844',
    owner_confirms_right_to_lease: true,
    owner_approves_digital_syndication: true,
  },
  {
    name: 'B.A.X Bloodstock Achieving Xcellence',
    contact_person: 'Kylie Bax',
    email: 'baxtld@yahoo.com',
    phone: '021 557 045',
    owner_confirms_right_to_lease: true,
    owner_approves_digital_syndication: true,
  },
  {
    name: 'Stephen Gray Racing',
    contact_person: 'Stephen Gray',
    email: 'stephen@stephengrayracing.com',
    phone: '021 933 183',
    owner_confirms_right_to_lease: true,
    owner_approves_digital_syndication: true,
  },
];

function insertSyndicators() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(syndicators);

    const options = {
      hostname: 'evolutionstables.supabase.co',
      port: 443,
      path: '/rest/v1/owners',
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

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Successfully inserted syndicators!');
          console.log(`Status Code: ${res.statusCode}`);
          try {
            const result = JSON.parse(data);
            console.log(`\n📊 Inserted ${result.length} syndicators:`);
            result.forEach((syndicator, index) => {
              console.log(`\n${index + 1}. ${syndicator.name}`);
              console.log(`   ID: ${syndicator.id}`);
              console.log(`   Contact: ${syndicator.contact_person}`);
              console.log(`   Email: ${syndicator.email}`);
              console.log(`   Phone: ${syndicator.phone}`);
            });
          } catch (e) {
            console.log('Response:', data);
          }
          resolve(data);
        } else {
          console.error('❌ Error inserting syndicators');
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
  console.log('🌱 Seeding syndicators into database...\n');
  console.log(`📍 Target: ${SUPABASE_URL}/rest/v1/owners\n`);
  
  try {
    await insertSyndicators();
    console.log('\n✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

main();
