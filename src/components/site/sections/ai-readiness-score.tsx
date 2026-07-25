'use client'

import * as React from 'react'
import { RefreshCw, ArrowRight, Sparkles } from 'lucide-react'
import { Reveal, SectionShell, Eyebrow } from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const QUESTION_KEYS = ['ars.q1', 'ars.q2', 'ars.q3', 'ars.q4', 'ars.q5', 'ars.q6'] as const
const OPTION_KEYS = ['ars.qOpt1', 'ars.qOpt2', 'ars.qOpt3', 'ars.qOpt4'] as const

export function AiReadinessScore() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  const [answers, setAnswers] = React.useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ])

  // BN digit helper — converts ASCII digits to Bengali numerals.
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  const answeredCount = answers.filter((a) => a !== null).length
  const hasAnyAnswer = answeredCount > 0

  // Score: sum of answers (each 0-3, max 18) scaled to 100.
  const rawSum = answers.reduce<number>((acc, a) => acc + (a ?? 0), 0)
  const score = Math.round((rawSum / (QUESTION_KEYS.length * 3)) * 100)

  // Verdict index based on score thresholds.
  const verdictIndex = (() => {
    if (score <= 20) return 0
    if (score <= 40) return 1
    if (score <= 60) return 2
    if (score <= 80) return 3
    return 4
  })()

  const setAnswer = (qIndex: number, optIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optIndex
      return next
    })
  }

  const reset = () => setAnswers([null, null, null, null, null, null])

  return (
    <SectionShell id="ai-readiness-score" className="relative" aria-label={t('aria.aiReadinessScore')}>
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('ars.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('ars.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('ars.subtitle')}
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* LEFT — Questions */}
        <Reveal>
          <Card className="p-6 sm:p-8 gap-5">
            <ol className="flex flex-col gap-6">
              {QUESTION_KEYS.map((qKey, qIdx) => (
                <li key={qKey} className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      {bn(qIdx + 1)}
                    </span>
                    <span className="text-sm font-medium text-foreground leading-relaxed">
                      {t(qKey)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pl-8">
                    {OPTION_KEYS.map((optKey, optIdx) => {
                      const selected = answers[qIdx] === optIdx
                      return (
                        <button
                          key={optKey}
                          type="button"
                          onClick={() => setAnswer(qIdx, optIdx)}
                          aria-pressed={selected}
                          className={`rounded-lg border px-3 py-2 text-xs text-left transition-colors ${
                            selected
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                              : 'border-border bg-card/60 hover:border-emerald-500/40 text-foreground'
                          }`}
                        >
                          {t(optKey)}
                        </button>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        {/* RIGHT — Score card */}
        <Reveal delay={0.1}>
          <div className="lg:sticky lg:top-6 rounded-2xl gradient-brand-soft border border-emerald-500/20 p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                {t('ars.scoreLabel')}
              </span>
            </div>

            {/* Big score */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold gradient-text leading-none">
                {bn(score)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {t('ars.scoreSuffix')}
              </span>
            </div>

            {/* Progress bar */}
            <Progress
              value={score}
              className="h-3 [&>div]:bg-emerald-500"
              aria-label={t('ars.scoreLabel')}
            />

            {/* Verdict or prompt */}
            {hasAnyAnswer ? (
              <div className="rounded-lg bg-background/70 border border-emerald-500/30 p-3 text-sm font-semibold text-foreground">
                {t(`ars.verdict${verdictIndex}`)}
              </div>
            ) : (
              <div className="rounded-lg bg-background/40 border border-border p-3 text-sm text-muted-foreground">
                {isBn
                  ? 'আপনার স্কোর দেখতে প্রশ্নগুলোর উত্তর দিন।'
                  : 'Answer the questions to see your score.'}
              </div>
            )}

            {/* Buttons */}
            {hasAnyAnswer ? (
              <div className="flex flex-col sm:flex-row gap-3 mt-1">
                <Button
                  onClick={() => scrollToId('lead-form')}
                  className="gradient-brand text-white flex-1"
                  size="lg"
                >
                  {t('ars.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={reset}
                  variant="ghost"
                  className="border border-border text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                  size="lg"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t('ars.retake')}
                </Button>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}

export default AiReadinessScore
