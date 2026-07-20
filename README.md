# NextGen Digital Studio — AI Sales Automation Agency Website

Bilingual (Bangla/English) agency website built with Next.js 16, TypeScript, Tailwind CSS 4, and Prisma. Features a PADA sales funnel homepage, 23 pages, 16 API routes, lead generation with Google Sheets integration, AI chat widget, and 4 analytics pixels.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Copy environment file and fill in values
cp .env.example .env

# 3. Set up the database
bun run db:push

# 4. Start the dev server
bun run dev
```

Visit `http://localhost:3000` (preview via the Preview Panel in the sandbox).

---

## 🏗️ Tech Stack

| Layer | Technology |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Icons | Lucide React |
| Animation | Framer Motion |
| Database | Prisma ORM (SQLite dev / PostgreSQL prod) |
| Fonts | Plus Jakarta Sans + Inter + Sora (Google) + MahfujLipi (Bangla) + ForzonDEMO (display) |
| State | Zustand + TanStack Query |
| Forms | react-hook-form + zod |
| AI | Google Gemini + z-ai-web-dev-sdk fallback |

---

## 📁 Project Structure

```
src/
├── app/                      # 23 pages (App Router)
│   ├── page.tsx              # Homepage (PADA funnel)
│   ├── founder/              # Founder page (Taj Bhai)
│   ├── 3d-portrait/          # 3D Portrait landing
│   ├── cnc-design/           # CNC Design bundle
│   ├── pdf-books/            # PDF Books
│   ├── ai-training/          # AI Training
│   ├── cnc-training/         # CNC Training
│   ├── services/[slug]/      # 12 service landing pages
│   ├── admin/                # Admin dashboard
│   ├── privacy/ terms/ docs/ # Legal + docs
│   ├── blog/ case-studies/   # Content
│   ├── api/                  # 16 API routes
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts             # AI bot rules
│   └── manifest.ts           # PWA manifest
├── components/
│   ├── ui/                   # shadcn/ui (40+ components)
│   └── site/                 # Site-specific components
│       ├── sections/         # 11 PADA funnel sections
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── ai-chat-widget.tsx
│       ├── booking-modal.tsx
│       └── ...
├── lib/                      # Utilities + integrations
│   ├── site-data.ts          # All site content (bilingual)
│   ├── db.ts                 # Prisma client
│   ├── google-sheets.ts      # Google Sheets sync
│   ├── email-lead.ts         # Email helper
│   ├── feature-flags.ts      # Feature flags
│   ├── gemini.ts             # Gemini AI
│   └── ...
└── hooks/                    # Custom React hooks
```

---

## 🔄 Lead Flow

```
Customer fills form (name + email + phone)
    ↓
/api/contact POST (200 OK)
    ↓
Google Sheets save (Content-Type: text/plain, redirect: follow)
    ↓
Emails sent (customer confirmation + owner notification)
    ↓
Server-side tracking (GA4 + Meta CAPI + TikTok + Snapchat)
    ↓
Success state + payment instructions (bKash/Nagad)
```

---

## 🌐 Bilingual System

- `src/components/site/language-provider.tsx` — EN/BN context with `useLang()` hook
- `src/lib/site-data.ts` — centralized bilingual content store
- Language toggle in navbar, persisted to localStorage

---

## 📊 Analytics

4 client-side pixels + 4 server-side Conversions API:
- GA4 (`G-QF7TJBHR7Z`)
- Facebook Pixel (`918051034554872`)
- Snapchat Pixel (`7cca67ea-668f-411b-a9ee-5add229d8e0a`)
- TikTok Pixel (`D91TS0RC77UDRLSQ9CKG`)

---

## 🔍 SEO

- Dynamic XML sitemap (24+ URLs)
- robots.txt with explicit AI bot rules (GPTBot, ClaudeBot, PerplexityBot, etc.)
- `llms.txt` for AI agent discovery
- `.well-known/agents.json` for AI agent capabilities
- JSON-LD: Organization + ProfessionalService + FAQPage + per-page schemas
- Open Graph + Twitter Card metadata
- PWA manifest

---

## 💳 Payment Flow

| Page | Fee | Method |
|------|-----|------|
| /ai-training | 1000TK | bKash/Nagad → TrxID on WhatsApp → Zoom link |
| /cnc-training | 250TK | bKash/Nagad → TrxID on WhatsApp → Zoom + free file |
| /cnc-design | 150TK | bKash/Nagad → TrxID on WhatsApp → Drive link |
| /3d-portrait | After work | Photo → work → preview → payment → STL (no advance) |

---

## 🚀 Deployment

### GitHub

```bash
git init
git add -A
git commit -m "feat: NextGen Digital Studio — complete website"
git remote add origin https://github.com/Taj3D/nextgen-digital-studio.git
git push -u origin main
```

### Vercel

1. Connect the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Set all environment variables (copy from `.env.example`)
3. Deploy
4. Configure DNS:
   - `nextgendigitalstudio.com` → A record: `216.198.79.1`
   - `www.nextgendigitalstudio.com` → CNAME: `bfea6164acb600e9.vercel-dns-017.com.`

### Production Database

Vercel serverless has read-only filesystem. **Switch from SQLite to PostgreSQL**:

1. Create a Vercel Postgres / Neon / Supabase database
2. Update `prisma/schema.prisma`: `provider = "postgresql"`
3. Set `DATABASE_URL` in Vercel env vars
4. Run `bun run db:push` locally with the production DATABASE_URL

---

## 📝 Scripts

| Command | Description |
|------|------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to DB |
| `bun run db:generate` | Generate Prisma Client |
| `bun run db:migrate` | Run Prisma migrations |

---

## 📞 Contact

- 📧 nextgendigitalstudio1@gmail.com
- 📱 +880 1711 731354
- 🌐 nextgendigitalstudio.com
- 📍 Mia Barir Mor, Sheikhati, New Market, Jessore, Bangladesh

---

© 2023–2026 NextGen Digital Studio. All rights reserved.
