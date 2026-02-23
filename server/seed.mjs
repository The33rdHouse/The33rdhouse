import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { gates, realms, innerCircleMonths, innerCircleWeeks } from "../drizzle/schema.js";

const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
const client = postgres(databaseUrl);
const db = drizzle(client);

// 12 Gates Data
const gatesData = [
  {
    number: 1,
    name: "The Gate of Origin",
    theme: "Birth and Emergence",
    shadow: "Fear of existence, resistance to incarnation, denial of the body",
    gift: "Embodied presence, radical acceptance of form, sacred materiality",
    somaticShift: "From contraction and dissociation to full inhabitation of the body",
    praxis: "Grounding practices, breath work, somatic awareness, earth connection",
    realmCluster: "Realms 1-12: The Descent into Form",
    description: "The first gate marks the soul's descent into matter. Here we learn to inhabit the body as sacred temple, to root consciousness in flesh and bone. This is the gate of incarnation, where spirit meets earth.",
    level: "Foundation",
    keyword: "Embodiment",
    orderIndex: 1
  },
  {
    number: 2,
    name: "The Gate of Polarity",
    theme: "Duality and Integration",
    shadow: "Binary thinking, rejection of opposites, fragmentation of self",
    gift: "Paradox holding, integration of opposites, wholeness through tension",
    somaticShift: "From either/or thinking to both/and consciousness",
    praxis: "Shadow work, polarity exercises, integration practices, tantric awareness",
    realmCluster: "Realms 13-24: The Dance of Opposites",
    description: "The second gate teaches us to hold paradox. Light and dark, masculine and feminine, spirit and matter—all opposites are revealed as complementary forces in the great dance of existence.",
    level: "Foundation",
    keyword: "Integration",
    orderIndex: 2
  },
  {
    number: 3,
    name: "The Gate of Power",
    theme: "Will and Sovereignty",
    shadow: "Powerlessness, domination, manipulation, victim consciousness",
    gift: "Sacred authority, aligned will, sovereign presence, creative power",
    somaticShift: "From collapse or inflation to centered power",
    praxis: "Will exercises, boundary work, leadership practices, solar cultivation",
    realmCluster: "Realms 25-36: The Claiming of Authority",
    description: "The third gate is where we claim our power. Not power over others, but the sovereign authority to shape our own reality. This is the gate of sacred kingship and queenship.",
    level: "Development",
    keyword: "Sovereignty",
    orderIndex: 3
  },
  {
    number: 4,
    name: "The Gate of Heart",
    theme: "Love and Connection",
    shadow: "Heartbreak, isolation, fear of intimacy, emotional armor",
    gift: "Unconditional love, authentic connection, vulnerability as strength",
    somaticShift: "From defended heart to open-hearted presence",
    praxis: "Heart-opening practices, relationship work, compassion meditation, forgiveness",
    realmCluster: "Realms 37-48: The Opening of the Heart",
    description: "The fourth gate breaks us open. Here we learn that love is not weakness but the greatest power. Through heartbreak and healing, we discover our capacity for infinite connection.",
    level: "Development",
    keyword: "Love",
    orderIndex: 4
  },
  {
    number: 5,
    name: "The Gate of Voice",
    theme: "Truth and Expression",
    shadow: "Silence, lies, people-pleasing, inauthentic expression",
    gift: "Authentic voice, truth-telling, creative expression, sacred speech",
    somaticShift: "From throat constriction to free expression",
    praxis: "Voice work, truth-telling practices, creative expression, mantra",
    realmCluster: "Realms 49-60: The Liberation of Voice",
    description: "The fifth gate gives us back our voice. After lifetimes of silence, we learn to speak our truth. This is the gate of the prophet, the poet, the truth-teller.",
    level: "Mastery",
    keyword: "Expression",
    orderIndex: 5
  },
  {
    number: 6,
    name: "The Gate of Vision",
    theme: "Sight and Perception",
    shadow: "Blindness, illusion, projection, narrow perception",
    gift: "Clear seeing, intuitive vision, third eye activation, cosmic perspective",
    somaticShift: "From clouded vision to clear perception",
    praxis: "Meditation, visualization, intuition development, dreamwork",
    realmCluster: "Realms 61-72: The Opening of the Third Eye",
    description: "The sixth gate opens the inner eye. We learn to see beyond the veil, to perceive the subtle realms, to recognize truth from illusion. This is the gate of the seer.",
    level: "Mastery",
    keyword: "Vision",
    orderIndex: 6
  },
  {
    number: 7,
    name: "The Gate of Crown",
    theme: "Unity and Transcendence",
    shadow: "Separation, spiritual bypassing, disconnection from source",
    gift: "Unity consciousness, divine connection, enlightenment, cosmic awareness",
    somaticShift: "From separation to unity",
    praxis: "Meditation, prayer, contemplation, samadhi practices",
    realmCluster: "Realms 73-84: The Dissolution of Boundaries",
    description: "The seventh gate dissolves all boundaries. Here we experience our true nature as infinite consciousness. This is the gate of enlightenment, where self meets Self.",
    level: "Mastery",
    keyword: "Unity",
    orderIndex: 7
  },
  {
    number: 8,
    name: "The Gate of Shadow",
    theme: "Darkness and Integration",
    shadow: "Denial of darkness, repression, projection of shadow",
    gift: "Shadow integration, wholeness, acceptance of darkness as teacher",
    somaticShift: "From fear of darkness to embrace of the whole",
    praxis: "Shadow work, dark night practices, underworld journeys, integration",
    realmCluster: "Realms 85-96: The Descent into Darkness",
    description: "The eighth gate takes us into the underworld. Here we meet everything we've rejected, denied, repressed. This is the gate of the dark goddess, where we learn that darkness is not evil but fertile ground for transformation.",
    level: "Transformation",
    keyword: "Shadow",
    orderIndex: 8
  },
  {
    number: 9,
    name: "The Gate of Death",
    theme: "Endings and Release",
    shadow: "Fear of death, clinging, resistance to change, stagnation",
    gift: "Surrender, letting go, trust in the cycle, death as teacher",
    somaticShift: "From grasping to release",
    praxis: "Death meditation, ego death practices, surrender work, grief rituals",
    realmCluster: "Realms 97-108: The Great Letting Go",
    description: "The ninth gate teaches us to die before we die. We practice the art of letting go, releasing all that no longer serves. This is the gate of the mystic, who knows that death is not the end but a doorway.",
    level: "Transformation",
    keyword: "Release",
    orderIndex: 9
  },
  {
    number: 10,
    name: "The Gate of Rebirth",
    theme: "Resurrection and Renewal",
    shadow: "Stuckness, fear of new beginnings, attachment to old forms",
    gift: "Renewal, resurrection, phoenix consciousness, eternal return",
    somaticShift: "From death to rebirth",
    praxis: "Rebirth rituals, renewal practices, spring ceremonies, phoenix work",
    realmCluster: "Realms 109-120: The Rising from Ashes",
    description: "The tenth gate is resurrection. After death comes new life. We rise from the ashes transformed, carrying the wisdom of all we've been through. This is the gate of the phoenix.",
    level: "Transformation",
    keyword: "Renewal",
    orderIndex: 10
  },
  {
    number: 11,
    name: "The Gate of Service",
    theme: "Offering and Contribution",
    shadow: "Self-centeredness, spiritual narcissism, isolation from community",
    gift: "Sacred service, bodhisattva vow, contribution to the whole",
    somaticShift: "From self-focus to service",
    praxis: "Service work, teaching, mentoring, community building, giving",
    realmCluster: "Realms 121-132: The Return to the World",
    description: "The eleventh gate turns us back toward the world. Having completed our own transformation, we now offer ourselves in service. This is the gate of the bodhisattva, who vows to serve all beings.",
    level: "Mastery",
    keyword: "Service",
    orderIndex: 11
  },
  {
    number: 12,
    name: "The Gate of Return",
    theme: "Completion and Integration",
    shadow: "Incompletion, fragmentation, failure to integrate",
    gift: "Wholeness, completion, full integration, mastery embodied",
    somaticShift: "From fragmentation to wholeness",
    praxis: "Integration practices, completion rituals, mastery embodiment, elder wisdom",
    realmCluster: "Realms 133-144: The Final Integration",
    description: "The twelfth gate is the completion of the cycle. We return to where we started, but transformed. Everything we've learned is now integrated into our being. This is the gate of the elder, the keeper of wisdom.",
    level: "Mastery",
    keyword: "Completion",
    orderIndex: 12
  }
];

