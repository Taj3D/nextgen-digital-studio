'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Gauge,
  Headphones,
  DatabaseBackup,
  CheckCircle2,
  BadgeCheck,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'

type Pillar = {
  icon: LucideIcon
  titleKey: string
  descKey: string
}

const PILLARS: Pillar[] = [
  { icon: ShieldCheck, titleKey: 'ut.security', descKey: 'ut.securityDesc' },
  { icon: Lock, titleKey: 'ut.privacy', descKey: 'ut.privacyDesc' },
  { icon: FileCheck, titleKey: 'ut.compliance', descKey: 'ut.complianceDesc' },
  { icon: Gauge, titleKey: 'ut.sla', descKey: 'ut.slaDesc' },
  { icon: Headphones, titleKey: 'ut.support', descKey: 'ut.supportDesc' },
  { icon: DatabaseBackup, titleKey: 'ut.data', descKey: 'ut.dataDesc' },
]

type Badge = {
  icon: LucideIcon
  labelEn: string
  labelBn: string
}

const BADGES: Badge[] = [
  { icon: ShieldCheck, labelEn: 'ISO-aligned', labelBn: 'ISO-অনুগামী' },
  { icon: Lock, labelEn: 'SSL Encrypted', labelBn: 'SSL এনক্রিপ্টেড' },
  { icon: Gauge, labelEn: '99.9% SLA', labelBn: '৯৯.৯% SLA' },
  { icon: CheckCircle2, labelEn: 'GDPR-aware', labelBn: 'GDPR-সচেতন' },
]

export function UltimateTrust() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'
  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d])
      : String(s)

  return (
    <SectionShell
      id="ultimate-trust"
      className="relative"
      aria-label={t('aria.ultimateTrust')}
    >
      {/* Header — centered */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <BadgeCheck className="h-4 w-4 shrink-0" />
          <span>{t('ut.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('ut.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {t('ut.subtitle')}
        </p>
      </Reveal>

      {/* Badges strip */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {BADGES.map((b, i) => {
            const Icon = b.icon
            // bn() is a no-op when lang === 'en'; when lang === 'bn' it
            // converts any embedded ASCII digits to Bengali digits. The BN
            // labels above already ship with Bengali digits, so this is
            // idempotent — but it also future-proofs against accidental
            // ASCII digits in labelBn strings.
            const text = bn(isBn ? b.labelBn : b.labelEn)
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {text}
              </span>
            )
          })}
        </div>
      </Reveal>

      {/* 6 trust pillars grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PILLARS.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div key={i} variants={staggerItem}>
              <Card className="group h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                <CardContent className="flex flex-col gap-4 p-6">
                  {/* Icon */}
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-soft text-emerald-500 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {t(p.titleKey)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {t(p.descKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default UltimateTrust
