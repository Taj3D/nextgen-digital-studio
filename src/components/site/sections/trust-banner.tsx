'use client'

import * as React from 'react'
import { Building2, Layers, Star, ShieldCheck, Lock, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

const bn = (s: string | number, isBn: boolean) =>
  isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

type Chip = { icon: LucideIcon; key: string }

const CHIPS: Chip[] = [
  { icon: Building2, key: 'trustBanner.chip1' },
  { icon: Layers, key: 'trustBanner.chip2' },
  { icon: Star, key: 'trustBanner.chip3' },
  { icon: ShieldCheck, key: 'trustBanner.chip4' },
  { icon: Lock, key: 'trustBanner.chip5' },
]

export function TrustBanner() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  return (
    <section
      id="trust-banner"
      aria-label={t('aria.trustSignals')}
      className="relative border-y border-border bg-muted/40 py-6"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <ul
            role="list"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8 md:gap-x-10"
          >
            {CHIPS.map((chip, i) => {
              const Icon = chip.icon
              return (
                <React.Fragment key={chip.key}>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
                    <span className="font-medium">{bn(t(chip.key), isBn)}</span>
                  </li>
                  {/* Subtle divider between chips — hidden on mobile wrap */}
                  {i < CHIPS.length - 1 && (
                    <li
                      aria-hidden
                      className="hidden h-4 w-px bg-border sm:block"
                    />
                  )}
                </React.Fragment>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default TrustBanner
