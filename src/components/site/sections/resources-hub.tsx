'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Newspaper,
  BookOpen,
  FileText,
  ClipboardList,
  LayoutTemplate,
  ArrowUpRight,
  Download,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  Eyebrow,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type Resource = {
  icon: LucideIcon
  titleKey: string
  descKey: string
  coverClass: string
  actionKey: 'res.open' | 'res.download'
  href?: string
  external: boolean
  scrollTo?: string
}

const RESOURCES: Resource[] = [
  {
    icon: Newspaper,
    titleKey: 'res.blog',
    descKey: 'res.blogDesc',
    coverClass: 'gradient-brand-soft',
    actionKey: 'res.open',
    href: '/blog',
    external: false,
  },
  {
    icon: BookOpen,
    titleKey: 'res.guides',
    descKey: 'res.guidesDesc',
    coverClass: 'bg-emerald-500/10',
    actionKey: 'res.open',
    href: '/case-studies',
    external: false,
  },
  {
    icon: FileText,
    titleKey: 'res.whitepaper',
    descKey: 'res.whitepaperDesc',
    coverClass: 'bg-teal-500/10',
    actionKey: 'res.download',
    href: '/resources/ai-readiness-ebook.html',
    external: true,
  },
  {
    icon: ClipboardList,
    titleKey: 'res.playbook',
    descKey: 'res.playbookDesc',
    coverClass: 'bg-amber-500/10',
    actionKey: 'res.download',
    href: '/resources/funnel-swipe.html',
    external: true,
  },
  {
    icon: LayoutTemplate,
    titleKey: 'res.templates',
    descKey: 'res.templatesDesc',
    coverClass: 'gradient-brand-soft',
    actionKey: 'res.download',
    href: '/resources/whatsapp-templates.html',
    external: true,
  },
]

export function ResourcesHub() {
  const { t } = useLang()

  return (
    <SectionShell id="resources-hub" className="relative" aria-label={t('aria.resourcesHub')}>
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <Reveal>
          <Eyebrow>{t('res.eyebrow')}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('res.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('res.subtitle')}
          </p>
        </Reveal>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {RESOURCES.map((r) => {
          const Icon = r.icon
          const ActionIcon = r.actionKey === 'res.open' ? ArrowUpRight : Download
          return (
            <motion.div key={r.titleKey} variants={staggerItem} className="h-full">
              <Card className="group h-full overflow-hidden bg-card/60 backdrop-blur-sm border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow p-0 gap-0">
                {/* Cover strip */}
                <div
                  aria-hidden
                  className={`h-24 ${r.coverClass} grid place-items-center`}
                >
                  <Icon className="h-9 w-9 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <CardContent className="flex flex-col gap-3 p-5 flex-1">
                  <h3 className="text-base font-semibold text-foreground">{t(r.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {t(r.descKey)}
                  </p>
                  {r.href ? (
                    <a
                      href={r.href}
                      {...(r.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="inline-block w-fit mt-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-500/30 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                      >
                        {t(r.actionKey)}
                        <ActionIcon className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      onClick={() => r.scrollTo && scrollToId(r.scrollTo)}
                      variant="outline"
                      size="sm"
                      className="w-fit mt-1 border-emerald-500/30 text-foreground hover:bg-emerald-500/10 hover:text-foreground"
                    >
                      {t(r.actionKey)}
                      <ActionIcon className="h-4 w-4" />
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

export default ResourcesHub
