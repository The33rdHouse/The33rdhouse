import { readFileSync } from 'fs';
import { createConnection } from 'mysql2/promise';

const SQL_FILE = '/tmp/sync-stripe-ids.sql';

async function syncStripeIds() {
  const connection = await createConnection(process.env.DATABASE_URL);
  
  try {
    const sqlStatements = readFileSync(SQL_FILE, 'utf-8')
      .split('\n')
      .filter(line => line.trim().length > 0);

    console.log(`Executing ${sqlStatements.length} UPDATE statements...`);

    for (let i = 0; i < sqlStatements.length; i++) {
      const sql = sqlStatements[i];
      await connection.execute(sql);
      
      if ((i + 1) % 10 === 0) {
        console.log(`Progress: ${i + 1}/${sqlStatements.length} updates completed`);
      }
    }

    console.log(`\n✅ Successfully synced ${sqlStatements.length} Stripe product IDs!`);

    // Verify the updates
    const [rows] = await connection.execute(
      'SELECT COUNT(*) as count FROM products WHERE stripeProductId IS NOT NULL'
    );
    console.log(`\n📊 Total products with Stripe IDs: ${rows[0].count}`);

  } catch (error) {
    console.error('Error syncing Stripe IDs:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

syncStripeIds().catch(console.error);
