'use client'

import * as React from 'react'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import {
  LandingEyebrow,
  LandingFooter,
  LandingSocials,
  WhatsAppCTA,
  usePageViewTracking,
} from '@/components/site/landing-common'
import { useLang } from '@/components/site/language-provider'
import { PaymentInstructions } from '@/components/site/payment-instructions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BookOpen, Gift, Download, Star, Loader2, CheckCircle2, ArrowRight, Brain, DollarSign, Building, User, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

type Book = {
  id: number
  titleEn: string
  titleBn: string
  descEn: string
  descBn: string
  pages: number
  emoji: string
  color: string
  Icon: typeof Brain
}

const BOOKS: Book[] = [
  {
    id: 1,
    titleEn: 'Mind Training',
    titleBn: 'মাইন্ড ট্রেনিং',
    descEn: 'Train your mind for success, focus, and resilience.',
    descBn: 'সফলতা, ফোকাস ও মানসিক শক্তির জন্য মাইন্ড ট্রেনিং।',
    pages: 120,
    emoji: '🧠',
    color: 'from-blue-500 to-cyan-500',
    Icon: Brain,
  },
  {
    id: 2,
    titleEn: 'Money Psychology',
    titleBn: 'মানি সাইকোলজি',
    descEn: 'How money works in your brain — earn, save, grow.',
    descBn: 'টাকা কীভাবে কাজ করে — আয়, সঞ্চয়, বৃদ্ধির মনস্তত্ত্ব।',
    pages: 140,
    emoji: '💰',
    color: 'from-emerald-500 to-teal-500',
    Icon: DollarSign,
  },
  {
    id: 3,
    titleEn: 'Business Branding',
    titleBn: 'বিজনেস ব্র্যান্ডিং',
    descEn: 'Build a brand that customers trust and remember.',
    descBn: 'এমন ব্র্যান্ড তৈরি করুন যা কাস্টমার বিশ্বাস করে ও মনে রাখে।',
    pages: 110,
    emoji: '🏢',
    color: 'from-violet-500 to-purple-500',
    Icon: Building,
  },
  {
    id: 4,
    titleEn: 'Personal Branding',
    titleBn: 'পার্সোনাল ব্র্যান্ডিং',
    descEn: 'Become the go-to person in your field.',
    descBn: 'আপনার ক্ষেত্রে সবার প্রথম পছন্দ হয়ে উঠুন।',
    pages: 95,
    emoji: '👤',
    color: 'from-amber-500 to-orange-500',
    Icon: User,
  },
  {
    id: 5,
    titleEn: 'Sales Psychology',
    titleBn: 'সেলস সাইকোলজি',
    descEn: 'Why people buy — and how to sell without pushing.',
    descBn: 'মানুষ কেন কেনে — এবং কীভাবে চাপ না দিয়ে বিক্রি করবেন।',
    pages: 130,
    emoji: '📈',
    color: 'from-rose-500 to-pink-500',
    Icon: TrendingUp,
  },
]

const ALL_FIVE_PRICE = 850

/** Convert ASCII digits to Bengali digits when lang === 'bn'. */
const bn = (s: string | number, isBn: boolean) =>
  isBn
    ? String(s).replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])
    : String(s)

