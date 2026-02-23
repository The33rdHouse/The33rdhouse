import type { Request } from 'express';
import { COOKIE_NAME, ONE_YEAR_MS } from '@shared/const';

export function getSessionCookieOptions(req: Request) {
  const isProduction = process.env.NODE_ENV === 'production';
  const domain = req.hostname;

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax' as const,
    maxAge: ONE_YEAR_MS,
    path: '/',
    domain: isProduction ? domain : undefined,
  };
}
