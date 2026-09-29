'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { SiteFooter } from '@/components/site/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowRight, Loader2, CheckCircle2, ArrowLeft, Stethoscope, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useLang } from '@/components/site/language-provider'

const CATEGORIES = [
  { value: 'business', label: 'Business Growth' },
  { value: 'freelancer', label: 'Freelancer Growth' },
  { value: 'career', label: 'Career & Side-Income' },
  { value: 'entrepreneurship', label: 'Idea & Entrepreneurship' },
  { value: 'student', label: 'Student' },
  { value: 'not_sure', label: 'Not Sure' },
]

const CONSULTING_NEEDS = [
  { value: 'diagnosis', label: 'Problem Diagnosis' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'implementation', label: 'Implementation' },
  { value: 'not_sure', label: 'Not Sure' },
]

const selectClass =
  'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

function ConsultingApplyPageInner() {
  const searchParams = useSearchParams()
  const { t } = useLang()
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [consent, setConsent] = React.useState(false)
  const [category, setCategory] = React.useState('')
  const [consultingNeed, setConsultingNeed] = React.useState('')

  // Pre-select category and consulting need from URL query (?category=business&need=diagnosis)
  React.useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && CATEGORIES.some((c) => c.value === cat)) {
      setCategory(cat)
    }
    const need = searchParams.get('need')
    if (need && CONSULTING_NEEDS.some((n) => n.value === need)) {
      setConsultingNeed(need)
    }
  }, [searchParams])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!consent) {
      toast.error('Please accept the consent checkbox')
      return
    }
    setSubmitting(true)
    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      company: null,
      service: 'NGS Consulting Assessment',
      message: JSON.stringify({
        category,
        currentSituation: String(fd.get('currentSituation') ?? '').trim(),
        biggestProblem: String(fd.get('biggestProblem') ?? '').trim(),
        whatBlocked: String(fd.get('whatBlocked') ?? '').trim(),
        desiredOutcome: String(fd.get('desiredOutcome') ?? '').trim(),
        whatTried: String(fd.get('whatTried') ?? '').trim(),
        whyNow: String(fd.get('whyNow') ?? '').trim(),
        consultingNeed,
      }),
      source: 'consulting_apply_v2',
    }

    if (!payload.name || !payload.email || !payload.phone) {
      toast.error('Please fill all required fields')
      setSubmitting(false)
      return
    }
    if (!category) {
      toast.error('Please select a category')
      setSubmitting(false)
      return
    }
    if (!consultingNeed) {
      toast.error('Please select your consulting need')
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
      setDone(true)
      toast.success('Application submitted!')
      form.reset()
      setCategory('')
      setConsultingNeed('')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <TopBar />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <h1 className="mt-4 font-heading text-2xl font-extrabold">{t('consulting.apply.success.title')}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t('consulting.apply.success.desc')}
            </p>
            <Link href="/consulting">
              <Button variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('consulting.apply.back')}
              </Button>
            </Link>
          </div>
        </main>
        <SiteFooter variant="consulting" />
        <FloatingButtons />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Header band */}
          <div className="border-b border-border/60 bg-gradient-to-br from-emerald-50/70 via-background to-background dark:from-emerald-950/25">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
              <Link
                href="/consulting"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> {t('consulting.apply.back')}
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                <Stethoscope className="h-3.5 w-3.5" /> {t('consulting.badge')}
              </div>
              <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t('consulting.apply.h1')}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t('consulting.apply.subtitle')}
            </p>
            </div>
          </div>

          {/* Form */}
          <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Section: Contact */}
              <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('consulting.apply.contactLegend')}
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">{t('consulting.apply.nameLabel')}</Label>
                    <Input id="name" name="name" required placeholder="আপনার নাম" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">{t('consulting.apply.phoneLabel')}</Label>
                    <Input id="phone" name="phone" required placeholder="01XXXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t('consulting.apply.emailLabel')}</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
              </fieldset>

              {/* Section: Category */}
              <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('consulting.apply.catLegend')}
                </legend>
                <div className="space-y-1.5">
                  <Label>{t('consulting.apply.catLabel')}</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CATEGORIES.map((c) => (
                      <label
                        key={c.value}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                          category === c.value
                            ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                            : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={c.value}
                          checked={category === c.value}
                          onChange={(e) => setCategory(e.target.value)}
                          className="h-4 w-4 accent-emerald-600"
                          required
                        />
                        <span className="font-medium">{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Section: Situation */}
              <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('consulting.apply.sitLegend')}
                </legend>
                <div className="space-y-1.5">
                  <Label htmlFor="currentSituation">{t('consulting.apply.currentSitLabel')}</Label>
                  <Textarea
                    id="currentSituation"
                    name="currentSituation"
                    required
                    rows={3}
                    placeholder="আপনি এখন কোথায় আছেন? আপনার বর্তমান অবস্থা কী? (Career/Business/Freelancing/Entrepreneurship)"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="biggestProblem">{t('consulting.apply.biggestProblemLabel')}</Label>
                  <Textarea
                    id="biggestProblem"
                    name="biggestProblem"
                    required
                    rows={3}
                    placeholder="এই মুহূর্তে আপনার সবচেয়ে বড় Problem কী? যেটা সমাধান হলে সবচেয়ে বেশি relief পাবেন।"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="whatBlocked">{t('consulting.apply.whatBlockedLabel')}</Label>
                  <Textarea
                    id="whatBlocked"
                    name="whatBlocked"
                    rows={3}
                    placeholder="কী কারণে আপনি এখনও এগোতে পারছেন না? কোন constraint, ভয়, বা অজানা কারণ আপনাকে আটকে রাখছে?"
                  />
                </div>
              </fieldset>

              {/* Section: Outcome */}
              <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('consulting.apply.outLegend')}
                </legend>
                <div className="space-y-1.5">
                  <Label htmlFor="desiredOutcome">{t('consulting.apply.desiredOutcomeLabel')}</Label>
                  <Textarea
                    id="desiredOutcome"
                    name="desiredOutcome"
                    required
                    rows={3}
                    placeholder="আপনি কোথায় যেতে চান? আগামী ৩-৬ মাসে কী অর্জন করতে চান?"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="whatTried">{t('consulting.apply.whatTriedLabel')}</Label>
                  <Textarea
                    id="whatTried"
                    name="whatTried"
                    rows={3}
                    placeholder="আগে কী কী চেষ্টা করেছেন? কোথায় আটকে গেছেন? (যদি থাকে)"
                  />
                </div>
              </fieldset>

              {/* Section: Why Now + Consulting Need */}
              <fieldset className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                <legend className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  {t('consulting.apply.whyLegend')}
                </legend>
                <div className="space-y-1.5">
                  <Label htmlFor="whyNow">{t('consulting.apply.whyNowLabel')}</Label>
                  <Textarea
                    id="whyNow"
                    name="whyNow"
                    required
                    rows={3}
                    placeholder="কেন এখন Consulting দরকার? এই মুহূর্তে কী urgency আছে?"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>{t('consulting.apply.needLabel')}</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CONSULTING_NEEDS.map((n) => (
                      <label
                        key={n.value}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                          consultingNeed === n.value
                            ? 'border-emerald-500 bg-emerald-50/60 text-foreground dark:bg-emerald-950/30'
                            : 'border-border/60 bg-background hover:border-emerald-500/40 hover:bg-muted/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="consultingNeed"
                          value={n.value}
                          checked={consultingNeed === n.value}
                          onChange={(e) => setConsultingNeed(e.target.value)}
                          className="h-4 w-4 accent-emerald-600"
                          required
                        />
                        <span className="font-medium">{n.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs italic text-muted-foreground">
                    {t('consulting.apply.needHint')}
                  </p>
                </div>
              </fieldset>

              {/* Consent */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-50/30 p-4 dark:bg-amber-950/10">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-emerald-600"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    <ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-emerald-600" />
                    {t('consulting.apply.consent')}
                  </span>
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting || !consent}
                className="h-12 w-full rounded-xl bg-emerald-600 text-[15px] font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.01] hover:bg-emerald-700 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('consulting.apply.submitting')}
                  </>
                ) : (
                  <>
                    {t('consulting.apply.submit')} <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {t('consulting.apply.confidential')}
              </p>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter variant="consulting" />
      <FloatingButtons />
    </div>
  )
}

// Default export — wraps the inner page in a Suspense boundary because
// useSearchParams() (used inside ConsultingApplyPageInner for ?category=&need= query param pre-selection)
// requires a Suspense boundary for static prerendering per Next.js 16 docs.
export default function ConsultingApplyPage() {
  return (
    <React.Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Loading application form…</div>
      </div>
    }>
      <ConsultingApplyPageInner />
    </React.Suspense>
  )
}
