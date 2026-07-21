'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Globe, ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLang, type Lang } from '@/components/site/language-provider'
import { ThemeToggle } from '@/components/site/theme-toggle'

type NavItem = {
  key: string
  href: string
}

// Anchor links point to homepage sections (`/#services`, `/#how`, etc.) so they
// work from any route. On the homepage we smooth-scroll; on other routes we
// navigate to the homepage, which then scrolls to the anchor automatically.
const NAV_ITEMS: NavItem[] = [
  { key: 'nav.services', href: '/#services' },
  { key: 'nav.howItWorks', href: '/#how' },
  { key: 'nav.pricing', href: '/#pricing' },
  { key: 'nav.testimonials', href: '/#testimonials' },
]

// Full-route pages accessible from the "More" dropdown — these are the
// orphan pages that were previously only reachable via direct URL.
const MORE_ITEMS: NavItem[] = [
  { key: 'nav.more.founder', href: '/founder' },
  { key: 'nav.more.3dPortrait', href: '/3d-portrait' },
  { key: 'nav.more.cncDesign', href: '/cnc-design' },
  { key: 'nav.more.aiTraining', href: '/ai-training' },
  { key: 'nav.more.cncTraining', href: '/cnc-training' },
  { key: 'nav.more.pdfBooks', href: '/pdf-books' },
]

// Anchor links point to homepage sections (`/#services`, `/#how`, etc.) so they
// work from any route. On the homepage we smooth-scroll; on other routes we
// navigate to the homepage with a full page load via window.location.assign()
// which reliably handles hash navigation across routes. Next.js router.push
// with a hash from a different path was unreliable in App Router.
function useAnchorNav() {
  return React.useCallback((href: string) => {
    const isHome = window.location.pathname === '/'
    if (isHome) {
      const id = href.replace('/#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    // Not on homepage (or anchor not found) — full navigation to homepage + hash.
    // window.location.assign is used instead of router.push because App Router's
    // router.push does not reliably scroll to hash anchors when navigating
    // between different routes.
    window.location.assign(href)
  }, [])
}

function Logo({ onClick }: { onClick?: () => void }) {
  const { t } = useLang()
  return (
    <button
      type="button"
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
      <span className="hidden font-display text-base font-bold tracking-tight text-foreground sm:block">
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
  const navTo = useAnchorNav()
  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          onClick={() => navTo(item.href)}
          className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t(item.key)}
        </button>
      ))}
      {/* More dropdown — links to orphan pages (founder, 3d-portrait, etc.) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('nav.more')}
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {MORE_ITEMS.map((item) => (
            <DropdownMenuItem key={item.key} asChild>
              <Link
                href={item.href}
                className="cursor-pointer text-sm text-foreground/90"
              >
                {t(item.key)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

function CtaButton({ onClick }: { onClick?: () => void }) {
  const { t } = useLang()
  const navTo = useAnchorNav()
  return (
    <Button
      onClick={() => {
        onClick?.()
        navTo('/#lead-form')
      }}
      className="animate-pulse-glow h-10 rounded-full border-0 bg-gradient-to-r from-emerald-500 via-emerald-500 to-teal-500 px-5 text-sm font-semibold text-white shadow-md hover:from-emerald-400 hover:to-teal-400"
    >
      {t('nav.cta')}
    </Button>
  )
}

export function Navbar() {
  const { t } = useLang()
  const navTo = useAnchorNav()
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
                aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={open}
                aria-controls="mobile-nav-sheet"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] max-w-[85vw] border-l border-border/60 bg-background p-0 sm:max-w-sm"
              id="mobile-nav-sheet"
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
                      // wait for sheet close before anchor navigation
                      setTimeout(() => navTo(item.href), 80)
                    }}
                    className="flex min-h-[48px] items-center rounded-lg px-3 text-left text-base font-medium text-foreground/90 transition-colors hover:bg-accent/60 hover:text-foreground"
                  >
                    {t(item.key)}
                  </button>
                ))}
                {/* More section — orphan pages */}
                <div className="mt-2 border-t border-border/50 pt-2">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t('nav.more')}
                  </p>
                  {MORE_ITEMS.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center rounded-lg px-3 text-left text-base font-medium text-foreground/90 transition-colors hover:bg-accent/60 hover:text-foreground"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-border/50 p-4">
                <CtaButton
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => navTo('/#lead-form'), 80)
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
