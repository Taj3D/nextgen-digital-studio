'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Plane,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Scale,
  HardHat,
  Wheat,
  Cpu,
  Scissors,
  Home,
  Printer,
  PartyPopper,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  Reveal,
  SectionShell,
  Eyebrow,
  staggerContainer,
  staggerItem,
} from '@/components/site/reveal'
import { useLang } from '@/components/site/language-provider'
import { Card, CardContent } from '@/components/ui/card'

type Business = {
  Icon: LucideIcon
  name: string
  industryEn: string
  industryBn: string
}

const BUSINESSES: Business[] = [
  { Icon: Building2, name: 'PropTech BD', industryEn: 'Real Estate', industryBn: 'রিয়েল এস্টেট' },
  { Icon: HeartPulse, name: 'MediCare Plus', industryEn: 'Healthcare', industryBn: 'স্বাস্থ্যসেবা' },
  { Icon: GraduationCap, name: 'EduFirst School', industryEn: 'Education', industryBn: 'শিক্ষা' },
  { Icon: ShoppingCart, name: 'ShopSmart BD', industryEn: 'E-commerce', industryBn: 'ই-কমার্স' },
  { Icon: Plane, name: 'TravelGo BD', industryEn: 'Travel', industryBn: 'ভ্রমণ' },
  { Icon: UtensilsCrossed, name: 'Foodie Express', industryEn: 'Restaurant', industryBn: 'রেস্তোরাঁ' },
  { Icon: Car, name: 'AutoPro Motors', industryEn: 'Automotive', industryBn: 'অটোমোটিভ' },
  { Icon: Dumbbell, name: 'FitLife Gym', industryEn: 'Fitness', industryBn: 'ফিটনেস' },
  { Icon: Scale, name: 'LegalEdge', industryEn: 'Legal', industryBn: 'আইনি' },
  { Icon: HardHat, name: 'BuildRight Ltd', industryEn: 'Construction', industryBn: 'নির্মাণ' },
  { Icon: Wheat, name: 'AgroFresh', industryEn: 'Agriculture', industryBn: 'কৃষি' },
  { Icon: Cpu, name: 'TechNova Solutions', industryEn: 'IT Services', industryBn: 'আইটি সার্ভিস' },
  { Icon: Scissors, name: 'BeautyBox Salon', industryEn: 'Beauty', industryBn: 'সৌন্দর্য' },
  { Icon: Home, name: 'HomeComfort Realty', industryEn: 'Real Estate', industryBn: 'রিয়েল এস্টেট' },
  { Icon: Printer, name: 'PrintHub BD', industryEn: 'Printing', industryBn: 'প্রিন্টিং' },
  { Icon: PartyPopper, name: 'EventCraft BD', industryEn: 'Events', industryBn: 'ইভেন্ট' },
]

type Stat = {
  valueEn: string
  valueBn: string
  labelEn: string
  labelBn: string
}

const STATS: Stat[] = [
  { valueEn: '120+', valueBn: '১২০+', labelEn: 'Businesses Served', labelBn: 'ব্যবসা সেবা' },
  { valueEn: '8', valueBn: '৮', labelEn: 'Industries', labelBn: 'শিল্পখাত' },
  { valueEn: '15K+', valueBn: '১৫হাজার+', labelEn: 'Leads Generated', labelBn: 'লিড তৈরি' },
  { valueEn: '98%', valueBn: '৯৮%', labelEn: 'Retention Rate', labelBn: 'রিটেনশন রেট' },
]

export function ClientLogos() {
  const { lang } = useLang()
  const isBn = lang === 'bn'

  return (
    <SectionShell
      id="client-logos"
      className="relative"
      aria-label={isBn ? 'ক্লায়েন্ট লোগো' : 'Client logos'}
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <Eyebrow>
          <Users className="h-3.5 w-3.5 text-emerald-500" />
          {isBn ? '১২০+ ব্যবসার আস্থা' : 'Trusted by 120+ Businesses'}
        </Eyebrow>
        <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {isBn ? (
            <>
              বাংলাদেশের ব্যবসা বেছে নেয় <span className="gradient-text">NextGen</span>
            </>
          ) : (
            <>
              Bangladesh&apos;s Businesses Choose <span className="gradient-text">NextGen</span>
            </>
          )}
        </h2>
        <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
          {isBn
            ? 'রিয়েল এস্টেট থেকে হাসপাতাল, স্কুল থেকে ই-কমার্স — প্রতিটি খাতে গ্রোথ অটোমেট করেছি।'
            : 'From real estate to hospitals, schools to e-commerce — we\'ve automated growth across every sector.'}
        </p>
      </Reveal>

      {/* Stats row */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {STATS.map((stat, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Card className="border-emerald-500/20 gradient-brand-soft">
              <CardContent className="flex flex-col items-center justify-center text-center py-6 sm:py-8">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text tabular-nums">
                  {isBn ? stat.valueBn : stat.valueEn}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {isBn ? stat.labelBn : stat.labelEn}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Logo grid */}
      <AnimatePresence>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {BUSINESSES.map((biz, i) => {
            const { Icon } = biz
            return (
              <motion.div key={i} variants={staggerItem}>
                <Card className="group h-full border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-glow">
                  <CardContent className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 p-4 text-center">
                    <Icon
                      className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                      aria-hidden
                    />
                    <p className="text-sm sm:text-base font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {biz.name}
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground/70 transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {isBn ? biz.industryBn : biz.industryEn}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Bottom note */}
      <Reveal delay={0.1} className="mt-8 text-center">
        <p className="text-sm sm:text-base text-muted-foreground">
          {isBn
            ? '+ ১০০ এর বেশি ব্যবসা সারা বাংলাদেশে'
            : '+ 100 more businesses across Bangladesh'}
        </p>
      </Reveal>
    </SectionShell>
  )
}

export default ClientLogos
