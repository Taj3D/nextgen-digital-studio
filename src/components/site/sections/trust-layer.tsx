'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Building2, BadgeCheck, Users, type LucideIcon } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  Eyebrow,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const TEAM_AVATARS = ['NG', 'AI', 'GR', 'OP']

const DOC_KEYS = ['trust2.tin', 'trust2.tradeLicense', 'trust2.bin', 'trust2.certs'] as const

export function TrustLayer() {
  const { t } = useLang()

  return (
    <SectionShell id="trust-layer" className="relative" aria-label={t('aria.trustLayer')}>
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('trust2.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('trust2.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('trust2.subtitle')}
          </p>
        </Reveal>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid lg:grid-cols-2 gap-8"
      >
        {/* LEFT — Office + Team */}
        <motion.div variants={staggerItem} className="flex flex-col gap-8">
          {/* Office card */}
          <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-border/60">
            <CardContent className="px-0 pt-0">
              {/* Office "photo" placeholder */}
              <div className="relative aspect-video w-full gradient-brand-soft grid place-items-center">
                <Building2 className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
              </div>
              {/* Caption strip */}
              <div className="px-6 pt-5 flex flex-col gap-1">
                <h3 className="text-base font-semibold text-foreground">
                  {t('trust2.officeTitle')}
                </h3>
                <p className="text-sm text-muted-foreground">{t('trust2.officeAddr')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Team card */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/60 hover:border-emerald-500/40 hover:shadow-glow transition-all duration-300">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-xl gradient-brand-soft text-emerald-500"
                >
                  <Users className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {t('trust2.teamTitle')}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('trust2.teamDesc')}
              </p>
              <div className="flex items-center -space-x-3 mt-1">
                {TEAM_AVATARS.map((init) => (
                  <Avatar
                    key={init}
                    className="h-10 w-10 border-2 border-background ring-1 ring-emerald-500/20"
                  >
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                      {init}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT — Documents + Map */}
        <motion.div variants={staggerItem} className="flex flex-col gap-8">
          {/* Documents card */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/60 hover:border-emerald-500/40 hover:shadow-glow transition-all duration-300">
            <CardContent className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-foreground">
                {t('trust2.docsTitle')}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {DOC_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2.5 text-sm text-foreground"
                  >
                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{t(key)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map card */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/60 overflow-hidden">
            <CardContent className="flex flex-col gap-4">
              <h3 className="text-base font-semibold text-foreground">{t('trust2.mapTitle')}</h3>
              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  src="https://www.google.com/maps?q=Jessore,Bangladesh&output=embed"
                  className="w-full h-48 rounded-xl border-0"
                  loading="lazy"
                  title={t('trust2.mapTitle')}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}

export default TrustLayer
