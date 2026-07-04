'use client'

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Facebook, Linkedin, Youtube, Github, Instagram } from "lucide-react"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { siteConfig, services, navMenu } from "@/lib/site-data"
import { useLang } from "./language-provider"

const socials = [
  { name: "Facebook", icon: Facebook, href: siteConfig.facebook },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.linkedin },
  { name: "Instagram", icon: Instagram, href: siteConfig.instagram },
  { name: "GitHub", icon: Github, href: siteConfig.github },
  { name: "YouTube", icon: Youtube, href: siteConfig.youtube },
]

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const { t, tr } = useLang()

  async function subscribe(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("failed")
      setDone(true)
      toast.success("Subscribed!", { description: "You're on the list for AI growth insights." })
      setEmail("")
    } catch {
      toast.error("Could not subscribe", { description: "Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      {/* Newsletter band */}
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-7 shadow-xl shadow-blue-600/20 sm:p-9 lg:grid-cols-2 lg:gap-10">
            <div className="text-white">
              <h3 className="font-heading text-2xl font-extrabold leading-tight sm:text-3xl">
                {t('footer.newsletterTitle')}
              </h3>
              <p className="mt-2 text-blue-50/90">
                {t('footer.newsletterDesc')}
              </p>
            </div>
            <div>
              {done ? (
                <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-4 text-white backdrop-blur">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <p className="text-sm font-medium">
                    {t('footer.subscribed')}
                  </p>
                </div>
              ) : (
                <form onSubmit={subscribe} className="flex flex-col gap-2.5 sm:flex-row">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    className="h-12 flex-1 border-white/30 bg-white/95 text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 shrink-0 bg-slate-900 px-6 font-semibold text-white hover:bg-slate-800"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                      <>
                        {t('cta.subscribe')} <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo href="/" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t('footer.aboutDesc')}
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4 text-blue-600" /> {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4 text-blue-600" /> {siteConfig.phone}
              </a>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-blue-600" /> {siteConfig.address}
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-blue-600/40 hover:bg-blue-600/10 hover:text-blue-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title={t('footer.services')} links={services.slice(0, 7).map((s) => ({ label: tr(s.title), href: "#services" }))} />
          <FooterCol title={t('footer.company')} links={navMenu.map((n) => ({ label: tr(n.label), href: n.href }))} />
          <FooterCol
            title={t('footer.industries')}
            links={[
              { label: tr("Real Estate"), href: "#industries" },
              { label: tr("Hospitals"), href: "#industries" },
              { label: tr("E-commerce"), href: "#industries" },
              { label: tr("Schools"), href: "#industries" },
              { label: tr("Agencies"), href: "#industries" },
              { label: tr("Corporate"), href: "#industries" },
            ]}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border/60">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            © {new Date().getFullYear()} {siteConfig.name}. {t('footer.allRights')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-blue-600">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms" className="transition-colors hover:text-blue-600">{t('footer.termsOfService')}</Link>
            <Link href="#faq" className="transition-colors hover:text-blue-600">FAQ</Link>
            <Link href="#careers" className="transition-colors hover:text-blue-600">Careers</Link>
            <Link href="/docs" className="transition-colors hover:text-blue-600">API Docs</Link>
            <Link href="/admin" className="transition-colors hover:text-blue-600">Staff</Link>
            <span className="flex items-center gap-1">
              {t('footer.madeIn')} <span className="font-semibold text-foreground">{t('footer.bangladesh')}</span> 🇧🇩
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
