import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../.data/sqlite.db');
const db = new Database(dbPath);

// Month themes and gates
const monthData = [
  { month: 1, gate: 1, title: "Presence & Grounding", theme: "BREATH - The foundation of all transformation is presence", focus: "embodiment, nervous system regulation, somatic awareness" },
  { month: 2, gate: 2, title: "Regulation & Flow", theme: "MOTION - Learning to move with life rather than against it", focus: "emotional flow, energy management, rhythmic living" },
  { month: 3, gate: 3, title: "Identity & Boundaries", theme: "FORM - Identity is built, not found", focus: "self-definition, boundaries, personal standards" },
  { month: 4, gate: 4, title: "Power & Will", theme: "POWER - Reclaiming sovereign authority over your life", focus: "personal power, will, authority, sovereignty" },
  { month: 5, gate: 5, title: "Connection & Relationship", theme: "CONNECTION - The sacred bonds that weave existence into unity", focus: "authentic relating, attachment, interdependence" },
  { month: 6, gate: 6, title: "Shadow & Reflection", theme: "REFLECTION - The mirror that reveals hidden depths", focus: "shadow work, projection, integration, self-honesty" },
  { month: 7, gate: 7, title: "Union & Integration", theme: "UNION - The sacred marriage of opposites", focus: "inner marriage, polarity, alchemy, wholeness" },
  { month: 8, gate: 8, title: "Death & Rebirth", theme: "DEATH & REBIRTH - The transformative cycle of endings and beginnings", focus: "letting go, void, emergence, transformation" },
  { month: 9, gate: 9, title: "Vision & Clarity", theme: "VISION - Awakened sight that perceives beyond the veil", focus: "inner vision, intuition, prophecy, clarity" },
  { month: 10, gate: 10, title: "Law & Order", theme: "LAW - Divine order that structures existence", focus: "natural law, personal code, justice, discipline" },
  { month: 11, gate: 11, title: "Paradox & Mystery", theme: "PARADOX - Transcendent truth that holds all contradictions", focus: "paradox, mystery, transcendence, the unknowable" },
  { month: 12, gate: 12, title: "Return & Completion", theme: "RETURN - The completion of the journey and homecoming to source", focus: "integration, mastery, service, completion" }
];

