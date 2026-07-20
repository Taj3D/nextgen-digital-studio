# 🚀 MASTER PROMPT — NextGen Digital Studio Website Clone

## এই প্রম্পটটি ব্যবহার করে সম্পূর্ণ ওয়েবসাইট হুবহু তৈরি করা যাবে

---

## 📋 প্রজেক্ট পরিচিতি

তুমি একজন Senior Full-Stack Developer। তোমার কাজ হলো **NextGen Digital Studio**-র সম্পূর্ণ ওয়েবসাইট হুবহু তৈরি করা। এটি একটি AI Sales Automation Agency ওয়েবসাইট — দ্বিভাষিক (Bangla/English), ২৩টি পেজ, ৪টি ad pixels, lead generation, payment flow, এবং Google Sheets integration সহ।

---

## 🏗️ Technology Stack

```
Framework: Next.js 16 (App Router)
Language: TypeScript 5
Styling: Tailwind CSS 4 + shadcn/ui (New York style)
Icons: Lucide React
Animation: Framer Motion
Database: Prisma ORM (SQLite local, PostgreSQL Vercel)
Fonts: Plus Jakarta Sans + Inter (Google Fonts)
Bangla Font: MahfujLipi (custom)
Display Font: ForzonDEMO Italic (custom)
```

---

## 📁 File Structure (১৭১ source files)

```
src/
├── app/
│   ├── page.tsx                    # Homepage (PADA sales funnel)
│   ├── layout.tsx                  # Root layout (pixels, providers, SEO)
│   ├── sitemap.ts                  # Dynamic sitemap (22 URLs)
│   ├── robots.ts                   # AI bot rules (GPTBot, ClaudeBot, etc.)
│   ├── globals.css                 # Global styles
│   ├── founder/                    # Founder page (Taj Bhai)
│   ├── 3d-portrait/                # 3D Portrait landing (12 sections, live calculator)
│   ├── cnc-design/                 # CNC Design bundle (150TK/150GB)
│   ├── pdf-books/                  # PDF Books (5 books, 170TK each)
│   ├── ai-training/                # AI Training (1000TK, 1 week)
│   ├── cnc-training/               # CNC Training (250TK, 1 week)
│   ├── services/[slug]/            # 12 service landing pages
│   ├── admin/                      # Admin dashboard (lead management)
│   ├── privacy/                    # Privacy Policy
│   ├── terms/                      # Terms of Service
│   ├── docs/                       # API Documentation
│   ├── blog/[slug]/                # Blog detail (dynamic)
│   ├── case-studies/[slug]/        # Case study detail (dynamic)
│   └── api/                        # 16 API routes
│       ├── contact/route.ts        # Lead capture → Google Sheets + email
│       ├── track/route.ts          # Server-side tracking (GA4/Meta/TikTok/Snap)
│       ├── track/stats/route.ts    # Tracking stats (cached)
│       ├── leads/route.ts          # Leads list (cached)
│       ├── leads/[id]/route.ts     # Lead update
│       ├── leads/bulk/route.ts     # Bulk lead operations
│       ├── leads/export/route.ts   # CSV export
│       ├── book-call/route.ts      # Strategy call booking
│       ├── newsletter/route.ts     # Newsletter subscribe
│       ├── audit/route.ts          # AI audit tool
│       ├── careers/route.ts        # Job applications
│       ├── download/route.ts       # Free resource download
│       ├── chat-agent/route.ts     # AI chat (Gemini-powered)
│       ├── chat-save/route.ts      # Chat conversation save
│       └── send-email/route.ts     # Email sender
├── components/
│   ├── ui/                         # shadcn/ui components (40+)
│   └── site/
│       ├── navbar.tsx              # Main navbar (logo, nav, lang, theme, CTA)
│       ├── footer.tsx              # Footer (social, contact, newsletter)
│       ├── logo.tsx                # Logo component (Image-based)
│       ├── top-bar.tsx             # Landing page top bar
│       ├── language-provider.tsx   # Bilingual system (1226 lines, EN+BN dict)
│       ├── language-toggle.tsx     # EN/BN toggle button
│       ├── theme-provider.tsx      # Dark/light mode (next-themes)
│       ├── theme-toggle.tsx        # Theme toggle button
│       ├── analytics-pixels.tsx    # GA4 + FB + Snap + TikTok pixels
│       ├── reveal.tsx              # Scroll animation wrapper
│       ├── landing-common.tsx      # Landing page helpers (form, socials, footer)
│       ├── payment-instructions.tsx # bKash/Nagad payment UI
│       ├── floating-buttons.tsx    # WhatsApp float button
│       ├── ai-chat-widget.tsx      # AI chat widget (Gemini-powered)
│       ├── booking-modal.tsx       # Strategy call booking modal
│       ├── sticky-book-bar.tsx     # Sticky book CTA
│       ├── scroll-progress.tsx     # Reading progress bar
│       ├── social-proof.tsx        # Social proof notifications
│       ├── admin-gate.tsx          # Admin login gate
│       ├── api-docs.tsx            # API documentation page
│       ├── legal-footer.tsx        # Footer for privacy/terms/docs
│       └── sections/               # 44 homepage sections
│           ├── hero.tsx            # Hero section
│           ├── pain-points.tsx     # Pain points (PADA: Pain)
│           ├── cost-of-inaction.tsx # Cost of inaction
│           ├── solution.tsx        # Solution (PADA: Awareness)
│           ├── how-it-works.tsx    # 7-day process
│           ├── services.tsx        # 4 service cards
│           ├── why-choose-us.tsx   # 4 reasons
│           ├── testimonials.tsx    # 6 testimonials
│           ├── pricing.tsx         # 3 pricing plans
│           ├── lead-form.tsx       # Lead capture form (react-hook-form + zod)
│           ├── final-cta.tsx       # Final call-to-action
│           └── ... (33 more sections)
├── lib/
│   ├── site-data.ts                # All site content (1247 lines)
│   ├── db.ts                       # Prisma client singleton
│   ├── google-sheets.ts            # Google Sheets sync (Apps Script webhook)
│   ├── tracking.ts                 # Server-side Conversions API
│   ├── whatsapp.ts                 # WhatsApp link helper
│   ├── cache.ts                    # In-memory cache (TTL-based)
│   ├── gemini.ts                   # Google Gemini AI integration
│   ├── email-lead.ts               # Email helper
│   ├── feature-flags.ts            # 25 feature flags
│   └── utils.ts                    # Utility functions
├── hooks/
│   ├── use-mobile.ts               # Mobile detection hook
│   └── use-toast.ts                # Toast notification hook
└── prisma/
    └── schema.prisma               # 7 models (Lead, Booking, Newsletter, etc.)
```

