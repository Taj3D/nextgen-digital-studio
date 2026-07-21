'use client'

/**
 * StickyBookBar — a slim sticky CTA bar that slides up from the bottom of the
 * viewport after the user scrolls past the hero section (~600px) and hides
 * itself again when the lead-form section (#lead-form or #order) is visible
 * (so it doesn't compete with the inline form's own CTA).
 *
 * Behaviour:
 *   - Visible when window.scrollY > 600
 *   - Hidden when #lead-form OR #order is in viewport (IntersectionObserver)
 *   - Hidden when the booking modal is open (avoids double CTA stacking)
 *   - Skipped on /admin routes (would obscure the admin UI)
 *
 * Layout:
 *   - Mobile: full-width bar pinned to the bottom of the viewport with extra
 *     right-padding so the floating WhatsApp / scroll-to-top buttons (which
 *     sit at bottom-6 right-6, z-50) don't cover the CTA buttons.
 *   - Desktop: centered floating pill (max-w-2xl) with the same height.
 *   - Uses .safe-bottom (env(safe-area-inset-bottom)) for iOS notch support.
 *
 * The "Book Strategy Call" button triggers the shared BookingModal via the
 * useBookingModal() hook (rendered once by BookingModalProvider in layout.tsx).
 */

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, CalendarClock, ShieldCheck } from 'lucide-react'

import { useLang } from '@/components/site/language-provider'
import { useBookingModal } from '@/components/site/booking-modal-context'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-data'

const HIDE_AFTER_SCROLL = 600 // px — past the hero
const INTERSECTION_MARGIN = '0px 0px -10% 0px' // treat as "in view" if 10% visible

export function StickyBookBar() {
  const { t } = useLang()
  const { openBookingModal, isOpen: modalOpen } = useBookingModal()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // Skip on admin pages — the sticky bar would obscure admin tables.
    if (window.location.pathname.startsWith('/admin')) return

    let scrolledPast = false
    let leadFormVisible = false

    const update = () => {
      // Hide while the booking modal is open (avoids double-CTA stacking).
      setVisible(scrolledPast && !leadFormVisible && !modalOpen)
    }

    // --- 1. Scroll listener (cheap — toggles rarely; no rAF needed) ---
    const onScroll = () => {
      scrolledPast = window.scrollY > HIDE_AFTER_SCROLL
      update()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // --- 2. IntersectionObserver for #lead-form + #order + <footer> ---
    // Hides the bar near the lead form (its own CTA competes) and at the
    // page footer (where the bar would obscure footer content / contact info).
    const targets = ['#lead-form', '#order', 'footer']
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => !!el)

    let observer: IntersectionObserver | null = null
    if (targets.length > 0 && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          // If ANY target is intersecting, hide the sticky bar.
          leadFormVisible = entries.some((e) => e.isIntersecting)
          update()
        },
        { rootMargin: INTERSECTION_MARGIN, threshold: 0 },
      )
      targets.forEach((el) => observer!.observe(el))
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
    // Re-run when modalOpen changes so the bar re-shows after the modal closes.
  }, [modalOpen])

  const phoneHref = `tel:+${siteConfig.whatsapp}`
  const phoneDisplay = siteConfig.phoneDisplay

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-book-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          // Mobile: full-width bar at bottom with safe-area padding.
          // Desktop (sm+): centered floating pill.
          className="fixed inset-x-3 bottom-3 z-40 safe-bottom sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2"
          aria-label={t('stickyBookBar.ariaLabel')}
        >
          <div className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border/70 bg-background/95 p-2 pr-20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-lg sm:gap-3 sm:p-2.5 sm:pr-2.5">
            {/* CTA copy — hidden on the smallest screens to keep the bar compact */}
            <div className="hidden min-w-0 flex-1 flex-col sm:flex">
              <p className="truncate text-sm font-semibold text-foreground">
                {t('stickyBookBar.cta')}
              </p>
              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden />
                {t('stickyBookBar.sub')}
              </p>
            </div>

            {/* Mobile-only compact CTA (replaces the hidden text block above) */}
            <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground sm:hidden">
              {t('stickyBookBar.ctaShort')}
            </p>

            {/* Phone link — icon-only, accessible label */}
            <a
              href={phoneHref}
              aria-label={`${t('stickyBookBar.callUs')} ${phoneDisplay}`}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-card/60 text-foreground transition-colors hover:border-emerald-500/40 hover:text-emerald-500"
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>

            {/* Primary CTA — opens the booking modal */}
            <Button
              onClick={() => openBookingModal({ source: 'sticky_book_bar' })}
              className="gradient-brand animate-pulse-glow h-11 shrink-0 rounded-xl px-4 text-sm font-semibold text-white sm:px-5"
              aria-label={t('cta.bookCall')}
            >
              <CalendarClock className="h-4 w-4 sm:mr-1.5" aria-hidden />
              <span className="hidden sm:inline">{t('cta.bookCall')}</span>
              <span className="sm:hidden">{t('stickyBookBar.bookShort')}</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyBookBar
