import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services, siteConfig } from '@/lib/site-data'
import { LandingClient } from './landing-client'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) {
    return {
      title: 'Service Not Found',
      robots: { index: false, follow: false },
    }
  }
  return {
    title: `${service.title} — ${siteConfig.name}`,
    description: service.description,
    keywords: [service.title, ...service.features, 'Bangladesh', 'Dhaka', 'Jessore'],
    openGraph: {
      title: `${service.title} — ${siteConfig.name}`,
      description: service.short,
      type: 'website',
    },
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()
  // Pass only serializable fields to the client component
  return (
    <LandingClient
      slug={service.slug}
      title={service.title}
      short={service.short}
      description={service.description}
      features={service.features}
      gradient={service.gradient}
    />
  )
}
