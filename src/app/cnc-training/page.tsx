import type { Metadata } from 'next'
import { CncTrainingClient } from './cnc-training-client'

const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'CNC 3D Design Training',
  description:
    '1-week CNC 3D design training — just 250TK, daily 9 PM. Learn relief, carving, furniture & door panel design. Order now and get a free chair leg design file. 7 projects in 7 days with certificate.',
  provider: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    sameAs: 'https://nextgendigitalstudio.com',
  },
  offers: {
    '@type': 'Offer',
    price: '250',
    priceCurrency: 'BDT',
  },
  url: 'https://nextgendigitalstudio.com/cnc-training',
  inLanguage: ['bn', 'en'],
}

export const metadata: Metadata = {
  title: 'CNC 3D Design Training — 1 Week (250TK) at 9 PM + Free Chair Leg Design',
  description:
    '১ সপ্তাহের CNC 3D ডিজাইন ট্রেইনিং — মাত্র ২৫০ টাকা, প্রতিদিন রাত ৯টায়। relief, carving, ফার্নিচার ও door panel ডিজাইন শিখুন। অর্ডার করলেই একটি chair leg design সম্পূর্ণ ফ্রি! 1-week CNC 3D design training — just 250TK, daily 9 PM. Learn relief, carving, furniture & door panel design. Order now and get a free chair leg design!',
  keywords: [
    'CNC training Bangladesh',
    'CNC ট্রেইনিং',
    '3D CNC design course',
    'CNC relief training',
    'Aspire CNC',
    'Vectric CNC training Bangla',
  ],
  openGraph: {
    title: 'CNC 3D Design Training — 1 Week (250TK) + Free Chair Leg',
    description: '1-week CNC 3D design training. Just 250TK. Daily 9 PM. + Free chair leg design.',
  },
  alternates: { canonical: '/cnc-training' },
}

export default function CncTrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />
      <CncTrainingClient />
    </>
  )
}
