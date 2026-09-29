import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react"
import { blogPosts, siteConfig } from "@/lib/site-data"

// Blog detail pages are dynamic (content not in data model yet)
export const dynamic = "force-dynamic"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlogPost = (typeof blogPosts)[number] & { author?: string; content?: { heading: string; body: string }[] }

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Article Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug) as BlogPost | undefined
  if (!post) notFound()

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)
  const author = post.author ?? "তাজ ভাই"
  const sections = post.content ?? [
    { heading: post.title, body: post.excerpt },
  ]

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/#blog" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরুন
          </Link>
          <span className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground">NextGen Digital Studio · Blog</span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-xs font-bold text-white">
              তাজ
            </span>
            <div>
              <p className="text-sm font-bold">{author}</p>
              <p className="text-xs text-muted-foreground">প্রতিষ্ঠাতা · NextGen Digital Studio</p>
            </div>
          </div>
        </div>

        {/* Hero banner */}
        <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <p className="text-center font-heading text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {post.title}
            </p>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            {post.category}
          </span>
        </div>

        {/* Article content */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-foreground/90 sm:text-base">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-600/[0.06] to-cyan-500/[0.06] p-6 text-center sm:p-8">
          <Sparkles className="mx-auto h-8 w-8 text-blue-600" />
          <h3 className="mt-3 font-heading text-xl font-bold sm:text-2xl">
            আপনার ব্যবসায় AI অটোমেশন চান?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            ফ্রি স্ট্র্যাটেজি কল বুক করুন — আমরা আপনার ব্যবসার জন্য কাস্টম AI রোডম্যাপ তৈরি করব।
          </p>
          <Link
            href={`/#contact`}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.02]"
          >
            স্ট্র্যাটেজি কল বুক করুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-5 font-heading text-xl font-bold">আরও পড়ুন</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-blue-600/40 hover:shadow-lg"
                >
                  <span className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
                    {rp.category}
                  </span>
                  <h4 className="mt-2 font-heading text-sm font-bold leading-snug group-hover:text-blue-600">
                    {rp.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{rp.excerpt}</p>
                  <span className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {rp.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.address}
        </p>
      </article>
    </div>
  )
}
