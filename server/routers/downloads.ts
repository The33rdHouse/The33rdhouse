import { router, protectedProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { products, orders, orderItems } from '../../drizzle/schema';
import { z } from 'zod';
import { eq, and } from 'drizzle-orm';

/**
 * Downloads Router
 * Handles digital product downloads with tier-based access control
 */
export const downloadsRouter = router({
  /**
   * Get download URL for a product
   * Checks user's subscription tier and purchase history
   */
  getDownloadUrl: protectedProcedure
    .input(z.object({
      productId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      // Get product details
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.productId, input.productId))
        .limit(1);

      if (!product) {
        throw new Error('Product not found');
      }

      if (!product.downloadUrl) {
        throw new Error('This product does not have a download available');
      }

      // Check access based on subscription tier
      const hasAccess = await checkDownloadAccess(db, user.id, product, user.subscriptionTier);

      if (!hasAccess) {
        throw new Error('You do not have access to download this product. Please upgrade your membership or purchase this product.');
      }

      // Log download
      await logDownload(db, user.id, product.id);

      return {
        downloadUrl: product.downloadUrl,
        fileName: `${product.slug}.pdf`,
        fileSize: product.fileSize,
        title: product.title,
      };
    }),

  /**
   * Get list of all downloadable products for current user
   */
  getAvailableDownloads: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      // Get all products with downloads
      const allProducts = await db
        .select()
        .from(products)
        .where(eq(products.status, 'active'));

      // Filter by access
      const availableProducts = [];
      for (const product of allProducts) {
        if (product.downloadUrl) {
          const hasAccess = await checkDownloadAccess(db, user.id, product, user.subscriptionTier);
          availableProducts.push({
            ...product,
            hasAccess,
          });
        }
      }

      return availableProducts;
    }),

  /**
   * Get download history for current user
   */
  getDownloadHistory: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new Error('Database connection failed');

      const user = ctx.user;
      if (!user) throw new Error('User not authenticated');

      // TODO: Implement downloads table to track history
      // For now, return empty array
      return [];
    }),
});

/**
 * Check if user has access to download a product
 * Based on subscription tier and purchase history
 */
async function checkDownloadAccess(
  db: any,
  userId: number,
  product: any,
  subscriptionTier: string
): Promise<boolean> {
  // Free tier: No access to paid products
  if (subscriptionTier === 'free' && product.price > 0) {
    // Check if they purchased it
    const hasPurchased = await checkPurchaseHistory(db, userId, product.id);
    return hasPurchased;
  }

  // Seeker tier ($33/month): Access to books under $50
  if (subscriptionTier === 'seeker') {
    if (product.category === 'book' && product.price <= 5000) {
      return true;
    }
    // Check purchase history for more expensive items
    return await checkPurchaseHistory(db, userId, product.id);
  }

  // Initiate tier ($97/month): Access to all books and courses
  if (subscriptionTier === 'initiate') {
    if (product.category === 'book' || product.category === 'course') {
      return true;
    }
    return await checkPurchaseHistory(db, userId, product.id);
  }

  // Elder tier ($333/month): Access to everything
  if (subscriptionTier === 'elder') {
    return true;
  }

  // Default: check purchase history
  return await checkPurchaseHistory(db, userId, product.id);
}

/**
 * Check if user has purchased a specific product
 */
async function checkPurchaseHistory(
  db: any,
  userId: number,
  productId: number
): Promise<boolean> {
  const purchases = await db
    .select()
    .from(orderItems)
    .innerJoin(orders, eq(orders.id, orderItems.orderId))
    .where(
      and(
        eq(orders.userId, userId),
        eq(orderItems.productId, productId)
        // Check for paid or delivered orders
      )
    )
    .limit(1);

  return purchases.length > 0;
}

/**
 * Log a download event
 * TODO: Create downloads table to track this
 */
async function logDownload(
  db: any,
  userId: number,
  productId: number
): Promise<void> {
  // For now, just console log
  console.log(`[Download] User ${userId} downloaded product ${productId}`);
  
  // TODO: Insert into downloads table when created
  // await db.insert(downloads).values({
  //   userId,
  //   productId,
  //   downloadedAt: new Date(),
  // });
}
