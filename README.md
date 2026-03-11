# preQual — Investor Prototype

A production-structured Next.js application for the preQual lead qualification
system targeting SEQ residential builders.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 14 (App Router)             |
| Language     | TypeScript 5                        |
| Styling      | Tailwind CSS 3                      |
| Animation    | Framer Motion 11                    |
| Charts       | Recharts 2                          |
| Utilities    | clsx + tailwind-merge               |

---

## Project Structure

```
prequal/
├── app/
│   ├── layout.tsx          # Root layout, metadata, global CSS
│   ├── page.tsx            # Entry point → renders PreQualShell
│   └── globals.css         # Tailwind directives, font import, keyframes
│
├── components/
│   ├── PreQualShell.tsx    # Top-level client shell — owns NavSection state
│   ├── Navbar.tsx          # Sticky top nav
│   │
│   ├── ui/                 # Reusable primitives
│   │   ├── Button.tsx      # lime / ghost / dark / outline variants
│   │   ├── Card.tsx        # Card + CardHeader + CardBody
│   │   ├── Badge.tsx       # Badge, StatusBadge, TagPill
│   │   ├── ProgressBar.tsx # Animated Framer Motion progress bar
│   │   ├── InputField.tsx  # Dark-theme input with label + error
│   │   ├── ScoreRing.tsx   # SVG circular score indicator
│   │   └── SectionLabel.tsx # Uppercase eyebrow label
│   │
│   ├── marketing/          # Public-facing landing page sections
│   │   ├── HeroSection.tsx         # Ramp-style hero + floating dashboard
│   │   ├── BuilderTicker.tsx       # Infinite scroll builder name strip
│   │   ├── HowItWorks.tsx          # Alternating 3-feature blocks
│   │   ├── ChannelsSection.tsx     # Funnel + channel performance table
│   │   ├── PricingSection.tsx      # Pricing + example calculation
│   │   └── Footer.tsx
│   │
│   ├── qualification/      # Step-by-step buyer flow
│   │   ├── QualificationContainer.tsx  # State machine, step router
│   │   ├── ProgressIndicator.tsx       # Sidebar step list
│   │   └── Steps.tsx                   # All individual step components
│   │
│   └── dashboard/          # Builder-facing analytics
│       ├── BuilderDashboard.tsx        # KPIs + lead queue + charts
│       ├── LeadsTable.tsx              # Filterable lead rows
│       ├── LeadDetailPanel.tsx         # Sticky CRM field panel
│       ├── ChannelPerformanceChart.tsx # Recharts bar chart
│       └── ConversionFunnelChart.tsx   # CSS funnel + metrics
│
├── lib/
│   ├── types.ts            # All TypeScript domain types
│   └── utils.ts            # cn(), score colours, formatCurrency, etc.
│
└── data/
    └── index.ts            # All demo data: channels, leads, builders, funnel
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key Design Decisions

### Navigation
`PreQualShell` owns a `NavSection` enum state. In production, replace with
Next.js App Router pages at `/`, `/qualify`, `/dashboard`, etc.

### Qualification State
`QualificationContainer` uses a simple `useState` + explicit step-transition
pattern. For a real app, consider `useReducer` or a state machine library
(XState) to make filter logic declarative.

### Data
All demo data lives in `data/index.ts`. In production, replace with:
- Leads: REST API or tRPC calls from HubSpot / CRM
- Channels: Marketing platform API (Meta, Google Ads)
- Builders: CMS or database

### Styling
Tailwind utility classes throughout. Custom tokens are in `tailwind.config.ts`
under `theme.extend.colors` — edit once, applies everywhere.

### Fonts
Inter loaded from Google Fonts in `globals.css`. In production, switch to
`next/font/google` for optimal performance.

---

## Roadmap to Production

- [ ] Replace in-memory nav with Next.js App Router pages
- [ ] Add auth (Clerk or NextAuth) for builder dashboard
- [ ] Connect qualification form to backend (tRPC / API routes)
- [ ] Integrate HubSpot CRM API for real lead delivery
- [ ] Add Zapier/Make webhook triggers post-verification
- [ ] Add real attribution tracking (GA4, Triple Whale, Segment)
- [ ] Implement `useReducer` or XState for qualification flow
- [ ] Add error boundaries and loading skeletons
- [ ] Write unit tests for scoring logic (`lib/utils.ts`)
- [ ] Deploy to Vercel

---

*CONFIDENTIAL — FOR INVESTOR USE ONLY*  
*preQual SEQ v0.5*
