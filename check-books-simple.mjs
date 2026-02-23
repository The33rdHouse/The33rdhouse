import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

const books = await sql`
  SELECT id, "productId", title, author, "coverImage"
  FROM products 
  WHERE category = 'book'
  ORDER BY title
`;

console.log(`\n=== BOOK COVER AUDIT (${books.length} books) ===\n`);

let missing = [];
let has = [];

books.forEach(book => {
  if (!book.coverImage || book.coverImage.trim() === '') {
    missing.push(book);
  } else {
    has.push(book);
  }
});

console.log(`MISSING COVERS (${missing.length}):\n`);
missing.forEach((book, idx) => {
  console.log(`${idx + 1}. ${book.title}`);
  console.log(`   ID: ${book.productId}`);
  console.log(`   Author: ${book.author || 'Unknown'}\n`);
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total: ${books.length}`);
console.log(`With covers: ${has.length}`);
console.log(`Missing: ${missing.length}`);

await sql.end();
