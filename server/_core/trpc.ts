import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Please login (10001)' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next();
});

export const seekerProcedure = protectedProcedure.use(({ ctx, next }) => {
  const allowedTiers = ['seeker', 'initiate', 'elder'];
  if (!allowedTiers.includes(ctx.user.subscriptionTier) && ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Seeker tier required' });
  }
  return next();
});

export const initiateProcedure = protectedProcedure.use(({ ctx, next }) => {
  const allowedTiers = ['initiate', 'elder'];
  if (!allowedTiers.includes(ctx.user.subscriptionTier) && ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Initiate tier required' });
  }
  return next();
});

export const elderProcedure = protectedProcedure.use(({ ctx, next }) => {
  const allowedTiers = ['elder'];
  if (!allowedTiers.includes(ctx.user.subscriptionTier) && ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Elder tier required' });
  }
  return next();
});
