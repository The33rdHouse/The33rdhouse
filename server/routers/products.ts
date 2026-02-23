import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { products } from '../../drizzle/schema';
import { eq, and, desc } from 'drizzle-orm';

export const productsRouter = router({
  // Get all products (public)
  getAll: publicProcedure
    .input(z.object({
      category: z.enum(['book', 'course', 'meditation', 'merchandise', 'reading']).optional(),
      featured: z.boolean().optional(),
      gateNumber: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      let conditions = [eq(products.status, 'active')];
      
      if (input?.category) {
        conditions.push(eq(products.category, input.category));
      }
      
      if (input?.featured !== undefined) {
        conditions.push(eq(products.featured, input.featured));
      }
      
      if (input?.gateNumber) {
        conditions.push(eq(products.gateNumber, input.gateNumber));
      }
      
      const result = await db.select().from(products)
        .where(and(...conditions))
        .orderBy(desc(products.featured), desc(products.createdAt));
      
      return result;
    }),

  // Get product by slug (public)
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const result = await db.select().from(products)
        .where(and(
          eq(products.slug, input.slug),
          eq(products.status, 'active')
        ))
        .limit(1);
      
      if (!result || result.length === 0) {
        throw new Error('Product not found');
      }
      return result[0];
    }),

  // Get product by ID (public)
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const result = await db.select().from(products)
        .where(and(
          eq(products.id, input.id),
          eq(products.status, 'active')
        ))
        .limit(1);
      
      if (!result || result.length === 0) {
        throw new Error('Product not found');
      }
      return result[0];
    }),

  // Get featured products (public)
  getFeatured: publicProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const result = await db.select().from(products)
        .where(and(
          eq(products.featured, true),
          eq(products.status, 'active')
        ))
        .orderBy(desc(products.createdAt))
        .limit(6);
      
      return result;
    }),

  // Get products by category (public)
  getByCategory: publicProcedure
    .input(z.object({ category: z.enum(['book', 'course', 'meditation', 'merchandise', 'reading']) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const result = await db.select().from(products)
        .where(and(
          eq(products.category, input.category),
          eq(products.status, 'active')
        ))
        .orderBy(desc(products.featured), desc(products.createdAt));
      
      return result;
    }),
});
