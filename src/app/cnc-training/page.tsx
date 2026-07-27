import type { Metadata } from 'next'
import { CncTrainingClient } from './cnc-training-client'
import { FAQS, TESTIMONIALS, CNC_COURSE, BONUSES, CURRICULUM } from './cnc-data'

// IMPORTANT: must match site-config url in src/lib/site-data.ts and sitemap.ts
const BASE_URL = 'https://nextgendigitalstudio.com'

/* -------------------------------------------------------------------------- */
/*  JSON-LD Structured Data — rich results in Google                          */
/* -------------------------------------------------------------------------- */

// 1. Course Schema — Google "Course" rich result
const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'CNC 3D Design Bootcamp — ৭ দিনে প্রফেশনাল CNC ডিজাইনার',
  description:
    'বাংলাদেশের সবচেয়ে Practical CNC 3D Design Bootcamp। ৭ দিনে ১৫+ প্রজেক্ট, লাইভ জুম ক্লাস (রাত ৯টা), সার্টিফিকেট + ফ্রি Chair Leg Design ফাইল। Aspire, Vectric, ArtCAM — ইন্ডাস্ট্রি-স্ট্যান্ডার্ড সফটওয়্যার শিখুন। মাত্র ২৫০ টাকা।',
  provider: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    sameAs: BASE_URL,
    url: BASE_URL,
  },
  instructor: {
    '@type': 'Person',
    name: CNC_COURSE.instructorName,
    jobTitle: 'CNC Design Specialist & Founder',
    worksFor: { '@type': 'Organization', name: 'NextGen Digital Studio' },
  },
  offers: {
    '@type': 'Offer',
    price: String(CNC_COURSE.price),
    priceCurrency: CNC_COURSE.currency,
    availability: 'https://schema.org/InStock',
    url: `${BASE_URL}/cnc-training`,
    validFrom: '2026-07-20',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT10H30M',
    instructor: {
      '@type': 'Person',
      name: CNC_COURSE.instructorName,
    },
    location: { '@type': 'Place', name: 'Online (Zoom)', address: 'Bangladesh' },
  },
  educationalLevel: 'Beginner to Intermediate',
  inLanguage: ['bn', 'en'],
  url: `${BASE_URL}/cnc-training`,
  syllabus: CURRICULUM.map(
    (c) => `Day ${c.day}: ${c.title} — ${c.project}`,
  ).join('; '),
}

// 2. FAQ Schema — rich FAQ snippets (40+ Q&As)
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// 3. Breadcrumb Schema
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'CNC 3D Design Bootcamp', item: `${BASE_URL}/cnc-training` },
  ],
}

// 4. Review Schema — star ratings + student testimonials
const reviewLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'CNC 3D Design Bootcamp',
  description:
    '7-day live CNC 3D design bootcamp — 15+ projects, certificate, free chair leg file. Aspire, Vectric, ArtCAM.',
  brand: { '@type': 'Brand', name: 'NextGen Digital Studio' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(CNC_COURSE.rating),
    reviewCount: String(CNC_COURSE.students),
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    price: String(CNC_COURSE.price),
    priceCurrency: CNC_COURSE.currency,
    availability: 'https://schema.org/InStock',
  },
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.author },
    reviewBody: t.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(t.rating),
      bestRating: '5',
      worstRating: '1',
    },
  })),
}

