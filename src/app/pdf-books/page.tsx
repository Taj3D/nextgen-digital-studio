import type { Metadata } from 'next'
import { BooksClient } from './books-client'

export const metadata: Metadata = {
  title: 'PDF Books Bundle — 5 Books, Buy 1 Get 1 Free (170TK each)',
  description:
    '৫টি প্রিমিয়াম PDF বই — প্রতিটি মাত্র ১৭০টাকা, এবং কিনলেই আরেকটি ফ্রি! AI, ডিজিটাল মার্কেটিং, CNC ডিজাইন, অটোমেশন ও ব্যবসায়িক গ্রোথ নিয়ে সম্পূর্ণ গাইড। 5 premium PDF books — each only 170TK, buy 1 get 1 free! Complete guides on AI, digital marketing, CNC design, automation and business growth.',
  keywords: [
    'PDF book Bangladesh',
    'PDF বই',
    'digital marketing PDF',
    'AI guide Bangla',
    'CNC design book',
    'business automation ebook',
  ],
  openGraph: {
    title: 'PDF Books Bundle — 5 Books, Buy 1 Get 1 Free',
    description: '5 premium PDF books. Each 170TK. Buy 1 get 1 free!',
  },
  alternates: { canonical: '/pdf-books' },
}

export default function PdfBooksPage() {
  return <BooksClient />
}
