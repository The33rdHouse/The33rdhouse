import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { paidProcedure } from "../_core/subscriptionMiddleware";
import * as db from "../db";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-01-28.clover",
});

// Chartography reading price: $197
const CHARTOGRAPHY_PRICE = 19700; // in cents

export const chartographyRouter = router({
  /**
   * Get all bookings for current user
   */
  getMyBookings: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.getChartographyBookings(ctx.user.id);
    }),

  /**
   * Get all bookings (admin only)
   */
  getAllBookings: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Admin access required');
      }
      return await db.getAllChartographyBookings();
    }),

  /**
   * Create a new booking with payment
   */
  createBooking: paidProcedure
    .input(z.object({
      birthDate: z.string(), // YYYY-MM-DD format
      birthTime: z.string(), // HH:MM format
      birthLocation: z.string(),
      birthLatitude: z.number().optional(),
      birthLongitude: z.number().optional(),
      primaryQuestion: z.string().optional(),
      focusAreas: z.array(z.string()).optional(),
      additionalNotes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      
      // Create or retrieve Stripe customer
      let customerId = user.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          name: user.name || undefined,
          metadata: {
            userId: user.id.toString(),
          },
        });
        customerId = customer.id;
        await db.updateUserStripeCustomer(user.id, customerId);
      }
      
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: CHARTOGRAPHY_PRICE,
        currency: "usd",
        customer: customerId,
        metadata: {
          userId: user.id.toString(),
          type: "chartography_reading",
        },
        description: "Chartography Reading - The 33rd House",
      });
      
      // Create booking record
      const booking = await db.createChartographyBooking({
        userId: user.id,
        birthDate: input.birthDate,
        birthTime: input.birthTime,
        birthLocation: input.birthLocation,
        birthLatitude: input.birthLatitude?.toString(),
        birthLongitude: input.birthLongitude?.toString(),
        primaryQuestion: input.primaryQuestion,
        focusAreas: input.focusAreas ? JSON.stringify(input.focusAreas) : null,
        additionalNotes: input.additionalNotes,
        stripePaymentIntentId: paymentIntent.id,
        amount: CHARTOGRAPHY_PRICE,
        status: "pending",
      });
      
      return {
        bookingId: booking.id,
        clientSecret: paymentIntent.client_secret,
        amount: CHARTOGRAPHY_PRICE,
      };
    }),

  /**
   * Confirm payment and update booking status
   */
  confirmPayment: protectedProcedure
    .input(z.object({
      bookingId: z.number(),
      paymentIntentId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify payment intent
      const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId);
      
      if (paymentIntent.status === "succeeded") {
        await db.updateChartographyBookingStatus(input.bookingId, "paid");
        
        // Send confirmation email
        await db.sendChartographyConfirmationEmail(ctx.user.id, input.bookingId);
        
        return { success: true, status: "paid" };
      }
      
      return { success: false, status: paymentIntent.status };
    }),

  /**
   * Update booking (admin only)
   */
  updateBooking: protectedProcedure
    .input(z.object({
      bookingId: z.number(),
      status: z.enum(["pending", "paid", "scheduled", "completed", "canceled"]).optional(),
      scheduledFor: z.date().optional(),
      readingNotes: z.string().optional(),
      readingDocument: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Admin access required');
      }
      
      await db.updateChartographyBooking(input.bookingId, {
        status: input.status,
        scheduledFor: input.scheduledFor,
        readingNotes: input.readingNotes,
        readingDocument: input.readingDocument,
      });
      
      return { success: true };
    }),

  /**
   * Get booking by ID
   */
  getBooking: protectedProcedure
    .input(z.object({ bookingId: z.number() }))
    .query(async ({ ctx, input }) => {
      const booking = await db.getChartographyBooking(input.bookingId);
      
      // Users can only see their own bookings, admins can see all
      if (booking && (booking.userId === ctx.user.id || ctx.user.role === 'admin')) {
        return booking;
      }
      
      throw new Error('Booking not found');
    }),
});
