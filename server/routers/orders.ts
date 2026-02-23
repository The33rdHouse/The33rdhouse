import { z } from 'zod';
import { router, protectedProcedure, adminProcedure } from '../_core/trpc';
import * as db from '../db';

/**
 * Orders router - handles user order history and downloads
 */
export const ordersRouter = router({
  /**
   * Get all orders (admin only)
   */
  getAll: adminProcedure
    .query(async () => {
      const orders = await db.getAllOrders();
      return orders;
    }),

  /**
   * Get user's order history with items
   */
  getUserOrders: protectedProcedure
    .query(async ({ ctx }) => {
      const orders = await db.getUserOrders(ctx.user.id);
      return orders;
    }),

  /**
   * Get single order by ID (must belong to user)
   */
  getOrderById: protectedProcedure
    .input(z.object({
      orderId: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const order = await db.getOrderById(input.orderId);
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      if (order.userId !== ctx.user.id) {
        throw new Error('Unauthorized');
      }
      
      return order;
    }),
});