// Week structures for each month
const weekStructures = [
  // Month 1 - Presence & Grounding
  [
    { title: "Emotional Awareness", subtitle: "What Am I Actually Feeling?", core: "emotional literacy, feeling states, body sensations" },
    { title: "Pattern & Nervous System", subtitle: "Why Do I React This Way?", core: "nervous system states, trauma responses, regulation" },
    { title: "Boundaries & Identity", subtitle: "What Do I Allow & What Don't I?", core: "boundary setting, self-definition, personal limits" },
    { title: "Integration & Momentum", subtitle: "How Do I Keep This Going?", core: "practice integration, habit formation, sustainable change" }
  ],
  // Month 2 - Regulation & Flow
  [
    { title: "Nervous System Regulation", subtitle: "How Do I Stay Calm?", core: "vagal tone, co-regulation, self-soothing" },
    { title: "Emotional Flow", subtitle: "Letting Feelings Move Through", core: "emotional processing, energy in motion, release" },
    { title: "Energy Management", subtitle: "Working With Your Natural Rhythms", core: "circadian rhythms, energy cycles, rest" },
    { title: "Integration Practice", subtitle: "Building Sustainable Flow", core: "flow states, sustainable practices, rhythm" }
  ],
  // Month 3 - Identity & Boundaries
  [
    { title: "Identity", subtitle: "Who Am I When I'm Honest?", core: "authentic self, self-concept, identity construction" },
    { title: "Boundaries", subtitle: "What I Allow & What I Don't", core: "energetic boundaries, relational boundaries, self-protection" },
    { title: "Standards", subtitle: "What I Expect From Myself", core: "personal standards, self-respect, integrity" },
    { title: "Form", subtitle: "The Structure of Who I Am Now", core: "embodied identity, structural integrity, form" }
  ],
  // Month 4 - Power & Will
  [
    { title: "Personal Power", subtitle: "Where Did I Give It Away?", core: "power reclamation, agency, self-authority" },
    { title: "Will & Choice", subtitle: "Choosing Consciously", core: "conscious choice, willpower, intentionality" },
    { title: "Authority", subtitle: "Standing In Your Truth", core: "inner authority, self-trust, conviction" },
    { title: "Sovereignty", subtitle: "Self-Governance", core: "personal sovereignty, self-rule, autonomy" }
  ],
  // Month 5 - Connection & Relationship
  [
    { title: "Authentic Connection", subtitle: "Being Real With Others", core: "vulnerability, authenticity, genuine relating" },
    { title: "Healthy Attachment", subtitle: "Secure Relating", core: "attachment styles, secure bonding, relational safety" },
    { title: "Interdependence", subtitle: "Together But Not Enmeshed", core: "healthy interdependence, autonomy in relationship" },
    { title: "Sacred Bonds", subtitle: "Deep Relationship", core: "sacred relating, soul connections, depth" }
  ],
  // Month 6 - Shadow & Reflection
  [
    { title: "Shadow Work Basics", subtitle: "What Am I Not Seeing?", core: "shadow recognition, blind spots, unconscious patterns" },
    { title: "Projection", subtitle: "What I See In Others", core: "projection mechanics, mirror work, ownership" },
    { title: "Integration", subtitle: "Reclaiming Lost Parts", core: "shadow integration, wholeness, reclamation" },
    { title: "Self-Honesty", subtitle: "The Truth I've Been Avoiding", core: "radical honesty, self-truth, facing reality" }
  ],
  // Month 7 - Union & Integration
  [
    { title: "Inner Marriage", subtitle: "Masculine & Feminine Within", core: "inner polarity, anima/animus, internal union" },
    { title: "Polarity", subtitle: "Working With Opposites", core: "polarity dynamics, tension, complementarity" },
    { title: "Alchemy", subtitle: "Transformation Through Union", core: "alchemical marriage, transformation, synthesis" },
    { title: "Wholeness", subtitle: "Becoming Complete", core: "integration, wholeness, completion" }
  ],
  // Month 8 - Death & Rebirth
  [
    { title: "Letting Go", subtitle: "What Needs To Die?", core: "release, surrender, death of old forms" },
    { title: "The Void", subtitle: "Sitting In The Unknown", core: "emptiness, void, liminal space" },
    { title: "Emergence", subtitle: "What Wants To Be Born?", core: "new forms, emergence, becoming" },
    { title: "Rebirth", subtitle: "Stepping Into The New", core: "rebirth, renewal, new identity" }
  ],
  // Month 9 - Vision & Clarity
  [
    { title: "Inner Vision", subtitle: "Seeing What's True", core: "inner sight, truth perception, discernment" },
    { title: "Intuition", subtitle: "Trusting Your Knowing", core: "intuitive knowing, body wisdom, inner guidance" },
    { title: "Prophecy", subtitle: "Reading The Signs", core: "pattern recognition, foresight, symbolic vision" },
    { title: "Clarity", subtitle: "Seeing Clearly", core: "mental clarity, vision, clear seeing" }
  ],
  // Month 10 - Law & Order
  [
    { title: "Natural Law", subtitle: "How Reality Works", core: "universal principles, natural order, cosmic law" },
    { title: "Personal Code", subtitle: "Your Own Rules", core: "personal ethics, code of conduct, values" },
    { title: "Justice", subtitle: "Right Relationship", core: "justice, balance, right action" },
    { title: "Order", subtitle: "Structure & Discipline", core: "discipline, structure, order" }
  ],
  // Month 11 - Paradox & Mystery
  [
    { title: "Paradox", subtitle: "Both/And Thinking", core: "paradoxical thinking, holding opposites, complexity" },
    { title: "Mystery", subtitle: "Embracing The Unknown", core: "mystery, unknowing, sacred uncertainty" },
    { title: "Transcendence", subtitle: "Beyond Duality", core: "non-dual awareness, transcendence, unity" },
    { title: "Enigma", subtitle: "The Unknowable", core: "the ineffable, mystery, beyond comprehension" }
  ],
  // Month 12 - Return & Completion
  [
    { title: "Integration", subtitle: "Bringing It All Together", core: "synthesis, integration, wholeness" },
    { title: "Mastery", subtitle: "Embodying The Work", core: "embodied mastery, lived wisdom, integration" },
    { title: "Service", subtitle: "Giving Back", core: "service, contribution, giving" },
    { title: "Completion", subtitle: "The Journey Home", core: "completion, return, homecoming" }
  ]
];

