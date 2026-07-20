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
import { Sparkles, Heart, Clock, ShieldCheck, Camera, Flame, Ruler, Layers, ArrowRight } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  Pricing data — 3 materials × 5 face counts = 15 tiers                    */
/* -------------------------------------------------------------------------- */

type MaterialKey = 'stl' | 'mdf' | 'mahogany'

const MATERIALS: { key: MaterialKey; t_en: string; t_bn: string; desc_en: string; desc_bn: string; days_en: string; days_bn: string }[] = [
  { key: 'stl', t_en: 'STL Design File', t_bn: 'STL ডিজাইন ফাইল', desc_en: 'Digital file only', desc_bn: 'শুধু ডিজিটাল ফাইল', days_en: '8 hours', days_bn: '৮ ঘণ্টা' },
  { key: 'mdf', t_en: 'MDF Board', t_bn: 'MDF বোর্ড', desc_en: 'Color + packaging + courier', desc_bn: 'কালার + প্যাকিং + কুরিয়ার', days_en: '7 days', days_bn: '৭ দিন' },
  { key: 'mahogany', t_en: 'Mahogany Wood', t_bn: 'মহোগনি কাঠ', desc_en: 'Premium wood (MDF + ৳1000-2500)', desc_bn: 'প্রিমিয়াম কাঠ (MDF + ৳১০০০-২৫০০)', days_en: '10 days', days_bn: '১০ দিন' },
]

// STL prices: 500 (campaign), 4500, 6000, 7500, 9000
const STL_PRICES = [500, 4500, 6000, 7500, 9000]
// MDF prices: 7500, 9500, 11500, 14500, 17500
const MDF_PRICES = [7500, 9500, 11500, 14500, 17500]
// Mahogany: MDF + 1000, 1500, 2000, 2500, 2500
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

// Board sizes
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

