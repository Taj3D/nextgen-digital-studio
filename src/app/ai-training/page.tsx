import type { Metadata } from 'next'
import { TrainingClient } from './training-client'

export const metadata: Metadata = {
  title: 'AI Training — 1 Week Course (1000TK) at 9 PM | NextGen Digital Studio',
  description:
    '১ সপ্তাহের ইনটেনসিভ AI ট্রেইনিং — মাত্র ১০০০ টাকা, প্রতিদিন রাত ৯টায়। AI এজেন্ট, চ্যাটবট, অটোমেশন, মার্কেটিং — সব হাতে-কলমে শিখুন। 1-week intensive AI training — just 1000TK, daily 9 PM. AI agents, chatbots, automation, marketing — all hands-on.',
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
  return <TrainingClient />
}
