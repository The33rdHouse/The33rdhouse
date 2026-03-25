# The 33rd House

Mystery school platform for spiritual education.

## Local development

### 1) Install dependencies

```bash
pnpm install
```

### 2) Create your local environment file

```bash
cp .env.example .env
```

Minimum variables for basic local launch:

- `DATABASE_URL`
- `OWNER_OPEN_ID` (if you need owner-level admin actions)

> `STRIPE_SECRET_KEY` is optional for booting the app locally.
> Email defaults to a safe no-op provider (`EMAIL_PROVIDER=noop`).
> Set `EMAIL_PROVIDER=resend` + `RESEND_API_KEY` to enable real email delivery.

### 3) Start the app

```bash
pnpm dev
```

By default, server runs on `http://localhost:3000`.

If port 3000 is already in use:

```bash
PORT=3001 pnpm dev
```

## Useful scripts

- `pnpm dev` – Run the app in development mode
- `pnpm build` – Build client and server bundles
- `pnpm start` – Start the production build
- `pnpm check` – TypeScript baseline check (excludes known legacy hotspots)
- `pnpm check:full` – Full strict TypeScript check across all files
- `pnpm test` – Run tests with Vitest

## Troubleshooting

### Server crashes on startup with missing keys

The app now tolerates missing `STRIPE_SECRET_KEY` at startup, and email defaults to a no-op provider.
If you still see a crash, verify there are no stale processes and restart:

```bash
pkill -f "tsx watch server/index.ts" || true
pnpm dev
```

### Port already in use (`EADDRINUSE`)

Either stop the process using that port, or run on a different one:

```bash
PORT=3001 pnpm dev
```