---

## 🌐 Site Configuration

```typescript
export const SITE_CONFIG = {
  name: 'NextGen Digital Studio',
  nameBn: 'নেক্সটজেন ডিজিটাল স্টুডিও',
  phone: '+8801711731354',
  phoneDisplay: '+880 1711-731354',
  whatsapp: '8801711731354',
  email: 'nextgendigitalstudio1@gmail.com',
  address: 'মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট, যশোর, বাংলাদেশ',
  url: 'https://nextgendigitalstudio.com',
  founded: 2023,
  facebook: 'https://www.facebook.com/nextgendigitalstudio',
  linkedin: 'https://www.linkedin.com/in/nextgen-digital-studio',
  github: 'https://github.com/Taj3D',
  instagram: 'https://instagram.com/nextgendigitalstudio1',
  threads: 'https://threads.net/nextgendigitalstudio1',
  youtube: 'https://www.youtube.com/@NextGenDigitalStudio1',
  twitter: 'https://x.com/NextGenDigit',
}
```

---

## 🔑 Environment Variables (.env)

```env
DATABASE_URL=file:./db/custom.db
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwJX2Ok-SZS24QK8AxZeQLP8wWSytCzfQLYiW8tPKEV35ipHYsqgl2TFN9hVC98i7ou/exec

# Analytics Pixels
NEXT_PUBLIC_GA4_ID=G-QF7TJBHR7Z
NEXT_PUBLIC_FB_PIXEL_ID=918051034554872
NEXT_PUBLIC_SNAP_PIXEL_ID=7cca67ea-668f-411b-a9ee-5add229d8e0a
NEXT_PUBLIC_TIKTOK_PIXEL_ID=D91TS0RC77UDRLSQ9CKG

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=nextgen2025

# AI
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

---

## 📄 পেজের তালিকা (২৩টি)

### মূল পেজ (১১টি):
1. `/` — হোমপেজ (PADA sales funnel: 11 sections)
2. `/founder` — ফাউন্ডার পেজ (তাজ ভাই)
3. `/3d-portrait` — 3D Portrait সার্ভিস (12 sections, live price calculator)
4. `/cnc-design` — CNC Design বান্ডল (150TK/150GB, 8 categories)
5. `/pdf-books` — PDF বই (৫টি, ১৭০TK each, buy 1 get 1 free)
6. `/ai-training` — AI ট্রেইনিং (১০০০TK, ১ সপ্তাহ, ৪ মডিউল)
7. `/cnc-training` — CNC ট্রেইনিং (২৫০TK, ১ সপ্তাহ)
8. `/privacy` — প্রাইভেসি পলিসি
9. `/terms` — টার্মস অফ সার্ভিস
10. `/docs` — API ডকুমেন্টেশন
11. `/admin` — অ্যাডমিন ড্যাশবোর্ড (লিড ম্যানেজমেন্ট)

### সার্ভিস পেজ (১২টি):
12. `/services/ai-sales-automation`
13. `/services/ai-chat-agent`
14. `/services/ai-voice-agent`
15. `/services/crm-automation`
16. `/services/whatsapp-automation`
17. `/services/lead-generation`
18. `/services/performance-marketing`
19. `/services/sales-funnel-development`
20. `/services/business-automation`
21. `/services/website-development`
22. `/services/landing-page-design`
23. `/services/ai-consultation`

---

## 🎨 হোমপেজ স্ট্রাকচার (PADA Sales Funnel)

```
1. PAIN (কষ্ট):
   - HeroSection (headline + CTA + stats)
   - PainPointsSection (6 pain cards)
   - CostOfInactionSection (3 cost stats)

