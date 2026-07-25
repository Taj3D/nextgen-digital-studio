'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  PlayCircle,
  Play,
  User,
  Quote,
  FileText,
  Bot,
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

type VideoItem = {
  titleKey: string
  descKey: string
  duration: string
  icon: LucideIcon
}

const VIDEOS: VideoItem[] = [
  { titleKey: 'vid.founderTitle', descKey: 'vid.founderDesc', duration: '4:12', icon: User },
  { titleKey: 'vid.clientTitle', descKey: 'vid.clientDesc', duration: '3:45', icon: Quote },
  { titleKey: 'vid.caseStudyTitle', descKey: 'vid.caseStudyDesc', duration: '8:30', icon: FileText },
  { titleKey: 'vid.aiDemoTitle', descKey: 'vid.aiDemoDesc', duration: '2:58', icon: Bot },
]

export function VideoLayer() {
  const { t, lang } = useLang()
  const isBn = lang === 'bn'

  // BN digit helper — converts ASCII digits to Bengali numerals.
  const bn = (s: string | number) =>
    isBn ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[+d]) : String(s)

  const comingSoon = isBn ? 'শীঘ্রই' : 'Coming soon'

  return (
    <SectionShell id="video-layer" className="relative" aria-label={t('aria.videoLayer')}>
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <PlayCircle className="h-4 w-4 shrink-0" />
          <span>{t('vid.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {t('vid.title')}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {t('vid.subtitle')}
        </p>
      </Reveal>

      {/* 2x2 video grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid sm:grid-cols-2 gap-6"
      >
        {VIDEOS.map((v, i) => {
          const Icon = v.icon
          return (
            <motion.div key={i} variants={staggerItem}>
              <Card className="group h-full overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow p-0 gap-0">
                {/* Thumbnail (16:9) */}
                <div className="relative aspect-video overflow-hidden gradient-brand-soft">
                  {/* subtle gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/20"
                    aria-hidden
                  />
                  {/* type + duration badge (top-left) */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-xs font-semibold text-foreground">
                    <Icon className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    {bn(v.duration)}
                  </div>
                  {/* coming soon badge (top-right) */}
                  <div className="absolute top-3 right-3 rounded-full bg-emerald-600/90 text-white px-2.5 py-1 text-xs font-semibold">
                    {comingSoon}
                  </div>
                  {/* play button */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-emerald-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Title + description */}
                <CardContent className="px-5 py-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {t(v.titleKey)}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {t(v.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default VideoLayer
