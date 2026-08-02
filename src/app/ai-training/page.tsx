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
    name: 'MD. Nazmul Islam Taj',
    alternateName: ['তাজ ভাই', 'Nazmul Islam Taj', 'Md. Nazmul Islam Taj'],
    jobTitle: 'Founder & Lead Instructor',
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
    reviewCount: '1700',
    bestRating: '5',
    worstRating: '1',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    startDate: '2026-08-15',
    endDate: '2026-08-21',
    duration: 'P7D',
    instructor: { '@type': 'Person', name: 'MD. Nazmul Islam Taj' },
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

/**
 * Person schema (founder/instructor) — strengthens entity recognition
 * for MD. Nazmul Islam Taj and boosts E-E-A-T signals.
 */
const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'MD. Nazmul Islam Taj',
  alternateName: ['তাজ ভাই', 'Nazmul Islam Taj', 'Md. Nazmul Islam Taj'],
  jobTitle: 'Founder & Lead Instructor',
  worksFor: { '@type': 'Organization', name: 'NextGen Digital Studio' },
  url: 'https://nextgendigitalstudio.com/founder',
  image: 'https://nextgendigitalstudio.com/founder.png',
  sameAs: [
    'https://www.linkedin.com/in/nextgen-digital-studio',
    'https://github.com/Taj3D',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Automation',
    'No-Code Development',
    'Prompt Engineering',
    'Software Development',
  ],
}

/**
 * BreadcrumbList schema — renders breadcrumb rich result in SERPs.
 */
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://nextgendigitalstudio.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'AI Training',
      item: 'https://nextgendigitalstudio.com/ai-training',
    },
  ],
}

/**
 * Event schema — live bootcamp batch. Eligible for Google "Events" rich
 * results and Discover surfacing.
 */
const eventLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'AI Software Builder Bootcamp — Live Batch August 2026',
  startDate: '2026-08-15T21:00:00+06:00',
  endDate: '2026-08-21T22:00:00+06:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: {
    '@type': 'VirtualLocation',
    url: 'https://zoom.us',
  },
  image: 'https://nextgendigitalstudio.com/images/og-bootcamp.jpg',
  description:
    '1-week intensive AI bootcamp — build software with AI, no coding required. Live Zoom classes daily 9 PM.',
  offers: {
    '@type': 'Offer',
    price: '1000',
    priceCurrency: 'BDT',
    availability: 'https://schema.org/InStock',
    url: 'https://nextgendigitalstudio.com/ai-training',
  },
  organizer: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    url: 'https://nextgendigitalstudio.com',
  },
  performer: {
    '@type': 'Person',
    name: 'MD. Nazmul Islam Taj',
  },
}

/**
 * Review schema (V3) — individual student reviews for rich-result eligibility
 * and stronger E-E-A-T signals.
 */
const reviewLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AI Software Builder Bootcamp',
  description:
    '1-week intensive AI training — build software with AI, no coding required.',
  brand: { '@type': 'Brand', name: 'NextGen Digital Studio' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '1700',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Rakib Hasan' },
      datePublished: '2026-07-15',
      reviewBody:
        '7 দিনে আমি নিজের AI চ্যাটবট বানাতে পেরেছি। কোডিং জানতাম না, তবুও পেরেছি।',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sumaiya Akter' },
      datePublished: '2026-07-20',
      reviewBody:
        'প্রথম ক্লায়েন্ট পেয়েছি এই কোর্সের পর। বোনাসের প্রম্পট লাইব্রেরি অসম্ভব কাজের।',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Tanvir Ahmed' },
      datePublished: '2026-07-22',
      reviewBody:
        'আমি চাকরি করতাম, এখন ফ্রিল্যান্সে সুইচ করেছি। ১,০০০ টাকা ছিল সেরা ইনভেস্টমেন্ট।',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
  offers: {
    '@type': 'Offer',
    price: '1000',
    priceCurrency: 'BDT',
    availability: 'https://schema.org/InStock',
    url: 'https://nextgendigitalstudio.com/ai-training',
  },
}

/**
 * Speakable schema (V3) — marks hero headline + summary for voice assistants
 * (Google Assistant, Alexa) and smart-speaker SERP surfacing.
 */
const speakableLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Software Builder Bootcamp',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.speakable-summary'],
  },
  url: 'https://nextgendigitalstudio.com/ai-training',
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
    images: [
      {
        url: 'https://nextgendigitalstudio.com/images/og-bootcamp.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Software Builder Bootcamp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Software Builder Bootcamp — 1000TK, 1 Week',
    description: 'Build your own software with AI — no coding required. 85% OFF limited time.',
    images: ['https://nextgendigitalstudio.com/images/og-bootcamp.jpg'],
  },
  alternates: { canonical: '/ai-training' },
  other: { 'theme-color': '#f59e0b' },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableLd) }}
      />
      <TrainingClient />
    </>
  )
}
