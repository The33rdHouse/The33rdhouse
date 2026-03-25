import { NoopEmailProvider } from './noop';
import { ResendEmailProvider } from './resend';
import type { EmailProvider } from './types';

let memoizedProvider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (memoizedProvider) {
    return memoizedProvider;
  }

  const providerName = process.env.EMAIL_PROVIDER?.toLowerCase() || 'noop';

  if (providerName === 'resend') {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn('[email] EMAIL_PROVIDER=resend configured without RESEND_API_KEY. Falling back to noop.');
      memoizedProvider = new NoopEmailProvider();
      return memoizedProvider;
    }

    try {
      memoizedProvider = new ResendEmailProvider(apiKey);
      return memoizedProvider;
    } catch (error) {
      console.warn(
        `[email] Failed to initialize resend provider (${error instanceof Error ? error.message : 'unknown error'}). Falling back to noop.`
      );
      memoizedProvider = new NoopEmailProvider();
      return memoizedProvider;
    }
  }

  memoizedProvider = new NoopEmailProvider();
  return memoizedProvider;
}

export function resetEmailProviderForTests() {
  memoizedProvider = null;
}
