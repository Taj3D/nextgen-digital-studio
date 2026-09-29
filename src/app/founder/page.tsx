import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MD Nazmul Islam Taj (Taj Bhai) — Founder | NextGen Digital Studio',
  description: 'MD Nazmul Islam Taj — Founder, NextGen Digital Studio. Consulting | Training | Digital Solutions। Students, Freelancers, Business Owners ও Entrepreneurs-এর জন্য strategy, practical training ও digital solutions।',
  keywords: [
    'Taj Bhai',
    'Nazmul Islam Taj',
    'NextGen Digital Studio founder',
    'Consulting Bangladesh',
    'Training Bangladesh',
    'Digital Solutions Bangladesh',
    'Founder Jessore',
  ],
  openGraph: {
    title: 'MD Nazmul Islam Taj — Founder, NextGen Digital Studio',
    description: 'Consulting | Training | Digital Solutions। Founder-led, verified information only।',
    type: 'profile',
    url: 'https://nextgendigitalstudio.com/founder',
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: 'MD Nazmul Islam Taj — Founder, NextGen Digital Studio' }],
  },
  alternates: { canonical: 'https://nextgendigitalstudio.com/founder' },
}

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-background">
      <iframe
        src="/founder-enterprise.html"
        className="w-full"
        style={{ minHeight: '100vh', border: 'none' }}
        title="Founder — MD Nazmul Islam Taj"
      />
    </div>
  )
}
