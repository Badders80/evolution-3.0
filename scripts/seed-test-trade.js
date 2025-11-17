#!/usr/bin/env node

/**
 * Seed a “First Gear Syndicate” test trade in Supabase.
 *
 * The script is safe to run multiple times – it upserts the supporting
 * entities and only inserts the term sheet if it does not already exist.
 * It also detects whether the owners table has been renamed to
 * "syndicators" so it works pre/post migration 003.
 */

const https = require("https");

const ACCESS_TOKEN = "sbp_7d807f27a2680cea34335d53b884689c2acdecf4";
const PROJECT_REF = "coqtijrftaklcwgbnqef";

const SYNDICATOR = {
  name: "Evolution Stables Ltd",
  contactPerson: "Alex Thompson",
  email: "alex@evolutionstables.co.nz",
  phone: "+64 21 0828 0901",
};

const TRAINER = {
  name: "Stephen Gray",
  email: "stephen.gray@stephengrayracing.com",
  phone: "+64 9 555 1234",
};

const HORSE = {
  horse_name: "First Gear (NZ) 2021",
  microchip_number: "985125000126713",
  life_number: "NZTR-2021-000001",
  sex: "Gelding",
  height_hands: "16.2",
  training_location: "Copper Belt Lodge, 643 Mount Stewart Halcombe Road, Feilding, NZ",
  property_name: "Copper Belt Lodge",
  horse_owner_name: "Evolution Stables Ltd",
};

const RACING_MANAGER = {
  name: "Stephen Gray Racing",
  email: "syndication@stephengrayracing.com",
  phone: "+64 9 555 4321",
};

const TERM_SHEET = {
  syndicate_name: "First Gear Syndicate – Term Sheet",
  lease_type: "Fixed-term tokenised fractional interest",
  lease_start: "2025-07-01",
  lease_end: "2026-06-30",
  lease_duration_months: 12,
  minimum_token_size: 0.5, // percent of Evolution’s 10% leasehold block
  number_of_tokens_available: 20,
  lease_price_per_one_percent: 480,
  token_holder_revenue_share_percent: 80,
  tokinvest_platform_fee_percent: 7,
  evolution_fee_percent: 5,
  token_symbol: "FG25",
  token_network: "Tokinvest Vault",
  custodian: "Tokinvest Custody",
  token_mint_authority: "Evolution Stables Treasury",
  token_transfer_restrictions:
    "Non-transferable during initial 12-month term; Tokinvest may enable peer-to-peer resale later",
};

