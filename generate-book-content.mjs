#!/usr/bin/env node

/**
 * Generate unique book descriptions for The 33rd House library
 * Maps books to gate/realm structure with thematic content
 */

import Database from 'better-sqlite3';

const db = new Database(process.env.DATABASE_URL?.replace('file:', '') || './data.db');

// Get all books
const books = db.prepare(`
  SELECT id, title, gateNumber, realmNumber, category 
  FROM products 
  WHERE category = 'book' 
  ORDER BY gateNumber, realmNumber
`).all();

console.log(`Found ${books.length} books to update`);

// Gate themes (1-12)
const gateThemes = {
  1: { theme: "Foundation & Awakening", focus: "Initial awareness, grounding, presence" },
  2: { theme: "Emotional Intelligence", focus: "Feeling, flow, emotional mastery" },
  3: { theme: "Mental Clarity", focus: "Thought, perception, mental discipline" },
  4: { theme: "Heart Opening", focus: "Love, compassion, connection" },
  5: { theme: "Expression & Truth", focus: "Voice, authenticity, communication" },
  6: { theme: "Intuition & Vision", focus: "Insight, foresight, inner knowing" },
  7: { theme: "Higher Consciousness", focus: "Transcendence, unity, divine connection" },
  8: { theme: "Integration & Mastery", focus: "Embodiment, wholeness, sovereignty" },
  9: { theme: "Service & Purpose", focus: "Contribution, legacy, sacred work" },
  10: { theme: "Alchemy & Transformation", focus: "Transmutation, rebirth, evolution" },
  11: { theme: "Cosmic Consciousness", focus: "Universal mind, infinite awareness" },
  12: { theme: "Divine Union", focus: "Completion, return, sacred marriage" }
};

// Generate description based on gate/realm
function generateDescription(book) {
  const gate = book.gateNumber || 1;
  const realm = book.realmNumber || 1;
  const gateInfo = gateThemes[gate] || gateThemes[1];
  
  const descriptions = [
    `Explore ${gateInfo.theme.toLowerCase()} through the lens of ${gateInfo.focus}. This comprehensive guide takes you deep into Gate ${gate}, Realm ${realm} of The 33rd House system, offering practical exercises and profound insights for consciousness transformation.`,
    
    `A transformative journey through Gate ${gate}, Realm ${realm}. Discover how ${gateInfo.focus} shapes your path to awakening. This book combines ancient wisdom with modern understanding to guide you through ${gateInfo.theme.toLowerCase()}.`,
    
    `Gate ${gate}, Realm ${realm}: ${gateInfo.theme}. Master the principles of ${gateInfo.focus} through structured teachings, meditations, and practices designed to catalyze profound inner transformation and lasting change.`,
    
    `Navigate the sacred territory of ${gateInfo.theme.toLowerCase()} in this essential guide to Gate ${gate}, Realm ${realm}. Learn to embody ${gateInfo.focus} and integrate these teachings into every aspect of your life and consciousness.`,
    
    `An in-depth exploration of Gate ${gate}, Realm ${realm} within The 33rd House framework. This book illuminates the path of ${gateInfo.theme.toLowerCase()}, offering tools and wisdom for mastering ${gateInfo.focus}.`
  ];
  
  // Use realm number to select description variant
  const descIndex = (realm - 1) % descriptions.length;
  return descriptions[descIndex];
}

// Update each book
const updateStmt = db.prepare(`
  UPDATE products 
  SET description = ? 
  WHERE id = ?
`);

let updated = 0;
for (const book of books) {
  const description = generateDescription(book);
  updateStmt.run(description, book.id);
  updated++;
  
  if (updated % 10 === 0) {
    console.log(`Updated ${updated}/${books.length} books...`);
  }
}

console.log(`✅ Successfully updated ${updated} book descriptions`);

db.close();
