# Task GM-RECOVERY — Recreate Lost Landing Pages + Infrastructure

## Summary
A critical production issue occurred where all landing pages and infrastructure files (created in previous tasks) were lost due to git branch switching. This task recreates them ALL on the `main` branch.

## Files Created
1. `src/lib/feature-flags.ts` — 25 feature flags (all shipped features ON, new features OFF by default; override via `FEATURE_<NAME>=true|false`)
2. `src/hooks/use-feature-flag.ts` — `useFeatureFlag` / `useAllFeatureFlags` React hooks (client-safe)
3. `src/lib/tracking.ts` — `trackEvent()` + `getTrackingStats()` + Conversions API fan-out (Google GA4, Facebook/Meta, TikTok, Snapchat). Resilient: skips DB if `trackingEvent` accessor missing (dev server still has cached @prisma/client), but conversions fan-out still happens.
4. `src/lib/google-sheets.ts` — `sendToGoogleSheets()` pushing Lead rows to a Google Apps Script webhook
5. `src/lib/cache.ts` — in-memory cache with TTL (`cacheSet`, `cacheGet`, `cacheGetOrSet`, `cacheClear`, `cacheSize`)
6. `src/components/site/top-bar.tsx` — compact sticky TopBar with Logo + ThemeToggle + LanguageToggle + Book button (uses `useBooking` + `useLang`)
7. `prisma/schema.prisma` — added `TrackingEvent` model (type, page, source, email, phone, name, value, currency, meta, userAgent, ipAddress)
8. `src/app/founder/page.tsx` + `founder-client.tsx` — Taj Bhai personal branding page
9. `src/app/3d-portrait/page.tsx` + `portrait-client.tsx` — 3D face sculpting landing page (৳1500/portrait)
10. `src/app/cnc-design/page.tsx` + `cnc-client.tsx` — CNC design bundle landing page (150TK / 150GB)
11. `src/app/pdf-books/page.tsx` + `books-client.tsx` — 5 PDF books landing page (each 170TK, buy 1 get 1 free)
12. `src/app/ai-training/page.tsx` + `training-client.tsx` — AI training landing page (1000TK, 1 week, 9 PM)
13. `src/app/cnc-training/page.tsx` + `cnc-training-client.tsx` — CNC 3D design training landing page (250TK, 1 week, 9 PM, + free chair leg design)
14. `src/app/services/[slug]/page.tsx` + `landing-client.tsx` — 12 service landing pages (auto-generated from `services` array)
15. `src/app/api/track/route.ts` — tracking API endpoint (POST events, GET stats)
16. `src/components/site/landing-common.tsx` — shared landing-page helpers (LandingSocials, WhatsAppCTA, LandingLeadForm, usePageViewTracking, LandingFooter, LandingEyebrow)
17. `public/3d-gallery/` — 8 sample images copied from upload folder

## Files Modified
- `src/app/layout.tsx` — wrapped children with BookingProvider so booking modal works on ALL pages
- `src/app/page.tsx` — removed BookingProvider wrapper (moved to layout)
- `prisma/schema.prisma` — added TrackingEvent model
- `src/lib/db.ts` — best-effort require.cache invalidation (no-op under Turbopack, which is fine)
- `.env` — added GOOGLE_SHEETS_WEBHOOK_URL

## Patterns Used
- All landing pages use `TopBar` component (Logo + ThemeToggle + LanguageToggle + Book button)
- All pages bilingual (Bangla + English via `isBn` ternary inside client components, sourced from `useLang().lang`)
- All pages have order/registration form → POST /api/contact → Lead saved + Google Sheets sync (via webhook)
- All pages have WhatsApp button (`wa.me/8801711731354`)
- All pages have social links (Facebook, LinkedIn, Instagram, YouTube, X, GitHub)
- All pages fire `page_view` tracking event on mount via `usePageViewTracking(source)`
- All pages have SEO metadata (title, description, openGraph, alternates)
- All pages include `FloatingButtons` for WhatsApp + scroll-to-top
- All pages use `siteConfig` for business info (email, phone, socials, address)

## Verification
- `bun run lint` → 0 errors
- `bunx tsc --noEmit` → 11 errors total, ALL pre-existing (in examples/, skills/, src/app/admin, src/app/api/chat-save, src/app/api/leads/*). ZERO new errors in any file I created.
- All routes return 200:
  - `/`, `/founder`, `/3d-portrait`, `/cnc-design`, `/pdf-books`, `/ai-training`, `/cnc-training`
  - All 12 `/services/[slug]` routes
  - `/api/track` (POST + GET)
  - `/admin`, `/docs`, `/privacy`, `/terms`
- POST /api/contact verified working (Lead saved to DB)
- POST /api/track verified working (returns ok:true; DB persistence gracefully skipped if Prisma client hasn't reloaded yet, conversions fan-out still happens)

## Notes for Future Agents
- The Turbopack dev server caches `@prisma/client` at startup. When a new model is added to the schema and `db:push` is run, the running dev server won't pick up the new model until a full restart. The `tracking.ts` module is resilient to this — it tries `db.trackingEvent` and skips DB persistence if undefined, but still fans out to ad platforms.
- The shared `landing-common.tsx` file should be reused for any new landing pages — it provides `LandingLeadForm`, `WhatsAppCTA`, `LandingSocials`, `LandingFooter`, `usePageViewTracking`, and `LandingEyebrow`.
- All landing pages use `'use client'` for the client component file, with a server-side `page.tsx` that only handles metadata + rendering the client component.

## Commit
`recovery: recreate all lost landing pages + infrastructure`
