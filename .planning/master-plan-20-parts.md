# PDF FORGE — FINAL COMPLETION MASTER PLAN (20 PARTS)

**Source**: PDF FORGE FINAL PRODUCT COMPLETION MASTER PROMPT (1997 lines, 55 sections)
**Strategy**: Execute via 20 discrete parts, each with clear deliverable + gate
**Priority**: TRUTH > USER PRIVACY > SECURITY > PDF STANDARDS CORRECTNESS > DATA INTEGRITY > LICENSING > RELIABILITY > PERFORMANCE > UX > FEATURE COUNT

---

## TRACK MAPPING

| Track | Parts | Status |
|-------|-------|--------|
| TRACK A: HTML→PDF | Parts 4-7 | pending |
| TRACK B: PDF/A Validator | Parts 8-9 | blocked (legal) |
| TRACK C: Native Text Editor | Parts 10-15 | pending |
| Cross-cutting (audit/test/deploy) | Parts 1-3, 16-20 | pending |

---

## 20-PART BREAKDOWN

### PART 1 — Repository Audit (Phase 1)
- Inspect architecture, routing, registry, tool definitions
- Inspect existing edit-text + redact engines
- Inspect PDF.js + pdf-lib abstractions
- Inspect Vercel/deployment config
- **Deliverable**: Audit report (no code changes)
- **Gate**: Findings documented

### PART 2 — Master Architecture Plan
- Document final architecture for all 3 tracks
- HTML→PDF: Chromium/Playwright on Vercel Container
- PDF/A: Hybrid (deferred — legal blockers)
- Native Editor: client-side, reuse Wave 4D engine
- **Deliverable**: Architecture decision doc
- **Gate**: Plan approved

### PART 3 — Security & Privacy Baseline
- Audit enableScripting: false (all sites)
- Audit eval/Function/dangerouslySetInnerHTML
- Document privacy boundary (client vs server)
- **Deliverable**: Security baseline report
- **Gate**: No regressions

### PART 4 — HTML→PDF Architecture Gate (Phase 2)
- Chromium/Playwright strategy
- Vercel Container Function vs external service
- SSRF defense design
- Input limits, timeout, memory
- **Deliverable**: HTML→PDF architecture decision
- **Gate**: Safe architecture confirmed

### PART 5 — HTML→PDF API + Container
- POST /api/html-to-pdf endpoint
- Playwright in Vercel Container (or @sparticuz/chromium)
- SSRF protection, size limits, timeout
- **Deliverable**: API route + container config
- **Gate**: API responds

### PART 6 — HTML→PDF UI
- html-to-pdf-tool.tsx component
- HTML editor, file upload, paste
- Page settings (A4/Letter/Legal/custom)
- Print features, preview, download
- **Deliverable**: UI component wired
- **Gate**: Dialog opens, renders

### PART 7 — HTML→PDF Tests + Deploy
- Acceptance tests (basic/layout/security/output)
- Browser verification
- Registry update: html-to-pdf → AVAILABLE_NOW
- Commit + push + deploy
- **Deliverable**: Production HTML→PDF live
- **Gate**: 35 AVAILABLE_NOW, 1 ROADMAP

### PART 8 — PDF/A Gate Check (Phase 4)
- Re-verify legal blockers (MPLv2+ review)
- Re-verify privacy policy
- Re-verify Vercel Container beta stability
- **Deliverable**: Gate status report
- **Gate**: If blocked → defer, document, move to Track C

### PART 9 — PDF/A Conditional Implementation (DEFERRED)
- Only if Part 8 gates PASS
- veraPDF REST Docker v1.30.2
- /api/pdfa/validate endpoint
- UI: "PDF/A Validator"
- Registry: pdfa → AVAILABLE_NOW
- **Deliverable**: PDF/A Validator live (or deferral doc)
- **Gate**: If deferred → 36 AVAILABLE_NOW not reached

