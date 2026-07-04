'use client'

import { Reveal, Eyebrow } from "../reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { MessageCircleQuestion, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Faq() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{t('faq.eyebrow')}</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.5rem]">
              {t('faq.title1')} <br />
              <span className="text-gradient">{t('faq.title2')}</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              {t('faq.subtitle')}
            </p>
            <div className="mt-7 rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  <MessageCircleQuestion className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold">Still have questions?</p>
                  <p className="text-xs text-muted-foreground">Get a free 30-min consultation.</p>
                </div>
              </div>
              <Button
                onClick={() => openWith("FAQ question")}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold shadow-lg shadow-blue-600/25"
              >
                Ask an expert
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border/60 bg-card px-5 data-[state=open]:border-blue-600/30 data-[state=open]:shadow-lg data-[state=open]:shadow-blue-600/5"
                >
                  <AccordionTrigger className="text-left font-heading text-[15px] font-bold hover:no-underline">
                    {tr(f.q)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {tr(f.a)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
