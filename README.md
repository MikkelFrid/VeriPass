# VeriPass ProductLink

Digital Product Passport (DPP) platform for SMEs — built on Next.js 15, Prisma + Postgres (Neon), NextAuth (Resend magic link), Tailwind v4 + shadcn/ui. Deployed on Vercel.

**Focus:** product data handling → standardization → QR/NFC → public/private pages.  
**Not** an ESG calculator.

---

## 🧭 Project Structure

src/
app/ # App Router (Next.js 15)
components/ # UI primitives (Button, Input, Checkbox) + shared components
lib/ # server/client helpers
styles/ # Tailwind tokens, globals.css
prisma/
schema.prisma # DB schema
migrations/ # Prisma migrations
seed.ts # SUPERADMIN + demo org + sample products
public/ # static assets
prompts/ # reusable prompts for assistant
README.md
commands.md # quick cheatsheet

---

## 🚦 Ways of Working

1. One feature = one branch + one PR
   - Start with a file map + schema/types outline.
   - Keep PRs shippable.
2. Assistant helps plan & review
   - File-by-file outlines, Zod schemas, shadcn component choices.
   - Catch a11y, type-safety, Tailwind bloat.
3. Standards
   - Type-safe props everywhere.
   - Internal navigation via `src/components/link.tsx`.
   - Use `components/ui/*` primitives (`Button`, `Input`, `Checkbox`).
   - Buttons: `variant` (`brand`, `secondary`, `destructive`, etc.), `isLoading` for spinners.
   - Minimal external deps.
4. Deployment
   - Vercel auto-deploys previews → main = production.
5. Docs
   - Keep `README.md` and `commands.md` current.
   - Store prompts in `/prompts`.

---

## ⚙️ Requirements

- Node.js 20+
- pnpm (preferred)
- Postgres (Neon recommended)
- Vercel account (deploy + env)

---

## 🔐 Environment Variables

`.env.local` for dev (Vercel manages preview/prod):

```env
# App
APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me

# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?sslmode=require

# Email (Resend)
RESEND_API_KEY=re_********************************
EMAIL_FROM="VeriPass <login@veripass.dev>"


⸻

🛠️ Local Dev

# Install deps
pnpm install

# Prisma
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed   # creates SUPERADMIN + Demo org + products

# Start dev server (Turbopack)
pnpm dev
# → http://localhost:3000

# Lint fix and format
pnpm lint:fix
pnpm format


⸻

🧾 Database Workflow

# edit schema.prisma → create migration
pnpm prisma:migrate

# deploy migration to prod
pnpm prisma:deploy

# inspect
pnpm prisma:studio


⸻

🔑 Auth (NextAuth + Resend)
	•	Email magic link auth only (Resend).
	•	RESEND_API_KEY + EMAIL_FROM required.
	•	Domain must be verified in Resend (SPF/DKIM/Return-Path).

⚖️ Middleware
	•	middleware.ts whitelists `/`, `/landing`, and all `/auth/*` routes.
	•	Other routes require authentication (JWT or DB strategy).

⸻

✉️ Email
	•	Templates live in src/lib/email.
	•	Dev: magic link URL printed in server logs.
	•	Prod: links resolve via APP_URL.

⸻

🎨 UI & Styling
	•	Tailwind v4 — tokens in styles/globals.css (@theme inline).
	•	No DaisyUI. All UI primitives are shadcn/ui based.
	•	UI primitives: components/ui/button.tsx, input.tsx, checkbox.tsx.
	•	Brand tokens: bg-brand, text-brand-foreground, text-destructive-foreground, bg-muted, etc.
	•	Style guide:
	•	Rounded corners, single-pixel rings.
	•	High-contrast focus states.
	•	Dark mode supported.

⸻

🚀 Deployment
	•	GitHub → Vercel.
	•	PR → Preview, main → Production.
	•	Ensure ENV vars exist in Vercel.
	•	Run pnpm prisma:deploy after schema changes merged.

⸻

🌱 Seeding

prisma/seed.ts creates:
	•	SUPERADMIN user
	•	Demo org (“Demo Bikes A/S”)
	•	Sample products

Run:

pnpm prisma:seed


⸻

🔀 Branching & PRs

git checkout -b feature/<short-name>

PR checklist:
	•	File map + rationale
	•	Types & Zod schemas
	•	a11y (labels, roles, keyboard nav)
	•	Tailwind tidy
	•	Docs updated
	•	Works on preview

⸻

🧹 Code Quality

pnpm typecheck
pnpm lint
pnpm format


⸻

📁 Prompts

Reusable starter prompts → /prompts.

⸻

📜 License

Private (© VeriPass). Do not distribute.

---

Want me to also update your **assistant prompt** right after this, or keep that for a separate step?
```
