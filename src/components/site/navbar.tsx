'use client'

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ArrowRight, Phone } from "lucide-react"
import { Logo } from "./logo"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { useLang } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { navMenu, siteConfig } from "@/lib/site-data"
import { useBooking } from "./booking-modal"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const { openWith } = useBooking()
  const { t, tr } = useLang()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5",
              scrolled
                ? "h-14 border border-border/60 bg-background/80 shadow-lg shadow-black/[0.03] backdrop-blur-xl"
                : "h-16 border border-transparent bg-transparent",
            )}
          >
            <Logo href="/" />

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
              {navMenu.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {tr(item.label)}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          openMenu === item.label && "rotate-180",
                        )}
                      />
                    )}
                  </Link>

                  {item.children && (
                    <AnimatePresence>
                      {openMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3"
                        >
                          <div className="overflow-hidden rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl">
                            <div className="grid grid-cols-2 gap-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group rounded-xl p-3 transition-colors hover:bg-muted"
                                >
                                  <div className="text-sm font-semibold text-foreground group-hover:text-blue-600">
                                    {tr(child.label)}
                                  </div>
                                  <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                                    {tr(child.desc)}
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <Link
                              href={item.href}
                              onClick={() => setOpenMenu(null)}
                              className="mt-1 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:from-blue-600/15 hover:to-cyan-500/15"
                            >
                              {t('cta.viewAllServices')} {tr(item.label).toLowerCase()}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground xl:flex"
              >
                <Phone className="h-3.5 w-3.5" />
                {siteConfig.phone}
              </a>
              <ThemeToggle />
              <LanguageToggle />
              <Button
                onClick={() => openWith()}
                className="hidden h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-semibold shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.03] sm:inline-flex"
              >
                {t('cta.bookCall')}
              </Button>
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
          <SheetHeader className="border-b border-border/60 px-5 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle asChild>
                <div><Logo href="/" /></div>
              </SheetTitle>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-1 px-3 py-4">
            {navMenu.map((item) => (
              <details key={item.label} className="group rounded-xl">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-foreground hover:bg-muted">
                  {tr(item.label)}
                  {item.children && (
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  )}
                </summary>
                {item.children && (
                  <div className="mt-1 mb-2 flex flex-col gap-0.5 pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {tr(c.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </details>
            ))}
          </div>
          <div className="mt-auto border-t border-border/60 px-5 py-5">
            <Button
              onClick={() => {
                setMobileOpen(false)
                openWith()
              }}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25"
            >
              {t('cta.bookCall')}
            </Button>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phone}
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
