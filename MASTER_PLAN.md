# v3.0.0 Master Plan — NextGen Digital Studio

Generated from the Phase 2 deep audit. Each step is concrete, reversible
(behind a feature flag where applicable), and verified with agent-browser
before the step is marked done.

## Audit Findings (baseline)

### Bugs / errors
- B1. `src/app/admin/page.tsx:260` — TS2551: `_count` property does not exist on the byStatus aggregate (schema mismatch). Dashboard still runs because the field is read defensively, but TS blocks clean builds.
- B2. `src/app/api/chat-save/route.ts` — 3× unused `@ts-expect-error` directives (TS2578). The directives were added defensively for a Prisma schema that has since been fixed; they now hide nothing and are themselves errors.
- B3. `src/app/api/leads/route.ts`, `leads/[id]/route.ts`, `leads/bulk/route.ts` — 3× unused `@ts-expect-error` directives (TS2578). Same root cause as B2.
- B4. Blog section "Read article" button has `hasOnClick: false` — it is a dead CTA. No `/blog/[slug]` route exists.
- B5. Video testimonials section has 3 "play" buttons but ZERO `<video>` or `<iframe>` elements — pure placeholder, clicking does nothing visible.
- B6. Tech-stack section has `id=""` (missing anchor). Same for Problem, By-the-numbers, Pricing-faq, Cta-band sections — navbar mega-menu / anchor links may not scroll correctly.

### Gaps (missing functionality)
- G1. No `/blog/[slug]` detail pages (blog section has 4 posts but no deep-link targets).
- G2. No `/case-studies/[slug]` detail pages (case-studies section has 4 studies but no deep-link targets).
- G3. Homepage blog "Subscribe to updates" button opens booking modal, not a real subscribe flow.
- G4. Careers "apply" opens a form but the form's submission UX is unverified end-to-end.
- G5. No `leadScoring` (flag exists, OFF) — CRM leads have no priority signal.

### Verified working (do NOT touch)
- All 13 API routes return 200 with correct bodies.
- /admin login + dashboard (41 leads, stats cards, table) — works.
- /docs, /privacy, /terms — all 200, no errors.
- Homepage 34 sections render, 0 console errors, 0 broken images.
- Translation system (EN/BN) — full coverage.
- Premium fonts (Mahfuj Lipi + Forzon on logo) — VLM-verified rendering.
- Git: v2.0.0 tag (stable), release/v3.0 branch active.

## 20-Step Execution Plan

Each step: small, reversible, verified. Commits per step on release/v3.0.

### Step 1 — Fix admin TS2551 (`_count` on aggregate)
Remove the `_count` access; use the `count` field the query actually returns. Verify /admin still shows stats.

### Step 2 — Remove 6 unused `@ts-expect-error` directives
Delete the now-unused directives in chat-save (×3), leads/route, leads/[id], leads/bulk. Verify TS clean for app code.

### Step 3 — Add missing section IDs
Give Problem, By-the-numbers, Pricing-faq, Cta-band, Tech-stack proper `id` attributes matching navbar anchors. Verify scroll-to works.

### Step 4 — Wire blog "Read article" to open a post preview modal
Since `/blog/[slug]` pages don't exist yet (flag OFF), make the button open an in-page modal showing the full post content (data already in site-data.ts). No dead CTA.

### Step 5 — Create `/blog/[slug]` route behind feature flag
Build the blog detail page. Gate it behind `blogDetailPages` flag (default OFF). The homepage button opens the modal (step 4) when flag is OFF, navigates to /blog/[slug] when ON.

### Step 6 — Wire case-studies cards to open a detail modal
Same pattern as step 4: in-page modal with challenge/solution/results (data in site-data.ts). No dead CTA.

### Step 7 — Create `/case-studies/[slug]` route behind feature flag
Build the case-study detail page. Gate behind `caseStudyDetailPages` flag (default OFF).

### Step 8 — Fix video testimonials: real playable experience
Replace placeholder play buttons with a modal that shows an embedded player OR a styled "video coming soon" with the testimonial transcript + key metrics. No dead button.

### Step 9 — Verify careers apply flow end-to-end
Open the apply modal, fill the form, submit, confirm /api/careers receives it (200) and a lead is created. Fix any gap.

### Step 10 — Verify all 13 API routes with real payloads
Re-run the audit curl suite with CORRECT field names. Document the exact contract per route.

### Step 11 — Verify ROI calculator math + lead capture
Move sliders, confirm projected values compute, click "Get my detailed ROI breakdown", confirm it opens booking modal / captures lead.

### Step 12 — Verify AI audit tool flow
Complete the 4-question audit, see score + opportunities, submit email form, confirm /api/audit receives it and a lead is created.

### Step 13 — Verify configurator + workflow builder
Add services, see price update, click "Get this stack" (booking modal). Drag workflow steps, run flow, see projection. Confirm no dead buttons.

### Step 14 — Verify contact form + newsletter + booking modal
Submit contact form (→ /api/contact 200 + lead). Subscribe newsletter (→ /api/newsletter 200). Book a call (→ /api/book-call 200 + lead).

### Step 15 — Verify free-tools download flow
Click a resource, fill gate form, submit (→ /api/download 200 + lead), see success state.

### Step 16 — Verify AI chat agent end-to-end
Open chat, send message, confirm reply (Gemini or z-ai fallback), confirm /api/chat-save persists conversation + detects lead.

### Step 17 — Verify EN/BN translation completeness
Toggle to BN, scroll all 34 sections, confirm NO English leak in headings/body/CTAs. Toggle back to EN, confirm.

### Step 18 — Verify sticky footer + responsive layout
Check footer sticks to bottom on short pages, pushes down on long pages. Check mobile (390px) + desktop (1440px) layouts.

### Step 19 — Final TS + lint clean
`bunx tsc --noEmit` → 0 errors in app code. `bun run lint` → 0 errors. Commit.

### Step 20 — Tag v3.0.0, update VERSION.md, write final report
Merge release/v3.0 into main (or keep on release branch per workflow). Tag v3.0.0. Update VERSION.md with all v3.0.0 changes. Write detailed report to user.
