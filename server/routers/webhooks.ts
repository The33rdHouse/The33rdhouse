import { router, publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { sendOrderConfirmation, sendChartographyConfirmation } from '../_core/resend-email';

/**
 * Stripe webhook handler for email automation
 * Triggers emails after successful payments
 */
export const webhooksRouter = router({
  /**
   * Handle Stripe checkout.session.completed webhook
   * Sends order confirmation email
   */
  stripeCheckoutCompleted: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      customerEmail: z.string(),
      customerName: z.string(),
      amountTotal: z.number(),
      metadata: z.record(z.string(), z.any()).optional(),
    }))
    .mutation(async ({ input }) => {
      const { sessionId, customerEmail, customerName, amountTotal, metadata } = input;
      
      // Generate order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Parse line items from metadata (simplified - in production, fetch from Stripe)
      const items = metadata?.items ? JSON.parse(metadata.items as string) : [];
      
      // Send order confirmation email
      await sendOrderConfirmation({
        to: customerEmail,
        customerName,
        orderNumber,
        items,
        total: amountTotal,
      });
      
      return { success: true, orderNumber };
    }),
  
  /**
   * Handle Chartography booking payment completion
   * Sends booking confirmation email
   */
  chartographyPaymentCompleted: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      customerEmail: z.string(),
      customerName: z.string(),
      birthDate: z.string(),
      birthTime: z.string(),
      birthLocation: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { sessionId, customerEmail, customerName, birthDate, birthTime, birthLocation } = input;
      
      // Generate booking number
      const bookingNumber = `CHR-${Date.now()}`;
      
      // Calculate delivery date (7-10 business days)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 10);
      const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Send chartography confirmation email
      await sendChartographyConfirmation({
        to: customerEmail,
        customerName,
        bookingNumber,
        birthDate,
        birthTime,
        birthLocation,
        deliveryDate: formattedDeliveryDate,
      });
      
      return { success: true, bookingNumber };
    }),
});
