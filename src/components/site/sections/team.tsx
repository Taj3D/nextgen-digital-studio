'use client'

import { Reveal, Eyebrow } from "../reveal"
import { teamMembers, siteConfig } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Eye, Heart, Linkedin, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const values = [
  {
    icon: Target,
    title: 'Mission',
    desc: 'To make enterprise-grade AI accessible to every Bangladeshi business — so they can compete and win in the AI era.',
  },
  {
    icon: Eye,
    title: 'Vision',
    desc: 'A Bangladesh where small businesses automate like global tech companies — faster, smarter, and 24/7.',
  },
  {
    icon: Heart,
    title: 'Values',
    desc: 'Radical transparency, measurable ROI, bilingual-first design, and genuine partnership over vendor relationships.',
  },
]

export function Team() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="team" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('team.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('team.title1')}{" "}
            <span className="text-gradient">{t('team.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('team.subtitle')}
          </p>
        </Reveal>

        {/* Values */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 card-hover hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-600/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-110">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold">{tr(v.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr(v.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Team grid */}
        <div className="mt-16">
          <Reveal className="mb-8 text-center">
            <h3 className="font-heading text-2xl font-bold sm:text-3xl">Meet the people behind the AI</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A focused team — no bloat, no handoffs, just specialists who ship.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((m, i) => (
              <Reveal key={m.initials} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card card-hover hover:border-blue-600/40 hover:shadow-xl hover:shadow-blue-600/5">
                  {/* Avatar area */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-blue-600/10 to-cyan-500/10">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-heading text-6xl font-extrabold text-gradient">
                          {m.initials}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                    {/* Hover social */}
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <a
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${m.name} on LinkedIn`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg transition-transform hover:scale-110"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading text-sm font-bold leading-tight">{tr(m.name)}</h4>
                      {i === 0 && <Sparkles className="h-3.5 w-3.5 text-blue-600" />}
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-blue-600">{tr(m.role)}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tr(m.bio)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-12 text-center">
          <Button
            onClick={() => openWith("Team section")}
            size="lg"
            className="h-13 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 text-[15px] font-semibold shadow-xl shadow-blue-600/25 transition-transform hover:scale-[1.02]"
          >
            Work with our team
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
