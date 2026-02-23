import { wrapEmailTemplate } from "./email";

/**
 * Welcome Email Sequence - 5 emails over 14 days
 */

export const welcomeSequence = {
  name: "Welcome to The 33rd House",
  description: "5-email onboarding sequence for new members",
  trigger: "user_signup" as const,
  emails: [
    {
      subject: "Welcome to The 33rd House - Your Journey Begins",
      delayDays: 0,
      orderIndex: 1,
      getHtml: (userName: string) => wrapEmailTemplate(`
        <h2>Welcome, ${userName}!</h2>
        <p>We're thrilled to have you join The 33rd House - a sacred space for consciousness transformation through the 12 Gates and 144 Realms.</p>
        
        <p>Over the next 500 years (metaphorically speaking!), you'll embark on an initiatic journey that weaves together:</p>
        <ul>
          <li><strong>The 12 Star Gates</strong> - Archetypal thresholds of transformation</li>
          <li><strong>The 144 Realms</strong> - Detailed maps of consciousness</li>
          <li><strong>The Inner Circle</strong> - 12-month guided curriculum</li>
          <li><strong>Guided Meditations</strong> - Audio practices for each realm</li>
        </ul>

        <p>Your dashboard is ready and waiting. Let's begin!</p>
        
        <a href="https://the33rdhouse.com/dashboard" class="button">Visit Your Dashboard</a>

        <p>With reverence and excitement,<br>
        The 33rd House Team</p>
      `),
      getText: (userName: string) => `
Welcome, ${userName}!

We're thrilled to have you join The 33rd House - a sacred space for consciousness transformation through the 12 Gates and 144 Realms.

Over the next 500 years (metaphorically speaking!), you'll embark on an initiatic journey that weaves together:
- The 12 Star Gates - Archetypal thresholds of transformation
- The 144 Realms - Detailed maps of consciousness
- The Inner Circle - 12-month guided curriculum
- Guided Meditations - Audio practices for each realm

Your dashboard is ready and waiting. Let's begin!

Visit Your Dashboard: https://the33rdhouse.com/dashboard

With reverence and excitement,
The 33rd House Team
      `.trim(),
    },
    {
      subject: "Understanding The System - Your Map to Transformation",
      delayDays: 3,
      orderIndex: 2,
      getHtml: (userName: string) => wrapEmailTemplate(`
        <h2>Hello ${userName},</h2>
        <p>Now that you've had a few days to explore, let's dive deeper into <strong>The System</strong> - the framework that holds everything together.</p>
        
        <p><strong>The 12 Gates</strong> represent archetypal thresholds you'll cross. Each gate has:</p>
        <ul>
          <li>A <em>Shadow</em> - the unconscious pattern to recognize</li>
          <li>A <em>Gift</em> - the emerging capacity</li>
          <li>A <em>Somatic Shift</em> - how it feels in your body</li>
          <li>A <em>Praxis</em> - daily practices to embody the transformation</li>
        </ul>

        <p><strong>The 144 Realms</strong> (12 per gate) offer granular maps with mythic, psychological, and hybrid layers.</p>

        <a href="https://the33rdhouse.com/system" class="button">Explore The System</a>

        <p>Take your time. This is a lifelong journey.</p>
        
        <p>Warmly,<br>
        The 33rd House</p>
      `),
      getText: (userName: string) => `
Hello ${userName},

Now that you've had a few days to explore, let's dive deeper into The System - the framework that holds everything together.

The 12 Gates represent archetypal thresholds you'll cross. Each gate has:
- A Shadow - the unconscious pattern to recognize
- A Gift - the emerging capacity
- A Somatic Shift - how it feels in your body
- A Praxis - daily practices to embody the transformation

The 144 Realms (12 per gate) offer granular maps with mythic, psychological, and hybrid layers.

Explore The System: https://the33rdhouse.com/system

Take your time. This is a lifelong journey.

Warmly,
The 33rd House
      `.trim(),
    },
    {
      subject: "Your First Gate Awaits - Begin the Journey",
      delayDays: 7,
      orderIndex: 3,
      getHtml: (userName: string) => wrapEmailTemplate(`
        <h2>Dear ${userName},</h2>
        <p>It's time to step through your <strong>First Gate</strong>.</p>
        
        <p>Each of the 12 Gates represents a major threshold in consciousness evolution. The first gate is often about <em>awakening</em> - recognizing that there's more to reality than what you've been taught.</p>

        <p><strong>This week's invitation:</strong></p>
        <ol>
          <li>Read about Gate 1 and its 12 realms</li>
          <li>Choose one realm that resonates with you</li>
          <li>Listen to the guided meditation for that realm</li>
          <li>Journal about what emerges</li>
        </ol>

        <a href="https://the33rdhouse.com/gates/1" class="button">Enter Gate 1</a>

        <p>Remember: there's no rush. Each gate takes as long as it takes.</p>
        
        <p>With you on the path,<br>
        The 33rd House</p>
      `),
      getText: (userName: string) => `
Dear ${userName},

It's time to step through your First Gate.

Each of the 12 Gates represents a major threshold in consciousness evolution. The first gate is often about awakening - recognizing that there's more to reality than what you've been taught.

This week's invitation:
1. Read about Gate 1 and its 12 realms
2. Choose one realm that resonates with you
3. Listen to the guided meditation for that realm
4. Journal about what emerges

Enter Gate 1: https://the33rdhouse.com/gates/1

Remember: there's no rush. Each gate takes as long as it takes.

With you on the path,
The 33rd House
      `.trim(),
    },
    {
      subject: "The Inner Circle - Your 12-Month Curriculum",
      delayDays: 10,
      orderIndex: 4,
      getHtml: (userName: string) => wrapEmailTemplate(`
        <h2>Hello ${userName},</h2>
        <p>You've been exploring the gates and realms on your own. Now let me introduce you to <strong>The Inner Circle</strong> - our structured 12-month curriculum.</p>
        
        <p>The Inner Circle is designed to guide you through all 12 Gates systematically, with:</p>
        <ul>
          <li><strong>Weekly teachings</strong> - Deep dives into each gate's themes</li>
          <li><strong>Practices</strong> - Somatic, contemplative, and creative exercises</li>
          <li><strong>Integration</strong> - Journaling prompts and reflection questions</li>
          <li><strong>Community</strong> - Connect with fellow travelers</li>
        </ul>

        <p>Each month focuses on one gate. Each week within that month explores a different dimension of the gate's teaching.</p>

        <a href="https://the33rdhouse.com/inner-circle" class="button">Join The Inner Circle</a>

        <p>This is where the real transformation happens.</p>
        
        <p>See you inside,<br>
        The 33rd House</p>
      `),
      getText: (userName: string) => `
Hello ${userName},

You've been exploring the gates and realms on your own. Now let me introduce you to The Inner Circle - our structured 12-month curriculum.

The Inner Circle is designed to guide you through all 12 Gates systematically, with:
- Weekly teachings - Deep dives into each gate's themes
- Practices - Somatic, contemplative, and creative exercises
- Integration - Journaling prompts and reflection questions
- Community - Connect with fellow travelers

Each month focuses on one gate. Each week within that month explores a different dimension of the gate's teaching.

Join The Inner Circle: https://the33rdhouse.com/inner-circle

This is where the real transformation happens.

See you inside,
The 33rd House
      `.trim(),
    },
    {
      subject: "Your Path Forward - Resources & Support",
      delayDays: 14,
      orderIndex: 5,
      getHtml: (userName: string) => wrapEmailTemplate(`
        <h2>Dear ${userName},</h2>
        <p>Two weeks in! How does it feel?</p>
        
        <p>By now you've explored the dashboard, learned about the system, stepped through your first gate, and discovered the Inner Circle. You're well on your way.</p>

        <p><strong>Here's what to remember:</strong></p>
        <ul>
          <li><strong>Go at your own pace</strong> - This is a 500-year journey, not a sprint</li>
          <li><strong>Trust the process</strong> - Transformation happens in spirals, not straight lines</li>
          <li><strong>Use the meditations</strong> - They're designed to support your integration</li>
          <li><strong>Journal regularly</strong> - Your insights are the real curriculum</li>
        </ul>

        <p><strong>Need support?</strong> Reply to this email anytime. We're here for you.</p>

        <a href="https://the33rdhouse.com/dashboard" class="button">Continue Your Journey</a>

        <p>With deep respect for your path,<br>
        The 33rd House Team</p>
      `),
      getText: (userName: string) => `
Dear ${userName},

Two weeks in! How does it feel?

By now you've explored the dashboard, learned about the system, stepped through your first gate, and discovered the Inner Circle. You're well on your way.

Here's what to remember:
- Go at your own pace - This is a 500-year journey, not a sprint
- Trust the process - Transformation happens in spirals, not straight lines
- Use the meditations - They're designed to support your integration
- Journal regularly - Your insights are the real curriculum

Need support? Reply to this email anytime. We're here for you.

Continue Your Journey: https://the33rdhouse.com/dashboard

With deep respect for your path,
The 33rd House Team
      `.trim(),
    },
  ],
};

