import { readFileSync } from 'fs';
import postgres from 'postgres';

const SQL_FILE = '/tmp/sync-stripe-ids.sql';

async function syncStripeIds() {
  const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  if (!databaseUrl) throw new Error('No DATABASE_URL or NETLIFY_DATABASE_URL set');

  const sql = postgres(databaseUrl);

  try {
    const sqlStatements = readFileSync(SQL_FILE, 'utf-8')
      .split('\n')
      .filter(line => line.trim().length > 0);

    console.log(`Executing ${sqlStatements.length} UPDATE statements...`);

    for (let i = 0; i < sqlStatements.length; i++) {
      const stmt = sqlStatements[i];
      await sql.unsafe(stmt);

      if ((i + 1) % 10 === 0) {
        console.log(`Progress: ${i + 1}/${sqlStatements.length} updates completed`);
      }
    }

    console.log(`\nSuccessfully synced ${sqlStatements.length} Stripe product IDs!`);

    // Verify the updates
    const rows = await sql`SELECT COUNT(*) as count FROM products WHERE "stripeProductId" IS NOT NULL`;
    console.log(`\nTotal products with Stripe IDs: ${rows[0].count}`);

  } catch (error) {
    console.error('Error syncing Stripe IDs:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

syncStripeIds().catch(console.error);