2. AWARENESS (সমাধান):
   - Solution (3 steps)
   - HowItWorks (7-day process)
   - Services (4 service cards)

3. DESIRE (ইচ্ছা):
   - WhyChooseUs (4 reasons)
   - Testimonials (6 testimonials)

4. ACTION (কাজ):
   - Pricing (3 plans: Starter 15K, Growth 35K, Dominant 75K)
   - LeadForm (react-hook-form + zod validation)
   - FinalCta (urgency CTA)
```

---

## 🔄 Lead Flow (লিড জেনারেশন)

```
কাস্টমার ফর্ম পূরণ (নাম + ইমেইল + ফোন)
    ↓
/api/contact POST (200 OK)
    ↓
Google Sheets-এ সেভ (text/plain, redirect:follow)
    ↓
ইমেইল পাঠানো (কাস্টমার + মালিক) — Apps Script doPost()
    ↓
সার্ভার-সাইড ট্র্যাকিং (GA4 + Meta CAPI + TikTok + Snapchat)
    ↓
Success State + Payment Instructions (bKash/Nagad)
```

### Google Sheets Apps Script (doPost):
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // 1. Google Sheet-এ সেভ
  sheet.appendRow([new Date(), data.name, data.email, data.phone, 
    data.company, data.service, data.message, data.source, data.status || 'new']);
  
  // 2. কাস্টমারকে কনফার্মেশন ইমেইল
  if (data.email) {
    MailApp.sendEmail(data.email, '✅ আপনার অর্ডার গ্রহণ করা হয়েছে — NextGen Digital Studio',
      'প্রিয় ' + data.name + ',\n\nআপনার অর্ডার গ্রহণ করা হয়েছে...');
  }
  
  // 3. মালিককে নোটিফিকেশন ইমেইল
  MailApp.sendEmail('nextgendigitalstudio1@gmail.com',
    '🔔 নতুন লিড: ' + data.source + ' — ' + data.name,
    'নতুন লিড এসেছে!\n\nনাম: ' + data.name + '...');
  
  return ContentService.createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 💳 Payment Flow

| পেজ | ফি | পেমেন্ট ইনস্ট্রাকশন |
|------|-----|----------------|
| /ai-training | ১০০০TK | bKash/Nagad → TrxID WhatsApp → Zoom link |
| /cnc-training | ২৫০TK | bKash/Nagad → TrxID WhatsApp → Zoom link + chair leg file |
| /cnc-design | ১৫০TK | bKash/Nagad → TrxID WhatsApp → Google Drive link |
| /3d-portrait | কাজ শেষে | ছবি → কাজ → দেখানো → পেমেন্ট → STL (no advance) |

---

## 🌐 দ্বিভাষিক সিস্টেম (Bilingual)

- `language-provider.tsx` — ১২২৬ লাইন, EN + BN অভিধান
- `useLang()` hook — `t('key')` ফাংশন
- `LanguageToggle` — EN/BN টগল বাটন
- localStorage-এ ভাষা সংরক্ষিত
- ২২৮+ অনুবাদ কী (homepage + landing pages)

---

## 📊 Analytics Pixels (৪টি)

```typescript
// src/components/site/analytics-pixels.tsx
// strategy: "afterInteractive" (next/script)

