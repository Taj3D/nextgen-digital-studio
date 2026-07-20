import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { blogPosts, siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Blog — AI Sales Automation Insights for Bangladeshi Businesses",
  description:
    "Practical guides on AI sales automation, WhatsApp automation, CRM, lead generation and AI voice agents — written for Bangladeshi SMEs by NextGen Digital Studio.",
  alternates: { canonical: "https://nextgendigitalstudio.com/blog" },
  openGraph: {
    title: "NextGen Digital Studio Blog",
    description:
      "Practical AI sales automation insights for Bangladeshi businesses.",
    url: "https://nextgendigitalstudio.com/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
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
              <Sparkles className="h-4 w-4" />
              <span>NextGen Digital Studio · Blog</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              AI Sales Automation Insights
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Practical, no-fluff guides on how Bangladeshi businesses are using
              AI chatbots, WhatsApp automation, CRM and voice agents to close
              more deals — 24/7.
            </p>
          </div>
        </section>

        {/* Posts list */}
        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-lg sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-600 dark:text-emerald-400">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold leading-snug text-foreground sm:text-2xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-emerald-500 transition-transform group-hover:translate-x-1 sm:mt-1 sm:block" />
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to automate your growth?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Book a free 30-minute strategy session. We&apos;ll audit your
              business and design a custom AI + automation roadmap — no
              obligation.
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
