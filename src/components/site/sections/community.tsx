'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Facebook, MessageCircle, Mail, Users, ArrowUpRight, type LucideIcon } from 'lucide-react'
import {
  Reveal,
  SectionShell,
  Eyebrow,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { waLink } from '@/lib/whatsapp'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Channel = {
  icon: LucideIcon
  titleKey: string
  descKey: string
  members: string
  href?: string
  scrollTo?: string
}

const CHANNELS: Channel[] = [
  {
    icon: Facebook,
    titleKey: 'comm.fb',
    descKey: 'comm.fbDesc',
    members: '12,000+ members',
    href: 'https://facebook.com/nextgendigitalstudio',
  },
  {
    icon: MessageCircle,
    titleKey: 'comm.wa',
    descKey: 'comm.waDesc',
    members: '3,400+ members',
    href: waLink(),
  },
  {
    icon: Mail,
    titleKey: 'comm.news',
    descKey: 'comm.newsDesc',
    members: '8,200+ subscribers',
    scrollTo: 'email-funnel',
  },
  {
    icon: Users,
    titleKey: 'comm.club',
    descKey: 'comm.clubDesc',
    members: '450+ founders',
    scrollTo: 'lead-form',
  },
]

export function Community() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  return (
    <SectionShell id="community" className="relative" aria-label={t('aria.community')}>
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('comm.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('comm.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('comm.subtitle')}
          </p>
        </Reveal>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {CHANNELS.map((c) => {
          const Icon = c.icon
          return (
            <motion.div key={c.titleKey} variants={staggerItem}>
              <Card className="group h-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                <CardContent className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 place-items-center rounded-xl gradient-brand-soft text-emerald-500 transition-transform duration-300 group-hover:scale-110"
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      {bn(c.members)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground">{t(c.titleKey)}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {t(c.descKey)}
                    </p>
                  </div>

                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-emerald-500/30 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                      >
                        {t('comm.join')}
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      onClick={() => c.scrollTo && scrollToId(c.scrollTo)}
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-500/30 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                    >
                      {t('comm.join')}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default Community
