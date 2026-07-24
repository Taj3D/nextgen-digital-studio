'use client'

import { Reveal } from "../reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { pricingFaqs } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingFaq() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-3.5 py-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              {t('pricingFaq.eyebrow')}
            </span>
          </div>
          <h2 className="mt-5 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            {t('pricingFaq.title1')}{" "}
            <span className="text-gradient">{t('pricingFaq.title2')}</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('pricingFaq.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {pricingFaqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`p-item-${i}`}
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

        <Reveal delay={0.2} className="mt-8 text-center">
          <Button
            onClick={() => openWith("Pricing FAQ → call")}
            className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 font-semibold shadow-lg shadow-blue-600/25"
          >
            {t('pricingFaq.stillHaveQuestions')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