// Generate 144 Realms (12 per gate)
function generateRealms() {
  const realms = [];
  const realmThemes = [
    "Awakening", "Recognition", "Resistance", "Surrender", "Integration", "Mastery",
    "Shadow", "Light", "Depth", "Height", "Expansion", "Completion"
  ];
  
  for (let gateNum = 1; gateNum <= 12; gateNum++) {
    for (let realmNum = 1; realmNum <= 12; realmNum++) {
      const globalRealmNumber = (gateNum - 1) * 12 + realmNum;
      const theme = realmThemes[realmNum - 1];
      
      realms.push({
        number: globalRealmNumber,
        gateId: gateNum,
        name: `Realm ${globalRealmNumber}: ${theme} of Gate ${gateNum}`,
        mythicLayer: `In this realm, the seeker encounters the ${theme.toLowerCase()} aspect of the ${gatesData[gateNum - 1].name}. Ancient myths speak of heroes who faced similar trials, learning that ${theme.toLowerCase()} is not a destination but a continuous unfolding.`,
        psychologicalLayer: `Psychologically, this realm addresses the ${theme.toLowerCase()} patterns within the psyche related to ${gatesData[gateNum - 1].theme.toLowerCase()}. Shadow aspects may include resistance, fear, or avoidance, while the gift emerges as conscious integration and embodied wisdom.`,
        hybridLayer: `The hybrid layer weaves together mythic and psychological understanding, revealing how ancient wisdom and modern psychology converge. Here, the seeker practices ${gatesData[gateNum - 1].praxis.split(',')[0]}, discovering that transformation happens through both insight and embodied practice.`,
        practices: `Daily meditation on ${theme.toLowerCase()}, journaling prompts for self-inquiry, somatic practices for embodiment, ritual work for integration`,
        shadowWork: `Explore resistance to ${theme.toLowerCase()}, identify defense mechanisms, work with projections, integrate disowned aspects`,
        integration: `Embody the wisdom of ${theme.toLowerCase()}, practice in daily life, share insights with community, mentor others`,
        orderIndex: globalRealmNumber
      });
    }
  }
  
  return realms;
}

