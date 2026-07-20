import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { caseStudies } from "@/lib/site-data"
import { CaseStudyDetailClient } from "./case-study-detail-client"

// Case study detail pages are dynamic (extended fields not in type yet)
export const dynamic = "force-dynamic"

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) return { title: "Case Study Not Found" }

  return {
    title: cs.title,
    description: cs.summary,
    alternates: {
      canonical: `https://nextgendigitalstudio.com/case-studies/${slug}`,
    },
    openGraph: {
      title: cs.title,
      description: cs.summary,
      url: `https://nextgendigitalstudio.com/case-studies/${slug}`,
      type: "article",
    },
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const cs = caseStudies.find((c) => c.slug === slug)
  if (!cs) notFound()

  return <CaseStudyDetailClient slug={slug} />
}
