import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/site/language-provider";
import { BookingProvider } from "@/components/site/booking-modal";
import { AnalyticsPixels } from "@/components/site/analytics-pixels";
import { siteConfig, faqs } from "@/lib/site-data";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — AI Sales Automation Agency in Bangladesh`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI sales automation Bangladesh",
    "AI chatbot Bangladesh",
    "AI voice agent Dhaka",
    "WhatsApp automation Bangladesh",
    "CRM automation",
    "lead generation Bangladesh",
    "business automation Dhaka",
    "AI agency Bangladesh",
    "NextGen Digital Studio",
    "sales funnel development",
    "performance marketing Bangladesh",
    "AI consultation",
    "website development Dhaka",
    "landing page design",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — AI Sales Automation Agency in Bangladesh`,
    description:
      "Automate marketing, sales, customer communication and operations with AI. Generate qualified leads and book strategy calls.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — AI Sales Automation Agency in Bangladesh`,
    description: siteConfig.description,
    images: ["/og-image.svg"],
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
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "যশোর",
    addressRegion: "খুলনা",
    addressCountry: "BD",
    streetAddress: "মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট",
    postalCode: "7400",
  },
  sameAs: [
    siteConfig.facebook,
    siteConfig.linkedin,
    siteConfig.github,
    siteConfig.instagram,
    siteConfig.threads,
    siteConfig.youtube,
    siteConfig.twitter,
  ],
  founder: {
    "@type": "Person",
    name: "ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ",
    alternateName: "তাজ ভাই",
  },
  areaServed: "Bangladesh",
  knowsAbout: [
    "AI Sales Automation",
    "AI Chat Agents",
    "AI Voice Agents",
    "WhatsApp Automation",
    "CRM Automation",
    "Lead Generation",
    "Business Automation",
    "Performance Marketing",
  ],
}

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  image: `${siteConfig.url}/og-image.svg`,
  priceRange: "৳৳",
  address: {
    "@type": "PostalAddress",
    addressLocality: "যশোর",
    addressRegion: "খুলনা",
    addressCountry: "BD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
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
        className={`${jakarta.variable} ${inter.variable} font-body antialiased bg-background text-foreground`}
      >
        <AnalyticsPixels />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <BookingProvider>
              {children}
              <Toaster />
              <SonnerToaster position="bottom-right" />
            </BookingProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
