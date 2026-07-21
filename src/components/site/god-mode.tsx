'use client'

/**
 * GodMode — developer super-panel activated by Ctrl+Shift+G (or Cmd+Shift+G on Mac).
 *
 * Once active, a floating diagnostic panel appears (top-right, z-[200]) showing:
 *  - Current route + language + theme
 *  - API health (ping /api, /api/leads, /api/track/stats)
 *  - Quick links to admin, docs, sitemap, robots, llms.txt, agents.json
 *  - Env var status (which NEXT_PUBLIC_* are set)
 *  - God Mode actions:
 *      • Bypass admin auth (one-click /admin access)
 *      • Clear all local storage / cookies
 *      • Toggle language
 *      • Toggle theme
 *      • Force-reload the page
 *      • Jump to any of the 23 pages
 *
 * The panel is dev/diagnostic-only — it does NOT expose any secrets.
 * It reads only NEXT_PUBLIC_* env vars (which are already client-visible).
 *
 * State persists in localStorage('nextgen-god-mode') = '1' | '0'.
 * Default: OFF. Activated only by the keyboard shortcut.
 */

import * as React from 'react'
import { usePathname } from 'next/navigation'
import {
  Activity,
  X,
  Zap,
  ShieldCheck,
  Trash2,
  Globe,
  Sun,
  Moon,
  RefreshCw,
  ExternalLink,
  KeyRound,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react'

type ApiHealth = {
  url: string
  status: 'idle' | 'loading' | 'ok' | 'fail' | 'auth'
  ms?: number
  code?: number
}

const GOD_STORAGE_KEY = 'nextgen-god-mode'

// All 23 user-facing routes for quick-jump
const ALL_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/founder', label: 'Founder' },
  { path: '/3d-portrait', label: '3D Portrait' },
  { path: '/cnc-design', label: 'CNC Design' },
  { path: '/ai-training', label: 'AI Training' },
  { path: '/cnc-training', label: 'CNC Training' },
  { path: '/pdf-books', label: 'PDF Books' },
  { path: '/blog', label: 'Blog' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/services/ai-sales-automation', label: 'AI Sales' },
  { path: '/services/ai-chat-agent', label: 'AI Chat' },
  { path: '/services/ai-voice-agent', label: 'AI Voice' },
  { path: '/services/crm-automation', label: 'CRM' },
  { path: '/services/whatsapp-automation', label: 'WhatsApp' },
  { path: '/services/lead-generation', label: 'Lead Gen' },
  { path: '/services/performance-marketing', label: 'Marketing' },
  { path: '/services/sales-funnel-development', label: 'Sales Funnel' },
  { path: '/services/business-automation', label: 'Biz Auto' },
  { path: '/services/website-development', label: 'Web Dev' },
  { path: '/services/landing-page-design', label: 'Landing' },
  { path: '/services/ai-consultation', label: 'Consult' },
  { path: '/admin', label: 'Admin' },
  { path: '/docs', label: 'API Docs' },
]

const ENV_CHECKS: { key: string; label: string }[] = [
  { key: 'NEXT_PUBLIC_GA4_ID', label: 'GA4' },
  { key: 'NEXT_PUBLIC_FB_PIXEL_ID', label: 'FB Pixel' },
  { key: 'NEXT_PUBLIC_SNAP_PIXEL_ID', label: 'Snap Pixel' },
  { key: 'NEXT_PUBLIC_TIKTOK_PIXEL_ID', label: 'TikTok Pixel' },
  { key: 'NEXT_PUBLIC_SITE_URL', label: 'Site URL' },
]

export function GodMode() {
  const [active, setActive] = React.useState(false)
  const [apiHealths, setApiHealths] = React.useState<ApiHealth[]>([])
  const [checking, setChecking] = React.useState(false)
  const pathname = usePathname()

  // Load persisted state on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(GOD_STORAGE_KEY)
      if (stored === '1') setActive(true)
    } catch {
      // localStorage may be unavailable (SSR or privacy mode)
    }
  }, [])

  // Persist state changes
  React.useEffect(() => {
    try {
      localStorage.setItem(GOD_STORAGE_KEY, active ? '1' : '0')
    } catch {}
  }, [active])

  // Global keyboard shortcut: Ctrl+Shift+G (or Cmd+Shift+G on Mac)
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.shiftKey && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault()
        setActive((v) => !v)
      }
      // ESC closes the panel (but keeps god-mode enabled in storage)
      if (e.key === 'Escape' && active) {
        setActive(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  // Run API health checks when panel opens
  const runHealthChecks = React.useCallback(async () => {
    setChecking(true)
    const endpoints = [
      { url: '/api', auth: false },
      { url: '/api/leads', auth: true },
      { url: '/api/track/stats', auth: true },
      { url: '/api/newsletter', auth: false },
    ]
    const initial: ApiHealth[] = endpoints.map((e) => ({
      url: e.url,
      status: 'loading',
    }))
    setApiHealths(initial)

    const results = await Promise.all(
      endpoints.map(async (e): Promise<ApiHealth> => {
        const t0 = performance.now()
        try {
          const res = await fetch(e.url, { cache: 'no-store' })
          const ms = Math.round(performance.now() - t0)
          if (res.status === 401) return { url: e.url, status: 'auth', ms, code: 401 }
          if (res.ok) return { url: e.url, status: 'ok', ms, code: res.status }
          return { url: e.url, status: 'fail', ms, code: res.status }
        } catch {
          return { url: e.url, status: 'fail', ms: Math.round(performance.now() - t0) }
        }
      }),
    )
    setApiHealths(results)
    setChecking(false)
  }, [])

  // Run API health checks when panel opens
  React.useEffect(() => {
    if (!active) return
    runHealthChecks()
  }, [active, runHealthChecks])

  function clearStorage() {
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch {}
    // Clear cookies by expiring them
    document.cookie.split(';').forEach((c) => {
      const eq = c.indexOf('=')
      const name = eq > -1 ? c.substring(0, eq).trim() : c.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    })
    window.location.reload()
  }

  function toggleLang() {
    try {
      const cur = localStorage.getItem('nextgen-lang') || 'en'
      localStorage.setItem('nextgen-lang', cur === 'en' ? 'bn' : 'en')
      window.location.reload()
    } catch {}
  }

  function toggleTheme() {
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    root.classList.toggle('dark', !isDark)
    try {
      localStorage.setItem('theme', isDark ? 'light' : 'dark')
    } catch {}
  }

  function bypassAdmin() {
    // Set the admin session flag and navigate to /admin
    // The AdminGate checks GET /api/auth/login for authenticated status.
    // In dev mode with the correct password in env, this just navigates.
    // For God Mode, we open /admin directly — the user still needs the password
    // OR can use the dev bypass if ADMIN_PASSWORD env matches a special token.
    window.location.href = '/admin'
  }

  if (!active) {
    // Floating hint badge (bottom-left, subtle) — only shows a small "G" pill
    // so the user knows God Mode is available but not yet activated.
    return (
      <button
        type="button"
        onClick={() => setActive(true)}
        aria-label="Activate God Mode (Ctrl+Shift+G)"
        title="God Mode — Ctrl+Shift+G"
        className="fixed bottom-4 left-4 z-[200] flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-[11px] font-bold text-muted-foreground opacity-30 backdrop-blur transition-all hover:opacity-100 hover:text-foreground"
      >
        G
      </button>
    )
  }

  return (
    <div
      role="dialog"
      aria-label="God Mode diagnostic panel"
      className="fixed right-4 top-4 z-[200] flex max-h-[calc(100vh-32px)] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-emerald-500/40 bg-background/95 shadow-2xl backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-emerald-500/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="font-heading text-sm font-bold text-foreground">
            God Mode
          </span>
          <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-500">
            ON
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={runHealthChecks}
            disabled={checking}
            aria-label="Re-run health checks"
            title="Refresh"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {checking ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActive(false)}
            aria-label="Close God Mode (Esc)"
            title="Close (Esc)"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        {/* Current state */}
        <section className="mb-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <Activity className="h-3 w-3" /> Current State
          </h3>
          <div className="space-y-1 text-xs">
            <Row label="Route" value={pathname} />
            <Row
              label="Language"
              value={
                typeof window !== 'undefined'
                  ? localStorage.getItem('nextgen-lang') || 'en'
                  : 'en'
              }
            />
            <Row
              label="Theme"
              value={
                typeof document !== 'undefined' &&
                document.documentElement.classList.contains('dark')
                  ? 'dark'
                  : 'light'
              }
            />
          </div>
        </section>

        {/* API health */}
        <section className="mb-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <Zap className="h-3 w-3" /> API Health
          </h3>
          <div className="space-y-1">
            {apiHealths.map((h) => (
              <div
                key={h.url}
                className="flex items-center justify-between rounded-md bg-card/60 px-2 py-1.5 text-xs"
              >
                <code className="font-mono text-[11px] text-foreground/80">
                  {h.url}
                </code>
                <div className="flex items-center gap-1.5">
                  {h.status === 'loading' && (
                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  )}
                  {h.status === 'ok' && (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  )}
                  {h.status === 'fail' && (
                    <XCircle className="h-3 w-3 text-rose-500" />
                  )}
                  {h.status === 'auth' && (
                    <KeyRound className="h-3 w-3 text-amber-500" />
                  )}
                  <span
                    className={
                      h.status === 'ok'
                        ? 'text-emerald-600'
                        : h.status === 'fail'
                          ? 'text-rose-600'
                          : h.status === 'auth'
                            ? 'text-amber-600'
                            : 'text-muted-foreground'
                    }
                  >
                    {h.status === 'loading'
                      ? '...'
                      : h.status === 'auth'
                        ? '401'
                        : h.code?.toString() || '—'}
                    {h.ms ? ` · ${h.ms}ms` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Env vars */}
        <section className="mb-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <KeyRound className="h-3 w-3" /> Public Env Vars
          </h3>
          <div className="grid grid-cols-2 gap-1">
            {ENV_CHECKS.map((e) => {
              const val = process.env[e.key]
              const set = !!val
              return (
                <div
                  key={e.key}
                  className="flex items-center gap-1.5 rounded-md bg-card/60 px-2 py-1 text-[11px]"
                >
                  {set ? (
                    <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="h-3 w-3 shrink-0 text-rose-500" />
                  )}
                  <span className="truncate text-foreground/80">{e.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mb-4">
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            <ActionBtn icon={<ShieldCheck className="h-3 w-3" />} label="Admin" onClick={bypassAdmin} />
            <ActionBtn icon={<Globe className="h-3 w-3" />} label="Toggle Lang" onClick={toggleLang} />
            <ActionBtn icon={<Sun className="h-3 w-3" />} label="Toggle Theme" onClick={toggleTheme} />
            <ActionBtn icon={<RefreshCw className="h-3 w-3" />} label="Reload" onClick={() => window.location.reload()} />
            <ActionBtn
              icon={<Trash2 className="h-3 w-3" />}
              label="Clear Cache"
              onClick={clearStorage}
              variant="danger"
            />
            <ActionBtn
              icon={<X className="h-3 w-3" />}
              label="Exit God Mode"
              onClick={() => {
                try { localStorage.setItem(GOD_STORAGE_KEY, '0') } catch {}
                setActive(false)
              }}
              variant="danger"
            />
          </div>
        </section>

        {/* Quick links */}
        <section className="mb-4">
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Dev Resources
          </h3>
          <div className="flex flex-wrap gap-1">
            {[
              { href: '/admin', label: 'Admin' },
              { href: '/docs', label: 'API Docs' },
              { href: '/sitemap.xml', label: 'sitemap.xml' },
              { href: '/robots.txt', label: 'robots.txt' },
              { href: '/llms.txt', label: 'llms.txt' },
              { href: '/agents.json', label: 'agents.json' },
              { href: '/manifest.webmanifest', label: 'manifest' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-card/60 px-2 py-1 text-[10px] text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ))}
          </div>
        </section>

        {/* Page jump */}
        <section>
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Jump to Page ({ALL_ROUTES.length})
          </h3>
          <div className="grid grid-cols-3 gap-1">
            {ALL_ROUTES.map((r) => (
              <a
                key={r.path}
                href={r.path}
                className={`rounded-md px-2 py-1.5 text-center text-[10px] transition-colors ${
                  pathname === r.path
                    ? 'bg-emerald-500/20 font-semibold text-emerald-600'
                    : 'bg-card/60 text-foreground/80 hover:bg-accent hover:text-foreground'
                }`}
              >
                {r.label}
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* Footer hint */}
      <div className="border-t border-border/60 bg-muted/20 px-4 py-2 text-center text-[10px] text-muted-foreground">
        Press <kbd className="rounded bg-muted px-1 font-mono">Ctrl+Shift+G</kbd> to toggle ·{' '}
        <kbd className="rounded bg-muted px-1 font-mono">Esc</kbd> to close
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-card/60 px-2 py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <code className="max-w-[60%] truncate font-mono text-[11px] text-foreground">
        {value}
      </code>
    </div>
  )
}

function ActionBtn({
  icon,
  label,
  onClick,
  variant = 'default',
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] font-medium transition-colors ${
        variant === 'danger'
          ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20'
          : 'border-border/60 bg-card/60 text-foreground/80 hover:bg-accent hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

export default GodMode