// 12 Inner Circle Months
const innerCircleMonthsData = [
  {
    monthNumber: 1,
    title: "Foundations of Embodiment",
    gateId: 1,
    theme: "Grounding in the Body",
    coreTeaching: "The journey begins with the body. Before we can ascend, we must descend—fully inhabiting our physical form as the sacred temple of consciousness. This month focuses on somatic awareness, grounding practices, and developing a loving relationship with the body."
  },
  {
    monthNumber: 2,
    title: "The Dance of Polarity",
    gateId: 2,
    theme: "Holding Paradox",
    coreTeaching: "Life is not either/or but both/and. This month we learn to hold paradox, to embrace opposites without collapsing into binary thinking. We explore masculine and feminine energies, light and shadow, spirit and matter—discovering that wholeness comes through integration, not elimination."
  },
  {
    monthNumber: 3,
    title: "Claiming Your Power",
    gateId: 3,
    theme: "Sacred Sovereignty",
    coreTeaching: "True power is not domination but sovereignty—the ability to author your own life. This month focuses on reclaiming personal power, setting boundaries, and stepping into leadership. We distinguish between ego-driven power and soul-aligned authority."
  },
  {
    monthNumber: 4,
    title: "The Opening Heart",
    gateId: 4,
    theme: "Vulnerability as Strength",
    coreTeaching: "The heart that has never been broken has never been opened. This month we work with heartbreak, grief, and the courage to love anyway. We learn that vulnerability is not weakness but the gateway to authentic connection and unconditional love."
  },
  {
    monthNumber: 5,
    title: "Finding Your Voice",
    gateId: 5,
    theme: "Truth and Expression",
    coreTeaching: "Your voice is your power. This month focuses on authentic expression, truth-telling, and creative communication. We work through throat chakra blocks, people-pleasing patterns, and the fear of being seen and heard. We learn to speak our truth with clarity and compassion."
  },
  {
    monthNumber: 6,
    title: "Awakening Vision",
    gateId: 6,
    theme: "Seeing Beyond the Veil",
    coreTeaching: "There is more to reality than meets the physical eye. This month we develop intuition, inner vision, and the ability to perceive subtle energies. We practice meditation, dreamwork, and third eye activation, learning to trust our inner knowing."
  },
  {
    monthNumber: 7,
    title: "Unity Consciousness",
    gateId: 7,
    theme: "Dissolving Separation",
    coreTeaching: "At the deepest level, there is no separation—only the One appearing as the many. This month we explore non-dual awareness, unity consciousness, and the direct experience of our true nature as infinite awareness. We practice advanced meditation and contemplation."
  },
  {
    monthNumber: 8,
    title: "Shadow Integration",
    gateId: 8,
    theme: "Embracing the Dark",
    coreTeaching: "The shadow is not our enemy but our teacher. This month we descend into the underworld, meeting everything we've rejected and denied. Through shadow work, we reclaim lost parts of ourselves and discover that darkness is fertile ground for transformation."
  },
  {
    monthNumber: 9,
    title: "The Art of Dying",
    gateId: 9,
    theme: "Ego Death and Surrender",
    coreTeaching: "To be reborn, we must first die. This month focuses on ego death, surrender, and letting go. We practice death meditation, work with grief and loss, and learn to trust the cycle of death and rebirth that governs all of life."
  },
  {
    monthNumber: 10,
    title: "Phoenix Rising",
    gateId: 10,
    theme: "Resurrection and Renewal",
    coreTeaching: "After the dark night comes the dawn. This month celebrates resurrection, renewal, and the phoenix consciousness that rises from ashes. We learn that every ending contains a new beginning, and transformation is an eternal cycle."
  },
  {
    monthNumber: 11,
    title: "Sacred Service",
    gateId: 11,
    theme: "The Bodhisattva Path",
    coreTeaching: "Having transformed ourselves, we now turn toward the world in service. This month explores the bodhisattva vow, sacred service, and how to offer our gifts without burnout or martyrdom. We learn that true service flows from overflow, not depletion."
  },
  {
    monthNumber: 12,
    title: "The Elder's Wisdom",
    gateId: 12,
    theme: "Integration and Mastery",
    coreTeaching: "The final month integrates everything we've learned. We step into elder consciousness, embodying wisdom and mastery. We learn to hold space for others, to mentor and guide, and to live as a walking prayer—fully human, fully divine."
  }
];

