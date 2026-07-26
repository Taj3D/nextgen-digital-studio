# Task 1 — full-stack-developer — OfferStack + ResultsTimeline

**Task ID:** 1
**Agent:** full-stack-developer
**Task:** Build OfferStack and ResultsTimeline homepage sections (2 NEW sections for NextGen Digital Studio homepage).

**Status:** ✅ COMPLETE — Lint passed (0 errors, 0 warnings). Both files ready for orchestrator to wire into `src/app/page.tsx`.

## Files Created (2)

| # | File | Purpose |
|---|------|---------|
| 1 | `src/components/site/sections/offer-stack.tsx` | Hormozi-style Offer Stack — 12 deliverable items + total value (৳3,45,000 strikethrough) + Today's Price highlight box (৳35,000 setup, gradient-brand) + "Claim This Offer" CTA → lead-form + trust note. |
| 2 | `src/components/site/sections/results-timeline.tsx` | 6-milestone vertical timeline (Day 1/3/7/30/60/90) in gradient-brand-soft card. Each milestone: gradient-brand dot+icon, "Day X" badge, title, description. CTA "Start Your 90-Day Journey" → lead-form. |

## Conventions Followed (per task spec)

- ✅ `'use client'` directive at top of both files
- ✅ Color palette: emerald/teal/amber/gold ONLY — zero indigo/blue
- ✅ Bilingual: `const { lang } = useLang(); const isBn = lang === 'bn'` then inline `isBn ? 'বাংলা' : 'English'`
- ✅ BN digit helper: `const bn = (s: string | number) => isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)`
- ✅ Import pattern: `import { Reveal, SectionShell, Eyebrow, staggerContainer, staggerItem } from '@/components/site/reveal'`
- ✅ Import: `import { useLang } from '@/components/site/language-provider'`
- ✅ shadcn `Card`/`CardContent` + `Button` from `@/components/ui/*`
- ✅ Icons from `lucide-react` (with `type LucideIcon` for typed arrays)
- ✅ CSS classes used: `gradient-text`, `gradient-brand`, `gradient-brand-soft`, `shadow-glow`, `animate-pulse-glow`
- ✅ Mobile-first responsive: `sm:`, `md:`, `lg:` prefixes throughout
- ✅ `scrollToId(id)` helper identical to spec; CTAs scroll to `'lead-form'`
- ✅ `motion` stagger animation via `staggerContainer` + `staggerItem`
- ✅ Export pattern: named + default export for both

## OfferStack Structure

1. `SectionShell id="offer-stack"` + `aria-label`
2. Header `Reveal`: `Eyebrow` "The Offer"/"অফার" (Gift icon) → title with gradient-text `৳3,45,000`/`৳৩,৪৫,০০০` → bilingual subtitle
3. `motion.div` staggerContainer wrapping `Card` (emerald border + backdrop-blur) → 12 `motion.div` items, each: emerald icon tile (`gradient-brand-soft` + emerald border) + name (truncate) + amber value (`tabular-nums`) + gradient-brand check circle
4. `Reveal` Total Value + Today's Price `Card` (border-2 emerald + `gradient-brand-soft`): strikethrough total → `gradient-brand` Today's Price box (`shadow-glow`, Sparkles badge, `৳35,000` + setup label) → CTA Button (h-14, `gradient-brand animate-pulse-glow`, Gift icon, "Claim This Offer"/"অফারটি নিন")
5. `Reveal` trust note: 3 inline items separated by emerald dots — "No hidden fees · Cancel anytime · 60-day ROI guarantee" (bilingual)

## ResultsTimeline Structure

1. `SectionShell id="results-timeline"` + `aria-label`
2. Header `Reveal`: `Eyebrow` "The Roadmap"/"রোডম্যাপ" (Map icon) → bilingual title "What Happens After You Say Yes" → bilingual subtitle
3. `Reveal` `Card` (emerald border + `gradient-brand-soft`) wrapping `motion.ol`:
   - Vertical gradient line (emerald→amber) absolutely positioned
   - 6 `motion.li` milestones, each: `gradient-brand` dot circle with white icon + `ring-4 ring-background` + `shadow-glow` → "Day X"/"দিন X" gradient-brand badge → bold title → muted description
4. `Reveal` CTA Button "Start Your 90-Day Journey"/"আপনার ৯০ দিনের যাত্রা শুরু করুন" (Rocket icon, gradient-brand animate-pulse-glow) → lead-form

## 12 Stack Items (OfferStack)

| # | Icon | Name (EN) | Value |
|---|------|-----------|-------|
| 1 | Bot | AI Sales Agent Setup | ৳45,000 |
| 2 | Database | CRM Automation | ৳35,000 |
| 3 | MessageCircle | WhatsApp Automation | ৳30,000 |
| 4 | Bot | AI Chatbot Integration | ৳25,000 |
| 5 | GraduationCap | Team Training (2 sessions) | ৳20,000 |
| 6 | LayoutDashboard | Live Revenue Dashboard | ৳40,000 |
| 7 | Map | Growth Strategy Roadmap | ৳35,000 |
| 8 | TrendingUp | Ongoing Optimization | ৳30,000 |
| 9 | FileText | Template Library (50+ templates) | ৳25,000 |
| 10 | BookOpen | Documentation & SOPs | ৳15,000 |
| 11 | Video | Video Training Library | ৳20,000 |
| 12 | CalendarCheck | Weekly Performance Review | ৳25,000 |
| **Total** | | | **৳3,45,000** |

## 6 Milestones (ResultsTimeline)

| Day | Icon | Title (EN) |
|-----|------|-----------|
| 1 | Rocket | Kickoff & Audit |
| 3 | Map | Strategy & Roadmap |
| 7 | Bot | AI Agent Goes Live |
| 30 | Database | CRM + Automation Live |
| 60 | TrendingUp | Optimization & Scale |
| 90 | Trophy | ROI Proven |

## Verification

- **Lint:** `cd /home/z/my-project && bun run lint 2>&1 | tail -20` → `$ eslint .` (clean, 0 errors, 0 warnings)
- **No new deps added:** used only already-installed `framer-motion`, `lucide-react`, shadcn `Card`/`Button`, project reveal + language-provider helpers
- **No page.tsx changes:** orchestrator will integrate both sections into the homepage section order

## Integration Suggestions for Orchestrator

- **OfferStack** (`<OfferStack />`): place right after `<Pricing />` or right before it — converts viewers who just saw pricing into action via the value-stack psychology.
- **ResultsTimeline** (`<ResultsTimeline />`): place right after `<HowItWorks />` — HowItWorks shows the 4-step process, ResultsTimeline extends it into the 90-day roadmap. Alternative: place before `<Pricing />` to set up expectation of ROI before the price reveal.

Both components are self-contained (no new i18n keys, no new data files, no new APIs). They are client-side only and scroll to existing `#lead-form` anchor.
