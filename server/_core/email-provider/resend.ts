import { createRequire } from 'module';
import type { EmailProvider, EmailSendInput, EmailSendResult } from './types';

const require = createRequire(import.meta.url);

type ResendClient = {
  emails: {
    send: (payload: {
      from: string;
      to: string;
      subject: string;
      html: string;
      text?: string;
    }) => Promise<{ data?: { id?: string } | null; error?: unknown }>;
  };
};

export class ResendEmailProvider implements EmailProvider {
  readonly name = 'resend';
  private client: ResendClient;

  constructor(apiKey: string) {
    let ResendCtor: new (key: string) => ResendClient;

    try {
      const mod = require('resend') as { Resend?: new (key: string) => ResendClient };
      if (!mod?.Resend) {
        throw new Error('Package loaded but Resend export is missing');
      }
      ResendCtor = mod.Resend;
    } catch {
      throw new Error('EMAIL_PROVIDER=resend configured but `resend` package is not installed');
    }

    this.client = new ResendCtor(apiKey);
  }

  async send(input: EmailSendInput): Promise<EmailSendResult> {
    const { data, error } = await this.client.emails.send({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      ...(input.text ? { text: input.text } : {}),
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      id: data?.id || `resend-${Date.now()}`,
    };
  }
}
