import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './server/db/schema';

const gateThemes = {
  1: { theme: "Foundation & Awakening", focus: "initial awareness, grounding, presence" },
  2: { theme: "Emotional Intelligence", focus: "feeling, flow, emotional mastery" },
  3: { theme: "Mental Clarity", focus: "thought, perception, mental discipline" },
  4: { theme: "Heart Opening", focus: "love, compassion, connection" },
  5: { theme: "Expression & Truth", focus: "voice, authenticity, communication" },
  6: { theme: "Intuition & Vision", focus: "insight, foresight, inner knowing" },
  7: { theme: "Higher Consciousness", focus: "transcendence, unity, divine connection" },
  8: { theme: "Integration & Mastery", focus: "embodiment, wholeness, sovereignty" },
  9: { theme: "Service & Purpose", focus: "contribution, legacy, sacred work" },
  10: { theme: "Alchemy & Transformation", focus: "transmutation, rebirth, evolution" },
  11: { theme: "Cosmic Consciousness", focus: "universal mind, infinite awareness" },
  12: { theme: "Divine Union", focus: "completion, return, sacred marriage" }
};

function generateDescription(gate: number, realm: number): string {
  const gateInfo = gateThemes[gate as keyof typeof gateThemes] || gateThemes[1];
  
  const templates = [
    `Explore ${gateInfo.theme.toLowerCase()} through ${gateInfo.focus}. This comprehensive guide takes you deep into Gate ${gate}, Realm ${realm} of The 33rd House system, offering practical exercises and profound insights for consciousness transformation.`,
    
    `A transformative journey through Gate ${gate}, Realm ${realm}. Discover how ${gateInfo.focus} shapes your path to awakening. This book combines ancient wisdom with modern understanding to guide you through ${gateInfo.theme.toLowerCase()}.`,
    
    `Gate ${gate}, Realm ${realm}: ${gateInfo.theme}. Master the principles of ${gateInfo.focus} through structured teachings, meditations, and practices designed to catalyze profound inner transformation.`,
    
    `Navigate the sacred territory of ${gateInfo.theme.toLowerCase()} in this essential guide to Gate ${gate}, Realm ${realm}. Learn to embody ${gateInfo.focus} and integrate these teachings into every aspect of your life.`,
    
    `An in-depth exploration of Gate ${gate}, Realm ${realm} within The 33rd House framework. This book illuminates the path of ${gateInfo.theme.toLowerCase()}, offering tools and wisdom for mastering ${gateInfo.focus}.`
  ];
  
  return templates[(realm - 1) % templates.length];
}

async function main() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  const db = drizzle(connection, { schema, mode: 'default' });
  
  // Get all books
  const books = await connection.query(
    'SELECT id, gateNumber, realmNumber FROM products WHERE category = "book" ORDER BY gateNumber, realmNumber'
  );
  
  const bookList = books[0] as any[];
  console.log(`Found ${bookList.length} books to update`);
  
  // Update each book
  for (const book of bookList) {
    const description = generateDescription(book.gateNumber || 1, book.realmNumber || 1);
    await connection.query(
      'UPDATE products SET description = ? WHERE id = ?',
      [description, book.id]
    );
  }
  
  console.log(`✅ Updated ${bookList.length} book descriptions`);
  await connection.end();
}

main().catch(console.error);
