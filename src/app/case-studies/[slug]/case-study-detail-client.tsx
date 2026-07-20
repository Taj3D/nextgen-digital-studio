'use client'

import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, TrendingUp, ArrowRight, Quote, AlertCircle, Lightbulb } from "lucide-react"
import { caseStudies, siteConfig } from "@/lib/site-data"
import { useLang } from "@/components/site/language-provider"

export function CaseStudyDetailClient({ slug }: { slug: string }) {
  const { t, tr, lang } = useLang()

  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  const isBn = lang === 'bn'
  const related = caseStudies.filter((c) => c.slug !== slug).slice(0, 3)
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/case-studies" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t('caseStudies.backToCaseStudies')}
          </Link>
          <span className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground">{tr(cs.client)}</span>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Hero */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
            <TrendingUp className="h-3.5 w-3.5" /> {tr(cs.industry)}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {tr(cs.title)}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{tr(cs.summary)}</p>
        </div>

        {/* Metrics */}
        <div className="mb-10 grid grid-cols-3 gap-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-border/60 bg-card p-5 text-center">
              <p className="font-heading text-3xl font-extrabold text-gradient sm:text-4xl">{tr(m.value)}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{tr(m.label)}</p>
            </div>
          ))}
        </div>

        {/* Challenge */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertCircle className="h-5 w-5" />
            </span>
            <h2 className="font-heading text-xl font-bold sm:text-2xl">{t('caseStudies.challenge')}</h2>
          </div>
          <div className="prose prose-slate mt-4 max-w-none dark:prose-invert prose-p:text-[15px] prose-p:leading-relaxed sm:prose-p:text-base prose-p:text-foreground/90">
            <p>{cs.challenge}</p>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
              <Lightbulb className="h-5 w-5" />
            </span>
            <h2 className="font-heading text-xl font-bold sm:text-2xl">{t('caseStudies.solution')}</h2>
          </div>
          <div className="prose prose-slate mt-4 max-w-none dark:prose-invert prose-p:text-[15px] prose-p:leading-relaxed sm:prose-p:text-base prose-p:text-foreground/90">
            <p>{cs.solution}</p>
          </div>
        </section>

        {/* Results */}
        <section className="mb-10">
          <div className="overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.05] p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-700 dark:text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-xl font-bold sm:text-2xl text-emerald-700 dark:text-emerald-400">{t('caseStudies.results')}</h2>
            </div>
            <div className="prose prose-emerald mt-4 max-w-none dark:prose-invert prose-p:text-[15px] prose-p:leading-relaxed sm:prose-p:text-base prose-p:text-foreground/90 prose-p:font-medium prose-strong:text-emerald-700 dark:prose-strong:text-emerald-400">
              <p>{cs.results}</p>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-10">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
            <Quote className="h-8 w-8 text-blue-600/20" />
            <div className="prose prose-slate mt-2 max-w-none dark:prose-invert prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed prose-p:text-foreground">
              <p>&ldquo;{cs.testimonial.quote}&rdquo;</p>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
                {cs.testimonial.author.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-bold">{cs.testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{cs.testimonial.title}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services used */}
        <section className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('caseStudies.servicesUsed')}</h3>
          <div className="flex flex-wrap gap-2">
            {cs.services.map((s) => (
              <span key={s} className="rounded-full bg-blue-600/10 px-3 py-1.5 text-sm font-medium text-blue-600">
                {tr(s)}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-center text-white sm:p-8">
          <h3 className="font-heading text-xl font-bold sm:text-2xl">{t('caseStudies.detailCtaTitle')}</h3>
          <p className="mt-2 text-sm text-blue-50/90">
            {t('caseStudies.detailCtaDesc')}
          </p>
          <Link
            href="/#lead-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:scale-[1.02]"
          >
            {t('caseStudies.detailCtaButton')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-5 font-heading text-xl font-bold">{t('caseStudies.relatedTitle')}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/case-studies/${rc.slug}`}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-blue-600/40 hover:shadow-lg"
                >
                  <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
                    {tr(rc.industry)}
                  </span>
                  <h4 className="mt-2 font-heading text-sm font-bold leading-snug group-hover:text-blue-600">
                    {tr(rc.title)}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{tr(rc.summary)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {year} {lang === 'bn' ? 'নেক্সটজেন ডিজিটাল স্টুডিও' : siteConfig.name} · {siteConfig.address}
        </p>
      </article>
    </div>
  )
}
