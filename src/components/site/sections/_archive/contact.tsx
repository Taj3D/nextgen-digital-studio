'use client'

import * as React from "react"
import { Reveal, Eyebrow } from "../reveal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import { services, siteConfig } from "@/lib/site-data"
import { useLang } from "../language-provider"

const socials = [
  { name: "Facebook", icon: Facebook, href: siteConfig.facebook },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.linkedin },
  { name: "Instagram", icon: Instagram, href: siteConfig.instagram },
  { name: "YouTube", icon: Youtube, href: siteConfig.youtube },
]

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [service, setService] = React.useState("")
  const { t, tr } = useLang()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      company: fd.get("company"),
      service,
      message: fd.get("message"),
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("failed")
      setDone(true)
      toast.success("Message sent!", { description: "We'll get back to you within 24 hours." })
    } catch {
      toast.error("Could not send", { description: "Please try again or WhatsApp us." })
    } finally {
      setSubmitting(false)
    }
  }

  const contactItems = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us instantly",
      href: `https://wa.me/${siteConfig.whatsapp}`,
    },
    { icon: MapPin, label: "Office", value: siteConfig.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}` },
  ]

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('contact.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('contact.title1')}{" "}
            <span className="text-gradient">{t('contact.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          {/* Form */}
          <Reveal>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              {done ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="mb-4 h-14 w-14 text-emerald-500" />
                  <h3 className="font-heading text-2xl font-bold">{t('contact.messageSent')}</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {t('contact.sentDesc')}
                  </p>
                  <Button variant="outline" className="mt-5" onClick={() => setDone(false)}>
                    {t('contact.sendAnother')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="c-name">{t('contact.fullName')} *</Label>
                    <Input id="c-name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-phone">{t('contact.phone')} *</Label>
                    <Input id="c-phone" name="phone" required placeholder="+880 1XXX-XXXXXX" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-email">{t('contact.email')} *</Label>
                    <Input id="c-email" name="email" type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-company">{t('contact.company')}</Label>
                    <Input id="c-company" name="company" placeholder="Company name" />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label>{t('contact.serviceInterested')}</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('contact.selectService')} />
                      </SelectTrigger>
                      <SelectContent className="max-h-72">
                        {services.map((s) => (
                          <SelectItem key={s.slug} value={s.title}>
                            {tr(s.title)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="c-message">{t('contact.message')} *</Label>
                    <Textarea
                      id="c-message"
                      name="message"
                      required
                      rows={4}
                      placeholder={t('contact.tellAboutProject')}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.01]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('contact.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> {t('contact.sendMessage')}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info + map */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {contactItems.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-blue-600/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {tr(c.label)}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{tr(c.value)}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                <iframe
                  title="NextGen Digital Studio location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&output=embed`}
                  className="h-56 w-full grayscale-[0.2]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Socials */}
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4">
                <p className="text-sm font-semibold">{t('contact.followWork')}</p>
                <div className="flex gap-2">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
