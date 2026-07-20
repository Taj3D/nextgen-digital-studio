'use client'

import * as React from 'react'
import Image from 'next/image'
import { Menu, Globe, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useLang, type Lang } from '@/components/site/language-provider'
import { ThemeToggle } from '@/components/site/theme-toggle'

type NavItem = {
  key: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { key: 'nav.services', href: '#services' },
  { key: 'nav.howItWorks', href: '#how' },
  { key: 'nav.pricing', href: '#pricing' },
  { key: 'nav.testimonials', href: '#testimonials' },
]

function smoothScrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function Logo({ onClick }: { onClick?: () => void }) {
  const { t } = useLang()
  return (
    <button
      onClick={() => {
        onClick?.()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      className="group flex items-center gap-2.5 outline-none"
      aria-label={t('brand.name')}
    >
      <Image
        src="/logo.jpg"
        alt="NextGen Digital Studio"
        width={40}
        height={40}
        className="h-10 w-10 rounded-xl object-cover shadow-glow transition-transform duration-300 group-hover:scale-105"
        priority
      />
      <span className="hidden text-base font-bold tracking-tight text-foreground sm:block">
        {t('brand.name')}
      </span>
    </button>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  const options: { code: Lang; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'bn', label: 'BN' },
  ]
  return (
    <div className="inline-flex items-center rounded-full border border-border/60 bg-background/40 p-0.5 backdrop-blur">
      <Globe className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-muted-foreground" />
      {options.map((opt) => {
        const active = lang === opt.code
        return (
          <button
            key={opt.code}
            onClick={() => setLang(opt.code)}
            aria-pressed={active}
            className={cn(
              'min-w-[40px] rounded-full px-2.5 py-1 text-xs font-semibold transition-all',
              active
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function DesktopNav() {
  const { t } = useLang()
  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => smoothScrollTo(item.href)}
          className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t(item.key)}
        </button>
      ))}
    </nav>
  )
}

function CtaButton({ onClick }: { onClick?: () => void }) {
  const { t } = useLang()
  return (
    <Button
      onClick={() => {
        onClick?.()
        smoothScrollTo('#lead-form')
      }}
      className="animate-pulse-glow h-10 rounded-full border-0 bg-gradient-to-r from-emerald-500 via-emerald-500 to-teal-500 px-5 text-sm font-semibold text-white shadow-md hover:from-emerald-400 hover:to-teal-400"
    >
      {t('nav.cta')}
    </Button>
  )
}

export function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-border/50 backdrop-blur-xl transition-all duration-300',
        scrolled
          ? 'bg-background/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)]'
          : 'bg-background/70',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />

        <DesktopNav />

        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle />
          <ThemeToggle />
          <CtaButton />

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="grid h-11 w-11 place-items-center rounded-lg border border-border/50 md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] max-w-[85vw] border-l border-border/60 bg-background p-0 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border/50 p-4">
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src="/logo.jpg"
                    alt="NextGen Digital Studio"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-xl object-cover"
                  />
                  <span className="text-base font-bold">{t('brand.name')}</span>
                </SheetTitle>
              </SheetHeader>

              <div className="custom-scrollbar flex max-h-[calc(100vh-180px)] flex-1 flex-col gap-1 overflow-y-auto p-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setOpen(false)
                      // wait for sheet close before smooth scroll
                      setTimeout(() => smoothScrollTo(item.href), 80)
                    }}
                    className="flex min-h-[48px] items-center rounded-lg px-3 text-left text-base font-medium text-foreground/90 transition-colors hover:bg-accent/60 hover:text-foreground"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>

              <div className="mt-auto border-t border-border/50 p-4">
                <CtaButton
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => smoothScrollTo('#lead-form'), 80)
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar
