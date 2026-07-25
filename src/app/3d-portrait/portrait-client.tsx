'use client'

import * as React from 'react'
import Image from 'next/image'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingEyebrow,
  LandingFooter,
  LandingLeadForm,
  LandingSocials,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import { siteConfig } from '@/lib/site-data'
import {
  Sparkles, Heart, Clock, ShieldCheck, Camera, Flame, Ruler, Layers,
  ArrowRight, ImageOff, TreePine, Crown, Users, Baby, Gift, Star,
  CheckCircle2, XCircle, Quote, PlayCircle, Award, MapPin, Phone,
  Package, Palette, Hammer, Truck, Eye, RefreshCw, Lock, BadgeCheck,
  TrendingDown, ChevronDown,
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  PRICING DATA — 3 materials × 5 face counts = 15 tiers                    */
/* -------------------------------------------------------------------------- */

type MaterialKey = 'stl' | 'mdf' | 'mahogany'

const MATERIALS: {
  key: MaterialKey
  t_en: string
  t_bn: string
  desc_en: string
  desc_bn: string
  days_en: string
  days_bn: string
}[] = [
  { key: 'stl', t_en: 'STL Design File', t_bn: 'STL ডিজাইন ফাইল', desc_en: 'Digital file only', desc_bn: 'শুধু ডিজিটাল ফাইল', days_en: '8 hours', days_bn: '৮ ঘণ্টা' },
  { key: 'mdf', t_en: 'MDF Board', t_bn: 'MDF বোর্ড', desc_en: 'Color + packaging + courier', desc_bn: 'কালার + প্যাকিং + কুরিয়ার', days_en: '7 days', days_bn: '৭ দিন' },
  { key: 'mahogany', t_en: 'Mahogany Wood', t_bn: 'মহোগনি কাঠ', desc_en: 'Premium wood (MDF + ৳1000-2500)', desc_bn: 'প্রিমিয়াম কাঠ (MDF + ৳১০০০-২৫০০)', days_en: '10 days', days_bn: '১০ দিন' },
]

const STL_PRICES = [500, 4500, 6000, 7500, 9000]
const MDF_PRICES = [7500, 9500, 11500, 14500, 17500]
const MAHOGANY_ADD = [1000, 1500, 2000, 2500, 2500]

function getPrice(material: MaterialKey, faces: number): number {
  const idx = faces - 1
  if (material === 'stl') return STL_PRICES[idx]
  if (material === 'mdf') return MDF_PRICES[idx]
  return MDF_PRICES[idx] + MAHOGANY_ADD[idx]
}

function getDays(material: MaterialKey, isBn: boolean): string {
  const m = MATERIALS.find((x) => x.key === material)!
  return isBn ? m.days_bn : m.days_en
}

const BOARD_SIZES = [
  { size: '10" × 14"', thickness: '1.5"' },
  { size: '12" × 16"', thickness: '1.5"' },
  { size: '16" × 20"', thickness: '2"' },
  { size: '20" × 24"', thickness: '2.5"' },
  { size: '20" × 30"', thickness: '3"' },
]

const GALLERY = [
  '/3d-gallery/1.jpg',
  '/3d-gallery/2.jpg',
  '/3d-gallery/3.jpg',
  '/3d-gallery/4.jpg',
  '/3d-gallery/5.jpg',
  '/3d-gallery/6.jpg',
  '/3d-gallery/7.jpg',
  '/3d-gallery/8.png',
]

/* -------------------------------------------------------------------------- */
/*  STICKY CTA — appears after scrolling past hero                            */
/* -------------------------------------------------------------------------- */

function StickyCTA({ isBn }: { isBn: boolean }) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!visible) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-amber-200/60 bg-background/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-bold">
            {isBn ? 'আপনার পরিবারের স্মৃতি সংরক্ষণ করুন' : 'Preserve your family memory'}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {isBn ? 'অগ্রিম পেমেন্ট নেই · প্রিভিউ পাবেন' : 'No advance · Preview before production'}
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              isBn
                ? 'আসসালামু আলাইকুম, আমি ৩D পোর্ট্রেট অর্ডার করতে চাই।'
                : 'Assalamu Alaikum, I want to order a 3D portrait.',
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] sm:flex-none"
          >
            <Phone className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <a
            href="#order"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02] sm:flex-none"
          >
            {isBn ? 'অর্ডার করুন' : 'Order Now'} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export function PortraitClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('3d_portrait_page_v3')

  /** Convert ASCII digits to Bengali digits when lang === 'bn'. */
  const bn = (s: string | number) =>
    isBn
      ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
      : String(s)

  // Live price calculator state
  const [material, setMaterial] = React.useState<MaterialKey>('stl')
  const [faces, setFaces] = React.useState(1)
  const price = getPrice(material, faces)
  const days = getDays(material, isBn)

  // WhatsApp photo button message
  const waPhotoMessage = encodeURIComponent(
    isBn
      ? 'আসসালামু আলাইকুম, আমি ৩D পোর্ট্রেট অর্ডার করতে চাই। আমার ছবি পাঠাচ্ছি।'
      : 'Assalamu Alaikum, I want to order a 3D portrait. Sending my photo.',
  )

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* ================================================================== */}
        {/* SECTION 1 — HERO (StoryBrand: Hero = Customer, emotional hook)    */}
        {/* ================================================================== */}
        <section className="relative overflow-hidden" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-rose-50/40 to-background dark:from-amber-950/20 dark:via-rose-950/10" />
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-rose-300/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2">
            <div>
              <LandingEyebrow>
                <Flame className="h-3 w-3 text-rose-500" />
                {isBn ? '🔥 ক্যাম্পেইন — সিঙ্গেল ফেস মাত্র ৳৫০০' : '🔥 Campaign — Single face just ৳500'}
              </LandingEyebrow>
              <h1
                id="hero-title"
                className="mt-5 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              >
                {isBn ? (
                  <>
                    প্রিয়জনের মুখ <br />
                    <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 bg-clip-text text-transparent">
                      কাঠে খোদাই
                    </span>{' '}
                    করে চিরকাল রাখুন
                  </>
                ) : (
                  <>
                    Carve your loved ones <br />
                    <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 bg-clip-text text-transparent">
                      into wood
                    </span>{' '}
                    — forever
                  </>
                )}
              </h1>
              <p className="mt-3 text-lg font-bold text-amber-700 dark:text-amber-400">
                {isBn ? 'CNC 3D ফেস স্কাল্পটিং — স্মৃতি সংরক্ষণের প্রিমিয়াম উপায়' : 'CNC 3D Face Sculpting — the premium way to preserve memories'}
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {isBn
                  ? 'ছবি ফিকে হয়ে যায়, কিন্তু কাঠে খোদাই করা ৩D পোর্ট্রেট প্রজন্মের পর প্রজন্ম থাকে। আপনার পরিবারের হাসি এখন চিরস্থায়ী করুন।'
                  : 'Photos fade, but a CNC-carved 3D portrait lasts for generations. Make your family\'s smile eternal today.'}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#order"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-amber-600/25 transition-transform hover:scale-[1.03]"
                >
                  {isBn ? 'আমার পরিবারের স্মৃতি রক্ষা করুন' : 'Preserve My Family Memory'}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <WhatsAppCTA isBn={isBn} />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {isBn ? 'অগ্রিম পেমেন্ট নেই' : 'No advance payment'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-amber-600" />
                  {isBn ? 'প্রিভিউ পাবেন' : 'Preview before production'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-rose-600" />
                  {isBn ? '১০০০+ পরিবার' : '1000+ families'}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {GALLERY.slice(0, 4).map((src, i) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-2xl border border-amber-200/50 bg-card shadow-xl"
                    style={{ transform: i % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)' }}
                  >
                    <Image
                      src={src}
                      alt={isBn ? `৩D কাঠের পোর্ট্রেট নমুনা ${bn(i + 1)}` : `3D wooden portrait sample ${i + 1}`}
                      width={400}
                      height={400}
                      className="aspect-square w-full object-cover"
                      priority={i < 2}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-amber-200 bg-background/95 px-4 py-2 text-xs font-bold text-amber-700 shadow-lg backdrop-blur">
                ⭐ {isBn ? '৫.০ — ১০০০+ রিভিউ' : '5.0 — 1000+ reviews'}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 2 — EMOTIONAL STORY (Disney storytelling)                  */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="story-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Heart className="h-3 w-3 text-rose-500" /> {isBn ? 'একটি সত্যি ঘটনা' : 'A True Story'}
              </LandingEyebrow>
              <h2 id="story-title" className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                {isBn ? '"ছবিটা হারিয়ে যাওয়ার পর আমি কিছুই করতে পারিনি..."' : '"After the photo was lost, I couldn\'t do anything..."'}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-[1fr_2fr]">
              <div className="rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-rose-50 p-6 text-center dark:from-amber-950/20 dark:to-rose-950/10">
                <Quote className="mx-auto h-8 w-8 text-amber-500" />
                <p className="mt-3 text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {isBn ? 'রহিমা বেগম, ঢাকা' : 'Rahima Begum, Dhaka'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isBn ? 'মায়ের স্মৃতি সংরক্ষণ' : "Preserved mother's memory"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {isBn
                    ? '"মা চলে যাওয়ার পর আমার কাছে শুধু একটা ছবি ছিল। সেই ছবিটাও বন্যায় নষ্ট হয়ে গেল। আমি ভেঙে পড়েছিলাম। তখন NextGen এর ৩D পোর্ট্রেট আমাকে আবার মাকে ফিরে পেতে দিল — কাঠে খোদাই করা, চিরকালের জন্য। এখন মা প্রতিদিন আমার দেওয়ালে হাসছেন।"'
                    : '"After mother passed, I had just one photo of her. Even that was lost in a flood. I was broken. Then NextGen\'s 3D portrait gave me back my mother — carved in wood, forever. Now she smiles on my wall every day."'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 3 — PROBLEM (StoryBrand: Villain = Lost Memories)          */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="problem-title">
          <div className="text-center">
            <LandingEyebrow>
              <ImageOff className="h-3 w-3 text-rose-500" /> {isBn ? 'নীরব হৃদয়বিদারক সত্য' : 'The Silent Heartbreak'}
            </LandingEyebrow>
            <h2 id="problem-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'প্রতিদিন আমরা স্মৃতি হারাচ্ছি' : 'Every day, we lose memories'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {isBn
                ? 'এবং একবার হারিয়ে গেলে — আর ফিরে পাওয়া যায় না।'
                : 'And once lost — they can never be recovered.'}
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                Icon: ImageOff,
                t: isBn ? 'ছবি ফিকে হয়' : 'Photos Fade',
                d: isBn ? '১০-১৫ বছরে রঙ ফিকে, কাগজ ছিঁড়ে যায়।' : 'Colors fade in 10-15 years, paper tears.',
              },
              {
                Icon: Flame,
                t: isBn ? 'ফোন নষ্ট হয়' : 'Phones Get Lost',
                d: isBn ? 'ফোন হারালে সব ছবি মুছে যায়।' : 'Lose your phone, lose every photo.',
              },
              {
                Icon: TrendingDown,
                t: isBn ? 'স্মৃতি মুছে যায়' : 'Memories Slip Away',
                d: isBn ? 'সময়ের সাথে মুখ ভুলে যাই।' : 'Over time, we forget their faces.',
              },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="rounded-2xl border border-rose-200/60 bg-rose-50/50 p-6 text-center dark:bg-rose-950/10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/40">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">{t}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4 — FUTURE VISION (Brian Tracy: future visualization)      */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-br from-amber-50 to-rose-50 py-14 dark:from-amber-950/20 dark:to-rose-950/10 sm:py-20" aria-labelledby="vision-title">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>
              <Sparkles className="h-3 w-3 text-amber-500" /> {isBn ? 'ভবিষ্যতের কল্পনা' : 'Imagine the Future'}
            </LandingEyebrow>
            <h2 id="vision-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? '২০ বছর পর — আপনার নাতিরা দেখবে' : '20 Years From Now — Your Grandchildren Will See'}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {isBn
                ? 'আপনার দেওয়ালে ঝোলানো কাঠের পোর্ট্রেটটা নাতিরা দেখবে, স্পর্শ করবে, এবং বলবে — "এই তো দাদী!"। ছবি নয়, এটি আপনার পরিবারের উত্তরাধিকার।'
                : 'The wooden portrait on your wall — your grandchildren will see it, touch it, and say "That\'s grandma!" Not a photo. Your family\'s legacy.'}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { t: isBn ? 'প্রজন্মের উত্তরাধিকার' : 'Generational Legacy', d: isBn ? '৫০+ বছর স্থায়ী' : 'Lasts 50+ years' },
                { t: isBn ? 'স্পর্শকরণীয় স্মৃতি' : 'Tangible Memory', d: isBn ? 'দেখা যায়, স্পর্শ করা যায়' : 'Can see, can touch' },
                { t: isBn ? 'পরিবারের গর্ব' : 'Family Pride', d: isBn ? 'ড্রয়িং রুমে ঝোলানো' : 'Hangs in your living room' },
              ].map((c, i) => (
                <div key={i} className="rounded-2xl border border-amber-200/60 bg-background/70 p-5 backdrop-blur">
                  <h3 className="font-heading text-sm font-bold text-amber-700 dark:text-amber-300">{c.t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 5 — WHY MEMORIES MATTER (emotional anchor)                 */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="why-matter-title">
          <div className="text-center">
            <LandingEyebrow>
              <Heart className="h-3 w-3 text-rose-500" /> {isBn ? 'স্মৃতি কেন গুরুত্বপূর্ণ' : 'Why Memories Matter'}
            </LandingEyebrow>
            <h2 id="why-matter-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'স্মৃতি হলো ভালোবাসার প্রমাণ' : 'Memories Are Proof of Love'}
            </h2>
          </div>
          <div className="mt-8 space-y-3">
            {[
              isBn ? 'মা-বাবাকে হারানোর পর যা থাকে — শুধু স্মৃতি।' : 'After losing parents, all that remains — is memory.',
              isBn ? 'সন্তানের প্রথম হাসি চিরকাল রাখার সুযোগ একবারই আসে।' : 'The chance to keep a child\'s first smile forever comes only once.',
              isBn ? 'পরিবার হলো স্মৃতির সমষ্টি — স্মৃতি হারালে পরিবার হারায়।' : 'A family is a collection of memories — lose the memories, lose the family.',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <Heart className="mt-0.5 h-5 w-5 shrink-0 fill-rose-500 text-rose-500" />
                <p className="text-[15px] font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 6 — WHY PHOTOS FADE (loss aversion)                        */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="fade-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Clock className="h-3 w-3 text-rose-500" /> {isBn ? 'সময়ের নির্মমতা' : 'Time Is Cruel'}
              </LandingEyebrow>
              <h2 id="fade-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'ছবি ফিকে হয়ে যায়...' : 'Photos Fade Away...'}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                {isBn ? 'প্রিন্ট করা ছবি টিকে থাকে ১০-১৫ বছর। তারপর — চিরতরে হারিয়ে যায়।' : 'Printed photos last 10-15 years. Then — lost forever.'}
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: isBn ? 'রঙ ফিকে হয়' : 'Colors Bleach', d: isBn ? 'সূর্যের আলোতে দ্রুত ফিকে' : 'Sunlight bleaches them fast' },
                { t: isBn ? 'কাগজ পচে যায়' : 'Paper Degrades', d: isBn ? 'আর্দ্রতায় ছিঁড়ে যায়' : 'Humidity tears them apart' },
                { t: isBn ? 'ডিজিটাল নষ্ট হয়' : 'Digital Gets Lost', d: isBn ? 'ফোন/হার্ডডিস্ক নষ্ট হলে সব শেষ' : 'Phone/hard drive crash = all gone' },
                { t: isBn ? 'বন্যায় ভেসে যায়' : 'Lost in Floods', d: isBn ? 'বাংলাদেশে প্রতি বছর বন্যা' : 'Bangladesh floods every year' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-rose-200/50 bg-card p-5">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <div>
                    <h3 className="font-heading text-sm font-bold">{c.t}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 7 — WHY PORTRAIT LASTS (solution contrast)                  */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="lasts-title">
          <div className="text-center">
            <LandingEyebrow>
              <TreePine className="h-3 w-3 text-amber-600" /> {isBn ? 'কাঠের জাদু' : 'The Magic of Wood'}
            </LandingEyebrow>
            <h2 id="lasts-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'কিন্তু কাঠ — কাঠ চিরকাল থাকে' : 'But Wood — Wood Lasts Forever'}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: isBn ? '৫০+ বছর স্থায়ী' : 'Lasts 50+ Years', d: isBn ? 'প্রজন্মের পর প্রজন্ম' : 'Generation after generation' },
              { t: isBn ? 'রঙ ফিকে হয় না' : 'Colors Never Fade', d: isBn ? 'CNC খোদাই — মুছে যায় না' : 'CNC carving — never erases' },
              { t: isBn ? 'পানি-আর্দ্রতা সহ্য' : 'Water & Moisture Proof', d: isBn ? 'বন্যাতেও নষ্ট হয় না' : 'Survives floods too' },
              { t: isBn ? 'স্পর্শকরণীয় শিল্প' : 'Tangible Art', d: isBn ? 'দেখা যায়, স্পর্শ করা যায়' : 'See it, touch it, feel it' },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-emerald-200/50 bg-emerald-50/40 p-5 dark:bg-emerald-950/10">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <h3 className="font-heading text-sm font-bold text-emerald-700 dark:text-emerald-300">{c.t}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 8 — OUR SOLUTION (StoryBrand: Guide = NextGen)             */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-br from-amber-50 via-background to-rose-50 py-14 dark:from-amber-950/20 dark:to-rose-950/10 sm:py-20" aria-labelledby="solution-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Sparkles className="h-3 w-3 text-amber-500" /> {isBn ? 'আমাদের সমাধান' : 'Our Solution'}
              </LandingEyebrow>
              <h2 id="solution-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'ছবি থেকে কাঠে — ৩ ধাপে চিরস্থায়ী' : 'Photo to Wood — Eternal in 3 Steps'}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                {isBn ? 'আমরা NextGen Digital Studio — আপনার স্মৃতি সংরক্ষণের গাইড।' : 'We are NextGen Digital Studio — your guide to preserving memories.'}
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { n: 1, Icon: Camera, t: isBn ? 'ছবি পাঠান' : 'Send Photo', d: isBn ? 'WhatsApp-এ পাঠান — যেকোনো পুরোনো ছবি চলবে।' : 'Send on WhatsApp — any old photo works.' },
                { n: 2, Icon: Eye, t: isBn ? 'প্রিভিউ দেখুন' : 'See Preview', d: isBn ? 'CNC খোদাইয়ের আগে ৩D প্রিভিউ পাবেন।' : 'Get a 3D preview before CNC carving.' },
                { n: 3, Icon: Gift, t: isBn ? 'পেমেন্ট ও ডেলিভারি' : 'Pay & Receive', d: isBn ? 'কাজ দেখে পেমেন্ট — ঘরে ডেলিভারি।' : 'Pay after seeing work — home delivery.' },
              ].map(({ n, Icon, t, d }) => (
                <div key={n} className="relative rounded-2xl border border-amber-200/50 bg-background p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mt-3 text-xs font-bold text-amber-600">
                    {isBn ? `ধাপ ${bn(n)}` : `Step ${n}`}
                  </div>
                  <h3 className="mt-1 font-heading text-base font-bold">{t}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 9 — BENEFITS (emotional benefits, not features)            */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="benefits-title">
          <div className="text-center">
            <LandingEyebrow>
              <Heart className="h-3 w-3 text-rose-500" /> {isBn ? 'আবেগের ফলাফল' : 'Emotional Outcomes'}
            </LandingEyebrow>
            <h2 id="benefits-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'যা আপনি অনুভব করবেন' : 'What You Will Feel'}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Heart, t: isBn ? 'মাকে আবার কাছে পাবেন' : 'Feel Mother Close Again', d: isBn ? 'প্রতিদিন দেওয়ালে দেখবেন।' : 'See her on the wall daily.' },
              { Icon: Gift, t: isBn ? 'সেরা উপহার দেওয়ার গর্ব' : 'Pride of Best Gift', d: isBn ? 'স্বামী/স্ত্রীকে অবাক করবেন।' : 'Surprise your spouse.' },
              { Icon: Crown, t: isBn ? 'পরিবারের উত্তরাধিকার' : 'Family Legacy', d: isBn ? 'নাতি-নাতনি দেখবে।' : 'Grandchildren will see it.' },
              { Icon: ShieldCheck, t: isBn ? 'চিরশান্তি' : 'Eternal Peace', d: isBn ? 'স্মৃতি হারানোর ভয় নেই।' : 'No fear of losing memory.' },
              { Icon: Star, t: isBn ? 'অতিথিদের প্রশংসা' : 'Guests Will Admire', d: isBn ? 'ড্রয়িং রুমে গর্ব।' : 'Pride in your living room.' },
              { Icon: Baby, t: isBn ? 'সন্তানের শৈশব থাকবে' : 'Childhood Stays Forever', d: isBn ? 'বড় হলেও ছোট রূপ থাকবে।' : 'Small form stays even when grown.' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">{t}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 10 — FEATURES (technical specs)                            */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="features-title">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Hammer className="h-3 w-3 text-amber-600" /> {isBn ? 'প্রযুক্তিগত বৈশিষ্ট্য' : 'Technical Features'}
              </LandingEyebrow>
              <h2 id="features-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'কীভাবে তৈরি হয়' : 'How It\'s Made'}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { Icon: TreePine, t: isBn ? 'মহোগনি কাঠ' : 'Mahogany Wood', d: isBn ? 'প্রিমিয়াম, টেকসই' : 'Premium, durable' },
                { Icon: Hammer, t: isBn ? 'CNC খোদাই' : 'CNC Carving', d: isBn ? 'নিখুঁত ডিটেইল' : 'Precision detail' },
                { Icon: Palette, t: isBn ? 'হ্যান্ড কালারিং' : 'Hand Coloring', d: isBn ? 'প্রতিটি অংশে যত্ন' : 'Care in every part' },
                { Icon: Package, t: isBn ? 'সেফ প্যাকেজিং' : 'Safe Packaging', d: isBn ? 'ব্রেকেজ-প্রুফ' : 'Breakage-proof' },
              ].map(({ Icon, t, d }, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold">{t}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 11 — OFFER STACK (Hormozi: value stacking)                 */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-br from-stone-900 to-stone-800 py-14 text-stone-100 sm:py-20" aria-labelledby="offer-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <Gift className="h-3 w-3 text-amber-400" /> {isBn ? 'অফার স্ট্যাক' : 'The Offer Stack'}
              </span>
              <h2 id="offer-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'আপনি যা যা পাচ্ছেন' : 'Everything You Get'}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-stone-300">
                {isBn ? 'মোট মূল্য ৳১৫,০০০+ — আজ মাত্র' : 'Total value ৳15,000+ — today only'}
              </p>
            </div>
            <div className="mt-8 space-y-3">
              {[
                { t: isBn ? 'CNC 3D পোর্ট্রেট (নির্বাচিত সাইজ)' : 'CNC 3D Portrait (selected size)', v: isBn ? '৳৭,৫০০' : '৳7,500' },
                { t: isBn ? 'হ্যান্ড কালারিং ও ফিনিশিং' : 'Hand coloring & finishing', v: isBn ? '৳২,০০০' : '৳2,000' },
                { t: isBn ? 'সেফ প্যাকেজিং' : 'Safe breakage-proof packaging', v: isBn ? '৳৫০০' : '৳500' },
                { t: isBn ? 'কুরিয়ার ডেলিভারি (সারা দেশে)' : 'Courier delivery nationwide', v: isBn ? '৳৩০০' : '৳300' },
                { t: isBn ? '৩D প্রিভিউ পাবেন (প্রোডাকশনের আগে)' : '3D preview before production', v: isBn ? '৳১,৫০০' : '৳1,500' },
                { t: isBn ? 'আনলিমিটেড রিভিশন (প্রিভিউতে)' : 'Unlimited preview revisions', v: isBn ? '৳২,০০০' : '৳2,000' },
                { t: isBn ? '১০০০+ ডিজাইনের এক্সেস' : 'Access to 1000+ design templates', v: isBn ? '৳১,০০০' : '৳1,000' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-stone-700 bg-stone-800/50 px-5 py-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400" />
                    <span className="text-sm font-medium">{item.t}</span>
                  </div>
                  <span className="text-sm font-bold text-stone-400 line-through">{item.v}</span>
                </div>
              ))}
              <div className="mt-5 flex items-center justify-between rounded-2xl border-2 border-amber-400 bg-amber-400/10 px-6 py-4">
                <span className="font-heading text-lg font-bold text-amber-300">
                  {isBn ? 'আজকের মূল্য' : 'Today\'s Price'}
                </span>
                <div className="text-right">
                  <div className="text-xs text-stone-400 line-through">{isBn ? '৳১৫,০০০+' : '৳15,000+'}</div>
                  <div className="font-heading text-2xl font-extrabold text-amber-300">
                    {isBn ? '৳৫০০ থেকে শুরু' : 'From ৳500'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 12 — BONUS STACK (Hormozi: bonus stack)                     */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="bonus-title">
          <div className="text-center">
            <LandingEyebrow>
              <Gift className="h-3 w-3 text-amber-500" /> {isBn ? 'ফ্রি বোনাস' : 'Free Bonuses'}
            </LandingEyebrow>
            <h2 id="bonus-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? '৩টি ফ্রি বোনাস — আজই' : '3 Free Bonuses — Today Only'}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                num: 1,
                title: isBn ? 'ফ্রি ডেলিভারি' : 'Free Delivery',
                desc: isBn ? 'সারা দেশে ফ্রি কুরিয়ার' : 'Free courier nationwide',
                val: isBn ? '৳৩০০ মূল্য' : '৳300 value',
              },
              {
                num: 2,
                title: isBn ? 'ফ্রি প্রিভিউ' : 'Free Preview',
                desc: isBn ? 'প্রোডাকশনের আগে ৩D দেখুন' : 'See 3D before production',
                val: isBn ? '৳১,৫০০ মূল্য' : '৳1,500 value',
              },
              {
                num: 3,
                title: isBn ? 'ফ্রি রিভিশন' : 'Free Revisions',
                desc: isBn ? 'আনলিমিটেড রিভিশন' : 'Unlimited revisions',
                val: isBn ? '৳২,০০০ মূল্য' : '৳2,000 value',
              },
            ].map((b) => (
              <div key={b.num} className="relative rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-rose-50 p-6 text-center dark:from-amber-950/20 dark:to-rose-950/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-3 py-0.5 text-xs font-bold text-white">
                  {isBn ? 'ফ্রি' : 'FREE'}
                </div>
                <div className="mt-2 font-heading text-xs font-bold text-amber-600">
                  {isBn ? `বোনাস ${bn(b.num)}` : `Bonus ${b.num}`}
                </div>
                <h3 className="mt-1 font-heading text-base font-bold">{b.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{b.desc}</p>
                <p className="mt-2 text-xs font-bold text-rose-600">{b.val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 13 — PRICING DETAIL + SECTION 14 CALCULATOR                 */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="calc-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Ruler className="h-3 w-3 text-amber-600" /> {isBn ? 'দাম নির্বাচন করুন' : 'Choose Your Price'}
              </LandingEyebrow>
              <h2 id="calc-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'লাইভ মূল্য ক্যালকুলেটর' : 'Live Price Calculator'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn ? 'material ও face count নির্বাচন করুন — দাম তাৎক্ষণিক আপডেট হবে' : 'Select material & face count — price updates instantly'}
              </p>
            </div>

            {/* Material selector */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3" role="group" aria-label={isBn ? 'উপাদান নির্বাচন করুন' : 'Select material'}>
              {MATERIALS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMaterial(m.key)}
                  aria-pressed={material === m.key}
                  aria-label={`${isBn ? m.t_bn : m.t_en} — ${isBn ? m.desc_bn : m.desc_en} — ${isBn ? m.days_bn : m.days_en}`}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    material === m.key
                      ? 'border-amber-500 bg-amber-50 shadow-lg dark:bg-amber-950/30'
                      : 'border-border/60 bg-card hover:border-amber-300'
                  }`}
                >
                  <div className="font-heading font-bold">{isBn ? m.t_bn : m.t_en}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{isBn ? m.desc_bn : m.desc_en}</div>
                  <div className="mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {isBn ? m.days_bn : m.days_en}
                  </div>
                </button>
              ))}
            </div>

            {/* Face count selector */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-muted-foreground" id="face-count-label">
                {isBn ? 'কতজনের ফেস?' : 'How many faces?'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby="face-count-label">
                {[1, 2, 3, 4, 5].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFaces(f)}
                    aria-pressed={faces === f}
                    aria-label={`${bn(f)} ${isBn ? 'ফেস' : faces > 1 ? 'faces' : 'face'}`}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 font-bold transition-all ${
                      faces === f
                        ? 'border-amber-500 bg-amber-500 text-white shadow-lg'
                        : 'border-border/60 bg-card hover:border-amber-300'
                    }`}
                  >
                    {bn(f)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price display */}
            <div className="mt-6 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-50 to-rose-50 p-6 text-center dark:from-amber-950/30 dark:to-rose-950/20">
              <div className="text-xs font-medium text-muted-foreground">
                {isBn ? 'আপনার নির্বাচিত দাম' : 'Your selected price'}
              </div>
              <div className="mt-1 text-5xl font-extrabold text-amber-600 dark:text-amber-400">
                ৳{bn(price.toLocaleString('en-US'))}
              </div>
              <div className="mt-2 flex items-center justify-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {days}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Layers className="h-3.5 w-3.5" /> {bn(faces)} {isBn ? 'ফেস' : 'face'}{faces > 1 ? (isBn ? '' : 's') : ''}
                </span>
              </div>
              {material === 'stl' && faces === 1 && (
                <div className="mt-3 inline-block rounded-full bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-600">
                  {isBn ? '🔥 ক্যাম্পেইন অফার (নির্ধারিত ৳৩২০০)' : '🔥 Campaign offer (was ৳3,200)'}
                </div>
              )}
              <a
                href="#order"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-amber-600/25 transition-transform hover:scale-[1.03]"
              >
                {isBn ? 'আমার পোর্ট্রেট তৈরি করুন' : 'Create My Portrait'}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 15 — MATERIALS DETAIL                                       */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="materials-title">
          <div className="text-center">
            <LandingEyebrow>
              <TreePine className="h-3 w-3 text-amber-600" /> {isBn ? '৩ ধরনের উপাদান' : '3 Material Options'}
            </LandingEyebrow>
            <h2 id="materials-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'যেটা আপনার পছন্দ — সেটাই' : 'Choose What Fits You'}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { Icon: Layers, t: isBn ? 'STL ডিজিটাল ফাইল' : 'STL Digital File', p: isBn ? '৳৫০০ থেকে' : 'From ৳500', d: isBn ? 'ডিজিটাল ফাইল — ৮ ঘণ্টায় ডেলিভারি। নিজের প্রিন্টারে প্রিন্ট করুন।' : 'Digital file — 8 hours delivery. Print on your own 3D printer.', feat: isBn ? ['৮ ঘণ্টায়', 'ডিজিটাল', 'সবচেয়ে সস্তা'] : ['8 hours', 'Digital', 'Cheapest'] },
              { Icon: TreePine, t: isBn ? 'MDF বোর্ড' : 'MDF Board', p: isBn ? '৳৭,৫০০ থেকে' : 'From ৳7,500', d: isBn ? 'কালার + প্যাকিং + কুরিয়ার। ৭ দিনে ঘরে পাবেন।' : 'Color + packaging + courier. Home delivery in 7 days.', feat: isBn ? ['৭ দিনে', 'হ্যান্ড কালার', 'সারা দেশে ডেলিভারি'] : ['7 days', 'Hand colored', 'Nationwide delivery'], popular: true },
              { Icon: Crown, t: isBn ? 'মহোগনি কাঠ' : 'Mahogany Wood', p: isBn ? '৳৮,৫০০ থেকে' : 'From ৳8,500', d: isBn ? 'প্রিমিয়াম কাঠ — ৫০+ বছর স্থায়ী। ১০ দিনে ডেলিভারি।' : 'Premium wood — lasts 50+ years. 10 days delivery.', feat: isBn ? ['৫০+ বছর', 'প্রিমিয়াম', 'উত্তরাধিকার'] : ['50+ years', 'Premium', 'Heirloom'] },
            ].map((m, i) => (
              <div key={i} className={`relative rounded-2xl border-2 p-6 shadow-sm ${m.popular ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20' : 'border-border/60 bg-card'}`}>
                {m.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-white">
                    {isBn ? 'জনপ্রিয়' : 'POPULAR'}
                  </div>
                )}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white">
                  <m.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-bold">{m.t}</h3>
                <div className="mt-1 font-heading text-xl font-extrabold text-amber-600 dark:text-amber-400">{m.p}</div>
                <p className="mt-2 text-xs text-muted-foreground">{m.d}</p>
                <ul className="mt-4 space-y-1.5">
                  {m.feat.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 16 — GALLERY                                               */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="gallery-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'আমাদের কাজের নমুনা' : 'Our Work Samples'}</LandingEyebrow>
              <h2 id="gallery-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? '৮+ স্যাম্পল ৩D পোর্ট্রেট' : '8+ Sample 3D Portraits'}
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {GALLERY.map((src, i) => (
                <div
                  key={src}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-transform hover:scale-[1.02]"
                >
                  <Image
                    src={src}
                    alt={isBn ? `৩D কাঠের পোর্ট্রেট নমুনা ${bn(i + 1)}` : `3D wooden portrait sample ${i + 1}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 17 — CUSTOMER STORIES (social proof)                       */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="stories-title">
          <div className="text-center">
            <LandingEyebrow>
              <Star className="h-3 w-3 text-amber-500" /> {isBn ? 'গ্রাহকদের গল্প' : 'Customer Stories'}
            </LandingEyebrow>
            <h2 id="stories-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? '১০০০+ পরিবার আমাদের উপর ভরসা করেছে' : '1000+ Families Trusted Us'}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: isBn ? 'রহিমা বেগম' : 'Rahima Begum', loc: isBn ? 'ঢাকা' : 'Dhaka', t: isBn ? 'মায়ের স্মৃতি' : "Mother's Memory", q: isBn ? 'মা চলে গেছে, কিন্তু তার হাসি এখন আমার দেওয়ালে — চিরকাল।' : 'Mother is gone, but her smile is on my wall — forever.' },
              { n: isBn ? 'করিম আহমেদ' : 'Karim Ahmed', loc: isBn ? 'চট্টগ্রাম' : 'Chattogram', t: isBn ? 'বিয়ের উপহার' : 'Wedding Gift', q: isBn ? 'স্ত্রীকে বিয়ের উপহার দিলাম — সে কেঁদে ফেলল। এর চেয়ে সুন্দর উপহার আর নেই।' : 'Gave my wife as wedding gift — she cried. No gift more beautiful.' },
              { n: isBn ? 'ফাতেমা খাতুন' : 'Fatema Khatun', loc: isBn ? 'যশোর' : 'Jessore', t: isBn ? 'বাবার স্মৃতি' : "Father's Memory", q: isBn ? 'বাবা হারিয়ে ছবিটাও ফিকে — এখন ৩D তে বাবা আবার তাজা।' : 'Lost father, photo faded — now in 3D father is fresh again.' },
              { n: isBn ? 'জাহিদ হাসান' : 'Jahid Hasan', loc: isBn ? 'খুলনা' : 'Khulna', t: isBn ? 'সন্তানের উপহার' : 'Child Gift', q: isBn ? 'মেয়ের প্রথম জন্মদিনে — এখন বড় হলেও ছোট রূপ থাকবে।' : "Daughter's first birthday — even when grown, her small form stays." },
              { n: isBn ? 'সালমা আক্তার' : 'Salma Akter', loc: isBn ? 'রাজশাহী' : 'Rajshahi', t: isBn ? 'পারিবারিক পোর্ট্রেট' : 'Family Portrait', q: isBn ? 'পুরো পরিবার — ৫ জন একসাথে। দেখলে মন ভরে যায়।' : 'Whole family — 5 together. Heart fills when I see it.' },
              { n: isBn ? 'মোঃ রফিক' : 'Md. Rafiq', loc: isBn ? 'সিলেট' : 'Sylhet', t: isBn ? 'পোষা প্রাণী স্মৃতি' : 'Pet Memorial', q: isBn ? 'আমার বিড়ালটা মারা গেছে — এখন সে কাঠে চিরকাল থাকবে।' : 'My cat passed — now in wood it will live forever.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{c.q}"</p>
                <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500 font-heading text-sm font-bold text-white">
                    {c.n.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{c.n}</div>
                    <div className="text-xs text-muted-foreground">{c.loc} · {c.t}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 18 — CUSTOMER VIDEOS                                       */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="videos-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <PlayCircle className="h-3 w-3 text-amber-500" /> {isBn ? 'কাজের প্রমাণ' : 'Proof of Work'}
              </LandingEyebrow>
              <h2 id="videos-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'আমাদের ৩D পোর্ট্রেট তৈরির ভিডিও' : 'Our 3D Portrait Making Video'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn ? 'দেখুন কীভাবে আমরা ছবি থেকে ৩D পোর্ট্রেট তৈরি করি' : 'See how we turn a photo into a 3D portrait'}
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Fshare%2Fr%2F18yKJ9scJr%2F&show_text=false&width=560&t=0"
                  className="h-full w-full border-0"
                  style={{ border: 'none' }}
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="3D Portrait Making Video"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://web.facebook.com/share/r/18yKJ9scJr/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-600/40 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                {isBn ? 'ফেসবুকে ভিডিও দেখুন' : 'Watch on Facebook'}
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 19 — BEHIND THE SCENES + SECTION 20 PRODUCTION PROCESS      */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="process-title">
          <div className="text-center">
            <LandingEyebrow>
              <Hammer className="h-3 w-3 text-amber-600" /> {isBn ? 'প্রোডাকশন প্রক্রিয়া' : 'Production Process'}
            </LandingEyebrow>
            <h2 id="process-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'ছবি থেকে কাঠ — ৬ ধাপে' : 'Photo to Wood — in 6 Steps'}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: 1, Icon: Camera, t: isBn ? 'ছবি গ্রহণ' : 'Photo Capture', d: isBn ? 'আপনার ছবি আমরা বিশ্লেষণ করি।' : 'We analyze your photo.' },
              { n: 2, Icon: Layers, t: isBn ? '৩D মডেলিং' : '3D Modeling', d: isBn ? 'ছবিকে ৩D মডেলে রূপান্তর।' : 'Convert photo to 3D model.' },
              { n: 3, Icon: Eye, t: isBn ? 'প্রিভিউ অনুমোদন' : 'Preview Approval', d: isBn ? 'আপনি দেখেন, চেঞ্জ করেন।' : 'You see, you approve.' },
              { n: 4, Icon: Hammer, t: isBn ? 'CNC খোদাই' : 'CNC Carving', d: isBn ? 'নিখুঁত কাঠে খোদাই।' : 'Precise wood carving.' },
              { n: 5, Icon: Palette, t: isBn ? 'হ্যান্ড কালারিং' : 'Hand Coloring', d: isBn ? 'প্রতিটি ডিটেইলে রঙ।' : 'Color in every detail.' },
              { n: 6, Icon: Package, t: isBn ? 'প্যাকিং ও ডেলিভারি' : 'Pack & Deliver', d: isBn ? 'সেফ প্যাকেজিং, ঘরে পৌঁছে।' : 'Safe pack, home reach.' },
            ].map(({ n, Icon, t, d }) => (
              <div key={n} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-600">{isBn ? `ধাপ ${bn(n)}` : `Step ${n}`}</div>
                    <h3 className="font-heading text-sm font-bold">{t}</h3>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 21 — DELIVERY TIMELINE                                     */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="delivery-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Truck className="h-3 w-3 text-amber-600" /> {isBn ? 'ডেলিভারি সময়সীমা' : 'Delivery Timeline'}
              </LandingEyebrow>
              <h2 id="delivery-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'কত দিনে পাবেন?' : 'When Will You Get It?'}
              </h2>
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-heading font-bold">{isBn ? 'উপাদান' : 'Material'}</th>
                    <th className="px-4 py-3 text-left font-heading font-bold">{isBn ? 'সময়' : 'Time'}</th>
                    <th className="px-4 py-3 text-left font-heading font-bold">{isBn ? 'ডেলিভারি' : 'Delivery'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-semibold">{isBn ? 'STL ডিজিটাল' : 'STL Digital'}</td>
                    <td className="px-4 py-3 font-bold text-amber-600">{isBn ? '৮ ঘণ্টা' : '8 hours'}</td>
                    <td className="px-4 py-3">{isBn ? 'ইমেইল/WhatsApp' : 'Email/WhatsApp'}</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-semibold">{isBn ? 'MDF বোর্ড' : 'MDF Board'}</td>
                    <td className="px-4 py-3 font-bold text-amber-600">{isBn ? '৭ দিন' : '7 days'}</td>
                    <td className="px-4 py-3">{isBn ? 'কুরিয়ার (সারা দেশে)' : 'Courier nationwide'}</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-semibold">{isBn ? 'মহোগনি কাঠ' : 'Mahogany Wood'}</td>
                    <td className="px-4 py-3 font-bold text-amber-600">{isBn ? '১০ দিন' : '10 days'}</td>
                    <td className="px-4 py-3">{isBn ? 'কুরিয়ার (সারা দেশে)' : 'Courier nationwide'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 22 — GUARANTEE (Hormozi: risk reversal)                    */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-br from-emerald-50 to-amber-50 py-14 dark:from-emerald-950/20 dark:to-amber-950/10 sm:py-20" aria-labelledby="guarantee-title">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 text-white shadow-xl">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 id="guarantee-title" className="mt-5 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'আয়রনক্ল্যাড গ্যারান্টি' : 'Ironclad Guarantee'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {isBn
                ? 'আপনার ঝুঁকি শূন্য। আমাদের ঝুঁকি সব। যদি কাজ পছন্দ না হয় — পেমেন্ট করবেন না।'
                : 'Your risk is zero. Our risk is everything. If you don\'t love it — you don\'t pay.'}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { Icon: Eye, t: isBn ? 'প্রিভিউ পাবেন' : 'Preview First', d: isBn ? 'প্রোডাকশনের আগে' : 'Before production' },
                { Icon: Lock, t: isBn ? 'অগ্রিম পেমেন্ট নেই' : 'No Advance Payment', d: isBn ? 'কাজ দেখে পেমেন্ট' : 'Pay after seeing work' },
                { Icon: RefreshCw, t: isBn ? 'ফ্রি রিভিশন' : 'Free Revisions', d: isBn ? 'আনলিমিটেড চেঞ্জ' : 'Unlimited changes' },
                { Icon: Package, t: isBn ? 'সেফ প্যাকেজিং' : 'Safe Packaging', d: isBn ? 'ব্রেকেজ-প্রুফ' : 'Breakage-proof' },
                { Icon: ShieldCheck, t: isBn ? 'কোয়ালিটি চেক' : 'Quality Check', d: isBn ? 'প্রতিটি অংশে' : 'On every part' },
                { Icon: Truck, t: isBn ? 'ডেলিভারি সাপোর্ট' : 'Delivery Support', d: isBn ? 'সারা দেশে' : 'Across country' },
              ].map(({ Icon, t, d }, i) => (
                <div key={i} className="rounded-2xl border border-emerald-200/60 bg-background/70 p-4 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold">{t}</h3>
                  </div>
                  <p className="mt-1.5 pl-10 text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 23 — BOARD SIZES                                           */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="sizes-title">
          <div className="text-center">
            <LandingEyebrow>
              <Ruler className="h-3 w-3 text-amber-600" /> {isBn ? 'বোর্ড ও কাঠের সাইজ' : 'Board & Wood Sizes'}
            </LandingEyebrow>
            <h2 id="sizes-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? '৫টি সাইজ + পুরুত্ব' : '5 Sizes + Thickness'}
            </h2>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-heading font-bold">{isBn ? 'নং' : '#'}</th>
                  <th className="px-4 py-3 text-left font-heading font-bold">{isBn ? 'সাইজ' : 'Size'}</th>
                  <th className="px-4 py-3 text-left font-heading font-bold">{isBn ? 'পুরুত্ব' : 'Thickness'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {BOARD_SIZES.map((b, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-bold text-amber-600">{bn(i + 1)}</td>
                    <td className="px-4 py-3 font-semibold">{bn(b.size)}</td>
                    <td className="px-4 py-3">{bn(b.thickness)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 24 — FOUNDER STORY (EEAT: experience, authority)           */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="founder-title">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Award className="h-3 w-3 text-amber-500" /> {isBn ? 'প্রতিষ্ঠাতার গল্প' : 'Founder Story'}
              </LandingEyebrow>
              <h2 id="founder-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'Taj Bhai — স্মৃতি সংরক্ষক' : 'Taj Bhai — Memory Keeper'}
              </h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_2fr]">
              <div className="rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-rose-50 p-6 text-center dark:from-amber-950/20 dark:to-rose-950/10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-rose-500 font-heading text-3xl font-bold text-white">
                  T
                </div>
                <h3 className="mt-3 font-heading text-lg font-bold">Taj Bhai</h3>
                <p className="text-xs text-muted-foreground">{isBn ? 'প্রতিষ্ঠাতা, NextGen Digital Studio' : 'Founder, NextGen Digital Studio'}</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-amber-500">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {isBn
                    ? '"আমি নিজে মা-কে হারিয়েছি। ছবি ফিকে হয়ে গিয়েছিল। সেই কষ্ট থেকেই NextGen জন্ম নিয়েছে — যাতে আর কেউ স্মৃতি না হারায়। প্রতিটি পোর্ট্রেট আমি নিজে তত্ত্বাবধান করি। ১০০০+ পরিবারের বিশ্বাস — এটাই আমার পুরস্কার।"'
                    : '"I lost my own mother. Her photo had faded. From that pain, NextGen was born — so no one loses their memories. I personally oversee every portrait. The trust of 1000+ families — that\'s my reward."'}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <BadgeCheck className="h-4 w-4 text-amber-600" /> {isBn ? '৫+ বছর অভিজ্ঞতা' : '5+ years experience'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4 text-amber-600" /> {isBn ? '১০০০+ গ্রাহক' : '1000+ clients'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 25 — ABOUT STUDIO + SECTION 26 TRUST BADGES                */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="studio-title">
          <div className="text-center">
            <LandingEyebrow>
              <MapPin className="h-3 w-3 text-amber-600" /> {isBn ? 'আমাদের স্টুডিও' : 'Our Studio'}
            </LandingEyebrow>
            <h2 id="studio-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'NextGen Digital Studio, যশোর' : 'NextGen Digital Studio, Jessore'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {isBn
                ? "বাংলাদেশের প্রিমিয়াম স্মৃতি সংরক্ষণ স্টুডিও। কাঠের সাথে ভালোবাসা মিশিয়ে প্রতিটি পোর্ট্রেট তৈরি।"
                : "Bangladesh's premium memory preservation studio. Blending wood with love in every portrait."}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { Icon: MapPin, t: isBn ? 'যশোর, খুলনা' : 'Jessore, Khulna', d: isBn ? 'ঠিকানা' : 'Location' },
              { Icon: Users, t: isBn ? '১০০০+ গ্রাহক' : '1000+ Clients', d: isBn ? 'বিশ্বস্ত' : 'Trusted' },
              { Icon: Award, t: isBn ? '৫.০ রেটিং' : '5.0 Rating', d: isBn ? 'ফেসবুক' : 'Facebook' },
              { Icon: Clock, t: isBn ? '৫+ বছর' : '5+ Years', d: isBn ? 'অভিজ্ঞতা' : 'Experience' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-4 text-center shadow-sm">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-2 text-sm font-bold">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 27 — GOOGLE REVIEWS / SOCIAL PROOF                         */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-14 sm:py-20" aria-labelledby="reviews-title">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>
              <Star className="h-3 w-3 text-amber-500" /> {isBn ? 'সামাজিক প্রমাণ' : 'Social Proof'}
            </LandingEyebrow>
            <h2 id="reviews-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? '৫.০ গড় রেটিং — ১০০০+ রিভিউ' : '5.0 Average Rating — 1000+ Reviews'}
            </h2>
            <div className="mt-6 flex items-center justify-center gap-2">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="h-7 w-7 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { n: isBn ? '১০০০+' : '1000+', l: isBn ? 'পরিবার সন্তুষ্ট' : 'Happy Families' },
                { n: isBn ? '৫.০' : '5.0', l: isBn ? 'গড় রেটিং' : 'Average Rating' },
                { n: isBn ? '৯৮%' : '98%', l: isBn ? 'রিপিট অর্ডার' : 'Repeat Orders' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-amber-200/50 bg-background p-5">
                  <div className="font-heading text-3xl font-extrabold text-amber-600 dark:text-amber-400">{s.n}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 28 — WHATSAPP PROOF                                         */}
        {/* ================================================================== */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="wa-proof-title">
          <div className="text-center">
            <LandingEyebrow>
              <Phone className="h-3 w-3 text-green-600" /> {isBn ? 'WhatsApp প্রমাণ' : 'WhatsApp Proof'}
            </LandingEyebrow>
            <h2 id="wa-proof-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'সরাসরি WhatsApp এ অর্ডার' : 'Order Directly on WhatsApp'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {isBn ? 'ফর্ম ছাড়াই — শুধু ছবি পাঠান, বাকি কাজ আমরা করব।' : 'No form needed — just send photo, we handle the rest.'}
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { t: isBn ? '১. ছবি পাঠান' : '1. Send Photo', d: isBn ? 'WhatsApp-এ' : 'On WhatsApp' },
              { t: isBn ? '২. আলোচনা করুন' : '2. Discuss', d: isBn ? 'সাইজ, কাঠ, দাম' : 'Size, wood, price' },
              { t: isBn ? '৩. কাজ শুরু' : '3. Work Starts', d: isBn ? 'প্রিভিউ পাবেন' : 'Get preview' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-green-200/50 bg-green-50/40 p-5 text-center dark:bg-green-950/10">
                <h3 className="font-heading text-sm font-bold text-green-700 dark:text-green-300">{s.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 29 — FAQ (objection handling)                              */}
        {/* ================================================================== */}
        <FAQSection isBn={isBn} bn={bn} />

        {/* ================================================================== */}
        {/* SECTION 30 — FINAL EMOTIONAL CTA + ORDER FORM                      */}
        {/* ================================================================== */}
        <section id="order" className="relative scroll-mt-20 overflow-hidden py-14 sm:py-20" aria-labelledby="final-cta-title">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-rose-600 to-amber-700" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 id="final-cta-title" className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              {isBn ? 'আপনার পরিবারের স্মৃতি আজই সংরক্ষণ করুন' : 'Preserve Your Family Memory Today'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              {isBn
                ? 'অগ্রিম পেমেন্ট নেই। প্রিভিউ দেখে পেমেন্ট। সারা দেশে ডেলিভারি।'
                : 'No advance payment. Preview before payment. Nationwide delivery.'}
            </p>
          </div>

          <div className="relative mx-auto mt-8 max-w-3xl px-4 sm:px-6">
            <div className="rounded-3xl border border-white/20 bg-background p-6 shadow-2xl sm:p-8">
              <div className="text-center">
                <LandingEyebrow>{isBn ? 'অর্ডার করুন' : 'Place Order'}</LandingEyebrow>
                <h3 className="mt-3 font-heading text-2xl font-bold">
                  {isBn ? 'আপনার ৩D পোর্ট্রেট অর্ডার করুন' : 'Order Your 3D Portrait'}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isBn
                    ? 'ফর্ম পূরণ করে অর্ডার কনফার্ম করুন, তারপর ছবি WhatsApp-এ পাঠান।'
                    : 'Fill the form to confirm order, then send photo on WhatsApp.'}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                  <span className="font-semibold">{isBn ? 'নির্বাচিত:' : 'Selected:'}</span>
                  <span className="rounded-full bg-amber-100 px-3 py-0.5 font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    {isBn ? MATERIALS.find((m) => m.key === material)!.t_bn : MATERIALS.find((m) => m.key === material)!.t_en}
                  </span>
                  <span className="rounded-full bg-rose-100 px-3 py-0.5 font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                    {bn(faces)} {isBn ? 'ফেস' : 'face'}{faces > 1 ? (isBn ? '' : 's') : ''}
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">৳{bn(price.toLocaleString('en-US'))}</span>
                </div>
              </div>
              <div className="mt-8">
                <LandingLeadForm
                  isBn={isBn}
                  source="3d_portrait_page_v3"
                  serviceName={`3D Portrait — ${MATERIALS.find((m) => m.key === material)!.t_en} · ${faces} face(s) · ৳${price}`}
                  submitLabel={isBn ? 'আমার পরিবারের স্মৃতি রক্ষা করুন' : 'Protect Our Family Legacy'}
                  successMessage={isBn
                    ? 'আপনার অর্ডার গ্রহণ করা হয়েছে! এখন ছবি WhatsApp-এ পাঠান। টিম কাজ শেষে দেখিয়ে পেমেন্ট নেবে।'
                    : 'Order received! Now send your photo on WhatsApp. Team will show finished work before payment.'}
                />
              </div>

              {/* WhatsApp photo button */}
              <div className="mt-6">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${waPhotoMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/25 transition-transform hover:scale-[1.01]"
                >
                  <Camera className="h-5 w-5" />
                  {isBn ? 'ছবি পাঠান (WhatsApp)' : 'Send Photo (WhatsApp)'}
                </a>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {isBn
                    ? 'আপনি দুটি উপায়ে অর্ডার করতে পারেন: ১. ফর্ম পূরণ করে → তারপর ছবি পাঠান, ২. শুধু ছবি পাঠান'
                    : 'You can order two ways: 1. Fill form → then send photo, 2. Just send photo directly'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 31 — SOCIAL LINKS                                          */}
        {/* ================================================================== */}
        <section className="bg-muted/30 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>{isBn ? 'ফলো করুন' : 'Follow Us'}</LandingEyebrow>
            <h2 className="mt-3 font-heading text-xl font-bold">
              {isBn ? 'আমাদের সাথে যুক্ত থাকুন' : 'Stay Connected'}
            </h2>
            <div className="mt-4 flex justify-center">
              <LandingSocials />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
      <StickyCTA isBn={isBn} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  FAQ SECTION (client accordion — no hydration mismatch, uses state)        */
/* -------------------------------------------------------------------------- */

function FAQSection({
  isBn,
  bn,
}: {
  isBn: boolean
  bn: (s: string | number) => string
}) {
  const [open, setOpen] = React.useState<number | null>(0)

  const faqs = [
    {
      q: isBn ? 'অগ্রিম পেমেন্ট দিতে হবে কি?' : 'Do I need to pay any advance payment?',
      a: isBn
        ? 'না। কোনো অগ্রিম পেমেন্ট নেই। কাজ শেষে দেখিয়ে পেমেন্ট নেওয়া হয়। প্রোডাকশনের আগে আপনাকে ৩D প্রিভিউ পাঠানো হয়।'
        : 'No. There is absolutely no advance payment. You pay only after seeing the finished work. We send a 3D preview before production begins.',
    },
    {
      q: isBn ? 'একসাথে কতজনের ফেস খোদাই করা যায়?' : 'How many faces can be carved in one portrait?',
      a: isBn
        ? 'একটি পোর্ট্রেটে ১ থেকে ৫ জনের ফেস খোদাই করা যায় — ব্যক্তি, দম্পতি, পরিবার, বাবা-মা, এবং গ্রুপের জন্য আদর্শ।'
        : 'We can carve 1 to 5 faces in a single wooden portrait — perfect for individuals, couples, families, parents, and group memories.',
    },
    {
      q: isBn ? 'কোন উপাদান পাওয়া যায়?' : 'What materials are available?',
      a: isBn
        ? 'তিনটি অপশন: STL ডিজিটাল ফাইল (৮ ঘণ্টায়), MDF বোর্ড (৭ দিন), এবং প্রিমিয়াম মহোগনি কাঠ (১০ দিন)। মহোগনি সবচেয়ে টেকসই ও বিলাসবহুল।'
        : 'Three options: STL Digital File (8 hours), MDF Board (7 days), and premium Mahogany Wood (10 days). Mahogany is the most durable and luxurious.',
    },
    {
      q: isBn ? 'ডেলিভারি কত দিনে পাব?' : 'How long does delivery take?',
      a: isBn
        ? 'STL ডিজিটাল ফাইল ৮ ঘণ্টায়। MDF পোর্ট্রেট ৭ দিনে। মহোগনি কাঠের পোর্ট্রেট ১০ দিনে। সারা বাংলাদেশে কুরিয়ার ডেলিভারি।'
        : 'STL digital files in 8 hours. MDF portraits take 7 days. Mahogany wood portraits take 10 days. Courier delivery across Bangladesh.',
    },
    {
      q: isBn ? 'প্রিভিউ দেখতে পাব কি?' : 'Can I see a preview before production?',
      a: isBn
        ? 'হ্যাঁ। শারীরিক খোদাই শুরুর আগে আমরা ৩D মডেলের ডিজিটাল প্রিভিউ পাঠাই। এই পর্যায়ে আপনি ফ্রিতে পরিবর্তন চাইতে পারেন।'
        : 'Yes. We send you a digital preview of the 3D model before we begin physical carving. You can request changes at this stage at no extra cost.',
    },
    {
      q: isBn ? 'যশোরের বাইরে ডেলিভারি দেন?' : 'Do you deliver outside Jessore?',
      a: isBn
        ? 'হ্যাঁ, আমরা কুরিয়ারের মাধ্যমে সারা বাংলাদেশে ডেলিভারি দান করি। সেফ প্যাকেজিং গ্যারান্টিড। MDF ও মহোগনি অর্ডারে ডেলিভারি চার্জ অন্তর্ভুক্ত।'
        : 'Yes, we deliver across all of Bangladesh via courier. Safe packaging is guaranteed. Delivery charge is included for MDF and Mahogany orders.',
    },
    {
      q: isBn ? 'পোর্ট্রেট কি টেকসই? কতদিন থাকবে?' : 'Is the portrait durable? Will it last long?',
      a: isBn
        ? 'হ্যাঁ। প্রিন্ট করা ছবি ১০-১৫ বছরে ফিকে হয়, কিন্তু আমাদের CNC খোদাই করা কাঠের পোর্ট্রেট প্রজন্মের পর প্রজন্ম থাকে। মহোগনি কাঠ বিশেষত ৫০+ বছর স্থায়ী।'
        : 'Yes. Unlike printed photos that fade in 10-15 years, our CNC-carved wooden portraits last for generations. Mahogany wood especially can last 50+ years with basic care.',
    },
    {
      q: isBn ? 'কিভাবে অর্ডার করব?' : 'How do I order?',
      a: isBn
        ? 'তিনটি সহজ ধাপ: ১) WhatsApp-এ ছবি পাঠান বা ফর্ম পূরণ করুন, ২) উপাদান ও ফেস সংখ্যা নির্বাচন করুন, ৩) আমাদের টিম কল করবে ও কাজ দেখাবে। পেমেন্ট শুধুমাত্র কাজ দেখার পর।'
        : 'Three simple steps: 1) Send your photo on WhatsApp or fill the order form, 2) Choose material and number of faces, 3) Our team calls you and delivers the finished portrait. Payment happens only after you see the finished work.',
    },
  ]

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20" aria-labelledby="faq-title">
      <div className="text-center">
        <LandingEyebrow>
          <ChevronDown className="h-3 w-3 text-amber-600" /> {isBn ? 'প্রশ্নোত্তর' : 'FAQ'}
        </LandingEyebrow>
        <h2 id="faq-title" className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
          {isBn ? 'আপনার প্রশ্নের উত্তর' : 'Your Questions Answered'}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          {isBn ? 'নিশ্চিন্তে অর্ডার করুন — সব প্রশ্নের উত্তর এখানে' : 'Order with confidence — all answers here'}
        </p>
      </div>
      <div className="mt-8 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-heading text-sm font-bold sm:text-base">{f.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-amber-600 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div id={`faq-panel-${i}`} className="border-t border-border/60 px-5 py-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
