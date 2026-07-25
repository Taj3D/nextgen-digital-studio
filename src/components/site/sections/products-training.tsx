'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Wrench,
  Database,
  Frame,
  BookOpen,
  ArrowRight,
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

// Static product/training catalog — each card links to its dedicated page.
// Using static <Link> elements (server-rendered) so search engines can crawl
// these routes directly from the homepage HTML.
type Product = {
  icon: LucideIcon
  href: string
  titleKey: string
  descKey: string
  badgeKey: string
}

const PRODUCTS: Product[] = [
  {
    icon: GraduationCap,
    href: '/ai-training',
    titleKey: 'productsTraining.aiTraining.title',
    descKey: 'productsTraining.aiTraining.desc',
    badgeKey: 'productsTraining.aiTraining.badge',
  },
  {
    icon: Wrench,
    href: '/cnc-training',
    titleKey: 'productsTraining.cncTraining.title',
    descKey: 'productsTraining.cncTraining.desc',
    badgeKey: 'productsTraining.cncTraining.badge',
  },
  {
    icon: Database,
    href: '/cnc-design',
    titleKey: 'productsTraining.cncDesign.title',
    descKey: 'productsTraining.cncDesign.desc',
    badgeKey: 'productsTraining.cncDesign.badge',
  },
  {
    icon: Frame,
    href: '/3d-portrait',
    titleKey: 'productsTraining.3dPortrait.title',
    descKey: 'productsTraining.3dPortrait.desc',
    badgeKey: 'productsTraining.3dPortrait.badge',
  },
  {
    icon: BookOpen,
    href: '/pdf-books',
    titleKey: 'productsTraining.pdfBooks.title',
    descKey: 'productsTraining.pdfBooks.desc',
    badgeKey: 'productsTraining.pdfBooks.badge',
  },
]

export function ProductsTraining() {
  const { t } = useLang()

  return (
    <SectionShell
      id="products-training"
      className="relative"
      aria-label={t('aria.productsTraining')}
    >
      {/* Decorative background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-500 sm:text-sm">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span>{t('productsTraining.eyebrow')}</span>
        </div>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          {t('productsTraining.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t('productsTraining.subtitle')}
        </p>
      </Reveal>

      {/* Product cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PRODUCTS.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div key={p.href} variants={staggerItem}>
              <Link
                href={p.href}
                className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
                aria-label={t(p.titleKey)}
              >
                <Card className="relative h-full overflow-hidden bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-glow">
                  <CardContent className="flex h-full flex-col gap-4 px-6 py-6">
                    {/* Top row: icon + badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-brand-soft text-emerald-500 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                        {t(p.badgeKey)}
                      </span>
                    </div>

                    {/* Title + desc */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {t(p.titleKey)}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {t(p.descKey)}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-500">
                      {t('productsTraining.learnMore')}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>

                    {/* Decorative hover line at bottom */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 gradient-brand transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionShell>
  )
}

export default ProductsTraining
