'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Award, BadgeCheck, Star, Newspaper } from "lucide-react"
import { awards, certifications } from "@/lib/site-data"
import { useLang } from "../language-provider"

export function Awards() {
  const { t, tr } = useLang()
  return (
    <section id="awards" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('awards.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('awards.title1')}{" "}
            <span className="text-gradient">{t('awards.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('awards.subtitle')}
          </p>
        </Reveal>

        {/* Awards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-center card-hover hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/25 transition-transform group-hover:scale-110">
                  <Award className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-base font-bold leading-tight">{tr(a.title)}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{tr(a.org)}</p>
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600">
                  <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                  {a.year}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications strip */}
        <Reveal delay={0.2} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-muted/40 to-background p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-center gap-2 text-center">
              <Newspaper className="h-4 w-4 text-blue-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t('awards.certifiedPartners')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.05}>
                  <div className="group flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card p-3 text-center transition-colors hover:border-blue-600/30">
                    <BadgeCheck className="h-7 w-7 text-blue-600 transition-transform group-hover:scale-110" />
                    <div>
                      <p className="text-[11px] font-bold leading-tight">{c.name}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
