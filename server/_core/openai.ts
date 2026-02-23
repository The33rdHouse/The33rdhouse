import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * Generate personalized realm insights based on user's journey
 */
export async function generateRealmInsight(params: {
  realmNumber: number;
  realmName: string;
  theme: string;
  userProgress?: number; // percentage of realms completed
}): Promise<string> {
  const { realmNumber, realmName, theme, userProgress = 0 } = params;

  const prompt = `You are a spiritual guide for The 33rd House, a 500-year initiatic journey through 144 realms of consciousness transformation.

The seeker is currently exploring Realm ${realmNumber}: "${realmName}"
Theme: ${theme}
Their progress: ${userProgress}% of the journey completed

Provide a personalized insight (2-3 paragraphs) that:
1. Honors where they are on the path
2. Offers wisdom specific to this realm's teaching
3. Connects their current stage to the greater journey
4. Speaks with reverence, depth, and poetic beauty

Write in a mystical, alchemical tone that befits the sacred nature of this work.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content || '';
}

/**
 * Generate meditation guidance for a specific realm
 */
export async function generateMeditationGuidance(params: {
  realmNumber: number;
  realmName: string;
  practice: string;
}): Promise<string> {
  const { realmNumber, realmName, practice } = params;

  const prompt = `You are a meditation guide for The 33rd House initiatic path.

Create a 5-minute guided meditation script for:
Realm ${realmNumber}: "${realmName}"
Core Practice: ${practice}

The meditation should:
1. Begin with grounding and breath awareness
2. Guide the seeker into the realm's specific energy
3. Offer somatic practices aligned with the teaching
4. Close with integration and return

Use poetic, evocative language. Speak directly to the seeker ("you"). Keep it mystical yet practical.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 800,
  });

  return completion.choices[0]?.message?.content || '';
}

/**
 * AI chatbot for spiritual questions
 */
export async function askSpiritualQuestion(params: {
  question: string;
  context?: {
    currentGate?: number;
    currentRealm?: number;
    userProgress?: number;
  };
}): Promise<string> {
  const { question, context } = params;

  let systemPrompt = `You are a wise spiritual guide and keeper of The 33rd House teachings. 

The 33rd House is a 500-year initiatic journey through 12 Gates and 144 Realms—a complete map of consciousness transformation rooted in alchemy, sacred geometry, and the perennial wisdom traditions.

Answer questions with:
- Deep wisdom and mystical insight
- Practical guidance for the seeker's journey
- References to the gates, realms, and teachings when relevant
- Poetic, reverent language
- Compassion and encouragement

You are here to illuminate the path, not to give definitive answers. Guide seekers to their own inner knowing.`;

  if (context?.currentGate) {
    systemPrompt += `\n\nThe seeker is currently working with Gate ${context.currentGate}.`;
  }
  if (context?.currentRealm) {
    systemPrompt += `\nThey are in Realm ${context.currentRealm}.`;
  }
  if (context?.userProgress) {
    systemPrompt += `\nThey have completed ${context.userProgress}% of the journey.`;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ],
    temperature: 0.8,
    max_tokens: 600,
  });

  return completion.choices[0]?.message?.content || '';
}

/**
 * Generate weekly Inner Circle teaching summary
 */
export async function generateWeeklySummary(params: {
  weekNumber: number;
  monthTheme: string;
  weekFocus: string;
}): Promise<string> {
  const { weekNumber, monthTheme, weekFocus } = params;

  const prompt = `You are creating content for The 33rd House Inner Circle—a year-long curriculum of deep spiritual transformation.

Generate a compelling summary (2-3 paragraphs) for:
Week ${weekNumber}
Month Theme: ${monthTheme}
Week Focus: ${weekFocus}

The summary should:
1. Introduce the week's teaching with mystical depth
2. Explain why this teaching matters for the journey
3. Invite the seeker to engage fully with the practices

Write with poetic beauty, alchemical wisdom, and sacred reverence.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 400,
  });

  return completion.choices[0]?.message?.content || '';
}