// Generate Men's Path content
function generateMensPath(monthNum, weekNum, weekData, monthInfo) {
  const weekIndex = weekNum - 1;
  
  const videoScript = `# Week ${weekNum}: ${weekData.title}
## ${weekData.subtitle}

### Opening (2 minutes)

Brothers, welcome to Week ${weekNum} of Month ${monthNum}: ${monthInfo.title}.

This week we're exploring ${weekData.title} through the masculine lens—the lens of structure, direction, and conscious action. ${weekData.subtitle}

The masculine path is about building, protecting, and directing. It's about knowing your edge, holding your ground, and moving with purpose.

### Core Teaching (8-12 minutes)

**The Masculine Principle of ${weekData.title}**

${weekData.core.split(',').map(concept => `
The masculine approach to ${concept.trim()} is about STRUCTURE and DIRECTION:
- You don't wait to feel ready—you build readiness through action
- You don't hope for clarity—you create clarity through decision
- You don't seek permission—you claim authority through responsibility

This is the warrior's path: conscious, intentional, directed.
`).join('\n')}

**The Shadow Side**

The masculine shadow around ${weekData.title} shows up as:
- Rigidity instead of strength
- Control instead of direction
- Domination instead of leadership
- Isolation instead of independence

We're not here to be tyrants. We're here to be kings—sovereign, responsible, and in service to something greater than ourselves.

**The Practice**

This week, your work is to embody ${weekData.title} through:
1. **Morning Practice**: Set your intention. What are you building today?
2. **Daily Action**: Take one concrete step toward your edge
3. **Evening Reflection**: Did you hold your ground? Where did you compromise?

### Integration (3-5 minutes)

The masculine doesn't just understand—it DOES.

Your homework this week:
- Identify one area where you've been passive
- Make one decision you've been avoiding
- Hold one boundary you've been letting slide

This isn't about being harsh. It's about being CLEAR.

The world needs men who know who they are, what they stand for, and where they're going.

Be that man.

### Closing

Remember: The masculine path is not about perfection. It's about direction.

You don't need to have it all figured out. You just need to keep moving forward with integrity.

See you next week, brothers.`;

  const somaticPractice = `# Somatic Practice: ${weekData.title} (Men's Path)

## Setup (1 minute)
Stand with feet shoulder-width apart. Feel your connection to the ground. This is your foundation.

## Practice (5-8 minutes)

### Grounding (2 minutes)
- Feel the weight of your body pressing into the earth
- Imagine roots growing from your feet deep into the ground
- This is your stability. Your unshakeable foundation.

### Activation (3 minutes)
- Bring awareness to your core—your center of power
- On the inhale, gather energy into your center
- On the exhale, direct that energy outward with intention
- Feel the difference between scattered energy and directed force

### Integration (2 minutes)
- Stand in your full presence
- Feel your edges—where you end and the world begins
- Practice saying "Yes" with your whole body
- Practice saying "No" with your whole body
- Notice the clarity of embodied decision

### Closing (1 minute)
- Return to neutral stance
- Feel your strength, your stability, your direction
- Carry this clarity into your day

**Key Principle**: The masculine body is a temple of directed force. Not aggressive, but clear. Not rigid, but strong.`;

  const dailyHomework = `# Daily Homework: ${weekData.title} (Men's Path)

## Day 1: Awareness
**Morning**: Identify one area of your life where you lack clarity or direction
**Evening**: Journal - "Where am I being passive when I should be active?"

## Day 2: Decision
**Morning**: Make one decision you've been avoiding (even a small one)
**Evening**: Reflect - "What changed when I stopped waiting and started deciding?"

## Day 3: Boundary
**Morning**: Identify one boundary you need to set or reinforce
**Evening**: Practice - Actually set that boundary (in person, text, or email)

## Day 4: Action
**Morning**: Take one concrete action toward your edge
**Evening**: Notice - "What resistance came up? What opened up?"

## Day 5: Integrity
**Morning**: Check alignment - Are your actions matching your values?
**Evening**: Adjust - Where do you need to course-correct?

## Day 6: Strength
**Morning**: Do something physically challenging (workout, cold shower, etc.)
**Evening**: Reflect - "How does physical strength relate to emotional/mental strength?"

## Day 7: Integration
**Morning**: Review the week - What shifted?
**Evening**: Commitment - What practice will you continue?

**Remember**: The masculine path is built through consistent, intentional action. Small steps, taken daily, build kingdoms.`;

  const engagementQuestions = `# Engagement Questions: ${weekData.title} (Men's Path)

## For Personal Reflection
1. Where in my life am I being passive when I should be taking action?
2. What decision have I been avoiding, and what's the real cost of that avoidance?
3. Where do I confuse being "nice" with being weak?
4. What boundary do I need to set that I've been afraid to set?
5. Where am I seeking external permission instead of claiming my own authority?

## For Group Discussion
1. How do we distinguish between healthy masculine strength and toxic rigidity?
2. What does it mean to be a "king" in your own life?
3. Where have you seen men confuse dominance with leadership?
4. How do we hold boundaries without becoming closed off?
5. What role does vulnerability play in the masculine path?

## For Deeper Inquiry
1. What did your father teach you (explicitly or implicitly) about being a man?
2. Where are you still operating from someone else's definition of masculinity?
3. What would it look like to be fully sovereign in your own life?
4. How do you balance strength with tenderness, direction with flexibility?
5. What is your edge right now, and what's keeping you from it?

**Core Question**: What kind of man are you becoming, and is that the man you want to be?`;

  return {
    videoScript,
    somaticPractice,
    dailyHomework,
    engagementQuestions
  };
}

