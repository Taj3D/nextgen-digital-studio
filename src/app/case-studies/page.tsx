import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Building2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { caseStudies } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from NextGen Digital Studio Clients",
  description:
    "See how Bangladeshi businesses in real estate, healthcare and e-commerce tripled leads, cut no-shows and recovered revenue with AI sales automation by NextGen Digital Studio.",
  alternates: { canonical: "https://nextgendigitalstudio.com/case-studies" },
  openGraph: {
    title: "NextGen Digital Studio Case Studies",
    description:
      "Real results: tripled leads, 38% fewer no-shows, 12,000+ carts recovered.",
    url: "https://nextgendigitalstudio.com/case-studies",
    type: "website",
  },
};

export default function CaseStudiesIndexPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-dots opacity-50"
          />
          <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span>Case Studies</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Real Results from Real Businesses
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              See how Bangladeshi businesses across real estate, healthcare and
              e-commerce are using AI sales automation to generate qualified
              leads, cut costs and grow revenue — 24/7.
            </p>
          </div>
        </section>

        {/* Case studies grid */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-lg"
              >
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <Building2 className="h-3.5 w-3.5" />
                  {cs.industry}
                </div>
                <h2 className="mt-4 text-lg font-bold leading-snug text-foreground">
                  {cs.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {cs.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 border-t border-border/60 pt-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {m.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Read full case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Want results like these?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Book a free 30-minute strategy session. We&apos;ll audit your
              business and design a custom AI + automation roadmap with clear ROI
              projections — no obligation.
            </p>
            <Link
              href="/#lead-form"
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.03]"
            >
              Get Your Free Strategy Session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
