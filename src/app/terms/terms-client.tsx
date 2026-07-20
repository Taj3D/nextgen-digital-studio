'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/site-data"
import { LegalFooter } from "@/components/site/legal-footer"
import { useLang } from "@/components/site/language-provider"

type Section = { title: string; body: string }

const sectionsEn: Section[] = [
  {
    title: "1. Introduction & Acceptance",
    body: `By using the NextGen Digital Studio website and services, you agree to these terms. Founder: Engineer Md. Najmul Islam Taj (Taj Bhai), Address: Mia Bari Mor, Sheikhati, New Market, Jessore.`,
  },
  {
    title: "2. Service Description",
    body: `AI sales automation, AI chat/voice agents, CRM automation, WhatsApp automation, lead generation, performance marketing, sales funnels, business automation, website and landing page design, and AI consultation.`,
  },
  {
    title: "3. Pricing & Payment",
    body: `Starter: ৳25,000/month, Growth: ৳60,000/month, Enterprise: custom. Monthly plans are payable at the start of each month. Projects: 50% advance, 50% on delivery. bKash, Nagad, bank transfer, and Stripe are accepted.`,
  },
  {
    title: "4. 60-Day ROI Guarantee",
    body: `If you don't receive qualified leads in the first 60 days, we will continue working for free until you get results. Monthly plans are cancelable at any time — no long-term contracts.`,
  },
  {
    title: "5. Refund Policy",
    body: `Monthly plans: cancellation does not refund the current month's fee; no further charges will apply. Projects: advance payment is refundable before work starts (5% processing fee). Software: refundable within 7 days.`,
  },
  {
    title: "6. Intellectual Property & Copyright",
    body: `Custom code: client ownership after final payment. Our templates: owned by NextGen. Case studies: used in portfolio with the client's permission.`,
  },
  {
    title: "7. Contact Us",
    body: `NextGen Digital Studio, ${siteConfig.address}, Email: ${siteConfig.email}, Phone: ${siteConfig.phone}`,
  },
]

const sectionsBn: Section[] = [
  { title: "১. ভূমিকা ও গ্রহণ", body: "NextGen Digital Studio এর ওয়েবসাইট এবং সেবা ব্যবহার করে আপনি এই শর্তাবলী গ্রহণ করছেন। প্রতিষ্ঠাতা: ইঞ্জিনিয়ার মোঃ নাজমুল ইসলাম তাজ (তাজ ভাই), ঠিকানা: মিয়া বাড়ীর মোড়, শেখহাটি, নিউমার্কেট, যশোর।" },
  { title: "২. সেবার বর্ণনা", body: "AI সেলস অটোমেশন, AI চ্যাট/ভয়েস এজেন্ট, CRM অটোমেশন, WhatsApp অটোমেশন, লিড জেনারেশন, পারফরম্যান্স মার্কেটিং, সেলস ফানেল, বিজনেস অটোমেশন, ওয়েবসাইট ও ল্যান্ডিং পেজ ডিজাইন, AI কনসালটেশন।" },
  { title: "৩. প্রাইসিং ও পেমেন্ট", body: "Starter: ৳২৫,০০০/মাস, Growth: ৳৬০,০০০/মাস, Enterprise: কাস্টম। মাসিক প্ল্যান প্রতি মাসের শুরুতে পরিশোধ্য। প্রজেক্ট: ৫০% অগ্রিম, ৫০% ডেলিভারির সময়। bKash, Nagad, ব্যাংক ট্রান্সফার, Stripe গ্রহণযোগ্য।" },
  { title: "৪. ৬০-দিনের ROI প্রতিশ্রুতি", body: "প্রথম ৬০ দিনে যোগ্য লিড না পেলে আমরা ফ্রিতে কাজ চালিয়ে যাব যতক্ষণ না আপনি ফলাফল পান। মাসিক প্ল্যান যেকোনো সময় বাতিলযোগ্য, কোনো দীর্ঘ চুক্তি নেই।" },
  { title: "৫. রিফান্ড পলিশি", body: "মাসিক প্ল্যান: বাতিল করলে চলতি মাসের ফি ফেরত পাবেন না, পরবর্তী মাসে চার্জ হবে না। প্রজেক্ট: কাজ শুরুর আগে অগ্রিম ফেরত পাবেন (৫% প্রসেসিং ফি)। সফটওয়্যার: ৭ দিনের মধ্যে রিফান্ড যোগ্য।" },
  { title: "৬. মেধাসম্পদ ও কপিরাইট", body: "কাস্টম কোড: চূড়ান্ত পেমেন্টের পর ক্লায়েন্টের মালিকানা। আমাদের টেমপ্লেট: NextGen এর মালিকানা। কেস স্টাডি: ক্লায়েন্টের অনুমতি সাপেক্ষে পোর্টফোলিওতে ব্যবহার।" },
  { title: "৭. যোগাযোগ", body: `NextGen Digital Studio, ${siteConfig.address}, ইমেইল: ${siteConfig.email}, ফোন: ${siteConfig.phone}` },
]

export function TermsClient() {
  const { lang } = useLang()
  const isBn = lang === 'bn'
  const sections = isBn ? sectionsBn : sectionsEn

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="NextGen Digital Studio" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
          </Link>
          <span className="h-4 w-px bg-border" />
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {isBn ? 'হোমে ফিরুন' : 'Back to Home'}
          </Link>
          <span className="h-4 w-px bg-border" />
          <h1 className="font-heading text-base font-bold">Terms of Service</h1>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-blue-600/[0.05] to-cyan-500/[0.05] p-6 sm:p-8">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Terms of Service</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            {isBn ? 'আমাদের সেবার শর্তাবলী' : 'The terms of our services'}
          </p>
          <span className="mt-4 inline-block rounded-full bg-blue-600/10 px-3 py-1 font-semibold text-blue-600 text-xs">
            {isBn ? 'সর্বশেষ আপডেট: জানুয়ারি ২০২৫' : 'Last updated: January 2025'}
          </span>
        </div>
        <div className="mt-8 space-y-6">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 sm:p-7">
              <h3 className="font-heading text-lg font-bold sm:text-xl">{s.title}</h3>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{s.body}</p>
            </div>
          ))}
        </div>
      </main>
      <LegalFooter />
    </div>
  )
}
