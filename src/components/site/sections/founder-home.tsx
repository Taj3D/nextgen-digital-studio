'use client'

import * as React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Reveal, SectionShell } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

const CHIPS = [
  'founderHome.chip1',
  'founderHome.chip2',
  'founderHome.chip3',
  'founderHome.chip4',
] as const

export function FounderSection() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  const alt = isBn
    ? 'তাজ ভাই — NextGen Digital Studio-এর প্রতিষ্ঠাতা'
    : 'Taj Bhai — Founder of NextGen Digital Studio'

  return (
    <SectionShell
      id="founder"
      aria-label={t('aria.founder')}
      className="bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/10"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
        {/* LEFT — Founder photo */}
        <Reveal>
          <div className="relative mx-auto w-fit">
            <span
              aria-hidden
              className="absolute -left-4 -top-4 grid h-12 w-12 place-items-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              <Quote className="h-6 w-6" />
            </span>
            <Image
              src="/founder.png"
              alt={alt}
              width={320}
              height={320}
              className="rounded-3xl border-2 border-amber-500/30 shadow-xl mx-auto"
              priority={false}
            />
          </div>
        </Reveal>

        {/* RIGHT — Bio + quote + chips */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {t('founderHome.eyebrow')}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t('founderHome.title')}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('founderHome.bio1')}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('founderHome.bio2')}
            </p>

            <blockquote className="border-l-4 border-amber-500 pl-4 text-lg sm:text-xl font-medium italic text-foreground">
              &ldquo;{t('founderHome.quote')}&rdquo;
            </blockquote>

            <div className="flex flex-wrap gap-2 pt-1">
              {CHIPS.map((key) => (
                <span
                  key={key}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground"
                >
                  {t(key)}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default FounderSection
