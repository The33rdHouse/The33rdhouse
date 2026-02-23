import { getDb } from './db';
import { sql } from "drizzle-orm";

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
  // Month 1
  [
    { title: "Emotional Awareness", subtitle: "What Am I Actually Feeling?", core: "emotional literacy, feeling states, body sensations" },
    { title: "Pattern & Nervous System", subtitle: "Why Do I React This Way?", core: "nervous system states, trauma responses, regulation" },
    { title: "Boundaries & Identity", subtitle: "What Do I Allow & What Don't I?", core: "boundary setting, self-definition, personal limits" },
    { title: "Integration & Momentum", subtitle: "How Do I Keep This Going?", core: "practice integration, habit formation, sustainable change" }
  ],
  // Month 2
  [
    { title: "Nervous System Regulation", subtitle: "How Do I Stay Calm?", core: "vagal tone, co-regulation, self-soothing" },
    { title: "Emotional Flow", subtitle: "Letting Feelings Move Through", core: "emotional processing, energy in motion, release" },
    { title: "Energy Management", subtitle: "Working With Your Natural Rhythms", core: "circadian rhythms, energy cycles, rest" },
    { title: "Integration Practice", subtitle: "Building Sustainable Flow", core: "flow states, sustainable practices, rhythm" }
  ],
  // Month 3
  [
    { title: "Identity", subtitle: "Who Am I When I'm Honest?", core: "authentic self, self-concept, identity construction" },
    { title: "Boundaries", subtitle: "What I Allow & What I Don't", core: "energetic boundaries, relational boundaries, self-protection" },
    { title: "Standards", subtitle: "What I Expect From Myself", core: "personal standards, self-respect, integrity" },
    { title: "Form", subtitle: "The Structure of Who I Am Now", core: "embodied identity, structural integrity, form" }
  ],
  // Month 4
  [
    { title: "Personal Power", subtitle: "Where Did I Give It Away?", core: "power reclamation, agency, self-authority" },
    { title: "Will & Choice", subtitle: "Choosing Consciously", core: "conscious choice, willpower, intentionality" },
    { title: "Authority", subtitle: "Standing In Your Truth", core: "inner authority, self-trust, conviction" },
    { title: "Sovereignty", subtitle: "Self-Governance", core: "personal sovereignty, self-rule, autonomy" }
  ],
  // Month 5
  [
    { title: "Authentic Connection", subtitle: "Being Real With Others", core: "vulnerability, authenticity, genuine relating" },
    { title: "Healthy Attachment", subtitle: "Secure Relating", core: "attachment styles, secure bonding, relational safety" },
    { title: "Interdependence", subtitle: "Together But Not Enmeshed", core: "healthy interdependence, autonomy in relationship" },
    { title: "Sacred Bonds", subtitle: "Deep Relationship", core: "sacred relating, soul connections, depth" }
  ],
  // Month 6
  [
    { title: "Shadow Work Basics", subtitle: "What Am I Not Seeing?", core: "shadow recognition, blind spots, unconscious patterns" },
    { title: "Projection", subtitle: "What I See In Others", core: "projection mechanics, mirror work, ownership" },
    { title: "Integration", subtitle: "Reclaiming Lost Parts", core: "shadow integration, wholeness, reclamation" },
    { title: "Self-Honesty", subtitle: "The Truth I've Been Avoiding", core: "radical honesty, self-truth, facing reality" }
  ],
  // Month 7
  [
    { title: "Inner Marriage", subtitle: "Masculine & Feminine Within", core: "inner polarity, anima/animus, internal union" },
    { title: "Polarity", subtitle: "Working With Opposites", core: "polarity dynamics, tension, complementarity" },
    { title: "Alchemy", subtitle: "Transformation Through Union", core: "alchemical marriage, transformation, synthesis" },
    { title: "Wholeness", subtitle: "Becoming Complete", core: "integration, wholeness, completion" }
  ],
  // Month 8
  [
    { title: "Letting Go", subtitle: "What Needs To Die?", core: "release, surrender, death of old forms" },
    { title: "The Void", subtitle: "Sitting In The Unknown", core: "emptiness, void, liminal space" },
    { title: "Emergence", subtitle: "What Wants To Be Born?", core: "new forms, emergence, becoming" },
    { title: "Rebirth", subtitle: "Stepping Into The New", core: "rebirth, renewal, new identity" }
  ],
  // Month 9
  [
    { title: "Inner Vision", subtitle: "Seeing What's True", core: "inner sight, truth perception, discernment" },
    { title: "Intuition", subtitle: "Trusting Your Knowing", core: "intuitive knowing, body wisdom, inner guidance" },
    { title: "Prophecy", subtitle: "Reading The Signs", core: "pattern recognition, foresight, symbolic vision" },
    { title: "Clarity", subtitle: "Seeing Clearly", core: "mental clarity, vision, clear seeing" }
  ],
  // Month 10
  [
    { title: "Natural Law", subtitle: "How Reality Works", core: "universal principles, natural order, cosmic law" },
    { title: "Personal Code", subtitle: "Your Own Rules", core: "personal ethics, code of conduct, values" },
    { title: "Justice", subtitle: "Right Relationship", core: "justice, balance, right action" },
    { title: "Order", subtitle: "Structure & Discipline", core: "discipline, structure, order" }
  ],
  // Month 11
  [
    { title: "Paradox", subtitle: "Both/And Thinking", core: "paradoxical thinking, holding opposites, complexity" },
    { title: "Mystery", subtitle: "Embracing The Unknown", core: "mystery, unknowing, sacred uncertainty" },
    { title: "Transcendence", subtitle: "Beyond Duality", core: "non-dual awareness, transcendence, unity" },
    { title: "Enigma", subtitle: "The Unknowable", core: "the ineffable, mystery, beyond comprehension" }
  ],
  // Month 12
  [
    { title: "Integration", subtitle: "Bringing It All Together", core: "synthesis, integration, wholeness" },
    { title: "Mastery", subtitle: "Embodying The Work", core: "embodied mastery, lived wisdom, integration" },
    { title: "Service", subtitle: "Giving Back", core: "service, contribution, giving" },
    { title: "Completion", subtitle: "The Journey Home", core: "completion, return, homecoming" }
  ]
];

