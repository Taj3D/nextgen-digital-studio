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
    '1-week CNC 3D design training — just 250TK, daily 9 PM. Relief, carving, furniture & door panel design. Order now + free chair leg file!',
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
