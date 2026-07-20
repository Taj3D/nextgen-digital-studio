import type { Metadata } from 'next'
import { TrainingClient } from './training-client'

const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI Sales Automation Training',
  description:
    '1-week intensive AI training — just 1000TK, daily 9 PM. AI agents, chatbots, automation, marketing — all hands-on. 4 live modules, recordings, hands-on project, course certificate, private support group, lifetime resources.',
  provider: {
    '@type': 'Organization',
    name: 'NextGen Digital Studio',
    sameAs: 'https://nextgendigitalstudio.com',
  },
  offers: {
    '@type': 'Offer',
    price: '1000',
    priceCurrency: 'BDT',
  },
  url: 'https://nextgendigitalstudio.com/ai-training',
  inLanguage: ['bn', 'en'],
}

export const metadata: Metadata = {
  title: 'AI Training — 1 Week Course (1000TK) at 9 PM',
  description:
    '1-week intensive AI training — just 1000TK, daily 9 PM. AI agents, chatbots, automation, marketing — all hands-on. 4 live modules.',
  keywords: [
    'AI training Bangladesh',
    'AI ট্রেইনিং',
    'AI course Jessore',
    'AI course online',
    'chatbot training',
    'automation course Bangla',
  ],
  openGraph: {
    title: 'AI Training — 1 Week Course (1000TK) at 9 PM',
    description: '1-week intensive AI training. Just 1000TK. Daily 9 PM. Hands-on.',
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
      <TrainingClient />
    </>
  )
}
