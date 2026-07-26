'use client'

/**
 * StickyCtaBar — a slim sticky conversion bar pinned to the bottom of the
 * viewport. Slides up from below once the user scrolls past the hero section
 * (~700px) and slides back down out of view when they return above that point.
 *
 * Layout:
 *   - `fixed bottom-0 left-0 right-0 z-40` full-width bar.
 *   - `h-14 sm:h-16` slim height, `bg-background/95 backdrop-blur border-t
 *     border-border shadow-lg`.
 *   - Inner content `max-w-7xl mx-auto` flex row: left tagline (sm+) + right
 *     CTA button cluster (primary + 2 outline CTAs revealed at sm/md).
 *   - `pr-20 sm:pr-24` right padding keeps the CTA buttons clear of the
 *     FloatingButtons cluster (WhatsApp + scroll-top at bottom-6 right-6,
 *     z-50) so nothing sits underneath the WhatsApp button.
 *   - `.safe-bottom` for iOS safe-area inset.
 *
 * CTAs:
 *   1. "Book Free Call"   — gradient-brand primary, scrolls to #lead-form
 *   2. "Watch Demo"       — outline, scrolls to #ai-demo (sm+ only)
 *   3. "Calculate ROI"    — outline emerald, scrolls to #roi-calculator (md+)
 *
 * Animation: framer-motion slide (y: 100 → 0 when visible, back to 100 hidden).
 *
 * Color palette: emerald / teal / amber / gold ONLY. Bilingual via useLang.
 */

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarClock, Play, Calculator } from 'lucide-react'

import { useLang } from '@/components/site/language-provider'
import { Button } from '@/components/ui/button'

const REVEAL_AT_SCROLL = 700 // px — past the hero

function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function StickyCtaBar() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  const [mounted, setMounted] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  // Avoid SSR/client mismatch — only reveal after mount.
  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    // Skip on admin pages — the sticky bar would obscure admin tables.
    if (window.location.pathname.startsWith('/admin')) return

    const onScroll = () => {
      setVisible(window.scrollY > REVEAL_AT_SCROLL)
    }
    onScroll() // initialize for the current scroll position
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mounted])

  return (
    <AnimatePresence>
      {mounted && visible && (
        <motion.div
          key="sticky-cta-bar"
          role="region"
          aria-label={isBn ? 'দ্রুত অ্যাকশন বার' : 'Quick actions bar'}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 safe-bottom border-t border-border bg-background/95 shadow-lg backdrop-blur"
        >
          {/* Slim bar — h-14 on mobile, h-16 on desktop.
              pr-20 sm:pr-24 keeps content clear of the FloatingButtons cluster
              (WhatsApp + scroll-top at bottom-6 right-6, z-50). */}
          <div className="mx-auto flex h-14 sm:h-16 w-full max-w-7xl items-center gap-2 px-4 pr-20 sm:gap-3 sm:px-6 sm:pr-24 lg:px-8">
            {/* LEFT: tagline — hidden on mobile, visible sm+ (flex-1 pushes
                the buttons to the right). On mobile, the button cluster uses
                ml-auto to right-align itself. */}
            <p className="hidden min-w-0 flex-1 truncate text-sm font-medium text-muted-foreground sm:block">
              {isBn ? 'গ্রোথ অটোমেট করতে প্রস্তুত?' : 'Ready to automate your growth?'}
            </p>

            {/* RIGHT: CTA button cluster */}
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              {/* 1. Book Free Call — primary (always visible) */}
              <Button
                type="button"
                onClick={() => scrollToId('lead-form')}
                className="gradient-brand animate-pulse-glow h-9 sm:h-10 shrink-0 rounded-md px-3 sm:px-4 text-sm font-semibold text-white hover:opacity-95"
                aria-label={isBn ? 'ফ্রি কল বুক করুন' : 'Book a free call'}
              >
                <CalendarClock className="h-4 w-4" />
                {isBn ? 'ফ্রি কল বুক' : 'Book Free Call'}
              </Button>

              {/* 2. Watch Demo — outline, sm+ only */}
              <Button
                type="button"
                variant="outline"
                onClick={() => scrollToId('ai-demo')}
                className="hidden h-9 sm:h-10 shrink-0 rounded-md px-3 sm:px-4 text-sm font-medium sm:flex"
                aria-label={isBn ? 'ডেমো দেখুন' : 'Watch demo'}
              >
                <Play className="h-4 w-4" />
                {isBn ? 'ডেমো দেখুন' : 'Watch Demo'}
              </Button>

              {/* 3. Calculate ROI — outline emerald, md+ only */}
              <Button
                type="button"
                variant="outline"
                onClick={() => scrollToId('roi-calculator')}
                className="hidden h-9 sm:h-10 shrink-0 rounded-md border-emerald-500/50 px-3 sm:px-4 text-sm font-medium text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 md:flex"
                aria-label={isBn ? 'ROI হিসাব করুন' : 'Calculate ROI'}
              >
                <Calculator className="h-4 w-4" />
                {isBn ? 'ROI হিসাব করুন' : 'Calculate ROI'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyCtaBar
