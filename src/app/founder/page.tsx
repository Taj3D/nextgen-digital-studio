import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) — AI Business Strategist | NextGen Digital Studio',
  description: 'মোঃ নাজমুল ইসলাম তাজ — বাংলাদেশের AI বিজনেস স্ট্র্যাটেজিস্ট। ১২০+ ক্লায়েন্ট, ২.৪M+ অটোমেটেড কথোপকথন। NextGen Digital Studio-এর প্রতিষ্ঠাতা।',
  keywords: [
    'AI Expert Bangladesh',
    'AI Consultant Bangladesh',
    'Business Automation Consultant',
    'AI Speaker Bangladesh',
    'AI Trainer Bangladesh',
    'AI Business Strategist',
    'Taj Bhai',
    'Nazmul Islam Taj',
    'NextGen Digital Studio founder',
    'AI automation Bangladesh',
  ],
  openGraph: {
    title: 'মোঃ নাজমুল ইসলাম তাজ — AI Business Strategist | NextGen Digital Studio',
    description: 'বাংলাদেশের AI বিজনেস ট্রান্সফরমেশন স্ট্র্যাটেজিস্ট। NextGen Digital Studio-এর প্রতিষ্ঠাতা।',
    type: 'profile',
    url: 'https://nextgendigitalstudio.com/founder',
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: 'Taj Bhai — AI Business Strategist' }],
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
        title="Founder — Taj Bhai"
      />
    </div>
  )
}