1. GA4:        G-QF7TJBHR7Z
2. Facebook:   918051034554872
3. Snapchat:   7cca67ea-668f-411b-a9ee-5add229d8e0a
4. TikTok:     D91TS0RC77UDRLSQ9CKG
```

---

## 🔍 SEO সেটআপ

- `sitemap.ts` — ২২ URLs (dynamic)
- `robots.ts` — AI bot rules (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended)
- `llms.txt` — AI agent discovery file
- `.well-known/agents.json` — AI agent capabilities
- JSON-LD: Organization + ProfessionalService + FAQPage schema
- Meta description: ১৫১ chars
- Open Graph: logo.jpg (1200×630) + dimensions
- Twitter Card: summary_large_image
- Canonical URLs
- HTTPS/SSL

---

## 🗄️ Prisma Schema (৭টি Model)

```prisma
model Lead { id, name, email, phone, company, service, message, notes, assignedTo, source, status, createdAt, updatedAt }
model LeadActivity { id, leadId, type, detail, oldValue, newValue, createdAt }
model Booking { id, name, email, phone, company, service, preferredDate, message, status, createdAt, updatedAt }
model NewsletterSubscriber { id, email, active, source, createdAt, updatedAt }
model ChatConversation { id, sessionId, messages, leadEmail, leadPhone, leadName, messageCount, createdAt, updatedAt }
model TrackingEvent { id, type, page, source, email, phone, name, value, currency, meta, userAgent, ipAddress, createdAt }
model User { id, email, name, createdAt, updatedAt }
```

---

## 🚀 ডেপ্লয়মেন্ট

### GitHub:
```bash
git init
git add -A
git commit -m "feat: NextGen Digital Studio — complete website"
git remote add origin https://github.com/Taj3D/nextgen-digital-studio.git
git push -u origin main
```

### Vercel:
1. GitHub repo কানেক্ট করুন
2. Environment variables সেট করুন
3. Deploy

### Domain:
- `nextgendigitalstudio.com` → A record: 216.198.79.1
- `www.nextgendigitalstudio.com` → CNAME: bfea6164acb600e9.vercel-dns-017.com.

---

## ⚡ গুরুত্বপূর্ণ নোট

1. **Lead form** — `react-hook-form` + `zod` validation, `onInput` handler দিয়ে native input sync
2. **Google Sheets** — `Content-Type: text/plain`, `redirect: 'follow'` (Apps Script 302 হ্যান্ডল)
3. **Phone validation** — `^(\+?880|0)?1[3-9]\d{8}$` (+880/880/0 সব ফরম্যাট)
4. **Logo** — `public/logo.jpg` সব পেজে (navbar, footer, top-bar, admin, privacy, terms, docs)
5. **WhatsApp number** — `8801711731354` (ভুল নম্বর নয়)
6. **Book button** — `#lead-form` বা `#order` ID-তে scroll
7. **Theme toggle** — `next-themes`, `defaultTheme: 'dark'`
8. **AI bot rules** — GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended
9. **Sitemap** — ২২ URLs (সব পেজ)
10. **SSL/HTTPS** — Vercel automatic

---

## 📝 নির্দেশনা

এই প্রম্পট ব্যবহার করে ওয়েবসাইট তৈরি করার সময়:

1. প্রথমে Next.js 16 প্রজেক্ট ইনিশিয়ালাইজ করুন
2. Tailwind CSS 4 + shadcn/ui ইনস্টল করুন
3. Prisma + SQLite সেটআপ করুন
4. `site-data.ts` তৈরি করুন (সব কন্টেন্ট)
5. `language-provider.tsx` তৈরি করুন (EN + BN)
6. Homepage sections তৈরি করুন (PADA funnel)
7. Landing pages তৈরি করুন (৬টি)
8. Service pages তৈরি করুন (১২টি)
9. API routes তৈরি করুন (১৬টি)
10. Google Sheets Apps Script সেটআপ করুন
11. Analytics pixels যোগ করুন (৪টি)
12. SEO সেটআপ করুন (sitemap, robots, llms.txt, agents.json, JSON-LD)
13. Deploy করুন (GitHub + Vercel)

---

**এই মাস্টার প্রম্পট দিয়ে সম্পূর্ণ ওয়েবসাইট হুবহু তৈরি করা সম্ভব।** 🚀
