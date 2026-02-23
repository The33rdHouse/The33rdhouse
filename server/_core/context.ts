import type { Request, Response } from 'express';
import { COOKIE_NAME } from '@shared/const';
import * as db from '../db';

export interface User {
  id: number;
  openId: string;
  name: string;
  email?: string;
  role: 'admin' | 'user';
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  subscriptionTier: 'free' | 'seeker' | 'initiate' | 'elder';
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing';
  tier: 'free' | 'seeker' | 'initiate' | 'elder';
  onboardingCompleted: boolean;
  onboardingStep?: string | null;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;
  createdAt: Date;
  birthDate?: string | null;
  birthTime?: string | null;
  birthLocation?: string | null;
}

export interface Context {
  req: Request;
  res: Response;
  user: User | null;
}

export async function createContext({ req, res }: { req: Request; res: Response }): Promise<Context> {
  // Try to get session from cookie
  const sessionId = req.cookies[COOKIE_NAME];
  
  if (!sessionId) {
    return {
      req,
      res,
      user: null,
    };
  }

  // Get user from session
  try {
    const user = await db.getUserBySessionId(sessionId);
    
    if (!user) {
      return {
        req,
        res,
        user: null,
      };
    }

    return {
      req,
      res,
      user: {
        id: user.id,
        openId: user.openId,
        name: user.name || '',
        email: user.email || undefined,
        role: user.role as 'admin' | 'user',
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
        subscriptionTier: user.subscriptionTier as 'free' | 'seeker' | 'initiate' | 'elder',
        subscriptionStatus: user.subscriptionStatus as 'active' | 'canceled' | 'past_due' | 'trialing',
        tier: user.subscriptionTier as 'free' | 'seeker' | 'initiate' | 'elder',
        onboardingCompleted: user.onboardingCompleted,
        onboardingStep: user.onboardingStep,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorSecret: user.twoFactorSecret,
        createdAt: user.createdAt,
        birthDate: user.birthDate,
        birthTime: user.birthTime,
        birthLocation: user.birthLocation,
      },
    };
  } catch (error) {
    console.error('Error getting user from session:', error);
    return {
      req,
      res,
      user: null,
    };
  }
}
