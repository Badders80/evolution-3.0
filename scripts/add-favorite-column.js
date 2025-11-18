require('dotenv').config({ path: '.env.local' });
const https = require('https');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Error: Missing SUPABASE environment variables in .env.local');
  process.exit(1);
}

async function addFavoriteColumn() {
  console.log('Adding is_favorite column to owners table...');
  
  // Use Supabase REST API to check current schema first
  const checkOptions = {
    hostname: 'coqtijrftaklcwgbnqef.supabase.co',
    path: '/rest/v1/owners?limit=1',
    method: 'GET',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(checkOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        const data = JSON.parse(body);
        if (data.length > 0) {
          console.log('Current columns:', Object.keys(data[0]).join(', '));
          if ('is_favorite' in data[0]) {
            console.log('✅ is_favorite column already exists!');
          } else {
            console.log('⚠️  is_favorite column needs to be added via Supabase dashboard SQL editor:');
            console.log('\nALTER TABLE owners ADD COLUMN is_favorite BOOLEAN DEFAULT false;\n');
          }
        }
        resolve();
      });
    });
    req.on('error', reject);
    req.end();
  });
}

addFavoriteColumn().catch(console.error);
