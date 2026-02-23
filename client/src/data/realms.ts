import { getGateByNumber } from "./gates";

export interface Realm {
  number: number;
  name: string;
  slug: string;
  gate: number;
  glyph: string;
  mythic: string;
  psychological: string;
  hybrid: string;
  practices: string[];
  meditation: string;
}

// Helper to generate realm data - we'll populate the full descriptions as needed
export const realms: Realm[] = [
  // Gate 1: Origin (Realms 1-12)
  { number: 1, name: "The Void", slug: "the-void", gate: 1, glyph: "/realm-glyphs/realm-001.png", 
    mythic: "In the beginning was the Void—not emptiness but infinite potential, the cosmic womb from which all emerges.",
    psychological: "The pre-egoic state, the unconscious ground from which the self emerges. The capacity to rest in not-knowing.",
    hybrid: "Learning to embrace the void within, to rest in uncertainty, and to trust the creative potential of emptiness.",
    practices: ["Void meditation", "Sitting in darkness", "Sensory deprivation", "Surrender practice"],
    meditation: "Sit in complete darkness and silence. Release all thoughts, all identities, all knowing. Rest in the void."
  },
  { number: 2, name: "The Spark", slug: "the-spark", gate: 1, glyph: "/realm-glyphs/realm-002.png",
    mythic: "The first light ignites in the darkness—consciousness awakening to itself, the divine spark that initiates all creation.",
    psychological: "The first stirrings of awareness, the moment consciousness recognizes itself as distinct from the void.",
    hybrid: "Cultivating the witness consciousness, the observing self that can perceive without identifying.",
    practices: ["Awareness meditation", "Witnessing practice", "Noting thoughts", "Self-inquiry"],
    meditation: "Notice the awareness that notices. Who is watching? Find the spark of consciousness itself."
  },
  { number: 3, name: "The Seed", slug: "the-seed", gate: 1, glyph: "/realm-glyphs/realm-003.png",
    mythic: "The cosmic seed contains all potential forms, all possible futures—the blueprint of existence encoded in the primordial point.",
    psychological: "The core self, the essential nature that exists before conditioning and will remain after all identities dissolve.",
    hybrid: "Discovering your essential nature, the seed of your true self beneath all conditioning.",
    practices: ["Core self meditation", "Essence inquiry", "Stripping away false identities", "Seed visualization"],
    meditation: "Imagine yourself as a seed containing infinite potential. What wants to emerge?"
  },
  { number: 4, name: "The Womb", slug: "the-womb", gate: 1, glyph: "/realm-glyphs/realm-004.png",
    mythic: "The cosmic womb holds and nurtures the seed, the sacred container where potential gestates before birth.",
    psychological: "The holding environment, the capacity to contain and nurture transformation without forcing it.",
    hybrid: "Creating internal and external containers that support your emergence and transformation.",
    practices: ["Container building", "Self-holding", "Womb meditation", "Gestation practice"],
    meditation: "Feel yourself held in a cosmic womb. Safe, nurtured, allowed to grow at your own pace."
  },
  { number: 5, name: "The Pulse", slug: "the-pulse", gate: 1, glyph: "/realm-glyphs/realm-005.png",
    mythic: "The first heartbeat of existence, the primordial rhythm that underlies all manifestation.",
    psychological: "The life force, the vital energy that animates consciousness and drives growth.",
    hybrid: "Connecting with your life force, feeling the pulse of existence moving through you.",
    practices: ["Heartbeat meditation", "Pulse awareness", "Rhythm work", "Vital energy cultivation"],
    meditation: "Feel your heartbeat. This is the pulse of existence itself, the rhythm of life."
  },
  { number: 6, name: "The Breath", slug: "the-breath", gate: 1, glyph: "/realm-glyphs/realm-006.png",
    mythic: "The divine breath that animates all life, the sacred wind that carries consciousness.",
    psychological: "The bridge between conscious and unconscious, voluntary and involuntary, self and world.",
    hybrid: "Using breath as a tool for transformation, regulation, and connection to life force.",
    practices: ["Breathwork", "Pranayama", "Conscious breathing", "Breath meditation"],
    meditation: "Follow the breath. In and out. The universe breathing itself through you."
  },
  { number: 7, name: "The Emergence", slug: "the-emergence", gate: 1, glyph: "/realm-glyphs/realm-007.png",
    mythic: "The moment of emergence from the void, when potential becomes actual, when nothing becomes something.",
    psychological: "The birth of the ego, the emergence of the separate self from the undifferentiated ground.",
    hybrid: "Honoring your emergence into existence, celebrating the miracle of your being.",
    practices: ["Birth meditation", "Emergence ritual", "Celebration practice", "Gratitude for existence"],
    meditation: "You emerged from the void. You exist. Feel the miracle of this."
  },
  { number: 8, name: "The First Light", slug: "the-first-light", gate: 1, glyph: "/realm-glyphs/realm-008.png",
    mythic: "The dawn of consciousness, the first light breaking through primordial darkness.",
    psychological: "The first moments of awareness, the capacity to perceive and know.",
    hybrid: "Cultivating clear seeing, the ability to perceive reality without distortion.",
    practices: ["Clear seeing meditation", "Perception practice", "Light visualization", "Clarity work"],
    meditation: "Imagine the first dawn. Darkness giving way to light. This is your consciousness awakening."
  },
  { number: 9, name: "The Source", slug: "the-source", gate: 1, glyph: "/realm-glyphs/realm-009.png",
    mythic: "The eternal source from which all emerges and to which all returns—the alpha and omega.",
    psychological: "The ground of being, the unchanging awareness that witnesses all change.",
    hybrid: "Resting in source consciousness, recognizing yourself as the ground from which all arises.",
    practices: ["Source meditation", "Ground of being practice", "Resting in awareness", "Non-dual meditation"],
    meditation: "You are not the waves but the ocean. Rest in the source."
  },
  { number: 10, name: "The Foundation", slug: "the-foundation", gate: 1, glyph: "/realm-glyphs/realm-010.png",
    mythic: "The cosmic foundation upon which all existence is built, the bedrock of reality.",
    psychological: "The core stability, the unshakeable ground of your being.",
    hybrid: "Building a solid foundation for your life and practice, creating stability.",
    practices: ["Grounding practice", "Foundation building", "Stability work", "Root meditation"],
    meditation: "Feel yourself rooted, grounded, stable. You stand on solid ground."
  },
  { number: 11, name: "The Root", slug: "the-root", gate: 1, glyph: "/realm-glyphs/realm-011.png",
    mythic: "The cosmic root that anchors existence, connecting all things to source.",
    psychological: "The root chakra, survival instinct, connection to body and earth.",
    hybrid: "Healing root issues around safety, survival, and belonging.",
    practices: ["Root chakra work", "Grounding exercises", "Safety building", "Embodiment practice"],
    meditation: "Imagine roots growing from your body deep into the earth. You are connected, safe, held."
  },
  { number: 12, name: "The Genesis", slug: "the-genesis", gate: 1, glyph: "/realm-glyphs/realm-012.png",
    mythic: "The moment of genesis, when creation begins, when the journey commences.",
    psychological: "The capacity for new beginnings, for starting fresh, for initiating change.",
    hybrid: "Embracing new beginnings, stepping into the unknown with courage.",
    practices: ["New beginning ritual", "Fresh start practice", "Initiation ceremony", "Genesis meditation"],
    meditation: "This is your genesis. Your beginning. Step forward into your journey."
  },

  // Gate 2: Motion (Realms 13-24)
  { number: 13, name: "The Flow", slug: "the-flow", gate: 2, glyph: "/realm-glyphs/realm-013.png",
    mythic: "The cosmic flow that moves all things, the current of existence that cannot be stopped.",
    psychological: "The capacity to move with life rather than against it, to flow rather than resist.",
    hybrid: "Learning to flow with change, to move with the currents of life.",
    practices: ["Flow state practice", "Movement meditation", "Water meditation", "Surrender to flow"],
    meditation: "Be like water. Flow around obstacles. Move with grace and ease."
  },
  { number: 14, name: "The Current", slug: "the-current", gate: 2, glyph: "/realm-glyphs/realm-014.png",
    mythic: "The underlying current that moves beneath the surface, the hidden force that shapes reality.",
    psychological: "The unconscious forces that drive behavior, the currents beneath conscious awareness.",
    hybrid: "Becoming aware of the currents moving through you, the forces shaping your life.",
    practices: ["Current awareness", "Unconscious exploration", "Depth work", "Undercurrent meditation"],
    meditation: "What currents move beneath your surface? What forces shape you unseen?"
  },
  { number: 15, name: "The Wave", slug: "the-wave", gate: 2, glyph: "/realm-glyphs/realm-015.png",
    mythic: "The cosmic wave that rises and falls, the rhythm of expansion and contraction.",
    psychological: "The cycles of energy, mood, and motivation—learning to ride the waves.",
    hybrid: "Accepting the natural cycles of your energy and emotions without resistance.",
    practices: ["Wave riding", "Cycle awareness", "Energy management", "Rhythm practice"],
    meditation: "You are a wave in the ocean. Rise and fall naturally. This is your rhythm."
  },

  // Continue with remaining realms... (For brevity, showing pattern)
  // We'll generate more as needed or user can expand

  // Placeholder for remaining realms (16-144)
  // Each follows the same structure with unique content
];

