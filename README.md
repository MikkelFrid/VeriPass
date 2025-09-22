VeriPass ProductLink

Digital Product Passport (DPP) platform for SMEs — built on Next.js 15, Prisma + Postgres (Neon), NextAuth (Resend magic link), Tailwind v4 + shadcn/ui. Deployed on Vercel.

Focus: product data handling → standardization → QR/NFC → public/private pages.
Not an ESG calculator.

⸻

🧭 Project Structure (high level)

src/
  app/                 # App Router (Next.js 15)
  components/          # UI + shared components (shadcn/Catalyst-inspired)
  lib/                 # server/client helpers
  styles/              # Tailwind, globals
prisma/
  schema.prisma        # DB schema
  migrations/          # Prisma migrations
  seed.ts              # (Milestone 1) idempotent seed script
public/                # static assets
prompts/               # reusable prompts for new chats
README.md
commands.md            # quick command cheatsheet (optional)


⸻

🚦 Ways of Working
	1.	One feature = one branch + one PR
	•	Start with a short file map + schema/types outline.
	•	Implement step-by-step; keep PRs shippable.
	2.	Assistant helps plan & review
	•	File-by-file outlines, Zod schemas, shadcn component choices.
	•	Catch a11y issues, type-safety gaps, Tailwind bloat.
	•	Focused refactors only (no sweeping rewrites).
	3.	Standards
	•	Type-safe props everywhere.
	•	Use src/components/link.tsx for internal navigation.
	•	Prefer shadcn/Catalyst components with Tailwind classes.
	•	Minimal external deps; justify additions in PR description.
	4.	Deployment
	•	Vercel auto-deploys preview for PRs, main → production.
	•	Every PR should look correct on its preview URL.
	5.	Docs
	•	Keep README.md and commands.md current.
	•	Store reusable chat prompts in /prompts.

⸻

⚙️ Requirements
	•	Node.js 20+ (or 18+, but we standardize on 20)
	•	pnpm (recommended) or npm
	•	Postgres (Neon recommended)
	•	Vercel account (for deploy + env)

⸻

🔐 Environment Variables

Create .env.local for local dev (Vercel manages prod/stage env). Example:

# App
APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me # openssl rand -base64 32

# Database (Neon)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require

# Email (Resend)
RESEND_API_KEY=re_********************************
EMAIL_FROM="VeriPass <login@veripass.dev>"

# Optional (branding toggles, analytics, etc.)
# NEXT_PUBLIC_BRAND_NAME=VeriPass

Vercel: set the same variables in the Project → Settings → Environment Variables (preview & production).

⸻

🛠️ Install & Run (Local)

# 1) Install deps
pnpm install

# 2) Generate Prisma client
pnpm prisma:generate

# 3) Run migrations (or baseline first if starting fresh)
pnpm prisma:migrate

# 4) (Milestone 1) Seed demo data (SUPERADMIN + Demo org + products)
pnpm prisma:seed

# 5) Start dev server (Turbopack)
pnpm dev

# open http://localhost:3000

Common package.json scripts (expected):

{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:seed": "tsx prisma/seed.ts"
  },
  "devDependencies": {
    "tsx": "^4.19.2"
  }
}

If you prefer Prisma’s native hook, add "prisma": { "seed": "tsx prisma/seed.ts" } and run pnpm prisma db seed.

⸻

🧾 Database Workflow (Prisma)
	•	Edit prisma/schema.prisma
	•	Create a migration (local dev):

pnpm prisma:migrate


	•	Push to prod/stage (Vercel):
	•	Add migration to repo and merge to main.
	•	Vercel build runs; then run:

pnpm prisma:deploy

(either via Vercel job/cron/action or a one-off shell on your managed DB runner)

	•	Inspect data with Prisma Studio:

pnpm prisma:studio



⸻

🔑 Auth (NextAuth) — Email Magic Link via Resend
	•	NEXTAUTH_SECRET set (generate with openssl rand -base64 32).
	•	Resend configured:
	•	Set RESEND_API_KEY and EMAIL_FROM (domain authenticated in Resend).
	•	For local dev, use a dev.veripass.local sender or similar.
	•	(Optional) Add social providers later (GitHub/Google) if needed.

