export interface Book {
  id: string;
  title: string;
  author: string;
  category: 'codex' | 'curriculum' | 'guide' | 'manual' | 'institute';
  description: string;
  filename: string;
  coverImage: string;
  featured?: boolean;
}

export const books: Book[] = [
  // Featured Books
  {
    id: 'complete-codex',
    title: 'The Complete Codex - Master Reference',
    author: 'Daniel Cruze',
    category: 'codex',
    description: 'The complete master reference guide to The 33rd House system, containing all 12 Gates and 144 Realms with detailed teachings, practices, and initiations.',
    filename: '33rd-house-complete-codex-master-reference.pdf',
    coverImage: '/covers/codex-cover.webp',
    featured: true,
  },
  {
    id: 'complete-curriculum',
    title: 'Inner Circle - Complete 12-Month Curriculum',
    author: 'Daniel Cruze',
    category: 'curriculum',
    description: 'The full 48-week Inner Circle curriculum covering all 12 months of consciousness transformation work.',
    filename: 'COMPLETE-CURRICULUM.pdf',
    coverImage: '/covers/curriculum-cover.webp',
    featured: true,
  },

  // Monthly Curriculum
  ...Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    const months = [
      'Presence & Grounding',
      'Regulation & Flow',
      'Identity & Boundaries',
      'Power & Will',
      'Connection & Relationship',
      'Shadow & Reflection',
      'Union & Integration',
      'Death & Rebirth',
      'Vision & Clarity',
      'Law & Order',
      'Paradox & Mystery',
      'Return & Completion'
    ];
    return {
      id: `month-${String(monthNum).padStart(2, '0')}`,
      title: `Month ${monthNum}: ${months[i]}`,
      author: 'Daniel Cruze',
      category: 'curriculum' as const,
      description: `Four-week curriculum for Month ${monthNum} covering ${months[i].toLowerCase()}.`,
      filename: `month-${String(monthNum).padStart(2, '0')}-${months[i].toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}.pdf`,
      coverImage: '/covers/curriculum-cover.webp',
    };
  }),

  // Codex Books
  {
    id: 'public-codex-1',
    title: 'Public Codex - Chapter I',
    author: 'Daniel Cruze',
    category: 'codex',
    description: 'Introduction to The 33rd House system and the Star Gate Cosmology.',
    filename: '01_Public_Codex_Chapter_I_1.pdf',
    coverImage: '/covers/codex-cover.webp',
  },
  {
    id: 'book-1',
    title: 'Book 1: Star Gate Cosmology - Systems 1 & 2',
    author: 'Daniel Cruze',
    category: 'codex',
    description: 'Foundational text covering the first two systems of the Star Gate Cosmology.',
    filename: 'BOOK_1_Star_Gate_Cosmology_System_1_2.pdf',
    coverImage: '/covers/codex-cover.webp',
  },
  {
    id: 'inner-temple-2',
    title: 'Inner Temple Codex - Book 2',
    author: 'Daniel Cruze',
    category: 'codex',
    description: 'Advanced teachings for Inner Circle members on temple work and sacred practices.',
    filename: 'Inner_Temple_Codex_Book_2.pdf',
    coverImage: '/covers/codex-cover.webp',
  },

  // Guides
  {
    id: 'white-paper',
    title: 'The 33rd House White Paper',
    author: 'Daniel Cruze',
    category: 'guide',
    description: 'Comprehensive white paper outlining the philosophy, structure, and implementation of The 33rd House.',
    filename: '02_White_Paper_2.pdf',
    coverImage: '/covers/guide-cover.webp',
  },
  {
    id: '12-week-course',
    title: '12-Week Course - Module 1',
    author: 'Daniel Cruze',
    category: 'guide',
    description: 'First module of the foundational 12-week introduction course.',
    filename: '03_12_Week_Course_Module_1.pdf',
    coverImage: '/covers/guide-cover.webp',
  },

  // Manuals
  {
    id: 'facilitator-manual',
    title: 'Facilitator Manual',
    author: 'Daniel Cruze',
    category: 'manual',
    description: 'Complete guide for certified facilitators leading 33rd House groups and workshops.',
    filename: '33RDHOUSE_FACILITATOR_MANUAL_1.pdf',
    coverImage: '/covers/manual-cover.webp',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Manual',
    author: 'Daniel Cruze',
    category: 'manual',
    description: 'Visual identity, branding guidelines, and design standards for The 33rd House.',
    filename: '33RDHOUSE_BRAND_IDENTITY_MANUAL_1.pdf',
    coverImage: '/covers/manual-cover.webp',
  },
  {
    id: 'academy-foundation',
    title: 'Academy Foundation Manual',
    author: 'Daniel Cruze',
    category: 'manual',
    description: 'Foundation principles and structure for The 33rd House Academy.',
    filename: '33RDHOUSE_ACADEMY_FOUNDATION_1.pdf',
    coverImage: '/covers/manual-cover.webp',
  },

  // Institute Documentation
  {
    id: 'institute-overview',
    title: '33rd House Institute Overview',
    author: 'Daniel Cruze',
    category: 'institute',
    description: 'Overview of the 33rd House Institute structure, mission, and programs.',
    filename: '33rd_House_Institute_Overview.pdf',
    coverImage: '/covers/institute-cover.webp',
  },
  {
    id: 'certification-pathway',
    title: 'Certification Pathway',
    author: 'Daniel Cruze',
    category: 'institute',
    description: 'Complete pathway for becoming a certified 33rd House practitioner or facilitator.',
    filename: '33rd_House_Institute_Certification_Pathway.pdf',
    coverImage: '/covers/institute-cover.webp',
  },
  {
    id: 'implementation-roadmap',
    title: '12-Month Implementation Roadmap',
    author: 'Daniel Cruze',
    category: 'institute',
    description: 'Step-by-step roadmap for implementing The 33rd House system in communities.',
    filename: '33rd_House_Institute_12_Month_Implementation_Roadmap.pdf',
    coverImage: '/covers/institute-cover.webp',
  },
  {
    id: 'governance-pack',
    title: 'Governance Pack',
    author: 'Daniel Cruze',
    category: 'institute',
    description: 'Complete governance structure and administrative protocols.',
    filename: '33rd_House_Institute_Governance_Pack.pdf',
    coverImage: '/covers/institute-cover.webp',
  },
  {
    id: 'client-handbook',
    title: 'Client & Community Handbook',
    author: 'Daniel Cruze',
    category: 'institute',
    description: 'Handbook for clients and community members participating in Institute programs.',
    filename: '33rd_House_Institute_Client_Community_Handbook.pdf',
    coverImage: '/covers/institute-cover.webp',
  },
];

export const getBooksByCategory = (category: Book['category']) => {
  return books.filter(book => book.category === category);
};

export const getFeaturedBooks = () => {
  return books.filter(book => book.featured);
};

export const getBookById = (id: string) => {
  return books.find(book => book.id === id);
};
