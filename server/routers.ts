import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import * as db from "./db";
import * as ai from "./_core/openai";
import { queueWelcomeSequence } from "./_core/emailAutomation";
import { stripeRouter } from "./routers/stripe";
import { chartographyRouter } from './routers/chartography';
import { productsRouter } from './routers/products';
import { webhooksRouter } from './routers/webhooks';
import { ordersRouter } from './routers/orders';
import { adminRouter } from './routers/admin';
import { downloadsRouter } from './routers/downloads';
import { corpusRouter } from './routers/corpus';
import { createEmailVerificationToken, verifyEmailToken, sendVerificationEmail } from './_core/emailVerification.js';
import { createPasswordResetToken, resetPasswordWithToken, sendPasswordResetEmail } from './_core/passwordReset.js';
import { generateTwoFactorSecret, generateQRCode, verifyTwoFactorToken, enableTwoFactor, disableTwoFactor } from './_core/twoFactor.js';
import { getUserSessions, revokeSession, revokeAllOtherSessions, getLoginHistory, parseUserAgent } from './_core/sessionManagement.js';
import { seekerProcedure, initiateProcedure, paidProcedure } from "./_core/subscriptionMiddleware";

export const appRouter = router({
  system: systemRouter,
  downloads: downloadsRouter,
  corpus: corpusRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    signup: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
        birthDate: z.string().optional(),
        birthTime: z.string().optional(),
        birthLocation: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Create user with email/password
        const user = await db.createUserWithPassword({
          email: input.email,
          password: input.password,
          name: input.name,
          birthDate: input.birthDate,
          birthTime: input.birthTime,
          birthLocation: input.birthLocation,
        });

        // Create session for the new user
        const sessionId = await db.createSession(user.id);

        // Set session cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionId, cookieOptions);

        // Send email verification
        const verificationToken = await createEmailVerificationToken(user.id);
        await sendVerificationEmail(input.email, input.name, verificationToken);

        // Queue welcome email sequence
        try {
          await queueWelcomeSequence(user.id, input.email);
        } catch (error) {
          console.error('[Signup] Failed to queue welcome sequence:', error);
          // Don't block signup if email queuing fails
        }

        // Notify admin of new member (fire and forget - don't block signup)
        try {
          await fetch(`${process.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:3000'}/api/trpc/admin.notifyNewMember`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail: input.email,
              userName: input.name,
              signupDate: new Date().toISOString(),
            }),
          }).catch(() => {}); // Silently fail if notification fails
        } catch {}

        return { success: true, userId: user.id, user };
      }),

       login: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Verify credentials
        const user = await db.verifyUserPassword(input.email, input.password);
        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Check if user has 2FA enabled
        if (user.twoFactorEnabled) {
          // Don't create session yet, require 2FA verification first
          return {
            success: true,
            requires2FA: true,
            userId: user.id,
          };
        }

        // Create session
        const sessionId = await db.createSession(user.id);

        // Set session cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionId, cookieOptions);

        return {
          success: true,
          requires2FA: false,
        };
      }),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),

    // Portal entry - save birth info
    saveBirthInfo: protectedProcedure
      .input(z.object({
        birthDate: z.string().optional(),
        birthTime: z.string().optional(),
        birthLocation: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.updateUserBirthInfo(ctx.user.id, input);
        return { success: true };
      }),

    // Portal entry - sign documents
    signPortalDocuments: protectedProcedure
      .mutation(async ({ ctx }) => {
        await db.signPortalDocuments(ctx.user.id);
        return { success: true };
      }),

    // Onboarding progress - update step
    updateOnboardingStep: protectedProcedure
      .input(z.object({
        step: z.enum(["welcome", "profile", "subscription", "completed"]),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.updateOnboardingStep(ctx.user.id, input.step);
        return { success: true };
      }),

    // Onboarding progress - mark completed
    completeOnboarding: protectedProcedure
      .mutation(async ({ ctx }) => {
        await db.completeOnboarding(ctx.user.id);
        return { success: true };
      }),

    // Email verification - resend verification email
    resendVerificationEmail: protectedProcedure
      .mutation(async ({ ctx }) => {
        if (!ctx.user.email) {
          throw new Error('No email address associated with this account');
        }

        if (ctx.user.emailVerified) {
          throw new Error('Email is already verified');
        }

        const token = await createEmailVerificationToken(ctx.user.id);
        await sendVerificationEmail(ctx.user.email, ctx.user.name || 'User', token);

        return { success: true };
      }),

    // Email verification - verify email with token
    verifyEmail: publicProcedure
      .input(z.object({ token: z.string() }))
      .mutation(async ({ input }) => {
        const success = await verifyEmailToken(input.token);

        if (!success) {
          throw new Error('Invalid or expired verification token');
        }

        return { success: true };
      }),

    // Password reset - request reset email
    requestPasswordReset: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const token = await createPasswordResetToken(input.email);

        if (token) {
          await sendPasswordResetEmail(input.email, token);
        }

        // Always return success to prevent email enumeration
        return { success: true, message: 'If an account exists with this email, a password reset link has been sent.' };
      }),

    // Password reset - reset password with token
    resetPassword: publicProcedure
      .input(z.object({
        token: z.string(),
        newPassword: z.string().min(8),
      }))
      .mutation(async ({ input }) => {
        const success = await resetPasswordWithToken(input.token, input.newPassword);

        if (!success) {
          throw new Error('Invalid or expired reset token');
        }

        return { success: true };
      }),

    // 2FA - Setup (generate secret and QR code)
    setupTwoFactor: protectedProcedure
      .mutation(async ({ ctx }) => {
        const user = ctx.user!;
        const secret = generateTwoFactorSecret();
        const qrCode = await generateQRCode(user.email!, secret);

        return {
          secret,
          qrCode,
        };
      }),

    // 2FA - Enable (verify token and save secret)
    enableTwoFactor: protectedProcedure
      .input(z.object({
        secret: z.string(),
        token: z.string().length(6),
      }))
      .mutation(async ({ input, ctx }) => {
        const user = ctx.user!;

        // Verify the token
        const isValid = verifyTwoFactorToken(input.token, input.secret);
        if (!isValid) {
          throw new Error('Invalid verification code');
        }

        // Enable 2FA for the user
        await enableTwoFactor(user.id, input.secret);

        return { success: true };
      }),

    // 2FA - Disable
    disableTwoFactor: protectedProcedure
      .input(z.object({
        token: z.string().length(6),
      }))
      .mutation(async ({ input, ctx }) => {
        const user = ctx.user!;

        if (!user.twoFactorSecret) {
          throw new Error('2FA is not enabled');
        }

        // Verify the token before disabling
        const isValid = verifyTwoFactorToken(input.token, user.twoFactorSecret);
        if (!isValid) {
          throw new Error('Invalid verification code');
        }

        // Disable 2FA
        await disableTwoFactor(user.id);

        return { success: true };
      }),

    // 2FA - Verify token during login
    verifyTwoFactorLogin: publicProcedure
      .input(z.object({
        userId: z.number(),
        token: z.string().length(6),
      }))
      .mutation(async ({ input, ctx }) => {
        // Get user's 2FA secret
        const user = await db.getUserById(input.userId);
        if (!user || !user.twoFactorSecret) {
          throw new Error('2FA not enabled for this user');
        }

        // Verify the token
        const isValid = verifyTwoFactorToken(input.token, user.twoFactorSecret);
        if (!isValid) {
          throw new Error('Invalid verification code');
        }

        // Create session
        const sessionId = await db.createSession(user.id);

        // Set session cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, sessionId, cookieOptions);

        return { success: true };
      }),
  }),

  // Security Dashboard
  security: router({
    // Get all active sessions
    getSessions: protectedProcedure
      .query(async ({ ctx }) => {
        const user = ctx.user!;
        const sessions = await getUserSessions(user.id);

        return sessions.map(session => ({
          id: session.id,
          deviceInfo: session.deviceInfo || parseUserAgent(session.userAgent || ''),
          ipAddress: session.ipAddress,
          lastActivity: session.createdAt,
          createdAt: session.createdAt,
          isCurrent: false, // TODO: Compare with current session
        }));
      }),

    // Revoke a specific session
    revokeSession: protectedProcedure
      .input(z.object({ sessionId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const user = ctx.user!;
        
        // Get the session to verify it belongs to the user
        const sessions = await getUserSessions(user.id);
        const session = sessions.find(s => s.id === input.sessionId);
        
        if (!session) {
          throw new Error('Session not found');
        }

        await revokeSession(session.sessionToken);
        return { success: true };
      }),

    // Revoke all other sessions
    revokeAllOtherSessions: protectedProcedure
      .mutation(async ({ ctx }) => {
        const user = ctx.user!;
        const currentSessionToken = ctx.req.cookies[COOKIE_NAME];
        
        if (!currentSessionToken) {
          throw new Error('No active session');
        }

        await revokeAllOtherSessions(user.id, currentSessionToken);
        return { success: true };
      }),

    // Get login history
    getLoginHistory: protectedProcedure
      .input(z.object({ limit: z.number().optional().default(20) }))
      .query(async ({ input, ctx }) => {
        const user = ctx.user!;
        const history = await getLoginHistory(user.id, input.limit);

        return history.map(entry => ({
          id: entry.id,
          loginMethod: entry.loginMethod,
          deviceInfo: entry.deviceInfo || parseUserAgent(entry.userAgent || ''),
          ipAddress: entry.ipAddress,
          location: entry.location,
          success: entry.success,
          failureReason: entry.failureReason,
          createdAt: entry.createdAt,
        }));
      }),
  }),

  // Gates
  gates: router({
    // Get all gates
    getAll: publicProcedure.query(async () => {
      const result = await db.getAllGates();
      return result.map(g => ({
        ...g,
        title: g.name
      }));
    }),

    // Get gate by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const g = await db.getGateById(input.id);
        if (!g) return null;
        return { ...g, title: g.name };
      }),

    // Get gate by number
    getByNumber: publicProcedure
      .input(z.object({ number: z.number() }))
      .query(async ({ input }) => {
        const g = await db.getGateByNumber(input.number);
        if (!g) return null;
        return { ...g, title: g.name };
      }),
  }),

  // Realms
  realms: router({
    // Get all realms
    getAll: publicProcedure.query(async () => {
      const result = await db.getAllRealms();
      return result.map(r => ({
        ...r,
        title: r.name,
        mythicName: r.name,
        description: r.mythicLayer,
        theme: r.hybridLayer,
        gateNumber: Math.floor((r.number - 1) / 12) + 1
      }));
    }),

    // Get realm by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const r = await db.getRealmById(input.id);
        if (!r) return null;
        return { 
          ...r, 
          title: r.name,
          mythicName: r.name,
          description: r.mythicLayer,
          theme: r.hybridLayer,
          gateNumber: Math.floor((r.number - 1) / 12) + 1
        };
      }),

    // Get realm by number
    getByNumber: publicProcedure
      .input(z.object({ number: z.number() }))
      .query(async ({ input }) => {
        const r = await db.getRealmByNumber(input.number);
        if (!r) return null;
        return { 
          ...r, 
          title: r.name,
          mythicName: r.name,
          description: r.mythicLayer,
          theme: r.hybridLayer,
          gateNumber: Math.floor((r.number - 1) / 12) + 1
        };
      }),

    // Get realms by gate
    getByGate: publicProcedure
      .input(z.object({ gateNumber: z.number() }))
      .query(async ({ input }) => {
        const gate = await db.getGateByNumber(input.gateNumber);
        if (!gate) return [];
        const result = await db.getRealmsByGate(gate.id);
        return result.map(r => ({
          ...r,
          title: r.name,
          mythicName: r.name,
          description: r.mythicLayer,
          theme: r.hybridLayer,
          gateNumber: Math.floor((r.number - 1) / 12) + 1
        }));
      }),
  }),

  // Inner Circle (requires Seeker tier or higher)
  innerCircle: router({
    // Get all months
    getMonths: seekerProcedure.query(async () => {
      const result = await db.getAllInnerCircleMonths();
      return result.map(m => ({
        ...m,
        gateNumber: m.gateId // Assuming gateId corresponds to gate number
      }));
    }),

    // Get specific month
    getMonth: seekerProcedure
      .input(z.object({ monthNumber: z.number() }))
      .query(async ({ input }) => {
        const m = await db.getInnerCircleMonth(input.monthNumber);
        if (!m) return null;
        return { ...m, gateNumber: m.gateId };
      }),

    // Get weeks for a month (or all weeks if monthId is omitted)
    getWeeks: seekerProcedure
      .input(z.object({ monthId: z.number().optional() }).optional())
      .query(async ({ input }) => {
        if (input?.monthId) {
          const result = await db.getInnerCircleWeeks(input.monthId);
          return result.map(w => ({
            ...w,
            subtitle: '', // Map missing field
            dailyHomework: w.dailyPrompt,
            monthNumber: w.monthId // Assuming monthId is monthNumber
          }));
        }
        
        // Fetch all weeks if no monthId provided
        const allMonths = await db.getAllInnerCircleMonths();
        const allWeeks = await Promise.all(
          allMonths.map(async (m) => {
            const weeks = await db.getInnerCircleWeeks(m.id);
            return weeks.map(w => ({
              ...w,
              subtitle: '',
              dailyHomework: w.dailyPrompt,
              monthNumber: m.monthNumber
            }));
          })
        );
        return allWeeks.flat();
      }),
  }),

  // User Progress Tracking
  progress: router({
    // Get all user progress
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProgress(ctx.user.id);
    }),

    // Get progress for specific realm
    getRealm: protectedProcedure
      .input(z.object({ realmNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getRealmProgress(ctx.user.id, input.realmNumber);
      }),

    // Mark realm as complete
    complete: protectedProcedure
      .input(z.object({
        realmNumber: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertRealmProgress({
          userId: ctx.user.id,
          realmNumber: input.realmNumber,
          completed: true,
          completedAt: new Date(),
          notes: input.notes,
        });
        return { success: true };
      }),

    // Update realm notes
    updateNotes: protectedProcedure
      .input(z.object({
        realmNumber: z.number(),
        notes: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertRealmProgress({
          userId: ctx.user.id,
          realmNumber: input.realmNumber,
          notes: input.notes,
        });
        return { success: true };
      }),

    // Get user statistics
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const progress = await db.getUserProgress(ctx.user.id);
      const sessions = await db.getUserMeditationSessions(ctx.user.id);
      
      const completedRealms = progress.filter(p => p.completed).length;
      const totalMeditationMinutes = sessions.reduce((sum, s) => sum + (s.duration / 60), 0);
      const completedGates = Math.floor(completedRealms / 12);
      
      return {
        completedRealms,
        totalRealms: 144,
        completedGates,
        totalGates: 12,
        totalMeditationMinutes: Math.round(totalMeditationMinutes),
        totalSessions: sessions.length,
        achievements: 0, // Default to 0 as expected by frontend
      };
    }),
  }),

  // Meditation Sessions
  meditation: router({
    // Get all user meditation sessions
    getSessions: protectedProcedure.query(async ({ ctx }) => {
      const sessions = await db.getUserMeditationSessions(ctx.user.id);
      return sessions.map(s => ({
        ...s,
        durationMinutes: Math.round(s.duration / 60)
      }));
    }),

    // Get sessions for specific realm
    getRealmSessions: protectedProcedure
      .input(z.object({ realmNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        const sessions = await db.getRealmMeditationSessions(ctx.user.id, input.realmNumber);
        return sessions.map(s => ({
          ...s,
          durationMinutes: Math.round(s.duration / 60)
        }));
      }),

    // Record meditation session
    record: protectedProcedure
      .input(z.object({
        realmNumber: z.number(),
        duration: z.number(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createMeditationSession({
          userId: ctx.user.id,
          realmNumber: input.realmNumber,
          duration: input.duration,
          notes: input.notes,
        });
        return { success: true };
      }),
  }),

  // Audio Meditations
  audio: router({
    // Get all audio meditations
    getAll: publicProcedure.query(async () => {
      return await db.getAllAudioMeditations();
    }),

    // Get audio for specific realm
    getRealm: publicProcedure
      .input(z.object({ realmNumber: z.number() }))
      .query(async ({ input }) => {
        return await db.getAudioMeditation(input.realmNumber);
      }),

    // Upload new audio meditation (admin only)
    upload: protectedProcedure
      .input(z.object({
        realmNumber: z.number(),
        title: z.string(),
        description: z.string().optional(),
        audioUrl: z.string(),
        duration: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        
        await db.createAudioMeditation({
          ...input,
          uploadedBy: ctx.user.id,
        });
        return { success: true };
      }),
  }),

  // Notifications
  notifications: router({
    // Get all user notifications
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserNotifications(ctx.user.id);
    }),

    // Get unread count
    getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUnreadNotificationCount(ctx.user.id);
    }),

    // Mark notification as read
    markAsRead: protectedProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.markNotificationAsRead(input.notificationId, ctx.user.id);
        return { success: true };
      }),

    // Mark all as read
    markAllAsRead: protectedProcedure
      .mutation(async ({ ctx }) => {
        await db.markAllNotificationsAsRead(ctx.user.id);
        return { success: true };
      }),

    // Create notification (admin only)
    create: protectedProcedure
      .input(z.object({
        userId: z.number().optional(),
        type: z.enum(['announcement', 'update', 'alert', 'meditation_reminder', 'achievement']),
        title: z.string(),
        message: z.string(),
        link: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        
        await db.createNotification(input);
        return { success: true };
      }),
  }),

  // Forum
  forum: router({
    // Get all posts
    getPosts: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getForumPosts(input?.category);
      }),

    // Get single post with comments
    getPost: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        const post = await db.getForumPost(input.postId);
        if (!post) return null;
        
        const comments = await db.getForumComments(input.postId);
        return { post, comments };
      }),

    // Create new post
    createPost: protectedProcedure
      .input(z.object({
        title: z.string(),
        content: z.string(),
        category: z.enum(['general', 'gate', 'realm', 'elder_qa', 'practice']),
        gateNumber: z.number().optional(),
        realmNumber: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createForumPost({
          ...input,
          userId: ctx.user.id,
        });
        return { success: true };
      }),

    // Create comment
    createComment: protectedProcedure
      .input(z.object({
        postId: z.number(),
        content: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createForumComment({
          ...input,
          userId: ctx.user.id,
        });
        return { success: true };
      }),
  }),

  // Email Sequences
  emailSequences: router({
    // Get all sequences (admin only)
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        return await db.getAllEmailSequences();
      }),

    // Get sequence details (admin only)
    getSequence: protectedProcedure
      .input(z.object({ sequenceId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        return await db.getEmailSequence(input.sequenceId);
      }),

    // Create sequence (admin only)
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        trigger: z.enum(['user_signup', 'realm_completed', 'gate_completed', 'achievement_unlocked', 'manual']),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        await db.createEmailSequence(input);
        return { success: true };
      }),

    // Get email logs for a user
    getUserLogs: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserEmailLogs(ctx.user.id);
      }),
  }),

  // Admin routes
  admin: router({
    // Get all users (admin only)
    getAllUsers: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        return await db.getAllUsers();
      }),

    // Get platform statistics (admin only)
    getStats: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Admin access required');
        }
        const users = await db.getAllUsers();
        const sessions = await db.getAllMeditationSessions();
        const progress = await db.getAllProgress();
        
        const totalUsers = users.length;
        const activeUsers = users.filter(u => {
          const lastActive = new Date(u.lastSignedIn);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return lastActive > thirtyDaysAgo;
        }).length;
        const totalSessions = sessions.length;
        const avgProgress = progress.length > 0 
          ? Math.round((progress.filter(p => p.completed).length / (progress.length || 1)) * 100)
          : 0;
        
        return {
          totalUsers,
          activeUsers,
          totalSessions,
          avgProgress,
        };
      }),

    // Seed products database with Sacred Library books
    seedProducts: adminProcedure
      .mutation(async () => {
        // @ts-ignore
        const { sacredLibraryBooks } = await import('../server/seed-sacred-library.mjs');
        const { products } = await import('../drizzle/schema');
        const database = await db.getDb();
        if (!database) throw new Error('Database connection failed');
        
        // Clear existing products
        await database.delete(products);
        
        // Insert all 71 books
        let count = 0;
        for (const book of sacredLibraryBooks) {
          await database.insert(products).values({
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
          count++;
        }
        
        return {
          success: true,
          count,
          message: `Successfully seeded ${count} Sacred Library books`
        };
      }),
  }),

  // AI-powered features (requires Adept tier or higher)
  ai: router({
    getRealmInsight: initiateProcedure
      .input(z.object({
        realmNumber: z.number(),
        realmName: z.string(),
        theme: z.string(),
        userProgress: z.number().optional(),
      }))
      .query(async ({ input }) => {
        return await ai.generateRealmInsight(input);
      }),

    getMeditationGuidance: initiateProcedure
      .input(z.object({
        realmNumber: z.number(),
        realmName: z.string(),
        practice: z.string(),
      }))
      .query(async ({ input }) => {
        return await ai.generateMeditationGuidance(input);
      }),

    askQuestion: initiateProcedure
      .input(z.object({
        question: z.string(),
        context: z.object({
          currentGate: z.number().optional(),
          currentRealm: z.number().optional(),
          userProgress: z.number().optional(),
        }).optional(),
      }))
      .mutation(async ({ input }) => {
        return await ai.askSpiritualQuestion(input);
      }),

    getWeeklySummary: initiateProcedure
      .input(z.object({
        weekNumber: z.number(),
        monthTheme: z.string(),
        weekFocus: z.string(),
      }))
      .query(async ({ input }) => {
        return await ai.generateWeeklySummary(input);
      }),
  }),

  // Stripe subscription management
  stripe: stripeRouter,

  // Chartography readings
  chartography: chartographyRouter,

  // Webhooks for email automation
  webhooks: webhooksRouter,

  // Products and e-commerce
  products: productsRouter,

  // Order history and downloads
  orders: ordersRouter,
});

export type AppRouter = typeof appRouter;