export function PortraitClient() {
  const { lang, t } = useLang()
  const isBn = lang === 'bn'
  usePageViewTracking('3d_portrait_page')

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
        {/* 1. Hero + Campaign */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-background to-background dark:from-violet-950/30" />
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:py-20">
            <div>
              <LandingEyebrow>
                <Flame className="h-3 w-3 text-rose-500" /> {t('portrait.campaignEyebrow')}
              </LandingEyebrow>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {isBn ? (
                  <>
                    আপনার স্মৃতিকে <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">চিরস্মরণীয়</span> করে রাখুন
                  </>
                ) : (
                  <>
                    Make your memories <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">eternal</span>
                  </>
                )}
              </h1>
              <p className="mt-2 text-lg font-bold text-violet-600 dark:text-violet-400">
                {t('portrait.subtitleBold')}
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {isBn
                  ? 'আপনার প্রিয়জনের মুখ কাঠে খোদাই করে চিরকালের জন্য সংরক্ষণ করুন। ছবি ফিকে হয়ে যায়, কিন্তু ৩D পোর্ট্রেট প্রজন্মের পর প্রজন্ম থাকবে।'
                  : 'Preserve your loved ones forever in carved wood. Photos fade, but 3D portraits last for generations.'}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#order" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-transform hover:scale-[1.02]">
                  {t('cta.orderNow')}
                </a>
                <WhatsAppCTA isBn={isBn} />
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-50 px-4 py-3 dark:bg-emerald-950/30">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  {t('portrait.noAdvanceShort')}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                {GALLERY.slice(0, 4).map((src, i) => (
                  <div
                    key={src}
                    className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg"
                    style={{ transform: i % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)' }}
                  >
                    <Image
                      src={src}
                      alt={isBn ? `৩D পোর্ট্রেট নমুনা ${bn(i + 1)}` : `3D Portrait Sample ${i + 1}`}
                      width={400}
                      height={400}
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Emotional Pain */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>
                <Heart className="h-3 w-3 text-rose-500" /> {t('portrait.photosFadeEyebrow')}
              </LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {isBn ? 'অ্যালবামের পুরোনো ছবিগুলো ক্রমশ ফিকে হয়ে যাচ্ছে...' : 'Old album photos are slowly fading...'}
              </h2>
            </div>
            <div className="mt-8 space-y-4">
              {[
                isBn
                  ? 'সময় প্রিয়জনকে দূরে নিয়ে যায়, কিন্তু তাদের হাসি আপনার দেওয়ালে থাকতে পারে — চিরকাল।'
                  : 'Time takes loved ones away, but their smile can stay on your wall — forever.',
                isBn
                  ? 'ফুল শুকিয়ে যায়, চকলেট শেষ হয়ে যায় — কিন্তু ৩D পোর্ট্রেট? এটি প্রজন্মের পর প্রজন্ম থাকবে।'
                  : 'Flowers dry, chocolates run out — but a 3D portrait? It stays for generations.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-rose-200/60 bg-card p-5 shadow-sm dark:border-rose-900/40">
                  <Heart className="mt-0.5 h-5 w-5 shrink-0 fill-rose-500 text-rose-500" />
                  <p className="text-[15px] font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Emotional Desire */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <Sparkles className="h-3 w-3 text-violet-500" /> {t('portrait.imagineEyebrow')}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {isBn ? 'কল্পনা করুন — আপনার মায়ের মুখখানি কাঠে খোদাই' : 'Imagine — your mother\'s face carved in wood'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {isBn
                ? 'বাবার হাসি, স্বামী/স্ত্রীর মুখ, সন্তানের প্রথম হাসি — সব এখন চিরস্থায়ী হতে পারে।'
                : "Father's smile, spouse's face, child's first laugh — all can now be eternal."}
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { t: isBn ? 'আবেগের উপহার' : 'Gift of Emotion', d: isBn ? 'প্রিয়জনকে সবচেয়ে বিশেষ উপহার।' : 'The most special gift for loved ones.' },
              { t: isBn ? 'নিখুঁত কারিগরি' : 'Perfect Craftsmanship', d: isBn ? 'হাতে তৈরি, প্রতিটি ডিটেইল নিখুঁত।' : 'Handcrafted, every detail perfect.' },
              { t: isBn ? 'পরিবারের সবাই' : 'For the Whole Family', d: isBn ? '১-৫ জনের ফেস একসাথে খোদাই।' : '1-5 faces carved together.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 text-center shadow-sm dark:border-violet-900/40 dark:from-violet-950/20 dark:to-fuchsia-950/10">
                <h3 className="font-heading text-lg font-bold text-violet-700 dark:text-violet-300">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Pricing + Live Calculator */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{t('portrait.choosePriceEyebrow')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                {t('portrait.priceCalcTitle')}
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
                      ? 'border-violet-500 bg-violet-50 shadow-lg dark:bg-violet-950/30'
                      : 'border-border/60 bg-card hover:border-violet-300'
                  }`}
                >
                  <div className="font-heading font-bold">{isBn ? m.t_bn : m.t_en}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{isBn ? m.desc_bn : m.desc_en}</div>
                  <div className="mt-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
                    {isBn ? m.days_bn : m.days_en}
                  </div>
                </button>
              ))}
            </div>

            {/* Face count selector */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-muted-foreground" id="face-count-label">
                {t('portrait.howManyFaces')}
              </p>
              <div
                className="mt-3 flex flex-wrap gap-2"
                role="group"
                aria-labelledby="face-count-label"
              >
                {[1, 2, 3, 4, 5].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFaces(f)}
                    aria-pressed={faces === f}
                    aria-label={`${bn(f)} ${isBn ? 'ফেস' : faces > 1 ? 'faces' : 'face'}`}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 font-bold transition-all ${
                      faces === f
                        ? 'border-violet-500 bg-violet-500 text-white shadow-lg'
                        : 'border-border/60 bg-card hover:border-violet-300'
                    }`}
                  >
                    {bn(f)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price display */}
            <div className="mt-6 rounded-2xl border-2 border-violet-500/40 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 text-center dark:from-violet-950/30 dark:to-fuchsia-950/20">
              <div className="text-xs font-medium text-muted-foreground">
                {t('portrait.yourSelectedPrice')}
              </div>
              <div className="mt-1 text-5xl font-extrabold text-violet-600 dark:text-violet-400">
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
                  {t('portrait.campaignOfferBadge')}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. Video */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>{t('portrait.proofEyebrow')}</LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
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
              {t('portrait.watchOnFacebook')}
            </a>
          </div>
        </section>

        {/* 6. Gallery */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <LandingEyebrow>{t('portrait.workSamplesEyebrow')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
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
                    alt={isBn ? `৩D পোর্ট্রেট নমুনা ${bn(i + 1)}` : `3D Portrait Sample ${i + 1}`}
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Board Sizes */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>
              <Ruler className="h-3 w-3" /> {t('portrait.boardSizesEyebrow')}
            </LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
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
                    <td className="px-4 py-3 font-bold text-violet-600">{bn(i + 1)}</td>
                    <td className="px-4 py-3 font-semibold">{bn(b.size)}</td>
                    <td className="px-4 py-3">{bn(b.thickness)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Social Links */}
        <section className="bg-muted/30 py-10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <LandingEyebrow>{t('landing.followUs')}</LandingEyebrow>
            <h2 className="mt-3 font-heading text-xl font-bold">
              {t('landing.stayConnected')}
            </h2>
            <div className="mt-4 flex justify-center">
              <LandingSocials />
            </div>
          </div>
        </section>

        {/* 9. How to Order */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <LandingEyebrow>{t('landing.howToOrder')}</LandingEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              {t('landing.just3Steps')}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { n: 1, t: isBn ? 'ছবি পাঠান' : 'Send photo', d: isBn ? 'WhatsApp-এ আপনার ছবি পাঠান।' : 'Send your photo on WhatsApp.' },
              { n: 2, t: isBn ? 'ফেস ও material নির্বাচন' : 'Choose face & material', d: isBn ? 'কতজন, কোন কাঠ বলুন।' : 'How many faces, which wood.' },
              { n: 3, t: isBn ? 'টিম কল করবে' : 'Team calls you', d: isBn ? 'কাজ শেষে দেখিয়ে পেমেন্ট নেব।' : 'After work done, then payment.' },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-heading text-xl font-bold text-white shadow-md">
                  {bn(s.n)}
                </div>
                <h3 className="mt-3 font-heading font-bold">{s.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-emerald-300/50 bg-emerald-50 p-4 text-center dark:bg-emerald-950/30">
            <ShieldCheck className="mx-auto h-6 w-6 text-emerald-600" />
            <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {t('portrait.noAdvanceLong')}
            </p>
          </div>
        </section>

        {/* 10. Order Form + WhatsApp photo button */}
        <section id="order" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{t('landing.placeOrder')}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? 'আপনার ৩D পোর্ট্রেট অর্ডার করুন' : 'Order Your 3D Portrait'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'ফর্ম পূরণ করে অর্ডার কনফার্ম করুন, তারপর ছবি WhatsApp-এ পাঠান।'
                  : 'Fill the form to confirm order, then send photo on WhatsApp.'}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <span className="font-semibold">{t('portrait.selectedLabel')}</span>
                <span className="rounded-full bg-violet-100 px-3 py-0.5 font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                  {isBn ? MATERIALS.find((m) => m.key === material)!.t_bn : MATERIALS.find((m) => m.key === material)!.t_en}
                </span>
                <span className="rounded-full bg-fuchsia-100 px-3 py-0.5 font-bold text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300">
                  {bn(faces)} {isBn ? 'ফেস' : 'face'}{faces > 1 ? (isBn ? '' : 's') : ''}
                </span>
                <span className="font-bold text-violet-600 dark:text-violet-400">৳{bn(price.toLocaleString('en-US'))}</span>
              </div>
            </div>
            <div className="mt-8">
              <LandingLeadForm
                isBn={isBn}
                source="3d_portrait_page"
                serviceName={`3D Portrait — ${MATERIALS.find((m) => m.key === material)!.t_en} · ${faces} face(s) · ৳${price}`}
                submitLabel={t('portrait.confirmOrder')}
                successMessage={isBn
                  ? 'আপনার অর্ডার গ্রহণ করা হয়েছে! এখন ছবি WhatsApp-এ পাঠান। টিম কাজ শেষে দেখিয়ে পেমেন্ট নেবে।'
                  : 'Order received! Now send your photo on WhatsApp. Team will show finished work before payment.'}
              />
            </div>

            {/* WhatsApp photo button — below order confirm */}
            <div className="mt-6">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${waPhotoMessage}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/25 transition-transform hover:scale-[1.01]"
              >
                <Camera className="h-5 w-5" />
                {t('portrait.sendPhotoWhatsapp')}
              </a>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {isBn
                  ? 'আপনি দুটি উপায়ে অর্ডার করতে পারেন: ১. ফর্ম পূরণ করে → তারপর ছবি পাঠান, ২. শুধু ছবি পাঠান'
                  : 'You can order two ways: 1. Fill form → then send photo, 2. Just send photo directly'}
              </p>
            </div>
          </div>
        </section>

        {/* 11. Campaign CTA */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-500" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
              <Flame className="h-4 w-4" /> {t('portrait.limitedOffer')}
            </div>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              {isBn ? 'ক্যাম্পেইন শেষ হওয়ার আগেই অর্ডার করুন!' : 'Order before the campaign ends!'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90">
              {isBn
                ? 'সিঙ্গেল ফেস STL মাত্র ৳৫০০ (নির্ধারিত ৳৩২০০)। অগ্রিম পেমেন্ট নেই।'
                : 'Single face STL just ৳500 (was ৳3,200). No advance payment.'}
            </p>
            <a
              href="#order"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-violet-600 shadow-lg transition-transform hover:scale-105"
            >
              {t('cta.orderNow')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* 12. Success / Trust */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { Icon: ShieldCheck, t: isBn ? '১০০% নিরাপদ' : '100% Safe', d: isBn ? 'অগ্রিম পেমেন্ট নেই।' : 'No advance payment.' },
              { Icon: Clock, t: isBn ? 'দ্রুত ডেলিভারি' : 'Fast delivery', d: isBn ? '৮ ঘণ্টা থেকে ১০ দিন।' : '8 hours to 10 days.' },
              { Icon: Heart, t: isBn ? 'আবেগের সংরক্ষণ' : 'Emotional preservation', d: isBn ? 'প্রজন্মের পর প্রজন্ম।' : 'For generations.' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold">{t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
    </div>
  )
}
