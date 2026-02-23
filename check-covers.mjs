import { getDb } from './server/db.js';

const db = await getDb();

const books = await db.select({
  id: 'id',
  productId: 'productId', 
  title: 'title',
  author: 'author',
  coverImage: 'coverImage'
}).from('products').where({ category: 'book' }).orderBy('title').all();

console.log(`\n=== BOOK COVER AUDIT (${books.length} books) ===\n`);

let missingCount = 0;
let hasCount = 0;

books.forEach((book, idx) => {
  const hasCover = book.coverImage && book.coverImage.trim() !== '';
  const status = hasCover ? '✓' : '✗';
  
  if (!hasCover) {
    missingCount++;
    console.log(`${status} [${idx + 1}] ${book.title}`);
    console.log(`   Author: ${book.author || 'Unknown'}`);
    console.log(`   Product ID: ${book.productId}`);
    console.log('');
  } else {
    hasCount++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total books: ${books.length}`);
console.log(`With covers: ${hasCount}`);
console.log(`Missing covers: ${missingCount}`);
console.log(`================\n`);
