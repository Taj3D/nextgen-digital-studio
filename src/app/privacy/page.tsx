import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/site-data"
import { LegalFooter } from "@/components/site/legal-footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NextGen Digital Studio — how we collect, use, and protect your data.",
  alternates: { canonical: "https://nextgendigitalstudio.com/privacy" },
  openGraph: {
    title: "Privacy Policy — NextGen Digital Studio",
    description: "Privacy Policy for NextGen Digital Studio — how we collect, use, and protect your data.",
    url: "https://nextgendigitalstudio.com/privacy",
    siteName: "NextGen Digital Studio",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — NextGen Digital Studio",
    description: "How NextGen Digital Studio collects, uses, and protects your personal data.",
  },
}

const sections = [
  { title: "১. ভূমিকা", body: "NextGen Digital Studio (\"আমরা\") আপনার গোপনীয়তাকে গুরুত্ব সহকারে নিই। এই প্রাইভেসি পলিসি ব্যাখ্যা করে যে আমরা আমাদের ওয়েবসাইট এবং সেবার মাধ্যমে আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ, ব্যবহার এবং সুরক্ষিত করি।" },
  { title: "২. আমরা যে তথ্য সংগ্রহ করি", body: "পরিচিতি তথ্য: নাম, ইমেইল, ফোন নম্বর, কোম্পানির নাম (যখন আপনি কন্টাক্ট ফর্ম, স্ট্র্যাটেজি কল বুকিং, বা নিউজলেটার সাবস্ক্রাইব করেন)। চ্যাট তথ্য: আপনি আমাদের AI চ্যাট এজেন্টের সাথে যা শেয়ার করেন। ব্রাউজিং তথ্য: IP ঠিকানা, ব্রাউজার টাইপ, পেজ ভিজিট (Google Analytics এর মাধ্যমে)।" },
  { title: "৩. তথ্য ব্যবহারের উদ্দেশ্য", body: "আপনার জিজ্ঞাসা বা সেবার অনুরোধে সাড়া দিতে, স্ট্র্যাটেজি কল শিডিউল করতে, আমাদের সেবা সম্পর্কে তথ্য প্রদান করতে, ওয়েবসাইট ও সেবার মান উন্নয়ন করতে, এবং প্রতারণা প্রতিরোধ ও নিরাপত্তা নিশ্চিত করতে।" },
  { title: "৪. তথ্য শেয়ারিং", body: "আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না। সেবা প্রদানকারী (Google Analytics, হোস্টিং প্রোভাইডার) এবং আইনি প্রয়োজনে তথ্য শেয়ার করতে পারি।" },
  { title: "৫. তথ্য সুরক্ষা", body: "SSL/TLS এনক্রিপশন, ডেটাবেস অ্যাক্সেস সীমিত, নিয়মিত নিরাপত্তা আপডেট, অফিসিয়াল API ব্যবহার, এবং কর্মীদের গোপনীয়তা চুক্তি।" },
  { title: "৬. কুকিজ", body: "প্রয়োজনীয় কুকিজ (ওয়েবসাইট ফাংশনালিটি), অ্যানালিটিক্স কুকিজ (Google Analytics)। আপনি ব্রাউজার সেটিংস থেকে কুকিজ নিয়ন্ত্রণ করতে পারেন।" },
  { title: "৭. আপনার অধিকার", body: `অ্যাক্সেস, সংশোধন, মুছে ফেলা, অপ্ট-আউট, এবং ডেটা পোর্টেবিলিটি। এই অধিকার ব্যবহার করতে ${siteConfig.email} এ যোগাযোগ করুন।` },
  { title: "৮. যোগাযোগ", body: `NextGen Digital Studio, ${siteConfig.address}, ইমেইল: ${siteConfig.email}, ফোন: ${siteConfig.phone}` },
]

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="NextGen Digital Studio" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
          </Link>
          <span className="h-4 w-px bg-border" />
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> হোমে ফিরুন
          </Link>
          <span className="h-4 w-px bg-border" />
          <h1 className="font-heading text-base font-bold">Privacy Policy</h1>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600/[0.05] to-cyan-500/[0.05] p-6 sm:p-8">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h2>
          <p className="mt-2 text-lg text-muted-foreground">আপনার গোপনীয়তা আমাদের অগ্রাধিকার</p>
          <span className="mt-4 inline-block rounded-full bg-blue-600/10 px-3 py-1 font-semibold text-blue-600 text-xs">সর্বশেষ আপডেট: জানুয়ারি ২০২৫</span>
        </div>
        <div className="mt-8 space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 sm:p-7">
              <h3 className="font-heading text-lg font-bold sm:text-xl">{s.title}</h3>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-blue-600/30 bg-blue-600/[0.04] p-6 text-center">
          <h3 className="font-heading text-lg font-bold">প্রশ্ন আছে?</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">আমাদের সাথে যোগাযোগ করুন।</p>
          <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">ইমেইল করুন</a>
        </div>
      </main>
      <LegalFooter />
    </div>
  )
}
