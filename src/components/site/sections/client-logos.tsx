'use client'

import { clientLogos } from "@/lib/site-data"
import { useLang } from "../language-provider"

export function ClientLogos() {
  const logos = [...clientLogos, ...clientLogos]
  const { t, tr } = useLang()
  return (
    <section className="border-y border-border/40 bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t('hero.trustedBy')}
        </p>
        <div className="mask-fade-x relative overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-16 pr-16">
            {logos.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/15 to-cyan-500/15 text-[11px] font-extrabold text-blue-600 transition-all group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white">
                  {name.charAt(0)}
                </span>
                <span className="font-heading text-lg font-bold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
                  {tr(name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