/**
 * Milestone Email Templates
 */

export function getRealmCompletedEmail(userName: string, realmNumber: number, realmName: string) {
  return {
    subject: `Realm ${realmNumber} Complete: ${realmName}`,
    html: wrapEmailTemplate(`
      <h2>Congratulations, ${userName}!</h2>
      <p>You've completed <strong>Realm ${realmNumber}: ${realmName}</strong>.</p>
      
      <p>Each realm you traverse deepens your understanding of the gate's teaching. You're building a living map of consciousness within yourself.</p>

      <p><strong>What's next?</strong></p>
      <ul>
        <li>Take time to integrate what you've learned</li>
        <li>Journal about your experience</li>
        <li>When ready, move to the next realm</li>
      </ul>

      <a href="https://the33rdhouse.com/realms" class="button">View All Realms</a>

      <p>Honoring your progress,<br>
      The 33rd House</p>
    `),
    text: `
Congratulations, ${userName}!

You've completed Realm ${realmNumber}: ${realmName}.

Each realm you traverse deepens your understanding of the gate's teaching. You're building a living map of consciousness within yourself.

What's next?
- Take time to integrate what you've learned
- Journal about your experience
- When ready, move to the next realm

View All Realms: https://the33rdhouse.com/realms

Honoring your progress,
The 33rd House
    `.trim(),
  };
}