⸻

✉️ Email (Resend)
	•	Domain setup in Resend (SPF/DKIM/Return-Path).
	•	Magic link templates live in src/lib/email (or similar).
	•	In dev, inspect logs for magic link URLs.
	•	In prod, links use APP_URL (set per environment).

⸻

🧩 UI & Styling
	•	Tailwind v4 with project tokens:
	 	- `styles/globals.css` uses `@import "tailwindcss";` and `@plugin "daisyui";`
  		- Minimal `tailwind.config.js` (no DaisyUI plugin require)
	•   DaisyUI v5 themes via `data-theme` (`corporate`/`black`). See `pages/_app.tsx` & `pages/_document.tsx`.
	•   Removed `react-daisyui`. A light shim lives at `components/ui/daisy.tsx`.
	•	Use brand tokens like bg-brand, text-brand-strong, bg-muted.
	•	shadcn/ui for primitives.
	•	Follow our design preferences:
	•	Clean, minimal, rounded-2xl, single-pixel rings.
	•	High-contrast focus states.
	•	Dark mode supported.


⸻

🚀 Deployment (Vercel)
	•	Repo connected to Vercel.
	•	PR → Preview, main → Production.
	•	Ensure ENV vars are present for preview & prod.
	•	After schema changes merged to main, run pnpm prisma:deploy against prod DB.

⸻

🌱 Seeding (Milestone 1)
	•	prisma/seed.ts (idempotent):
	•	Creates SUPERADMIN user (email from SEED_SUPERADMIN_EMAIL or default).
	•	Creates demo org “Demo Bikes A/S”.
	•	Seeds a couple of sample products.
	•	Run:

pnpm prisma:seed



⸻

🔀 Branching & PRs
	•	Create a branch per feature:

git checkout -b feature/<short-name>


	•	Keep changes focused; include migration if schema changes.
	•	Push and open a PR; verify the Vercel preview.
	•	Merge via squash/merge; main auto-deploys.

PR checklist
	•	File map & rationale in description
	•	Types & Zod schemas added/updated
	•	a11y (labels, roles, keyboard nav)
	•	Tailwind classes tidy; no unused styles
	•	README.md / commands.md updated if needed
	•	Works on Vercel preview

⸻

🧹 Code Quality

pnpm typecheck
pnpm lint
pnpm format

	•	Prefer small, composable components.
	•	Avoid global mutable state; prefer server actions or tRPC/REST modules with clear boundaries.
	•	Error handling with toasts + inline form messages.

⸻

🧪 Testing (optional to start)
	•	Add tests under tests/ as we grow.
	•	Consider Playwright for E2E and Vitest/Jest for unit tests.

⸻

🩺 Troubleshooting

I can’t log in (no email received).
	•	Check RESEND_API_KEY / domain verification.
	•	In dev, check server logs for magic link URL.

Prisma migration errors.
	•	Ensure local DATABASE_URL points to the right Neon branch.
	•	Regenerate client: pnpm prisma:generate.
	•	If you changed models, create a new migration: pnpm prisma:migrate.

Vercel build fails.
	•	Missing env var → set in Vercel Project Settings → redeploy.
	•	Type errors → run pnpm typecheck locally.

⸻

📁 Prompts

Reusable starter prompts live in /prompts.
Use them to bootstrap new chats with the exact project context & workflow.

⸻

📜 License

Private (© VeriPass). Do not distribute.

⸻

(Optional) commands.md

If you want a quick cheatsheet, create commands.md with:

# Commands

## Dev
pnpm install
pnpm dev

## Prisma
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:deploy
pnpm prisma:studio
pnpm prisma:seed

## Quality
pnpm typecheck
pnpm lint
pnpm format

## Build/Start
pnpm build
pnpm start

Local dev:
- `pnpm dev`

CI/Deploy:
- Tailwind v4 needs build-script approval. We run `pnpm approve-builds -y` via `postinstall`.