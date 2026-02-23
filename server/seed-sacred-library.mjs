/**
 * Seed script for The Sacred Library - 71 Books organized by 12 Gates
 * 
 * Book distribution:
 * - Gates 1-12: 6 books each = 72 books
 * - Remove 1 to get 71 total
 */

export const sacredLibraryBooks = [
  // GATE 1: BREATH - Foundation & Presence (6 books)
  {
    title: "The Art of Conscious Breathing",
    slug: "art-of-conscious-breathing",
    description: "Master the foundation of all transformation through breath awareness and somatic presence.",
    price: 2999, // $29.99
    category: "book",
    gateNumber: 1,
    realmNumber: 1,
    featured: true
  },
  {
    title: "Presence: The Gateway to Now",
    slug: "presence-gateway-to-now",
    description: "Discover the power of present-moment awareness as the doorway to consciousness transformation.",
    price: 2499,
    category: "book",
    gateNumber: 1,
    realmNumber: 2
  },
  {
    title: "Somatic Awakening: Body as Temple",
    slug: "somatic-awakening-body-temple",
    description: "Learn to inhabit your body fully and access its innate wisdom through embodied practice.",
    price: 3499,
    category: "book",
    gateNumber: 1,
    realmNumber: 3
  },
  {
    title: "The Breath of Life: Ancient Pranayama Secrets",
    slug: "breath-of-life-pranayama",
    description: "Explore ancient breathing techniques that unlock energy, clarity, and vitality.",
    price: 2999,
    category: "book",
    gateNumber: 1,
    realmNumber: 4
  },
  {
    title: "Grounding: Earth Connection Practices",
    slug: "grounding-earth-connection",
    description: "Establish deep roots through practices that anchor you in stability and safety.",
    price: 2499,
    category: "book",
    gateNumber: 1,
    realmNumber: 5
  },
  {
    title: "The Power of Pause: Sacred Stillness",
    slug: "power-of-pause-stillness",
    description: "Discover transformation in the spaces between action through conscious pausing.",
    price: 2999,
    category: "book",
    gateNumber: 1,
    realmNumber: 6
  },

  // GATE 2: SENSATION - Embodied Awareness (6 books)
  {
    title: "The Felt Sense: Somatic Intelligence",
    slug: "felt-sense-somatic-intelligence",
    description: "Develop your body's innate capacity to sense, feel, and know beyond the mind.",
    price: 3499,
    category: "book",
    gateNumber: 2,
    realmNumber: 13
  },
  {
    title: "Pleasure as Medicine: Reclaiming Joy",
    slug: "pleasure-as-medicine",
    description: "Heal through the transformative power of embodied pleasure and sensory delight.",
    price: 2999,
    category: "book",
    gateNumber: 2,
    realmNumber: 14
  },
  {
    title: "Sacred Sexuality: The Alchemical Union",
    slug: "sacred-sexuality-alchemical-union",
    description: "Explore sexuality as a path to spiritual awakening and energetic mastery.",
    price: 3999,
    category: "book",
    gateNumber: 2,
    realmNumber: 15
  },
  {
    title: "The Body Speaks: Listening to Sensation",
    slug: "body-speaks-listening-sensation",
    description: "Learn the language of your body's sensations and decode its wisdom.",
    price: 2999,
    category: "book",
    gateNumber: 2,
    realmNumber: 16
  },
  {
    title: "Sensory Awakening: The Five Gateways",
    slug: "sensory-awakening-five-gateways",
    description: "Heighten your senses and access deeper dimensions of reality through perception.",
    price: 3499,
    category: "book",
    gateNumber: 2,
    realmNumber: 17
  },
  {
    title: "Touch as Healing: Somatic Therapy",
    slug: "touch-as-healing-somatic-therapy",
    description: "Discover the therapeutic power of conscious touch and bodywork practices.",
    price: 3499,
    category: "book",
    gateNumber: 2,
    realmNumber: 18
  },

  // GATE 3: EMOTION - Feeling Intelligence (6 books)
  {
    title: "Emotional Alchemy: Transmuting Feeling",
    slug: "emotional-alchemy-transmuting-feeling",
    description: "Transform difficult emotions into wisdom, power, and compassionate action.",
    price: 3499,
    category: "book",
    gateNumber: 3,
    realmNumber: 25,
    featured: true
  },
  {
    title: "The Water Within: Emotional Fluidity",
    slug: "water-within-emotional-fluidity",
    description: "Flow with your emotions like water—adaptive, powerful, and life-giving.",
    price: 2999,
    category: "book",
    gateNumber: 3,
    realmNumber: 26
  },
  {
    title: "Grief as Gateway: The Descent",
    slug: "grief-as-gateway-descent",
    description: "Navigate the transformative journey through loss and emerge renewed.",
    price: 3499,
    category: "book",
    gateNumber: 3,
    realmNumber: 27
  },
  {
    title: "Rage and Reclamation: Sacred Anger",
    slug: "rage-and-reclamation-sacred-anger",
    description: "Harness the power of anger as fuel for boundary-setting and change.",
    price: 2999,
    category: "book",
    gateNumber: 3,
    realmNumber: 28
  },
  {
    title: "Joy Unbound: Ecstatic Living",
    slug: "joy-unbound-ecstatic-living",
    description: "Cultivate sustainable joy and access states of natural ecstasy.",
    price: 2999,
    category: "book",
    gateNumber: 3,
    realmNumber: 29
  },
  {
    title: "Fear as Teacher: Courage Practices",
    slug: "fear-as-teacher-courage",
    description: "Transform fear into your greatest ally and teacher on the path.",
    price: 3499,
    category: "book",
    gateNumber: 3,
    realmNumber: 30
  },

  // GATE 4: SHADOW - Integration & Wholeness (6 books)
  {
    title: "The Dark Night: Navigating the Void",
    slug: "dark-night-navigating-void",
    description: "Find guidance through the darkest passages of spiritual transformation.",
    price: 3999,
    category: "book",
    gateNumber: 4,
    realmNumber: 37
  },
  {
    title: "Shadow Work: The 144 Inversions",
    slug: "shadow-work-144-inversions",
    description: "Complete guide to integrating all 144 shadow aspects of consciousness.",
    price: 4999,
    category: "book",
    gateNumber: 4,
    realmNumber: 38,
    featured: true
  },
  {
    title: "Reclaiming the Disowned Self",
    slug: "reclaiming-disowned-self",
    description: "Retrieve the lost parts of yourself and become whole again.",
    price: 3499,
    category: "book",
    gateNumber: 4,
    realmNumber: 39
  },
  {
    title: "The Wounded Healer: Transformation Through Pain",
    slug: "wounded-healer-transformation",
    description: "Turn your deepest wounds into your greatest medicine for self and others.",
    price: 3999,
    category: "book",
    gateNumber: 4,
    realmNumber: 40
  },
  {
    title: "Addiction as Initiation",
    slug: "addiction-as-initiation",
    description: "Understand addiction as a call to deeper transformation and spiritual awakening.",
    price: 3499,
    category: "book",
    gateNumber: 4,
    realmNumber: 41
  },
  {
    title: "The Golden Shadow: Reclaiming Gifts",
    slug: "golden-shadow-reclaiming-gifts",
    description: "Discover and integrate the positive qualities you've disowned.",
    price: 2999,
    category: "book",
    gateNumber: 4,
    realmNumber: 42
  },

  // GATE 5: MIND - Thought Mastery (6 books)
  {
    title: "The Quiet Mind: Meditation Mastery",
    slug: "quiet-mind-meditation-mastery",
    description: "Master the art of meditation and access profound states of inner peace.",
    price: 3499,
    category: "book",
    gateNumber: 5,
    realmNumber: 49
  },
  {
    title: "Thought as Creation: Mental Alchemy",
    slug: "thought-as-creation-mental-alchemy",
    description: "Learn to consciously create reality through disciplined thought.",
    price: 3999,
    category: "book",
    gateNumber: 5,
    realmNumber: 50
  },
  {
    title: "The Observer: Witness Consciousness",
    slug: "observer-witness-consciousness",
    description: "Develop the capacity to observe your mind without identification.",
    price: 2999,
    category: "book",
    gateNumber: 5,
    realmNumber: 51
  },
  {
    title: "Breaking Belief Patterns",
    slug: "breaking-belief-patterns",
    description: "Identify and transform limiting beliefs that constrain your potential.",
    price: 3499,
    category: "book",
    gateNumber: 5,
    realmNumber: 52
  },
  {
    title: "The Hermetic Mind: Seven Principles",
    slug: "hermetic-mind-seven-principles",
    description: "Apply ancient Hermetic wisdom to modern consciousness transformation.",
    price: 4499,
    category: "book",
    gateNumber: 5,
    realmNumber: 53,
    featured: true
  },
  {
    title: "Clarity: The Diamond Mind",
    slug: "clarity-diamond-mind",
    description: "Cultivate crystal-clear perception and penetrating insight.",
    price: 2999,
    category: "book",
    gateNumber: 5,
    realmNumber: 54
  },

  // GATE 6: VISION - Intuitive Sight (6 books)
  {
    title: "The Third Eye: Activating Inner Vision",
    slug: "third-eye-activating-inner-vision",
    description: "Open your third eye and develop clairvoyant perception.",
    price: 3999,
    category: "book",
    gateNumber: 6,
    realmNumber: 61
  },
  {
    title: "Dreamwork: The Night School",
    slug: "dreamwork-night-school",
    description: "Master the art of working with dreams for guidance and healing.",
    price: 3499,
    category: "book",
    gateNumber: 6,
    realmNumber: 62
  },
  {
    title: "Visionary States: Accessing Gnosis",
    slug: "visionary-states-accessing-gnosis",
    description: "Enter altered states of consciousness and receive direct knowing.",
    price: 4499,
    category: "book",
    gateNumber: 6,
    realmNumber: 63
  },
  {
    title: "The Seer's Path: Prophecy & Divination",
    slug: "seers-path-prophecy-divination",
    description: "Develop your capacity for prophecy and divinatory insight.",
    price: 3999,
    category: "book",
    gateNumber: 6,
    realmNumber: 64
  },
  {
    title: "Imagination as Reality: Creative Visualization",
    slug: "imagination-as-reality",
    description: "Harness imagination to shape reality and manifest your vision.",
    price: 2999,
    category: "book",
    gateNumber: 6,
    realmNumber: 65
  },
  {
    title: "Signs & Synchronicity: Reading the Field",
    slug: "signs-synchronicity-reading-field",
    description: "Learn to read the signs and synchronicities that guide your path.",
    price: 3499,
    category: "book",
    gateNumber: 6,
    realmNumber: 66
  },

  // GATE 7: VOICE - Expression & Truth (6 books)
  {
    title: "Speaking Your Truth: Authentic Expression",
    slug: "speaking-your-truth-authentic-expression",
    description: "Find and express your authentic voice with courage and clarity.",
    price: 2999,
    category: "book",
    gateNumber: 7,
    realmNumber: 73
  },
  {
    title: "The Power of Sound: Vibrational Healing",
    slug: "power-of-sound-vibrational-healing",
    description: "Heal and transform through the vibrational power of sound and voice.",
    price: 3499,
    category: "book",
    gateNumber: 7,
    realmNumber: 74
  },
  {
    title: "Mantra & Invocation: Sacred Speech",
    slug: "mantra-invocation-sacred-speech",
    description: "Master the ancient art of mantra and sacred invocation.",
    price: 3999,
    category: "book",
    gateNumber: 7,
    realmNumber: 75
  },
  {
    title: "The Storyteller: Mythic Communication",
    slug: "storyteller-mythic-communication",
    description: "Communicate through the power of myth, metaphor, and story.",
    price: 2999,
    category: "book",
    gateNumber: 7,
    realmNumber: 76
  },
  {
    title: "Silence & Speech: The Sacred Balance",
    slug: "silence-speech-sacred-balance",
    description: "Know when to speak and when to remain silent for maximum impact.",
    price: 2999,
    category: "book",
    gateNumber: 7,
    realmNumber: 77
  },
  {
    title: "Creative Expression: Art as Alchemy",
    slug: "creative-expression-art-alchemy",
    description: "Transform consciousness through creative artistic expression.",
    price: 3499,
    category: "book",
    gateNumber: 7,
    realmNumber: 78
  },

  // GATE 8: HEART - Love & Connection (6 books)
  {
    title: "The Open Heart: Vulnerability as Strength",
    slug: "open-heart-vulnerability-strength",
    description: "Discover the power of an open heart and authentic vulnerability.",
    price: 3499,
    category: "book",
    gateNumber: 8,
    realmNumber: 85,
    featured: true
  },
  {
    title: "Compassion: The Heart of Awakening",
    slug: "compassion-heart-awakening",
    description: "Cultivate boundless compassion for self and all beings.",
    price: 2999,
    category: "book",
    gateNumber: 8,
    realmNumber: 86
  },
  {
    title: "Sacred Relationships: Conscious Partnership",
    slug: "sacred-relationships-conscious-partnership",
    description: "Transform relationships into vehicles for mutual awakening.",
    price: 3999,
    category: "book",
    gateNumber: 8,
    realmNumber: 87
  },
  {
    title: "Forgiveness: The Liberation",
    slug: "forgiveness-liberation",
    description: "Free yourself through the transformative power of forgiveness.",
    price: 2999,
    category: "book",
    gateNumber: 8,
    realmNumber: 88
  },
  {
    title: "The Beloved: Divine Love",
    slug: "beloved-divine-love",
    description: "Experience the ecstasy of divine love and union with the Beloved.",
    price: 3999,
    category: "book",
    gateNumber: 8,
    realmNumber: 89
  },
  {
    title: "Heartbreak as Breakthrough",
    slug: "heartbreak-as-breakthrough",
    description: "Transform heartbreak into the opening to deeper love and wisdom.",
    price: 3499,
    category: "book",
    gateNumber: 8,
    realmNumber: 90
  },

  // GATE 9: WILL - Power & Purpose (6 books)
  {
    title: "The Sovereign Self: Reclaiming Power",
    slug: "sovereign-self-reclaiming-power",
    description: "Step into your full power and sovereignty as a conscious creator.",
    price: 3999,
    category: "book",
    gateNumber: 9,
    realmNumber: 97
  },
  {
    title: "Purpose: The Hero's Journey",
    slug: "purpose-heros-journey",
    description: "Discover and embody your soul's purpose through the hero's path.",
    price: 4499,
    category: "book",
    gateNumber: 9,
    realmNumber: 98,
    featured: true
  },
  {
    title: "Discipline & Devotion: The Warrior's Way",
    slug: "discipline-devotion-warriors-way",
    description: "Master the warrior's path of disciplined practice and devotion.",
    price: 3499,
    category: "book",
    gateNumber: 9,
    realmNumber: 99
  },
  {
    title: "Leadership: The Conscious King/Queen",
    slug: "leadership-conscious-king-queen",
    description: "Lead with wisdom, compassion, and authentic power.",
    price: 3999,
    category: "book",
    gateNumber: 9,
    realmNumber: 100
  },
  {
    title: "Manifestation: Will Made Real",
    slug: "manifestation-will-made-real",
    description: "Master the art of manifestation through aligned will and action.",
    price: 3999,
    category: "book",
    gateNumber: 9,
    realmNumber: 101
  },
  {
    title: "The Sacred No: Boundaries & Protection",
    slug: "sacred-no-boundaries-protection",
    description: "Establish healthy boundaries and protect your energy field.",
    price: 2999,
    category: "book",
    gateNumber: 9,
    realmNumber: 102
  },

  // GATE 10: CROWN - Unity & Transcendence (6 books)
  {
    title: "The Thousand-Petaled Lotus: Crown Awakening",
    slug: "thousand-petaled-lotus-crown",
    description: "Activate your crown chakra and experience unity consciousness.",
    price: 4499,
    category: "book",
    gateNumber: 10,
    realmNumber: 109
  },
  {
    title: "Non-Dual Awareness: Beyond Self",
    slug: "non-dual-awareness-beyond-self",
    description: "Realize the truth of non-duality and rest in pure awareness.",
    price: 4999,
    category: "book",
    gateNumber: 10,
    realmNumber: 110,
    featured: true
  },
  {
    title: "The Mystic's Path: Direct Experience",
    slug: "mystics-path-direct-experience",
    description: "Walk the mystic's path of direct spiritual experience.",
    price: 3999,
    category: "book",
    gateNumber: 10,
    realmNumber: 111
  },
  {
    title: "Enlightenment: The Great Liberation",
    slug: "enlightenment-great-liberation",
    description: "Understand and approach the ultimate liberation of enlightenment.",
    price: 4999,
    category: "book",
    gateNumber: 10,
    realmNumber: 112
  },
  {
    title: "The Void: Emptiness as Fullness",
    slug: "void-emptiness-as-fullness",
    description: "Discover the pregnant void where all possibilities arise.",
    price: 3999,
    category: "book",
    gateNumber: 10,
    realmNumber: 113
  },
  {
    title: "Cosmic Consciousness: The Universal Mind",
    slug: "cosmic-consciousness-universal-mind",
    description: "Expand into cosmic consciousness and universal awareness.",
    price: 4499,
    category: "book",
    gateNumber: 10,
    realmNumber: 114
  },

  // GATE 11: INTEGRATION - Embodied Mastery (6 books)
  {
    title: "The Integrated Self: Wholeness Realized",
    slug: "integrated-self-wholeness-realized",
    description: "Integrate all aspects of self into coherent wholeness.",
    price: 3999,
    category: "book",
    gateNumber: 11,
    realmNumber: 121
  },
  {
    title: "Living the Teaching: Embodied Wisdom",
    slug: "living-teaching-embodied-wisdom",
    description: "Embody spiritual wisdom in every moment of daily life.",
    price: 3499,
    category: "book",
    gateNumber: 11,
    realmNumber: 122
  },
  {
    title: "The Four Currents: Elemental Balance",
    slug: "four-currents-elemental-balance",
    description: "Master the balance of Earth, Water, Air, and Fire within.",
    price: 4499,
    category: "book",
    gateNumber: 11,
    realmNumber: 123,
    featured: true
  },
  {
    title: "Sacred Service: The Bodhisattva Way",
    slug: "sacred-service-bodhisattva-way",
    description: "Dedicate your life to the awakening and service of all beings.",
    price: 3999,
    category: "book",
    gateNumber: 11,
    realmNumber: 124
  },
  {
    title: "The Elder: Wisdom Keeper",
    slug: "elder-wisdom-keeper",
    description: "Step into the role of elder and wisdom keeper for your community.",
    price: 3999,
    category: "book",
    gateNumber: 11,
    realmNumber: 125
  },
  {
    title: "Mastery: The 10,000 Hours",
    slug: "mastery-ten-thousand-hours",
    description: "Understand the path of mastery through dedicated practice.",
    price: 3499,
    category: "book",
    gateNumber: 11,
    realmNumber: 126
  },

  // GATE 12: RETURN - Completion & New Beginning (5 books - total 71)
  {
    title: "The Return: Omega to Alpha",
    slug: "return-omega-to-alpha",
    description: "Complete the cycle and return to the beginning, transformed.",
    price: 4999,
    category: "book",
    gateNumber: 12,
    realmNumber: 133,
    featured: true
  },
  {
    title: "Rest in Completion: The Sabbath",
    slug: "rest-in-completion-sabbath",
    description: "Learn the sacred art of rest and completion.",
    price: 2999,
    category: "book",
    gateNumber: 12,
    realmNumber: 134
  },
  {
    title: "The Spiral Path: Cycles of Growth",
    slug: "spiral-path-cycles-growth",
    description: "Understand growth as a spiral—returning but at a higher level.",
    price: 3999,
    category: "book",
    gateNumber: 12,
    realmNumber: 135
  },
  {
    title: "Legacy: What You Leave Behind",
    slug: "legacy-what-you-leave-behind",
    description: "Create a legacy that serves future generations.",
    price: 3499,
    category: "book",
    gateNumber: 12,
    realmNumber: 136
  },
  {
    title: "The 33rd House: Complete Codex",
    slug: "33rd-house-complete-codex",
    description: "The complete reference guide to The 33rd House system—all 144 realms.",
    price: 9999, // $99.99 - Premium comprehensive guide
    category: "book",
    gateNumber: 12,
    realmNumber: 144,
    featured: true
  }
];
