import type { Metadata } from 'next'
import { CncClient } from './cnc-client'

export const metadata: Metadata = {
  title: 'CNC Design Bundle (150TK / 150GB) — NextGen Digital Studio',
  description:
    '১৫০টাকায় ১৫০ জিবি CNC ডিজাইন বান্ডল — রেডিমেড relief, 3D carving, ফার্নিচার, door panel, প্রতিমা ও আরও অনেক কিছু। Get 150GB of ready-to-cut CNC design files for just 150TK — relief, 3D carving, furniture, door panels, idols and more.',
  keywords: [
    'CNC design Bangladesh',
    'CNC relief file',
    'CNC design bundle',
    '150TK CNC design',
    'CNC 3D carving',
    'CNC router file Bangladesh',
  ],
  openGraph: {
    title: 'CNC Design Bundle — 150TK for 150GB',
    description: '150GB of ready-to-cut CNC design files for just 150TK.',
    images: [{ url: '/3d-gallery/2.jpg', width: 1200, height: 630, alt: 'CNC Design Bundle' }],
  },
  alternates: { canonical: '/cnc-design' },
}

export default function CncDesignPage() {
  return <CncClient />
}
