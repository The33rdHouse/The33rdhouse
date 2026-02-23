import { Router } from 'express';
import { getDb, createSession } from '../db.js';
import { users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import { COOKIE_NAME } from '@shared/const.js';

const router = Router();

// OAuth callback handler
router.get('/api/oauth/callback', async (req, res) => {
  console.log('🔐 OAuth callback hit:', { code: req.query.code?.toString().substring(0, 20), state: req.query.state });
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).send('Missing authorization code');
    }

    console.log('🔐 Starting token exchange...');
    console.log('OAuth config:', {
      url: `${process.env.OAUTH_SERVER_URL}/api/oauth/token`,
      appId: process.env.VITE_APP_ID,
      hasAppSecret: !!process.env.BUILT_IN_FORGE_API_KEY,
      codeLength: code.toString().length,
    });

    // Exchange code for access token
    const tokenResponse = await fetch(`${process.env.OAUTH_SERVER_URL}/api/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        appId: process.env.VITE_APP_ID,
        appSecret: process.env.BUILT_IN_FORGE_API_KEY,
      }),
    });

    console.log('Token response status:', tokenResponse.status);
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Token exchange failed!');
      console.error('Status:', tokenResponse.status);
      console.error('Error:', errorText);
      console.error('Request details:', {
        url: `${process.env.OAUTH_SERVER_URL}/api/oauth/token`,
        appId: process.env.VITE_APP_ID,
        hasAppSecret: !!process.env.BUILT_IN_FORGE_API_KEY,
        appSecretPreview: process.env.BUILT_IN_FORGE_API_KEY?.substring(0, 10) + '...',
      });
      
      // Send user-friendly error page
      return res.status(500).type('html').send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authentication Error</title>
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
            h1 { color: #e74c3c; }
            p { color: #666; line-height: 1.6; }
            .error { background: #fee; padding: 15px; border-radius: 8px; margin: 20px 0; }
            a { color: #8b5cf6; text-decoration: none; font-weight: 600; }
          </style>
        </head>
        <body>
          <h1>🔐 Authentication Error</h1>
          <p>We encountered an issue during the login process.</p>
          <div class="error">
            <strong>Error:</strong> Token exchange failed (${tokenResponse.status})
          </div>
          <p>Please try again or contact support if the issue persists.</p>
          <p><a href="/">← Return to Homepage</a></p>
        </body>
        </html>
      `);
    }
    
    console.log('✅ Token exchange successful!');

    const tokenData = await tokenResponse.json();
    console.log('Token data received:', { hasAccessToken: !!tokenData.accessToken, hasRefreshToken: !!tokenData.refreshToken });
    const { accessToken, refreshToken } = tokenData;

    // Get user info
    const userResponse = await fetch(`${process.env.OAUTH_SERVER_URL}/api/oauth/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      console.error('Failed to fetch user info:', await userResponse.text());
      return res.status(500).send('Failed to fetch user information');
    }

    const userData = await userResponse.json();

    // Create or update user in database
    const db = await getDb();
    let userId: number | null = null;
    
    if (db) {
      try {
        const existingUser = await db.select().from(users).where(eq(users.openId, userData.openId)).limit(1);
        
        if (existingUser.length > 0) {
          // Update existing user
          await db.update(users)
            .set({
              name: userData.name,
              email: userData.email,
              lastSignedIn: new Date(),
            })
            .where(eq(users.openId, userData.openId));
          userId = existingUser[0].id;
        } else {
          // Create new user
          const newUser = await db.insert(users).values({
            openId: userData.openId,
            name: userData.name,
            email: userData.email,
            loginMethod: 'oauth',
            role: 'user',
          });
          // Get the newly created user's ID
          const createdUser = await db.select().from(users).where(eq(users.openId, userData.openId)).limit(1);
          if (createdUser.length > 0) {
            userId = createdUser[0].id;
          }
        }
      } catch (dbError) {
        console.error('Database error during user upsert:', dbError);
        // Continue with authentication even if DB fails
      }
    }

    // Create session for the user
    if (userId) {
      try {
        const sessionId = await createSession(userId);
        
        // Set session cookie
        res.cookie(COOKIE_NAME, sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        
        console.log('✅ Session created successfully for user:', userId);
      } catch (sessionError) {
        console.error('Failed to create session:', sessionError);
      }
    }
    
    // Also set OAuth tokens for potential future use
    res.cookie('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    });

    // Redirect to homepage or original destination
    const redirectUrl = state ? Buffer.from(state as string, 'base64').toString('utf-8') : '/';
    res.redirect(redirectUrl.includes('/api/oauth/callback') ? '/' : redirectUrl);
  } catch (error) {
    console.error('❌ OAuth callback error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Send plain text error for debugging
    res.status(500).type('text/plain').send(`Authentication error: ${error instanceof Error ? error.message : String(error)}\n\nStack: ${error instanceof Error ? error.stack : 'No stack'}`);
  }
});

// Logout handler
router.post('/api/oauth/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.clearCookie('refresh_token');
  res.json({ success: true });
});

export default router;
