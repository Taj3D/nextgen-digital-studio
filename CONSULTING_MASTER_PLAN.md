# 🏗️ MASTER PLAN: /consulting Page
# NextGen Digital Studio — Premium Consulting Landing Page

## Architecture
- Framework: Next.js 16 App Router (existing)
- Styling: Tailwind CSS 4 + shadcn/ui (existing)
- Reuse: Navbar, Footer, FloatingButtons, LanguageProvider, ThemeProvider
- New: TopBar with "Consulting" active state
- Colors: BLACK, WHITE, EMERALD GREEN (#10b981), subtle CYAN (#06b6d4)

## File Structure
```
src/app/consulting/
├── page.tsx              # Server component (metadata + SEO)
├── consulting-client.tsx # Client component (25 sections)
└── apply/
    └── page.tsx          # Application form page
```

## 25 Sections (Step by Step)

### Phase 1: Foundation (Steps 1-5)
1. **Header/Nav** — TopBar with "Consulting" active, logo, CTA
2. **Hero** — "আপনি অনেক কিছু করছেন—কিন্তু ঠিক কোন জায়গায় আটকে আছেন?" + diagnostic pathway visual
3. **Trust Strip** — 4 cards: Diagnosis First, Customer-Centric, Action-Oriented, No False Promises
4. **Problem Recognition** — "সমস্যা সবসময় 'কী করতে হবে' নয়" + 5 problem cards
5. **Info vs Diagnosis** — "হয়তো আপনার আরও Information দরকার নেই" + visual flow

### Phase 2: Framework (Steps 6-10)
6. **What is NGS Consulting** — Definition + 3 "NOT" cards + Consulting = equation
7. **Core Framework** — 8-step visual: Situation → Outcome → Gap → Bottleneck → Priority → Action → Implementation → Review
8. **NGS 7D Framework** — 7 cards: DISCOVER, DEFINE, DIAGNOSE, DETECT, DECIDE, DESIGN, DEPLOY
9. **Consulting Categories** — 4 cards: Business Growth, Freelancer, Career, Entrepreneurship
10. **Who Is This For** — 6 checkmark items

### Phase 3: Qualification (Steps 11-15)
11. **Who Is This NOT For** — 5 negative cards
12. **What You Get** — 7 benefits with icons
13. **Consulting Levels** — 3 levels: Assessment, Strategic, Implementation
14. **How It Works** — 6-step timeline: Apply → Assessment → Diagnosis → Consulting → Implementation → Review
15. **Session Experience** — 7 diagnostic questions displayed elegantly

### Phase 4: Trust & Conversion (Steps 16-20)
16. **5 Diagnosis Questions** — Self-assessment questions + CTA
17. **Social Proof** — Before/After structure (no fake testimonials)
18. **Founder/Guide** — Taj Bhai photo + bio + "Guide, not Guru"
19. **Why NGS** — 6 reasons + comparison (Random Advice vs Structured Diagnosis)
20. **Consulting vs Training** — Comparison table

### Phase 5: Close (Steps 21-25)
21. **Consulting vs Done-For-You** — Clear distinction
22. **Primary CTA** — "আপনার Problem হয়তো আরও বড় নয়" + Request Assessment
23. **FAQ** — 8 questions accordion
24. **Final CTA** — "আরও Information নয়। আগে বুঝুন" + Request Assessment
25. **Footer** — Reuse existing SiteFooter

## Apply Page (/consulting/apply)
- 10 form fields: Name, Email, Phone, Category, Current Situation, Biggest Problem, Desired Outcome, What Tried, Why Now, Consulting Need
- Consent checkbox
- Submit → /api/contact (source: consulting_apply)
