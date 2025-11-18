require('dotenv').config({ path: '.env.local' });
const https = require('https');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Error: Missing SUPABASE environment variables in .env.local');
  process.exit(1);
}

// All syndicators from LoveRacing.nz authorised syndicators page
// Using only columns that exist in the owners table: name, contact_person, email, phone
const syndicators = [
  { name: 'Aaron Bidlake Racing & Grassroots Syndicates', contact_person: 'Aaron Bidlake', email: 'aaron@bidlakeracing.co.nz', phone: '027 289 6845' },
  { name: 'Ballymore Racing', contact_person: 'Mike Thompson', email: 'mikethompson@ballymorestables.co.nz', phone: '029 124 6045' },
  { name: 'B.A.X Bloodstock', contact_person: 'Kylie Bax', email: 'baxltd@yahoo.com', phone: '021 557 045' },
  { name: 'Challenge Racehorse Syndications', contact_person: 'Adrian Clark', email: 'adrianclarkbloodstock@xtra.co.nz', phone: '027 495 4264' },
  { name: 'Champagne Racing', contact_person: 'Shane Kennedy & Anna Furlong', email: 'shane@champagneracing.co.nz', phone: '027 433 4342' },
  { name: 'C.W. Cole Racing', contact_person: 'Cody Cole', email: 'ownership@cwcoleracing.co.nz', phone: '021 024 16948' },
  { name: 'Evolution Stables', contact_person: 'Alex Baddeley', email: 'alex@evolutionstables.io', phone: null },
  { name: 'Fortuna Racing', contact_person: 'John Galvin', email: 'john@fortuna-nz.com', phone: '021 921 460' },
  { name: 'Go Racing', contact_person: 'Albert Bosma', email: 'albert@goracing.co.nz', phone: '0508 467224' },
  { name: 'Greene Racing', contact_person: 'David Greene', email: 'contact@greeneracing.co.nz', phone: '021 851 187' },
  { name: 'Inspire Racing', contact_person: 'Matthew Corban', email: 'racing@inspireracing.co.nz', phone: '027 410 5844' },
  { name: 'InToWin Syndication', contact_person: 'Tineke Balcombe', email: 'info@intowin.co.nz', phone: '027 284 4698' },
  { name: 'JC Racing', contact_person: 'Jen Campin', email: 'info@jcracing.fun', phone: '+64 21750921' },
  { name: 'John Bary Racing', contact_person: 'John Bary', email: 'johnbaryracing@gmail.com', phone: '021 405 723' },
  { name: 'Kingmakers', contact_person: 'Leighton Howl', email: 'leighton@kingmakers.co.nz', phone: '+6421702573' },
  { name: 'Logan Racing Stables', contact_person: 'Donna Logan', email: 'donna@loganracing.co.nz', phone: '021 322 222' },
  { name: 'Marsh Racing', contact_person: 'Stephen Marsh', email: 'marshracing@xtra.co.nz', phone: '027 228 8889' },
  { name: 'Millar Racing', contact_person: 'Janelle Millar', email: 'palm.view.racing@gmail.com', phone: '021 706 279' },
  { name: 'Mynott Racing', contact_person: 'Sam Mynott', email: 'sam@mynottracing.co.nz', phone: '021 050 4427' },
  { name: 'Pike Racing', contact_person: 'Tony Pike', email: 'tony.pike@pikeracing.co.nz', phone: '027 287 3002' },
  { name: 'RacehorsesNZ', contact_person: 'Melissa Robinson', email: 'contact@racehorsesnz.com', phone: '0800 733 722' },
  { name: 'Rae Racing', contact_person: 'Kenny Rae', email: 'info.raeracing@gmail.com', phone: '027 486 9937' },
  { name: 'Raptors Thoroughbred', contact_person: 'Gavin Yang', email: 'info@raptors.co.nz', phone: '021 680 869' },
  { name: 'Redcraze Racing', contact_person: 'Andrew Pratt', email: 'andrew.pratt@ppml.co.nz', phone: '027 212 8533' },
  { name: 'Richardson Racing Stables', contact_person: 'Graham Richardson', email: 'richardsonracing@xtra.co.nz', phone: '021 289 9333' },
  { name: 'Ritchie/Murray Racing', contact_person: 'Shaune Ritchie & Colm Murray', email: 'contact@shauneritchieracing.co.nz', phone: '021 404 133' },
  { name: 'Savvy Racing Syndicates', contact_person: 'Keith & Janice McDonald', email: 'keithmcdonald2@hotmail.com', phone: '027 227 2889' },
  { name: 'Sharrock Syndications', contact_person: 'Mike Johnston', email: 'admin@sharrockracing.nz', phone: '021 719 022' },
  { name: 'Slievenamon Bloodstock', contact_person: 'Brian Nally', email: 'omarie@xtra.co.nz', phone: '027 484 1214' },
  { name: 'Social Racing', contact_person: 'Brent Cooper', email: 'brent@hotice.co.nz', phone: '021 599 915' },
  { name: 'Sparta Bloodstock Syndication', contact_person: 'David Browne', email: 'office@spartaracing.com.au', phone: '+61 415 078 787' },
  { name: 'Sport of Kings Syndications', contact_person: 'Deb Kingsland', email: 'debkingsland@yahoo.co.nz', phone: '027 535 3559' },
  { name: 'Stephen Gray Racing', contact_person: 'Stephen Gray', email: 'stephen@stephengrayracing.com', phone: '021 933 183' },
  { name: 'Stellar Syndications', contact_person: 'Carrie Wallis', email: 'carriewallis@hotmail.com', phone: '021 138 0809' },
  { name: 'Te Akau Racing', contact_person: 'Karyn Fenton-Ellis', email: 'karyn@teakauracing.com', phone: '07 825 4701' },
  { name: 'The Flying Mullet Sports Bar', contact_person: 'John Tarrant', email: 'racing@theflyingmullet.co.nz', phone: '021 976 154' },
  { name: 'Timberlee Thoroughbred Syndications', contact_person: 'Lisa Dunbar', email: 'timberlee@xtra.co.nz', phone: '021 942 574' },
  { name: 'Wexford Stables', contact_person: 'Lance O\'Sullivan & Andrew Scott', email: 'wexford@xtra.co.nz', phone: '021 488 884' }
];

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function seedSyndicators() {
  console.log(`Seeding ${syndicators.length} syndicators...`);
  
  // First, check which ones already exist
  const checkOptions = {
    hostname: 'coqtijrftaklcwgbnqef.supabase.co',
    path: '/rest/v1/owners?select=name',
    method: 'GET',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  
  const existing = await makeRequest(checkOptions);
  const existingNames = existing.map(o => o.name);
  console.log(`Found ${existingNames.length} existing syndicators`);
  
  // Filter out duplicates
  const newSyndicators = syndicators.filter(s => !existingNames.includes(s.name));
  console.log(`Will add ${newSyndicators.length} new syndicators`);
  
  if (newSyndicators.length === 0) {
    console.log('All syndicators already exist!');
    return;
  }
  
  // Insert new syndicators
  const insertOptions = {
    hostname: 'coqtijrftaklcwgbnqef.supabase.co',
    path: '/rest/v1/owners',
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  };
  
  const result = await makeRequest(insertOptions, newSyndicators);
  
  if (Array.isArray(result)) {
    console.log(`\n✅ Successfully added ${result.length} syndicators:`);
    result.forEach((s, i) => {
      console.log(`${i + 1}. ${s.name} (${s.contact_person})`);
    });
  } else {
    console.error('Error:', result);
  }
}

seedSyndicators().catch(console.error);