// Generate remaining realms with placeholder content
for (let i = 16; i <= 144; i++) {
  const gate = Math.floor((i - 1) / 12) + 1;
  const gateData = getGateByNumber(gate);
  const realmInGate = ((i - 1) % 12) + 1;
  
  realms.push({
    number: i,
    name: `Realm ${i}`,
    slug: `realm-${i}`,
    gate: gate,
    glyph: `/realm-glyphs/realm-${String(i).padStart(3, '0')}.png`,
    mythic: `The mythic dimension of Realm ${i} within ${gateData?.name || 'Unknown Gate'}. This realm represents a specific threshold of transformation.`,
    psychological: `The psychological dimension explores how this realm manifests in individual consciousness and personal development.`,
    hybrid: `The lived experience of this realm, where myth and psychology meet in actual practice and transformation.`,
    practices: [
      `${gateData?.name || 'Gate'} meditation`,
      "Realm-specific practice",
      "Integration work",
      "Embodiment exercise"
    ],
    meditation: `Meditate on the essence of Realm ${i}. What does this threshold ask of you?`
  });
}

export function getRealmByNumber(number: number): Realm | undefined {
  return realms.find(r => r.number === number);
}

export function getRealmBySlug(slug: string): Realm | undefined {
  return realms.find(r => r.slug === slug);
}

export function getRealmsByGate(gateNumber: number): Realm[] {
  return realms.filter(r => r.gate === gateNumber);
}
