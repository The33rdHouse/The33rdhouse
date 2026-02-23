import { describe, it, expect } from 'vitest';
import { Resend } from 'resend';

describe('Resend API Integration', () => {
  it('should validate Resend API key', async () => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Test by fetching API keys (lightweight endpoint)
    const { data, error } = await resend.apiKeys.list();
    
    console.log('Resend API Response:', { data, error });
    
    if (error) {
      throw new Error(`Resend API Error: ${JSON.stringify(error)}`);
    }
    
    expect(error).toBeNull();
    expect(data).toBeDefined();
  }, 10000);
});
