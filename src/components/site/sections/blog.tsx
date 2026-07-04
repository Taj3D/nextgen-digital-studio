'use client'

import { Reveal, Eyebrow } from "../reveal"
import { ArrowRight, Clock } from "lucide-react"
import { blogPosts } from "@/lib/site-data"
import { useBooking } from "../booking-modal"
import { useLang } from "../language-provider"

export function Blog() {
  const { openWith } = useBooking()
  const { t, tr } = useLang()
  const [featured, ...rest] = blogPosts
  return (
    <section id="blog" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>{t('blog.eyebrow')}</Eyebrow>
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {t('blog.title1')} <span className="text-gradient">{t('blog.title2')}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('blog.subtitle')}
            </p>
          </div>
          <button
            onClick={() => openWith("Blog / newsletter")}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
          >
            Subscribe to updates <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Featured post */}
          <Reveal>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card card-hover hover:border-blue-600/40 hover:shadow-2xl hover:shadow-blue-600/5">
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <p className="font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                    {tr(featured.title)}
                  </p>
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-600">
                  {featured.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readTime}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tr(featured.excerpt)}
                </p>
                <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          </Reveal>

          {/* Smaller posts */}
          <div className="grid gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <article className="group flex h-full gap-4 rounded-2xl border border-border/60 bg-card p-4 card-hover hover:border-blue-600/40 sm:p-5">
                  <div className="relative hidden aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 sm:block">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-[11px] font-bold leading-tight text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-blue-600/10 px-2 py-0.5 font-semibold text-blue-600">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-base font-bold leading-snug group-hover:text-blue-600">
                      {tr(post.title)}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                      {tr(post.excerpt)}
                    </p>
                    <span className="mt-2 text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
