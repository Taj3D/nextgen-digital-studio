'use client'

import { Reveal } from "../reveal"
import { ShieldCheck, Unlock, Lock, MapPin } from "lucide-react"
import { guarantees } from "@/lib/site-data"
import { useLang } from "../language-provider"

const icons = [ShieldCheck, Unlock, Lock, MapPin]

export function Guarantees() {
  const { t, tr } = useLang()
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600/[0.04] to-cyan-500/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t('guarantees.eyebrow')}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((g, i) => {
                const Icon = icons[i] ?? ShieldCheck
                return (
                  <div key={g.title} className="group flex gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 text-blue-600 transition-all group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold leading-tight">{tr(g.title)}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tr(g.desc)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
