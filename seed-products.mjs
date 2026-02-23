import { sacredLibraryBooks } from './server/seed-sacred-library.mjs';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedProducts() {
  console.log(`Seeding ${sacredLibraryBooks.length} Sacred Library books...`);
  
  for (const book of sacredLibraryBooks) {
    const query = `
      INSERT INTO products (
        title, slug, description, price, category, 
        "gateNumber", "realmNumber", featured, "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    `;
    
    const values = [
      book.title,
      book.slug,
      book.description,
      book.price,
      book.category,
      book.gateNumber,
      book.realmNumber,
      book.featured || false
    ];
    
    try {
      await pool.query(query, values);
      console.log(`✓ Added: ${book.title}`);
    } catch (error) {
      console.error(`✗ Failed to add ${book.title}:`, error.message);
    }
  }
  
  console.log('\nSeeding complete!');
  await pool.end();
}

seedProducts().catch(console.error);
