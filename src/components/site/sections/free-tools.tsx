'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal, Eyebrow } from "../reveal"
import {
  Download, FileText, MessagesSquare, BookOpen, Filter, Calculator,
  PhoneCall, Check, X, Loader2, FileCheck, ArrowRight, Sparkles,
  type LucideIcon,
} from "lucide-react"
import { freeResources, type FreeResource } from "@/lib/site-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useLang } from "../language-provider"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  checklist: FileCheck,
  whatsapp: MessagesSquare,
  book: BookOpen,
  funnel: Filter,
  calculator: Calculator,
  phone: PhoneCall,
}

export function FreeTools() {
  const [active, setActive] = React.useState<FreeResource | null>(null)
  const { t, tr } = useLang()

  return (
    <section id="free-tools" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('freeTools.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('freeTools.title1')}{" "}
            <span className="text-gradient">{t('freeTools.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('freeTools.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {freeResources.map((r, i) => {
            const Icon = iconMap[r.icon] ?? FileText
            return (
              <Reveal key={r.id} delay={(i % 3) * 0.06}>
                <button
                  onClick={() => setActive(r)}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left card-hover hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-600/5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110", r.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {r.type}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold leading-tight group-hover:text-blue-600">
                    {tr(r.title)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {tr(r.desc)}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="text-[11px] text-muted-foreground">{r.size}</span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                      <Download className="h-3 w-3" /> {r.downloads} downloads
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Download free <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Download gate modal */}
      <AnimatePresence>
        {active && <DownloadModal resource={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function DownloadModal({ resource, onClose }: { resource: FreeResource; onClose: () => void }) {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null)
  const Icon = iconMap[resource.icon] ?? FileText
  const { tr } = useLang()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          resource: resource.title,
        }),
      })
      if (!res.ok) throw new Error("failed")
      const data = await res.json()
      setDownloadUrl(data.downloadUrl ?? null)
      setDone(true)
      toast.success("Download unlocked!", { description: "Click the button below to download your file." })
    } catch {
      toast.error("Could not submit", { description: "Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl"
      >
        <div className={cn("relative h-24 bg-gradient-to-br", resource.color)}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute -bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-card bg-white shadow-lg">
            <Icon className={cn("h-7 w-7 bg-gradient-to-br bg-clip-text text-transparent", resource.color)} />
          </div>
        </div>

        <div className="p-6 pt-8">
          {done ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Check className="h-8 w-8" strokeWidth={3} />
              </div>
              <h3 className="font-heading text-xl font-bold">Download unlocked!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your <span className="font-semibold text-foreground">{resource.title}</span> is ready.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your details have been saved to our system. A copy will also be sent to your email.
              </p>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
                >
                  <Download className="h-4 w-4" /> Download now
                </a>
              )}
              <Button onClick={onClose} variant="outline" className="mt-2 w-full rounded-xl">Done</Button>
            </div>
          ) : (
            <>
              <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
                {resource.type} · {resource.size}
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold leading-snug">{tr(resource.title)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{tr(resource.desc)}</p>

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600/5 px-3 py-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Enter your details — we&apos;ll email the file + automation tips.
              </div>

              <form onSubmit={onSubmit} className="mt-4 grid gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="d-name">Full name *</Label>
                  <Input id="d-name" name="name" required placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="d-email">Email *</Label>
                  <Input id="d-email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="d-phone">WhatsApp (optional)</Label>
                  <Input id="d-phone" name="phone" placeholder="+880 1XXX-XXXXXX" />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25"
                >
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Download className="mr-2 h-4 w-4" /> Download now</>
                  )}
                </Button>
                <p className="text-center text-[10px] text-muted-foreground">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
