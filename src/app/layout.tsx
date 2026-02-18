import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SkipToContent from "@/components/SkipToContent";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bengali font for better Bangla text rendering
const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NextGen Digital Studio - ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) | যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার",
  description: "যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই)। ১৭+ বছরের ইঞ্জিনিয়ারিং অভিজ্ঞতা, ৫০০+ সফল প্রজেক্ট, ১০+ বছর সিএনসি বিশেষজ্ঞ। AI এজেন্ট, মোবাইল অ্যাপ, ওয়েবসাইট, ৩ডি CNC ডিজাইন সেবা।",
  keywords: ["NextGen Digital", "তাজ ভাই", "ডিজিটাল ইঞ্জিনিয়ার", "যশোর", "সিএনসি", "ওয়েবসাইট", "মোবাইল অ্যাপ", "এআই", "AI Agent", "CNC Design", "বাংলাদেশ"],
  authors: [{ name: "ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ" }],
  creator: "ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ",
  publisher: "NextGen Digital Studio",
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  themeColor: "#06b6d4",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NextGen Digital Studio - তাজ ভাই | যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার",
    description: "১৭+ বছরের ইঞ্জিনিয়ারিং অভিজ্ঞতা, ৫০০+ সফল প্রজেক্ট, ১০+ বছর সিএনসি বিশেষজ্ঞ। AI এজেন্ট, মোবাইল অ্যাপ, ওয়েবসাইট, ৩ডি CNC ডিজাইন সেবা।",
    type: "website",
    locale: "bn_BD",
    siteName: "NextGen Digital Studio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200",
        width: 1200,
        height: 630,
        alt: "NextGen Digital Studio - ইঞ্জিনিয়ার তাজ ভাই",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Digital Studio - তাজ ভাই",
    description: "যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার। ১৭+ বছরের অভিজ্ঞতা।",
    images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200"],
  },
  alternates: {
    canonical: "https://nextgendigital.com",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "NextGen Digital Studio",
  "alternateName": "নেক্সটজেন ডিজিটাল স্টুডিও",
  "url": "https://nextgendigital.com",
  "logo": "https://nextgendigital.com/logo.png",
  "image": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200",
  "telephone": "+8801711731354",
  "email": "concept11art@gmail.com",
  "priceRange": "৳১,৫০০ - ৳১,৫০,০০০+",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "পুরাতন কসবা, ঘোষপাড়া",
    "addressLocality": "যশোর",
    "addressRegion": "খুলনা",
    "postalCode": "7400",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.1707",
    "longitude": "89.2139"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Bangladesh"
  },
  "founder": {
    "@type": "Person",
    "name": "মোঃ নাজমুল ইসলাম তাজ",
    "alternateName": "ইঞ্জিনিয়ার তাজ ভাই",
    "jobTitle": "প্রধান ইঞ্জিনিয়ার ও ডিজিটাল আর্কিটেক্ট",
    "description": "যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার, ১৭+ বছরের ইঞ্জিনিয়ারিং অভিজ্ঞতা, ৫০০+ সফল প্রজেক্ট, ১০+ বছর সিএনসি বিশেষজ্ঞ"
  },
  "foundingDate": "2012",
  "description": "যশোরের প্রথম ডিজিটাল ইঞ্জিনিয়ার ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই) এর ডিজিটাল স্টুডিও। ১৭+ বছরের ইঞ্জিনিয়ারিং অভিজ্ঞতা, ৫০০+ সফল প্রজেক্ট, ১০+ বছর সিএনসি বিশেষজ্ঞ। AI এজেন্ট, মোবাইল অ্যাপ, ওয়েবসাইট, ৩ডি CNC ডিজাইন সেবা।",
  "slogan": "ইঞ্জিনিয়ারিং প্রিসিশনে ডিজিটাল সলিউশন",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "ডিজিটাল সার্ভিস",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI এজেন্ট",
          "description": "২৪/৭ বিজনেস অটোমেশন - কাস্টম AI চ্যাটবট, অর্ডার ম্যানেজমেন্ট সিস্টেম"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "BDT",
          "price": "30000"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "মোবাইল অ্যাপ",
          "description": "iOS ও Android অ্যাপ ডেভেলপমেন্ট"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "BDT",
          "price": "50000"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "ওয়েবসাইট",
          "description": "প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "BDT",
          "price": "15000"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "৩ডি সিএনসি ডিজাইন",
          "description": "৩ডি রিলিফ ডিজাইন, ফার্নিচার ডিজাইন, পোর্ট্রেট আর্ট - ১০+ বছর এক্সপার্ট"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "BDT",
          "price": "2000"
        }
      }
    ]
  },
  "sameAs": [
    "https://facebook.com/nextgendigital",
    "https://wa.me/8801711731354"
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "10:00",
    "closes": "22:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500",
    "bestRating": "5"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-hind-siliguri), 'Hind Siliguri', sans-serif" }}
      >
        {/* Skip to Content Link for Accessibility */}
        <SkipToContent />
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
        
        {/* Analytics - Google Analytics, Clarity, Hotjar */}
        <GoogleAnalytics />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
