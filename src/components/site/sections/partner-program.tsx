'use client'

import { Reveal, Eyebrow } from "../reveal"
import { Users, DollarSign, TrendingUp, Shield, ArrowRight, Gift } from "lucide-react"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Referrer",
    commission: "10%",
    desc: "Refer a client, earn 10% recurring commission for 12 months.",
    perks: ["Personal referral link", "Monthly payouts", "Dashboard access"],
    icon: Users,
  },
  {
    name: "Partner",
    commission: "20%",
    desc: "For agencies reselling our AI services under white-label.",
    perks: ["White-label AI agents", "Priority support", "Co-marketing kit", "Dedicated manager"],
    icon: DollarSign,
    popular: true,
  },
  {
    name: "Strategic",
    commission: "Custom",
    desc: "For large networks & consultatives moving high volume.",
    perks: ["Custom revenue share", "Joint ventures", "Exclusive territory", "Quarterly strategy"],
    icon: TrendingUp,
  },
]

export function PartnerProgram() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  return (
    <section id="partner" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mx-auto">{t('partner.eyebrow')}</Eyebrow>
          <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {t('partner.title1')}{" "}
            <span className="text-gradient">{t('partner.title2')}</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {t('partner.subtitle')}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div className={`group relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 ${
                tier.popular
                  ? "border-blue-600/40 bg-gradient-to-b from-blue-600/[0.06] to-cyan-500/[0.03] shadow-xl shadow-blue-600/10 lg:-mt-4"
                  : "border-border/60 bg-card hover:border-blue-600/30"
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                      <Gift className="h-3 w-3" /> Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25 transition-transform group-hover:scale-110">
                  <tier.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold">{tr(tier.name)}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{tr(tier.desc)}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-heading text-4xl font-extrabold text-gradient">{tier.commission}</span>
                  <span className="mb-1.5 text-sm text-muted-foreground">{t('partner.commission')}</span>
                </div>
                <ul className="mt-6 grid gap-2.5 border-t border-border/60 pt-6">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <Shield className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{tr(p)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openWith(`Partner Program: ${tier.name}`)}
                  className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    tier.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  Apply as {tr(tier.name)}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Already referring? Track your earnings in real-time.{" "}
            <button
              onClick={() => openWith("Partner — track earnings")}
              className="font-semibold text-blue-600 underline-offset-4 hover:underline"
            >
              {t('partner.getDashboard')} →
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
