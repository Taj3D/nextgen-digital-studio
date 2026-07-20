import type { Metadata, Viewport } from "next";
import { Sora, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/site/language-provider";
import { AnalyticsPixels } from "@/components/site/analytics-pixels";
import { siteConfig, faqs } from "@/lib/site-data";

// Premium font stack:
//   Sora            → English display/headings (geometric, modern, premium)
//   Inter           → English body/UI text (industry-standard premium sans)
//   Plus Jakarta    → English fallback for headings
//   MahfujLipi      → Bengali text (custom brand font, loaded via @font-face in globals.css)
//   ForzonDEMO      → English display accent for logo/wordmark (loaded via @font-face)
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextgendigitalstudio.com"),
  title: {
    default: "NextGen Digital Studio — AI Sales Automation Agency in Bangladesh | AI Chatbot, WhatsApp Automation, Lead Generation",
    template: "%s | NextGen Digital Studio",
  },
  description: "AI Sales Automation Agency in Bangladesh. AI chatbots, WhatsApp automation, CRM, lead generation. Free strategy session. 60-day ROI guarantee. Jessore.",
  keywords: [
    "AI sales automation Bangladesh",
    "AI chatbot Bangladesh",
    "AI chatbot Dhaka",
    "AI voice agent Bangladesh",
    "AI voice agent Dhaka",
    "WhatsApp automation Bangladesh",
    "WhatsApp Business API Bangladesh",
    "CRM automation Bangladesh",
    "lead generation Bangladesh",
    "lead generation Dhaka",
    "business automation Bangladesh",
    "business automation Dhaka",
    "AI agency Bangladesh",
    "AI agency Dhaka",
    "AI agency Jessore",
    "NextGen Digital Studio",
    "sales funnel development Bangladesh",
    "performance marketing Bangladesh",
    "AI consultation Bangladesh",
    "website development Bangladesh",
    "website development Dhaka",
    "website development Jessore",
    "landing page design Bangladesh",
    "AI training Bangladesh",
    "CNC design Bangladesh",
    "CNC training Bangladesh",
    "3D portrait Bangladesh",
    "digital marketing Bangladesh",
    "marketing automation Bangladesh",
    "customer service automation Bangladesh",
    "Taj Bhai Jessore",
    "Nazmul Islam Taj",
    "software development Bangladesh",
  ],
  authors: [{ name: "NextGen Digital Studio", url: "https://nextgendigitalstudio.com" }],
  creator: "NextGen Digital Studio",
  publisher: "NextGen Digital Studio",
  alternates: {
    canonical: "https://nextgendigitalstudio.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
    url: "https://nextgendigitalstudio.com",
    siteName: "NextGen Digital Studio",
    title: "NextGen Digital Studio — AI Sales Automation Agency in Bangladesh",
    description: "AI Sales Automation Agency in Bangladesh. AI chatbots, WhatsApp automation, CRM, lead generation. Free strategy session.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGen Digital Studio — AI Sales Automation Agency in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Digital Studio — AI Sales Automation Agency in Bangladesh",
    description: "AI chatbots, WhatsApp automation, CRM, lead generation. Generate qualified leads 24/7. Free strategy session. Jessore, Bangladesh.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NextGen Digital Studio",
      },
    ],
    creator: "@nextgendigital",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NextGen Digital Studio",
  alternateName: "নেক্সটজেন ডিজিটাল স্টুডিও",
  url: "https://nextgendigitalstudio.com",
  logo: "https://nextgendigitalstudio.com/logo.jpg",
  image: "https://nextgendigitalstudio.com/logo.jpg",
  description: "AI Sales Automation Agency in Bangladesh. We help businesses automate marketing, sales, customer communication and operations with Artificial Intelligence. AI chatbots, WhatsApp automation, CRM, lead generation, sales funnels.",
  email: siteConfig.email,
  telephone: `+${siteConfig.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jessore",
    addressRegion: "Khulna",
    addressCountry: "BD",
    streetAddress: "Mia Barir Mor, Sheikhati, New Market, Jessore 7400",
    postalCode: "7400",
  },
  sameAs: [
    "https://www.facebook.com/nextgendigitalstudio",
    "https://www.linkedin.com/in/nextgen-digital-studio",
    "https://github.com/Taj3D",
    "https://instagram.com/nextgendigitalstudio1",
    "https://threads.net/nextgendigitalstudio1",
    "https://www.youtube.com/@NextGenDigitalStudio1",
    "https://x.com/NextGenDigit",
  ],
  founder: {
    "@type": "Person",
    name: "Md. Nazmul Islam Taj",
    alternateName: "Taj Bhai",
    jobTitle: "Founder & CEO",
    worksFor: "NextGen Digital Studio",
  },
  areaServed: ["Bangladesh", "Dhaka", "Chittagong", "Khulna", "Jessore"],
  knowsAbout: [
    "AI Sales Automation",
    "AI Chat Agents",
    "AI Voice Agents",
    "WhatsApp Automation",
    "CRM Automation",
    "Lead Generation",
    "Business Automation",
    "Performance Marketing",
    "Sales Funnel Development",
    "Website Development",
    "Landing Page Design",
    "AI Consultation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${siteConfig.whatsapp}`,
    contactType: "customer service",
    email: siteConfig.email,
    availableLanguage: ["English", "Bengali"],
  },
  priceRange: "৳৳",
  foundingDate: "2023",
  numberOfEmployees: "1-10",
}

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NextGen Digital Studio",
  image: "https://nextgendigitalstudio.com/logo.jpg",
  url: "https://nextgendigitalstudio.com",
  telephone: `+${siteConfig.whatsapp}`,
  email: siteConfig.email,
  priceRange: "৳৳",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jessore",
    addressRegion: "Khulna",
    addressCountry: "BD",
    streetAddress: "Mia Barir Mor, Sheikhati, New Market, Jessore 7400",
    postalCode: "7400",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "23.1707",
    longitude: "89.2117",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Sales Automation Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Lead Capture" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Follow-Up Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Sales Agent (Chatbot)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM + Analytics" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sales Funnel Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Page Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Consultation" } },
    ],
  },
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload premium fonts for fast first paint */}
        <link
          rel="preload"
          href="/fonts/MahfujLipi.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ForzonDEMO-Italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${jakarta.variable} font-body antialiased bg-background text-foreground`}
      >
        <AnalyticsPixels />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
            <SonnerToaster position="bottom-right" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
