// app/(marketing)/landing/page.tsx
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
// If you have a Separator primitive: import { Separator } from '@/components/ui/separator';

const logos = [
  { src: '/brand/veripass-mark.svg', alt: 'VeriPass' },
  { src: '/vercel.svg', alt: 'Vercel' },
  { src: '/logo.png', alt: 'Customer' },
  { src: '/logowhite.png', alt: 'Partner' },
];

const features = [
  {
    title: 'Collect product data',
    desc: 'Materials, suppliers, certifications, CO₂ and lifecycle details. Manual entry or CSV import.',
  },
  {
    title: 'Standardize for the EU DPP',
    desc: 'Normalize to GS1/EPCIS-aligned structures with validation so SMEs don’t drown in specs.',
  },
  {
    title: 'Generate QR / NFC passports',
    desc: 'Create scannable passports with public/private views and role-based access.',
  },
  {
    title: 'Audit-ready trail',
    desc: 'Who changed what and when — captured automatically for compliance and trust.',
  },
];

const faqs = [
  {
    q: 'What is a Digital Product Passport (DPP)?',
    a: 'A standardized data record required by the EU (ESPR) to improve transparency, circularity, and sustainability across product lifecycles.',
  },
  {
    q: 'Do we need ESG calculators?',
    a: 'Not to get started here. VeriPass focuses on data handling and documentation. You can plug in ESG later if needed.',
  },
  {
    q: 'How does QR/NFC work?',
    a: 'We generate a QR/NFC that points to a role-aware product page. Public info is visible to all, sensitive data requires permission.',
  },
  {
    q: 'Is this SME-friendly?',
    a: 'Yes. We optimize for small teams: simple forms, CSV import, clear validation, and sane defaults.',
  },
];

export default function Landing() {
  <LandingHeader />;
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Hero />
      <LogoCloud />
      <FeatureGrid />
      <HowItWorks />
      <CtaPricing />
      <Faq />
      <Footer />
    </div>
  );
}

function LandingHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        VeriPass
      </Link>
      <nav className="flex items-center gap-2 sm:gap-3">
        <Button asChild size="md">
          <Link href="/auth/join">Sign up</Link>
        </Button>
        <Button asChild size="md" variant="outline">
          <Link href="/auth/login">Sign in</Link>
        </Button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium">
              EU ESPR · Digital Product Passport
            </span>
            <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-tight md:text-5xl">
              DPP compliance for SMEs — from spreadsheet to QR/NFC in minutes
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              VeriPass standardizes your product data to EU DPP formats,
              generates role-aware passports, and keeps an audit trail — without
              heavy IT.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href="/auth/join">Sign up</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/(marketing)/landing#features">See features</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No credit card required • Email magic link sign-in
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-20 -z-10 rounded-full bg-brand/10 blur-3xl" />
            <div className="rounded-2xl border bg-card p-3 shadow-sm">
              <Image
                src="/home-hero.svg"
                alt="VeriPass product hero"
                width={1200}
                height={800}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCloud() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-wider text-muted-foreground">
          Built on modern, secure foundations
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-4">
          {logos.map((l, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-md bg-background p-4"
            >
              {/* Prefer SVGs in /public/brand */}
              <Image
                src={l.src}
                alt={l.alt}
                width={120}
                height={48}
                className="h-8 w-auto opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Everything you need for DPP — nothing you don’t
          </h2>
          <p className="mt-3 text-muted-foreground">
            Clean data in, compliant passports out. Built for speed and sanity.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                <div>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      k: '1',
      title: 'Import product data',
      desc: 'Manual forms or CSV. We validate and highlight what’s missing.',
    },
    {
      k: '2',
      title: 'Standardize & validate',
      desc: 'We map fields to EU-aligned structures and run schema checks.',
    },
    {
      k: '3',
      title: 'Publish QR / NFC passport',
      desc: 'Share a role-aware product page — public for customers, gated for partners.',
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            A guided flow that gets SMEs compliant without heavy processes.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.k}
              className="rounded-xl border bg-card p-6 shadow-sm ring-1 ring-transparent transition hover:ring-brand/30"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground">
                {s.k}
              </div>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaPricing() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/10 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-8 rounded-2xl border bg-card p-8 shadow-sm md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              Start generating passports today
            </h3>
            <p className="mt-2 text-muted-foreground">
              Create your first product, import a CSV, and publish a QR in
              minutes.
            </p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <Button asChild variant="brand" size="lg">
              <Link href="/auth/login">Create account</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/(marketing)/landing#faq">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-4">
        <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y">
          {faqs.map((item, idx) => (
            <details key={idx} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-left text-base font-medium">
                <span>{item.q}</span>
                <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} VeriPass ProductLink</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/imprint">Imprint</Link>
        </div>
      </div>
    </footer>
  );
}
