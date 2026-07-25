'use client'

import * as React from 'react'
import { ShieldCheck, Clock, Users, Unlock } from 'lucide-react'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'

export function GuaranteeSection() {
  const { t } = useLang()

  const badges = [
    { key: 'guarantee.badge1', Icon: ShieldCheck },
    { key: 'guarantee.badge2', Icon: Clock },
    { key: 'guarantee.badge3', Icon: Users },
    { key: 'guarantee.badge4', Icon: Unlock },
  ] as const

  return (
    <SectionShell id="guarantee" aria-label={t('aria.guarantee')}>
      <Reveal>
        <div className="rounded-3xl gradient-brand-soft border border-emerald-500/20 p-8 sm:p-12">
          <div className="flex flex-col items-center text-center gap-5">
            <ShieldCheck className="h-16 w-16 text-emerald-500" aria-hidden />
            <Eyebrow>{t('guarantee.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text max-w-3xl">
              {t('guarantee.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('guarantee.body')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8 w-full">
              {badges.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm font-semibold text-foreground justify-center"
                >
                  <Icon className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default GuaranteeSection
