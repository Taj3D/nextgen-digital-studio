import type { Metadata } from 'next'
import { FounderClient } from './founder-client'

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Md. Nazmul Islam Taj',
  alternateName: 'Taj Bhai',
  jobTitle: 'Founder & CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
  },
  url: 'https://nextgendigitalstudio.com/founder',
  image: 'https://nextgendigitalstudio.com/founder.png',
  sameAs: [
    'https://www.facebook.com/nextgendigitalstudio',
    'https://www.linkedin.com/in/nextgen-digital-studio',
    'https://github.com/Taj3D',
    'https://instagram.com/nextgendigitalstudio1',
    'https://www.youtube.com/@NextGenDigitalStudio1',
    'https://x.com/NextGenDigit',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jessore',
    addressRegion: 'Khulna',
    addressCountry: 'BD',
  },
  knowsAbout: [
    'AI Sales Automation',
    'AI Chat Agents',
    'AI Voice Agents',
    'WhatsApp Automation',
    'CRM Automation',
    'Lead Generation',
    'Business Automation',
    '3D Design',
    'CNC Design',
  ],
}

export const metadata: Metadata = {
  title: 'তাজ ভাই — Founder of NextGen Digital Studio | Md. Nazmul Islam Taj',
  description:
    'পরিচয় করুন মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই)-এর সাথে — যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার, NextGen Digital Studio-এর প্রতিষ্ঠাতা, এবং AI Sales Automation বিশেষজ্ঞ। Meet Taj Bhai — Jessore first digital engineer, founder of NextGen Digital Studio.',
  keywords: [
    'Taj Bhai',
    'তাজ ভাই',
    'Nazmul Islam Taj',
    'NextGen Digital Studio founder',
    'Jessore digital engineer',
    'AI automation Bangladesh',
  ],
  openGraph: {
    title: 'তাজ ভাই — Founder of NextGen Digital Studio',
    description:
      'Meet Md. Nazmul Islam Taj (Taj Bhai) — Jessore first digital engineer & founder of NextGen Digital Studio.',
    images: [{ url: '/founder.png', width: 1024, height: 1024, alt: 'Taj Bhai' }],
  },
  alternates: { canonical: '/founder' },
}

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <FounderClient />
    </>
  )
}
