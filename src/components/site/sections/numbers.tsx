'use client'

import * as React from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  animate,
} from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang, type Lang } from '@/components/site/language-provider'

/** Convert ASCII digits 0-9 to Bengali digits ০-৯. Leaves the decimal dot intact. */
function toBnDigits(s: string): string {
  return s.replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
}

/** Convert Bengali digits back to ASCII for parsing. */
function toEnDigits(s: string): string {
  return s.replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)))
}

/** Parse a stat string like "৳4.2Cr+" or "৫০+" into {num, prefix, suffix}. */
function parseStatValue(raw: string): { num: number; prefix: string; suffix: string } | null {
  const normalized = toEnDigits(raw)
  const match = normalized.match(/[\d.]+/)
  if (!match) return null
  const numStr = match[0]
  const num = parseFloat(numStr)
  if (Number.isNaN(num)) return null
  const idx = normalized.indexOf(numStr)
  return {
    num,
    prefix: raw.slice(0, idx),
    suffix: raw.slice(idx + numStr.length),
  }
}

/** Count-up component that animates from 0 → target when scrolled into view. */
function Counter({ value, lang }: { value: string; lang: Lang }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const parsed = React.useMemo(() => parseStatValue(value), [value])
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = React.useState<string>(() => (parsed ? '0' : value))

  React.useEffect(() => {
    if (!inView || !parsed) return
    const isInt = Number.isInteger(parsed.num)
    const controls = animate(motionVal, parsed.num, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = isInt ? Math.round(v) : Math.round(v * 10) / 10
        let str = String(n)
        if (lang === 'bn') str = toBnDigits(str)
        setDisplay(str)
      },
    })
    return () => controls.stop()
  }, [inView, parsed, motionVal, lang])

  if (!parsed) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  )
}

const STATS = [
  { value: 'numbers.n1Value', label: 'numbers.n1Label' },
  { value: 'numbers.n2Value', label: 'numbers.n2Label' },
  { value: 'numbers.n3Value', label: 'numbers.n3Label' },
  { value: 'numbers.n4Value', label: 'numbers.n4Label' },
] as const

export function Numbers() {
  const { t, lang } = useLang()

  return (
    <SectionShell
      id="numbers"
      className="relative overflow-hidden bg-card"
    >
      {/* Dark grid + brand tint */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-0 gradient-brand-soft opacity-30" aria-hidden />

      <div className="relative">
        {/* Header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <BarChart3 className="h-4 w-4 shrink-0" />
            <span>{t('numbers.eyebrow')}</span>
          </div>
          <h2 className="mt-5 text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {t('numbers.title')}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            {t('numbers.subtitle')}
          </p>
        </Reveal>

        {/* Stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((s, i) => (
            <motion.div key={i} variants={staggerItem}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                <div
                  className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-2xl"
                  aria-hidden
                />
                <div className="relative gradient-text text-4xl lg:text-6xl font-bold leading-tight">
                  <Counter value={t(s.value)} lang={lang} />
                </div>
                <div className="relative mt-3 text-muted-foreground text-sm">
                  {t(s.label)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default Numbers
