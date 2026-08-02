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
  courseCode: 'NGS-AI-7D',
  educationalLevel: 'Beginner',
  inLanguage: ['bn', 'en'],
  teaches: [
    'AI Software Building',
    'Prompt Engineering',
    'No-Code Automation',
    'Freelancing',
  ],
  credentialEarned: {
    '@type': 'EducationalOccupationalCredential',
    name: 'AI Builder Certificate',
    credentialCategory: 'Certificate of Completion',
  },
  url: 'https://nextgendigitalstudio.com/ai-training',
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
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Bangladesh University',
  },
  award: ['Google Certified', 'Top Rated Freelancer — Upwork'],
  knowsLanguage: ['bn', 'en'],
  nationality: { '@type': 'Country', name: 'Bangladesh' },
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: 'https://schema.org/UserInteraction',
    userInteractionCount: 1700,
  },
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

/**
 * Organization schema (V4) — NextGen Digital Studio entity. Strengthens
 * Knowledge Panel eligibility and brand entity recognition for E-E-A-T.
 */
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://nextgendigitalstudio.com/#organization',
  name: 'NextGen Digital Studio',
  url: 'https://nextgendigitalstudio.com',
  foundingDate: '2009',
  founder: { '@type': 'Person', name: 'MD. Nazmul Islam Taj' },
  logo: 'https://nextgendigitalstudio.com/ng-logo.jpeg',
  image: 'https://nextgendigitalstudio.com/ng-logo.jpeg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mia Bari Mor, Sheikhati, New Market',
    addressLocality: 'Jessore',
    addressRegion: 'Khulna',
    postalCode: '7400',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://www.linkedin.com/in/nextgen-digital-studio',
    'https://github.com/Taj3D',
    'https://www.facebook.com/nextgendigitalstudio',
    'https://www.youtube.com/@nextgendigitalstudio',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Bengali', 'English'],
      telephone: '+8801XXXXXXXXX',
      description: 'WhatsApp support — 10 AM to 10 PM BST',
      url: 'https://wa.me/8801XXXXXXXXX',
    },
  ],
}

/**
 * VideoObject schema (V4) — founder intro video (90 sec). Eligible for
 * Google Video rich results and Discover surfacing.
 */
const videoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'AI Software Builder Bootcamp — Founder Intro (90 sec)',
  description:
    'BN: ৯০ সেকেন্ডে ফাউন্ডার পরিচিতি — MD. Nazmul Islam Taj (NextGen Digital Studio)। EN: 90-second founder intro for the AI Software Builder Bootcamp by MD. Nazmul Islam Taj.',
  thumbnailUrl: 'https://nextgendigitalstudio.com/founder.png',
  uploadDate: '2026-07-01',
  duration: 'PT1M30S',
  contentUrl: 'https://nextgendigitalstudio.com/videos/founder-intro.mp4',
  embedUrl: 'https://nextgendigitalstudio.com/embed/founder-intro',
  publisher: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nextgendigitalstudio.com/ng-logo.jpeg',
    },
  },
  creator: { '@type': 'Person', name: 'MD. Nazmul Islam Taj' },
  inLanguage: ['bn', 'en'],
}

/**
 * ItemList schema (V4) — 4-module curriculum with day milestones. Eligible
 * for carousel rich results in SERPs and Discover surfacing.
 */
const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Software Builder Bootcamp — Curriculum (4 Modules, 7 Days)',
  description:
    '4 progressive modules across 7 days covering AI fundamentals, no-code software building, automation, and freelancing.',
  numberOfItems: 4,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Module 1: AI Foundations & Prompt Engineering (Day 1-2)',
      description:
        'Understand AI fundamentals, master prompt engineering patterns, and set up your AI dev environment.',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Module 2: No-Code AI Software Building (Day 3-4)',
      description:
        'Build your first AI software without coding using no-code tools, templates, and structured workflows.',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Module 3: Automation & Business Workflows (Day 5)',
      description:
        'Automate business workflows with AI: lead capture, customer support, content generation, and reporting.',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Module 4: Freelancing & Client Acquisition (Day 6-7)',
      description:
        'Land your first AI client, price your services, build a portfolio, and start earning with freelancing.',
    },
  ],
}

export const metadata: Metadata = {
  title: 'AI Software Builder Bootcamp Bangladesh — 7 Days, 1000 BDT | NextGen',
  description:
    'Bangladesh top AI Software Builder Bootcamp — build software with AI in 7 days, no coding required. Live Zoom classes daily 9 PM, lifetime resources. 1,700+ students trained, 5.0/5 rating. Only 1000 BDT — next live batch Aug 15, 2026.',
  keywords: [
    'AI Software Builder Bootcamp Bangladesh',
    'AI training Bangladesh',
    'AI ট্রেইনিং',
    'AI course Jessore',
    'AI freelancing course Jessore',
    'AI bootcamp Bangladesh',
    'AI course online',
    'AI software builder',
    'no-code AI course',
    'no-code AI course Bangla',
    'chatbot training',
    'automation course Bangla',
    'AI automation training BD',
    'AI architect training',
    '7 day AI bootcamp',
  ],
  openGraph: {
    title: 'AI Software Builder Bootcamp Bangladesh — Build Software with AI in 7 Days',
    description:
      'No coding required. Bangladesh top 7-day AI bootcamp. Live Zoom + lifetime resources. 1,700+ students trained, 5.0/5 rating. Only 1000 BDT (85% OFF).',
    type: 'website',
    url: 'https://nextgendigitalstudio.com/ai-training',
    siteName: 'NextGen Digital Studio',
    locale: 'bn_BD',
    alternateLocale: ['en_US'],
    images: [
      {
        url: 'https://nextgendigitalstudio.com/images/og-bootcamp.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Software Builder Bootcamp Bangladesh',
      },
      {
        url: 'https://nextgendigitalstudio.com/founder.png',
        width: 1024,
        height: 1024,
        alt: 'Founder MD. Nazmul Islam Taj — AI Software Builder Bootcamp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NextGenDigitalStudio',
    creator: '@NextGenDigitalStudio',
    title: 'AI Software Builder Bootcamp Bangladesh — 1000 BDT, 7 Days',
    description:
      'Build software with AI in 7 days — no coding required. Bangladesh top AI bootcamp. 85% OFF limited time.',
    images: [
      'https://nextgendigitalstudio.com/images/og-bootcamp.jpg',
      'https://nextgendigitalstudio.com/founder.png',
    ],
  },
  alternates: { canonical: '/ai-training' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <TrainingClient />
    </>
  )
}
