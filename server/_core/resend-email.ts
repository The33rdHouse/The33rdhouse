import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'The 33rd House <noreply@the33rdhouse.com>';

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(params: {
  to: string;
  customerName: string;
  orderNumber: string;
  items: Array<{ title: string; price: number; quantity: number }>;
  total: number;
}) {
  const { to, customerName, orderNumber, items, total } = params;
  
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.title}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price / 100).toFixed(2)}</td>
    </tr>
  `).join('');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Order Confirmed</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Thank you for your purchase!</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px;">
        <p>Dear ${customerName},</p>
        
        <p>Your order has been confirmed and is being processed. You'll receive your digital books via email shortly.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
        </div>
        
        <h2 style="color: #667eea; margin-top: 30px;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #667eea;">Item</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #667eea;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr style="font-weight: bold; background: #f8f9fa;">
              <td style="padding: 12px;">Total</td>
              <td style="padding: 12px; text-align: right;">$${(total / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        
        <p>If you have any questions, please don't hesitate to reach out to us.</p>
        
        <p style="margin-top: 30px;">Blessings on your journey,<br><strong>The 33rd House</strong></p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} The 33rd House. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
  
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Order Confirmation #${orderNumber}`,
    html,
  });
  
  if (error) {
    console.error('Failed to send order confirmation:', error);
    throw error;
  }
  
  return data;
}

/**
 * Send Chartography booking confirmation email
 */
export async function sendChartographyConfirmation(params: {
  to: string;
  customerName: string;
  bookingNumber: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  deliveryDate: string;
}) {
  const { to, customerName, bookingNumber, birthDate, birthTime, birthLocation, deliveryDate } = params;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Chartography Reading Confirmed</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Chartography Reading Confirmed</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your cosmic map is being prepared</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px;">
        <p>Dear ${customerName},</p>
        
        <p>Thank you for booking your Chartography reading with The 33rd House. Your personalized cosmic map is being prepared by our licensed practitioner.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Booking Number:</strong> ${bookingNumber}</p>
          <p style="margin: 0 0 10px 0;"><strong>Expected Delivery:</strong> ${deliveryDate}</p>
        </div>
        
        <h2 style="color: #667eea; margin-top: 30px;">Your Birth Details</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong> ${birthDate}</li>
          <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Time:</strong> ${birthTime}</li>
          <li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Location:</strong> ${birthLocation}</li>
        </ul>
        
        <h2 style="color: #667eea; margin-top: 30px;">What to Expect</h2>
        <p>Your Chartography reading will include:</p>
        <ul>
          <li>Complete birth chart analysis mapped to the 12 Gates</li>
          <li>Identification of your primary gate and current realm</li>
          <li>Shadow integration opportunities specific to your chart</li>
          <li>Personalized practices for your transformation journey</li>
          <li>PDF report with visual charts and detailed interpretations</li>
        </ul>
        
        <p>You'll receive your complete reading via email within 7-10 business days.</p>
        
        <p style="margin-top: 30px;">Blessings on your journey,<br><strong>The 33rd House</strong></p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} The 33rd House. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
  
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Chartography Reading Confirmed #${bookingNumber}`,
    html,
  });
  
  if (error) {
    console.error('Failed to send chartography confirmation:', error);
    throw error;
  }
  
  return data;
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
}) {
  const { to, name } = params;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to The 33rd House</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Welcome to The 33rd House</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your transformation journey begins now</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 10px 10px;">
        <p>Dear ${name},</p>
        
        <p>Welcome to The 33rd House—a 500-year transmission vehicle for consciousness transformation.</p>
        
        <p>You've taken the first step on a profound journey through the 12 Gates and 144 Realms of awakening. This is not just a course—it's a complete map of consciousness validated by 3,000 years of sacred wisdom.</p>
        
        <h2 style="color: #667eea; margin-top: 30px;">Your Next Steps</h2>
        <ol>
          <li style="margin-bottom: 15px;"><strong>Explore the 12 Gates:</strong> Begin with Gate 1 (BREATH) and move sequentially through the system</li>
          <li style="margin-bottom: 15px;"><strong>Join the Inner Circle:</strong> Access monthly teachings and weekly practices (Seeker tier and above)</li>
          <li style="margin-bottom: 15px;"><strong>Book a Chartography Reading:</strong> Get your personalized cosmic map and transformation roadmap</li>
          <li style="margin-bottom: 15px;"><strong>Browse the Sacred Library:</strong> Explore 71 books organized by the 12 Gates</li>
        </ol>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://the33rdhouse.com/system" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Explore the System</a>
        </div>
        
        <p>Remember: This is a spiral path. You'll return to the beginning, but at a higher level. Trust the process.</p>
        
        <p style="margin-top: 30px;">Blessings on your journey,<br><strong>The 33rd House</strong></p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} The 33rd House. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
  
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Welcome to The 33rd House',
    html,
  });
  
  if (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
  
  return data;
}
