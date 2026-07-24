'use client'

import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"
import { AlertTriangle, Clock, TrendingDown, Users, Frown } from "lucide-react"

const problems = [
  {
    icon: Clock,
    title: "Slow lead response kills deals",
    desc: "78% of customers buy from the company that responds first. Manual replies mean lost revenue — every single hour.",
  },
  {
    icon: Users,
    title: "Repetitive tasks drain your team",
    desc: "Your staff wastes hours on follow-ups, data entry and FAQs instead of closing deals and serving customers.",
  },
  {
    icon: TrendingDown,
    title: "Leads slip through the cracks",
    desc: "Without automation, unqualified leads flood your pipeline while hot prospects go cold and untouched.",
  },
  {
    icon: Frown,
    title: "Customers expect instant answers",
    desc: "Today's customers want replies in seconds, not days. Slow communication damages trust and reputation.",
  },
]

export function ProblemStatement() {
  const { t, tr } = useLang()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('problem.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {t('problem.title1')}{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-rose-500">{t('problem.title2')}</span>
              <svg className="absolute -bottom-1 left-0 z-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9C50 3 150 3 198 9" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>{" "}
            {t('problem.title3')}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('problem.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 transition-transform group-hover:scale-110">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-bold">{tr(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tr(p.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 px-6 py-5 text-center">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              {t('problem.warning')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