export function getGateCompletedEmail(userName: string, gateNumber: number, gateName: string) {
  return {
    subject: `Gate ${gateNumber} Complete: ${gateName} - A Major Threshold Crossed`,
    html: wrapEmailTemplate(`
      <h2>🎉 Incredible, ${userName}!</h2>
      <p>You've crossed <strong>Gate ${gateNumber}: ${gateName}</strong>.</p>
      
      <p>Completing a full gate is a significant milestone. You've traversed all 12 realms within this archetypal threshold. The transformation is real and embodied.</p>

      <p><strong>Take time to celebrate:</strong></p>
      <ul>
        <li>Review your journal entries from this gate</li>
        <li>Notice how you've changed</li>
        <li>Share your insights with the community</li>
        <li>Rest before beginning the next gate</li>
      </ul>

      <a href="https://the33rdhouse.com/gates" class="button">View Your Progress</a>

      <p>With deep respect,<br>
      The 33rd House</p>
    `),
    text: `
🎉 Incredible, ${userName}!

You've crossed Gate ${gateNumber}: ${gateName}.

Completing a full gate is a significant milestone. You've traversed all 12 realms within this archetypal threshold. The transformation is real and embodied.

Take time to celebrate:
- Review your journal entries from this gate
- Notice how you've changed
- Share your insights with the community
- Rest before beginning the next gate

View Your Progress: https://the33rdhouse.com/gates

With deep respect,
The 33rd House
    `.trim(),
  };
}
