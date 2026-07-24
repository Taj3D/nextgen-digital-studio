'use client'

import { Reveal, Eyebrow } from "../reveal"
import { useLang } from "../language-provider"
import { useBooking } from "../booking-modal"
import { Moon, Target, RefreshCw, Sun, ArrowRight } from "lucide-react"

export function AspirationalVision() {
  const { t } = useLang()
  const { openWith } = useBooking()

  const visions = [
    { icon: Moon, key: 'aspire.1' },
    { icon: Target, key: 'aspire.2' },
    { icon: RefreshCw, key: 'aspire.3' },
    { icon: Sun, key: 'aspire.4' },
    { icon: ArrowRight, key: 'aspire.5' },
  ]

  return (
    <section id="imagine" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 animate-blob rounded-full bg-blue-600/30 blur-[100px]" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 animate-blob rounded-full bg-cyan-500/20 blur-[100px] [animation-delay:-8s]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto border-white/20 bg-white/10 text-cyan-300">
            {t('aspire.eyebrow')}
          </Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('aspire.title1')}{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {t('aspire.title2')}
            </span>
          </h2>
          <p className="mt-5 text-lg text-blue-100/70">{t('aspire.subtitle')}</p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {visions.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.key} delay={i * 0.1}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors hover:bg-white/10">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
                    <span className="font-heading text-lg font-extrabold">{i + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-[15px] leading-relaxed text-blue-50/90 sm:text-base">{t(v.key)}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.3} className="mt-10 text-center">
          <p className="font-heading text-xl font-bold text-white sm:text-2xl">
            {t('aspire.thisIsNot')}
          </p>
          <button
            onClick={() => openWith('Aspirational → Strategy Call')}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-xl transition-transform hover:scale-[1.02]"
          >
            {t('aspire.makeItReal')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