### PART 10 — Native Text Engine Audit (Phase 5)
- Inspect Wave 4D redact-engine.ts
- Identify reusable: tokenizer, Tj/TJ surgery, coordinate handling
- Design TextObject model
- **Deliverable**: Engine audit + reuse plan
- **Gate**: Reuse strategy confirmed

### PART 11 — Text Object Model + Coordinate Mapping (Phase 6)
- TextObject interface (id, page, text, x, y, w, h, font, color, rotation)
- PDF.js viewport ↔ PDF content stream coordinate conversion
- Handle zoom, rotation, cropbox, mediabox
- **Deliverable**: text-model.ts + coordinate-utils.ts
- **Gate**: Coordinate tests pass

### PART 12 — Edit Session Engine
- Selection model (click text → select)
- Edit operations (replace, delete, add)
- Content-stream surgery (reuse redact-engine)
- Operation history (undo/redo)
- **Deliverable**: edit-session.ts
- **Gate**: Edit operations verified

### PART 13 — Native Editor UI (Phase 7)
- PDF rendering with text overlay
- Hover/click detection
- Inline editor
- Toolbar (font, size, bold, italic, color)
- Save/Save As/Download
- **Deliverable**: native-editor-tool.tsx
- **Gate**: UI interactive

### PART 14 — Direct Edit Verification
- Old text absent in output PDF
- New text present
- Unrelated text preserved
- Raw byte search verification
- **Deliverable**: Verification report
- **Gate**: TRUE edit confirmed

### PART 15 — Advanced Editing (Phase 8)
- Search & Replace (Ctrl+F)
- Replace All across pages
- Undo/Redo UI
- Add Text / Delete Text
- OCR fallback (if no selectable text)
- **Deliverable**: Advanced features
- **Gate**: Features functional

### PART 16 — Mobile + Accessibility
- Responsive (375×667, 390×844, 414×896, 768×1024)
- Touch targets ≥44px
- Keyboard navigation
- Focus trap, ARIA labels
- **Deliverable**: Mobile + a11y verification
- **Gate**: No overflow, touch works

### PART 17 — Full Regression (Phase 9)
- All 43 existing tools tested
- Wave 4C: protect/unlock (qpdf.wasm)
- Wave 4D: redact/edit-text (content stream)
- No dead buttons, no broken imports
- **Deliverable**: Regression report
- **Gate**: 0 regressions

### PART 18 — Production Hardening (Phase 10)
- Security audit (eval, Function, enableScripting)
- Malformed PDF tests
- Large PDF tests
- Memory cleanup verification
- **Deliverable**: Hardening report
- **Gate**: All tests pass

### PART 19 — Build + Deploy (Phase 11)
- bun run lint
- npx tsc --noEmit
- bun run build
- Commit + push
- Vercel auto-deploy
- Production verification
- **Deliverable**: Production deployment
- **Gate**: HTTP 200, all features work

### PART 20 — Final Release Certificate
- 38-section Release Certificate
- Registry reconciliation
- Production readiness score
- Final decision: RELEASE READY / WITH LIMITATIONS / NO-GO
- **Deliverable**: Complete certificate
- **Gate**: Honest assessment

---

## EXECUTION RULES

1. Each part must complete before next begins
2. Gate failures trigger STOP + document
3. PDF/A (Parts 8-9) may be deferred without blocking Track C
4. No fake features — defer if cannot implement genuinely
5. Commit after each major milestone
6. Production deployment only after all gates pass

## REGISTRY TARGETS

| Stage | AVAILABLE_NOW | LIMITED | ROADMAP | TOTAL |
|-------|--------------|---------|---------|-------|
| Baseline | 34 | 7 | 2 | 43 |
| After Part 7 (HTML→PDF) | 35 | 7 | 1 | 43 |
| After Part 9 (PDF/A, if unblocked) | 36 | 7 | 0 | 43 |
| Native Editor = upgrade to edit-text (no new entry) | — | — | — | 43 |

