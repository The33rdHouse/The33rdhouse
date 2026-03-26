import { afterEach, describe, expect, it } from 'vitest';
import { sendEmail } from '../_core/email';
import { resetEmailProviderForTests } from '../_core/email-provider';

describe('Email provider fallback', () => {
  afterEach(() => {
    delete process.env.EMAIL_PROVIDER;
    delete process.env.RESEND_API_KEY;
    resetEmailProviderForTests();
  });

  it('uses noop provider by default', async () => {
    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Fallback test',
      html: '<p>hi</p>',
    });

    expect(result.success).toBe(false);
    expect(result.id).toBe('email-disabled');
    expect(result.provider).toBe('noop');
  });

  it('falls back to noop when resend is configured without key', async () => {
    process.env.EMAIL_PROVIDER = 'resend';

    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Fallback test',
      html: '<p>hi</p>',
    });

    expect(result.success).toBe(false);
    expect(result.provider).toBe('noop');
  });
});