// Generate weekly content for each month (4 weeks per month)
function generateWeeklyContent() {
  const weeks = [];
  const weekThemes = [
    "Foundation and Introduction",
    "Deepening the Practice",
    "Shadow and Integration",
    "Embodiment and Mastery"
  ];
  
  for (let monthNum = 1; monthNum <= 12; monthNum++) {
    const month = innerCircleMonthsData[monthNum - 1];
    
    for (let weekNum = 1; weekNum <= 4; weekNum++) {
      weeks.push({
        monthId: monthNum,
        weekNumber: weekNum,
        title: `Week ${weekNum}: ${weekThemes[weekNum - 1]}`,
        videoScript: `Welcome to Week ${weekNum} of ${month.title}. This week we focus on ${weekThemes[weekNum - 1].toLowerCase()}. ${month.coreTeaching.substring(0, 200)}... [Full video script would continue with teaching content, practices, and guidance]`,
        somaticPractice: `This week's somatic practice: Spend 15 minutes daily in ${weekNum === 1 ? 'grounding' : weekNum === 2 ? 'expansion' : weekNum === 3 ? 'integration' : 'embodiment'} work. Notice sensations in your body, breathe into areas of tension, and allow the wisdom of ${month.theme.toLowerCase()} to move through you.`,
        dailyPrompt: `Daily reflection: How is ${month.theme.toLowerCase()} showing up in your life right now? What resistance do you notice? What gifts are emerging?`,
        engagementQuestion: `Share in the community: What has been your biggest insight or challenge this week regarding ${month.theme.toLowerCase()}? How are you integrating this work into your daily life?`
      });
    }
  }
  
  return weeks;
}

