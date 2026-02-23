# The 33rd House - Platform

**Mystery School Platform for Spiritual Education and Transformation**

---

## Overview

The 33rd House is a comprehensive digital platform for spiritual education, combining ancient wisdom traditions with modern technology. The platform guides users through a transformational journey across 12 Gates of consciousness development, integrating teachings from 100+ spiritual traditions worldwide.

### Key Features

- **12 Gates System**: Somatic and psychological stages of spiritual development
- **144 Realms**: Deep exploration across 12 traditions × 12 gates
- **Personalized Learning Paths**: Adaptive curriculum based on user progress
- **Progress Tracking**: Multi-dimensional tracking across physical, emotional, mental, and spiritual domains
- **Course Management**: Enrollment, lessons, and completion tracking
- **Stripe Integration**: Subscription billing and payment processing
- **Community Features**: Posts, comments, and Inner Temple for advanced practitioners
- **Facilitator Network**: Distributed local nodes for embodied practice

---

## Tech Stack

### Frontend
- **React 19**: Modern UI with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling with custom design system
- **Wouter**: Lightweight client-side routing
- **TanStack Query**: Server state management
- **tRPC**: End-to-end type-safe APIs
- **Framer Motion**: Smooth animations and transitions
- **shadcn/ui**: High-quality React components

### Backend
- **Node.js 22**: Modern JavaScript runtime
- **Express**: Web application framework
- **tRPC**: Type-safe API layer
- **PostgreSQL 16**: Relational database
- **Drizzle ORM**: Type-safe database queries

### Services
- **Stripe**: Payment processing and subscriptions
- **Resend**: Transactional email
- **OpenAI**: AI-powered insights and chatbot

### Development
- **Vite 7**: Fast build tool and dev server
- **TypeScript 5.9**: Static type checking
- **Vitest**: Unit and integration testing
- **ESBuild**: Fast JavaScript bundler
- **pnpm**: Efficient package management

---

## Project Structure

```
the33rdhouse-platform/
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   │   ├── covers/          # Gate and book cover images
│   │   └── favicon.ico      # Site favicon
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   └── *.tsx       # Custom components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   │   ├── gates/      # Gate-specific pages
│   │   │   ├── sacred/     # Sacred library pages
│   │   │   └── *.tsx       # Other pages
│   │   ├── App.tsx          # Main app component with routing
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles and Tailwind config
│   └── index.html           # HTML entry point
│
├── server/                   # Backend application
│   ├── routes/              # API route handlers
│   ├── db/                  # Database configuration
│   ├── index.ts             # Server entry point
│   └── __tests__/           # Server tests
│
├── drizzle/                 # Database migrations
│   └── migrations/          # SQL migration files
│
├── shared/                  # Shared types and constants
│   └── types.ts             # TypeScript type definitions
│
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── drizzle.config.ts        # Drizzle ORM configuration
```

---

## Getting Started

### Prerequisites

- **Node.js 22+** (LTS recommended)
- **PostgreSQL 16+**
- **pnpm 10+**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   gh repo clone The33rdHouse/the33rdhouse-platform
   cd the33rdhouse-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/the33rdhouse
   
   # Authentication
   JWT_SECRET=your-secret-key-here
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Email
   RESEND_API_KEY=re_...
   
   # OpenAI (optional)
   OPENAI_API_KEY=sk-...
   
   # Application
   NODE_ENV=development
   PORT=3000
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb the33rdhouse
   
   # Run migrations
   pnpm db:push
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```
   
   The application will be available at `http://localhost:3000`

---

## Available Scripts

### Development
- `pnpm dev` - Start development server with hot reload
- `pnpm check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

### Database
- `pnpm db:push` - Generate and run database migrations

### Testing
- `pnpm test` - Run test suite with Vitest

### Production
- `pnpm build` - Build for production
- `pnpm start` - Start production server

---

## Database Schema

### Core Tables

- **users** - User accounts and authentication
- **gates** - 12 Gates of spiritual development
- **realms** - 144 Realms (12 gates × 12 traditions)
- **traditions** - Spiritual traditions and lineages
- **deities** - Sacred figures and archetypes
- **practices** - Spiritual practices and techniques
- **symbols** - Sacred symbols and their meanings

### User Progress

- **user_progress** - Multi-dimensional progress tracking
- **enrollments** - Course enrollments
- **completions** - Lesson and course completions

### Content

- **courses** - Educational courses
- **lessons** - Individual lessons within courses
- **books** - Sacred library books
- **posts** - Community posts and discussions

### Commerce

- **subscriptions** - Stripe subscription management
- **payments** - Payment transaction records

---

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy Options

1. **Vercel** (Recommended for static + serverless)
2. **VPS** (Full control, self-hosted)
3. **Kubernetes** (Enterprise scale)

---

## Configuration

### Stripe Setup

See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for complete Stripe integration guide.

### Email Templates

Email templates are managed through Resend. Configure templates in the Resend dashboard.

### Environment Variables

All environment variables are documented in `.env.example`.

---

## Contributing

This is a private project for The 33rd House Pty Ltd. For internal contributors:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "Add feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Create a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by Prettier)
- Write tests for new features
- Update documentation as needed

---

## Related Repositories

- **[curriculum](https://github.com/The33rdHouse/ASCENSION_FULL_KNOWLEDGE_BASE)** - 12-month Inner Circle curriculum content
- **[documentation](https://github.com/The33rdHouse/documentation)** - Architecture and implementation guides (if created)

---

## Architecture

### Authentication Flow

1. User registers/logs in
2. JWT token issued and stored in httpOnly cookie
3. Token validated on each request
4. User session managed server-side

### Data Flow

1. Frontend makes tRPC call
2. Backend validates authentication
3. Database query via Drizzle ORM
4. Response sent back to frontend
5. TanStack Query caches result

### Payment Flow

1. User selects subscription plan
2. Stripe Checkout session created
3. User completes payment
4. Webhook confirms payment
5. Subscription activated in database

---

## Support

For questions, issues, or support:

- **Email**: support@the33rdhouse.org
- **Documentation**: See `/docs` folder
- **Issues**: Create a GitHub issue (internal team only)

---

## License

**Proprietary** - The 33rd House Pty Ltd  
**ABN**: 97687 789 199

All rights reserved. This code is private and confidential.

---

## Acknowledgments

Built with love and consciousness by The 33rd House team.

**Founder**: The Cruze Estate Trust 
**Organization**: The 33rd House Pty Ltd  
**Mission**: Democratizing access to spiritual wisdom and transformation

---

**Version**: 1.0.0  
**Last Updated**: February 8, 2026