// 5. Organization + LocalBusiness Schema — E-E-A-T authority
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'NextGen Digital Studio',
  alternateName: 'NextGen CNC Training Academy',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpg`,
  description:
    "Bangladesh's most practical CNC 3D Design training academy. Live Zoom classes, real projects, industry-grade curriculum.",
  foundingDate: '2023',
  foundingLocation: { '@type': 'Place', name: 'Jessore, Khulna, Bangladesh' },
  founder: {
    '@type': 'Person',
    name: CNC_COURSE.instructorName,
    jobTitle: 'Founder & CNC Design Specialist',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jessore',
    addressRegion: 'Khulna',
    addressCountry: 'BD',
  },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  sameAs: [
    'https://www.facebook.com/nextgendigitalstudio',
    'https://www.youtube.com/@NextGenDigitalStudio1',
    'https://instagram.com/nextgendigitalstudio1',
  ],
}

// 6. Instructor / Person Schema — E-E-A-T expertise
const instructorLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: CNC_COURSE.instructorName,
  alternateName: 'Taj Bhai',
  jobTitle: 'CNC Design Specialist & Founder',
  worksFor: { '@type': 'Organization', name: 'NextGen Digital Studio' },
  url: `${BASE_URL}/founder`,
  knowsAbout: [
    'CNC 3D Design',
    'Aspire Software',
    'Vectric CNC',
    'ArtCAM',
    'Furniture Design',
    'Relief Sculpting',
    'Toolpath Programming',
    'G-code',
  ],
  nationality: 'Bangladeshi',
  description: `${CNC_COURSE.experienceYears}+ years CNC design experience, ${CNC_COURSE.students}+ students trained, ${CNC_COURSE.factories}+ factory collaborations, ${CNC_COURSE.designFiles}+ design files created.`,
}

// 7. Video Schema — founder VSL (YouTube)
const FOUNDER_VIDEO_ID = 'o3S_SM6b2Tg'
const videoLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'CNC 3D Designer হওয়ার সম্পূর্ণ রোডম্যাপ — Founder Video',
  description:
    '৩ মিনিটে জানুন কীভাবে ৭ দিনে প্রফেশনাল CNC ডিজাইনার হবেন — NextGen Digital Studio প্রতিষ্ঠাতা তাজ ভাইয়ের গাইড।',
  thumbnailUrl: `https://i.ytimg.com/vi/${FOUNDER_VIDEO_ID}/hqdefault.jpg`,
  uploadDate: '2025-01-15',
  duration: 'PT3M',
  contentUrl: `https://www.youtube.com/watch?v=${FOUNDER_VIDEO_ID}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${FOUNDER_VIDEO_ID}`,
}

export const metadata: Metadata = {
  title: 'CNC 3D Design Bootcamp — ৭ দিনে প্রফেশনাল CNC ডিজাইনার | ২৫০ টাকা | NextGen',
  description:
    'বাংলাদেশের সবচেয়ে Practical CNC 3D Design Bootcamp। ৭ দিনে ১৫+ প্রজেক্ট, লাইভ জুম ক্লাস (রাত ৯টা), সার্টিফিকেট + ফ্রি Chair Leg Design ফাইল। Aspire, Vectric, ArtCAM। মাত্র ২৫০ টাকা।',
  keywords: [
    'CNC training Bangladesh',
    'CNC ট্রেইনিং বাংলাদেশ',
    'CNC 3D design course',
    'CNC relief training',
    'Aspire CNC training Bangla',
    'Vectric Aspire tutorial',
    'ArtCAM training Bangladesh',
    'Chair Leg design',
    'Door panel design',
    'Furniture design course',
    'CNC freelancing Bangladesh',
    'CNC machine operator training',
  ],
  alternates: { canonical: '/cnc-training' },
  openGraph: {
    title: 'CNC 3D Design Bootcamp — ৭ দিনে প্রফেশনাল CNC ডিজাইনার (২৫০ টাকা)',
    description:
      '৭ দিনে ১৫+ প্রজেক্ট, লাইভ জুম ক্লাস, সার্টিফিকেট + ফ্রি Chair Leg ফাইল। Aspire, Vectric, ArtCAM। মাত্র ২৫০ টাকা।',
    url: '/cnc-training',
    siteName: 'NextGen Digital Studio',
    type: 'website',
    locale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNC 3D Design Bootcamp — ২৫০ টাকা | NextGen',
    description: '৭ দিনে প্রফেশনাল CNC ডিজাইনার হোন। ১৫+ প্রজেক্ট + সার্টিফিকেট + ফ্রি Chair Leg ফাইল।',
  },
  robots: { index: true, follow: true },
}

export default function CncTrainingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(instructorLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
      />
      <CncTrainingClient />
    </>
  )
}
