import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const emailData = JSON.stringify({
    to: [to],
    subject,
    body: html,
  });

  try {
    const { stdout, stderr } = await execAsync(
      `manus-mcp-cli tool call gmail_send_messages --server gmail --input '${emailData.replace(/'/g, "'\\''")}' 2>&1`
    );

    if (stderr && stderr.includes('error')) {
      console.error('Gmail MCP stderr:', stderr);
      throw new Error(`Gmail MCP error: ${stderr}`);
    }

    console.log('Email sent successfully to:', to);
    return { success: true, id: 'gmail-' + Date.now() };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

/**
 * Simple HTML stripper for fallback text content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*?<\/style>/gi, "")
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Email template helpers
 */
/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
  const subject = 'Welcome to The 33rd House - Begin Your Journey';
  
  const content = `
    <h2>Welcome, ${userName}</h2>
    
    <p>
      You have crossed the threshold into The 33rd House—a sacred space where 
      consciousness transforms through the alchemical journey of the 12 Gates and 144 Realms.
    </p>
    
    <blockquote style="border-left: 3px solid #9333ea; padding-left: 20px; margin: 30px 0; font-style: italic; color: #d4af37;">
      "Form that breathes, Fire that remembers"
    </blockquote>
    
    <p>
      Your account has been created, and the path now opens before you. This is not merely 
      a membership—it is an initiation into a 500-year lineage of transformation.
    </p>
    
    <p>
      <strong>What awaits you:</strong>
    </p>
    <ul>
      <li>12 Gates of consciousness transformation</li>
      <li>144 Realms of deep inner work</li>
      <li>Inner Circle monthly curriculum</li>
      <li>Guided meditations and somatic practices</li>
      <li>A community of fellow seekers</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://33rdhouse.com/dashboard" class="button">Begin Your Journey</a>
    </div>
    
    <p>
      The work begins with Gate 1: BREATH—the foundation of presence and grounding. 
      Take your time. This is a journey of depth, not speed.
    </p>
    
    <p>
      Welcome to the House.<br>
      <em>Daniel Cruze, Founder</em>
    </p>
  `;

  const html = wrapEmailTemplate(content);
  
  await sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

export function wrapEmailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The 33rd House</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #0a0412;
      color: #f0e6d2;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(to bottom, #1a0f2e, #0a0412);
      border: 1px solid #9333ea;
      border-radius: 8px;
    }
    .header {
      text-align: center;
      padding: 40px 20px 20px;
      border-bottom: 1px solid #9333ea;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #9333ea, #d4af37);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: white;
      margin-bottom: 16px;
    }
    .header h1 {
      font-family: Georgia, serif;
      font-size: 28px;
      color: #d4af37;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
    }
    .content h2 {
      color: #d4af37;
      font-family: Georgia, serif;
      margin-top: 0;
    }
    .content p {
      color: #c4b5a0;
      margin: 16px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 32px;
      background: linear-gradient(135deg, #9333ea, #7c3aed);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      padding: 20px;
      border-top: 1px solid #9333ea;
      font-size: 12px;
      color: #8b7355;
    }
    .footer a {
      color: #d4af37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">33</div>
      <h1>The 33rd House</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>
        © ${new Date().getFullYear()} The 33rd House. All rights reserved.<br>
        <a href="https://the33rdhouse.com">Visit Website</a> | 
        <a href="https://the33rdhouse.com/unsubscribe">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
