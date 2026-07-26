# 🚀 Vercel Deployment Guide — NextGen Digital Studio

This guide walks you through deploying the NextGen Digital Studio website (including the `/founder` page) to Vercel.

---

## ✅ Pre-Deployment Checklist (Already Done)

- [x] Code pushed to GitHub: `github.com/Taj3D/nextgen-digital-studio`
- [x] ESLint passes clean (no errors/warnings)
- [x] TypeScript type-check passes (`tsc --noEmit` exit 0)
- [x] Production build succeeds locally (`bun run build`)
- [x] `/founder` page prerenders as static (`○ /founder`)
- [x] `vercel.json` configured (Next.js framework + PostgreSQL auto-conversion + security headers)
- [x] `.env.example` documents all required environment variables
- [x] `.gitignore` excludes `.env`, `*.db`, `.vercel/`, build artifacts
- [x] No hardcoded secrets in source code

---

## 📋 Step-by-Step Vercel Deployment

### Step 1 — Create a PostgreSQL Database

Vercel's filesystem is **read-only** in production, so SQLite (local dev) won't work. Choose one:

| Provider | Free Tier | Setup Time |
|----------|-----------|------------|
| **Vercel Postgres** (recommended) | Yes (256 MB) | ~1 min (built into Vercel) |
| **Neon** | Yes (0.5 GB) | ~2 min |
| **Supabase** | Yes (500 MB) | ~2 min |

**Vercel Postgres (easiest):**
1. Go to https://vercel.com/dashboard → your project → "Storage" tab
2. Click "Create Database" → "Postgres" → accept defaults
3. Vercel auto-injects `DATABASE_URL` and `POSTGRES_*` env vars — no copy/paste needed

### Step 2 — Import the GitHub Repo to Vercel

1. Go to **https://vercel.com/new**
2. Click "Import Git Repository" → select `Taj3D/nextgen-digital-studio`
3. Vercel auto-detects:
   - Framework: **Next.js** ✅
   - Build Command: from `vercel.json` (converts Prisma schema sqlite→postgresql, runs `prisma generate`, then `next build`)
   - Install Command: `bun install`
   - Output Directory: `.next`
4. **Do NOT click Deploy yet** — add env vars first (Step 3)

### Step 3 — Add Environment Variables

In the "Environment Variables" section, add these (copy values from your local `.env.example`):

#### 🔴 Required (deploy will fail without these)

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `postgresql://...` | From Step 1 (Vercel Postgres auto-injects this) |
| `GOOGLE_SHEETS_WEBHOOK_URL` | `https://script.google.com/macros/s/AKfycbz.../exec` | Google Apps Script webhook for leads |
| `SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP |
| `SMTP_PORT` | `465` | Gmail SSL port |
| `SMTP_USER` | `nextgendigitalstudio1@gmail.com` | Your Gmail address |
| `SMTP_PASS` | *(16-char Gmail App Password)* | NOT your regular password — see below |
| `SMTP_FROM` | `NextGen Digital Studio <nextgendigitalstudio1@gmail.com>` | Display name + email |
| `ADMIN_PASSWORD` | `nextgen2025` | Admin dashboard login |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `nextgen2025` | Same as above (client-side check) |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Your production URL |

#### 📧 Gmail App Password Setup (for SMTP_PASS)

1. Go to https://myaccount.google.com → Security
2. Enable **2-Step Verification** (if not already)
3. Go to "App passwords" → "Mail" → "Generate"
4. Copy the 16-character password → paste into `SMTP_PASS`

#### 🟡 Optional (features work but degrade gracefully without)

| Variable | Notes |
|----------|-------|
| `GEMINI_API_KEY` | AI chat agent. Leave empty to auto-fallback to built-in AI |
| `GEMINI_MODEL` | `gemini-2.5-flash` (default) |
| `AI_PROVIDER` | `auto` |
| `RESEND_API_KEY` | Alternative email provider (3,000 emails/month free at resend.com) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 Measurement ID |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta/Facebook Pixel |
| `NEXT_PUBLIC_SNAP_PIXEL_ID` | Snapchat Pixel |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel |

#### 🟢 Optional (server-side Conversions API — advanced)

`FB_PIXEL_ID`, `FB_ACCESS_TOKEN`, `SNAP_PIXEL_ID`, `SNAPCHAT_ACCESS_TOKEN`, `TIKTOK_PIXEL_ID`, `TIKTOK_ACCESS_TOKEN`, `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`

### Step 4 — Deploy

1. Click **"Deploy"**
2. Build takes **~2-3 minutes**
3. Watch the build logs — you should see:
   - `sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma` ✅
   - `prisma generate` ✅
   - `next build` → all routes compiled ✅
   - `○ /founder` (static prerender) ✅
4. On success, Vercel gives you a `*.vercel.app` URL

### Step 5 — Initialize the Production Database

After the first successful deploy, create all tables in your new PostgreSQL:

```bash
# In your local project folder
# 1. Temporarily set the PRODUCTION DATABASE_URL in your local .env
#    (replace the SQLite path with your Postgres connection string)
# 2. Run:
bun run db:push
# 3. Restore your local SQLite DATABASE_URL in .env for continued local dev
```

### Step 6 — (Optional) Add a Custom Domain

1. Vercel Dashboard → your project → "Settings" → "Domains"
2. Add `nextgendigitalstudio.com` (or your domain)
3. Add the DNS records Vercel shows you at your registrar
4. Vercel auto-provisions HTTPS via Let's Encrypt

---

## 🔄 Future Updates

Once set up, **every `git push origin main`** automatically triggers a new Vercel deployment. No manual steps needed.

```bash
# Make changes locally → commit → push → Vercel auto-deploys
git add -A
git commit -m "your update message"
git push origin main
```

---

## 🐛 Troubleshooting

### Build fails on Vercel but works locally?
- Check that `DATABASE_URL` is set to a **PostgreSQL** connection string (not SQLite path)
- Vercel's `vercel.json` buildCommand auto-converts the schema — verify it ran in build logs

### Prisma errors after deploy?
- Run `bun run db:push` with the production `DATABASE_URL` (Step 5)

### Emails not sending?
- Verify `SMTP_PASS` is a Gmail **App Password** (16 chars), not your regular password
- Check Vercel function logs: Dashboard → project → "Functions" → `/api/contact`

### /founder page shows 404?
- Verify the build log shows `○ /founder` (static prerender succeeded)
- Check that `src/app/founder/page.tsx` and `founder-client.tsx` are committed to GitHub

---

## 📞 Quick Reference

| Resource | URL |
|----------|-----|
| GitHub Repo | https://github.com/Taj3D/nextgen-digital-studio |
| Vercel Dashboard | https://vercel.com/dashboard |
| Vercel Postgres | https://vercel.com/docs/storage/vercel-postgres |
| Gmail App Passwords | https://myaccount.google.com/apppasswords |
| Prisma on Vercel | https://www.prisma.io/docs/guides/deploy-to-vercel |

---

**Need help?** All code is verified production-ready. The only manual step is importing the repo to Vercel and pasting env vars.
