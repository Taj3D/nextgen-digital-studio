'use client'

import * as React from 'react'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { LanguageToggle } from './language-toggle'
import { useLang } from './language-provider'
import { Button } from '@/components/ui/button'
import { CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Compact top bar for landing pages.
 * Shows: Logo, theme toggle, language toggle, Book button (scrolls to lead form).
 */
export function TopBar({ className }: { className?: string }) {
  const { t } = useLang()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => {
    // Try multiple possible form section IDs used across landing pages
    const ids = ['order', 'order-form', 'lead-form', 'contact', 'registration', 'register']
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    // Fallback: find the last form element on the page
    const forms = document.querySelectorAll('form')
    if (forms.length > 0) {
      const lastForm = forms[forms.length - 1]
      lastForm.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    // Last resort: scroll to bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo href="/" className="shrink-0" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageToggle className="inline-flex sm:hidden" compact />
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button
            type="button"
            onClick={scrollToForm}
            className="h-9 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3 text-xs font-semibold shadow-md shadow-blue-600/20 transition-transform hover:scale-[1.02] sm:px-4 sm:text-sm"
          >
            <CalendarClock className="mr-1.5 h-3.5 w-3.5" />
            <span className="hidden xs:inline sm:inline">
              {t('cta.bookCall')}
            </span>
            <span className="xs:hidden sm:hidden sr-only">Book</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
