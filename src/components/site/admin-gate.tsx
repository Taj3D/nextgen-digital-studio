'use client'

import * as React from "react"
import Image from "next/image"
import { ArrowRight, Loader2, LogOut } from "lucide-react"

const STORAGE_KEY = 'nextgen-admin-auth'

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [submitting, setSubmitting] = React.useState(false)

  // Check existing session on mount so that refreshing the page does not log
  // the operator out. The httpOnly cookie is sent automatically by the browser.
  React.useEffect(() => {
    let cancelled = false
    fetch('/api/auth/login', { method: 'GET' })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.authenticated) {
          setAuthenticated(true)
          try { sessionStorage.setItem(STORAGE_KEY, '1') } catch {}
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setAuthenticated(true)
        setPassword('')
        try { sessionStorage.setItem(STORAGE_KEY, '1') } catch {}
      } else {
        setError(typeof data.error === 'string' ? data.error : 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।')
      }
    } catch {
      setError('নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogout() {
    try { await fetch('/api/auth/login', { method: 'DELETE' }) } catch {}
    try { sessionStorage.removeItem(STORAGE_KEY) } catch {}
    setAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (authenticated) {
    return (
      <>
        {children}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 animate-blob rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 animate-blob rounded-full bg-cyan-500/20 blur-[100px] [animation-delay:-8s]" />
      </div>
      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="mb-6 flex flex-col items-center text-center">
            <Image src="/logo.jpg" alt="NextGen Digital Studio" width={56} height={56} className="mb-3 h-14 w-14 rounded-2xl object-cover shadow-lg" />
            <h1 className="font-heading text-xl font-bold text-white">Admin Login</h1>
            <p className="mt-1 text-sm text-blue-100/60">NextGen Digital Studio · Lead Dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-xs font-medium text-blue-100/80">
                পাসওয়ার্ড / Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="পাসওয়ার্ড লিখুন"
                autoComplete="current-password"
                autoFocus
                aria-describedby={error ? 'admin-error' : undefined}
                aria-invalid={error ? 'true' : 'false'}
                className="h-12 w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition-colors placeholder:text-blue-100/40 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
              {error && (
                <p id="admin-error" role="alert" className="mt-2 text-xs font-medium text-rose-400">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  লগইন করুন
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <p className="mt-5 text-center text-[11px] text-blue-100/40">
            শুধু অনুমোদিত কর্মীদের জন্য। অননুমোদিত প্রবেশ নিষিদ্ধ।
          </p>
        </div>
        <div className="mt-4 text-center">
          <a href="/" className="text-xs text-blue-100/40 hover:text-blue-100/70">
            ← হোমে ফিরুন
          </a>
        </div>
      </div>
    </div>
  )
}
