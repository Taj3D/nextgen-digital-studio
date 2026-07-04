# NextGen Digital Studio — Changelog

All notable changes to the NextGen Digital Studio website are documented here.
This project follows [Semantic Versioning](https://semver.org/).

Tags: `v2.0.0` (stable baseline) · `v3.0.0-dev` (active development on `release/v3.0`)

---

## [3.0.0-dev.1] — 19/20 master-plan steps complete (tag: `v3.0.0-dev.1`)

### Bugs fixed
- **B1 admin TS2551**: `_count` → `count` on byStatus aggregate in `/admin` conversion-rate card.
- **B2-B3 unused @ts-expect-error**: removed 7 directives across `chat-save`, `leads/route`, `leads/[id]`, `leads/bulk`. Revealed a hidden TS2322 (activities `createdAt: string` → `Date`) which is now fixed too. **App code is TS-clean (0 errors).**
- **B4 blog dead CTA**: "Read article" button had no handler. Now opens a full-article modal. Added 5-paragraph content to all 4 blogPosts (was excerpt-only).
- **B5 video testimonials placeholder**: replaced fake "Video preview" (which implied a video would play but never did) with an honest "Story · {duration}" testimonial card. No misleading UX.
- **B6 missing section IDs**: added `id` + `scroll-mt-24` to 5 sections (problem, by-the-numbers, pricing-faq, cta-band, tech-stack). Navbar anchor links now resolve correctly.

### Features added
- Case-study modal now shows full narrative: Challenge → Solution → Results → testimonial blockquote. Extended `CaseStudy` type + added detailed content to all 4 case studies (Dhaka Realty, Medicare Hospital, ShopSmart BD, EduFirst).
- Blog modal with category/date/read-time meta + 5-paragraph article body.

### Verified end-to-end (agent-browser + real API calls)
- All 13 API routes return 200 with correct payloads (download uses `resource` field, not `resourceId`).
- `/admin` login + dashboard (45 leads, 4 conversations, stats cards, leads table all render).
- Careers apply modal → form submit → POST /api/careers 200 → Lead INSERT confirmed.
- ROI calculator, AI audit, configurator, workflow builder, contact form, newsletter, free-tools, chat widget — all present and interactive.
- EN/BN translation — no major leak.
- Footer present, pushes down naturally on long pages.
- `bunx tsc --noEmit` → 0 errors in app code. `bun run lint` → 0 errors.

### Known remaining items (not blockers)
- 4 TS errors in `examples/` and `skills/` (not part of the app).
- `blogDetailPages` and `caseStudyDetailPages` flags remain OFF — modals cover the UX. Deep-link routes can be added in a future minor release.
- No real video files for video testimonials (honest "Story" card used instead).

---

## [3.0.0-dev.0] — Versioning infrastructure (tag: `v3.0.0-dev.0`)

### Infrastructure
- **Versioning system introduced.** `package.json` bumped from `0.2.0` to `3.0.0-dev.0`.
- **Git tags**: `v2.0.0` marks the last stable baseline on `main`; `v3.0.0-dev` tracks the active release branch.
- **Release branch**: `release/v3.0` created so `main` stays protected. All new work lands on the release branch.
- **VERSION.md** created as the canonical changelog.
- **Feature flag system** (`src/lib/feature-flags.ts` + `useFeatureFlag` hook) added so new/experimental features can be toggled at runtime without code removal. Existing features default to ON (no behaviour change); new experimental features default to OFF.

### Planned for v3.0.0 (subject to deep audit outcome)
- Fix all crashes, errors, bugs, gaps, and dummy features found in the page-by-page audit.
- Verify every API route end-to-end.
- Ensure all 34 homepage sections and routed pages (`/admin`, `/docs`, `/privacy`, `/terms`) are fully functional — no placeholders, no dead links.

---

## [2.0.0] — Stable Baseline (tag: `v2.0.0`, branch: `main`)

The state of the codebase at the start of the v3.0.0 effort. This entry consolidates the work of tasks 1–29.

### Features (cumulative)
- **Homepage**: 34 sections in sales-funnel order (Hero → ClientLogos → Problem → Solution → Services → AiDemo → Industries → WhyChooseUs → HowItWorks → ByTheNumbers → RoiCalculator → AiAudit → Configurator → WorkflowBuilder → Testimonials → VideoTestimonials → Pricing → Guarantees → PricingFaq → Comparison → CaseStudies → Awards → Team → PartnerProgram → TechStack → KnowledgeBase → FreeTools → Integrations → Careers → StatusPage → Blog → Faq → CtaBand → Contact).
- **Bilingual (Bangla/English)**: two-layer translation — `t()` for UI keys (215 EN / 191 BN) + `tr()` for content via `contentBn` (275 unique entries). Language toggle persists to localStorage.
- **AI chat agent** (`/api/chat-agent`): Gemini primary + z-ai fallback. System prompt carries real business info (Jessore, +880 1711 731354, nextgendigitalstudio1@gmail.com). Chat history persists to localStorage; conversations + auto-detected leads saved to DB via `/api/chat-save`.
- **Lead CRM** (`/admin`): password-gated dashboard with stats, source/status breakdown, filterable leads table, inline status/assignment, detail drawer with notes + activity timeline, bulk actions, CSV export.
- **APIs** (13 routes): contact, book-call, newsletter, audit, download, careers, chat-agent, chat-save, leads (+ [id], bulk, export).
- **Routed pages**: `/admin`, `/docs` (API documentation), `/privacy`, `/terms` (both in Bangla).
- **SEO**: JSON-LD (Organization + ProfessionalService + FAQPage) with real Jessore address + founder, sitemap, robots, manifest, OpenGraph/Twitter cards, Google Analytics (G-QF7TJBHR7Z).
- **Premium fonts**: Mahfuj Lipi (Bengali + Latin, all body + headings) + Forzon DEMO (display accent on the logo wordmark). Smart `unicode-range` so mixed Bangla/English text renders each script in its proper font.
- **Design system**: Tailwind CSS 4 with OKLCH tokens, brand colors (#2563EB primary / #06B6D4 accent), glassmorphism, animated blobs, dark mode via next-themes, Framer Motion animations, sticky footer.

### Bug fixes consolidated (tasks 26–29)
- Removed 17 duplicate keys from `contentBn` translation dictionary (TS1117 error overlay).
- Fixed `useRef()` calls missing initial arguments (TS2554) in `ai-chat-widget.tsx` and `use-count-up.ts`.
- Fixed AI chat system prompt inconsistency (said "Dhaka" → corrected to "Jessore").
- Wired AI chat widget, hero chat demo, and mobile nav drawer to the translation system (were hardcoded English).
- Fixed Forzon font not rendering (declared `font-style: italic` on an italic-only face caused the browser to skip it for normal-style requests). Relocated Forzon to the logo wordmark only (it has 59 glyphs — unsuitable for general headings). Headings now use Mahfuj Lipi (full Latin + Bengali coverage).

### Known gaps carried into v3.0.0
- No `/blog/[slug]` or `/case-studies/[slug]` detail routes (homepage blog/case-study sections have no deep-link targets).
- Some pre-existing TypeScript errors in non-homepage files (`/admin`, `/api/chat-save`, `/api/leads/*`) — unused `@ts-expect-error` directives + a `_count` property mismatch.
- Deep page-by-page audit not yet performed — scheduled as the first v3.0.0 work item.

---

## [0.2.0] — Pre-versioning (historical)

The scaffold state before semantic versioning was introduced. No changelog kept; see git history on `main` for details.
