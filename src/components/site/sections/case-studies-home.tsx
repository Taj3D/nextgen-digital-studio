'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { caseStudies } from '@/lib/site-data'

export function CaseStudiesPreview() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  const items = caseStudies.slice(0, 4)

  return (
    <SectionShell id="case-studies" aria-label={t('aria.caseStudies')}>
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('caseStudiesHome.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('caseStudiesHome.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('caseStudiesHome.subtitle')}
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 0.08}>
            <Link
              href={`/case-studies/${cs.slug}`}
              className="group block h-full rounded-2xl border border-border/60 bg-card p-6 hover:border-emerald-500/40 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                    {isBn ? cs.industryBn : cs.industry}
                  </span>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{isBn ? cs.clientBn : cs.client}</div>
                  <h3 className="mt-1 text-base font-semibold text-foreground/90 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isBn ? cs.titleBn : cs.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {isBn ? cs.summaryBn : cs.summary}
                </p>
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {cs.metrics.slice(0, 3).map((m, j) => (
                    <div
                      key={j}
                      className="rounded-lg bg-muted/50 p-2 text-center"
                    >
                      <div className="text-sm font-bold gradient-text">{isBn ? m.valueBn : m.value}</div>
                      <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {isBn ? m.labelBn : m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {t('caseStudiesHome.resultBadge')}: {isBn ? cs.metrics[0]?.valueBn : cs.metrics[0]?.value}
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="flex justify-center mt-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-6 py-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
          >
            {t('caseStudiesHome.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </SectionShell>
  )
}

export default CaseStudiesPreview
