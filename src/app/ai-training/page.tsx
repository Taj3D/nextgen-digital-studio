import type { Metadata } from 'next'
import { TrainingClient } from './training-client'

/**
 * Course schema (enhanced for v2.0) — adds aggregateRating, instructor,
 * courseInstance, and offer availability to maximize rich-result eligibility.
 */
const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI Software Builder Bootcamp — NextGen Digital Studio',
  description:
    '1-week intensive AI training — just 1000TK, daily 9 PM. Learn to build software with AI — no coding required. 4 live modules, hands-on projects, course certificate, private support group, lifetime resources.',
  provider: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    sameAs: 'https://nextgendigitalstudio.com',
  },
  instructor: {
    '@type': 'Person',
    name: 'Taj Bhai',
    jobTitle: 'AI Implementation Specialist',
    worksFor: { '@type': 'Organization', name: 'NextGen Digital Studio' },
  },
  offers: {
    '@type': 'Offer',
    price: '1000',
    priceCurrency: 'BDT',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-07-01',
    url: 'https://nextgendigitalstudio.com/ai-training',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    startDate: '2026-08-11',
    endDate: '2026-08-17',
    duration: 'P7D',
    instructor: { '@type': 'Person', name: 'Taj Bhai' },
    location: {
      '@type': 'VirtualLocation',
      url: 'https://zoom.us',
    },
  },
  url: 'https://nextgendigitalstudio.com/ai-training',
  inLanguage: ['bn', 'en'],
}

/**
 * FAQ schema — gives Google rich-result snippets for the FAQ section,
 * boosting CTR from search results.
 */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I take this course without knowing coding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, taught from absolute scratch. No coding knowledge needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I miss a live class?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every class is recorded — watch anytime.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I get a certificate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you get an "AI Builder" certificate after course completion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the money-back guarantee work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Request a full refund within 24 hours of the first class if unsatisfied.',
      },
    },
  ],
}

export const metadata: Metadata = {
  title: 'AI Software Builder Bootcamp — 1 Week (1000TK) | NextGen',
  description:
    'Build your own software with AI — no coding required. 1-week intensive bootcamp, daily 9 PM live Zoom, hands-on projects, 3 bonuses. Just 1000TK (85% OFF, was 3000TK). Limited seats.',
  keywords: [
    'AI training Bangladesh',
    'AI ট্রেইনিং',
    'AI course Jessore',
    'AI bootcamp Bangladesh',
    'AI course online',
    'AI software builder',
    'no-code AI course',
    'chatbot training',
    'automation course Bangla',
    'AI architect training',
  ],
  openGraph: {
    title: 'AI Software Builder Bootcamp — Build Software with AI in 1 Week',
    description:
      'No coding required. 1-week intensive AI bootcamp. Live Zoom + 3 bonuses. Only 1000TK (85% OFF).',
    type: 'website',
    url: 'https://nextgendigitalstudio.com/ai-training',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Software Builder Bootcamp — 1000TK, 1 Week',
    description: 'Build your own software with AI — no coding required. 85% OFF limited time.',
  },
  alternates: { canonical: '/ai-training' },
}

export default function AiTrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <TrainingClient />
    </>
  )
}