// Generate Women's Path content
function generateWomensPath(monthNum, weekNum, weekData, monthInfo) {
  const weekIndex = weekNum - 1;
  
  const videoScript = `# Week ${weekNum}: ${weekData.title}
## ${weekData.subtitle}

### Opening (2 minutes)

Sisters, welcome to Week ${weekNum} of Month ${monthNum}: ${monthInfo.title}.

This week we're exploring ${weekData.title} through the feminine lens—the lens of receptivity, intuition, and cyclical wisdom. ${weekData.subtitle}

The feminine path is about feeling, receiving, and allowing. It's about trusting your inner knowing, honoring your cycles, and moving with the natural flow of life.

### Core Teaching (8-12 minutes)

**The Feminine Principle of ${weekData.title}**

${weekData.core.split(',').map(concept => `
The feminine approach to ${concept.trim()} is about RECEPTIVITY and FLOW:
- You don't force—you allow
- You don't push—you receive
- You don't control—you trust
- You don't override your body—you listen to it

This is the priestess's path: intuitive, cyclical, embodied.
`).join('\n')}

**The Shadow Side**

The feminine shadow around ${weekData.title} shows up as:
- Passivity instead of receptivity
- Chaos instead of flow
- Manipulation instead of influence
- Martyrdom instead of service

We're not here to be doormats. We're here to be queens—sovereign, powerful, and deeply connected to our inner wisdom.

**The Practice**

This week, your work is to embody ${weekData.title} through:
1. **Morning Practice**: Check in with your body. What is she telling you?
2. **Daily Attunement**: Notice your cycles—energy, emotion, creativity
3. **Evening Reflection**: Where did you honor yourself? Where did you override yourself?

### Integration (3-5 minutes)

The feminine doesn't just do—it BECOMES.

Your homework this week:
- Track your energy cycles (when are you most creative? Most tired?)
- Honor one "no" that your body is giving you
- Follow one intuitive hit without needing to justify it

This isn't about being soft. It's about being WISE.

The world needs women who trust themselves, honor their cycles, and move from deep inner knowing.

Be that woman.

### Closing

Remember: The feminine path is not about perfection. It's about presence.

You don't need to have it all figured out. You just need to stay connected to your truth.

See you next week, sisters.`;

  const somaticPractice = `# Somatic Practice: ${weekData.title} (Women's Path)

## Setup (1 minute)
Find a comfortable seated or lying position. Place your hands on your belly. This is your center of wisdom.

## Practice (5-8 minutes)

### Grounding (2 minutes)
- Feel the support beneath you—you are held
- Soften your jaw, your shoulders, your belly
- This is your permission to receive, to rest, to be

### Attunement (3 minutes)
- Bring awareness to your womb space (even if you don't have a physical womb)
- This is your creative center, your intuitive knowing
- On the inhale, receive energy, wisdom, nourishment
- On the exhale, release what's no longer needed
- Feel the natural rhythm of receiving and releasing

### Integration (2 minutes)
- Scan your body from head to toe
- Where are you holding tension? Where are you flowing?
- Ask your body: "What do you need right now?"
- Listen without judgment. Just receive the answer.

### Closing (1 minute)
- Place both hands on your heart
- Thank your body for her wisdom
- Carry this connection into your day

**Key Principle**: The feminine body is a temple of wisdom. Not weak, but receptive. Not passive, but deeply attuned.`;

  const dailyHomework = `# Daily Homework: ${weekData.title} (Women's Path)

## Day 1: Awareness
**Morning**: Check in with your body—how do you feel today? (Energized, tired, creative, withdrawn?)
**Evening**: Journal - "What was my body trying to tell me today?"

## Day 2: Cycles
**Morning**: Track where you are in your cycle (menstrual, lunar, or seasonal)
**Evening**: Reflect - "How does this phase of my cycle affect my energy and needs?"

## Day 3: Intuition
**Morning**: Ask your intuition one question and listen for the answer
**Evening**: Practice - Follow one intuitive hit without needing to justify it

## Day 4: Boundaries
**Morning**: Identify one "no" your body is giving you
**Evening**: Honor - Actually say no to that thing (person, activity, obligation)

## Day 5: Receiving
**Morning**: Practice receiving (a compliment, help, support) without deflecting
**Evening**: Notice - "What makes it hard for me to receive?"

## Day 6: Creativity
**Morning**: Do something creative without a goal (dance, paint, write, sing)
**Evening**: Reflect - "What wants to be expressed through me?"

## Day 7: Integration
**Morning**: Review the week - What did you learn about your rhythms?
**Evening**: Commitment - What practice will you continue?

**Remember**: The feminine path is built through attunement and trust. Listen to your body. She knows.`;

  const engagementQuestions = `# Engagement Questions: ${weekData.title} (Women's Path)

## For Personal Reflection
1. Where in my life am I forcing when I should be allowing?
2. What is my body trying to tell me that I've been ignoring?
3. Where do I confuse being "strong" with overriding my needs?
4. What intuitive knowing have I been dismissing as "just a feeling"?
5. Where am I giving from depletion instead of overflow?

## For Group Discussion
1. How do we distinguish between healthy feminine receptivity and passive victimhood?
2. What does it mean to be a "queen" in your own life?
3. Where have you seen women confuse self-sacrifice with service?
4. How do we honor our cycles in a world that demands constant productivity?
5. What role does structure play in the feminine path?

## For Deeper Inquiry
1. What did your mother teach you (explicitly or implicitly) about being a woman?
2. Where are you still operating from someone else's definition of femininity?
3. What would it look like to fully trust your own inner knowing?
4. How do you balance softness with strength, receptivity with boundaries?
5. What is your body asking for right now, and what's keeping you from giving it to her?

**Core Question**: What kind of woman are you becoming, and is that the woman you want to be?`;

  return {
    videoScript,
    somaticPractice,
    dailyHomework,
    engagementQuestions
  };
}

