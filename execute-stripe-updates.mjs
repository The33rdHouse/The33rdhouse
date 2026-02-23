#!/usr/bin/env node
import { readFileSync } from 'fs';
import { db } from './drizzle/db.js';
import { products } from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

// Read CSV and execute updates
const csv = readFileSync('/home/ubuntu/stripe-books-created.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1); // Skip header

console.log(`Updating ${lines.length} books with Stripe IDs...`);

let updated = 0;
for (const line of lines) {
  const [id, title, productId, priceId] = line.split(',');
  
  try {
    await db.update(products)
      .set({ 
        stripeProductId: productId,
        stripePriceId: priceId
      })
      .where(eq(products.id, parseInt(id)));
    
    updated++;
    if (updated % 10 === 0) {
      console.log(`✓ Updated ${updated}/${lines.length} books...`);
    }
  } catch (error) {
    console.error(`✗ Failed to update book ${id} (${title}):`, error.message);
  }
}

console.log(`\n✅ Complete! Updated ${updated}/${lines.length} books with Stripe IDs.`);
process.exit(0);
