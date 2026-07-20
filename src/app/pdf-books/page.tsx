import type { Metadata } from 'next'
import { BooksClient } from './books-client'

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Premium PDF Books Bundle — 5 Books',
  description:
    '5 premium PDF books covering AI, digital marketing, CNC design, automation and business growth. Each book just 170TK — buy 1 get 1 free. All 5 books bundle for 850TK.',
  brand: {
    '@type': 'Brand',
    name: 'NextGen Digital Studio',
  },
  image: 'https://nextgendigitalstudio.com/logo.jpg',
  offers: [
    {
      '@type': 'Offer',
      name: 'Single PDF Book (Buy 1 Get 1 Free)',
      price: '170',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      url: 'https://nextgendigitalstudio.com/pdf-books',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
    {
      '@type': 'Offer',
      name: 'All 5 PDF Books Bundle',
      price: '850',
      priceCurrency: 'BDT',
      availability: 'https://schema.org/InStock',
      url: 'https://nextgendigitalstudio.com/pdf-books',
      seller: { '@type': 'Organization', name: 'NextGen Digital Studio' },
    },
  ],
}

export const metadata: Metadata = {
  title: 'PDF Books Bundle — 5 Books, Buy 1 Get 1 Free (170TK each)',
  description:
    '5 premium PDF books — each 170TK, buy 1 get 1 free! Complete guides on AI, digital marketing, CNC design, automation and growth.',
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <BooksClient />
    </>
  )
}