// Generate Dual Path content
function generateDualPath(monthNum, weekNum, weekData, monthInfo) {
  const weekIndex = weekNum - 1;
  
  const videoScript = `# Week ${weekNum}: ${weekData.title}
## ${weekData.subtitle}

### Opening (2 minutes)

Welcome to Week ${weekNum} of Month ${monthNum}: ${monthInfo.title}.

This week we're exploring ${weekData.title} through the integrated lens—the lens that honors both masculine and feminine, structure and flow, doing and being. ${weekData.subtitle}

The dual path is about wholeness. It's about knowing when to push and when to yield, when to act and when to receive, when to speak and when to listen.

### Core Teaching (8-12 minutes)

**The Integrated Principle of ${weekData.title}**

${weekData.core.split(',').map(concept => `
The integrated approach to ${concept.trim()} requires BOTH:
- Masculine: Structure, direction, conscious action
- Feminine: Flow, receptivity, intuitive knowing
- Integration: Knowing which energy to embody in each moment

This is the alchemist's path: holding both, transcending both, becoming whole.
`).join('\n')}

**The Shadow Side**

The shadow of the dual path shows up as:
- Confusion instead of integration
- Inconsistency instead of flexibility
- Spiritual bypassing instead of embodied wholeness
- Trying to be "balanced" instead of being authentic

We're not here to be perfectly balanced. We're here to be WHOLE—which means having access to all parts of ourselves.

**The Practice**

This week, your work is to embody ${weekData.title} through:
1. **Morning Practice**: Which energy do you need today—masculine or feminine?
2. **Daily Awareness**: Notice when you're over-relying on one energy
3. **Evening Reflection**: Where did you find integration? Where did you fragment?

### Integration (3-5 minutes)

The dual path is about CHOICE.

Your homework this week:
- Identify one area where you're stuck in masculine energy (pushing, forcing, controlling)
- Identify one area where you're stuck in feminine energy (passive, waiting, avoiding)
- Practice consciously shifting between energies as needed

This isn't about being everything to everyone. It's about having access to your FULL range.

The world needs whole humans who can be both strong and soft, both directed and receptive, both structured and flowing.

Be that human.

### Closing

Remember: The dual path is not about perfection. It's about integration.

You don't need to be perfectly balanced. You just need to be authentically whole.

See you next week.`;

  const somaticPractice = `# Somatic Practice: ${weekData.title} (Dual Path)

## Setup (1 minute)
Stand or sit in a comfortable position. Feel both your groundedness and your openness.

## Practice (5-8 minutes)

### Masculine Activation (2 minutes)
- Stand tall, feet grounded, spine straight
- Feel your edges, your boundaries, your strength
- On the inhale, gather power into your core
- On the exhale, direct that power outward with intention
- This is your masculine: clear, strong, directed

### Feminine Activation (2 minutes)
- Soften your stance, relax your shoulders, open your heart
- Feel your receptivity, your flow, your wisdom
- On the inhale, receive energy from all around you
- On the exhale, release what's no longer needed
- This is your feminine: open, flowing, receptive

### Integration (3 minutes)
- Now practice moving between both
- Feel the strength AND the softness
- Feel the direction AND the flow
- Notice: You contain both. You ARE both.
- Practice embodying whichever energy the moment calls for

### Closing (1 minute)
- Return to center
- Feel your wholeness—not split, but integrated
- Carry this integration into your day

**Key Principle**: You are not half masculine and half feminine. You are WHOLE, with access to the full spectrum of human energy.`;

  const dailyHomework = `# Daily Homework: ${weekData.title} (Dual Path)

## Day 1: Awareness
**Morning**: Notice which energy you naturally default to (masculine or feminine)
**Evening**: Journal - "Where am I over-relying on one energy?"

## Day 2: Masculine Practice
**Morning**: Embody masculine energy—make a decision, set a boundary, take action
**Evening**: Reflect - "What felt natural? What felt challenging?"

## Day 3: Feminine Practice
**Morning**: Embody feminine energy—listen to your body, follow intuition, receive
**Evening**: Reflect - "What felt natural? What felt challenging?"

## Day 4: Integration
**Morning**: Identify one situation that requires both energies
**Evening**: Practice - Consciously shift between masculine and feminine as needed

## Day 5: Shadow Work
**Morning**: Where does one energy become shadow? (Masculine → control, Feminine → passivity)
**Evening**: Adjust - How can you bring that energy back into balance?

## Day 6: Wholeness
**Morning**: Practice being both strong AND soft in the same moment
**Evening**: Reflect - "What does wholeness feel like in my body?"

## Day 7: Integration
**Morning**: Review the week - What did you learn about your energetic range?
**Evening**: Commitment - What practice will you continue?

**Remember**: The dual path is built through conscious choice. You have access to everything. Use it wisely.`;

  const engagementQuestions = `# Engagement Questions: ${weekData.title} (Dual Path)

## For Personal Reflection
1. Which energy do I naturally default to—masculine or feminine?
2. Where am I afraid to embody the opposite energy?
3. What would it look like to be both strong and soft, both directed and receptive?
4. Where am I trying to be "balanced" instead of being whole?
5. What part of myself have I disowned in the name of being "masculine" or "feminine"?

## For Group Discussion
1. How do we integrate masculine and feminine without fragmenting?
2. What does true wholeness look like (vs. forced balance)?
3. Where have you seen people get stuck in one energy?
4. How do we know which energy a situation calls for?
5. What role does shadow work play in integration?

## For Deeper Inquiry
1. What did you learn about masculine and feminine from your parents?
2. Where are you still operating from a split/fragmented model?
3. What would it look like to have full access to your entire energetic range?
4. How do you balance honoring your natural tendencies with expanding your capacity?
5. What becomes possible when you stop trying to be "balanced" and start being whole?

**Core Question**: What kind of whole human are you becoming, and is that who you want to be?`;

  return {
    videoScript,
    somaticPractice,
    dailyHomework,
    engagementQuestions
  };
}

