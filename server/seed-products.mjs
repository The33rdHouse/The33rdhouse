import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const books = [
  // Gate 1 Books
  {
    productId: 'book-gate1-codex',
    slug: 'gate-1-the-threshold-codex',
    title: 'Gate 1: The Threshold - Codex',
    subtitle: 'The Sacred Teachings of Awakening',
    description: 'The complete codex for Gate 1, covering the 12 realms of awakening and initiation into the path.',
    longDescription: 'This comprehensive codex guides you through the first gate of The 33rd House—The Threshold. Explore the 12 realms of awakening, from the Call to Adventure through the Meeting with the Mentor. Each realm includes teachings, practices, and meditations to support your journey.',
    category: 'book',
    type: 'digital',
    price: 2700, // $27
    author: 'Daniel Cruze',
    gateNumber: 1,
    coverImage: '/images/books/gate1-codex.jpg',
    pageCount: 144,
    status: 'active',
    featured: true,
  },
  {
    productId: 'book-gate1-curriculum',
    slug: 'gate-1-curriculum',
    title: 'Gate 1: Curriculum & Practices',
    subtitle: '12 Weeks of Transformation',
    description: 'Week-by-week curriculum for Gate 1 with practices, journal prompts, and integration exercises.',
    longDescription: 'A structured 12-week curriculum taking you deep into Gate 1. Each week focuses on one realm with daily practices, reflection prompts, somatic exercises, and integration work.',
    category: 'course',
    type: 'digital',
    price: 9700, // $97
    author: 'Daniel Cruze',
    gateNumber: 1,
    coverImage: '/images/books/gate1-curriculum.jpg',
    duration: 720, // 12 weeks in minutes
    status: 'active',
    featured: true,
  },
  
  // Gate 2 Books
  {
    productId: 'book-gate2-codex',
    slug: 'gate-2-the-descent-codex',
    title: 'Gate 2: The Descent - Codex',
    subtitle: 'Entering the Underworld',
    description: 'The codex for Gate 2, exploring the 12 realms of shadow work and descent into the unconscious.',
    longDescription: 'Gate 2 takes you into the underworld of your psyche. This codex maps the 12 realms of shadow work, trauma integration, and alchemical transformation through darkness.',
    category: 'book',
    type: 'digital',
    price: 2700,
    author: 'Daniel Cruze',
    gateNumber: 2,
    coverImage: '/images/books/gate2-codex.jpg',
    pageCount: 156,
    status: 'active',
  },
  
  // Gate 3 Books
  {
    productId: 'book-gate3-codex',
    slug: 'gate-3-the-purification-codex',
    title: 'Gate 3: The Purification - Codex',
    subtitle: 'Albedo and the White Work',
    description: 'The codex for Gate 3, covering the 12 realms of purification and spiritual cleansing.',
    longDescription: 'In Gate 3, you emerge from the darkness into purification. This codex guides you through the Albedo stage—the white work of alchemy—covering 12 realms of cleansing, clarity, and renewal.',
    category: 'book',
    type: 'digital',
    price: 2700,
    author: 'Daniel Cruze',
    gateNumber: 3,
    coverImage: '/images/books/gate3-codex.jpg',
    pageCount: 148,
    status: 'active',
  },
  
  // Complete Library Bundle
  {
    productId: 'bundle-complete-library',
    slug: 'complete-33rd-house-library',
    title: 'The Complete 33rd House Library',
    subtitle: 'All 12 Gates + Inner Circle Curriculum',
    description: 'The complete collection of all codexes, curricula, and teachings for the entire 500-year journey.',
    longDescription: 'Gain lifetime access to the complete library: all 12 Gate Codexes, all 12 Curricula, the Inner Circle 48-week program, meditation scripts for all 144 realms, and exclusive bonus materials. This is the complete map of consciousness transformation.',
    category: 'course',
    type: 'digital',
    price: 297000, // $2,970 (discounted from individual prices)
    compareAtPrice: 400000, // $4,000 value
    author: 'Daniel Cruze',
    coverImage: '/images/books/complete-library.jpg',
    status: 'active',
    featured: true,
  },
  
  // Meditation Packs
  {
    productId: 'meditation-gate1',
    slug: 'gate-1-meditation-pack',
    title: 'Gate 1: Guided Meditation Pack',
    subtitle: '12 Realm Meditations',
    description: 'Audio meditations for all 12 realms of Gate 1, professionally recorded and mastered.',
    longDescription: '12 guided meditations (one for each realm of Gate 1) to support your journey through The Threshold. Each meditation is 15-20 minutes and includes somatic practices, breathwork, and visualization.',
    category: 'meditation',
    type: 'digital',
    price: 4700, // $47
    author: 'Daniel Cruze',
    gateNumber: 1,
    coverImage: '/images/books/gate1-meditations.jpg',
    duration: 240, // Total minutes
    status: 'active',
  },
  
  // Chartography Reading
  {
    productId: 'chartography-reading',
    slug: 'chartography-reading',
    title: 'Personal Chartography Reading',
    subtitle: 'Your Cosmic Blueprint Through The 33rd House',
    description: 'A comprehensive natal chart analysis mapping your unique path through the 144 realms.',
    longDescription: 'Receive a detailed chartography reading—your cosmic blueprint mapped through The 33rd House system. Includes planetary placements, gate activations, realm transits, personalized practices, and transit forecasts. Delivered as a 30-40 page PDF within 7-10 days.',
    category: 'reading',
    type: 'digital',
    price: 19700, // $197
    author: 'Daniel Cruze',
    coverImage: '/images/books/chartography.jpg',
    pageCount: 35,
    status: 'active',
    featured: true,
  },
  
  // Physical Merchandise
  {
    productId: 'merch-journal',
    slug: 'sacred-journal',
    title: 'The Sacred Journal',
    subtitle: 'Leather-bound Alchemical Notebook',
    description: 'Premium leather-bound journal for tracking your journey through the realms.',
    longDescription: 'A beautiful leather-bound journal (256 pages) designed specifically for The 33rd House journey. Includes prompts for each gate, space for meditation notes, dream tracking, and alchemical reflections. Gold-embossed with the Rose-Flame Crest.',
    category: 'merchandise',
    type: 'physical',
    price: 6700, // $67
    coverImage: '/images/products/journal.jpg',
    pageCount: 256,
    inventory: 50,
    lowStockThreshold: 10,
    status: 'active',
  },
];

console.log('Seeding products...');

for (const book of books) {
  try {
    await db.execute(`
      INSERT INTO products (
        productId, slug, title, subtitle, description, longDescription,
        category, type, price, compareAtPrice, author, gateNumber,
        coverImage, pageCount, duration, inventory, status, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      book.productId,
      book.slug,
      book.title,
      book.subtitle || null,
      book.description,
      book.longDescription || null,
      book.category,
      book.type,
      book.price,
      book.compareAtPrice || null,
      book.author,
      book.gateNumber || null,
      book.coverImage,
      book.pageCount || null,
      book.duration || null,
      book.inventory || -1,
      book.status,
      book.featured || false,
    ]);
    console.log(`✓ Added: ${book.title}`);
  } catch (error) {
    console.error(`✗ Failed to add ${book.title}:`, error.message);
  }
}

console.log('\nProduct seeding complete!');
await connection.end();
