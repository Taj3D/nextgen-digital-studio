'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Globe, Rocket, TrendingUp, ShieldCheck, Zap, Users, type LucideIcon } from "lucide-react"
import { whyChooseUs } from "@/lib/site-data"
import { useLang } from "../language-provider"

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  rocket: Rocket,
  trending: TrendingUp,
  shield: ShieldCheck,
  zap: Zap,
  users: Users,
}

export function WhyChooseUs() {
  const { t, tr } = useLang()
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: image / founder card */}
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-blue-600/15 to-cyan-500/15 blur-2xl" />
              <div className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-2xl">
                <img
                  src="/founder.png"
                  alt="Founder of NextGen Digital Studio"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-2 max-w-[16rem] rounded-2xl border border-border/60 bg-background/95 p-4 shadow-xl backdrop-blur sm:-right-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading text-lg font-extrabold leading-none text-gradient">
                      4.9/5
                    </p>
                    <p className="text-xs text-muted-foreground">120+ client reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: content */}
          <div>
            <Reveal>
              <Eyebrow>{t('why.eyebrow')}</Eyebrow>
              <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
                {t('why.title1')}{" "}
                <span className="text-gradient">{t('why.title2')}</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                {t('why.subtitle')}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item, i) => {
                const Icon = iconMap[item.icon] ?? Zap
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="group flex h-full gap-3.5 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-blue-600/30">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-bold">{tr(item.title)}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {tr(item.desc)}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
