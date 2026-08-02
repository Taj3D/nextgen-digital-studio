# Task ID: BATCH-1 — CRO Gaps 1-7 on /ai-training

## Agent
full-stack-developer

## Task
Add 7 new CRO sections to the existing Next.js 16 `/ai-training` page (`src/app/ai-training/training-client.tsx`) WITHOUT breaking any existing functionality.

## File Modified
- `src/app/ai-training/training-client.tsx` (only this file)
- Line count: 1459 → 2323 (+864 lines, +59%)

## Components Added (all defined above `TrainingClient`, all take `{ isBn }` prop)
1. **LiveCounterDashboard** (GAP 1) — rendered after Hero, before Demo Video
   - Dark gradient card (slate-900 → slate-800), 5 live metrics (Visitors/Applications/Seats Left/Enrolled/Payment Pending)
   - Recursive setTimeout for 4-8s randomized tick (avoids hydration mismatch)
   - `data-track="live-dashboard"`

2. **WebinarCountdownBanner** (GAP 2) — rendered after LiveCounterDashboard
   - Amber→rose gradient, HH:MM:SS countdown to 8 PM local (rolls to next day)
   - "Join Now" button scrolls to #order
   - `data-track="webinar-demo-join"`

3. **LiveChatWidget** (GAP 3) — rendered at end before `</>`
   - Floating amber circular button (fixed bottom-24 right-4 z-40) + panel (z-50)
   - 4 contact options: WhatsApp, Messenger, AI Assistant, Call
   - Close on Escape + outside-click
   - 4 conditional `data-track` attrs: chat-whatsapp, chat-messenger, chat-ai, chat-call

4. **PaymentProof** (GAP 4) — rendered after Testimonials, before Career
   - 4-step horizontal flow: bKash → TXN ID → Enrollment → Community
   - Dashed screenshot placeholders, ChevronRight arrows (hidden on mobile)
   - `data-track="payment-proof"`

5. **StudentDashboardPreview** (GAP 5) — rendered after Projects Gallery, before Offer Stack
   - Browser mockup with 3-dot traffic lights + URL bar
   - Hidden left sidebar (md:block) with 6 nav items
   - Welcome message, 43% progress bar, 2x2 mini cards
   - `data-track="student-dashboard"`

6. **LiveClassPreview** (GAP 6) — rendered after StudentDashboardPreview
   - Zoom-style mockup: top bar + aspect-video main stage + 6 participant tiles + toolbar
   - 3 feature bullets below
   - `data-track="live-class-preview"`

7. **FounderVideo** (GAP 7) — rendered inside Instructor section (after the instructor grid)
   - 16:9 aspect-video container with amber→rose gradient + 64px play button
   - role="button" tabIndex={0} with Enter/Space keydown handler
   - Modal opens on click, closes on Escape + outside-click
   - `data-track="founder-video"` + `data-track="founder-video-whatsapp"` (in modal)

## Helper Added
- `toBnNum(n: number | string): string` — converts ASCII digits to Bengali digits (০-৯), used by 5 of the 7 components

## Imports Added
- 14 new lucide-react icons: Eye, FileText, Smartphone, Receipt, LayoutDashboard, ClipboardCheck, Settings, Mic, Camera, Share2, Play, Video, ChevronRight, Activity

## Verification
- ✅ `bun run lint` → 0 errors, 0 warnings
- ✅ `curl http://localhost:3000/ai-training` → HTTP 200
- ✅ Dev server log shows successful compiles + GET requests with no errors
- ✅ All 6 always-rendered `data-track` attributes present in served HTML
- ✅ All 5 new `<section>` elements render (29 total sections, up from 23)
- ✅ All new visible copy present in HTML (Open chat, Welcome Rafiq, Zoom Meeting, REC, Real Payment Proof, Play founder video, nextgen-digital-studio.com/dashboard)

## Preservation
- 0 existing components modified (LiveToast, ExitIntentModal, StickyBottomCTA, all 23 existing sections untouched)
- 0 translation keys added to language-provider.tsx (used inline `isBn ? 'বাংলা' : 'English'` ternaries)
- 0 other files modified

## Stack/z-index Map (mobile + desktop)
- z-[2000]: ExitIntentModal overlay, FounderVideo modal overlay (top priority)
- z-50: FloatingButtons (right-6 bottom-6), LiveChatWidget panel (right-4 bottom-40)
- z-40: LiveToast (left-4 bottom-24 sm:bottom-6), StickyBottomCTA (mobile only), LiveChatWidget toggle button (right-4 bottom-24)
- LiveChatWidget button (right-4) sits 16px above FloatingButtons (right-6) — no overlap

## Final Status
✅ STABLE — 0 lint errors, 0 compile errors, HTTP 200, all 7 components rendering, all existing functionality preserved.
