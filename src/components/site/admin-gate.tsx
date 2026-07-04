'use client'

import * as React from "react"
import { Lock, ArrowRight, Loader2 } from "lucide-react"

const STORAGE_KEY = 'nextgen-admin-auth'
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nextgen2025'

export function AdminGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved === 'authenticated') setAuthenticated(true)
    } catch {}
    setLoading(false)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError('')
      try { sessionStorage.setItem(STORAGE_KEY, 'authenticated') } catch {}
    } else {
      setError('ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (authenticated) {
    return <>{children}</>
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
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25">
              <Lock className="h-7 w-7" />
            </span>
            <h1 className="font-heading text-xl font-bold text-white">Admin Login</h1>
            <p className="mt-1 text-sm text-blue-100/60">NextGen Digital Studio · Lead Dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="পাসওয়ার্ড লিখুন"
                autoFocus
                className="h-12 w-full rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition-colors placeholder:text-blue-100/40 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
              {error && <p className="mt-2 text-xs font-medium text-rose-400">{error}</p>}
            </div>
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
            >
              লগইন করুন
              <ArrowRight className="h-4 w-4" />
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
