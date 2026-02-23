import { describe, it, expect } from 'vitest';
import * as ai from './_core/openai';

describe('OpenAI Integration', () => {
  it('should generate realm insight successfully', async () => {
    const result = await ai.generateRealmInsight({
      realmNumber: 1,
      realmName: 'The Threshold of Origin',
      theme: 'The first step into the unknown',
      userProgress: 0,
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(50);
  }, 30000); // 30 second timeout for API call

  it('should generate meditation guidance successfully', async () => {
    const result = await ai.generateMeditationGuidance({
      realmNumber: 1,
      realmName: 'The Threshold of Origin',
      practice: 'Breathwork, grounding meditation',
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(50);
  }, 30000);

  it('should answer spiritual questions successfully', async () => {
    const result = await ai.askSpiritualQuestion({
      question: 'What is the purpose of the 12 gates?',
      context: {
        currentGate: 1,
        userProgress: 0,
      },
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(50);
  }, 30000);
});