export function BooksClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const [selectedBook, setSelectedBook] = React.useState<string>('all')
  usePageViewTracking('pdf_books_page')

  const selectedLabel = React.useMemo(() => {
    if (selectedBook === 'all') return isBn ? 'সব ৫টি বই (৮৫০টাকা)' : 'All 5 Books (850TK)'
    const b = BOOKS.find((x) => x.id === Number(selectedBook))
    return b ? `${isBn ? b.titleBn : b.titleEn} (170TK)` : ''
  }, [selectedBook, isBn])

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <TopBar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-background to-background dark:from-rose-950/30" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
            <LandingEyebrow>
              <Gift className="h-3 w-3" /> {isBn ? '🔥 প্রতিটি বই মাত্র ১৭০ টাকা! ১টি কিনুন, ১টি ফ্রি পান!' : '🔥 Each book just 170TK! Buy 1, Get 1 Free!'}
            </LandingEyebrow>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {isBn ? (
                <>
                  ৫টি আলাদা <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">PDF বই</span>
                  <br />
                  প্রতিটি মাত্র <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">১৭০ টাকা</span>
                </>
              ) : (
                <>
                  5 Separate <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">PDF Books</span>
                  <br />
                  Each Just <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">170TK</span>
                </>
              )}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {isBn
                ? '৫টি আলাদা বই। প্রতিটি মাত্র ১৭০ টাকা। ১টি কিনলেই ১টি ফ্রি! সব ৫টি কিনলে ৮৫০ টাকা।'
                : '5 separate books. Each just 170TK. Buy 1 get 1 free! All 5 for 850TK.'}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <WhatsAppCTA
                isBn={isBn}
                message={isBn ? 'আসসালামু আলাইকুম, আমি PDF বই অর্ডার করতে চাই। প্রতিটি ১৭০ টাকা, ১টি কিনুন ১টি ফ্রি।' : 'Hi, I want to order PDF books. Each 170TK, buy 1 get 1 free.'}
              />
              <LandingSocials />
            </div>
          </div>
        </section>

        {/* Books grid */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {BOOKS.map((b) => (
              <div
                key={b.id}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-transform hover:scale-[1.02]"
              >
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${b.color}`}>
                  <div className="absolute inset-0 opacity-30 bg-grid" />
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {b.emoji}
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white backdrop-blur">
                    {b.pages} {isBn ? 'পৃষ্ঠা' : 'pages'}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <b.Icon className="h-4 w-4 text-rose-500" />
                    <h3 className="font-heading text-lg font-bold">{isBn ? b.titleBn : b.titleEn}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{isBn ? b.descBn : b.descEn}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold">৳{bn('170', isBn)}</span>
                      <span className="text-xs text-muted-foreground line-through">৳{bn('350', isBn)}</span>
                    </div>
                    <a
                      href="#order-form"
                      onClick={() => setSelectedBook(String(b.id))}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      {isBn ? 'অর্ডার' : 'Order'}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Bonus card */}
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-rose-300 bg-rose-50 p-6 text-center dark:border-rose-900 dark:bg-rose-950/30">
              <Gift className="h-12 w-12 text-rose-500" />
              <h3 className="mt-3 font-heading text-lg font-bold">
                {isBn ? 'কিনুন ১, পান ১ ফ্রি' : 'Buy 1, Get 1 Free'}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'যেকোনো ১টি বই কিনলে ফ্রি পাবেন ১টি বিখ্যাত ব্যক্তির বই (মূল্য ৫০০-১৫০০ টাকা)।'
                  : 'Buy any 1 book — get a FREE book by a famous person (worth 500-1500TK).'}
              </p>
            </div>
          </div>

          {/* All 5 bundle */}
          <div className="mt-8 rounded-3xl border-2 border-rose-400/50 bg-gradient-to-br from-rose-50 to-pink-50 p-6 text-center dark:from-rose-950/30 dark:to-pink-950/20">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="font-heading text-xl font-bold">
                  {isBn ? 'সব ৫টি বই একসাথে' : 'All 5 Books Bundle'}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isBn ? 'মাইন্ড ট্রেনিং, মানি সাইকোলজি, বিজনেস ব্র্যান্ডিং, পার্সোনাল ব্র্যান্ডিং, সেলস সাইকোলজি' : 'Mind Training, Money Psychology, Business Branding, Personal Branding, Sales Psychology'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">৳{bn('850', isBn)}</div>
                  <div className="text-xs text-muted-foreground line-through">৳{bn('1,750', isBn)}</div>
                </div>
                <a
                  href="#order-form"
                  onClick={() => setSelectedBook('all')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                >
                  {isBn ? 'সব অর্ডার করুন' : 'Order All'}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                { Icon: Download, t: isBn ? 'তাৎক্ষণিক ডাউনলোড' : 'Instant download', d: isBn ? 'পেমেন্টের সাথে সাথে।' : 'Right after payment.' },
                { Icon: Star, t: isBn ? 'প্রিমিয়াম কোয়ালিটি' : 'Premium quality', d: isBn ? 'প্রফেশনাল এডিটিং।' : 'Professional editing.' },
                { Icon: BookOpen, t: isBn ? 'বাংলা ও ইংরেজি' : 'Bangla & English', d: isBn ? 'উভয় ভাষায়।' : 'In both languages.' },
                { Icon: Gift, t: isBn ? 'ফ্রি বোনাস বই' : 'Free bonus book', d: isBn ? 'প্রতিটি অর্ডারে।' : 'On every order.' },
              ].map(({ Icon, t, d }, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-background p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-pink-500 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold">{t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order Form with book selection dropdown */}
        <section id="order-form" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
          <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-lg sm:p-8">
            <div className="text-center">
              <LandingEyebrow>{isBn ? 'অর্ডার ফর্ম' : 'Order Form'}</LandingEyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold">
                {isBn ? 'যেকোনো বই অর্ডার করুন' : 'Order Any Book'}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isBn
                  ? 'ফর্ম পূরণ করুন, আমরা ২ ঘন্টায় যোগাযোগ করে পেমেন্ট ও ডাউনলোড লিংক পাঠাব।'
                  : 'Fill the form. We will reach out within 2 hours with payment + download link.'}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs dark:bg-rose-950/40">
                <Gift className="h-3 w-3 text-rose-500" />
                <span className="text-rose-700 dark:text-rose-300">
                  {isBn ? 'প্রতিটি অর্ডারে একটি ফ্রি বই পাবেন' : '+ 1 free book with every order'}
                </span>
              </div>
            </div>
            <div className="mt-8">
              <BookOrderForm isBn={isBn} selectedBook={selectedBook} setSelectedBook={setSelectedBook} selectedLabel={selectedLabel} />
            </div>
            <div className="mt-6 flex justify-center">
              <WhatsAppCTA
                isBn={isBn}
                message={isBn ? 'আসসালামু আলাইকুম, আমি PDF বই অর্ডার করতে চাই। প্রতিটি ১৭০ টাকা, ১টি কিনুন ১টি ফ্রি।' : 'Hi, I want to order PDF books. Each 170TK, buy 1 get 1 free.'}
              />
            </div>
          </div>
        </section>
      </main>

      <LandingFooter isBn={isBn} />
      <FloatingButtons />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Book order form with dropdown selector                                    */
/* -------------------------------------------------------------------------- */

function BookOrderForm({
  isBn,
  selectedBook,
  setSelectedBook,
  selectedLabel,
}: {
  isBn: boolean
  selectedBook: string
  setSelectedBook: (v: string) => void
  selectedLabel: string
}) {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim() || null,
      service: selectedLabel,
      message: String(fd.get('message') ?? '').trim() || null,
      source: 'pdf_books_page',
    }
    if (!payload.name || !payload.email || !payload.phone) {
      toast.error(isBn ? 'অনুগ্রহ করে সব প্রয়োজনীয় ঘর পূরণ করুন' : 'Please fill all required fields')
      setSubmitting(false)
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'lead',
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          source: 'pdf_books_page',
          email: payload.email,
          phone: payload.phone,
          name: payload.name,
        }),
      }).catch(() => {})
      setDone(true)
      toast.success(isBn ? 'সফলভাবে জমা হয়েছে!' : 'Submission successful!')
      form.reset()
    } catch {
      toast.error(isBn ? 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন' : 'Something went wrong, please try again')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-6 py-10 text-center">
        <CheckCircle2 className="mb-3 h-12 w-12 text-emerald-500" />
        <h3 className="font-heading text-xl font-bold">
          {isBn ? 'ধন্যবাদ! আপনার অর্ডার গ্রহণ করা হয়েছে।' : 'Thank you! Your order has been received.'}
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {isBn
            ? `আপনার অর্ডার: ${selectedLabel}। আমাদের টিম ২ ঘন্টার মধ্যে যোগাযোগ করবে।`
            : `Your order: ${selectedLabel}. Our team will contact you within 2 hours.`}
        </p>
        <div className="w-full max-w-md text-left">
          <PaymentInstructions
            isBn={isBn}
            amount={selectedBook === 'all' ? 850 : 170}
            note={isBn ? 'পেমেন্টের পর ডাউনলোড লিংক পাবেন' : 'Download link sent after payment'}
          />
        </div>
        <Button variant="outline" className="mt-4" onClick={() => setDone(false)}>
          {isBn ? 'আরেকটি অর্ডার' : 'Send another order'}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* Book selection dropdown */}
      <div className="space-y-1.5">
        <Label htmlFor="book-select">
          {isBn ? 'বই নির্বাচন করুন *' : 'Select Book *'}
        </Label>
        <select
          id="book-select"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="all">
            {isBn ? `সব ৫টি বই (৮৫০টাকা)` : `All 5 Books (850TK)`}
          </option>
          {BOOKS.map((b) => (
            <option key={b.id} value={String(b.id)}>
              {isBn
                ? `${b.id}. ${b.titleBn} (১৭০টাকা)`
                : `${b.id}. ${b.titleEn} (170TK)`}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="pb-name">{isBn ? 'নাম *' : 'Full name *'}</Label>
          <Input id="pb-name" name="name" required placeholder={isBn ? 'আপনার নাম' : 'Your name'} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pb-phone">{isBn ? 'ফোন / হোয়াটসঅ্যাপ *' : 'Phone / WhatsApp *'}</Label>
          <Input id="pb-phone" name="phone" required placeholder="+880 1XXX-XXXXXX" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pb-email">{isBn ? 'ইমেইল *' : 'Email *'}</Label>
          <Input id="pb-email" name="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pb-company">{isBn ? 'কোম্পানি' : 'Company'}</Label>
          <Input id="pb-company" name="company" placeholder={isBn ? 'কোম্পানির নাম' : 'Company name'} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pb-message">{isBn ? 'আপনার ফ্রি বই (যদি চান)' : 'Your free book (if wanted)'}</Label>
        <Textarea
          id="pb-message"
          name="message"
          rows={2}
          placeholder={isBn ? 'কোন ফ্রি বই চান লিখুন...' : 'Mention which free book you want...'}
        />
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className="h-12 w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 text-[15px] font-semibold shadow-lg shadow-rose-600/25 transition-transform hover:scale-[1.01]"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isBn ? 'পাঠানো হচ্ছে...' : 'Submitting...'}
          </>
        ) : (
          <>
            {isBn ? 'অর্ডার করুন' : 'Place Order'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
