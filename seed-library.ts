import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { products } from './drizzle/schema';
import { sacredLibraryBooks } from './server/seed-sacred-library.mjs';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { ssl: 'require' });
const db = drizzle(client);

async function seedProducts() {
  console.log('🌟 Seeding Sacred Library with 71 books...\n');
  
  // Clear existing products
  console.log('Clearing existing products...');
  await db.delete(products);
  
  // Insert all 71 books
  let count = 0;
  for (const book of sacredLibraryBooks) {
    await db.insert(products).values({
      title: book.title,
      slug: book.slug,
      description: book.description,
      price: book.price,
      category: book.category,
      gateNumber: book.gateNumber,
      realmNumber: book.realmNumber,
      featured: book.featured || false,
      createdAt: new Date()
    });
    count++;
    console.log(`✓ Added: ${book.title} (Gate ${book.gateNumber})`);
  }
  
  console.log(`\n✨ Successfully seeded ${count} Sacred Library books!`);
  await client.end();
}

seedProducts().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