async function seed() {
  console.log("🌱 Starting database seeding...");
  
  try {
    // Seed Gates
    console.log("📚 Seeding 12 Gates...");
    for (const gate of gatesData) {
      await db.insert(gates).values(gate).onConflictDoUpdate({
        target: gates.number,
        set: {
          name: gate.name,
          theme: gate.theme,
          shadow: gate.shadow,
          gift: gate.gift,
          somaticShift: gate.somaticShift,
          praxis: gate.praxis,
          realmCluster: gate.realmCluster,
          description: gate.description,
          level: gate.level,
          keyword: gate.keyword,
          orderIndex: gate.orderIndex
        }
      });
    }
    console.log("✅ Gates seeded successfully");
    
    // Seed Realms
    console.log("🌌 Seeding 144 Realms...");
    const realmsData = generateRealms();
    for (const realm of realmsData) {
      await db.insert(realms).values(realm).onConflictDoUpdate({
        target: realms.number,
        set: {
          name: realm.name,
          gateId: realm.gateId,
          mythicLayer: realm.mythicLayer,
          psychologicalLayer: realm.psychologicalLayer,
          hybridLayer: realm.hybridLayer,
          practices: realm.practices,
          shadowWork: realm.shadowWork,
          integration: realm.integration,
          orderIndex: realm.orderIndex
        }
      });
    }
    console.log("✅ Realms seeded successfully");
    
    // Seed Inner Circle Months
    console.log("📅 Seeding 12 Inner Circle Months...");
    for (const month of innerCircleMonthsData) {
      await db.insert(innerCircleMonths).values(month).onConflictDoUpdate({
        target: innerCircleMonths.monthNumber,
        set: {
          title: month.title,
          gateId: month.gateId,
          theme: month.theme,
          coreTeaching: month.coreTeaching
        }
      });
    }
    console.log("✅ Inner Circle Months seeded successfully");
    
    // Seed Inner Circle Weeks
    console.log("📆 Seeding 48 Inner Circle Weeks...");
    const weeksData = generateWeeklyContent();
    for (const week of weeksData) {
      await db.insert(innerCircleWeeks).values(week).onConflictDoUpdate({
        target: [innerCircleWeeks.monthId, innerCircleWeeks.weekNumber],
        set: {
          title: week.title,
          videoScript: week.videoScript,
          somaticPractice: week.somaticPractice,
          dailyPrompt: week.dailyPrompt,
          engagementQuestion: week.engagementQuestion
        }
      });
    }
    console.log("✅ Inner Circle Weeks seeded successfully");
    
    console.log("🎉 Database seeding completed successfully!");
    console.log(`
    Summary:
    - 12 Gates created
    - 144 Realms created
    - 12 Inner Circle Months created
    - 48 Inner Circle Weeks created
    `);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(async () => {
    console.log("✨ Seeding process finished");
    await client.end();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("💥 Seeding failed:", error);
    await client.end();
    process.exit(1);
  });
