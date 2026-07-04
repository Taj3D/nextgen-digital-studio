'use client'

import { Reveal, Eyebrow } from "../reveal"
import { processSteps } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('howItWorks.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('howItWorks.title1')}{" "}
            <span className="text-gradient">{t('howItWorks.title2')}</span>{" "}
            {t('howItWorks.title3')}
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <div className="grid gap-8 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="relative text-center lg:text-left">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 font-heading text-lg font-extrabold text-white shadow-xl shadow-blue-600/25 lg:mx-0">
                    {s.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold">{tr(s.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tr(s.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <Button
            onClick={() => openWith()}
            size="lg"
            className="h-13 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 text-[15px] font-semibold shadow-xl shadow-blue-600/25 transition-transform hover:scale-[1.02]"
          >
            Start with a free strategy call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
