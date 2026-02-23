import { router, protectedProcedure, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { products } from '../../drizzle/schema';
// @ts-ignore - .mjs file
import { sacredLibraryBooks } from '../seed-sacred-library.mjs';
import { sendOrderConfirmation } from '../_core/resend-email';
import { z } from 'zod';

export const adminRouter = router({
  seedProducts: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user?.role !== 'admin') {
      throw new Error('Admin access required');
    }

    const db = await getDb();
    if (!db) throw new Error('Database connection failed');
    
    // Clear existing products
    await db.delete(products);
    
    // Insert all 71 books
    const insertedProducts = [];
    
    for (const book of sacredLibraryBooks) {
      await db.insert(products).values({
        productId: book.slug, // Use slug as productId
        title: book.title,
        slug: book.slug,
        description: book.description,
        price: book.price,
        category: book.category,
        gateNumber: book.gateNumber,
        realmNumber: book.realmNumber,
        featured: book.featured || false,
        createdAt: new Date()
      });
      
      insertedProducts.push(book);
    }
    
    return {
      success: true,
      count: insertedProducts.length,
      message: `Successfully seeded ${insertedProducts.length} Sacred Library books`
    };
  }),

  // Send new member notification email to admin
  // NOTE: This is a publicProcedure because it's called from the signup flow
  // via internal HTTP fetch without authentication. It's safe because:
  // 1. It only sends a notification to a hardcoded admin email
  // 2. It doesn't expose or return any sensitive data
  // 3. Rate limiting at the signup level prevents abuse
  notifyNewMember: publicProcedure
    .input(z.object({
      userEmail: z.string().email(),
      userName: z.string().optional(),
      signupDate: z.string(),
    }))
    .mutation(async ({ input }) => {

      const { userEmail, userName, signupDate } = input;

      // Send email to admin
      // TODO: Implement admin notification email
      /* await sendEmail({
        to: 'daniel@the33rdhouse.com', // Admin email
        subject: '🎉 New Member Joined The 33rd House',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: 'Georgia', serif; background: #0a0412; color: #f0e6d2; padding: 40px; }
                .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%); border: 2px solid #9333ea; border-radius: 12px; padding: 40px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { width: 80px; height: 80px; background: linear-gradient(135deg, #9333ea, #d4af37); border-radius: 50%; display: inline-flex; align-items: center; justify-center; font-size: 32px; font-weight: bold; color: white; margin-bottom: 20px; }
                h1 { color: #d4af37; font-size: 28px; margin: 0; }
                .content { background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 24px; margin: 24px 0; }
                .detail { margin: 12px 0; padding: 12px; background: rgba(147, 51, 234, 0.1); border-left: 3px solid #9333ea; }
                .label { color: #9333ea; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
                .value { color: #f0e6d2; font-size: 16px; margin-top: 4px; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #9333ea; color: #c4b5a0; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">33</div>
                  <h1>New Member Alert</h1>
                </div>
                
                <div class="content">
                  <p style="color: #f0e6d2; font-size: 18px; margin-bottom: 20px;">
                    A new member has joined The 33rd House community!
                  </p>
                  
                  <div class="detail">
                    <div class="label">Member Email</div>
                    <div class="value">${userEmail}</div>
                  </div>
                  
                  ${userName ? `
                  <div class="detail">
                    <div class="label">Member Name</div>
                    <div class="value">${userName}</div>
                  </div>
                  ` : ''}
                  
                  <div class="detail">
                    <div class="label">Signup Date</div>
                    <div class="value">${new Date(signupDate).toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                  </div>
                </div>
                
                <div class="footer">
                  <p>The 33rd House | Private Members Club</p>
                  <p style="font-size: 12px; color: #9333ea;">Consciousness Transformation at 1% of Traditional Costs</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }); */

      return { success: true };
    }),
});