function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });

    const options = {
      hostname: "api.supabase.com",
      port: 443,
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Length": data.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || "[]"));
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

const literal = (value) => {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? "true" : "false";
  return `'${String(value).replace(/'/g, "''")}'`;
};

async function tableExists(name) {
  const result = await runSQL(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = '${name}'
    ) AS table_exists;
  `);
  return Boolean(result[0]?.table_exists);
}

async function columnExists(table, column) {
  const result = await runSQL(`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = '${table}'
        AND column_name = '${column}'
    ) AS column_exists;
  `);
  return Boolean(result[0]?.column_exists);
}

async function detectSchema() {
  const hasSyndicatorsTable = await tableExists("syndicators");
  const hasOwnersTable = await tableExists("owners");

  const syndicatorTable = hasSyndicatorsTable
    ? "syndicators"
    : "owners";

  if (!hasSyndicatorsTable && !hasOwnersTable) {
    throw new Error("Neither syndicators nor owners table exists");
  }

  const confirmsColumn = (await columnExists(
    syndicatorTable,
    "syndicator_confirms_right_to_lease",
  ))
    ? "syndicator_confirms_right_to_lease"
    : "owner_confirms_right_to_lease";

  const approvesColumn = (await columnExists(
    syndicatorTable,
    "syndicator_approves_digital_syndication",
  ))
    ? "syndicator_approves_digital_syndication"
    : "owner_approves_digital_syndication";

  const termSheetSyndicatorColumn = (await columnExists(
    "term_sheets",
    "syndicator_id",
  ))
    ? "syndicator_id"
    : "owner_id";

  return { syndicatorTable, confirmsColumn, approvesColumn, termSheetSyndicatorColumn };
}

async function ensureSyndicator(schema) {
  const existing = await runSQL(`
    SELECT id FROM ${schema.syndicatorTable}
    WHERE email = ${literal(SYNDICATOR.email)}
    LIMIT 1;
  `);
  if (existing.length > 0) {
    return existing[0].id;
  }

  const columns = [
    "name",
    "contact_person",
    "email",
    "phone",
    schema.confirmsColumn,
    schema.approvesColumn,
  ];
  const values = [
    SYNDICATOR.name,
    SYNDICATOR.contactPerson,
    SYNDICATOR.email,
    SYNDICATOR.phone,
    true,
    true,
  ].map(literal);

  const inserted = await runSQL(`
    INSERT INTO ${schema.syndicatorTable} (${columns.join(", ")})
    VALUES (${values.join(", ")})
    RETURNING id;
  `);
  return inserted[0].id;
}

async function ensureTrainer() {
  const existing = await runSQL(`
    SELECT id FROM trainers
    WHERE name = ${literal(TRAINER.name)}
    LIMIT 1;
  `);
  if (existing.length > 0) return existing[0].id;

  const inserted = await runSQL(`
    INSERT INTO trainers (name, email, phone)
    VALUES (
      ${literal(TRAINER.name)},
      ${literal(TRAINER.email)},
      ${literal(TRAINER.phone)}
    )
    RETURNING id;
  `);
  return inserted[0].id;
}

async function ensureRacingManager() {
  const existing = await runSQL(`
    SELECT id FROM racing_managers
    WHERE name = ${literal(RACING_MANAGER.name)}
    LIMIT 1;
  `);
  if (existing.length > 0) return existing[0].id;

  const inserted = await runSQL(`
    INSERT INTO racing_managers (name, email, phone)
    VALUES (
      ${literal(RACING_MANAGER.name)},
      ${literal(RACING_MANAGER.email)},
      ${literal(RACING_MANAGER.phone)}
    )
    RETURNING id;
  `);
  return inserted[0].id;
}

async function ensureHorse(trainerId) {
  const existing = await runSQL(`
    SELECT id FROM horses
    WHERE microchip_number = ${literal(HORSE.microchip_number)}
    LIMIT 1;
  `);
  if (existing.length > 0) return existing[0].id;

  const columns = [
    "horse_name",
    "microchip_number",
    "life_number",
    "sex",
    "height_hands",
    "training_location",
    "property_name",
    "horse_owner_name",
    "trainer_id",
  ];

  const values = [
    HORSE.horse_name,
    HORSE.microchip_number,
    HORSE.life_number,
    HORSE.sex,
    HORSE.height_hands,
    HORSE.training_location,
    HORSE.property_name,
    HORSE.horse_owner_name,
    trainerId,
  ].map(literal);

  const inserted = await runSQL(`
    INSERT INTO horses (${columns.join(", ")})
    VALUES (${values.join(", ")})
    RETURNING id;
  `);

  return inserted[0].id;
}

async function ensureTermSheet(schema, syndicatorId, horseId, racingManagerId) {
  const existing = await runSQL(`
    SELECT id FROM term_sheets
    WHERE syndicate_name = ${literal(TERM_SHEET.syndicate_name)}
    LIMIT 1;
  `);
  if (existing.length > 0) return existing[0].id;

  const columns = [
    schema.termSheetSyndicatorColumn,
    "horse_id",
    "syndicate_name",
    "lease_type",
    "lease_start",
    "lease_end",
    "lease_duration_months",
    "minimum_token_size",
    "number_of_tokens_available",
    "lease_price_per_one_percent",
    "token_holder_revenue_share_percent",
    "tokinvest_platform_fee_percent",
    "evolution_fee_percent",
    "token_symbol",
    "token_network",
    "custodian",
    "token_mint_authority",
    "token_transfer_restrictions",
    "racing_manager_id",
    "racing_manager_approves_syndication",
    "trainer_confirms_horse_details",
  ];

  const values = [
    syndicatorId,
    horseId,
    TERM_SHEET.syndicate_name,
    TERM_SHEET.lease_type,
    TERM_SHEET.lease_start,
    TERM_SHEET.lease_end,
    TERM_SHEET.lease_duration_months,
    TERM_SHEET.minimum_token_size,
    TERM_SHEET.number_of_tokens_available,
    TERM_SHEET.lease_price_per_one_percent,
    TERM_SHEET.token_holder_revenue_share_percent,
    TERM_SHEET.tokinvest_platform_fee_percent,
    TERM_SHEET.evolution_fee_percent,
    TERM_SHEET.token_symbol,
    TERM_SHEET.token_network,
    TERM_SHEET.custodian,
    TERM_SHEET.token_mint_authority,
    TERM_SHEET.token_transfer_restrictions,
    racingManagerId,
    true,
    true,
  ].map(literal);

  const inserted = await runSQL(`
    INSERT INTO term_sheets (${columns.join(", ")})
    VALUES (${values.join(", ")})
    RETURNING id;
  `);
  return inserted[0].id;
}

async function main() {
  console.log("🚀 Seeding First Gear Syndicate test trade...\n");

  try {
    const schema = await detectSchema();
    console.log(`📚 Using ${schema.syndicatorTable} table with ${schema.termSheetSyndicatorColumn} foreign key.`);

    const syndicatorId = await ensureSyndicator(schema);
    console.log(`👤 Syndicator ready (${syndicatorId}).`);

    const trainerId = await ensureTrainer();
    console.log(`👔 Trainer ready (${trainerId}).`);

    const racingManagerId = await ensureRacingManager();
    console.log(`🏇 Racing Manager ready (${racingManagerId}).`);

    const horseId = await ensureHorse(trainerId);
    console.log(`🐎 Horse ready (${horseId}).`);

    const termSheetId = await ensureTermSheet(
      schema,
      syndicatorId,
      horseId,
      racingManagerId,
    );
    console.log(`📄 Term sheet ready (${termSheetId}).`);

    console.log("\n✅ Test trade seeded successfully!");
    console.log(`   Term sheet ID: ${termSheetId}`);
  } catch (error) {
    console.error("❌ Failed to seed test trade:", error.message);
    process.exit(1);
  }
}

main();
