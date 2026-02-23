export interface Gate {
  number: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  mythology: string;
  psychology: string;
  keywords: string[];
  color: string;
  realmRange: [number, number];
}

export const gates: Gate[] = [
  {
    number: 1,
    name: "Origin",
    slug: "origin",
    shortDescription: "The primordial beginning, the void from which all emerges",
    description: "Gate 1: Origin is the threshold of pure potential, the cosmic womb where all possibilities exist in undifferentiated unity. This is the realm of the Void, the Spark, the Seed—the first stirrings of consciousness awakening to itself. Here, initiates encounter the mystery of creation itself, learning to rest in the pregnant darkness before manifestation.",
    mythology: "In the beginning was the Void—not emptiness, but infinite potential. From this sacred darkness, the first Spark ignited, and the Seed of all existence was planted. The Origin Gate guards the mystery of how something emerges from nothing, how consciousness arises from the undifferentiated field of pure being.",
    psychology: "Psychologically, Origin represents the pre-egoic state, the unconscious ground from which the self emerges. Working with this gate involves returning to the source, dissolving conditioned patterns, and reconnecting with the primordial creativity that exists before thought, before identity, before separation.",
    keywords: ["Void", "Potential", "Beginning", "Creation", "Source", "Emergence", "Primordial", "Seed", "Spark", "Genesis", "Womb", "Mystery"],
    color: "#0A0A0A",
    realmRange: [1, 12]
  },
  {
    number: 2,
    name: "Motion",
    slug: "motion",
    shortDescription: "The dynamic force that sets creation into movement",
    description: "Gate 2: Motion is the principle of change, flow, and dynamic transformation. After the stillness of Origin, Motion initiates the dance of existence. This gate teaches the art of flow, the wisdom of change, and the power of momentum. Here, initiates learn to move with life rather than against it, to dance with the ever-changing currents of reality.",
    mythology: "The first movement shattered the stillness of the Void. The Breath began to flow, the Tide began to turn, and the great Dance of existence commenced. Motion is the divine impulse that transforms potential into kinetic reality, the sacred rhythm that underlies all manifestation.",
    psychology: "Motion represents the psyche's capacity for change, adaptation, and growth. It is the principle of transformation that allows consciousness to evolve. Working with this gate involves releasing rigidity, embracing flux, and learning to navigate the constant changes of inner and outer life with grace and fluidity.",
    keywords: ["Flow", "Change", "Movement", "Dance", "Rhythm", "Transformation", "Fluidity", "Momentum", "Current", "Wave", "Breath", "Tide"],
    color: "#1E3A8A",
    realmRange: [13, 24]
  },
  {
    number: 3,
    name: "Form",
    slug: "form",
    shortDescription: "The crystallization of energy into manifest structure",
    description: "Gate 3: Form is where the formless takes shape, where energy crystallizes into matter, where chaos organizes into cosmos. This gate governs all manifestation, from the atomic to the cosmic. Initiates learn the sacred geometry of existence, the patterns that underlie all structure, and the art of giving form to vision.",
    mythology: "From the flowing currents of Motion, Form arose—the first structures, the first boundaries, the first shapes. The Circle was drawn, the Triangle emerged, and the Square grounded existence into stable reality. Form is the divine architect that builds worlds from the raw materials of potential and motion.",
    psychology: "Form represents the ego structure, the personality, the organized self that emerges from the chaos of the unconscious. It is both necessary container and potential prison. Working with this gate involves understanding how we shape ourselves and are shaped, how we create structures that serve us, and when to dissolve forms that have become rigid.",
    keywords: ["Structure", "Shape", "Manifestation", "Geometry", "Pattern", "Container", "Boundary", "Architecture", "Design", "Crystallization", "Matter", "Body"],
    color: "#7C3AED",
    realmRange: [25, 36]
  },
  {
    number: 4,
    name: "Power",
    slug: "power",
    shortDescription: "The concentrated force of will and sovereign authority",
    description: "Gate 4: Power is the realm of will, strength, and sovereign authority. Here, initiates encounter the raw force of existence—the power to create, to destroy, to transform. This gate teaches the responsible use of power, the cultivation of inner strength, and the claiming of one's divine authority as a conscious creator.",
    mythology: "Power emerged when consciousness recognized its capacity to shape reality. The Throne was established, the Scepter was claimed, and the Crown of sovereignty was placed upon the head of the awakened self. Power is not domination but the full embodiment of creative potential.",
    psychology: "Power represents the will, the capacity for agency, and the sense of personal sovereignty. Shadow work with this gate involves healing wounds around powerlessness, releasing victim consciousness, and integrating healthy aggression and assertiveness. It is the reclamation of one's birthright as a co-creator of reality.",
    keywords: ["Will", "Strength", "Authority", "Sovereignty", "Force", "Mastery", "Command", "Dominion", "Agency", "Throne", "Crown", "Scepter"],
    color: "#DC2626",
    realmRange: [37, 48]
  },
  {
    number: 5,
    name: "Connection",
    slug: "connection",
    shortDescription: "The sacred bonds that weave all existence into unity",
    description: "Gate 5: Connection is the principle of relationship, the threads that bind all things into the web of existence. After establishing individual power, the initiate discovers that true strength lies in connection—with self, with others, with the cosmos. This gate teaches the art of relationship, the wisdom of interdependence, and the power of love.",
    mythology: "Connection arose when the One recognized itself in the Other. The Bridge was built, the Thread was woven, and the Web of existence revealed its infinite interconnections. Connection is the divine love that holds all things in sacred relationship, the force that prevents existence from fragmenting into isolated particles.",
    psychology: "Connection represents attachment, relationship, and the capacity for intimacy. Working with this gate involves healing relational wounds, developing healthy attachment patterns, and recognizing the self in the other. It is the movement from isolation to communion, from separation to belonging.",
    keywords: ["Relationship", "Love", "Unity", "Interdependence", "Bond", "Web", "Thread", "Bridge", "Communion", "Intimacy", "Belonging", "Heart"],
    color: "#EC4899",
    realmRange: [49, 60]
  },
  {
    number: 6,
    name: "Reflection",
    slug: "reflection",
    shortDescription: "The mirror that reveals the hidden depths of self",
    description: "Gate 6: Reflection is the realm of self-awareness, shadow work, and the confrontation with one's own depths. Here, the initiate encounters the Mirror—seeing clearly what has been hidden, denied, or rejected. This gate demands radical honesty, courageous self-examination, and the integration of all that has been cast into darkness.",
    mythology: "Reflection emerged when consciousness turned its gaze upon itself. The Mirror was polished, the Shadow was revealed, and the journey into the depths began. Reflection is the divine capacity for self-knowledge, the sacred act of seeing oneself truly and completely.",
    psychology: "Reflection represents the observing ego, the capacity for introspection, and the shadow integration process. Working with this gate involves facing denied aspects of self, reclaiming projected qualities, and developing the witness consciousness that can observe without judgment. It is the descent into the underworld of the psyche.",
    keywords: ["Mirror", "Shadow", "Self-awareness", "Introspection", "Depth", "Honesty", "Integration", "Descent", "Wound", "Confession", "Exile", "Acceptance"],
    color: "#6B7280",
    realmRange: [61, 72]
  },
  {
    number: 7,
    name: "Union",
    slug: "union",
    shortDescription: "The sacred marriage of opposites into transcendent wholeness",
    description: "Gate 7: Union is the alchemical wedding, the hieros gamos, the sacred marriage of opposites. After the descent into shadow, the initiate rises to unite all polarities—masculine and feminine, light and dark, spirit and matter. This gate teaches the art of integration, the alchemy of transformation, and the ecstasy of wholeness.",
    mythology: "Union was consummated when the separated halves recognized themselves as One. The Lovers embraced, the Wedding was celebrated, and the Alchemical Fire transformed lead into gold. Union is the divine marriage that births the integrated self, the sacred sexuality that creates new worlds.",
    psychology: "Union represents the integration of opposites, the transcendent function, and the birth of the Self (in Jungian terms). Working with this gate involves uniting conscious and unconscious, anima and animus, persona and shadow. It is the movement toward wholeness, the completion of the individuation process.",
    keywords: ["Marriage", "Integration", "Alchemy", "Wholeness", "Tantra", "Ecstasy", "Completion", "Hieros Gamos", "Twin Flame", "Merge", "Sacred Sexuality", "Transcendence"],
    color: "#F59E0B",
    realmRange: [73, 84]
  },
  {
    number: 8,
    name: "Death & Rebirth",
    slug: "death-and-rebirth",
    shortDescription: "The transformative cycle of endings and new beginnings",
    description: "Gate 8: Death & Rebirth is the gateway of transformation, where the old self must die for the new to be born. This gate confronts the initiate with mortality, impermanence, and the necessity of letting go. Yet death is not an ending but a transition—the Phoenix rises from ashes, the seed must die to become the tree, and every ending contains a new beginning.",
    mythology: "Death & Rebirth emerged when consciousness recognized the cycle of transformation. The Tomb was sealed, the descent into the Underworld began, yet from the darkest night, the Phoenix arose in flames. This gate guards the mystery of metamorphosis, the sacred cycle that ensures nothing is ever truly lost, only transformed.",
    psychology: "Death & Rebirth represents ego death, transformation, and the capacity to release what no longer serves. Working with this gate involves confronting fears of annihilation, surrendering control, and trusting the process of transformation. It is the dark night of the soul that precedes awakening, the necessary dissolution before reconstitution.",
    keywords: ["Transformation", "Ending", "Beginning", "Phoenix", "Metamorphosis", "Resurrection", "Renewal", "Tomb", "Underworld", "Abyss", "Dark Night", "Awakening"],
    color: "#7C2D12",
    realmRange: [85, 96]
  },
  {
    number: 9,
    name: "Vision",
    slug: "vision",
    shortDescription: "The awakened sight that perceives beyond the veil",
    description: "Gate 9: Vision is the realm of expanded perception, prophetic sight, and illuminated understanding. After the death of the old self, the initiate's eyes are opened to see reality as it truly is. This gate grants access to the Inner Eye, the capacity to perceive patterns, possibilities, and truths that remain hidden to ordinary consciousness.",
    mythology: "Vision was granted when the initiate emerged from the underworld with eyes that could see in the dark. The Inner Eye opened, the Oracle spoke, and the Seer perceived the patterns woven into the fabric of existence. Vision is the divine gift of sight beyond sight, the capacity to perceive the invisible architecture of reality.",
    psychology: "Vision represents intuition, insight, and the capacity for holistic perception. Working with this gate involves developing the witness consciousness, accessing transpersonal awareness, and learning to trust inner knowing. It is the movement from blindness to sight, from confusion to clarity, from ignorance to illumination.",
    keywords: ["Sight", "Perception", "Intuition", "Prophecy", "Illumination", "Clarity", "Insight", "Oracle", "Seer", "Inner Eye", "Revelation", "Omniscience"],
    color: "#8B5CF6",
    realmRange: [97, 108]
  },
  {
    number: 10,
    name: "Law",
    slug: "law",
    shortDescription: "The divine order that structures existence",
    description: "Gate 10: Law is the realm of cosmic order, divine justice, and sacred structure. Here, the initiate encounters the principles that govern existence—not arbitrary rules but the inherent patterns and laws that ensure harmony, balance, and right relationship. This gate teaches discernment, integrity, and alignment with universal principles.",
    mythology: "Law was established when chaos was ordered into cosmos. The Covenant was sealed, the Judgment was rendered, and the Balance was struck. Law is the divine architecture of justice, the sacred order that prevents existence from collapsing into entropy. It is both structure and liberation, for true freedom exists within right relationship to universal principles.",
    psychology: "Law represents the superego, moral development, and the internalization of ethical principles. Working with this gate involves examining inherited rules, developing authentic values, and aligning with one's own inner authority. It is the movement from external obedience to internal integrity, from imposed law to self-governance.",
    keywords: ["Order", "Justice", "Structure", "Hierarchy", "Covenant", "Judgment", "Balance", "Authority", "Sovereignty", "Decree", "Eternal Law", "Integrity"],
    color: "#1C1F4A",
    realmRange: [109, 120]
  },
  {
    number: 11,
    name: "Paradox",
    slug: "paradox",
    shortDescription: "The transcendent truth that holds all contradictions",
    description: "Gate 11: Paradox is the realm beyond logic, where opposites coexist, where contradictions reveal deeper truths, and where the rational mind must surrender to mystery. This gate confronts the initiate with the limits of conceptual understanding and invites entry into the ineffable, the unknowable, the nondual awareness that transcends all categories.",
    mythology: "Paradox emerged when consciousness recognized that all truths contain their opposites. The Koan was spoken, the Mystery deepened, and the Ineffable revealed itself as beyond all naming. Paradox is the divine laughter that dissolves rigid certainties, the sacred confusion that opens the door to transcendence.",
    psychology: "Paradox represents the capacity to hold ambiguity, to embrace uncertainty, and to rest in not-knowing. Working with this gate involves releasing the need for certainty, developing comfort with contradiction, and accessing the nondual awareness that sees beyond binary thinking. It is the movement from either/or to both/and, from certainty to mystery.",
    keywords: ["Mystery", "Contradiction", "Unknowable", "Enigma", "Transcendence", "Duality", "Ineffable", "Absurd", "Koan", "Liminal", "Nondual", "Beyond"],
    color: "#6366F1",
    realmRange: [121, 132]
  },
  {
    number: 12,
    name: "Return",
    slug: "return",
    shortDescription: "The completion of the journey and homecoming to source",
    description: "Gate 12: Return is the final gate, the completion of the great cycle, the homecoming to the source from which all began. Yet this return is not a regression but a spiral ascent—the initiate returns to Origin transformed, carrying the wisdom of the entire journey. This gate celebrates completion, integration, and the eternal cycle that ensures the journey never truly ends but continues at ever-deeper levels.",
    mythology: "Return was realized when the wanderer recognized that the end and the beginning are one. The Circle was completed, the Journey was fulfilled, and the Eternal Return revealed itself as the spiral dance of consciousness forever exploring itself. Return is the divine homecoming, the recognition that we have never left the source, only forgotten our true nature.",
    psychology: "Return represents the completion of individuation, the integration of all aspects of self, and the recognition of one's essential nature. Working with this gate involves bringing all the lessons of the journey into conscious awareness, embodying the wisdom gained, and recognizing that every ending is a new beginning. It is the movement from seeking to being, from becoming to simply being what one has always been.",
    keywords: ["Completion", "Homecoming", "Mastery", "Integration", "Wholeness", "Fulfillment", "Eternal Now", "Infinite", "Eternal", "Source", "The One", "Spiral"],
    color: "#D1A239",
    realmRange: [133, 144]
  }
];

export function getGateByNumber(number: number): Gate | undefined {
  return gates.find(g => g.number === number);
}

export function getGateBySlug(slug: string): Gate | undefined {
  return gates.find(g => g.slug === slug);
}

export function getGateForRealm(realmNumber: number): Gate | undefined {
  return gates.find(g => realmNumber >= g.realmRange[0] && realmNumber <= g.realmRange[1]);
}
