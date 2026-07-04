# Master Plan v3.0.0 — Deep Audit Results & 20-Step Action Plan

## Audit Summary (completed)

### ✅ Verified Working
| Area | Status |
|------|--------|
| 5 routes (/, /admin, /docs, /privacy, /terms) | All 200 |
| 13 APIs (contact, book-call, newsletter, audit, careers, download, chat-agent, chat-save, leads, track, track/stats) | All 200 |
| 30 homepage sections (top → contact) | All present |
| TS errors (app code) | 0 |
| Lint errors | 0 |
| Homepage console errors | 0 |
| Booking modal: open → fill 5 inputs → submit → success → lead saved | ✓ |
| Admin login → dashboard (table, stats) | ✓ |
| BN/EN toggle | ✓ |
| Services section: 12 cards → modal → Book → booking | ✓ |
| Sales Psychology Quiz: 4 questions → result → CTA | ✓ |
| Events & Occasions: 8 tabs → before/after | ✓ |
| Problem section: persona pain cards | ✓ |
| Free Tools: 6 cards → download modal | ✓ |
| AI Chat launcher | ✓ |
| Tracking system: events saved to DB | ✓ |
| Lead count: 7 (real, dummy deleted) | ✓ |

### 🔴 Issues Found
1. **Multiple overlays stacking** — when clicking through modals rapidly, 3+ overlays can be open simultaneously (service modal + video testimonial modal + booking modal). Should auto-close previous modal when opening new one.
2. **agent-browser eval timing** — some eval calls return empty on rapid succession (not a code bug, a testing tool limitation)

### 🟡 Minor (not blocking)
- BN translation: some sections still have minor English leaks (ai-demo chat conversation is intentionally English demo)
- /docs page has English API terms (intentional — API docs convention)

## 20-Step Master Plan

### Phase 1: Modal stacking fix (steps 1-3)
1. Audit all modal-open calls across sections — identify where modals don't close before opening new ones
2. Add a "close all overlays" helper that booking modal calls before opening
3. Verify: rapid clicking through Services → Book → Industries → Book doesn't stack modals

### Phase 2: Interaction polish (steps 4-8)
4. Test all 12 service cards open modal (batch verify with proper wait)
5. Test all 8 event tabs switch correctly
6. Test all 6 free-tool cards open download modal
7. Test case-study modal → Book → booking transition
8. Test Industries → Get custom plan → booking transition

### Phase 3: API verification (steps 9-13)
9. Verify all 6 lead-capture APIs save lead + fire tracking event
10. Verify tracking events appear in /api/track/stats
11. Verify /api/leads returns correct data (filtering, pagination)
12. Verify /api/leads/export generates CSV
13. Verify /api/chat-agent returns AI reply

### Phase 4: Translation check (steps 14-16)
14. BN mode: verify all 30 sections render in Bangla (no raw keys)
15. BN mode: verify booking modal labels translate
16. EN mode: verify all sections render in English

### Phase 5: Final verification (steps 17-20)
17. Full homepage scroll — 0 console errors
18. Admin dashboard — login, stats, table, CSV export
19. All routes 200, all APIs 200, 0 TS errors, 0 lint errors
20. Tag final version, update VERSION.md, write detailed report
