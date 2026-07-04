'use client'

import { Reveal } from "../reveal"
import { ArrowRight, CalendarCheck, ShieldCheck } from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"

export function CtaBand() {
  const { openWith } = useBooking()
  const { t } = useLang()
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 px-6 py-12 shadow-2xl shadow-blue-600/30 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  {t('ctaBand.title')}
                </h2>
                <p className="mt-4 text-lg text-blue-50/90">
                  {t('ctaBand.subtitle')}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-blue-50/90 lg:justify-start">
                  <span className="flex items-center gap-1.5">
                    <CalendarCheck className="h-4 w-4" /> {t('ctaBand.freeCall')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" /> {t('ctaBand.noCommitment')}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Button
                  onClick={() => openWith()}
                  size="lg"
                  className="h-14 rounded-xl bg-white px-8 text-base font-bold text-blue-700 shadow-xl transition-transform hover:scale-[1.03]"
                >
                  Book Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-center text-xs text-blue-50/80">
                  {t('ctaBand.repliesWithin')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
