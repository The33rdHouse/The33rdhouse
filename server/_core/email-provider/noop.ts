import type { EmailProvider, EmailSendInput, EmailSendResult } from './types';

export class NoopEmailProvider implements EmailProvider {
  readonly name = 'noop';

  async send(input: EmailSendInput): Promise<EmailSendResult> {
    console.warn(
      `[email:${this.name}] Skipping message to ${input.to} with subject: ${input.subject}`
    );

    return {
      success: false,
      id: 'email-disabled',
    };
  }
}