// Main execution
console.log('🎓 Generating 144 curriculum scripts (48 weeks × 3 paths)...\n');

let totalGenerated = 0;

for (let monthNum = 1; monthNum <= 12; monthNum++) {
  const monthInfo = monthData[monthNum - 1];
  const weeks = weekStructures[monthNum - 1];
  
  console.log(`\n📅 Month ${monthNum}: ${monthInfo.title}`);
  
  for (let weekNum = 1; weekNum <= 4; weekNum++) {
    const weekData = weeks[weekNum - 1];
    const globalWeekNum = (monthNum - 1) * 4 + weekNum;
    
    // Generate all three paths
    const mensContent = generateMensPath(monthNum, weekNum, weekData, monthInfo);
    const womensContent = generateWomensPath(monthNum, weekNum, weekData, monthInfo);
    const dualContent = generateDualPath(monthNum, weekNum, weekData, monthInfo);
    
    // Insert Men's Path
    const mensStmt = db.prepare(`
      INSERT INTO inner_circle_weeks (
        monthNumber, weekNumber, title, subtitle, 
        videoScript, somaticPractice, dailyHomework, engagementQuestions, path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    mensStmt.run(
      monthNum, weekNum, weekData.title, weekData.subtitle,
      mensContent.videoScript, mensContent.somaticPractice,
      mensContent.dailyHomework, mensContent.engagementQuestions,
      'men'
    );
    
    // Insert Women's Path
    const womensStmt = db.prepare(`
      INSERT INTO inner_circle_weeks (
        monthNumber, weekNumber, title, subtitle,
        videoScript, somaticPractice, dailyHomework, engagementQuestions, path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    womensStmt.run(
      monthNum, weekNum, weekData.title, weekData.subtitle,
      womensContent.videoScript, womensContent.somaticPractice,
      womensContent.dailyHomework, womensContent.engagementQuestions,
      'women'
    );
    
    // Insert Dual Path
    const dualStmt = db.prepare(`
      INSERT INTO inner_circle_weeks (
        monthNumber, weekNumber, title, subtitle,
        videoScript, somaticPractice, dailyHomework, engagementQuestions, path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    dualStmt.run(
      monthNum, weekNum, weekData.title, weekData.subtitle,
      dualContent.videoScript, dualContent.somaticPractice,
      dualContent.dailyHomework, dualContent.engagementQuestions,
      'dual'
    );
    
    totalGenerated += 3;
    console.log(`  ✅ Week ${weekNum}: ${weekData.title} (3 paths generated)`);
  }
}

console.log(`\n✨ Complete! Generated ${totalGenerated} curriculum scripts.`);
console.log(`   - 48 weeks for Men's Path`);
console.log(`   - 48 weeks for Women's Path`);
console.log(`   - 48 weeks for Dual Path`);

db.close();
