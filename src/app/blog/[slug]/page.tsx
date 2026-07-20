import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { blogPosts } from "@/lib/site-data"
import { BlogDetailClient } from "./blog-detail-client"

// Blog detail pages are dynamic (content not in data model yet)
export const dynamic = "force-dynamic"

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
    alternates: {
      canonical: `https://nextgendigitalstudio.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://nextgendigitalstudio.com/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return <BlogDetailClient slug={slug} />
}