// Generate content for each path
function generateContent(path: 'men' | 'women' | 'dual', monthNum: number, weekNum: number, weekData: any, monthInfo: any) {
  // Content generation logic here - simplified for now
  const videoScript = `Week ${weekNum} ${path} path content for ${weekData.title}`;
  const somaticPractice = `Somatic practice for ${path} path`;
  const dailyHomework = `Daily homework for ${path} path`;
  const engagementQuestions = `Engagement questions for ${path} path`;
  
  return { videoScript, somaticPractice, dailyHomework, engagementQuestions };
}

// Main execution
async function generateAllCurriculum() {
  const db = await getDb();
  if (!db) {
    console.error('Database connection failed');
    return;
  }

  console.log('🎓 Generating 144 curriculum scripts (48 weeks × 3 paths)...\n');
  
  // First, delete existing weeks to avoid duplicates
  await db.execute(sql`DELETE FROM inner_circle_weeks`);
  
  let totalGenerated = 0;
  
  for (let monthNum = 1; monthNum <= 12; monthNum++) {
    const monthInfo = monthData[monthNum - 1];
    const weeks = weekStructures[monthNum - 1];
    
    console.log(`\n📅 Month ${monthNum}: ${monthInfo.title}`);
    
    for (let weekNum = 1; weekNum <= 4; weekNum++) {
      const weekData = weeks[weekNum - 1];
      
      // Generate all three paths
      for (const path of ['men', 'women', 'dual'] as const) {
        const content = generateContent(path, monthNum, weekNum, weekData, monthInfo);
        
        await db.execute(sql`
          INSERT INTO inner_circle_weeks (
            monthNumber, weekNumber, title, subtitle,
            videoScript, somaticPractice, dailyHomework, engagementQuestions, path
          ) VALUES (${monthNum}, ${weekNum}, ${weekData.title}, ${weekData.subtitle},
          ${content.videoScript}, ${content.somaticPractice},
          ${content.dailyHomework}, ${content.engagementQuestions},
          ${path})
        `);
        
        totalGenerated++;
      }
      
      console.log(`  ✅ Week ${weekNum}: ${weekData.title} (3 paths generated)`);
    }
  }
  
  console.log(`\n✨ Complete! Generated ${totalGenerated} curriculum scripts.`);
  console.log(`   - 48 weeks for Men's Path`);
  console.log(`   - 48 weeks for Women's Path`);
  console.log(`   - 48 weeks for Dual Path`);
}

generateAllCurriculum().catch(console.error);
