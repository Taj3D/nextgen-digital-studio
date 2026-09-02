'use client'

import * as React from 'react'
import { TopBar } from '@/components/site/top-bar'
import { FloatingButtons } from '@/components/site/floating-buttons'
import { SiteFooter } from '@/components/site/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowRight, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ConsultingApplyPage() {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [consent, setConsent] = React.useState(false)

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
      company: String(fd.get('category') ?? '').trim() || null,
      service: 'NGS Consulting Assessment',
      message: JSON.stringify({
        category: fd.get('category'),
        currentSituation: fd.get('currentSituation'),
        biggestProblem: fd.get('biggestProblem'),
        desiredOutcome: fd.get('desiredOutcome'),
        whatTried: fd.get('whatTried'),
        whyNow: fd.get('whyNow'),
        consultingNeed: fd.get('consultingNeed'),
      }),
      source: 'consulting_apply',
    }
    if (!payload.name || !payload.email || !payload.phone) {
      toast.error('Please fill all required fields')
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
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
            <h1 className="mt-4 font-heading text-2xl font-bold">Application Received!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              আপনার Consulting Assessment request গ্রহণ করা হয়েছে। আমরা আপনার information review করে ২ ঘন্টার মধ্যে যোগাযোগ করব।
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Application ≠ Automatic Acceptance</p>
            <Link href="/consulting">
              <Button variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Consulting
              </Button>
            </Link>
          </div>
        </main>
        <SiteFooter />
        <FloatingButtons />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <Link href="/consulting" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Consulting
          </Link>

          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Consulting Assessment Request</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            আপনার Situation বিস্তারিত জানান। আমরা review করে যোগাযোগ করব।
          </p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>নাম *</Label>
                <Input name="name" required placeholder="আপনার নাম" />
              </div>
              <div className="space-y-1.5">
                <Label>ফোন / WhatsApp *</Label>
                <Input name="phone" required placeholder="01XXXXXXXXX" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>ইমেইল *</Label>
                <Input name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <select name="category" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Select...</option>
                  <option value="Business Growth">Business Growth</option>
                  <option value="Freelancer Growth">Freelancer Growth</option>
                  <option value="Career & Side-Income">Career & Side-Income</option>
                  <option value="Idea & Entrepreneurship">Idea & Entrepreneurship</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Current Situation</Label>
              <Textarea name="currentSituation" rows={2} placeholder="আপনি এখন কোথায় আছেন?" />
            </div>

            <div className="space-y-1.5">
              <Label>Biggest Problem</Label>
              <Textarea name="biggestProblem" rows={2} placeholder="আপনার সবচেয়ে বড় Problem কী?" />
            </div>

            <div className="space-y-1.5">
              <Label>Desired Outcome</Label>
              <Textarea name="desiredOutcome" rows={2} placeholder="আপনি কোথায় যেতে চান?" />
            </div>

            <div className="space-y-1.5">
              <Label>What have you tried?</Label>
              <Textarea name="whatTried" rows={2} placeholder="আগে কী চেষ্টা করেছেন?" />
            </div>

            <div className="space-y-1.5">
              <Label>Why now?</Label>
              <Textarea name="whyNow" rows={2} placeholder="কেন এখন Consulting চান?" />
            </div>

            <div className="space-y-1.5">
              <Label>Consulting Need</Label>
              <select name="consultingNeed" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option value="Not Sure">Not Sure</option>
                <option value="Problem Diagnosis">Problem Diagnosis</option>
                <option value="Strategy">Strategy</option>
                <option value="Implementation">Implementation</option>
              </select>
            </div>

            <label className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/30 p-4">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border"
              />
              <span className="text-xs text-muted-foreground">
                আমি বুঝি যে Consulting কোনো guaranteed income/result promise নয় এবং আমাকে আমার Situation সম্পর্কে accurate information দিতে হবে।
              </span>
            </label>

            <Button
              type="submit"
              disabled={submitting || !consent}
              className="h-12 w-full rounded-xl bg-emerald-600 text-[15px] font-semibold text-white shadow-lg shadow-emerald-600/25 transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                <>Request My Consulting Assessment <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>
        </section>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  )
}
