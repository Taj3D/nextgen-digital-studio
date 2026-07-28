/**
 * CRM Automation — Enterprise Landing Page Data
 * ---------------------------------------------
 * Bilingual (EN/BN) content for the dedicated /services/crm-automation
 * landing page. Adapted from the uploaded reference HTML (INR/Indian context)
 * to BDT/Bangladesh context. All copy is enterprise-grade and follows the
 * Hormozi Value Equation + StoryBrand + Brian Tracy sales psychology.
 *
 * This file is imported ONLY by crm-automation-client.tsx and page.tsx.
 * It does NOT affect the other 11 services (they use the generic LandingClient).
 */

export type Bilingual = { en: string; bn: string }

/** Helper for fields that may be single-string (EN-only) or bilingual. */
export type L<T = Bilingual> = T

/* ========================================================================== */
/*  1. HERO SECTION                                                            */
/* ========================================================================== */

export const HERO = {
  eyebrow: {
    en: 'AI-Powered Revenue Operating System · 60-Day ROI Guarantee',
    bn: 'AI-চালিত রেভিনিউ অপারেটিং সিস্টেম · ৬০-দিন ROI গ্যারান্টি',
  } as Bilingual,
  titleA: {
    en: 'Is Your CRM a',
    bn: 'আপনার CRM কি',
  } as Bilingual,
  titleB: {
    en: 'Paperweight',
    bn: 'কাগজের ওয়েটার',
  } as Bilingual,
  titleC: {
    en: 'or an AI-Powered Revenue Engine?',
    bn: 'নাকি AI-চালিত রেভিনিউ ইঞ্জিন?',
  } as Bilingual,
  subtitle: {
    en: 'We don\'t just install a CRM. We build an AI-powered revenue operating system — every lead is automatically captured, tagged, scored, assigned, followed up, booked, moved through pipeline, and converted into predictable revenue. 10x faster follow-up, 20% higher close rate, 100% pipeline visibility.',
    bn: 'আমরা শুধু CRM ইনস্টল করি না। আমরা একটি AI-চালিত রেভিনিউ অপারেটিং সিস্টেম তৈরি করি — প্রতিটি লিড স্বয়ংক্রিয়ভাবে ক্যাপচার, ট্যাগ, স্কোর, অ্যাসাইন, ফলো-আপ, বুক এবং পাইপলাইনে প্রবাহিত হয়ে পূর্বানুমেয় রেভিনিউতে রূপান্তরিত হয়। ১০x দ্রুত ফলো-আপ, ২০% বেশি ক্লোজ, ১০০% পাইপলাইন ভিজিবিলিটি।',
  } as Bilingual,
  flowBadge: {
    en: 'Lead → Auto Funnel → Appointment → Sale',
    bn: 'লিড → অটোমেটেড ফানেল → অ্যাপয়েন্টমেন্ট → বিক্রি',
  } as Bilingual,
  flowSub: {
    en: 'Zero manual work. AI handles everything in between.',
    bn: 'কোনো ম্যানুয়াল কাজ নয়। মাঝের সবকিছু AI সামলায়।',
  } as Bilingual,
  primaryCta: {
    en: 'Book a Free Strategy Call',
    bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
  secondaryCta: {
    en: 'See How It Works',
    bn: 'কীভাবে কাজ করে দেখুন',
  } as Bilingual,
  trustBadges: [
    { en: '3–5 day setup', bn: '৩–৫ দিনে সেটআপ' },
    { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '24/7 support', bn: '২৪/৭ সাপোর্ট' },
    { en: 'No coding required', bn: 'কোডিং প্রয়োজন নেই' },
  ] as Bilingual[],
  trustRow: [
    { en: '50+ businesses automated', bn: '৫০+ ব্যবসা অটোমেটেড' },
    { en: '1,000+ workflows built', bn: '১,০০০+ ওয়ার্কফ্লো তৈরি' },
    { en: '98% client satisfaction', bn: '৯৮% ক্লায়েন্ট সন্তুষ্টি' },
    { en: '৳100Cr+ revenue influenced', bn: '৳১০০কোটি+ রেভিনিউ ইনফ্লুয়েন্সড' },
    { en: '7+ years experience', bn: '৭+ বছর অভিজ্ঞতা' },
  ] as Bilingual[],
  badges: [
    { en: 'AI-Powered', bn: 'AI-চালিত' },
    { en: 'Revenue Operating System', bn: 'রেভিনিউ অপারেটিং সিস্টেম' },
    { en: '60-Day ROI Guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
  ] as Bilingual[],
}

/* ========================================================================== */
/*  2. HERO METRICS                                                            */
/* ========================================================================== */

export const HERO_METRICS = {
  eyebrow: { en: 'Real Numbers, Real Results', bn: 'বাস্তব সংখ্যা, বাস্তব ফলাফল' } as Bilingual,
  title: {
    en: 'Trusted by 50+ businesses across Bangladesh',
    bn: 'বাংলাদেশের ৫০+ ব্যবসা আমাদের উপর নির্ভর করে',
  } as Bilingual,
  stats: [
    { value: '50+', label: { en: 'Active CRM clients', bn: 'সক্রিয় CRM ক্লায়েন্ট' } },
    { value: '2,000+', label: { en: 'Automations built', bn: 'অটোমেশন তৈরি' } },
    { value: '98%', label: { en: 'Client satisfaction', bn: 'ক্লায়েন্ট সন্তুষ্টি' } },
    { value: '7+', label: { en: 'Years experience', bn: 'বছর অভিজ্ঞতা' } },
    { value: '50,000+', label: { en: 'Hours saved / year', bn: 'বার্ষিক ঘন্টা বাঁচানো' } },
    { value: '৳100Cr+', label: { en: 'Revenue influenced', bn: 'রেভিনিউ ইনফ্লুয়েন্সড' } },
    { value: '45s', label: { en: 'Avg lead response', bn: 'গড় লিড রেসপন্স' } },
    { value: '3.2x', label: { en: 'Avg pipeline growth', bn: 'গড় পাইপলাইন বৃদ্ধি' } },
  ],
}

/* ========================================================================== */
/*  3. PROBLEM — Why Businesses Lose Revenue                                    */
/* ========================================================================== */

export const PROBLEM = {
  eyebrow: { en: 'Are you suffering from these?', bn: 'আপনি কি এই সমস্যাগুলোতে ভুগছেন?' } as Bilingual,
  title: {
    en: 'Why businesses lose revenue every single day',
    bn: 'প্রতিদিন ব্যবসা কেন রেভিনিউ হারায়',
  } as Bilingual,
  subtitle: {
    en: 'If your CRM is unmanaged, manual or half-configured — you are bleeding money, time and customers. Here are the 12 silent revenue leaks we fix every week.',
    bn: 'আপনার CRM যদি আনম্যানেজড, ম্যানুয়াল বা অর্ধ-কনফিগারড হয় — আপনি প্রতিদিন টাকা, সময় এবং গ্রাহক হারাচ্ছেন। এই ১২টি সাইলেন্ট রেভিনিউ লিক আমরা প্রতি সপ্তাহে ফিক্স করি।',
  } as Bilingual,
  pains: [
    {
      icon: 'spreadsheet',
      title: { en: 'Manual Excel tracking', bn: 'ম্যানুয়াল এক্সেল ট্র্যাকিং' },
      desc: {
        en: 'Leads live in Excel sheets that nobody updates. Salespeople forget, managers guess, and 40% of leads fall through the cracks.',
        bn: 'লিড এক্সেল শিটে থাকে যা কেউ আপডেট করে না। সেলসপার্সন ভুলে যায়, ম্যানেজার অনুমান করে, এবং ৪০% লিড ফাঁক দিয়ে পড়ে যায়।',
      },
    },
    {
      icon: 'user-x',
      title: { en: 'Forgotten leads', bn: 'ভুলে যাওয়া লিড' },
      desc: {
        en: '80% of sales require 5–12 follow-ups. The average salesperson gives up after 1.8 attempts. That is billions in lost pipeline.',
        bn: '৮০% সেলসের জন্য ৫–১২ ফলো-আপ দরকার। গড় সেলসপার্সন ১.৮ চেষ্টার পর হাল ছাড়ে। এটি কোটি কোটি টাকার পাইপলাইন লস।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Late follow-up', bn: 'দেরিতে ফলো-আপ' },
      desc: {
        en: 'Leads contacted after 5 minutes convert 21x less. Most businesses take 24–48 hours. By then the customer already bought from a competitor.',
        bn: '৫ মিনিট পরে কন্টাক্ট করা লিড ২১x কম কনভার্ট হয়। বেশিরভাগ ব্যবসা ২৪–৪৮ ঘন্টা নেয়। ততক্ষণে গ্রাহক প্রতিযোগীর কাছ থেকে কিনে ফেলে।',
      },
    },
    {
      icon: 'copy',
      title: { en: 'Duplicate contacts', bn: 'ডুপ্লিকেট কন্ট্যাক্ট' },
      desc: {
        en: 'Same customer in 3 sheets, 2 CRMs and a WhatsApp group. Salespeople call the same lead twice. Customer gets annoyed. Brand looks amateur.',
        bn: 'একই গ্রাহক ৩টি শিট, ২টি CRM এবং একটি WhatsApp গ্রুপে। সেলসপার্সন একই লিডকে দুবার কল করে। গ্রাহক বিরক্ত হয়। ব্র্যান্ড অপেশাদার দেখায়।',
      },
    },
    {
      icon: 'eye-off',
      title: { en: 'No sales visibility', bn: 'কোনো সেলস ভিজিবিলিটি নেই' },
      desc: {
        en: 'CEO asks "how is pipeline looking?" — nobody can answer. You find out about lost deals 30 days after they died.',
        bn: 'সিইও জিজ্ঞাসে "পাইপলাইন কেমন?" — কেউ উত্তর দিতে পারে না। হারানো ডিল সম্পর্কে ৩০ দিন পরে জানা যায়।',
      },
    },
    {
      icon: 'file-x',
      title: { en: 'No reporting', bn: 'কোনো রিপোর্টিং নেই' },
      desc: {
        en: 'Monthly reports take 3 days to compile manually. By the time you see them, the month is over and the damage is done.',
        bn: 'মাসিক রিপোর্ট ম্যানুয়ালি কম্পাইল করতে ৩ দিন লাগে। আপনি দেখার আগেই মাস শেষ এবং ক্ষতি হয়ে গেছে।',
      },
    },
    {
      icon: 'alert-circle',
      title: { en: 'Human error', bn: 'হিউম্যান এরর' },
      desc: {
        en: 'Wrong number dialed, wrong price quoted, wrong meeting time. Every error costs a customer. Automation never makes these mistakes.',
        bn: 'ভুল নম্বর ডায়াল, ভুল দাম, ভুল মিটিং টাইম। প্রতিটি এররে একজন গ্রাহক যায়। অটোমেশন এই ভুল করে না।',
      },
    },
    {
      icon: 'calendar-x',
      title: { en: 'Missed appointments', bn: 'মিসড অ্যাপয়েন্টমেন্ট' },
      desc: {
        en: 'No automated reminders. No-show rate of 30%+. Each no-show costs ৳1,500–3,000 in salesperson time and overhead.',
        bn: 'কোনো অটোমেটেড রিমাইন্ডার নেই। ৩০%+ নো-শো রেট। প্রতিটি নো-শোতে সেলসপার্সন টাইম ও ওভারহেডে ৳১,৫০০–৩,০০০ খরচ।',
      },
    },
    {
      icon: 'trending-down',
      title: { en: 'Revenue leakage', bn: 'রেভিনিউ লিকেজ' },
      desc: {
        en: 'Won deals with no invoice. Invoices with no payment follow-up. Payments not logged. 8–15% of revenue vanishes silently.',
        bn: 'জেতা ডিলে কোনো ইনভয়েস নেই। ইনভয়েসে কোনো পেমেন্ট ফলো-আপ নেই। পেমেন্ট লগ হয় না। ৮–১৫% রেভিনিউ সাইলেন্টলি কমে যায়।',
      },
    },
    {
      icon: 'zap-off',
      title: { en: 'Slow response', bn: 'স্লো রেসপন্স' },
      desc: {
        en: 'Customer messages at 9 PM. Nobody replies till 10 AM next day. Lead already cold. Competitor already closed.',
        bn: 'গ্রাহক রাত ৯টায় মেসেজ দেয়। পরের দিন সকাল ১০টা পর্যন্ত কেউ রিপ্লাই দেয় না। লিড কোল্ড। প্রতিযোগী ইতিমধ্যে ক্লোজ করেছে।',
      },
    },
    {
      icon: 'bot-off',
      title: { en: 'No automation', bn: 'কোনো অটোমেশন নেই' },
      desc: {
        en: 'Every task — confirmation, reminder, follow-up, update — done manually by humans. Slow, expensive, inconsistent.',
        bn: 'প্রতিটি টাস্ক — কনফার্মেশন, রিমাইন্ডার, ফলো-আপ, আপডেট — ম্যানুয়ালি মানুষ করে। ধীর, ব্যয়বহুল, অসাঙ্গতিক।',
      },
    },
    {
      icon: 'cpu-off',
      title: { en: 'No AI', bn: 'কোনো AI নেই' },
      desc: {
        en: 'No lead scoring, no intent detection, no conversation summary, no proposal generation. Salespeople do everything from scratch every time.',
        bn: 'কোনো লিড স্কোরিং, ইনটেন্ট ডিটেকশন, কনভার্সেশন সামারি বা প্রপোজাল জেনারেশন নেই। সেলসপার্সন প্রতিবার স্ক্র্যাচ থেকে সব করে।',
      },
    },
  ],
  costStats: [
    {
      value: '৳12L+',
      desc: {
        en: 'A mid-size business loses this every year from unmanaged CRM and missed follow-ups.',
        bn: 'একটি মাঝারি ব্যবসা আনম্যানেজড CRM এবং মিসড ফলো-আপের কারণে প্রতি বছর হারায়।',
      },
    },
    {
      value: '78%',
      desc: {
        en: 'Of leads never convert because of slow or absent follow-up — not because the product is bad.',
        bn: 'লিড কনভার্ট হয় না কারণ ফলো-আপ ধীর বা নেই — প্রোডাক্ট খারাপ বলে নয়।',
      },
    },
    {
      value: '48h',
      desc: {
        en: 'Average time businesses take to respond to a new lead without automation. (Should be <5 min.)',
        bn: 'অটোমেশন ছাড়া নতুন লিডে রেসপন্ড করতে ব্যবসার গড় সময়। (হওয়া উচিত <৫ মিনিট।)',
      },
    },
  ],
  warning: {
    en: 'If you do not fix this now — the next 12 months will look exactly like the last 12.',
    bn: 'আপনি যদি এখন ফিক্স না করেন — আগামী ১২ মাসও আগের ১২ মাসের মতোই হবে।',
  } as Bilingual,
  cta: {
    en: 'I want to fix this — Free Strategy Call',
    bn: 'আমি এই সমস্যা সমাধান করতে চাই — ফ্রি স্ট্র্যাটেজি কল',
  } as Bilingual,
}

/* ========================================================================== */
/*  4. EMOTIONAL COST — The Hidden Cost                                         */
/* ========================================================================== */

export const EMOTIONAL_COST = {
  eyebrow: { en: 'The hidden cost', bn: 'ইমোশনাল কস্ট' } as Bilingual,
  title: {
    en: 'The hidden cost of an unmanaged CRM',
    bn: 'আনম্যানেজড CRM-এর লুকানো খরচ',
  } as Bilingual,
  subtitle: {
    en: 'It is not just about money. It is about stress, missed family time, sleepless nights and the constant fear that the business is one bad month away from collapse.',
    bn: 'এটি শুধু টাকার বিষয় নয়। এটি স্ট্রেস, মিসড ফ্যামিলি টাইম, নিদ্রাহীন রাত এবং এই ভয় নিয়ে — ব্যবসা একটি খারাপ মাস থেকে কলাপ্সের কাছাকাছি।',
  } as Bilingual,
  items: [
    {
      icon: 'moon',
      title: { en: 'Sleepless nights', bn: 'নিদ্রাহীন রাত' },
      desc: {
        en: 'You cannot sleep because you do not know if your team followed up. You check WhatsApp at 2 AM. You call salespeople on weekends.',
        bn: 'আপনি ঘুমাতে পারেন না কারণ জানেন না আপনার টিম ফলো-আপ করেছে কিনা। রাত ২টায় WhatsApp চেক করেন। ছুটির দিনে সেলসপার্সনকে কল করেন।',
      },
    },
    {
      icon: 'frown',
      title: { en: 'Customer complaints', bn: 'গ্রাহক অভিযোগ' },
      desc: {
        en: '"You never called me back." "I messaged 3 times, no reply." Every complaint feels personal — because it is your business.',
        bn: '"আপনি ফোন ব্যাক করেননি।" "আমি ৩বার মেসেজ দিয়েছি, কোনো রিপ্লাই নেই।" প্রতিটি অভিযোগ ব্যক্তিগত মনে হয় — কারণ এটি আপনার ব্যবসা।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Team burnout', bn: 'টিম বার্নআউট' },
      desc: {
        en: 'Your best salesperson quits because they are drowning in admin work instead of selling. Hiring costs ৳2L+ and 3 months.',
        bn: 'আপনার সেরা সেলসপার্সন চাকরি ছাড়ে কারণ বিক্রির বদলে অ্যাডমিন কাজে ডুবে আছে। নতুন নিয়োগে খরচ ৳২লাখ+ এবং ৩ মাস।',
      },
    },
    {
      icon: 'trending-down',
      title: { en: 'Stagnant growth', bn: 'স্থবির প্রবৃদ্ধি' },
      desc: {
        en: 'Same revenue for 3 years. Same 10 customers. You work 12-hour days but the needle does not move. The CRM is the missing lever.',
        bn: '৩ বছর ধরে একই রেভিনিউ। একই ১০ গ্রাহক। আপনি ১২ ঘন্টা কাজ করেন কিন্তু নিডল নড়ে না। CRM-ই সেই মিসিং লিভার।',
      },
    },
    {
      icon: 'briefcase',
      title: { en: 'Lost deals you remember', bn: 'মনে রাখা হারানো ডিল' },
      desc: {
        en: 'That ৳50 lakh deal you lost because nobody followed up for 4 days. You remember the customer\'s name. You will remember it for years.',
        bn: 'সেই ৳৫০ লাখের ডিল হারিয়েছেন কারণ ৪ দিন কেউ ফলো-আপ করেনি। গ্রাহকের নাম মনে আছে। বছরের পর বছর মনে থাকবে।',
      },
    },
    {
      icon: 'heart',
      title: { en: 'Missed family time', bn: 'মিসড ফ্যামিলি টাইম' },
      desc: {
        en: 'Birthday dinner missed because a customer complained. School event skipped because a deal needed "emergency" attention. The business owns you.',
        bn: 'জন্মদিনের ডিনার মিস কারণ গ্রাহক অভিযোগ করেছে। স্কুল ইভেন্ট স্কিপ কারণ ডিলে "ইমার্জেন্সি" মনোযোগ দরকার। ব্যবসা আপনাকে মালিকানা করে।',
      },
    },
  ],
  promise: {
    en: 'Imagine going to sleep knowing every lead is being handled. Every follow-up is scheduled. Every customer is contacted. Every deal is moving. That is what an AI-powered CRM does.',
    bn: 'কল্পনা করুন ঘুমাতে যাওয়ার আগে জানেন প্রতিটি লিড হ্যান্ডল হচ্ছে। প্রতিটি ফলো-আপ শিডিউলড। প্রতিটি গ্রাহক কন্টাক্ট হচ্ছে। প্রতিটি ডিল এগোচ্ছে। এটাই AI-চালিত CRM করে।',
  } as Bilingual,
  cta: {
    en: 'Build my revenue engine — Free Strategy Call',
    bn: 'আমার রেভিনিউ ইঞ্জিন তৈরি করুন — ফ্রি স্ট্র্যাটেজি কল',
  } as Bilingual,
}

/* ========================================================================== */
/*  5. WHY TRADITIONAL CRM FAILS                                                */
/* ========================================================================== */

export const WHY_TRADITIONAL_FAILS = {
  eyebrow: { en: 'The truth about traditional CRM', bn: 'ঐতিহ্যবাহী CRM-এর সত্যি' } as Bilingual,
  title: {
    en: 'Why traditional CRM fails 70% of businesses',
    bn: 'ঐতিহ্যবাহী CRM কেন ৭০% ব্যবসায় ব্যর্থ হয়',
  } as Bilingual,
  subtitle: {
    en: 'You bought HubSpot / Salesforce / Zoho. You paid ৳30,000+/month. Six months later nobody uses it. Sound familiar? Here is why.',
    bn: 'আপনি HubSpot / Salesforce / Zoho কিনেছেন। মাসে ৳৩০,০০০+ দিয়েছেন। ছয় মাস পর কেউ ব্যবহার করে না। পরিচিত শোনাচ্ছে? কারণ এটি।',
  } as Bilingual,
  failures: [
    {
      icon: 'settings',
      title: { en: 'Installed, never configured', bn: 'ইনস্টল করা, কনফিগার না করা' },
      desc: {
        en: 'You got login access. Nobody set up pipelines, automations, scoring rules or dashboards. The CRM is an empty shell.',
        bn: 'আপনি লগইন অ্যাক্সেস পেয়েছেন। কেউ পাইপলাইন, অটোমেশন, স্কোরিং রুল বা ড্যাশবোর্ড সেটআপ করেনি। CRM একটি খালি শেল।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Team refuses to use it', bn: 'টিম ব্যবহার করতে অস্বীকার করে' },
      desc: {
        en: 'Salespeople hate data entry. They keep using Excel + WhatsApp because the CRM is "too complicated". Adoption: 12%.',
        bn: 'সেলসপার্সন ডেটা এন্ট্রি ঘৃণা করে। তারা Excel + WhatsApp ব্যবহার চালিয়ে যায় কারণ CRM "অনেক জটিল"। অ্যাডপশন: ১২%।',
      },
    },
    {
      icon: 'zap-off',
      title: { en: 'No automation built', bn: 'কোনো অটোমেশন তৈরি নেই' },
      desc: {
        en: 'CRM is a glorified contact list. No auto-assignment, no follow-up sequences, no reminders, no escalations. Manual work multiplied.',
        bn: 'CRM একটি গ্লোরিফাইড কন্টাক্ট লিস্ট। কোনো অটো-অ্যাসাইনমেন্ট, ফলো-আপ সিকোয়েন্স, রিমাইন্ডার বা এসক্যালেশন নেই। ম্যানুয়াল কাজ গুণিত হয়েছে।',
      },
    },
    {
      icon: 'bot-off',
      title: { en: 'Zero AI intelligence', bn: 'জিরো AI ইনটেলিজেন্স' },
      desc: {
        en: 'Traditional CRM does not score leads, detect intent, summarise calls or write proposals. Every customer looks identical. No prioritisation.',
        bn: 'ঐতিহ্যবাহী CRM লিড স্কোর করে না, ইনটেন্ট ডিটেক্ট করে না, কল সামারি করে না বা প্রপোজাল লেখে না। প্রতিটি গ্রাহক একই দেখায়। কোনো প্রায়োরিটাইজেশন নেই।',
      },
    },
    {
      icon: 'eye-off',
      title: { en: 'Dashboards nobody reads', bn: 'ড্যাশবোর্ড কেউ পড়ে না' },
      desc: {
        en: 'Default reports show useless metrics. No custom KPIs. No real-time alerts. You make decisions on gut feel, not data.',
        bn: 'ডিফল্ট রিপোর্ট অকেজো মেট্রিক দেখায়। কোনো কাস্টম KPI নেই। কোনো রিয়েল-টাইম অ্যালার্ট নেই। আপনি ডেটায় নয়, অনুভূতিতে সিদ্ধান্ত নেন।',
      },
    },
    {
      icon: 'plug-off',
      title: { en: 'Disconnected from tools', bn: 'টুল থেকে বিচ্ছিন্ন' },
      desc: {
        en: 'CRM does not talk to your website form, WhatsApp, Meta Ads, bKash, calendar, Slack or email. Every system is an island.',
        bn: 'CRM আপনার ওয়েবসাইট ফর্ম, WhatsApp, Meta Ads, bKash, ক্যালেন্ডার, Slack বা ইমেইলের সাথে কথা বলে না। প্রতিটি সিস্টেম একটি দ্বীপ।',
      },
    },
  ],
  stat: {
    value: '70%',
    label: {
      en: 'of CRM implementations fail in the first 18 months — Gartner research',
      bn: 'CRM ইমপ্লিমেন্টেশন প্রথম ১৮ মাসে ব্যর্থ হয় — Gartner গবেষণা',
    },
  },
  cta: {
    en: 'I want a CRM that actually works',
    bn: 'আমি এমন CRM চাই যা আসলে কাজ করে',
  } as Bilingual,
}

/* ========================================================================== */
/*  6. WHY NEXTGEN AI CRM                                                      */
/* ========================================================================== */

export const WHY_NEXTGEN = {
  eyebrow: { en: 'The NextGen difference', bn: 'NextGen-এর পার্থক্য' } as Bilingual,
  title: {
    en: 'Why NextGen AI CRM wins where others fail',
    bn: 'NextGen AI CRM কেন জেতে যেখানে অন্যরা ব্যর্থ হয়',
  } as Bilingual,
  subtitle: {
    en: 'We do not sell you software. We deliver a fully-built, fully-automated, AI-powered revenue engine — configured, integrated, trained and handed over working in 3–10 days.',
    bn: 'আমরা সফটওয়্যার বিক্রি করি না। আমরা একটি সম্পূর্ণ-বিল্ট, সম্পূর্ণ-অটোমেটেড, AI-চালিত রেভিনিউ ইঞ্জিন ডেলিভারি করি — কনফিগার্ড, ইন্টিগ্রেটেড, ট্রেইন্ড এবং ৩–১০ দিনে ওয়ার্কিং হ্যান্ডওভার।',
  } as Bilingual,
  pillars: [
    {
      icon: 'rocket',
      title: { en: 'Done-for-you, not done-by-you', bn: 'Done-for-you, Done-by-you নয়' },
      desc: {
        en: 'We build everything. Pipelines, automations, dashboards, integrations, AI training. You get a working system, not a login.',
        bn: 'আমরা সব তৈরি করি। পাইপলাইন, অটোমেশন, ড্যাশবোর্ড, ইন্টিগ্রেশন, AI ট্রেনিং। আপনি একটি ওয়ার্কিং সিস্টেম পান, লগইন নয়।',
      },
    },
    {
      icon: 'cpu',
      title: { en: 'AI built in from day one', bn: 'প্রথম দিন থেকেই AI বিল্ট-ইন' },
      desc: {
        en: 'GPT-4 powers lead scoring, intent detection, call summaries, proposal generation, sentiment analysis. Every customer interaction gets smarter.',
        bn: 'GPT-4 লিড স্কোরিং, ইনটেন্ট ডিটেকশন, কল সামারি, প্রপোজাল জেনারেশন, সেন্টিমেন্ট অ্যানালিসিস চালায়। প্রতিটি গ্রাহক ইন্টারঅ্যাকশন স্মার্ট হয়।',
      },
    },
    {
      icon: 'plug',
      title: { en: 'Connects to everything', bn: 'সবকিছুর সাথে কানেক্ট' },
      desc: {
        en: '50+ native integrations — Meta Ads, WhatsApp, bKash, Nagad, Stripe, Google Calendar, Slack, Zoom, Zapier, Make, n8n. Plus custom API.',
        bn: '৫০+ নেটিভ ইন্টিগ্রেশন — Meta Ads, WhatsApp, bKash, Nagad, Stripe, Google Calendar, Slack, Zoom, Zapier, Make, n8n। প্লাস কাস্টম API।',
      },
    },
    {
      icon: 'gauge',
      title: { en: 'Live in 3–10 days, not 3 months', bn: '৩–১০ দিনে লাইভ, ৩ মাসে নয়' },
      desc: {
        en: 'Our battle-tested templates and pre-built workflows mean we deploy in days, not quarters. You start seeing ROI in week 2.',
        bn: 'আমাদের ব্যাটল-টেস্টেড টেমপ্লেট এবং প্রি-বিল্ট ওয়ার্কফ্লো মানে আমরা দিনে ডিপ্লয় করি, কোয়ার্টারে নয়। আপনি সপ্তাহ ২-এ ROI দেখা শুরু করেন।',
      },
    },
    {
      icon: 'shield-check',
      title: { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      desc: {
        en: 'If you do not see measurable ROI in 60 days — we work for free until you do. No risk. No catch. We carry the risk so you do not have to.',
        bn: '৬০ দিনে পরিমেয় ROI না দেখলে — আমরা ততক্ষণ ফ্রি কাজ করি। কোনো রিস্ক নেই। কোনো ক্যাচ নেই। রিস্ক আমরা বহন করি যাতে আপনাকে না করতে হয়।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Your team actually uses it', bn: 'আপনার টিম আসলেই ব্যবহার করে' },
      desc: {
        en: 'We train your team, simplify workflows, and remove friction. Adoption rates of 85%+ vs industry average of 12%. That is the difference.',
        bn: 'আমরা আপনার টিমকে ট্রেন করি, ওয়ার্কফ্লো সরল করি, ফ্রিকশন সরাই। অ্যাডপশন রেট ৮৫%+ বনাম ইন্ডাস্ট্রি গড় ১২%। এটাই পার্থক্য।',
      },
    },
  ],
  proof: {
    en: '50+ businesses across Bangladesh — from ৳1Cr startups to ৳500Cr enterprises — run on NextGen AI CRM today.',
    bn: 'বাংলাদেশের ৫০+ ব্যবসা — ৳১কোটি স্টার্টআপ থেকে ৳৫০০কোটি এন্টারপ্রাইজ — আজ NextGen AI CRM-এ চলে।',
  } as Bilingual,
  cta: {
    en: 'See my custom CRM blueprint — Free Call',
    bn: 'আমার কাস্টম CRM ব্লুপ্রিন্ট দেখুন — ফ্রি কল',
  } as Bilingual,
}

/* ========================================================================== */
/*  7. HOW IT WORKS                                                            */
/* ========================================================================== */

export const HOW_IT_WORKS = {
  eyebrow: { en: 'Simple, fast, proven', bn: 'সহজ, দ্রুত, প্রমাণিত' } as Bilingual,
  title: {
    en: 'From lead to revenue in 4 simple steps',
    bn: 'লিড থেকে রেভিনিউ — ৪টি সহজ ধাপে',
  } as Bilingual,
  subtitle: {
    en: 'No jargon. No 3-month implementation. No PhD required. Here is exactly what happens.',
    bn: 'কোনো জার্গন নেই। কোনো ৩-মাস ইমপ্লিমেন্টেশন নেই। কোনো PhD লাগে না। ঠিক কী হয় তা এখানে।',
  } as Bilingual,
  steps: [
    {
      number: '01',
      icon: 'phone',
      title: { en: 'Free 30-min strategy call', bn: 'ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কল' },
      desc: {
        en: 'We audit your current lead flow, identify the 3 biggest leaks, map your sales process, and design a custom CRM automation blueprint with BDT cost + ROI projection.',
        bn: 'আমরা আপনার বর্তমান লিড ফ্লো অডিট করি, ৩টি বড় লিক চিহ্নিত করি, আপনার সেলস প্রসেস ম্যাপ করি, এবং BDT খরচ + ROI প্রজেকশন সহ কাস্টম CRM অটোমেশন ব্লুপ্রিন্ট ডিজাইন করি।',
      },
    },
    {
      number: '02',
      icon: 'settings',
      title: { en: 'CRM setup + automation build', bn: 'CRM সেটআপ + অটোমেশন বিল্ড' },
      desc: {
        en: 'We configure your CRM, build pipelines, design workflows, integrate tools, train AI on your business, set up dashboards. 3–5 days for Starter, 7–10 for Enterprise.',
        bn: 'আমরা আপনার CRM কনফিগার করি, পাইপলাইন বিল্ড করি, ওয়ার্কফ্লো ডিজাইন করি, টুল ইন্টিগ্রেট করি, AI আপনার ব্যবসায় ট্রেন করি, ড্যাশবোর্ড সেটআপ করি। স্টার্টারে ৩–৫ দিন, এন্টারপ্রাইজে ৭–১০ দিন।',
      },
    },
    {
      number: '03',
      icon: 'users',
      title: { en: 'Team training + go-live', bn: 'টিম ট্রেনিং + গো-লাইভ' },
      desc: {
        en: 'We train your salespeople (live + recorded), migrate existing contacts (zero data loss), test end-to-end, and flip the switch. Your team is productive on day one.',
        bn: 'আমরা আপনার সেলসপার্সনকে ট্রেন করি (লাইভ + রেকর্ডেড), বিদ্যমান কন্ট্যাক্ট মাইগ্রেট করি (জিরো ডেটা লস), এন্ড-টু-এন্ড টেস্ট করি, এবং সুইচ অন করি। আপনার টিম প্রথম দিনেই প্রোডাক্টিভ।',
      },
    },
    {
      number: '04',
      icon: 'line-chart',
      title: { en: 'Optimise + scale', bn: 'অপটিমাইজ + স্কেল' },
      desc: {
        en: 'Weekly reviews for 4 weeks, monthly performance audit, continuous AI retraining, A/B test workflows, scale automations as you grow. We are your long-term automation partner.',
        bn: '৪ সপ্তাহের জন্য সাপ্তাহিক রিভিউ, মাসিক পারফরম্যান্স অডিট, কন্টিনিউয়াস AI রিট্রেনিং, A/B টেস্ট ওয়ার্কফ্লো, আপনার গ্রোথ অনুযায়ী স্কেল। আমরা আপনার দীর্ঘমেয়াদী অটোমেশন পার্টনার।',
      },
    },
  ],
  promise: {
    en: 'By day 10, every lead that touches your business is captured, scored, assigned, followed up and moved through pipeline — automatically.',
    bn: '১০ম দিনের মধ্যে, আপনার ব্যবসায় আসা প্রতিটি লিড ক্যাপচার, স্কোর, অ্যাসাইন, ফলো-আপ এবং পাইপলাইনে প্রবাহিত হয় — স্বয়ংক্রিয়ভাবে।',
  } as Bilingual,
}

/* ========================================================================== */
/*  8. CRM FRAMEWORK — 12-Stage Lifecycle                                      */
/* ========================================================================== */

export const CRM_FRAMEWORK = {
  eyebrow: { en: 'The complete lifecycle', bn: 'সম্পূর্ণ লাইফসাইকেল' } as Bilingual,
  title: {
    en: 'The 12-stage CRM automation framework',
    bn: '১২-স্টেজ CRM অটোমেশন ফ্রেমওয়ার্ক',
  } as Bilingual,
  subtitle: {
    en: 'Every lead follows this exact journey — automatically. No manual intervention, no missed steps, no revenue leakage.',
    bn: 'প্রতিটি লিড এই নির্দিষ্ট জার্নি অনুসরণ করে — স্বয়ংক্রিয়ভাবে। কোনো ম্যানুয়াল হস্তক্ষেপ নেই, কোনো মিসড স্টেপ নেই, কোনো রেভিনিউ লিকেজ নেই।',
  } as Bilingual,
  stages: [
    {
      step: 1,
      icon: 'download',
      title: { en: 'Lead Capture', bn: 'লিড ক্যাপচার' },
      desc: {
        en: 'Website form, WhatsApp, Facebook Lead Ads, Instagram DM, phone call, walk-in, email — every source flows into ONE CRM automatically. No manual entry.',
        bn: 'ওয়েবসাইট ফর্ম, WhatsApp, Facebook Lead Ads, Instagram DM, ফোন কল, ওয়াক-ইন, ইমেইল — প্রতিটি সোর্স স্বয়ংক্রিয়ভাবে ONE CRM-এ প্রবাহিত হয়। কোনো ম্যানুয়াল এন্ট্রি নেই।',
      },
    },
    {
      step: 2,
      icon: 'database',
      title: { en: 'Auto Entry', bn: 'অটো এন্ট্রি' },
      desc: {
        en: 'Lead lands in CRM within 5 seconds of submission. All fields populated. Source tagged. Timestamp recorded. No data entry by salesperson.',
        bn: 'লিড সাবমিশনের ৫ সেকেন্ডের মধ্যে CRM-এ পৌঁছায়। সব ফিল্ড পপুলেটেড। সোর্স ট্যাগড। টাইমস্ট্যাম্প রেকর্ডেড। সেলসপার্সনের কোনো ডেটা এন্ট্রি নেই।',
      },
    },
    {
      step: 3,
      icon: 'filter',
      title: { en: 'Duplicate Detection', bn: 'ডুপ্লিকেট ডিটেকশন' },
      desc: {
        en: 'AI checks phone + email against existing records. If duplicate found, merges instead of creating new. No double-calling, no annoyed customers.',
        bn: 'AI ফোন + ইমেইল বিদ্যমান রেকর্ডের সাথে চেক করে। ডুপ্লিকেট পেলে, নতুন তৈরির বদলে মার্জ করে। কোনো ডাবল-কলিং নেই, কোনো বিরক্ত গ্রাহক নেই।',
      },
    },
    {
      step: 4,
      icon: 'tag',
      title: { en: 'Smart Tagging', bn: 'স্মার্ট ট্যাগিং' },
      desc: {
        en: 'AI auto-tags lead by source, industry, product interest, budget, timeline, region. Every tag becomes a segmentation filter for future campaigns.',
        bn: 'AI সোর্স, ইন্ডাস্ট্রি, প্রোডাক্ট ইনটেরেস্ট, বাজেট, টাইমলাইন, রিজিয়ন অনুযায়ী লিড অটো-ট্যাগ করে। প্রতিটি ট্যাগ ভবিষ্যৎ ক্যাম্পেইনের জন্য সেগমেন্টেশন ফিল্টার হয়।',
      },
    },
    {
      step: 5,
      icon: 'star',
      title: { en: 'Lead Scoring', bn: 'লিড স্কোরিং' },
      desc: {
        en: 'AI scores lead 0–100 based on 25+ signals: behaviour, demographics, engagement, intent. Hot leads (A) get called in 5 min. Cold leads (D) enter nurture.',
        bn: 'AI ২৫+ সিগন্যালের ভিত্তিতে লিড ০–১০০ স্কোর করে: বিহেভিয়ার, ডেমোগ্রাফিক, এনগেজমেন্ট, ইনটেন্ট। হট লিড (A) ৫ মিনিটে কল পায়। কোল্ড লিড (D) নার্চারে যায়।',
      },
    },
    {
      step: 6,
      icon: 'user-check',
      title: { en: 'Sales Assignment', bn: 'সেলস অ্যাসাইনমেন্ট' },
      desc: {
        en: 'Lead auto-assigned to best-fit salesperson based on territory, product, language, capacity, past performance. Round-robin or weighted. Zero manual routing.',
        bn: 'টেরিটরি, প্রোডাক্ট, ভাষা, ক্যাপাসিটি, অতীত পারফরম্যান্স অনুযায়ী লিড বেস্ট-ফিট সেলসপার্সনে অটো-অ্যাসাইন। রাউন্ড-রবিন বা ওয়েটেড। জিরো ম্যানুয়াল রাউটিং।',
      },
    },
    {
      step: 7,
      icon: 'message-circle',
      title: { en: 'Automated Follow-up', bn: 'অটোমেটেড ফলো-আপ' },
      desc: {
        en: '5–12 touch sequence across WhatsApp + email + SMS + call reminders. Personalised with lead name, product, qualification answers. Stops on reply.',
        bn: 'WhatsApp + ইমেইল + SMS + কল রিমাইন্ডার জুড়ে ৫–১২ টাচ সিকোয়েন্স। লিড নাম, প্রোডাক্ট, কোয়ালিফিকেশন উত্তর দিয়ে পার্সোনালাইজড। রিপ্লাই পেলে থামে।',
      },
    },
    {
      step: 8,
      icon: 'calendar-check',
      title: { en: 'Appointment Booking', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
      desc: {
        en: 'AI offers 3 time slots via WhatsApp buttons. Lead picks → calendar invite sent to both. 24h + 1h reminders. No-show rate drops 40–55%.',
        bn: 'AI WhatsApp বাটনে ৩টি টাইম স্লট অফার করে। লিড পিক করে → ক্যালেন্ডার ইনভাইট উভয়কে যায়। ২৪ঘি + ১ঘি রিমাইন্ডার। নো-শো রেট ৪০–৫৫% কমে।',
      },
    },
    {
      step: 9,
      icon: 'file-text',
      title: { en: 'Proposal Generation', bn: 'প্রপোজাল জেনারেশন' },
      desc: {
        en: 'AI generates custom proposal from lead data, product catalog and pricing rules. Salesperson reviews and sends in 2 clicks. Cuts proposal time from 45 min to 3 min.',
        bn: 'AI লিড ডেটা, প্রোডাক্ট ক্যাটালগ এবং প্রাইসিং রুল থেকে কাস্টম প্রপোজাল জেনারেট করে। সেলসপার্সন রিভিউ করে ২ ক্লিকে পাঠায়। প্রপোজাল টাইম ৪৫ মিনিট থেকে ৩ মিনিট।',
      },
    },
    {
      step: 10,
      icon: 'trophy',
      title: { en: 'Won', bn: 'জেতা' },
      desc: {
        en: 'Deal marked won → auto-triggers invoice, onboarding workflow, handover to delivery team, revenue logged in dashboard, commission calculated for salesperson.',
        bn: 'ডিল জেতা → অটো-ট্রিগার ইনভয়েস, অনবোর্ডিং ওয়ার্কফ্লো, ডেলিভারি টিমে হ্যান্ডওভার, ড্যাশবোর্ডে রেভিনিউ লগ, সেলসপার্সনের কমিশন ক্যালকুলেটেড।',
      },
    },
    {
      step: 11,
      icon: 'heart',
      title: { en: 'Retention', bn: 'রিটেনশন' },
      desc: {
        en: 'Customer enters onboarding sequence, milestone check-ins, satisfaction surveys, renewal reminders, upsell opportunity detection. Churn drops 30–50%.',
        bn: 'গ্রাহক অনবোর্ডিং সিকোয়েন্স, মাইলস্টোন চেক-ইন, স্যাটিসফ্যাকশন সার্ভে, রিনিউয়াল রিমাইন্ডার, আপসেল অপারচুনিটি ডিটেকশনে প্রবেশ। চার্ন ৩০–৫০% কমে।',
      },
    },
    {
      step: 12,
      icon: 'gift',
      title: { en: 'Referral', bn: 'রেফারেল' },
      desc: {
        en: 'Happy customers (NPS 9-10) get automated referral request + incentive. Referral tracking, reward fulfillment, source attribution. 3–7% of revenue becomes referral-driven.',
        bn: 'খুশি গ্রাহক (NPS 9-10) অটোমেটেড রেফারেল রিকোয়েস্ট + ইনসেনটিভ পায়। রেফারেল ট্র্যাকিং, রিওয়ার্ড ফুলফিলমেন্ট, সোর্স অ্যাট্রিবিউশন। ৩–৭% রেভিনিউ রেফারেল-চালিত হয়।',
      },
    },
  ],
  promise: {
    en: '12 stages. Zero manual work. 100% pipeline visibility. This is how predictable revenue is built.',
    bn: '১২টি স্টেজ। জিরো ম্যানুয়াল কাজ। ১০০% পাইপলাইন ভিজিবিলিটি। এভাবেই পূর্বানুমেয় রেভিনিউ তৈরি হয়।',
  } as Bilingual,
}

/* ========================================================================== */
/*  9. FEATURES — Everything Included                                          */
/* ========================================================================== */

export const FEATURES = {
  eyebrow: { en: 'Everything included', bn: 'সবকিছু অন্তর্ভুক্ত' } as Bilingual,
  title: {
    en: '20+ components, one unified system',
    bn: '২০+ কম্পোনেন্ট, একটি ইউনিফাইড সিস্টেম',
  } as Bilingual,
  subtitle: {
    en: 'This is not a CRM. This is a complete revenue operating system — CRM + automation + AI + communications + analytics + integrations in one package.',
    bn: 'এটি শুধু CRM নয়। এটি একটি সম্পূর্ণ রেভিনিউ অপারেটিং সিস্টেম — CRM + অটোমেশন + AI + কমিউনিকেশন + অ্যানালিটিক্স + ইন্টিগ্রেশন এক প্যাকেজে।',
  } as Bilingual,
  groups: [
    {
      name: { en: 'CRM Core', bn: 'CRM কোর' },
      icon: 'database',
      items: [
        { en: 'Full CRM setup (HubSpot / GoHighLevel / Salesforce / Zoho / Custom)', bn: 'ফুল CRM সেটআপ (HubSpot / GoHighLevel / Salesforce / Zoho / Custom)' },
        { en: 'Custom pipeline design (industry-specific stages)', bn: 'কাস্টম পাইপলাইন ডিজাইন (ইন্ডাস্ট্রি-স্পেসিফিক স্টেজ)' },
        { en: 'Custom fields + deal records', bn: 'কাস্টম ফিল্ড + ডিল রেকর্ড' },
        { en: 'Lead forms (website + Facebook + WhatsApp)', bn: 'লিড ফর্ম (ওয়েবসাইট + Facebook + WhatsApp)' },
        { en: 'Contact + company + deal management', bn: 'কন্টাক্ট + কোম্পানি + ডিল ম্যানেজমেন্ট' },
        { en: 'Duplicate detection + merge rules', bn: 'ডুপ্লিকেট ডিটেকশন + মার্জ রুল' },
      ],
    },
    {
      name: { en: 'Automation Engine', bn: 'অটোমেশন ইঞ্জিন' },
      icon: 'workflow',
      items: [
        { en: 'Workflow builder (visual + code)', bn: 'ওয়ার্কফ্লো বিল্ডার (ভিজ্যুয়াল + কোড)' },
        { en: 'Multi-step sequences (unlimited)', bn: 'মাল্টি-স্টেপ সিকোয়েন্স (আনলিমিটেড)' },
        { en: 'Trigger-based + time-based automation', bn: 'ট্রিগার-বেসড + টাইম-বেসড অটোমেশন' },
        { en: 'Conditional logic + branching', bn: 'কন্ডিশনাল লজিক + ব্র্যাঞ্চিং' },
        { en: 'Task automation + assignment rules', bn: 'টাস্ক অটোমেশন + অ্যাসাইনমেন্ট রুল' },
        { en: 'Smart notifications + escalations', bn: 'স্মার্ট নোটিফিকেশন + এসক্যালেশন' },
      ],
    },
    {
      name: { en: 'Communications', bn: 'কমিউনিকেশন' },
      icon: 'message-circle',
      items: [
        { en: 'Email automation + sequences', bn: 'ইমেইল অটোমেশন + সিকোয়েন্স' },
        { en: 'WhatsApp Business API integration', bn: 'WhatsApp Business API ইন্টিগ্রেশন' },
        { en: 'SMS automation (local + international)', bn: 'SMS অটোমেশন (লোকাল + ইন্টারন্যাশনাল)' },
        { en: 'AI chatbot (GPT-4 powered)', bn: 'AI চ্যাটবট (GPT-4 চালিত)' },
        { en: 'AI voice agent (Bangla + English)', bn: 'AI ভয়েস এজেন্ট (বাংলা + ইংরেজি)' },
        { en: 'Shared team inbox + assignment', bn: 'শেয়ার্ড টিম ইনবক্স + অ্যাসাইনমেন্ট' },
      ],
    },
    {
      name: { en: 'AI Intelligence', bn: 'AI ইনটেলিজেন্স' },
      icon: 'cpu',
      items: [
        { en: 'Lead scoring (AI-powered, 25+ signals)', bn: 'লিড স্কোরিং (AI-চালিত, ২৫+ সিগন্যাল)' },
        { en: 'Intent detection + sentiment analysis', bn: 'ইনটেন্ট ডিটেকশন + সেন্টিমেন্ট অ্যানালিসিস' },
        { en: 'Call + meeting summary (auto-generated)', bn: 'কল + মিটিং সামারি (অটো-জেনারেটেড)' },
        { en: 'Auto proposal + quote generation', bn: 'অটো প্রপোজাল + কোট জেনারেশন' },
        { en: 'Conversation summary + next-step suggestion', bn: 'কনভার্সেশন সামারি + নেক্সট-স্টেপ সাজেশন' },
        { en: 'Sales forecast + churn prediction', bn: 'সেলস ফোরকাস্ট + চার্ন প্রেডিকশন' },
      ],
    },
    {
      name: { en: 'Productivity', bn: 'প্রোডাক্টিভিটি' },
      icon: 'calendar',
      items: [
        { en: 'Calendar + appointment scheduling', bn: 'ক্যালেন্ডার + অ্যাপয়েন্টমেন্ট শিডিউলিং' },
        { en: 'Task automation + reminders', bn: 'টাস্ক অটোমেশন + রিমাইন্ডার' },
        { en: 'Document storage + template library', bn: 'ডকুমেন্ট স্টোরেজ + টেমপ্লেট লাইব্রেরি' },
        { en: 'Meeting notes + recording sync', bn: 'মিটিং নোট + রেকর্ডিং সিঙ্ক' },
        { en: 'Mobile app (iOS + Android)', bn: 'মোবাইল অ্যাপ (iOS + Android)' },
        { en: 'Role-based permissions + audit logs', bn: 'রোল-বেসড পারমিশন + অডিট লগ' },
      ],
    },
    {
      name: { en: 'Analytics', bn: 'অ্যানালিটিক্স' },
      icon: 'bar-chart',
      items: [
        { en: 'Real-time dashboards (custom KPIs)', bn: 'রিয়েল-টাইম ড্যাশবোর্ড (কাস্টম KPI)' },
        { en: 'Pipeline + revenue reports', bn: 'পাইপলাইন + রেভিনিউ রিপোর্ট' },
        { en: 'Salesperson performance tracking', bn: 'সেলসপার্সন পারফরম্যান্স ট্র্যাকিং' },
        { en: 'Source ROI + attribution', bn: 'সোর্স ROI + অ্যাট্রিবিউশন' },
        { en: 'Funnel + conversion analytics', bn: 'ফানেল + কনভার্সন অ্যানালিটিক্স' },
        { en: 'Exportable reports (PDF + Excel + API)', bn: 'এক্সপোর্টেবল রিপোর্ট (PDF + Excel + API)' },
      ],
    },
  ],
  total: {
    en: '20+ components · 50+ integrations · 2,000+ automations built · 0 coding required from you',
    bn: '২০+ কম্পোনেন্ট · ৫০+ ইন্টিগ্রেশন · ২,০০০+ অটোমেশন তৈরি · আপনার থেকে ০ কোডিং',
  } as Bilingual,
  cta: {
    en: 'Get my custom feature list — Free Call',
    bn: 'আমার কাস্টম ফিচার লিস্ট পান — ফ্রি কল',
  } as Bilingual,
}

/* ========================================================================== */
/*  10. USE CASES — Who This Is For                                            */
/* ========================================================================== */

export const USE_CASES = {
  eyebrow: { en: 'Built for your business', bn: 'আপনার ব্যবসার জন্য তৈরি' } as Bilingual,
  title: {
    en: 'Who this is for (and who it is NOT for)',
    bn: 'এটি কাদের জন্য (এবং কাদের জন্য নয়)',
  } as Bilingual,
  subtitle: {
    en: 'If you see yourself in any of these — we can help. If none match, we are probably not the right fit.',
    bn: 'আপনি যদি এর কোনোটিতে নিজেকে দেখেন — আমরা সাহায্য করতে পারি। কোনোটিই মিলবে না তবে আমরা সম্ভবত সঠিক ফিট নই।',
  } as Bilingual,
  audiences: [
    {
      icon: 'briefcase',
      title: { en: 'Business Owners', bn: 'ব্যবসার মালিক' },
      problem: {
        en: 'You have no idea what your sales team is doing. Pipeline is a black box. Revenue is unpredictable.',
        bn: 'আপনার সেলস টিম কী করছে তা আপনার কোনো ধারণা নেই। পাইপলাইন একটি ব্ল্যাক বক্স। রেভিনিউ অনুমেয় নয়।',
      },
      outcome: {
        en: 'Live dashboard on your phone. Every lead, every deal, every salesperson — visible 24/7. Revenue forecast 95%+ accurate.',
        bn: 'আপনার ফোনে লাইভ ড্যাশবোর্ড। প্রতিটি লিড, প্রতিটি ডিল, প্রতিটি সেলসপার্সন — ২৪/৭ দৃশ্যমান। রেভিনিউ ফোরকাস্ট ৯৫%+ নির্ভুল।',
      },
      how: {
        en: 'Custom CEO dashboard, weekly automated reports, real-time alerts on big deals, pipeline value tracking.',
        bn: 'কাস্টম CEO ড্যাশবোর্ড, সাপ্তাহিক অটোমেটেড রিপোর্ট, বড় ডিলে রিয়েল-টাইম অ্যালার্ট, পাইপলাইন ভ্যালু ট্র্যাকিং।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Sales Teams', bn: 'সেলস টিম' },
      problem: {
        en: 'You spend 60% of your day on admin work — data entry, follow-up reminders, scheduling. Only 30% on selling.',
        bn: 'আপনি দিনের ৬০% অ্যাডমিন কাজে কাটান — ডেটা এন্ট্রি, ফলো-আপ রিমাইন্ডার, শিডিউলিং। মাত্র ৩০% বিক্রিতে।',
      },
      outcome: {
        en: 'Spend 80% of your day selling. CRM handles the rest — auto-logging, auto-reminding, auto-scheduling, auto-proposing.',
        bn: 'দিনের ৮০% বিক্রিতে কাটান। বাকিটা CRM সামলায় — অটো-লগিং, অটো-রিমাইন্ডিং, অটো-শিডিউলিং, অটো-প্রপোজিং।',
      },
      how: {
        en: 'Mobile CRM app, voice-to-text note logging, AI proposal drafts, smart daily task list, one-click follow-up.',
        bn: 'মোবাইল CRM অ্যাপ, ভয়েস-টু-টেক্সট নোট লগিং, AI প্রপোজাল ড্রাফট, স্মার্ট ডেইলি টাস্ক লিস্ট, ওয়ান-ক্লিক ফলো-আপ।',
      },
    },
    {
      icon: 'hospital',
      title: { en: 'Healthcare', bn: 'হেলথকেয়ার' },
      problem: {
        en: 'Patients call for appointments, rescheduling, test results. Front desk overwhelmed. 30%+ calls missed.',
        bn: 'রোগীরা অ্যাপয়েন্টমেন্ট, রিশিডিউল, টেস্ট রেজাল্টের জন্য কল করে। ফ্রন্ট ডেস্ক পেশেন্টে ভোগে। ৩০%+ কল মিস।',
      },
      outcome: {
        en: 'AI handles 85% of calls. Appointments up 150%. No-show rate down 40%. Front desk free for in-clinic patients.',
        bn: 'AI ৮৫% কল সামলায়। অ্যাপয়েন্টমেন্ট ১৫০% বেশি। নো-শো রেট ৪০% কম। ক্লিনিকের রোগীদের জন্য ফ্রন্ট ডেস্ক ফ্রি।',
      },
      how: {
        en: 'AI voice agent (Bangla+English), patient CRM, appointment automation, test result delivery, medication reminders.',
        bn: 'AI ভয়েস এজেন্ট (বাংলা+ইংরেজি), পেশেন্ট CRM, অ্যাপয়েন্টমেন্ট অটোমেশন, টেস্ট রেজাল্ট ডেলিভারি, মেডিকেশন রিমাইন্ডার।',
      },
    },
    {
      icon: 'home',
      title: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      problem: {
        en: '1,000 leads/month, 1.8 follow-ups average, 1% close rate. 98% of paid leads never buy. Massive ad spend waste.',
        bn: 'মাসে ১,০০০ লিড, গড় ১.৮ ফলো-আপ, ১% ক্লোজ রেট। ৯৮% পেইড লিড কখনো কেনে না। বিশাল অ্যাড স্পেন্ড নষ্ট।',
      },
      outcome: {
        en: '3–4x site visit conversion. 2.5–4x revenue from same ad spend. 3% recovery from reactivation campaigns.',
        bn: '৩–৪x সাইট ভিজিট কনভার্সন। একই অ্যাড স্পেন্ড থেকে ২.৫–৪x রেভিনিউ। রিঅ্যাক্টিভেশন ক্যাম্পেইন থেকে ৩% রিকভারি।',
      },
      how: {
        en: 'Multi-source lead capture, 5-sec auto-response, 4-question AI qualification, 14-day nurture, site visit automation, pipeline accountability.',
        bn: 'মাল্টি-সোর্স লিড ক্যাপচার, ৫-সেকেন্ড অটো-রেসপন্স, ৪-প্রশ্নের AI কোয়ালিফিকেশন, ১৪-দিনের নার্চার, সাইট ভিজিট অটোমেশন, পাইপলাইন অ্যাকাউন্টবিলিটি।',
      },
    },
    {
      icon: 'graduation-cap',
      title: { en: 'Education', bn: 'শিক্ষা' },
      problem: {
        en: 'Admission inquiries from 5 channels, no central tracking. Counselors do not follow up. 70% of inquiries go cold.',
        bn: '৫ চ্যানেল থেকে অ্যাডমিশন ইনকোয়ারি, কোনো সেন্ট্রাল ট্র্যাকিং নেই। কাউন্সেলররা ফলো-আপ করে না। ৭০% ইনকোয়ারি কোল্ড হয়।',
      },
      outcome: {
        en: 'Every inquiry captured, qualified, nurtured. Enrollment up 60%. Counselor productivity up 3x.',
        bn: 'প্রতিটি ইনকোয়ারি ক্যাপচার, কোয়ালিফাইড, নার্চার্ড। এনরোলমেন্ট ৬০% বেশি। কাউন্সেলর প্রোডাক্টিভিটি ৩x বেশি।',
      },
      how: {
        en: 'Multi-channel inquiry capture, AI qualification (course, budget, timeline), nurture sequences, parent + student CRM, enrollment pipeline.',
        bn: 'মাল্টি-চ্যানেল ইনকোয়ারি ক্যাপচার, AI কোয়ালিফিকেশন (কোর্স, বাজেট, টাইমলাইন), নার্চার সিকোয়েন্স, প্যারেন্ট + স্টুডেন্ট CRM, এনরোলমেন্ট পাইপলাইন।',
      },
    },
    {
      icon: 'factory',
      title: { en: 'Manufacturing', bn: 'উৎপাদন' },
      problem: {
        en: 'B2B inquiries from website, trade shows, dealer network. Quotation takes 3 days. 40% of inquiries lost to faster competitors.',
        bn: 'ওয়েবসাইট, ট্রেড শো, ডিলার নেটওয়ার্ক থেকে B2B ইনকোয়ারি। কোটেশনে ৩ দিন। ৪০% ইনকোয়ারি দ্রুত প্রতিযোগীর কাছে হারায়।',
      },
      outcome: {
        en: 'Auto-quotation in 3 minutes. Dealer portal. Order tracking. 3x faster B2B sales cycle.',
        bn: '৩ মিনিটে অটো-কোটেশন। ডিলার পোর্টাল। অর্ডার ট্র্যাকিং। ৩x দ্রুত B2B সেলস সাইকেল।',
      },
      how: {
        en: 'B2B inquiry CRM, auto-quote engine, dealer portal, PO tracking, production handover, invoice automation.',
        bn: 'B2B ইনকোয়ারি CRM, অটো-কোট ইঞ্জিন, ডিলার পোর্টাল, PO ট্র্যাকিং, প্রোডাকশন হ্যান্ডওভার, ইনভয়েস অটোমেশন।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Service Companies', bn: 'সার্ভিস কোম্পানি' },
      problem: {
        en: 'Service requests lost in WhatsApp groups. No ticket tracking. Customer churns because "nobody responded".',
        bn: 'WhatsApp গ্রুপে সার্ভিস রিকোয়েস্ট হারায়। কোনো টিকিট ট্র্যাকিং নেই। গ্রাহক চলে যায় কারণ "কেউ রেসপন্ড করেনি"।',
      },
      outcome: {
        en: 'Every request a tracked ticket. Auto-assignment. SLA monitoring. CSAT up 40%. Churn down 50%.',
        bn: 'প্রতিটি রিকোয়েস্ট একটি ট্র্যাকড টিকিট। অটো-অ্যাসাইনমেন্ট। SLA মনিটরিং। CSAT ৪০% বেশি। চার্ন ৫০% কম।',
      },
      how: {
        en: 'Service ticket CRM, SLA automation, customer portal, satisfaction surveys, renewal automation.',
        bn: 'সার্ভিস টিকিট CRM, SLA অটোমেশন, কাস্টমার পোর্টাল, স্যাটিসফ্যাকশন সার্ভে, রিনিউয়াল অটোমেশন।',
      },
    },
    {
      icon: 'rocket',
      title: { en: 'Agencies', bn: 'এজেন্সি' },
      problem: {
        en: 'Client onboarding takes 2 weeks. Project status updates are manual. 30% of clients churn after 6 months.',
        bn: 'ক্লায়েন্ট অনবোর্ডিং ২ সপ্তাহ। প্রজেক্ট স্ট্যাটাস আপডেট ম্যানুয়াল। ৩০% ক্লায়েন্ট ৬ মাস পর চলে যায়।',
      },
      outcome: {
        en: 'Onboarding in 1 day. Auto status reports. 90% client retention. 3x more clients per account manager.',
        bn: '১ দিনে অনবোর্ডিং। অটো স্ট্যাটাস রিপোর্ট। ৯০% ক্লায়েন্ট রিটেনশন। প্রতি অ্যাকাউন্ট ম্যানেজারে ৩x বেশি ক্লায়েন্ট।',
      },
      how: {
        en: 'Client CRM, project pipeline, auto onboarding, weekly status reports, retainer tracking, renewal automation.',
        bn: 'ক্লায়েন্ট CRM, প্রজেক্ট পাইপলাইন, অটো অনবোর্ডিং, সাপ্তাহিক স্ট্যাটাস রিপোর্ট, রিটেইনার ট্র্যাকিং, রিনিউয়াল অটোমেশন।',
      },
    },
    {
      icon: 'laptop',
      title: { en: 'SaaS', bn: 'SaaS' },
      problem: {
        en: 'Free trial signups never convert. No usage tracking. No in-app outreach. 95% trial-to-paid churn.',
        bn: 'ফ্রি ট্রায়াল সাইনআপ কনভার্ট হয় না। ইউসেজ ট্র্যাকিং নেই। ইন-অ্যাপ আউটরিচ নেই। ৯৫% ট্রায়াল-টু-পেইড চার্ন।',
      },
      outcome: {
        en: 'Trial-to-paid conversion 25%+. Churn down 40%. Expansion revenue 30% of MRR.',
        bn: 'ট্রায়াল-টু-পেইড কনভার্সন ২৫%+। চার্ন ৪০% কম। এক্সপানশন রেভিনিউ MRR-এর ৩০%।',
      },
      how: {
        en: 'Product analytics integration, usage-based lead scoring, lifecycle emails, in-app messages, expansion playbooks.',
        bn: 'প্রোডাক্ট অ্যানালিটিক্স ইন্টিগ্রেশন, ইউসেজ-বেসড লিড স্কোরিং, লাইফসাইকেল ইমেইল, ইন-অ্যাপ মেসেজ, এক্সপানশন প্লেবুক।',
      },
    },
    {
      icon: 'building',
      title: { en: 'Enterprise', bn: 'এন্টারপ্রাইজ' },
      problem: {
        en: 'Multiple CRMs across departments. No unified customer view. Sales + support + marketing data siloed.',
        bn: 'বিভাগ জুড়ে একাধিক CRM। কোনো ইউনিফাইড কাস্টমার ভিউ নেই। সেলস + সাপোর্ট + মার্কেটিং ডেটা সাইলোড।',
      },
      outcome: {
        en: 'One customer view. Cross-department workflows. Single source of truth. 360° customer intelligence.',
        bn: 'এক কাস্টমার ভিউ। ক্রস-ডিপার্টমেন্ট ওয়ার্কফ্লো। সিঙ্গেল সোর্স অফ ট্রুথ। ৩৬০° কাস্টমার ইনটেলিজেন্স।',
      },
      how: {
        en: 'Enterprise CRM integration, master data management, unified dashboard, role-based access, audit logs, compliance.',
        bn: 'এন্টারপ্রাইজ CRM ইন্টিগ্রেশন, মাস্টার ডেটা ম্যানেজমেন্ট, ইউনিফাইড ড্যাশবোর্ড, রোল-বেসড অ্যাক্সেস, অডিট লগ, কমপ্লায়েন্স।',
      },
    },
  ],
  notForYou: {
    title: { en: 'Who this is NOT for', bn: 'এটি কাদের জন্য নয়' } as Bilingual,
    items: [
      { en: 'Businesses with under 50 leads/month (too small to justify)', bn: 'মাসে ৫০-এর কম লিড ব্যবসার জন্য (জাস্টিফাই করতে ছোট)' },
      { en: 'Companies that refuse to adopt any new tool', bn: 'যে কোম্পানি কোনো নতুন টুল গ্রহণ করতে অস্বীকার করে' },
      { en: 'Businesses looking for free / cheapest option only', bn: 'যারা শুধু ফ্রি / সবচেয়ে সস্তা অপশন খুঁজছেন' },
      { en: 'Companies without a sales process or willingness to define one', bn: 'যে কোম্পানির সেলস প্রসেস নেই বা একটি ডিফাইন করতে ইচ্ছা নেই' },
    ] as Bilingual[],
  },
}

/* ========================================================================== */
/*  11. AI AUTOMATION                                                          */
/* ========================================================================== */

export const AI_AUTOMATION = {
  eyebrow: { en: 'AI built in, not bolted on', bn: 'AI বিল্ট-ইন, বোল্টেড-অন নয়' } as Bilingual,
  title: {
    en: '13 AI capabilities that replace 5 hires',
    bn: '১৩টি AI ক্ষমতা যা ৫টি নিয়োগ প্রতিস্থাপন করে',
  } as Bilingual,
  subtitle: {
    en: 'GPT-4 + custom-trained models handle the work of a sales assistant, SDR, copywriter, data analyst, and QA person — for a fraction of the cost, 24/7.',
    bn: 'GPT-4 + কাস্টম-ট্রেইন্ড মডেল একজন সেলস অ্যাসিস্ট্যান্ট, SDR, কপিরাইটার, ডেটা অ্যানালিস্ট এবং QA পার্সনের কাজ করে — খরচের একটি অংশে, ২৪/৭।',
  } as Bilingual,
  features: [
    {
      icon: 'bot',
      title: { en: 'GPT-4 chatbot', bn: 'GPT-4 চ্যাটবট' },
      desc: {
        en: 'Conversational AI that understands Bangla, English and Banglish. Answers FAQs, qualifies leads, books appointments — 24/7.',
        bn: 'বাংলা, ইংরেজি ও Banglish বোঝে এমন কনভার্সেশনাল AI। FAQ উত্তর দেয়, লিড কোয়ালিফাই করে, অ্যাপয়েন্টমেন্ট বুক করে — ২৪/৭।',
      },
    },
    {
      icon: 'mic',
      title: { en: 'Voice agent (Bangla + English)', bn: 'ভয়েস এজেন্ট (বাংলা + ইংরেজি)' },
      desc: {
        en: 'Answers inbound calls in natural Bangla voice. Books appointments, handles FAQs, routes emergencies. 200ms response time.',
        bn: 'স্বাভাবিক বাংলা ভয়েসে ইনবাউন্ড কল ধরে। অ্যাপয়েন্টমেন্ট বুক করে, FAQ সামলায়, ইমার্জেন্সি রাউট করে। ২০০ms রেসপন্স।',
      },
    },
    {
      icon: 'message-circle',
      title: { en: 'WhatsApp AI replies', bn: 'WhatsApp AI রিপ্লাই' },
      desc: {
        en: 'Every WhatsApp message gets an AI reply in 3 seconds. Handles 1000+ conversations simultaneously. Hands off to human when needed.',
        bn: 'প্রতিটি WhatsApp মেসেজে ৩ সেকেন্ডে AI রিপ্লাই। ১০০০+ কনভার্সেশন একসাথে সামলায়। প্রয়োজনে মানুষে হ্যান্ডঅফ।',
      },
    },
    {
      icon: 'mail',
      title: { en: 'AI email writing', bn: 'AI ইমেইল রাইটিং' },
      desc: {
        en: 'Personalised cold emails, follow-ups, proposals — written in your brand voice. Salesperson reviews and sends. 10x output.',
        bn: 'পার্সোনালাইজড কোল্ড ইমেইল, ফলো-আপ, প্রপোজাল — আপনার ব্র্যান্ড ভয়েসে লেখা। সেলসপার্সন রিভিউ করে পাঠায়। ১০x আউটপুট।',
      },
    },
    {
      icon: 'filter',
      title: { en: 'Lead qualification', bn: 'লিড কোয়ালিফিকেশন' },
      desc: {
        en: 'AI asks 4–6 qualification questions via WhatsApp, scores the answer, routes hot leads to sales instantly. C-lead nurture sequence starts.',
        bn: 'AI WhatsApp-এ ৪–৬ কোয়ালিফিকেশন প্রশ্ন করে, উত্তর স্কোর করে, হট লিড সেলসে তাৎক্ষণিক পাঠায়। C-লিড নার্চার সিকোয়েন্স শুরু।',
      },
    },
    {
      icon: 'smile',
      title: { en: 'Sentiment analysis', bn: 'সেন্টিমেন্ট অ্যানালিসিস' },
      desc: {
        en: 'AI reads every customer message, detects frustration/risk, alerts manager. Negative sentiment → escalation workflow in 60 sec.',
        bn: 'AI প্রতিটি গ্রাহক মেসেজ পড়ে, ফ্রাস্ট্রেশন/রিস্ক ডিটেক্ট করে, ম্যানেজারকে অ্যালার্ট করে। নেগেটিভ সেন্টিমেন্ট → ৬০ সেকেন্ডে এসক্যালেশন।',
      },
    },
    {
      icon: 'target',
      title: { en: 'Intent detection', bn: 'ইনটেন্ট ডিটেকশন' },
      desc: {
        en: '"I am comparing", "send me quote", "talk to my boss" — AI detects buying signals, triggers right next action automatically.',
        bn: '"আমি তুলনা করছি", "কোট পাঠান", "বসের সাথে কথা বলুন" — AI বাইং সিগন্যাল ডিটেক্ট করে, সঠিক নেক্সট অ্যাকশন অটোমেটিক ট্রিগার করে।',
      },
    },
    {
      icon: 'file-text',
      title: { en: 'Conversation summary', bn: 'কনভার্সেশন সামারি' },
      desc: {
        en: 'After every call/chat, AI writes 3-line summary, extracts action items, updates CRM. Salesperson saves 15 min per call.',
        bn: 'প্রতিটি কল/চ্যাটের পর AI ৩-লাইন সামারি লেখে, অ্যাকশন আইটেম এক্সট্র্যাক্ট করে, CRM আপডেট করে। সেলসপার্সন প্রতি কলে ১৫ মিনিট বাঁচায়।',
      },
    },
    {
      icon: 'file-signature',
      title: { en: 'Auto proposal', bn: 'অটো প্রপোজাল' },
      desc: {
        en: 'AI generates custom proposal from CRM data — product, pricing, terms, case studies. 2-click send. Cuts 45 min → 3 min.',
        bn: 'AI CRM ডেটা থেকে কাস্টম প্রপোজাল জেনারেট করে — প্রোডাক্ট, প্রাইসিং, টার্ম, কেস স্টাডি। ২-ক্লিক সেন্ড। ৪৫ মিনিট → ৩ মিনিট।',
      },
    },
    {
      icon: 'message-square',
      title: { en: 'Auto reply', bn: 'অটো রিপ্লাই' },
      desc: {
        en: 'Common queries (pricing, hours, location, availability) get instant AI replies. 70% of inquiries resolved without human.',
        bn: 'কমন কোয়েরি (প্রাইসিং, সময়, লোকেশন, অ্যাভেইলেবিলিটি) তাৎক্ষণিক AI রিপ্লাই পায়। ৭০% ইনকোয়ারি মানুষ ছাড়া রিজল্ভ।',
      },
    },
    {
      icon: 'line-chart',
      title: { en: 'AI insights', bn: 'AI ইনসাইট' },
      desc: {
        en: '"Deals in stage X take 2.3x longer", "Rep Y wins 3x more with discount Z". AI surfaces insights managers miss.',
        bn: '"স্টেজ X-এর ডিল ২.৩x বেশি সময় নেয়", "Rep Y ডিসকাউন্ট Z-এ ৩x বেশি জেতে"। AI ম্যানেজারদের মিস করা ইনসাইট বের করে।',
      },
    },
    {
      icon: 'gauge',
      title: { en: 'Opportunity scoring', bn: 'অপারচুনিটি স্কোরিং' },
      desc: {
        en: 'Every deal gets a 0–100 win probability score, updated daily based on engagement, stage, velocity. Reps focus on real winners.',
        bn: 'প্রতিটি ডিলে ০–১০০ উইন প্রবাবিলিটি স্কোর, এনগেজমেন্ট, স্টেজ, ভেলোসিটি অনুযায়ী দৈনিক আপডেট। Rep রিয়েল উইনারে ফোকাস।',
      },
    },
    {
      icon: 'trending-down',
      title: { en: 'Churn prediction', bn: 'চার্ন প্রেডিকশন' },
      desc: {
        en: 'AI predicts which customers will churn in next 30 days, triggers save playbooks automatically. Cuts churn 30–50%.',
        bn: 'AI প্রেডিক্ট করে কোন গ্রাহক পরবর্তী ৩০ দিনে চার্ন করবে, অটোমেটিক সেভ প্লেবুক ট্রিগার করে। চার্ন ৩০–৫০% কমায়।',
      },
    },
  ],
  costCompare: {
    label: { en: '5 hires replaced', bn: '৫টি নিয়োগ প্রতিস্থাপিত' } as Bilingual,
    items: [
      { role: { en: 'Sales assistant', bn: 'সেলস অ্যাসিস্ট্যান্ট' }, cost: '৳25,000/mo' },
      { role: { en: 'SDR (cold outreach)', bn: 'SDR (কোল্ড আউটরিচ)' }, cost: '৳40,000/mo' },
      { role: { en: 'Copywriter', bn: 'কপিরাইটার' }, cost: '৳30,000/mo' },
      { role: { en: 'Data analyst', bn: 'ডেটা অ্যানালিস্ট' }, cost: '৳45,000/mo' },
      { role: { en: 'QA / support', bn: 'QA / সাপোর্ট' }, cost: '৳22,000/mo' },
    ],
    total: { en: '৳1,62,000/mo saved', bn: '৳১,৬২,০০০/মাস বাঁচে' } as Bilingual,
    vs: { en: 'vs. CRM plan starting at ৳25,000/mo', bn: 'বনাম CRM প্ল্যান শুরু ৳২৫,০০০/মাস' } as Bilingual,
  },
}

/* ========================================================================== */
/*  12. INTEGRATIONS — Ecosystem                                               */
/* ========================================================================== */

export const INTEGRATIONS = {
  eyebrow: { en: 'Connected ecosystem', bn: 'কানেক্টেড ইকোসিস্টেম' } as Bilingual,
  title: {
    en: '50+ tools connected, one source of truth',
    bn: '৫০+ টুল কানেক্টেড, এক সোর্স অফ ট্রুথ',
  } as Bilingual,
  subtitle: {
    en: 'Your CRM talks to every tool you already use. No more copy-paste between systems. No more "island" software.',
    bn: 'আপনার CRM আপনার ব্যবহার করা প্রতিটি টুলের সাথে কথা বলে। সিস্টেমের মধ্যে আর কপি-পেস্ট নেই। আর কোনো "আইল্যান্ড" সফটওয়্যার নেই।',
  } as Bilingual,
  groups: [
    {
      name: { en: 'Advertising', bn: 'অ্যাডভারটাইজিং' },
      items: [
        { name: 'Meta Ads (Facebook + Instagram)', icon: 'megaphone' },
        { name: 'Google Ads', icon: 'search' },
        { name: 'LinkedIn Ads', icon: 'briefcase' },
        { name: 'TikTok Ads', icon: 'music' },
      ],
    },
    {
      name: { en: 'Payments', bn: 'পেমেন্ট' },
      items: [
        { name: 'bKash', icon: 'credit-card' },
        { name: 'Nagad', icon: 'credit-card' },
        { name: 'Stripe', icon: 'credit-card' },
        { name: 'Razorpay', icon: 'credit-card' },
        { name: 'SSL Commerz', icon: 'credit-card' },
      ],
    },
    {
      name: { en: 'Communications', bn: 'কমিউনিকেশন' },
      items: [
        { name: 'WhatsApp Business API', icon: 'message-circle' },
        { name: 'Twilio (SMS + Voice)', icon: 'phone' },
        { name: 'Brevo (email)', icon: 'mail' },
        { name: 'Mailchimp', icon: 'mail' },
        { name: 'Slack', icon: 'message-square' },
        { name: 'Microsoft Teams', icon: 'users' },
      ],
    },
    {
      name: { en: 'Automation', bn: 'অটোমেশন' },
      items: [
        { name: 'Zapier', icon: 'bolt' },
        { name: 'Make (Integromat)', icon: 'cogs' },
        { name: 'n8n', icon: 'code' },
        { name: 'Custom webhooks', icon: 'git-branch' },
      ],
    },
    {
      name: { en: 'Calendar + Meetings', bn: 'ক্যালেন্ডার + মিটিং' },
      items: [
        { name: 'Google Calendar', icon: 'calendar' },
        { name: 'Microsoft Outlook', icon: 'calendar' },
        { name: 'Calendly', icon: 'calendar-check' },
        { name: 'Zoom', icon: 'video' },
        { name: 'Google Meet', icon: 'video' },
      ],
    },
    {
      name: { en: 'Storage + Docs', bn: 'স্টোরেজ + ডকস' },
      items: [
        { name: 'Google Sheets', icon: 'table' },
        { name: 'Airtable', icon: 'database' },
        { name: 'Google Drive', icon: 'folder' },
        { name: 'Dropbox', icon: 'folder' },
      ],
    },
    {
      name: { en: 'AI + Voice', bn: 'AI + ভয়েস' },
      items: [
        { name: 'OpenAI GPT-4', icon: 'cpu' },
        { name: 'ElevenLabs (voice)', icon: 'mic' },
        { name: 'Whisper (STT)', icon: 'mic' },
        { name: 'Anthropic Claude', icon: 'cpu' },
      ],
    },
    {
      name: { en: 'Custom', bn: 'কাস্টম' },
      items: [
        { name: 'REST API', icon: 'code' },
        { name: 'GraphQL', icon: 'code' },
        { name: 'Webhooks (in + out)', icon: 'git-branch' },
        { name: 'Custom SDK', icon: 'code' },
      ],
    },
  ],
  custom: {
    en: 'Need an integration we have not listed? We build custom integrations in 3–5 days. If it has an API, we can connect it.',
    bn: 'এমন ইন্টিগ্রেশন দরকার যা আমরা লিস্ট করিনি? আমরা ৩–৫ দিনে কাস্টম ইন্টিগ্রেশন বিল্ড করি। এর API থাকলে, আমরা কানেক্ট করতে পারি।',
  } as Bilingual,
}

/* ========================================================================== */
/*  13. COMPARISON — Traditional vs NextGen                                    */
/* ========================================================================== */

export const COMPARISON = {
  eyebrow: { en: 'Side-by-side', bn: 'পাশাপাশি তুলনা' } as Bilingual,
  title: {
    en: 'Traditional CRM vs NextGen AI CRM',
    bn: 'ঐতিহ্যবাহী CRM বনাম NextGen AI CRM',
  } as Bilingual,
  subtitle: {
    en: 'The same business, the same leads, the same salespeople — but a completely different outcome.',
    bn: 'একই ব্যবসা, একই লিড, একই সেলসপার্সন — কিন্তু সম্পূর্ণ ভিন্ন ফলাফল।',
  } as Bilingual,
  headers: {
    traditional: { en: 'Traditional CRM', bn: 'ঐতিহ্যবাহী CRM' } as Bilingual,
    nextgen: { en: 'NextGen AI CRM', bn: 'NextGen AI CRM' } as Bilingual,
  },
  rows: [
    {
      metric: { en: 'Lead response time', bn: 'লিড রেসপন্স টাইম' },
      traditional: { en: '24–48 hours', bn: '২৪–৪৮ ঘন্টা' },
      nextgen: { en: '<45 seconds', bn: '<৪৫ সেকেন্ড' },
    },
    {
      metric: { en: 'Follow-up attempts', bn: 'ফলো-আপ চেষ্টা' },
      traditional: { en: '1.8 average', bn: 'গড় ১.৮' },
      nextgen: { en: '5–12 automated', bn: '৫–১২ অটোমেটেড' },
    },
    {
      metric: { en: 'Lead scoring', bn: 'লিড স্কোরিং' },
      traditional: { en: 'Manual gut feel', bn: 'ম্যানুয়াল অনুভূতি' },
      nextgen: { en: 'AI-powered, 25+ signals', bn: 'AI-চালিত, ২৫+ সিগন্যাল' },
    },
    {
      metric: { en: 'Salesperson time on selling', bn: 'সেলসপার্সন বিক্রিতে সময়' },
      traditional: { en: '30%', bn: '৩০%' },
      nextgen: { en: '80%', bn: '৮০%' },
    },
    {
      metric: { en: 'Reporting', bn: 'রিপোর্টিং' },
      traditional: { en: 'Excel, 3 days late', bn: 'এক্সেল, ৩ দিন দেরি' },
      nextgen: { en: 'Real-time dashboards', bn: 'রিয়েল-টাইম ড্যাশবোর্ড' },
    },
    {
      metric: { en: 'Revenue forecast accuracy', bn: 'রেভিনিউ ফোরকাস্ট নির্ভুলতা' },
      traditional: { en: '40%', bn: '৪০%' },
      nextgen: { en: '95%+', bn: '৯৫%+' },
    },
    {
      metric: { en: 'AI capabilities', bn: 'AI ক্ষমতা' },
      traditional: { en: 'None', bn: 'কোনোটি নেই' },
      nextgen: { en: '13 AI features built-in', bn: '১৩টি AI ফিচার বিল্ট-ইন' },
    },
    {
      metric: { en: 'Setup time', bn: 'সেটআপ সময়' },
      traditional: { en: '3–6 months', bn: '৩–৬ মাস' },
      nextgen: { en: '3–10 days', bn: '৩–১০ দিন' },
    },
    {
      metric: { en: 'Team adoption', bn: 'টিম অ্যাডপশন' },
      traditional: { en: '12%', bn: '১২%' },
      nextgen: { en: '85%+', bn: '৮৫%+' },
    },
    {
      metric: { en: 'Monthly cost (incl. setup)', bn: 'মাসিক খরচ (সেটআপসহ)' },
      traditional: { en: '৳50,000+ (manual work)', bn: '৳৫০,০০০+ (ম্যানুয়াল কাজ)' },
      nextgen: { en: '৳25,000 (automated)', bn: '৳২৫,০০০ (অটোমেটেড)' },
    },
  ],
  verdict: {
    en: 'Same leads. Same team. 3–4x more revenue. That is the NextGen difference.',
    bn: 'একই লিড। একই টিম। ৩–৪x বেশি রেভিনিউ। এটাই NextGen-এর পার্থক্য।',
  } as Bilingual,
}

/* ========================================================================== */
/*  14. BEFORE / AFTER DASHBOARD                                               */
/* ========================================================================== */

export const BEFORE_AFTER = {
  eyebrow: { en: 'Before vs After', bn: 'বিফোর বনাম আফটার' } as Bilingual,
  title: {
    en: 'Your CRM today vs NextGen AI CRM',
    bn: 'আজকের CRM বনাম NextGen AI CRM',
  } as Bilingual,
  subtitle: {
    en: 'One glance. See exactly what changes when you switch from manual CRM to AI-powered automation.',
    bn: 'এক নজরে দেখুন — ম্যানুয়াল CRM থেকে AI-চালিত অটোমেশনে গেলে ঠিক কী বদলায়।',
  } as Bilingual,
  before: {
    label: { en: 'Before (Manual CRM)', bn: 'বিফোর (ম্যানুয়াল CRM)' } as Bilingual,
    color: 'red',
    metrics: [
      { label: { en: 'Leads lost / month', bn: 'মাসে লিড হারানো' }, value: { en: '52', bn: '৫২' } },
      { label: { en: 'Follow-up time', bn: 'ফলো-আপ সময়' }, value: { en: '48 hours', bn: '৪৮ ঘন্টা' } },
      { label: { en: 'Revenue forecast', bn: 'রেভিনিউ ফোরকাস্ট' }, value: { en: 'Unknown', bn: 'অজানা' } },
      { label: { en: 'Sales time on selling', bn: 'বিক্রিতে সেলস টাইম' }, value: { en: '30%', bn: '৩০%' } },
      { label: { en: 'Lead scoring', bn: 'লিড স্কোরিং' }, value: { en: 'None', bn: 'নেই' } },
      { label: { en: 'Duplicate contacts', bn: 'ডুপ্লিকেট কন্ট্যাক্ট' }, value: { en: '20%', bn: '২০%' } },
      { label: { en: 'Team adoption', bn: 'টিম অ্যাডপশন' }, value: { en: '12%', bn: '১২%' } },
      { label: { en: 'Pipeline visibility', bn: 'পাইপলাইন ভিজিবিলিটি' }, value: { en: 'Black box', bn: 'ব্ল্যাক বক্স' } },
    ],
  },
  after: {
    label: { en: 'After (NextGen AI CRM)', bn: 'আফটার (NextGen AI CRM)' } as Bilingual,
    color: 'green',
    metrics: [
      { label: { en: 'Leads lost / month', bn: 'মাসে লিড হারানো' }, value: { en: '3', bn: '৩' } },
      { label: { en: 'Follow-up time', bn: 'ফলো-আপ সময়' }, value: { en: '45 seconds', bn: '৪৫ সেকেন্ড' } },
      { label: { en: 'Revenue forecast', bn: 'রেভিনিউ ফোরকাস্ট' }, value: { en: '98% accurate', bn: '৯৮% নির্ভুল' } },
      { label: { en: 'Sales time on selling', bn: 'বিক্রিতে সেলস টাইম' }, value: { en: '80%', bn: '৮০%' } },
      { label: { en: 'Lead scoring', bn: 'লিড স্কোরিং' }, value: { en: 'AI-powered', bn: 'AI-চালিত' } },
      { label: { en: 'Duplicate contacts', bn: 'ডুপ্লিকেট কন্ট্যাক্ট' }, value: { en: '0.5%', bn: '০.৫%' } },
      { label: { en: 'Team adoption', bn: 'টিম অ্যাডপশন' }, value: { en: '85%+', bn: '৮৫%+' } },
      { label: { en: 'Pipeline visibility', bn: 'পাইপলাইন ভিজিবিলিটি' }, value: { en: '100% real-time', bn: '১০০% রিয়েল-টাইম' } },
    ],
  },
  transformation: {
    en: 'Same business. Same leads. Same salespeople. 3–4x more revenue. That is the NextGen transformation.',
    bn: 'একই ব্যবসা। একই লিড। একই সেলসপার্সন। ৩–৪x বেশি রেভিনিউ। এটাই NextGen ট্রান্সফরমেশন।',
  } as Bilingual,
}

/* ========================================================================== */
/*  15. BENEFITS                                                               */
/* ========================================================================== */

export const BENEFITS = {
  eyebrow: { en: 'What you actually get', bn: 'আপনি আসলে কী পান' } as Bilingual,
  title: {
    en: '8 transformational benefits',
    bn: '৮টি ট্রান্সফরমেশনাল সুবিধা',
  } as Bilingual,
  subtitle: {
    en: 'Not features. Outcomes. Each one is something you can measure on day 30.',
    bn: 'ফিচার নয়। ফলাফল। প্রতিটি ৩০তম দিনে মাপা যায়।',
  } as Bilingual,
  items: [
    {
      icon: 'zap',
      title: { en: '10x faster lead response', bn: '১০x দ্রুত লিড রেসপন্স' },
      desc: {
        en: 'Every lead acknowledged in 45 seconds, not 48 hours. Hot leads called in 5 minutes. 21x higher conversion.',
        bn: 'প্রতিটি লিড ৪৫ সেকেন্ডে অ্যাকনোলেজ, ৪৮ ঘন্টা নয়। হট লিড ৫ মিনিটে কল। ২১x বেশি কনভার্সন।',
      },
    },
    {
      icon: 'trending-up',
      title: { en: '20% higher close rate', bn: '২০% বেশি ক্লোজ রেট' },
      desc: {
        en: 'AI scoring + 5–12 follow-ups + perfect timing = more deals closed. Same leads, 1.2–1.4x more wins.',
        bn: 'AI স্কোরিং + ৫–১২ ফলো-আপ + পারফেক্ট টাইমিং = বেশি ডিল ক্লোজ। একই লিড, ১.২–১.৪x বেশি উইন।',
      },
    },
    {
      icon: 'eye',
      title: { en: '100% pipeline visibility', bn: '১০০% পাইপলাইন ভিজিবিলিটি' },
      desc: {
        en: 'Every deal, every stage, every salesperson — live on your phone. No more guessing. No more surprises.',
        bn: 'প্রতিটি ডিল, প্রতিটি স্টেজ, প্রতিটি সেলসপার্সন — আপনার ফোনে লাইভ। আর কোনো অনুমান নেই। আর কোনো সারপ্রাইজ নেই।',
      },
    },
    {
      icon: 'gauge',
      title: { en: '95% accurate revenue forecast', bn: '৯৫% নির্ভুল রেভিনিউ ফোরকাস্ট' },
      desc: {
        en: 'AI predicts next month\'s revenue within 5% margin. Plan hiring, inventory, expansion with confidence.',
        bn: 'AI আগামী মাসের রেভিনিউ ৫% মার্জিনে প্রেডিক্ট করে। নিয়োগ, ইনভেন্টরি, এক্সপানশন আত্মবিশ্বাসে প্ল্যান করুন।',
      },
    },
    {
      icon: 'clock',
      title: { en: '70% less manual work', bn: '৭০% কম ম্যানুয়াল কাজ' },
      desc: {
        en: 'Data entry, reminders, follow-ups, proposals, reports — all automated. Salespeople sell. Managers manage.',
        bn: 'ডেটা এন্ট্রি, রিমাইন্ডার, ফলো-আপ, প্রপোজাল, রিপোর্ট — সব অটোমেটেড। সেলসপার্সন বিক্রি করে। ম্যানেজার ম্যানেজ করে।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Team actually uses it', bn: 'টিম আসলেই ব্যবহার করে' },
      desc: {
        en: 'Frictionless mobile app, voice logging, AI assistance. 85%+ adoption vs 12% industry average.',
        bn: 'ফ্রিকশনলেস মোবাইল অ্যাপ, ভয়েস লগিং, AI অ্যাসিস্ট্যান্স। ইন্ডাস্ট্রি গড় ১২% এর বদলে ৮৫%+ অ্যাডপশন।',
      },
    },
    {
      icon: 'shield-check',
      title: { en: 'Zero revenue leakage', bn: 'জিরো রেভিনিউ লিকেজ' },
      desc: {
        en: 'Every lead tracked. Every follow-up logged. Every invoice chased. Every payment recorded. 8–15% recovered.',
        bn: 'প্রতিটি লিড ট্র্যাকড। প্রতিটি ফলো-আপ লগড। প্রতিটি ইনভয়েস চেজড। প্রতিটি পেমেন্ট রেকর্ডেড। ৮–১৫% রিকভার্ড।',
      },
    },
    {
      icon: 'line-chart',
      title: { en: 'Predictable, scalable revenue', bn: 'পূর্বানুমেয়, স্কেলেবল রেভিনিউ' },
      desc: {
        en: 'When you know your conversion rate, average deal size and sales cycle — revenue becomes a math problem, not a guessing game.',
        bn: 'কনভার্সন রেট, গড় ডিল সাইজ ও সেলস সাইকেল জানলে — রেভিনিউ একটি ম্যাথ প্রবলেম, অনুমানের খেলা নয়।',
      },
    },
  ],
}

/* ========================================================================== */
/*  16. BUSINESS OUTCOMES                                                      */
/* ========================================================================== */

export const BUSINESS_OUTCOMES = {
  eyebrow: { en: 'Outcomes, not features', bn: 'ফলাফল, ফিচার নয়' } as Bilingual,
  title: {
    en: 'What changes in your business in 90 days',
    bn: '৯০ দিনে আপনার ব্যবসায় কী বদলায়',
  } as Bilingual,
  subtitle: {
    en: 'These are not promises. These are the average results our 50+ clients see in the first 90 days after go-live.',
    bn: 'এগুলো প্রতিশ্রুতি নয়। এগুলো আমাদের ৫০+ ক্লায়েন্ট গো-লাইভের পর প্রথম ৯০ দিনে দেখা গড় ফলাফল।',
  } as Bilingual,
  outcomes: [
    {
      icon: 'clock',
      metric: '94%',
      title: { en: 'Reduction in response time', bn: 'রেসপন্স টাইম কমে' },
      desc: {
        en: 'From 48 hours average to under 45 seconds. Hot leads get a call within 5 minutes — every single time.',
        bn: 'গড় ৪৮ ঘন্টা থেকে ৪৫ সেকেন্ডের নিচে। হট লিড ৫ মিনিটের মধ্যে কল পায় — প্রতিবার।',
      },
    },
    {
      icon: 'calendar-check',
      metric: '2.4x',
      title: { en: 'Increase in appointments', bn: 'অ্যাপয়েন্টমেন্ট বৃদ্ধি' },
      desc: {
        en: 'AI books meetings while you sleep. 24/7 availability. No-show rate cut in half with smart reminders.',
        bn: 'AI আপনার ঘুমের সময় মিটিং বুক করে। ২৪/৭ অ্যাভেইলেবিলিটি। স্মার্ট রিমাইন্ডারে নো-শো অর্ধেক।',
      },
    },
    {
      icon: 'trophy',
      metric: '24%',
      title: { en: 'Higher close rate', bn: 'উচ্চ ক্লোজ রেট' },
      desc: {
        en: 'Better leads (AI scored), better timing (5–12 follow-ups), better proposals (AI drafted). Same team, more wins.',
        bn: 'ভালো লিড (AI স্কোরড), ভালো টাইমিং (৫–১২ ফলো-আপ), ভালো প্রপোজাল (AI ড্রাফটেড)। একই টিম, বেশি উইন।',
      },
    },
    {
      icon: 'trending-up',
      metric: '4.2x',
      title: { en: 'ROI in first 90 days', bn: 'প্রথম ৯০ দিনে ROI' },
      desc: {
        en: 'Average client sees 4.2x return on CRM investment within 3 months. By month 12, average is 11x.',
        bn: 'গড় ক্লায়েন্ট ৩ মাসের মধ্যে CRM ইনভেস্টমেন্টে ৪.২x রিটার্ন দেখে। ১২ মাসে গড় ১১x।',
      },
    },
    {
      icon: 'clock',
      metric: '70%',
      title: { en: 'Less manual work', bn: 'কম ম্যানুয়াল কাজ' },
      desc: {
        en: 'Salespeople spend 70% less time on admin. Reallocation to selling activities — calls, demos, closing.',
        bn: 'সেলসপার্সন ৭০% কম সময় অ্যাডমিনে কাটায়। বিক্রির কাজে পুনঃবণ্টন — কল, ডেমো, ক্লোজিং।',
      },
    },
    {
      icon: 'line-chart',
      metric: '3.2x',
      title: { en: 'Pipeline growth', bn: 'পাইপলাইন বৃদ্ধি' },
      desc: {
        en: 'More leads captured (no leakage), more deals in pipeline (better follow-up), more revenue forecasted (95% accurate).',
        bn: 'বেশি লিড ক্যাপচার (কোনো লিকেজ নেই), পাইপলাইনে বেশি ডিল (ভালো ফলো-আপ), বেশি রেভিনিউ ফোরকাস্ট (৯৫% নির্ভুল)।',
      },
    },
    {
      icon: 'gauge',
      metric: '95%',
      title: { en: 'Forecast accuracy', bn: 'ফোরকাস্ট নির্ভুলতা' },
      desc: {
        en: 'Predict next month\'s revenue within 5% margin. Plan inventory, hiring, expansion with confidence.',
        bn: 'আগামী মাসের রেভিনিউ ৫% মার্জিনে প্রেডিক্ট করুন। ইনভেন্টরি, নিয়োগ, এক্সপানশন আত্মবিশ্বাসে প্ল্যান।',
      },
    },
    {
      icon: 'bar-chart',
      metric: '100%',
      title: { en: 'Real-time reporting', bn: 'রিয়েল-টাইম রিপোর্টিং' },
      desc: {
        en: 'No more waiting 3 days for monthly reports. Live dashboards on every device. Decisions made on today\'s data.',
        bn: 'মাসিক রিপোর্টের জন্য আর ৩ দিন অপেক্ষা নেই। প্রতিটি ডিভাইসে লাইভ ড্যাশবোর্ড। আজকের ডেটায় সিদ্ধান্ত।',
      },
    },
  ],
}

/* ========================================================================== */
/*  17. INDUSTRIES                                                             */
/* ========================================================================== */

export const INDUSTRIES = {
  eyebrow: { en: 'Industry templates', bn: 'ইন্ডাস্ট্রি টেমপ্লেট' } as Bilingual,
  title: {
    en: '12 industry-specific CRM templates',
    bn: '১২টি ইন্ডাস্ট্রি-স্পেসিফিক CRM টেমপ্লেট',
  } as Bilingual,
  subtitle: {
    en: 'We do not start from scratch. We start from a proven template tuned for your industry — then customise.',
    bn: 'আমরা স্ক্র্যাচ থেকে শুরু করি না। আপনার ইন্ডাস্ট্রির জন্য টিউনড প্রমাণিত টেমপ্লেট থেকে শুরু — তারপর কাস্টমাইজ।',
  } as Bilingual,
  items: [
    {
      icon: 'hospital',
      name: { en: 'Healthcare', bn: 'হেলথকেয়ার' },
      desc: { en: 'Patient CRM, appointment automation, AI voice agent (Bangla), test result delivery, medication reminders, no-show reduction.', bn: 'পেশেন্ট CRM, অ্যাপয়েন্টমেন্ট অটোমেশন, AI ভয়েস এজেন্ট (বাংলা), টেস্ট রেজাল্ট ডেলিভারি, মেডিকেশন রিমাইন্ডার, নো-শো কমানো।' },
    },
    {
      icon: 'graduation-cap',
      name: { en: 'Education', bn: 'শিক্ষা' },
      desc: { en: 'Inquiry capture, AI qualification (course, budget, timeline), counselor assignment, nurture sequences, enrollment pipeline, parent CRM.', bn: 'ইনকোয়ারি ক্যাপচার, AI কোয়ালিফিকেশন (কোর্স, বাজেট, টাইমলাইন), কাউন্সেলর অ্যাসাইনমেন্ট, নার্চার সিকোয়েন্স, এনরোলমেন্ট পাইপলাইন, প্যারেন্ট CRM।' },
    },
    {
      icon: 'factory',
      name: { en: 'Manufacturing', bn: 'উৎপাদন' },
      desc: { en: 'B2B inquiry CRM, auto-quote engine, dealer portal, PO tracking, production handover, invoice automation, reorder reminders.', bn: 'B2B ইনকোয়ারি CRM, অটো-কোট ইঞ্জিন, ডিলার পোর্টাল, PO ট্র্যাকিং, প্রোডাকশন হ্যান্ডওভার, ইনভয়েস অটোমেশন, রিঅর্ডার রিমাইন্ডার।' },
    },
    {
      icon: 'home',
      name: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      desc: { en: 'Multi-source lead capture, 5-sec auto-response, AI qualification, 14-day nurture, site visit automation, family decision-maker CRM, NRB pipeline.', bn: 'মাল্টি-সোর্স লিড ক্যাপচার, ৫-সেকেন্ড অটো-রেসপন্স, AI কোয়ালিফিকেশন, ১৪-দিনের নার্চার, সাইট ভিজিট অটোমেশন, ফ্যামিলি ডিসিশন-মেকার CRM, NRB পাইপলাইন।' },
    },
    {
      icon: 'users',
      name: { en: 'Agencies', bn: 'এজেন্সি' },
      desc: { en: 'Client CRM, project pipeline, auto onboarding, weekly status reports, retainer tracking, renewal automation, upsell detection.', bn: 'ক্লায়েন্ট CRM, প্রজেক্ট পাইপলাইন, অটো অনবোর্ডিং, সাপ্তাহিক স্ট্যাটাস রিপোর্ট, রিটেইনার ট্র্যাকিং, রিনিউয়াল অটোমেশন, আপসেল ডিটেকশন।' },
    },
    {
      icon: 'ship',
      name: { en: 'Export', bn: 'রপ্তানি' },
      desc: { en: 'International buyer CRM, quotation automation, LC tracking, shipment milestones, customs documentation, multi-currency invoicing.', bn: 'ইন্টারন্যাশনাল বায়ার CRM, কোটেশন অটোমেশন, LC ট্র্যাকিং, শিপমেন্ট মাইলস্টোন, কাস্টমস ডকুমেন্টেশন, মাল্টি-কারেন্সি ইনভয়েসিং।' },
    },
    {
      icon: 'gavel',
      name: { en: 'Government', bn: 'সরকার' },
      desc: { en: 'Citizen service request CRM, ticket routing, SLA monitoring, escalation automation, multilingual support, audit logs, compliance.', bn: 'সিটিজেন সার্ভিস রিকোয়েস্ট CRM, টিকিট রাউটিং, SLA মনিটরিং, এসক্যালেশন অটোমেশন, মাল্টিলিঙ্গুয়াল সাপোর্ট, অডিট লগ, কমপ্লায়েন্স।' },
    },
    {
      icon: 'heart-handshake',
      name: { en: 'NGO', bn: 'এনজিও' },
      desc: { en: 'Donor CRM, donation automation, campaign tracking, beneficiary management, impact reporting, grant compliance, multi-project tracking.', bn: 'ডোনার CRM, ডোনেশন অটোমেশন, ক্যাম্পেইন ট্র্যাকিং, বেনিফিশিয়ারি ম্যানেজমেন্ট, ইম্প্যাক্ট রিপোর্টিং, গ্রান্ট কমপ্লায়েন্স, মাল্টি-প্রজেক্ট ট্র্যাকিং।' },
    },
    {
      icon: 'banknote',
      name: { en: 'Finance', bn: 'ফিন্যান্স' },
      desc: { en: 'Loan application CRM, credit scoring integration, document automation, EMI calculator, payment reminders, collection automation.', bn: 'লোন অ্যাপ্লিকেশন CRM, ক্রেডিট স্কোরিং ইন্টিগ্রেশন, ডকুমেন্ট অটোমেশন, EMI ক্যালকুলেটর, পেমেন্ট রিমাইন্ডার, কালেকশন অটোমেশন।' },
    },
    {
      icon: 'laptop',
      name: { en: 'SaaS', bn: 'SaaS' },
      desc: { en: 'Trial-to-paid automation, usage-based scoring, lifecycle emails, in-app messages, expansion playbooks, churn prediction.', bn: 'ট্রায়াল-টু-পেইড অটোমেশন, ইউসেজ-বেসড স্কোরিং, লাইফসাইকেল ইমেইল, ইন-অ্যাপ মেসেজ, এক্সপানশন প্লেবুক, চার্ন প্রেডিকশন।' },
    },
    {
      icon: 'truck',
      name: { en: 'Logistics', bn: 'লজিস্টিকস' },
      desc: { en: 'Shipment CRM, order tracking automation, driver assignment, delivery confirmation, customer notification, POD automation.', bn: 'শিপমেন্ট CRM, অর্ডার ট্র্যাকিং অটোমেশন, ড্রাইভার অ্যাসাইনমেন্ট, ডেলিভারি কনফার্মেশন, কাস্টমার নোটিফিকেশন, POD অটোমেশন।' },
    },
    {
      icon: 'wrench',
      name: { en: 'Construction', bn: 'কনস্ট্রাকশন' },
      desc: { en: 'Project CRM, bid management, subcontractor tracking, material requisition, milestone billing, safety compliance, client progress reports.', bn: 'প্রজেক্ট CRM, বিড ম্যানেজমেন্ট, সাবকন্ট্রাক্টর ট্র্যাকিং, ম্যাটেরিয়াল রিকুইজিশন, মাইলস্টোন বিলিং, সেফটি কমপ্লায়েন্স, ক্লায়েন্ট প্রোগ্রেস রিপোর্ট।' },
    },
  ],
}

/* ========================================================================== */
/*  18. CASE STUDIES                                                           */
/* ========================================================================== */

export const CASE_STUDIES = {
  eyebrow: { en: 'Real results, real businesses', bn: 'বাস্তব ফলাফল, বাস্তব ব্যবসা' } as Bilingual,
  title: {
    en: '6 case studies — before and after NextGen CRM',
    bn: '৬টি কেস স্টাডি — NextGen CRM-এর আগে ও পরে',
  } as Bilingual,
  subtitle: {
    en: 'Real businesses, real numbers. Names changed for privacy. Results verified.',
    bn: 'বাস্তব ব্যবসা, বাস্তব সংখ্যা। গোপনীয়তার জন্য নাম পরিবর্তিত। ফলাফল যাচাইকৃত।',
  } as Bilingual,
  studies: [
    {
      industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      company: { en: 'Skyline Properties, Dhaka', bn: 'স্কাইলাইন প্রপার্টিজ, ঢাকা' },
      problem: {
        en: 'Generating 1,200 leads/month from Facebook Ads at ৳400/lead. Only 1% close rate. 98% of leads never bought. ৳4.8L/month ad spend producing ৳12Cr revenue — felt like leaving money on the table.',
        bn: 'Facebook Ads থেকে মাসে ১,২০০ লিড ৳৪০০/লিডে। মাত্র ১% ক্লোজ রেট। ৯৮% লিড কখনো কেনে না। মাসে ৳৪.৮লক্ষ অ্যাড স্পেন্ডে ৳১২কোটি রেভিনিউ — মনে হচ্ছিল টাকা টেবিলে ফেলে রাখছি।',
      },
      solution: {
        en: 'Deployed GoHighLevel CRM + multi-source lead capture (FB, website, WhatsApp, Bproperty, walk-in) + 5-second auto-response + AI 4-question qualification + 14-day nurture + site visit automation + sales manager accountability dashboard.',
        bn: 'GoHighLevel CRM + মাল্টি-সোর্স লিড ক্যাপচার (FB, ওয়েবসাইট, WhatsApp, Bproperty, ওয়াক-ইন) + ৫-সেকেন্ড অটো-রেসপন্স + AI ৪-প্রশ্ন কোয়ালিফিকেশন + ১৪-দিনের নার্চার + সাইট ভিজিট অটোমেশন + সেলস ম্যানেজার অ্যাকাউন্টবিলিটি ড্যাশবোর্ড।',
      },
      results: [
        { metric: { en: 'Site visit conversion', bn: 'সাইট ভিজিট কনভার্সন' }, before: '8%', after: '24%' },
        { metric: { en: 'Close rate (from visit)', bn: 'ক্লোজ রেট (ভিজিট থেকে)' }, before: '30%', after: '45%' },
        { metric: { en: 'Leads closed / month', bn: 'মাসে লিড ক্লোজ' }, before: '10', after: '32' },
        { metric: { en: 'Monthly revenue', bn: 'মাসিক রেভিনিউ' }, before: '৳12Cr', after: '৳38Cr' },
      ],
      roi: { en: '3.2x revenue in 4 months. ROI: 28x on CRM cost.', bn: '৪ মাসে ৩.২x রেভিনিউ। ROI: CRM খরচে ২৮x।' } as Bilingual,
      quote: {
        en: 'Speed-to-lead is everything. NextGen routes hot leads to my team in under 60 seconds. We have not lost a deal to slow response since we went live.',
        bn: 'স্পিড-টু-লিড সবকিছু। NextGen হট লিড ৬০ সেকেন্ডে আমার টিমে পাঠায়। গো-লাইভের পর আমরা স্লো রেসপন্সে একটি ডিলও হারাইনি।',
      },
      author: { en: 'Kamrul Islam, MD', bn: 'কামরুল ইসলাম, এমডি' },
    },
    {
      industry: { en: 'Healthcare', bn: 'হেলথকেয়ার' },
      company: { en: 'LifeCare Clinic, Dhanmondi', bn: 'লাইফকেয়ার ক্লিনিক, ধানমন্ডি' },
      problem: {
        en: '180 calls/day, 30-40% missed during peak hours. Front desk drowning. No-show rate 32%. Patients complaining about not getting through.',
        bn: 'দিনে ১৮০ কল, পিক আওয়ারে ৩০-৪০% মিস। ফ্রন্ট ডেস্ক ডুবছে। নো-শো রেট ৩২%। রোগীরা অভিযোগ করছে কথা বলতে পারছে না।',
      },
      solution: {
        en: 'AI voice agent (Bangla+English) handles 85% of calls. Patient CRM auto-books appointments. 24h + 1h reminders. Test result delivery via WhatsApp. Medication reminders for chronic patients.',
        bn: 'AI ভয়েস এজেন্ট (বাংলা+ইংরেজি) ৮৫% কল সামলায়। পেশেন্ট CRM অটো-বুক অ্যাপয়েন্টমেন্ট। ২৪ঘি + ১ঘি রিমাইন্ডার। WhatsApp-এ টেস্ট রেজাল্ট ডেলিভারি। ক্রনিক রোগীর জন্য মেডিকেশন রিমাইন্ডার।',
      },
      results: [
        { metric: { en: 'Missed calls', bn: 'মিসড কল' }, before: '30-40%', after: '0%' },
        { metric: { en: 'No-show rate', bn: 'নো-শো রেট' }, before: '32%', after: '14%' },
        { metric: { en: 'Appointments/month', bn: 'মাসিক অ্যাপয়েন্টমেন্ট' }, before: '3,200', after: '4,800' },
        { metric: { en: 'Front desk cost', bn: 'ফ্রন্ট ডেস্ক খরচ' }, before: '৳85,000/mo', after: '৳45,000/mo' },
      ],
      roi: { en: '150% appointment growth. ROI: 11x in 6 months.', bn: '১৫০% অ্যাপয়েন্টমেন্ট বৃদ্ধি। ROI: ৬ মাসে ১১x।' } as Bilingual,
      quote: {
        en: 'The AI chatbot handles 85% of patient queries. Our front desk is free for in-clinic patients. Appointments are up 150% — and we never miss a booking anymore.',
        bn: 'AI চ্যাটবট ৮৫% রোগীর প্রশ্ন সামলায়। আমাদের ফ্রন্ট ডেস্ক ক্লিনিকের রোগীদের জন্য ফ্রি। অ্যাপয়েন্টমেন্ট ১৫০% বেড়েছে — এবং আর কোনো বুকিং মিস হয় না।',
      },
      author: { en: 'Dr. Sarah Khan, Director', bn: 'ডা. সারা খান, পরিচালক' },
    },
    {
      industry: { en: 'E-commerce', bn: 'ই-কমার্স' },
      company: { en: 'FashionHub BD', bn: 'ফ্যাশনহাব বিডি' },
      problem: {
        en: '70% cart abandonment. COD refusals 35%. Customer support drowning in WhatsApp messages. No way to recover abandoned carts. ৳18L/month in lost revenue.',
        bn: '৭০% কার্ট অ্যাব্যান্ডনমেন্ট। COD রিফিউজাল ৩৫%। কাস্টমার সাপোর্ট WhatsApp মেসেজে ডুবছে। অ্যাব্যান্ডনড কার্ট রিকভারির উপায় নেই। মাসে ৳১৮লক্ষ রেভিনিউ লস।',
      },
      solution: {
        en: 'CRM + WhatsApp Business API + abandoned cart recovery automation + AI chatbot for support + payment links in chat + order tracking automation + customer segmentation for broadcast.',
        bn: 'CRM + WhatsApp Business API + অ্যাব্যান্ডনড কার্ট রিকভারি অটোমেশন + সাপোর্টের জন্য AI চ্যাটবট + চ্যাটে পেমেন্ট লিংক + অর্ডার ট্র্যাকিং অটোমেশন + ব্রডকাস্টের জন্য কাস্টমার সেগমেন্টেশন।',
      },
      results: [
        { metric: { en: 'Cart recovery rate', bn: 'কার্ট রিকভারি রেট' }, before: '0%', after: '24%' },
        { metric: { en: 'COD refusals', bn: 'COD রিফিউজাল' }, before: '35%', after: '11%' },
        { metric: { en: 'Support response time', bn: 'সাপোর্ট রেসপন্স টাইম' }, before: '4 hours', after: '45 sec' },
        { metric: { en: 'Recovered revenue/month', bn: 'মাসে রিকভার্ড রেভিনিউ' }, before: '৳0', after: '৳18L' },
      ],
      roi: { en: '11x ROAS on CRM investment. ৳2.16Cr additional annual revenue.', bn: 'CRM ইনভেস্টমেন্টে ১১x ROAS। বার্ষিক ৳২.১৬কোটি অতিরিক্ত রেভিনিউ।' } as Bilingual,
      quote: {
        en: 'Abandoned cart recovery alone added ৳18 lakh per month in revenue. The ROI calculator on this page actually understated what we achieved. 11x ROAS.',
        bn: 'শুধু অ্যাব্যান্ডনড কার্ট রিকভারিতে মাসে ৳১৮ লাখ রেভিনিউ যোগ হয়েছে। এই পেজের ROI ক্যালকুলেটর আসলে আমরা যা অর্জন করেছি তার চেয়ে কম দেখায়। ১১x ROAS।',
      },
      author: { en: 'Tanvir Hasan, CEO', bn: 'তানভীর হাসান, সিইও' },
    },
    {
      industry: { en: 'Education', bn: 'শিক্ষা' },
      company: { en: 'EduPlus, Chittagong', bn: 'এডুপ্লাস, চট্টগ্রাম' },
      problem: {
        en: '800 admission inquiries/month across 5 channels. Counselors followed up 1.5 times average. 70% of inquiries went cold. Enrollment stagnant at 120/year.',
        bn: '৫ চ্যানেল জুড়ে মাসে ৮০০ অ্যাডমিশন ইনকোয়ারি। কাউন্সেলররা গড় ১.৫ বার ফলো-আপ। ৭০% ইনকোয়ারি কোল্ড। এনরোলমেন্ট ১২০/বছরে স্থবির।',
      },
      solution: {
        en: 'Multi-channel inquiry CRM + AI qualification (course, budget, timeline) + 21-day nurture sequence + counselor assignment automation + parent CRM + enrollment pipeline with stage-based automation.',
        bn: 'মাল্টি-চ্যানেল ইনকোয়ারি CRM + AI কোয়ালিফিকেশন (কোর্স, বাজেট, টাইমলাইন) + ২১-দিনের নার্চার সিকোয়েন্স + কাউন্সেলর অ্যাসাইনমেন্ট অটোমেশন + প্যারেন্ট CRM + স্টেজ-বেসড অটোমেশনসহ এনরোলমেন্ট পাইপলাইন।',
      },
      results: [
        { metric: { en: 'Inquiry-to-enrollment', bn: 'ইনকোয়ারি-টু-এনরোলমেন্ট' }, before: '15%', after: '38%' },
        { metric: { en: 'Counselor productivity', bn: 'কাউন্সেলর প্রোডাক্টিভিটি' }, before: '1x', after: '3x' },
        { metric: { en: 'Annual enrollment', bn: 'বার্ষিক এনরোলমেন্ট' }, before: '120', after: '305' },
        { metric: { en: 'Revenue/year', bn: 'বার্ষিক রেভিনিউ' }, before: '৳1.2Cr', after: '৳3.05Cr' },
      ],
      roi: { en: '2.5x enrollment in 1 admission cycle. ROI: 19x.', bn: '১ অ্যাডমিশন সাইকেলে ২.৫x এনরোলমেন্ট। ROI: ১৯x।' } as Bilingual,
      quote: {
        en: 'We tried 3 other CRM tools before NextGen. None came close. The GPT-4 bot actually understands Banglish. Our customers love it.',
        bn: 'NextGen-এর আগে আমরা ৩টি CRM টুল চেষ্টা করেছি। কেউই কাছেও পৌঁছায়নি। GPT-4 বট আসলেই Banglish বোঝে। আমাদের গ্রাহকরা ভালোবাসে।',
      },
      author: { en: 'Nusrat Jahan, Marketing Head', bn: 'নুসরাত জাহান, মার্কেটিং হেড' },
    },
    {
      industry: { en: 'Manufacturing', bn: 'উৎপাদন' },
      company: { en: 'TechBazaar Industrial, Gazipur', bn: 'টেকবাজার ইন্ডাস্ট্রিয়াল, গাজীপুর' },
      problem: {
        en: 'B2B inquiries from website, trade shows, dealer network. Quotation took 3 days. 40% of inquiries lost to faster competitors. No dealer portal. Manual PO tracking.',
        bn: 'ওয়েবসাইট, ট্রেড শো, ডিলার নেটওয়ার্ক থেকে B2B ইনকোয়ারি। কোটেশনে ৩ দিন। ৪০% ইনকোয়ারি দ্রুত প্রতিযোগীর কাছে হারায়। কোনো ডিলার পোর্টাল নেই। ম্যানুয়াল PO ট্র্যাকিং।',
      },
      solution: {
        en: 'B2B inquiry CRM + auto-quote engine (3-min proposals) + dealer portal with self-service ordering + PO tracking + production handover automation + invoice + payment follow-up automation.',
        bn: 'B2B ইনকোয়ারি CRM + অটো-কোট ইঞ্জিন (৩-মিনিট প্রপোজাল) + সেলফ-সার্ভিস অর্ডারিংসহ ডিলার পোর্টাল + PO ট্র্যাকিং + প্রোডাকশন হ্যান্ডওভার অটোমেশন + ইনভয়েস + পেমেন্ট ফলো-আপ অটোমেশন।',
      },
      results: [
        { metric: { en: 'Quote turnaround', bn: 'কোট টার্নঅ্যারাউন্ড' }, before: '3 days', after: '3 min' },
        { metric: { en: 'Inquiry-to-order rate', bn: 'ইনকোয়ারি-টু-অর্ডার রেট' }, before: '18%', after: '47%' },
        { metric: { en: 'Sales cycle length', bn: 'সেলস সাইকেল দৈর্ঘ্য' }, before: '45 days', after: '14 days' },
        { metric: { en: 'Annual revenue', bn: 'বার্ষিক রেভিনিউ' }, before: '৳8Cr', after: '৳21Cr' },
      ],
      roi: { en: '3x faster B2B sales cycle. 2.6x revenue growth. ROI: 22x.', bn: '৩x দ্রুত B2B সেলস সাইকেল। ২.৬x রেভিনিউ বৃদ্ধি। ROI: ২২x।' } as Bilingual,
      quote: {
        en: 'Auto-quotation changed our business. We respond to inquiries in 3 minutes instead of 3 days. Competitors cannot keep up. Our dealers love the portal.',
        bn: 'অটো-কোটেশন আমাদের ব্যবসা বদলে দিয়েছে। ইনকোয়ারির উত্তর ৩ দিনের বদলে ৩ মিনিটে দিই। প্রতিযোগীরা পাল্লা দিতে পারে না। আমাদের ডিলাররা পোর্টাল ভালোবাসে।',
      },
      author: { en: 'Imran Kabir, CMO', bn: 'ইমরান কবির, সিএমও' },
    },
    {
      industry: { en: 'Logistics', bn: 'লজিস্টিকস' },
      company: { en: 'QuickShip BD, Dhaka', bn: 'কুইকশিপ বিডি, ঢাকা' },
      problem: {
        en: '8 agents sharing 3 WhatsApp numbers. Chaos. Customer complaints about not getting tracking updates. 4-hour support response time. 25% repeat-customer rate.',
        bn: '৩টি WhatsApp নম্বরে ৮ এজেন্ট শেয়ার। বিশৃঙ্খলা। ট্র্যাকিং আপডেট না পাওয়া নিয়ে গ্রাহক অভিযোগ। ৪-ঘন্টা সাপোর্ট রেসপন্স টাইম। ২৫% রিপিট-কাস্টমার রেট।',
      },
      solution: {
        en: 'Shared team inbox + shipment CRM + automated tracking notifications + AI chatbot for status queries + delivery confirmation automation + customer satisfaction surveys + win-back campaigns.',
        bn: 'শেয়ার্ড টিম ইনবক্স + শিপমেন্ট CRM + অটোমেটেড ট্র্যাকিং নোটিফিকেশন + স্ট্যাটাস কোয়েরির জন্য AI চ্যাটবট + ডেলিভারি কনফার্মেশন অটোমেশন + কাস্টমার স্যাটিসফ্যাকশন সার্ভে + উইন-ব্যাক ক্যাম্পেইন।',
      },
      results: [
        { metric: { en: 'Support response time', bn: 'সাপোর্ট রেসপন্স টাইম' }, before: '4 hours', after: '2 min' },
        { metric: { en: 'Repeat customer rate', bn: 'রিপিট কাস্টমার রেট' }, before: '25%', after: '58%' },
        { metric: { en: 'Agent productivity', bn: 'এজেন্ট প্রোডাক্টিভিটি' }, before: '1x', after: '4x' },
        { metric: { en: 'Monthly shipments', bn: 'মাসিক শিপমেন্ট' }, before: '8,000', after: '21,000' },
      ],
      roi: { en: '2.6x shipment volume. 4x agent productivity. ROI: 14x.', bn: '২.৬x শিপমেন্ট ভলিউম। ৪x এজেন্ট প্রোডাক্টিভিটি। ROI: ১৪x।' } as Bilingual,
      quote: {
        en: 'The team inbox changed how we work. 8 agents share one number, no chaos, full visibility. Support response time dropped from hours to minutes.',
        bn: 'টিম ইনবক্স আমাদের কাজের ধরন বদলে দিয়েছে। ৮ এজেন্ট এক নম্বর শেয়ার করে, কোনো বিশৃঙ্খলা নেই, পূর্ণ ভিজিবিলিটি। সাপোর্ট রেসপন্স টাইম ঘন্টা থেকে মিনিটে নেমেছে।',
      },
      author: { en: 'Faisal Rahman, Operations Lead', bn: 'ফয়সাল রহমান, অপারেশনস লিড' },
    },
  ],
}

/* ========================================================================== */
/*  19. METRICS — Success KPIs                                                 */
/* ========================================================================== */

export const METRICS = {
  eyebrow: { en: 'KPIs we move', bn: 'যে KPI আমরা সরাই' } as Bilingual,
  title: {
    en: '8 metrics that define CRM success',
    bn: '৮টি মেট্রিক যা CRM সাফল্য নির্ধারণ করে',
  } as Bilingual,
  subtitle: {
    en: 'These are the numbers we obsess over. Every client dashboard tracks these from day one.',
    bn: 'এই সংখ্যাগুলো নিয়ে আমরা অবেশন করি। প্রতিটি ক্লায়েন্ট ড্যাশবোর্ড প্রথম দিন থেকে এগুলো ট্র্যাক করে।',
  } as Bilingual,
  items: [
    {
      icon: 'clock',
      metric: 'Response Time',
      current: { en: '24-48 hrs', bn: '২৪-৪৮ ঘি' },
      target: { en: '<45 sec', bn: '<৪৫ সেকেন্ড' },
      desc: { en: 'Time from lead capture to first response. Every minute over 5 reduces conversion by 4%.', bn: 'লিড ক্যাপচার থেকে প্রথম রেসপন্স পর্যন্ত সময়। ৫ মিনিটের প্রতি অতিরিক্ত মিনিটে কনভার্সন ৪% কমে।' },
    },
    {
      icon: 'phone',
      metric: 'Lead Response',
      current: { en: '1.8 follow-ups', bn: '১.৮ ফলো-আপ' },
      target: { en: '5-12 automated', bn: '৫-১২ অটোমেটেড' },
      desc: { en: 'Number of follow-up attempts per lead. Industry says 5-12 closes 80% of deals.', bn: 'প্রতি লিডে ফলো-আপ চেষ্টার সংখ্যা। ইন্ডাস্ট্রি বলে ৫-১২ দিয়ে ৮০% ডিল ক্লোজ হয়।' },
    },
    {
      icon: 'trophy',
      metric: 'Conversion Rate',
      current: { en: '8-12%', bn: '৮-১২%' },
      target: { en: '20-30%', bn: '২০-৩০%' },
      desc: { en: 'Lead-to-customer conversion. Up via better scoring + faster follow-up + AI assistance.', bn: 'লিড-টু-কাস্টমার কনভার্সন। ভালো স্কোরিং + দ্রুত ফলো-আপ + AI অ্যাসিস্ট্যান্সে বাড়ে।' },
    },
    {
      icon: 'gauge',
      metric: 'Sales Cycle',
      current: { en: '45-90 days', bn: '৪৫-৯০ দিন' },
      target: { en: '14-21 days', bn: '১৪-২১ দিন' },
      desc: { en: 'Days from lead to close. Shorter cycles = more revenue per salesperson per quarter.', bn: 'লিড থেকে ক্লোজ পর্যন্ত দিন। ছোট সাইকেল = প্রতি সেলসপার্সন প্রতি কোয়ার্টারে বেশি রেভিনিউ।' },
    },
    {
      icon: 'cpu',
      metric: 'Automation %',
      current: { en: '0-15%', bn: '০-১৫%' },
      target: { en: '70-85%', bn: '৭০-৮৫%' },
      desc: { en: 'Share of tasks handled without human. Higher = more output per salesperson.', bn: 'মানুষ ছাড়া হ্যান্ডলড টাস্কের শতাংশ। বেশি = প্রতি সেলসপার্সনে বেশি আউটপুট।' },
    },
    {
      icon: 'trending-up',
      metric: 'Revenue Growth',
      current: { en: 'Flat', bn: 'স্থবির' },
      target: { en: '3-4x in 12 mo', bn: '১২ মাসে ৩-৪x' },
      desc: { en: 'Year-over-year revenue change. Direct result of CRM automation + AI assistance.', bn: 'বছর-ওভার-বছর রেভিনিউ পরিবর্তন। CRM অটোমেশন + AI অ্যাসিস্ট্যান্সের সরাসরি ফল।' },
    },
    {
      icon: 'line-chart',
      metric: 'Pipeline Growth',
      current: { en: 'Stagnant', bn: 'স্থবির' },
      target: { en: '3.2x in 90 days', bn: '৯০ দিনে ৩.২x' },
      desc: { en: 'Total value of open deals. More leads captured + better follow-up = bigger pipeline.', bn: 'ওপেন ডিলের মোট ভ্যালু। বেশি লিড ক্যাপচার + ভালো ফলো-আপ = বড় পাইপলাইন।' },
    },
    {
      icon: 'banknote',
      metric: 'Cost Saving',
      current: { en: 'High', bn: 'উচ্চ' },
      target: { en: '৳1.6L/mo saved', bn: '৳১.৬লক্ষ/মাস বাঁচে' },
      desc: { en: 'Money saved from not hiring SDR, copywriter, analyst, QA, assistant. AI replaces them.', bn: 'SDR, কপিরাইটার, অ্যানালিস্ট, QA, অ্যাসিস্ট্যান্ট না নিয়োগ থেকে বাঁচা টাকা। AI তাদের প্রতিস্থাপন করে।' },
    },
  ],
}

/* ========================================================================== */
/*  20. STATISTICS                                                             */
/* ========================================================================== */

export const STATISTICS = {
  eyebrow: { en: 'By the numbers', bn: 'সংখ্যায়' } as Bilingual,
  title: {
    en: 'NextGen CRM automation impact',
    bn: 'NextGen CRM অটোমেশনের প্রভাব',
  } as Bilingual,
  stats: [
    { value: '50+', label: { en: 'Active clients', bn: 'সক্রিয় ক্লায়েন্ট' } },
    { value: '2,000+', label: { en: 'Automations built', bn: 'অটোমেশন তৈরি' } },
    { value: '13', label: { en: 'Industries served', bn: 'ইন্ডাস্ট্রি সেবা' } },
    { value: '7+', label: { en: 'Years experience', bn: 'বছর অভিজ্ঞতা' } },
    { value: '50,000+', label: { en: 'Hours saved annually', bn: 'বার্ষিক ঘন্টা বাঁচানো' } },
    { value: '৳100Cr+', label: { en: 'Revenue influenced', bn: 'রেভিনিউ ইনফ্লুয়েন্সড' } },
    { value: '4.9/5', label: { en: 'Client rating', bn: 'ক্লায়েন্ট রেটিং' } },
    { value: '94%', label: { en: 'Client retention', bn: 'ক্লায়েন্ট রিটেনশন' } },
    { value: '3.2x', label: { en: 'Avg pipeline growth', bn: 'গড় পাইপলাইন বৃদ্ধি' } },
    { value: '11x', label: { en: 'Avg 12-month ROI', bn: 'গড় ১২-মাস ROI' } },
    { value: '98%', label: { en: 'Forecast accuracy', bn: 'ফোরকাস্ট নির্ভুলতা' } },
    { value: '85%+', label: { en: 'Team adoption', bn: 'টিম অ্যাডপশন' } },
  ],
}

/* ========================================================================== */
/*  21. DELIVERABLES                                                           */
/* ========================================================================== */

export const DELIVERABLES = {
  eyebrow: { en: 'What you receive', bn: 'আপনি যা পান' } as Bilingual,
  title: {
    en: '10 deliverables handed over on go-live',
    bn: 'গো-লাইভে হ্যান্ডওভার ১০টি ডেলিভারেবল',
  } as Bilingual,
  subtitle: {
    en: 'No vague promises. These are the concrete artefacts you receive at the end of implementation.',
    bn: 'কোনো ভাগু প্রতিশ্রুতি নয়। ইমপ্লিমেন্টেশন শেষে আপনি যে কংক্রিট আর্টিফ্যাক্ট পান।',
  } as Bilingual,
  items: [
    {
      icon: 'database',
      title: { en: 'Fully configured CRM', bn: 'সম্পূর্ণ কনফিগার্ড CRM' },
      desc: { en: 'Pipelines, stages, custom fields, deal records, contact properties — all set up and tested.', bn: 'পাইপলাইন, স্টেজ, কাস্টম ফিল্ড, ডিল রেকর্ড, কন্টাক্ট প্রপার্টি — সব সেটআপ ও টেস্টেড।' },
    },
    {
      icon: 'workflow',
      title: { en: 'Automation workflows', bn: 'অটোমেশন ওয়ার্কফ্লো' },
      desc: { en: '5–25 workflows (per plan) covering lead capture, qualification, follow-up, booking, onboarding, retention.', bn: 'লিড ক্যাপচার, কোয়ালিফিকেশন, ফলো-আপ, বুকিং, অনবোর্ডিং, রিটেনশন কভারকারী ৫–২৫টি ওয়ার্কফ্লো (প্ল্যান অনুযায়ী)।' },
    },
    {
      icon: 'bar-chart',
      title: { en: 'Custom dashboards', bn: 'কাস্টম ড্যাশবোর্ড' },
      desc: { en: 'CEO view, sales manager view, rep view — each with role-specific KPIs and alerts.', bn: 'CEO ভিউ, সেলস ম্যানেজার ভিউ, রেপ ভিউ — প্রতিটি রোল-স্পেসিফিক KPI ও অ্যালার্টসহ।' },
    },
    {
      icon: 'file-text',
      title: { en: 'Training + documentation', bn: 'ট্রেনিং + ডকুমেন্টেশন' },
      desc: { en: 'Live training (recorded), written SOPs, video library, FAQ document, admin handbook.', bn: 'লাইভ ট্রেনিং (রেকর্ডেড), লিখিত SOP, ভিডিও লাইব্রেরি, FAQ ডকুমেন্ট, অ্যাডমিন হ্যান্ডবুক।' },
    },
    {
      icon: 'video',
      title: { en: 'Recorded training videos', bn: 'রেকর্ডেড ট্রেনিং ভিডিও' },
      desc: { en: '10+ role-specific training videos. New hires can self-onboard in 1 day.', bn: '১০+ রোল-স্পেসিফিক ট্রেনিং ভিডিও। নতুন নিয়োগ ১ দিনে সেলফ-অনবোর্ড করতে পারে।' },
    },
    {
      icon: 'book-open',
      title: { en: 'SOP document', bn: 'SOP ডকুমেন্ট' },
      desc: { en: 'Standard Operating Procedure for every workflow. Step-by-step. Copy-paste ready.', bn: 'প্রতিটি ওয়ার্কফ্লোর জন্য স্ট্যান্ডার্ড অপারেটিং প্রসিডিউর। ধাপে ধাপে। কপি-পেস্ট রেডি।' },
    },
    {
      icon: 'code',
      title: { en: 'API + webhook docs', bn: 'API + ওয়েবহুক ডকস' },
      desc: { en: 'Custom API documentation, webhook specs, sample code. Developer-ready integrations.', bn: 'কাস্টম API ডকুমেন্টেশন, ওয়েবহুক স্পেক, স্যাম্পল কোড। ডেভেলপার-রেডি ইন্টিগ্রেশন।' },
    },
    {
      icon: 'headset',
      title: { en: 'Support SLA document', bn: 'সাপোর্ট SLA ডকুমেন্ট' },
      desc: { en: 'Response time, escalation matrix, dedicated channels (WhatsApp, email, phone, Slack).', bn: 'রেসপন্স টাইম, এসক্যালেশন ম্যাট্রিক্স, ডেডিকেটেড চ্যানেল (WhatsApp, ইমেইল, ফোন, Slack)।' },
    },
    {
      icon: 'shield-check',
      title: { en: 'Security + compliance pack', bn: 'সিকিউরিটি + কমপ্লায়েন্স প্যাক' },
      desc: { en: 'Access control matrix, audit log setup, backup config, GDPR compliance documentation.', bn: 'অ্যাক্সেস কন্ট্রোল ম্যাট্রিক্স, অডিট লগ সেটআপ, ব্যাকআপ কনফিগ, GDPR কমপ্লায়েন্স ডকুমেন্টেশন।' },
    },
    {
      icon: 'users',
      title: { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
      desc: { en: 'Your single point of contact. Monthly performance reviews. Quarterly optimisation roadmap.', bn: 'আপনার একক পয়েন্ট অফ কন্টাক্ট। মাসিক পারফরম্যান্স রিভিউ। কোয়ার্টারলি অপটিমাইজেশন রোডম্যাপ।' },
    },
  ],
}

/* ========================================================================== */
/*  22. PRICING                                                                */
/* ========================================================================== */

export const PRICING = {
  eyebrow: { en: 'Transparent pricing', bn: 'স্বচ্ছ প্রাইসিং' } as Bilingual,
  title: {
    en: 'Choose the plan that fits your scale',
    bn: 'আপনার স্কেলের উপযুক্ত প্ল্যান বেছে নিন',
  } as Bilingual,
  subtitle: {
    en: 'All plans include 60-day ROI guarantee, full setup, team training and dedicated support. Cancel anytime. No lock-in.',
    bn: 'সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি, ফুল সেটআপ, টিম ট্রেনিং এবং ডেডিকেটেড সাপোর্ট। যেকোনো সময় ক্যানসেল। কোনো লক-ইন নেই।',
  } as Bilingual,
  tiers: [
    {
      name: { en: 'Starter', bn: 'স্টার্টার' },
      price: { en: '৳25,000/mo', bn: '৳২৫,০০০/মাস' },
      tagline: { en: 'For small businesses getting started with CRM automation', bn: 'ছোট ব্যবসার জন্য যারা CRM অটোমেশনে শুরু করছে' },
      popular: false,
      features: [
        { en: 'CRM setup (HubSpot / GoHighLevel / Zoho)', bn: 'CRM সেটআপ (HubSpot / GoHighLevel / Zoho)' },
        { en: '5 automation workflows', bn: '৫টি অটোমেশন ওয়ার্কফ্লো' },
        { en: '1,000 contacts', bn: '১,০০০ কন্ট্যাক্ট' },
        { en: '3 team members', bn: '৩ জন টিম মেম্বার' },
        { en: 'Lead capture + auto-response', bn: 'লিড ক্যাপচার + অটো-রেসপন্স' },
        { en: 'Basic dashboards', bn: 'বেসিক ড্যাশবোর্ড' },
        { en: '5 integrations', bn: '৫টি ইন্টিগ্রেশন' },
        { en: 'Email support', bn: 'ইমেইল সাপোর্ট' },
      ],
    },
    {
      name: { en: 'Growth', bn: 'গ্রোথ' },
      price: { en: '৳50,000/mo', bn: '৳৫০,০০০/মাস' },
      tagline: { en: 'For scaling businesses that need AI + advanced automation', bn: 'স্কেলিং ব্যবসার জন্য যাদের AI + অ্যাডভান্সড অটোমেশন দরকার' },
      popular: true,
      features: [
        { en: 'Everything in Starter, plus:', bn: 'স্টার্টারের সবকিছু, প্লাস:' },
        { en: '15 automation workflows', bn: '১৫টি অটোমেশন ওয়ার্কফ্লো' },
        { en: '10,000 contacts', bn: '১০,০০০ কন্ট্যাক্ট' },
        { en: '10 team members', bn: '১০ জন টিম মেম্বার' },
        { en: 'AI chatbot (1,000 conversations/mo)', bn: 'AI চ্যাটবট (১,০০০ কনভার্সেশন/মাস)' },
        { en: 'AI lead scoring + qualification', bn: 'AI লিড স্কোরিং + কোয়ালিফিকেশন' },
        { en: 'Advanced dashboards + ROI tracking', bn: 'অ্যাডভান্সড ড্যাশবোর্ড + ROI ট্র্যাকিং' },
        { en: '15 integrations + WhatsApp API', bn: '১৫টি ইন্টিগ্রেশন + WhatsApp API' },
        { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
        { en: '4-hour response SLA', bn: '৪-ঘন্টা রেসপন্স SLA' },
      ],
    },
    {
      name: { en: 'Enterprise', bn: 'এন্টারপ্রাইজ' },
      price: { en: 'Custom', bn: 'কাস্টম' },
      tagline: { en: 'For large teams with custom needs + multi-department scale', bn: 'বড় টিমের জন্য কাস্টম প্রয়োজন + মাল্টি-ডিপার্টমেন্ট স্কেল' },
      popular: false,
      features: [
        { en: 'Everything in Growth, plus:', bn: 'গ্রোথের সবকিছু, প্লাস:' },
        { en: 'Unlimited workflows + contacts + users', bn: 'আনলিমিটেড ওয়ার্কফ্লো + কন্ট্যাক্ট + ইউজার' },
        { en: 'Unlimited AI conversations + voice agent', bn: 'আনলিমিটেড AI কনভার্সেশন + ভয়েস এজেন্ট' },
        { en: 'Salesforce / custom CRM integration', bn: 'Salesforce / কাস্টম CRM ইন্টিগ্রেশন' },
        { en: 'Custom AI training on your data', bn: 'আপনার ডেটায় কাস্টম AI ট্রেনিং' },
        { en: 'White-label dashboard + custom branding', bn: 'হোয়াইট-লেবেল ড্যাশবোর্ড + কাস্টম ব্র্যান্ডিং' },
        { en: 'On-premise / private cloud option', bn: 'অন-প্রেমাইস / প্রাইভেট ক্লাউড অপশন' },
        { en: 'Compliance + audit support (SOC2, ISO, GDPR)', bn: 'কমপ্লায়েন্স + অডিট সাপোর্ট (SOC2, ISO, GDPR)' },
        { en: 'Dedicated account manager + Slack channel', bn: 'ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার + Slack চ্যানেল' },
        { en: '1-hour response SLA, 24/7 priority support', bn: '১-ঘন্টা রেসপন্স SLA, ২৪/৭ প্রায়োরিটি সাপোর্ট' },
      ],
    },
  ],
  note: {
    en: 'All prices in BDT (৳). Setup fee waived for annual commitments. 15% annual discount. Custom plans available — book a call.',
    bn: 'সব মূল্য BDT (৳)। বার্ষিক কমিটমেন্টে সেটআপ ফি মওকুফ। ১৫% বার্ষিক ছাড়। কাস্টম প্ল্যান উপলব্ধ — কল বুক করুন।',
  } as Bilingual,
  valueStack: {
    title: { en: 'What you get — value breakdown', bn: 'আপনি যা পান — ভ্যালু ব্রেকডাউন' } as Bilingual,
    items: [
      { name: { en: 'CRM setup + configuration', bn: 'CRM সেটআপ + কনফিগারেশন' }, value: '৳40,000' },
      { name: { en: 'Workflow design + automation build', bn: 'ওয়ার্কফ্লো ডিজাইন + অটোমেশন বিল্ড' }, value: '৳30,000' },
      { name: { en: 'AI chatbot + voice agent setup', bn: 'AI চ্যাটবট + ভয়েস এজেন্ট সেটআপ' }, value: '৳25,000' },
      { name: { en: 'Team training + documentation', bn: 'টিম ট্রেনিং + ডকুমেন্টেশন' }, value: '৳15,000' },
      { name: { en: 'Dashboards + reporting setup', bn: 'ড্যাশবোর্ড + রিপোর্টিং সেটআপ' }, value: '৳20,000' },
      { name: { en: 'Integrations (5-15 tools)', bn: 'ইন্টিগ্রেশন (৫-১৫ টুল)' }, value: '৳25,000' },
      { name: { en: 'Dedicated success manager (3 mo)', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার (৩ মাস)' }, value: '৳30,000' },
      { name: { en: '24/7 priority support', bn: '২৪/৭ প্রায়োরিটি সাপোর্ট' }, value: '৳15,000' },
    ],
    total: { en: 'Total value', bn: 'মোট ভ্যালু' } as Bilingual,
    totalValue: '৳2,00,000',
    yourPrice: { en: 'Your price (Growth plan)', bn: 'আপনার দাম (গ্রোথ প্ল্যান)' } as Bilingual,
    yourPriceValue: '৳50,000/mo',
    saving: { en: 'You save 75% vs buying separately', bn: 'আলাদাভাবে কেনার চেয়ে ৭৫% বাঁচান' } as Bilingual,
  },
}

/* ========================================================================== */
/*  23. GUARANTEES                                                             */
/* ========================================================================== */

export const GUARANTEES = {
  eyebrow: { en: 'Risk reversal', bn: 'রিস্ক রিভার্সাল' } as Bilingual,
  title: {
    en: '6 guarantees — we carry the risk, not you',
    bn: '৬টি গ্যারান্টি — রিস্ক আমরা বহন করি, আপনি নয়',
  } as Bilingual,
  subtitle: {
    en: 'We are so confident this works that we put our money where our mouth is. If we do not deliver, you do not pay.',
    bn: 'এটি কাজ করে এতটাই নিশ্চিত যে আমরা টাকা যেখানে মুখ সেখানে রাখি। আমরা ডেলিভারি না করলে, আপনি দেন না।',
  } as Bilingual,
  items: [
    {
      icon: 'calendar-check',
      title: { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      desc: {
        en: 'If you do not see measurable ROI in 60 days — we work for free until you do. No time limit on our commitment.',
        bn: '৬০ দিনে পরিমেয় ROI না দেখলে — আমরা ততক্ষণ ফ্রি কাজ করি। আমাদের কমিটমেন্টে কোনো টাইম লিমিট নেই।',
      },
    },
    {
      icon: 'rocket',
      title: { en: '5-day go-live guarantee', bn: '৫-দিন গো-লাইভ গ্যারান্টি' },
      desc: {
        en: 'Starter plans go live in 5 days. If we miss the deadline, you get the month free. No exceptions, no excuses.',
        bn: 'স্টার্টার প্ল্যান ৫ দিনে লাইভ। ডেডলাইন মিস করলে, আপনি মাস ফ্রি পান। কোনো ব্যতিক্রম নেই, কোনো অজুহাত নেই।',
      },
    },
    {
      icon: 'database',
      title: { en: 'Zero data loss guarantee', bn: 'জিরো ডেটা লস গ্যারান্টি' },
      desc: {
        en: 'We migrate your existing contacts with zero data loss. Every record verified before, during and after migration.',
        bn: 'আপনার বিদ্যমান কন্টাক্ট জিরো ডেটা লসে মাইগ্রেট করি। প্রতিটি রেকর্ড মাইগ্রেশন আগে, সময় ও পরে ভেরিফাই।',
      },
    },
    {
      icon: 'edit',
      title: { en: 'Unlimited revisions guarantee', bn: 'আনলিমিটেড রিভিশন গ্যারান্টি' },
      desc: {
        en: 'During setup, we will revise workflows, dashboards, automations as many times as needed until you are happy.',
        bn: 'সেটআপ চলাকালীন, আমরা ওয়ার্কফ্লো, ড্যাশবোর্ড, অটোমেশন যতবার দরকার ততবার রিভাইজ করব যতক্ষণ না আপনি খুশি।',
      },
    },
    {
      icon: 'user-tie',
      title: { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
      desc: {
        en: 'You get a named human as your single point of contact. Not a ticket queue. Not a chatbot. A real person who knows your business.',
        bn: 'আপনি একক পয়েন্ট অফ কন্টাক্ট হিসেবে একজন নামধারী মানুষ পান। টিকিট কিউ নয়। চ্যাটবট নয়। আপনার ব্যবসা চেনা একজন আসল মানুষ।',
      },
    },
    {
      icon: 'line-chart',
      title: { en: 'Monthly performance review', bn: 'মাসিক পারফরম্যান্স রিভিউ' },
      desc: {
        en: 'Every month, we review your KPIs vs targets. If something is off, we fix it together — proactively, not reactively.',
        bn: 'প্রতি মাসে, আমরা আপনার KPI বনাম টার্গেট রিভিউ করি। কিছু খারাপ থাকলে, একসাথে ফিক্স করি — প্রোঅ্যাক্টিভলি, রিঅ্যাক্টিভলি নয়।',
      },
    },
  ],
  bottom: {
    en: 'These are not marketing claims. They are written into every contract. We have honoured them for 50+ clients. We will honour them for you.',
    bn: 'এগুলো মার্কেটিং দাবি নয়। প্রতিটি চুক্তিতে লেখা। ৫০+ ক্লায়েন্টের জন্য আমরা এগুলো মেনেছি। আপনার জন্য মানব।',
  } as Bilingual,
}

/* ========================================================================== */
/*  24. TIMELINE                                                               */
/* ========================================================================== */

export const TIMELINE = {
  eyebrow: { en: 'Implementation roadmap', bn: 'ইমপ্লিমেন্টেশন রোডম্যাপ' } as Bilingual,
  title: {
    en: 'From kickoff to optimisation in 60 days',
    bn: '৬০ দিনে কিকঅফ থেকে অপটিমাইজেশন',
  } as Bilingual,
  subtitle: {
    en: 'Every milestone, every deliverable, every meeting — clearly mapped out. No surprises, no scope creep.',
    bn: 'প্রতিটি মাইলস্টোন, প্রতিটি ডেলিভারেবল, প্রতিটি মিটিং — স্পষ্টভাবে ম্যাপ করা। কোনো সারপ্রাইজ নেই, কোনো স্কোপ ক্রিপ নেই।',
  } as Bilingual,
  phases: [
    {
      phase: { en: 'Day 1', bn: 'দিন ১' },
      title: { en: 'Discovery + audit', bn: 'ডিসকভারি + অডিট' },
      desc: {
        en: '90-min deep dive into your current sales process, lead sources, team structure, tools, KPIs. Output: CRM blueprint document.',
        bn: 'আপনার বর্তমান সেলস প্রসেস, লিড সোর্স, টিম স্ট্রাকচার, টুল, KPI-তে ৯০-মিনিট ডিপ ডাইভ। আউটপুট: CRM ব্লুপ্রিন্ট ডকুমেন্ট।',
      },
      deliverables: [
        { en: 'Sales process audit document', bn: 'সেলস প্রসেস অডিট ডকুমেন্ট' },
        { en: 'CRM blueprint + wireframes', bn: 'CRM ব্লুপ্রিন্ট + ওয়্যারফ্রেম' },
        { en: 'Tool stack recommendation', bn: 'টুল স্ট্যাক সুপারিশ' },
      ],
    },
    {
      phase: { en: 'Day 3', bn: 'দিন ৩' },
      title: { en: 'CRM setup + configuration', bn: 'CRM সেটআপ + কনফিগারেশন' },
      desc: {
        en: 'CRM account configured. Pipelines, stages, custom fields, deal records, contact properties, role permissions — all set up.',
        bn: 'CRM অ্যাকাউন্ট কনফিগার্ড। পাইপলাইন, স্টেজ, কাস্টম ফিল্ড, ডিল রেকর্ড, কন্টাক্ট প্রপার্টি, রোল পারমিশন — সব সেটআপ।',
      },
      deliverables: [
        { en: 'Configured CRM instance', bn: 'কনফিগার্ড CRM ইনস্ট্যান্স' },
        { en: 'Pipeline + stage definitions', bn: 'পাইপলাইন + স্টেজ ডেফিনিশন' },
        { en: 'Role permission matrix', bn: 'রোল পারমিশন ম্যাট্রিক্স' },
      ],
    },
    {
      phase: { en: 'Week 1', bn: 'সপ্তাহ ১' },
      title: { en: 'Automation build + integrations', bn: 'অটোমেশন বিল্ড + ইন্টিগ্রেশন' },
      desc: {
        en: 'Workflows built, integrations connected (Meta Ads, WhatsApp, bKash, calendar, email), AI trained on your business.',
        bn: 'ওয়ার্কফ্লো বিল্ট, ইন্টিগ্রেশন কানেক্টেড (Meta Ads, WhatsApp, bKash, ক্যালেন্ডার, ইমেইল), AI আপনার ব্যবসায় ট্রেইন্ড।',
      },
      deliverables: [
        { en: '5-25 automation workflows', bn: '৫-২৫টি অটোমেশন ওয়ার্কফ্লো' },
        { en: '5-15 tool integrations', bn: '৫-১৫টি টুল ইন্টিগ্রেশন' },
        { en: 'AI training on your data', bn: 'আপনার ডেটায় AI ট্রেনিং' },
      ],
    },
    {
      phase: { en: 'Week 2', bn: 'সপ্তাহ ২' },
      title: { en: 'Team training + go-live', bn: 'টিম ট্রেনিং + গো-লাইভ' },
      desc: {
        en: 'Live training sessions (recorded), data migration, end-to-end testing, go-live checklist, official launch.',
        bn: 'লাইভ ট্রেনিং সেশন (রেকর্ডেড), ডেটা মাইগ্রেশন, এন্ড-টু-এন্ড টেস্টিং, গো-লাইভ চেকলিস্ট, অফিশিয়াল লঞ্চ।',
      },
      deliverables: [
        { en: 'Team training (recorded)', bn: 'টিম ট্রেনিং (রেকর্ডেড)' },
        { en: 'Data migration (verified)', bn: 'ডেটা মাইগ্রেশন (ভেরিফাইড)' },
        { en: 'Go-live checklist + launch', bn: 'গো-লাইভ চেকলিস্ট + লঞ্চ' },
      ],
    },
    {
      phase: { en: 'Month 1', bn: 'মাস ১' },
      title: { en: 'Optimisation + adoption', bn: 'অপটিমাইজেশন + অ্যাডপশন' },
      desc: {
        en: 'Weekly check-ins. Workflow tweaks based on real usage. AI retraining. Adoption tracking. First ROI measurement.',
        bn: 'সাপ্তাহিক চেক-ইন। বাস্তব ব্যবহারের উপর ভিত্তি করে ওয়ার্কফ্লো টুইক। AI রিট্রেনিং। অ্যাডপশন ট্র্যাকিং। প্রথম ROI মাপা।',
      },
      deliverables: [
        { en: 'Weekly performance reports', bn: 'সাপ্তাহিক পারফরম্যান্স রিপোর্ট' },
        { en: 'Optimisation roadmap', bn: 'অপটিমাইজেশন রোডম্যাপ' },
        { en: 'First 30-day ROI report', bn: 'প্রথম ৩০-দিন ROI রিপোর্ট' },
      ],
    },
    {
      phase: { en: 'Month 2', bn: 'মাস ২' },
      title: { en: 'Scale + advanced features', bn: 'স্কেল + অ্যাডভান্সড ফিচার' },
      desc: {
        en: 'Add advanced features (AI voice agent, custom dashboards, advanced segmentation). Scale automations as you grow.',
        bn: 'অ্যাডভান্সড ফিচার যোগ (AI ভয়েস এজেন্ট, কাস্টম ড্যাশবোর্ড, অ্যাডভান্সড সেগমেন্টেশন)। আপনার গ্রোথ অনুযায়ী অটোমেশন স্কেল।',
      },
      deliverables: [
        { en: 'Advanced features deployment', bn: 'অ্যাডভান্সড ফিচার ডিপ্লয়মেন্ট' },
        { en: '60-day ROI verification', bn: '৬০-দিন ROI ভেরিফিকেশন' },
        { en: 'Quarterly roadmap + recommendations', bn: 'কোয়ার্টারলি রোডম্যাপ + সুপারিশ' },
      ],
    },
  ],
}

/* ========================================================================== */
/*  25. PROCESS                                                                */
/* ========================================================================== */

export const PROCESS = {
  eyebrow: { en: 'How we work', bn: 'আমরা কীভাবে কাজ করি' } as Bilingual,
  title: {
    en: 'A proven process refined over 50+ implementations',
    bn: '৫০+ ইমপ্লিমেন্টেশনে রিফাইন করা প্রমাণিত প্রসেস',
  } as Bilingual,
  subtitle: {
    en: 'Same process. Same quality. Same results. Whether you are a ৳1Cr startup or ৳500Cr enterprise.',
    bn: 'একই প্রসেস। একই কোয়ালিটি। একই ফলাফল। আপনি ৳১কোটি স্টার্টআপ বা ৳৫০০কোটি এন্টারপ্রাইজ।',
  } as Bilingual,
  principles: [
    {
      icon: 'target',
      title: { en: 'Audit before we build', bn: 'বিল্ড করার আগে অডিট' },
      desc: {
        en: 'We never start building without understanding your current process. 90-min audit, blueprint document, then build.',
        bn: 'আপনার বর্তমান প্রসেস না বুঝে আমরা বিল্ড করা শুরু করি না। ৯০-মিনিট অডিট, ব্লুপ্রিন্ট ডকুমেন্ট, তারপর বিল্ড।',
      },
    },
    {
      icon: 'rocket',
      title: { en: 'Ship in days, not months', bn: 'দিনে শিপ, মাসে নয়' },
      desc: {
        en: 'Pre-built templates + battle-tested workflows = fast deployment. You see ROI in week 2, not month 6.',
        bn: 'প্রি-বিল্ট টেমপ্লেট + ব্যাটল-টেস্টেড ওয়ার্কফ্লো = দ্রুত ডিপ্লয়মেন্ট। আপনি সপ্তাহ ২-এ ROI দেখেন, মাস ৬-এ নয়।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Train, do not abandon', bn: 'ট্রেন করুন, পরিত্যাগ করবেন না' },
      desc: {
        en: 'Live training + recorded videos + written SOPs + dedicated success manager. Your team is never left alone.',
        bn: 'লাইভ ট্রেনিং + রেকর্ডেড ভিডিও + লিখিত SOP + ডেডিকেটেড সাকসেস ম্যানেজার। আপনার টিম কখনো একা নয়।',
      },
    },
    {
      icon: 'line-chart',
      title: { en: 'Measure, optimise, repeat', bn: 'মাপুন, অপটিমাইজ করুন, রিপিট' },
      desc: {
        en: 'Weekly KPI reviews. Monthly performance audits. Quarterly optimisation roadmaps. Continuous improvement, always.',
        bn: 'সাপ্তাহিক KPI রিভিউ। মাসিক পারফরম্যান্স অডিট। কোয়ার্টারলি অপটিমাইজেশন রোডম্যাপ। কন্টিনিউয়াস ইমপ্রুভমেন্ট, সবসময়।',
      },
    },
  ],
}

/* ========================================================================== */
/*  26. TEAM                                                                   */
/* ========================================================================== */

export const TEAM = {
  eyebrow: { en: 'The team behind your CRM', bn: 'আপনার CRM-এর পেছনের টিম' } as Bilingual,
  title: {
    en: '6 specialists assigned to every project',
    bn: 'প্রতিটি প্রজেক্টে ৬ জন স্পেশালিস্ট',
  } as Bilingual,
  subtitle: {
    en: 'Not a freelancer. Not a generic agency. A dedicated team of 6 specialists who have built 2,000+ CRM automations.',
    bn: 'ফ্রিল্যান্সার নয়। জেনেরিক এজেন্সি নয়। ২,০০০+ CRM অটোমেশন তৈরি করা ৬ জন স্পেশালিস্টের ডেডিকেটেড টিম।',
  } as Bilingual,
  members: [
    {
      icon: 'architecture',
      title: { en: 'CRM Architect', bn: 'CRM আর্কিটেক্ট' },
      desc: { en: '10+ years experience, 200+ CRM setups. Designs your entire system blueprint.', bn: '১০+ বছর অভিজ্ঞতা, ২০০+ CRM সেটআপ। আপনার সম্পূর্ণ সিস্টেম ব্লুপ্রিন্ট ডিজাইন করে।' },
    },
    {
      icon: 'workflow',
      title: { en: 'Automation Engineer', bn: 'অটোমেশন ইঞ্জিনিয়ার' },
      desc: { en: 'Zapier, Make, n8n expert. 500+ workflows built. Builds every automation in your system.', bn: 'Zapier, Make, n8n বিশেষজ্ঞ। ৫০০+ ওয়ার্কফ্লো তৈরি। আপনার সিস্টেমের প্রতিটি অটোমেশন বিল্ড করে।' },
    },
    {
      icon: 'cpu',
      title: { en: 'AI Specialist', bn: 'AI স্পেশালিস্ট' },
      desc: { en: 'OpenAI, Voice AI, chatbot expert. Trains AI on your business + use cases.', bn: 'OpenAI, Voice AI, চ্যাটবট বিশেষজ্ঞ। আপনার ব্যবসা + ইউজ-কেসে AI ট্রেন করে।' },
    },
    {
      icon: 'headset',
      title: { en: 'Support Engineer', bn: 'সাপোর্ট ইঞ্জিনিয়ার' },
      desc: { en: '24/7 technical support. Fixes issues in hours, not days. Monitors system health.', bn: '২৪/৭ টেকনিক্যাল সাপোর্ট। ঘন্টায় সমস্যা ফিক্স, দিনে নয়। সিস্টেম হেলথ মনিটর করে।' },
    },
    {
      icon: 'clipboard-check',
      title: { en: 'Project Manager', bn: 'প্রজেক্ট ম্যানেজার' },
      desc: { en: 'PMP certified. Ensures on-time delivery, scope adherence, stakeholder communication.', bn: 'PMP সার্টিফাইড। সময়মতো ডেলিভারি, স্কোপ অ্যাডহেরেন্স, স্টেকহোল্ডার কমিউনিকেশন নিশ্চিত।' },
    },
    {
      icon: 'line-chart',
      title: { en: 'Success Manager', bn: 'সাকসেস ম্যানেজার' },
      desc: { en: 'Your single point of contact. Tracks ROI, suggests improvements, advocates for you internally.', bn: 'আপনার একক পয়েন্ট অফ কন্টাক্ট। ROI ট্র্যাক করে, উন্নতি সাজেস্ট করে, অভ্যন্তরীণভাবে আপনার পক্ষে কথা বলে।' },
    },
  ],
}

/* ========================================================================== */
/*  27. ROI CALCULATOR                                                         */
/* ========================================================================== */

export const ROI_CALCULATOR = {
  eyebrow: { en: 'See your numbers', bn: 'আপনার সংখ্যা দেখুন' } as Bilingual,
  title: {
    en: 'CRM Automation ROI Calculator',
    bn: 'CRM অটোমেশন ROI ক্যালকুলেটর',
  } as Bilingual,
  subtitle: {
    en: 'Drag the sliders to match your business. See your projected ROI in real-time.',
    bn: 'স্লাইডার টেনে আপনার ব্যবসার সাথে মিলিয়ে নিন। রিয়েল-টাইমে আপনার প্রজেক্টেড ROI দেখুন।',
  } as Bilingual,
  sliders: {
    monthlyLeads: {
      label: { en: 'Monthly leads', bn: 'মাসিক লিড' },
      min: 50,
      max: 2000,
      step: 50,
      default: 200,
    },
    conversionRate: {
      label: { en: 'Current conversion rate (%)', bn: 'বর্তমান কনভার্সন রেট (%)' },
      min: 5,
      max: 30,
      step: 1,
      default: 10,
    },
    avgDealSize: {
      label: { en: 'Average deal size (৳)', bn: 'গড় ডিল সাইজ (৳)' },
      min: 5000,
      max: 500000,
      step: 5000,
      default: 50000,
    },
    salesTeamSize: {
      label: { en: 'Sales team size', bn: 'সেলস টিম সাইজ' },
      min: 1,
      max: 50,
      step: 1,
      default: 5,
    },
    manualHours: {
      label: { en: 'Manual hours/week per rep', bn: 'প্রতি রেপ সাপ্তাহিক ম্যানুয়াল ঘন্টা' },
      min: 5,
      max: 40,
      step: 1,
      default: 20,
    },
    monthlyInvestment: {
      label: { en: 'Monthly CRM investment (৳)', bn: 'মাসিক CRM ইনভেস্টমেন্ট (৳)' },
      min: 10000,
      max: 200000,
      step: 5000,
      default: 50000,
    },
  },
  results: {
    revenueIncrease: { label: { en: 'Annual revenue increase', bn: 'বার্ষিক রেভিনিউ বৃদ্ধি' } },
    timeSaved: { label: { en: 'Annual hours saved', bn: 'বার্ষিক ঘন্টা বাঁচানো' } },
    costSaved: { label: { en: 'Annual cost saved', bn: 'বার্ষিক খরচ বাঁচানো' } },
    roi: { label: { en: 'ROI multiple', bn: 'ROI গুণিতক' } },
    paybackDays: { label: { en: 'Payback period (days)', bn: 'পেব্যাক পিরিয়ড (দিন)' } },
  },
  note: {
    en: 'Estimates based on industry averages and our 50+ client results. Your actual ROI may be higher. Book a call for a custom projection.',
    bn: 'ইন্ডাস্ট্রি গড় ও আমাদের ৫০+ ক্লায়েন্টের ফলাফলের উপর ভিত্তি করে অনুমান। আপনার আসল ROI বেশি হতে পারে। কাস্টম প্রজেকশনের জন্য কল বুক করুন।',
  } as Bilingual,
  cta: {
    en: 'Get my custom ROI projection',
    bn: 'আমার কাস্টম ROI প্রজেকশন পান',
  } as Bilingual,
}

/* ========================================================================== */
/*  28. CRM MATURITY ASSESSMENT (Lead Magnet)                                 */
/* ========================================================================== */

export const CRM_MATURITY = {
  eyebrow: { en: 'Free CRM health check', bn: 'ফ্রি CRM হেলথ চেক' } as Bilingual,
  title: {
    en: 'How healthy is your CRM? Take the 6-question assessment',
    bn: 'আপনার CRM কতটা সুস্থ? ৬-প্রশ্নের অ্যাসেসমেন্ট দিন',
  } as Bilingual,
  subtitle: {
    en: 'Get an instant score (0–100) + personalised recommendations. Takes 90 seconds. No email required.',
    bn: 'তাৎক্ষণিক স্কোর (০–১০০) + পার্সোনালাইজড সুপারিশ পান। ৯০ সেকেন্ড লাগে। কোনো ইমেইল লাগে না।',
  } as Bilingual,
  questions: [
    {
      q: { en: 'How do you capture leads today?', bn: 'আজকাল আপনি কীভাবে লিড ক্যাপচার করেন?' },
      options: [
        { value: 0, label: { en: 'Manual entry (Excel / paper)', bn: 'ম্যানুয়াল এন্ট্রি (এক্সেল / কাগজ)' } },
        { value: 1, label: { en: 'Some forms, manual CRM entry', bn: 'কিছু ফর্ম, ম্যানুয়াল CRM এন্ট্রি' } },
        { value: 2, label: { en: 'Auto-capture from all sources', bn: 'সব সোর্স থেকে অটো-ক্যাপচার' } },
      ],
    },
    {
      q: { en: 'Do you have lead scoring?', bn: 'আপনার কি লিড স্কোরিং আছে?' },
      options: [
        { value: 0, label: { en: 'No scoring', bn: 'কোনো স্কোরিং নেই' } },
        { value: 1, label: { en: 'Manual / gut feel', bn: 'ম্যানুয়াল / অনুভূতি' } },
        { value: 2, label: { en: 'AI-powered scoring', bn: 'AI-চালিত স্কোরিং' } },
      ],
    },
    {
      q: { en: 'How are follow-ups managed?', bn: 'ফলো-আপ কীভাবে ম্যানেজ করা হয়?' },
      options: [
        { value: 0, label: { en: 'Manual reminders', bn: 'ম্যানুয়াল রিমাইন্ডার' } },
        { value: 1, label: { en: 'Some automation', bn: 'কিছু অটোমেশন' } },
        { value: 2, label: { en: 'Fully automated sequences', bn: 'সম্পূর্ণ অটোমেটেড সিকোয়েন্স' } },
      ],
    },
    {
      q: { en: 'What does your reporting look like?', bn: 'আপনার রিপোর্টিং কেমন?' },
      options: [
        { value: 0, label: { en: 'Excel / manual', bn: 'এক্সেল / ম্যানুয়াল' } },
        { value: 1, label: { en: 'Basic CRM dashboard', bn: 'বেসিক CRM ড্যাশবোর্ড' } },
        { value: 2, label: { en: 'Real-time custom dashboards', bn: 'রিয়েল-টাইম কাস্টম ড্যাশবোর্ড' } },
      ],
    },
    {
      q: { en: 'How many tools are integrated with your CRM?', bn: 'আপনার CRM-এর সাথে কতগুলো টুল ইন্টিগ্রেটেড?' },
      options: [
        { value: 0, label: { en: 'None / standalone', bn: 'কোনোটি নেই / স্ট্যান্ডঅ্যালোন' } },
        { value: 1, label: { en: '1-3 tools', bn: '১-৩টি টুল' } },
        { value: 2, label: { en: '5+ tools (full ecosystem)', bn: '৫+ টুল (ফুল ইকোসিস্টেম)' } },
      ],
    },
    {
      q: { en: 'Do you use AI in your CRM?', bn: 'আপনার কি CRM-এ AI ব্যবহার করেন?' },
      options: [
        { value: 0, label: { en: 'No AI', bn: 'কোনো AI নেই' } },
        { value: 1, label: { en: 'Basic AI (chatbot only)', bn: 'বেসিক AI (শুধু চ্যাটবট)' } },
        { value: 2, label: { en: 'Full AI (scoring, voice, proposals)', bn: 'ফুল AI (স্কোরিং, ভয়েস, প্রপোজাল)' } },
      ],
    },
  ],
  results: [
    {
      min: 0,
      max: 33,
      label: { en: 'Critical — major revenue leakage', bn: 'ক্রিটিক্যাল — বড় রেভিনিউ লিকেজ' },
      desc: {
        en: 'Your CRM is essentially a contact list. You are losing 40%+ of potential revenue. Immediate action needed.',
        bn: 'আপনার CRM মূলত একটি কন্টাক্ট লিস্ট। আপনি সম্ভাব্য রেভিনিউর ৪০%+ হারাচ্ছেন। তাৎক্ষণিক অ্যাকশন দরকার।',
      },
      cta: { en: 'Book emergency CRM audit', bn: 'ইমার্জেন্সি CRM অডিট বুক করুন' },
    },
    {
      min: 34,
      max: 66,
      label: { en: 'Average — significant room for improvement', bn: 'গড় — উন্নতির বড় সুযোগ' },
      desc: {
        en: 'Your CRM has potential but is under-utilised. With automation + AI, you could 2-3x your pipeline. Worth investing.',
        bn: 'আপনার CRM-এ সম্ভাবনা আছে কিন্তু আন্ডার-ইউটিলাইজড। অটোমেশন + AI দিয়ে আপনি পাইপলাইন ২-৩x করতে পারেন। ইনভেস্ট করা মূল্যবান।',
      },
      cta: { en: 'Book CRM optimisation call', bn: 'CRM অপটিমাইজেশন কল বুক করুন' },
    },
    {
      min: 67,
      max: 100,
      label: { en: 'Strong — ready for advanced AI features', bn: 'শক্তিশালী — অ্যাডভান্সড AI ফিচারের জন্য রেডি' },
      desc: {
        en: 'Your CRM is well-built. Adding AI voice agents, predictive analytics and advanced automation can 1.5-2x your results.',
        bn: 'আপনার CRM ভালোভাবে বিল্ট। AI ভয়েস এজেন্ট, প্রেডিক্টিভ অ্যানালিটিক্স ও অ্যাডভান্সড অটোমেশন যোগ করলে ফলাফল ১.৫-২x হতে পারে।',
      },
      cta: { en: 'Book advanced AI consultation', bn: 'অ্যাডভান্সড AI কনসালটেশন বুক করুন' },
    },
  ],
}

/* ========================================================================== */
/*  29. FAQS — 30+ across 6 groups                                            */
/* ========================================================================== */

export const FAQS = {
  eyebrow: { en: 'Answers to your questions', bn: 'আপনার প্রশ্নের উত্তর' } as Bilingual,
  title: {
    en: 'Frequently asked questions',
    bn: 'সাধারণ জিজ্ঞাসা',
  } as Bilingual,
  subtitle: {
    en: 'Everything you need to know before booking your call. 30+ real questions from real business owners.',
    bn: 'কল বুক করার আগে যা যা জানা দরকার। বাস্তব ব্যবসার মালিকদের ৩০+ বাস্তব প্রশ্ন।',
  } as Bilingual,
  groups: [
    {
      name: { en: 'Pricing & Plans', bn: 'প্রাইসিং ও প্ল্যান' },
      items: [
        {
          q: { en: 'How much does CRM automation cost?', bn: 'CRM অটোমেশনের খরচ কত?' },
          a: { en: 'Plans start at ৳25,000/month for Starter (5 workflows, 1,000 contacts, 3 users) and scale to ৳50,000/month for Growth (15 workflows, AI chatbot, 10,000 contacts). Enterprise is custom-priced. All plans include 60-day ROI guarantee, full setup, team training and dedicated support.', bn: 'স্টার্টার প্ল্যান ৳২৫,০০০/মাসে শুরু (৫টি ওয়ার্কফ্লো, ১,০০০ কন্ট্যাক্ট, ৩ ইউজার) এবং গ্রোথ প্ল্যান ৳৫০,০০০/মাস (১৫টি ওয়ার্কফ্লো, AI চ্যাটবট, ১০,০০০ কন্ট্যাক্ট)। এন্টারপ্রাইজ কাস্টম প্রাইসড। সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি, ফুল সেটআপ, টিম ট্রেনিং ও ডেডিকেটেড সাপোর্ট।' },
        },
        {
          q: { en: 'Is there a setup fee?', bn: 'কি কোনো সেটআপ ফি আছে?' },
          a: { en: 'Setup fee is waived for annual commitments. For monthly plans, a one-time setup fee of ৳15,000–40,000 covers CRM configuration, workflow build, integrations, AI training, team training and documentation.', bn: 'বার্ষিক কমিটমেন্টে সেটআপ ফি মওকুফ। মাসিক প্ল্যানে এককালীন ৳১৫,০০০–৪০,০০০ সেটআপ ফি CRM কনফিগারেশন, ওয়ার্কফ্লো বিল্ড, ইন্টিগ্রেশন, AI ট্রেনিং, টিম ট্রেনিং ও ডকুমেন্টেশন কভার করে।' },
        },
        {
          q: { en: 'Can I change plans later?', bn: 'পরে প্ল্যান পরিবর্তন করতে পারব?' },
          a: { en: 'Yes, upgrade or downgrade anytime. Upgrades are instant. Downgrades take effect at the next billing cycle. No lock-in, no penalty.', bn: 'হ্যাঁ, যেকোনো সময় আপগ্রেড বা ডাউনগ্রেড করুন। আপগ্রেড তাৎক্ষণিক। ডাউনগ্রেড পরবর্তী বিলিং সাইকেলে কার্যকর। কোনো লক-ইন নেই, কোনো পেনাল্টি নেই।' },
        },
        {
          q: { en: 'Do you offer refunds?', bn: 'আপনারা রিফান্ড দেন?' },
          a: { en: 'Yes. The 60-day ROI guarantee means if you do not see measurable ROI within 60 days of go-live, we refund 100% of setup fees and you keep the CRM. We have honoured this for every client who has asked.', bn: 'হ্যাঁ। ৬০-দিন ROI গ্যারান্টি মানে গো-লাইভের ৬০ দিনের মধ্যে পরিমেয় ROI না দেখলে, আমরা সেটআপ ফি ১০০% রিফান্ড দেই এবং CRM আপনার থাকে। যে ক্লায়েন্ট চেয়েছে তার জন্য আমরা এটি মেনেছি।' },
        },
        {
          q: { en: 'What is included in the monthly fee?', bn: 'মাসিক ফিতে কী অন্তর্ভুক্ত?' },
          a: { en: 'CRM subscription, automation maintenance, AI usage, integrations, dashboards, team access, dedicated success manager, technical support, monthly performance reviews, quarterly optimisation. Everything except third-party tool subscriptions (Meta Ads spend, bKash fees, etc.) which you pay directly.', bn: 'CRM সাবস্ক্রিপশন, অটোমেশন মেইনটেন্যান্স, AI ইউসেজ, ইন্টিগ্রেশন, ড্যাশবোর্ড, টিম অ্যাক্সেস, ডেডিকেটেড সাকসেস ম্যানেজার, টেকনিক্যাল সাপোর্ট, মাসিক পারফরম্যান্স রিভিউ, কোয়ার্টারলি অপটিমাইজেশন। থার্ড-পার্টি টুল সাবস্ক্রিপশন ব্যতীত সবকিছু (Meta Ads স্পেন্ড, bKash ফি ইত্যাদি) যা আপনি সরাসরি দেন।' },
        },
        {
          q: { en: 'Are there any hidden fees?', bn: 'কি কোনো হিডেন ফি আছে?' },
          a: { en: 'No hidden fees. Everything is documented upfront. Third-party costs (Meta conversation fees, Stripe processing, etc.) are passed through at cost with full transparency.', bn: 'কোনো হিডেন ফি নেই। সবকিছু আগে ডকুমেন্টেড। থার্ড-পার্টি খরচ (Meta কনভার্সেশন ফি, Stripe প্রসেসিং ইত্যাদি) কস্টে পাস করা হয় পূর্ণ স্বচ্ছতায়।' },
        },
        {
          q: { en: 'Can I pay annually?', bn: 'আমি কি বার্ষিক পেমেন্ট করতে পারি?' },
          a: { en: 'Yes. Annual commitments get 15% off and waived setup fees. We accept bank transfer, bKash, Nagad, SSL Commerz and international cards via Stripe.', bn: 'হ্যাঁ। বার্ষিক কমিটমেন্টে ১৫% ছাড় এবং সেটআপ ফি মওকুফ। আমরা ব্যাংক ট্রান্সফার, bKash, Nagad, SSL Commerz এবং Stripe-এর মাধ্যমে আন্তর্জাতিক কার্ড গ্রহণ করি।' },
        },
      ],
    },
    {
      name: { en: 'Setup & Technical', bn: 'সেটআপ ও টেকনিক্যাল' },
      items: [
        {
          q: { en: 'How long does setup take?', bn: 'সেটআপে কত সময় লাগে?' },
          a: { en: 'Starter plans go live in 3–5 days. Growth plans take 5–7 days. Enterprise with custom integrations takes 7–10 days. The 5-day go-live guarantee applies to Starter plans.', bn: 'স্টার্টার প্ল্যান ৩–৫ দিনে লাইভ। গ্রোথ প্ল্যান ৫–৭ দিন। কাস্টম ইন্টিগ্রেশনসহ এন্টারপ্রাইজ ৭–১০ দিন। ৫-দিন গো-লাইভ গ্যারান্টি স্টার্টার প্ল্যানে প্রযোজ্য।' },
        },
        {
          q: { en: 'Which CRMs do you work with?', bn: 'আপনারা কোন CRM নিয়ে কাজ করেন?' },
          a: { en: 'HubSpot, GoHighLevel, Salesforce, Zoho, Pipedrive, Freshsales, Monday, ClickUp, plus custom CRM builds. For most Bangladeshi businesses, GoHighLevel is the best value. For enterprise, Salesforce or custom.', bn: 'HubSpot, GoHighLevel, Salesforce, Zoho, Pipedrive, Freshsales, Monday, ClickUp, প্লাস কাস্টম CRM বিল্ড। বেশিরভাগ বাংলাদেশি ব্যবসার জন্য GoHighLevel সেরা ভ্যালু। এন্টারপ্রাইজের জন্য Salesforce বা কাস্টম।' },
        },
        {
          q: { en: 'Do I need to buy a CRM subscription separately?', bn: 'আমার কি আলাদাভাবে CRM সাবস্ক্রিপশন কিনতে হবে?' },
          a: { en: 'For HubSpot, Salesforce, Zoho — yes, you pay them directly. For GoHighLevel, we have a partner account and can include it in your monthly fee. Custom CRM builds have no monthly subscription.', bn: 'HubSpot, Salesforce, Zoho-এর জন্য — হ্যাঁ, আপনি তাদের সরাসরি দেন। GoHighLevel-এর জন্য, আমাদের পার্টনার অ্যাকাউন্ট আছে এবং আপনার মাসিক ফিতে অন্তর্ভুক্ত করতে পারি। কাস্টম CRM বিল্ডে কোনো মাসিক সাবস্ক্রিপশন নেই।' },
        },
        {
          q: { en: 'Will you migrate my existing data?', bn: 'আপনারা কি আমার বিদ্যমান ডেটা মাইগ্রেট করবেন?' },
          a: { en: 'Yes. We migrate contacts, deals, notes, activities from Excel, other CRMs, WhatsApp, email. Zero data loss guarantee. Every record verified before, during and after migration.', bn: 'হ্যাঁ। আমরা এক্সেল, অন্যান্য CRM, WhatsApp, ইমেইল থেকে কন্টাক্ট, ডিল, নোট, অ্যাক্টিভিটি মাইগ্রেট করি। জিরো ডেটা লস গ্যারান্টি। প্রতিটি রেকর্ড মাইগ্রেশন আগে, সময় ও পরে ভেরিফাই।' },
        },
        {
          q: { en: 'Do I need technical knowledge?', bn: 'আমার কি টেকনিক্যাল জ্ঞান দরকার?' },
          a: { en: 'No. We handle all technical work — setup, configuration, automation, integrations, AI training. Your team just uses the CRM. We provide training, documentation and ongoing support.', bn: 'না। আমরা সব টেকনিক্যাল কাজ সামলাই — সেটআপ, কনফিগারেশন, অটোমেশন, ইন্টিগ্রেশন, AI ট্রেনিং। আপনার টিম শুধু CRM ব্যবহার করে। আমরা ট্রেনিং, ডকুমেন্টেশন ও চলমান সাপোর্ট দিই।' },
        },
        {
          q: { en: 'Can you integrate with my existing tools?', bn: 'আমার বিদ্যমান টুলের সাথে কি ইন্টিগ্রেট করতে পারবেন?' },
          a: { en: 'If it has an API, yes. We have 50+ native integrations (Meta Ads, WhatsApp, bKash, Nagad, Stripe, Google Calendar, Slack, Zoom, Zapier, Make, n8n). For custom tools, we build integrations in 3–5 days.', bn: 'API থাকলে, হ্যাঁ। আমাদের ৫০+ নেটিভ ইন্টিগ্রেশন (Meta Ads, WhatsApp, bKash, Nagad, Stripe, Google Calendar, Slack, Zoom, Zapier, Make, n8n)। কাস্টম টুলের জন্য, আমরা ৩–৫ দিনে ইন্টিগ্রেশন বিল্ড করি।' },
        },
        {
          q: { en: 'Is my data secure?', bn: 'আমার ডেটা কি নিরাপদ?' },
          a: { en: 'Yes. End-to-end encryption (AES-256), SOC2-compliant infrastructure, GDPR-compliant processes, role-based access control, audit logs, daily backups, 2FA. Full security documentation provided.', bn: 'হ্যাঁ। এন্ড-টু-এন্ড এনক্রিপশন (AES-256), SOC2-কমপ্লায়েন্ট ইনফ্রাস্ট্রাকচার, GDPR-কমপ্লায়েন্ট প্রসেস, রোল-বেসড অ্যাক্সেস কন্ট্রোল, অডিট লগ, ডেইলি ব্যাকআপ, 2FA। ফুল সিকিউরিটি ডকুমেন্টেশন দেওয়া হয়।' },
        },
      ],
    },
    {
      name: { en: 'AI & Automation', bn: 'AI ও অটোমেশন' },
      items: [
        {
          q: { en: 'What AI do you use?', bn: 'আপনারা কোন AI ব্যবহার করেন?' },
          a: { en: 'OpenAI GPT-4 for chatbot, email writing, proposal generation, conversation summary. ElevenLabs for voice agents. Whisper for speech-to-text. Anthropic Claude for specific tasks. We are model-agnostic and use the best for each use case.', bn: 'চ্যাটবট, ইমেইল রাইটিং, প্রপোজাল জেনারেশন, কনভার্সেশন সামারির জন্য OpenAI GPT-4। ভয়েস এজেন্টের জন্য ElevenLabs। স্পিচ-টু-টেক্সটের জন্য Whisper। নির্দিষ্ট টাস্কের জন্য Anthropic Claude। আমরা মডেল-অ্যাগনস্টিক এবং প্রতিটি ইউজ-কেসের জন্য সেরা ব্যবহার করি।' },
        },
        {
          q: { en: 'Does the AI understand Bangla?', bn: 'AI কি বাংলা বোঝে?' },
          a: { en: 'Yes. GPT-4 handles Bangla, English and Banglish fluently. Our voice agent speaks natural Bangla. We have trained custom models on Bangladeshi business context (bKash, Nagad, local pricing, cultural references).', bn: 'হ্যাঁ। GPT-4 বাংলা, ইংরেজি ও Banglish সাবলীলভাবে সামলায়। আমাদের ভয়েস এজেন্ট স্বাভাবিক বাংলায় কথা বলে। আমরা বাংলাদেশি বিজনেস কনটেক্সটে কাস্টম মডেল ট্রেন করেছি (bKash, Nagad, লোকাল প্রাইসিং, কালচারাল রেফারেন্স)।' },
        },
        {
          q: { en: 'How does lead scoring work?', bn: 'লিড স্কোরিং কীভাবে কাজ করে?' },
          a: { en: 'AI scores each lead 0–100 based on 25+ signals: source quality, behaviour on website, email engagement, form completeness, demographic match, intent signals (price question, timeline mention). Hot leads (80+) get called in 5 minutes. Cold leads (<30) enter nurture.', bn: 'AI ২৫+ সিগন্যালের ভিত্তিতে প্রতিটি লিড ০–১০০ স্কোর করে: সোর্স কোয়ালিটি, ওয়েবসাইটে বিহেভিয়ার, ইমেইল এনগেজমেন্ট, ফর্ম সম্পূর্ণতা, ডেমোগ্রাফিক ম্যাচ, ইনটেন্ট সিগন্যাল (দাম প্রশ্ন, টাইমলাইন উল্লেখ)। হট লিড (৮০+) ৫ মিনিটে কল পায়। কোল্ড লিড (<৩০) নার্চারে যায়।' },
        },
        {
          q: { en: 'What if the AI makes a mistake?', bn: 'AI ভুল করলে কী হবে?' },
          a: { en: 'AI never sends anything without human review for high-stakes communications (proposals, contracts). For routine replies, AI has guardrails + human escalation triggers. Every AI action is logged and auditable. We tune thresholds during onboarding.', bn: 'AI উচ্চ-স্টেক কমিউনিকেশনে (প্রপোজাল, চুক্তি) মানুষের রিভিউ ছাড়া কিছু পাঠায় না। রুটিন রিপ্লাইয়ের জন্য, AI-তে গার্ডরেইল + হিউম্যান এসক্যালেশন ট্রিগার আছে। প্রতিটি AI অ্যাকশন লগড ও অডিটেবল। আমরা অনবোর্ডিং চলাকালীন থ্রেশহোল্ড টিউন করি।' },
        },
        {
          q: { en: 'How many automations can I build?', bn: 'আমি কতগুলো অটোমেশন বিল্ড করতে পারি?' },
          a: { en: 'Starter: 5 workflows. Growth: 15 workflows. Enterprise: unlimited. Workflows can be multi-step (10+ steps each) with conditional branching. We also build new workflows on request during your subscription.', bn: 'স্টার্টার: ৫টি ওয়ার্কফ্লো। গ্রোথ: ১৫টি ওয়ার্কফ্লো। এন্টারপ্রাইজ: আনলিমিটেড। ওয়ার্কফ্লো মাল্টি-স্টেপ (১০+ স্টেপ প্রতিটি) কন্ডিশনাল ব্র্যাঞ্চিংসহ হতে পারে। আমরা আপনার সাবস্ক্রিপশন চলাকালীন অনুরোধে নতুন ওয়ার্কফ্লো বিল্ড করি।' },
        },
      ],
    },
    {
      name: { en: 'Results & ROI', bn: 'ফলাফল ও ROI' },
      items: [
        {
          q: { en: 'What ROI can I expect?', bn: 'আমি কেমন ROI আশা করতে পারি?' },
          a: { en: 'Average client sees 4.2x ROI in first 90 days, 11x by month 12. Specific results depend on lead volume, deal size, current conversion rate. Use our ROI calculator for a projection, or book a call for a custom number.', bn: 'গড় ক্লায়েন্ট প্রথম ৯০ দিনে ৪.২x ROI, ১২ মাসে ১১x দেখে। নির্দিষ্ট ফলাফল লিড ভলিউম, ডিল সাইজ, বর্তমান কনভার্সন রেটের উপর নির্ভর করে। প্রজেকশনের জন্য আমাদের ROI ক্যালকুলেটর ব্যবহার করুন, বা কাস্টম নম্বরের জন্য কল বুক করুন।' },
        },
        {
          q: { en: 'How quickly will I see results?', bn: 'কত দ্রুত ফলাফল দেখব?' },
          a: { en: 'Week 1: lead response time drops from hours to seconds. Week 2: first appointments booked via automation. Month 1: pipeline visibility + first closed deals from automated nurture. Month 3: measurable ROI.', bn: 'সপ্তাহ ১: লিড রেসপন্স টাইম ঘন্টা থেকে সেকেন্ডে নামে। সপ্তাহ ২: অটোমেশনের মাধ্যমে প্রথম অ্যাপয়েন্টমেন্ট বুক। মাস ১: পাইপলাইন ভিজিবিলিটি + অটোমেটেড নার্চার থেকে প্রথম ক্লোজড ডিল। মাস ৩: পরিমেয় ROI।' },
        },
        {
          q: { en: 'What if it does not work for my business?', bn: 'যদি আমার ব্যবসার জন্য কাজ না করে?' },
          a: { en: 'The 60-day ROI guarantee covers this. If you do not see measurable ROI in 60 days, we work for free until you do. In 7 years and 50+ clients, we have never had to invoke the guarantee beyond 90 days.', bn: '৬০-দিন ROI গ্যারান্টি এটি কভার করে। ৬০ দিনে পরিমেয় ROI না দেখলে, আমরা ততক্ষণ ফ্রি কাজ করি। ৭ বছর ও ৫০+ ক্লায়েন্টে, আমাদের ৯০ দিনের বাইরে গ্যারান্টি ইনভোক করতে হয়নি।' },
        },
        {
          q: { en: 'Do you have case studies in my industry?', bn: 'আমার ইন্ডাস্ট্রিতে কি কেস স্টডি আছে?' },
          a: { en: 'We have case studies in real estate, healthcare, e-commerce, education, manufacturing, logistics, SaaS, agency, finance, NGO, construction, export. Book a call and we will share the most relevant one for your business.', bn: 'রিয়েল এস্টেট, হেলথকেয়ার, ই-কমার্স, শিক্ষা, উৎপাদন, লজিস্টিকস, SaaS, এজেন্সি, ফিন্যান্স, NGO, কনস্ট্রাকশন, রপ্তানিতে কেস স্টডি আছে। কল বুক করুন এবং আমরা আপনার ব্যবসার জন্য সবচেয়ে প্রাসঙ্গিকটি শেয়ার করব।' },
        },
        {
          q: { en: 'How do you measure success?', bn: 'আপনারা সাফল্য কীভাবে মাপেন?' },
          a: { en: '8 KPIs tracked from day one: response time, lead response (follow-ups), conversion rate, sales cycle length, automation %, revenue growth, pipeline growth, cost saving. Monthly performance review with your success manager.', bn: 'প্রথম দিন থেকে ৮টি KPI ট্র্যাকড: রেসপন্স টাইম, লিড রেসপন্স (ফলো-আপ), কনভার্সন রেট, সেলস সাইকেল দৈর্ঘ্য, অটোমেশন %, রেভিনিউ বৃদ্ধি, পাইপলাইন বৃদ্ধি, খরচ বাঁচানো। আপনার সাকসেস ম্যানেজারের সাথে মাসিক পারফরম্যান্স রিভিউ।' },
        },
      ],
    },
    {
      name: { en: 'Support & Onboarding', bn: 'সাপোর্ট ও অনবোর্ডিং' },
      items: [
        {
          q: { en: 'What support do you provide?', bn: 'আপনারা কেমন সাপোর্ট দেন?' },
          a: { en: 'Dedicated success manager (single point of contact), 24/7 technical support via WhatsApp + email + Slack, 4-hour response SLA (Growth) / 1-hour (Enterprise), monthly performance reviews, quarterly optimisation roadmaps.', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার (একক পয়েন্ট অফ কন্টাক্ট), WhatsApp + ইমেইল + Slack-এ ২৪/৭ টেকনিক্যাল সাপোর্ট, ৪-ঘন্টা রেসপন্স SLA (গ্রোথ) / ১-ঘন্টা (এন্টারপ্রাইজ), মাসিক পারফরম্যান্স রিভিউ, কোয়ার্টারলি অপটিমাইজেশন রোডম্যাপ।' },
        },
        {
          q: { en: 'How do you train my team?', bn: 'আপনারা আমার টিমকে কীভাবে ট্রেন করেন?' },
          a: { en: 'Live training sessions (recorded for replay), role-specific video library (10+ videos), written SOPs, admin handbook, FAQ document, plus dedicated success manager for ongoing questions. New hires can self-onboard in 1 day.', bn: 'লাইভ ট্রেনিং সেশন (রিপ্লের জন্য রেকর্ডেড), রোল-স্পেসিফিক ভিডিও লাইব্রেরি (১০+ ভিডিও), লিখিত SOP, অ্যাডমিন হ্যান্ডবুক, FAQ ডকুমেন্ট, প্লাস চলমান প্রশ্নের জন্য ডেডিকেটেড সাকসেস ম্যানেজার। নতুন নিয়োগ ১ দিনে সেলফ-অনবোর্ড করতে পারে।' },
        },
        {
          q: { en: 'What if my team resists using the CRM?', bn: 'আমার টিম যদি CRM ব্যবহার করতে অস্বীকার করে?' },
          a: { en: 'This is the #1 reason CRM implementations fail. We design workflows to remove friction (mobile-first, voice logging, AI assistance). We measure adoption weekly. If a team member is not using it, we work with you to fix the root cause. Our average adoption rate is 85%+.', bn: 'এটি CRM ইমপ্লিমেন্টেশন ব্যর্থ হওয়ার #১ কারণ। আমরা ফ্রিকশন সরাতে ওয়ার্কফ্লো ডিজাইন করি (মোবাইল-ফার্স্ট, ভয়েস লগিং, AI অ্যাসিস্ট্যান্স)। আমরা সাপ্তাহিক অ্যাডপশন মাপি। কোনো টিম মেম্বার ব্যবহার না করলে, আমরা আপনার সাথে রুট কজ ফিক্স করি। আমাদের গড় অ্যাডপশন রেট ৮৫%+।' },
        },
        {
          q: { en: 'Can you train my new hires?', bn: 'আপনারা কি আমার নতুন নিয়োগ ট্রেন করতে পারেন?' },
          a: { en: 'Yes. Our video library + SOPs are designed for self-onboarding. New hires can be productive in 1 day. For Enterprise clients, we also offer live onboarding sessions for new hires at no extra cost.', bn: 'হ্যাঁ। আমাদের ভিডিও লাইব্রেরি + SOP সেলফ-অনবোর্ডিংয়ের জন্য ডিজাইন করা। নতুন নিয়োগ ১ দিনে প্রোডাক্টিভ হতে পারে। এন্টারপ্রাইজ ক্লায়েন্টের জন্য, আমরা নতুন নিয়োগের জন্য লাইভ অনবোর্ডিং সেশনও অফার করি কোনো অতিরিক্ত খরচ ছাড়া।' },
        },
        {
          q: { en: 'What happens if I want to cancel?', bn: 'আমি ক্যানসেল করতে চাইলে কী হবে?' },
          a: { en: 'No lock-in. Cancel anytime with 30-day notice. You keep all your data (exportable). We hand over admin access. The 60-day ROI guarantee covers the first 60 days — if it does not work, full refund of setup fees.', bn: 'কোনো লক-ইন নেই। ৩০-দিন নোটিশে যেকোনো সময় ক্যানসেল। আপনার সব ডেটা আপনার (এক্সপোর্টেবল)। আমরা অ্যাডমিন অ্যাক্সেস হ্যান্ডওভার করি। ৬০-দিন ROI গ্যারান্টি প্রথম ৬০ দিন কভার করে — কাজ না করলে, সেটআপ ফি ফুল রিফান্ড।' },
        },
      ],
    },
    {
      name: { en: 'Comparison & Alternatives', bn: 'তুলনা ও বিকল্প' },
      items: [
        {
          q: { en: 'Why not just hire a CRM manager?', bn: 'কেন না শুধু একজন CRM ম্যানেজার নিয়োগ করি?' },
          a: { en: 'A good CRM manager costs ৳50,000–80,000/month + benefits + training + management overhead. They get sick, take leave, quit. Our system + automation + AI does the work of 5 hires for ৳25,000–50,000/month, 24/7, no leave. Plus, we bring 50+ implementations of experience.', bn: 'ভালো CRM ম্যানেজার খরচ ৳৫০,০০০–৮০,০০০/মাস + সুবিধা + ট্রেনিং + ম্যানেজমেন্ট ওভারহেড। তারা অসুস্থ হয়, ছুটি নেয়, চাকরি ছাড়ে। আমাদের সিস্টেম + অটোমেশন + AI ৫ জন নিয়োগের কাজ করে ৳২৫,০০০–৫০,০০০/মাসে, ২৪/৭, কোনো ছুটি নেই। প্লাস, আমরা ৫০+ ইমপ্লিমেন্টেশনের অভিজ্ঞতা আনি।' },
        },
        {
          q: { en: 'Why not use HubSpot/Salesforce directly?', bn: 'কেন না সরাসরি HubSpot/Salesforce ব্যবহার করি?' },
          a: { en: 'You can. But 70% of CRM implementations fail because the software is installed, not configured. We deliver a working system — configured, automated, AI-integrated, trained — in days, not months. Plus ongoing optimisation that the vendor does not provide.', bn: 'পারেন। কিন্তু ৭০% CRM ইমপ্লিমেন্টেশন ব্যর্থ কারণ সফটওয়্যার ইনস্টল হয়, কনফিগার হয় না। আমরা ওয়ার্কিং সিস্টেম ডেলিভারি করি — কনফিগার্ড, অটোমেটেড, AI-ইন্টিগ্রেটেড, ট্রেইন্ড — দিনে, মাসে নয়। প্লাস ভেন্ডর যে চলমান অপটিমাইজেশন দেয় না তা দিই।' },
        },
        {
          q: { en: 'How are you different from a generic agency?', bn: 'জেনেরিক এজেন্সি থেকে আপনারা কীভাবে আলাদা?' },
          a: { en: 'Generic agencies do marketing + web design + "CRM setup" as a side service. We are CRM automation specialists — 100% of our work is CRM + AI + automation. 2,000+ automations built. 50+ active clients. 7 years. We go deep, not wide.', bn: 'জেনেরিক এজেন্সি মার্কেটিং + ওয়েব ডিজাইন + "CRM সেটআপ" সাইড সার্ভিস হিসেবে করে। আমরা CRM অটোমেশন স্পেশালিস্ট — আমাদের কাজের ১০০% CRM + AI + অটোমেশন। ২,০০০+ অটোমেশন তৈরি। ৫০+ সক্রিয় ক্লায়েন্ট। ৭ বছর। আমরা ডিপ যাই, ওয়াইড নয়।' },
        },
        {
          q: { en: 'Why should I trust NextGen Digital Studio?', bn: 'কেন NextGen Digital Studio-কে বিশ্বাস করব?' },
          a: { en: '7 years in business. 50+ active clients. 2,000+ automations built. ৳100Cr+ revenue influenced for clients. 4.9/5 rating. 94% retention. 60-day ROI guarantee in writing. We are not going anywhere — we are your long-term automation partner.', bn: '৭ বছর ব্যবসায়। ৫০+ সক্রিয় ক্লায়েন্ট। ২,০০০+ অটোমেশন তৈরি। ক্লায়েন্টের জন্য ৳১০০কোটি+ রেভিনিউ ইনফ্লুয়েন্সড। ৪.৯/৫ রেটিং। ৯৪% রিটেনশন। লিখিত ৬০-দিন ROI গ্যারান্টি। আমরা কোথাও যাচ্ছি না — আমরা আপনার দীর্ঘমেয়াদী অটোমেশন পার্টনার।' },
        },
        {
          q: { en: 'What if I already have a CRM I like?', bn: 'আমার যদি ইতিমধ্যে পছন্দের CRM থাকে?' },
          a: { en: 'Perfect. We work with your existing CRM (HubSpot, GoHighLevel, Salesforce, Zoho, etc.) and add automation + AI + integrations on top. No need to switch. We make what you have work properly.', bn: 'দারুণ। আমরা আপনার বিদ্যমান CRM (HubSpot, GoHighLevel, Salesforce, Zoho ইত্যাদি) নিয়ে কাজ করি এবং অটোমেশন + AI + ইন্টিগ্রেশন উপরে যোগ করি। সুইচ করার দরকার নেই। আপনার যা আছে তা সঠিকভাবে কাজ করি।' },
        },
      ],
    },
  ],
}

/* ========================================================================== */
/*  30. OBJECTIONS                                                             */
/* ========================================================================== */

export const OBJECTIONS = {
  eyebrow: { en: 'Addressing your concerns', bn: 'আপনার উদ্বেগের সমাধান' } as Bilingual,
  title: {
    en: '15 objections — and our honest answers',
    bn: '১৫টি আপত্তি — এবং আমাদের সততার উত্তর',
  } as Bilingual,
  subtitle: {
    en: 'These are the real objections we hear on calls. Here is how we address each one — honestly, no sales pressure.',
    bn: 'কলে যে আপত্তিগুলো শুনি তা এখানে। আমরা কীভাবে প্রতিটি সমাধান করি — সততায়, কোনো সেলস প্রেসার নেই।',
  } as Bilingual,
  items: [
    {
      objection: { en: 'It is too expensive for my business', bn: 'আমার ব্যবসার জন্য অনেক দামি' },
      answer: {
        en: 'Starter is ৳25,000/month — less than one salesperson\'s salary. It replaces 5 hires worth of work (৳1.6L/month value). Average client sees 4.2x ROI in 90 days. If it does not pay for itself in 60 days, we work free until it does.',
        bn: 'স্টার্টার ৳২৫,০০০/মাস — একজন সেলসপার্সনের বেতনের চেয়ে কম। এটি ৫ জন নিয়োগের কাজ প্রতিস্থাপন করে (৳১.৬লক্ষ/মাস ভ্যালু)। গড় ক্লায়েন্ট ৯০ দিনে ৪.২x ROI দেখে। ৬০ দিনে নিজের খরচ তুলতে না পারলে, আমরা ততক্ষণ ফ্রি কাজ করি।',
      },
    },
    {
      objection: { en: 'My team will not use it', bn: 'আমার টিম ব্যবহার করবে না' },
      answer: {
        en: 'This is the #1 CRM failure reason. We design for adoption: mobile-first, voice logging, AI assistance, 1-click actions. We measure adoption weekly and work with you on resistance. Our average adoption is 85%+ vs 12% industry average.',
        bn: 'এটি CRM ব্যর্থতার #১ কারণ। আমরা অ্যাডপশনের জন্য ডিজাইন করি: মোবাইল-ফার্স্ট, ভয়েস লগিং, AI অ্যাসিস্ট্যান্স, ১-ক্লিক অ্যাকশন। আমরা সাপ্তাহিক অ্যাডপশন মাপি এবং রেজিস্ট্যান্সে আপনার সাথে কাজ করি। আমাদের গড় অ্যাডপশন ৮৫%+ বনাম ইন্ডাস্ট্রি গড় ১২%।',
      },
    },
    {
      objection: { en: 'I do not have time to implement this', bn: 'আমার এটি ইমপ্লিমেন্ট করার সময় নেই' },
      answer: {
        en: 'That is exactly why we exist. We do 95% of the work. You spend 2–3 hours total across the implementation (audit call, a few reviews, team training). We handle setup, build, integrations, migration, training. You get a working system, not more work.',
        bn: 'এটাই আমরা কেন আছি তার কারণ। আমরা ৯৫% কাজ করি। আপনি ইমপ্লিমেন্টেশন জুড়ে মোট ২-৩ ঘন্টা কাটান (অডিট কল, কয়েকটি রিভিউ, টিম ট্রেনিং)। আমরা সেটআপ, বিল্ড, ইন্টিগ্রেশন, মাইগ্রেশন, ট্রেনিং সামলাই। আপনি ওয়ার্কিং সিস্টেম পান, বেশি কাজ নয়।',
      },
    },
    {
      objection: { en: 'I already tried CRM and it failed', bn: 'আমি ইতিমধ্যে CRM চেষ্টা করেছি এবং ব্যর্থ হয়েছে' },
      answer: {
        en: 'Most CRM implementations fail because the software was installed, not configured — no workflows, no automation, no AI, no training. We deliver the opposite: fully-configured, fully-automated, fully-trained. Plus 60-day ROI guarantee to de-risk it completely.',
        bn: 'বেশিরভাগ CRM ইমপ্লিমেন্টেশন ব্যর্থ কারণ সফটওয়্যার ইনস্টল হয়েছিল, কনফিগার হয়নি — কোনো ওয়ার্কফ্লো, অটোমেশন, AI, ট্রেনিং নেই। আমরা উল্টো ডেলিভারি করি: সম্পূর্ণ-কনফিগার্ড, সম্পূর্ণ-অটোমেটেড, সম্পূর্ণ-ট্রেইন্ড। প্লাস ৬০-দিন ROI গ্যারান্টি সম্পূর্ণ ডি-রিস্ক করতে।',
      },
    },
    {
      objection: { en: 'AI is too complicated for my team', bn: 'AI আমার টিমের জন্য অনেক জটিল' },
      answer: {
        en: 'Your team does not need to understand AI. They just use the CRM. The AI works in the background — scoring leads, writing emails, summarising calls. We train your team on the outputs, not the technology. If they can use WhatsApp, they can use this.',
        bn: 'আপনার টিমকে AI বুঝতে হবে না। তারা শুধু CRM ব্যবহার করে। AI ব্যাকগ্রাউন্ডে কাজ করে — লিড স্কোরিং, ইমেইল লেখা, কল সামারি। আমরা আপনার টিমকে আউটপুটে ট্রেন করি, টেকনোলজিতে নয়। তারা WhatsApp ব্যবহার করতে পারলে, এটাও পারবে।',
      },
    },
    {
      objection: { en: 'My business is unique, templates will not work', bn: 'আমার ব্যবসা ইউনিক, টেমপ্লেট কাজ করবে না' },
      answer: {
        en: 'Templates are our starting point, not the end. We start with an industry template, then customise every workflow, field, automation, dashboard to your specific process. 60-day audit covers your uniqueness. No two of our 50+ clients have identical setups.',
        bn: 'টেমপ্লেট আমাদের স্টার্টিং পয়েন্ট, শেষ নয়। আমরা ইন্ডাস্ট্রি টেমপ্লেট দিয়ে শুরু, তারপর প্রতিটি ওয়ার্কফ্লো, ফিল্ড, অটোমেশন, ড্যাশবোর্ড আপনার নির্দিষ্ট প্রসেসে কাস্টমাইজ করি। ৬০-দিন অডিট আপনার ইউনিকনেস কভার করে। আমাদের ৫০+ ক্লায়েন্টের দুটি সেটআপ আইডেন্টিক্যাল নয়।',
      },
    },
    {
      objection: { en: 'I am not technical enough', bn: 'আমি যথেষ্ট টেকনিক্যাল নই' },
      answer: {
        en: 'You do not need to be. We handle all technical work — setup, configuration, automation, integrations, AI training, API connections. Your team uses a simple interface. We provide training, documentation, video library, and ongoing support.',
        bn: 'আপনাকে হতে হবে না। আমরা সব টেকনিক্যাল কাজ সামলাই — সেটআপ, কনফিগারেশন, অটোমেশন, ইন্টিগ্রেশন, AI ট্রেনিং, API কানেকশন। আপনার টিম সহজ ইন্টারফেস ব্যবহার করে। আমরা ট্রেনিং, ডকুমেন্টেশন, ভিডিও লাইব্রেরি ও চলমান সাপোর্ট দিই।',
      },
    },
    {
      objection: { en: 'What if I want to switch CRMs later?', bn: 'পরে CRM সুইচ করতে চাইলে?' },
      answer: {
        en: 'Your data is always exportable in standard formats (CSV, Excel, JSON). No lock-in. If you want to switch from HubSpot to Salesforce (or vice versa), we handle the migration. The automations we build are documented so any new vendor can replicate.',
        bn: 'আপনার ডেটা সবসময় স্ট্যান্ডার্ড ফরম্যাটে এক্সপোর্টেবল (CSV, Excel, JSON)। কোনো লক-ইন নেই। HubSpot থেকে Salesforce-এ সুইচ করতে চাইলে (বা উল্টো), আমরা মাইগ্রেশন সামলাই। আমরা যে অটোমেশন বিল্ড করি তা ডকুমেন্টেড যাতে যেকোনো নতুন ভেন্ডর রেপ্লিকেট করতে পারে।',
      },
    },
    {
      objection: { en: 'I need to think about it', bn: 'আমাকে ভাবতে হবে' },
      answer: {
        en: 'Of course. But every day you wait, you lose 40% of new leads to slow follow-up. The free strategy call is 30 minutes — zero commitment. You will leave with a custom CRM blueprint, BDT cost projection, and ROI estimate. Then decide.',
        bn: 'অবশ্যই। কিন্তু আপনি প্রতিদিন অপেক্ষা করলে, নতুন লিডের ৪০% স্লো ফলো-আপে হারান। ফ্রি স্ট্র্যাটেজি কল ৩০ মিনিট — জিরো কমিটমেন্ট। আপনি কাস্টম CRM ব্লুপ্রিন্ট, BDT খরচ প্রজেকশন ও ROI অনুমান নিয়ে ছাড়বেন। তারপর সিদ্ধান্ত নিন।',
      },
    },
    {
      objection: { en: 'I need to talk to my partner/boss', bn: 'আমার পার্টনার/বসের সাথে কথা বলতে হবে' },
      answer: {
        en: 'Smart. Bring them to the strategy call. We will prepare a 1-page ROI summary tailored to your business that you can forward. We have done this 100+ times — we know what decision-makers need to see.',
        bn: 'স্মার্ট। তাদের স্ট্র্যাটেজি কলে আনুন। আমরা আপনার ব্যবসার জন্য ১-পেজের ROI সারাংশ প্রস্তুত করব যা আপনি ফরওয়ার্ড করতে পারেন। আমরা এটি ১০০+ বার করেছি — আমরা জানি ডিসিশন-মেকারদের কী দেখতে হবে।',
      },
    },
    {
      objection: { en: 'Is this a scam / too good to be true?', bn: 'এটা কি স্ক্যাম / খুব ভাল যে সত্যি নয়?' },
      answer: {
        en: 'Skepticism is healthy. Here are the facts: 7 years in business, 50+ active clients, ৳100Cr+ revenue influenced, 4.9/5 rating, 94% retention, registered LLC, GST-registered, physical office in Jessore. 60-day money-back guarantee in writing. We have nothing to hide.',
        bn: 'সন্দেহ স্বাস্থ্যকর। ফ্যাক্ট: ৭ বছর ব্যবসায়, ৫০+ সক্রিয় ক্লায়েন্ট, ৳১০০কোটি+ রেভিনিউ ইনফ্লুয়েন্সড, ৪.৯/৫ রেটিং, ৯৪% রিটেনশন, রেজিস্টার্ড LLC, GST-রেজিস্টার্ড, যশোরে ফিজিক্যাল অফিস। লিখিত ৬০-দিন মানি-ব্যাক গ্যারান্টি। আমাদের লুকানোর কিছু নেই।',
      },
    },
    {
      objection: { en: 'I am too busy right now', bn: 'আমি এখন অনেক ব্যস্ত' },
      answer: {
        en: 'The busier you are, the more you need automation. Implementation takes 2–3 hours of your time total (across 2 weeks). We do everything else. The ROI starts in week 2. "Too busy" is exactly the problem we solve.',
        bn: 'যত বেশি ব্যস্ত, তত বেশি অটোমেশন দরকার। ইমপ্লিমেন্টেশনে আপনার সময় লাগে মোট ২-৩ ঘন্টা (২ সপ্তাহে)। বাকিটা আমরা করি। ROI সপ্তাহ ২-এ শুরু। "অনেক ব্যস্ত" — এটাই সমস্যা আমরা সমাধান করি।',
      },
    },
    {
      objection: { en: 'Will this work for my industry?', bn: 'এটা কি আমার ইন্ডাস্ট্রির জন্য কাজ করবে?' },
      answer: {
        en: 'We have 12 industry templates: healthcare, education, manufacturing, real estate, agencies, export, government, NGO, finance, SaaS, logistics, construction. If yours is not on the list, book a call — if we cannot help, we will tell you in 10 minutes.',
        bn: 'আমাদের ১২টি ইন্ডাস্ট্রি টেমপ্লেট: হেলথকেয়ার, শিক্ষা, উৎপাদন, রিয়েল এস্টেট, এজেন্সি, রপ্তানি, সরকার, NGO, ফিন্যান্স, SaaS, লজিস্টিকস, কনস্ট্রাকশন। আপনারটি লিস্টে না থাকলে, কল বুক করুন — সাহায্য করতে না পারলে, ১০ মিনিটে বলব।',
      },
    },
    {
      objection: { en: 'I do not trust AI with my customer data', bn: 'আমি AI-কে আমার গ্রাহক ডেটা দিয়ে বিশ্বাস করি না' },
      answer: {
        en: 'Your data is encrypted (AES-256), stored in SOC2-compliant infrastructure, access-controlled, audit-logged. AI processes data but does not train on your data (no data leakage). GDPR-compliant. You own your data, exportable anytime. Full security documentation provided.',
        bn: 'আপনার ডেটা এনক্রিপ্টেড (AES-256), SOC2-কমপ্লায়েন্ট ইনফ্রাস্ট্রাকচারে স্টোর্ড, অ্যাক্সেস-কন্ট্রোল্ড, অডিট-লগড। AI ডেটা প্রসেস করে কিন্তু আপনার ডেটায় ট্রেন করে না (কোনো ডেটা লিকেজ নেই)। GDPR-কমপ্লায়েন্ট। আপনার ডেটা আপনার, যেকোনো সময় এক্সপোর্টেবল। ফুল সিকিউরিটি ডকুমেন্টেশন দেওয়া হয়।',
      },
    },
    {
      objection: { en: 'What if NextGen shuts down?', bn: 'NextGen যদি বন্ধ হয়ে যায়?' },
      answer: {
        en: 'We are 7 years in business, profitable, growing. But even if we did — your CRM lives in your account (HubSpot, GoHighLevel, etc.), not ours. All automations are documented. All integrations use standard APIs. You are never locked into us.',
        bn: 'আমরা ৭ বছর ব্যবসায়, লাভজনক, বর্ধমান। কিন্তু আমরা বন্ধ হলেও — আপনার CRM আপনার অ্যাকাউন্টে থাকে (HubSpot, GoHighLevel ইত্যাদি), আমাদের নয়। সব অটোমেশন ডকুমেন্টেড। সব ইন্টিগ্রেশন স্ট্যান্ডার্ড API ব্যবহার করে। আপনি কখনো আমাদের সাথে লক-ইন নন।',
      },
    },
  ],
}

/* ========================================================================== */
/*  31. TESTIMONIALS                                                           */
/* ========================================================================== */

export const TESTIMONIALS = {
  eyebrow: { en: 'What clients say', bn: 'ক্লায়েন্ট কী বলেন' } as Bilingual,
  title: {
    en: '10 testimonials from real business owners',
    bn: '১০টি বাস্তব ব্যবসার মালিকদের টেস্টিমোনিয়াল',
  } as Bilingual,
  subtitle: {
    en: 'Different industries, different sizes, different goals. Same outcome: more revenue, less stress.',
    bn: 'ভিন্ন ইন্ডাস্ট্রি, ভিন্ন সাইজ, ভিন্ন লক্ষ্য। একই ফলাফল: বেশি রেভিনিউ, কম স্ট্রেস।',
  } as Bilingual,
  items: [
    {
      quote: {
        en: 'We went from missing 30+ inquiries a day to answering every single one in under 3 seconds. Sales jumped 60% in the first month. This system paid for itself in 18 days.',
        bn: 'আমরা প্রতিদিন ৩০+ ইনকোয়ারি মিস করতাম, এখন প্রতিটির উত্তর ৩ সেকেন্ডে দিই। প্রথম মাসেই বিক্রি ৬০% বেড়েছে। এই সিস্টেম ১৮ দিনে নিজের খরচ তুলেছে।',
      },
      author: { en: 'Rahim Ahmed', bn: 'রহিম আহমেদ' },
      role: { en: 'Founder, Dhaka Electronics', bn: 'প্রতিষ্ঠাতা, ঢাকা ইলেকট্রনিক্স' },
      industry: { en: 'Retail', bn: 'রিটেইল' },
    },
    {
      quote: {
        en: 'The AI chatbot handles 85% of patient queries. Our front desk is free for in-clinic patients. Appointments are up 150% — and we never miss a booking anymore.',
        bn: 'AI চ্যাটবট ৮৫% রোগীর প্রশ্ন সামলায়। আমাদের ফ্রন্ট ডেস্ক ক্লিনিকের রোগীদের জন্য ফ্রি। অ্যাপয়েন্টমেন্ট ১৫০% বেড়েছে — এবং আর কোনো বুকিং মিস হয় না।',
      },
      author: { en: 'Dr. Sarah Khan', bn: 'ডা. সারা খান' },
      role: { en: 'Director, LifeCare Clinic', bn: 'পরিচালক, লাইফকেয়ার ক্লিনিক' },
      industry: { en: 'Healthcare', bn: 'হেলথকেয়ার' },
    },
    {
      quote: {
        en: 'Abandoned cart recovery alone added ৳18 lakh per month in revenue. The ROI calculator on this page actually understated what we achieved. 11x ROAS.',
        bn: 'শুধু অ্যাব্যান্ডনড কার্ট রিকভারিতে মাসে ৳১৮ লাখ রেভিনিউ যোগ হয়েছে। এই পেজের ROI ক্যালকুলেটর আসলে আমরা যা অর্জন করেছি তার চেয়ে কম দেখায়। ১১x ROAS।',
      },
      author: { en: 'Tanvir Hasan', bn: 'তানভীর হাসান' },
      role: { en: 'CEO, FashionHub BD', bn: 'সিইও, ফ্যাশনহাব বিডি' },
      industry: { en: 'E-commerce', bn: 'ই-কমার্স' },
    },
    {
      quote: {
        en: 'As a real estate developer, speed-to-lead is everything. NextGen routes hot leads to my sales team in under 60 seconds. Site visits up 220%, close rate up 45%.',
        bn: 'রিয়েল এস্টেট ডেভেলপার হিসেবে স্পিড-টু-লিড সবকিছু। NextGen হট লিড ৬০ সেকেন্ডে আমার সেলস টিমে পাঠায়। সাইট ভিজিট ২২০%, ক্লোজ রেট ৪৫% বেড়েছে।',
      },
      author: { en: 'Kamrul Islam', bn: 'কামরুল ইসলাম' },
      role: { en: 'MD, Skyline Properties', bn: 'এমডি, স্কাইলাইন প্রপার্টিজ' },
      industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
    },
    {
      quote: {
        en: 'We tried 3 other CRM tools before NextGen. None came close. The GPT-4 bot actually understands Banglish. Our customers love it.',
        bn: 'NextGen-এর আগে আমরা ৩টি CRM টুল চেষ্টা করেছি। কেউই কাছেও পৌঁছায়নি। GPT-4 বট আসলেই Banglish বোঝে। আমাদের গ্রাহকরা ভালোবাসে।',
      },
      author: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' },
      role: { en: 'Marketing Head, EduPlus', bn: 'মার্কেটিং হেড, এডুপ্লাস' },
      industry: { en: 'Education', bn: 'শিক্ষা' },
    },
    {
      quote: {
        en: 'The team inbox changed how we work. 8 agents share one number, no chaos, full visibility. Support response time dropped from hours to minutes.',
        bn: 'টিম ইনবক্স আমাদের কাজের ধরন বদলে দিয়েছে। ৮ এজেন্ট এক নম্বর শেয়ার করে, কোনো বিশৃঙ্খলা নেই, পূর্ণ ভিজিবিলিটি। সাপোর্ট রেসপন্স টাইম ঘন্টা থেকে মিনিটে নেমেছে।',
      },
      author: { en: 'Faisal Rahman', bn: 'ফয়সাল রহমান' },
      role: { en: 'Operations Lead, QuickShip', bn: 'অপারেশনস লিড, কুইকশিপ' },
      industry: { en: 'Logistics', bn: 'লজিস্টিকস' },
    },
    {
      quote: {
        en: 'Auto-quotation changed our business. We respond to inquiries in 3 minutes instead of 3 days. Competitors cannot keep up. Our dealers love the portal.',
        bn: 'অটো-কোটেশন আমাদের ব্যবসা বদলে দিয়েছে। ইনকোয়ারির উত্তর ৩ দিনের বদলে ৩ মিনিটে দিই। প্রতিযোগীরা পাল্লা দিতে পারে না। আমাদের ডিলাররা পোর্টাল ভালোবাসে।',
      },
      author: { en: 'Imran Kabir', bn: 'ইমরান কবির' },
      role: { en: 'CMO, TechBazaar', bn: 'সিএমও, টেকবাজার' },
      industry: { en: 'Manufacturing', bn: 'উৎপাদন' },
    },
    {
      quote: {
        en: 'I sleep better now. Every lead is followed up. Every customer is contacted. Every deal is moving. The CRM does the work I used to worry about at 2 AM.',
        bn: 'এখন ভালো ঘুমাই। প্রতিটি লিড ফলো-আপ হয়। প্রতিটি গ্রাহক কন্টাক্ট হয়। প্রতিটি ডিল এগোয়। CRM সেই কাজ করে যা নিয়ে আমি রাত ২টায় চিন্তা করতাম।',
      },
      author: { en: 'Anika Tabassum', bn: 'আনিকা তাবাসসুম' },
      role: { en: 'Founder, GlowBeauty BD', bn: 'প্রতিষ্ঠাতা, গ্লোবিউটি বিডি' },
      industry: { en: 'Beauty', bn: 'বিউটি' },
    },
    {
      quote: {
        en: 'The ROI was understated, not overstated. We saw 11x in 8 months. The team is responsive, the system is bulletproof, and the dashboards finally give me the visibility I always wanted.',
        bn: 'ROI কম বলা হয়েছিল, বেশি নয়। আমরা ৮ মাসে ১১x দেখেছি। টিম রেসপন্সিভ, সিস্টেম বুলেটপ্রুফ, এবং ড্যাশবোর্ড আমার সবসময়ের চাওয়া ভিজিবিলিটি দেয়।',
      },
      author: { en: 'Mizanur Rahman', bn: 'মিজানুর রহমান' },
      role: { en: 'MD, Spice Garden', bn: 'এমডি, স্পাইস গার্ডেন' },
      industry: { en: 'F&B', bn: 'এফঅ্যান্ডবি' },
    },
    {
      quote: {
        en: 'We migrated from Wati to NextGen. The migration took 4 days, zero downtime. The AI is 10x smarter, the dashboard is cleaner, and the support team actually responds in minutes, not days.',
        bn: 'আমরা Wati থেকে NextGen-এ মাইগ্রেট করেছি। মাইগ্রেশন ৪ দিনে, জিরো ডাউনটাইম। AI ১০x স্মার্ট, ড্যাশবোর্ড ক্লিনার, এবং সাপোর্ট টিম আসলেই মিনিটে সাড়া দেয়, দিনে নয়।',
      },
      author: { en: 'Sumaiya Akter', bn: 'সুমাইয়া আক্তার' },
      role: { en: 'Head of Digital, PharmaPlus', bn: 'হেড অফ ডিজিটাল, ফার্মাপ্লাস' },
      industry: { en: 'Pharma', bn: 'ফার্মা' },
    },
  ],
}

/* ========================================================================== */
/*  32. TRUST                                                                  */
/* ========================================================================== */

export const TRUST = {
  eyebrow: { en: 'Trusted by businesses across Bangladesh', bn: 'বাংলাদেশের ব্যবসাসমূহের আস্থা' } as Bilingual,
  title: {
    en: '50+ businesses trust NextGen with their CRM',
    bn: '৫০+ ব্যবসা NextGen-কে তাদের CRM-এ বিশ্বাস করে',
  } as Bilingual,
  subtitle: {
    en: 'From ৳1Cr startups to ৳500Cr enterprises — across 12 industries.',
    bn: '৳১কোটি স্টার্টআপ থেকে ৳৫০০কোটি এন্টারপ্রাইজ — ১২টি ইন্ডাস্ট্রিতে।',
  } as Bilingual,
  stats: [
    { value: '50+', label: { en: 'Businesses served', bn: 'সেবা প্রাপ্ত ব্যবসা' } },
    { value: '12', label: { en: 'Industries', bn: 'ইন্ডাস্ট্রি' } },
    { value: '2,000+', label: { en: 'Automations built', bn: 'অটোমেশন তৈরি' } },
    { value: '4.9/5', label: { en: 'Average rating', bn: 'গড় রেটিং' } },
    { value: '৳100Cr+', label: { en: 'Revenue influenced', bn: 'রেভিনিউ ইনফ্লুয়েন্সড' } },
    { value: '94%', label: { en: 'Client retention', bn: 'ক্লায়েন্ট রিটেনশন' } },
  ],
  partners: [
    { en: 'HubSpot Solutions Partner', bn: 'HubSpot সলিউশনস পার্টনার' },
    { en: 'GoHighLevel Partner', bn: 'GoHighLevel পার্টনার' },
    { en: 'Meta Business Partner', bn: 'মেটা বিজনেস পার্টনার' },
    { en: 'OpenAI', bn: 'OpenAI' },
    { en: 'Cloudflare', bn: 'Cloudflare' },
    { en: 'Google Cloud', bn: 'গুগল ক্লাউড' },
    { en: 'Zapier Partner', bn: 'Zapier পার্টনার' },
    { en: 'WhatsApp Business', bn: 'WhatsApp Business' },
  ],
}

/* ========================================================================== */
/*  33. SECURITY                                                               */
/* ========================================================================== */

export const SECURITY = {
  eyebrow: { en: 'Enterprise-grade security', bn: 'এন্টারপ্রাইজ-গ্রেড সিকিউরিটি' } as Bilingual,
  title: {
    en: 'Your data is protected like a bank vault',
    bn: 'আপনার ডেটা ব্যাংক ভল্টের মতো সুরক্ষিত',
  } as Bilingual,
  subtitle: {
    en: 'Every layer — from network to database — is hardened, audited and compliant with international standards.',
    bn: 'প্রতিটি স্তর — নেটওয়ার্ক থেকে ডেটাবেস — হার্ডেন্ড, অডিটেড এবং আন্তর্জাতিক মানদণ্ডে কমপ্লায়েন্ট।',
  } as Bilingual,
  cards: [
    {
      icon: 'lock',
      title: { en: 'End-to-End Encryption', bn: 'এন্ড-টু-এন্ড এনক্রিপশন' },
      desc: { en: 'AES-256 encryption at rest, TLS 1.3 in transit. Your data is unreadable to anyone except you.', bn: 'রেস্টে AES-256 এনক্রিপশন, ট্রানজিটে TLS 1.3। আপনার ডেটা আপনা ছাড়া কারও পক্ষে অপঠনযোগ্য।' },
    },
    {
      icon: 'shield-check',
      title: { en: 'SOC2 + ISO 27001', bn: 'SOC2 + ISO 27001' },
      desc: { en: 'Enterprise compliance frameworks. Audited annually. Full compliance documentation available.', bn: 'এন্টারপ্রাইজ কমপ্লায়েন্স ফ্রেমওয়ার্ক। বার্ষিক অডিটেড। ফুল কমপ্লায়েন্স ডকুমেন্টেশন উপলব্ধ।' },
    },
    {
      icon: 'file-text',
      title: { en: 'GDPR + CCPA Compliant', bn: 'GDPR + CCPA কমপ্লায়েন্ট' },
      desc: { en: 'International privacy standards. Right to be forgotten, data export, consent management built in.', bn: 'আন্তর্জাতিক প্রাইভেসি মানদণ্ড। ভুলে যাওয়ার অধিকার, ডেটা এক্সপোর্ট, কনসেন্ট ম্যানেজমেন্ট বিল্ট-ইন।' },
    },
    {
      icon: 'user-lock',
      title: { en: 'Role-Based Access Control', bn: 'রোল-বেসড অ্যাক্সেস কন্ট্রোল' },
      desc: { en: 'Granular permissions. Sales rep sees only their leads. Manager sees team. CEO sees everything.', bn: 'গ্রানুলার পারমিশন। সেলস রেপ শুধু তার লিড দেখে। ম্যানেজার টিম দেখে। CEO সব দেখে।' },
    },
    {
      icon: 'cloud',
      title: { en: 'Cloudflare + AWS', bn: 'Cloudflare + AWS' },
      desc: { en: 'Enterprise infrastructure. DDoS protection, 99.9% uptime SLA, multi-region failover.', bn: 'এন্টারপ্রাইজ ইনফ্রাস্ট্রাকচার। DDoS প্রোটেকশন, ৯৯.৯% আপটাইম SLA, মাল্টি-রিজিয়ন ফেইলওভার।' },
    },
    {
      icon: 'database',
      title: { en: 'Automated Daily Backups', bn: 'অটোমেটেড ডেইলি ব্যাকআপ' },
      desc: { en: 'Your data backed up daily, retained 90 days. One-click restore. Your data never disappears.', bn: 'আপনার ডেটা দৈনিক ব্যাকআপ, ৯০ দিন রিটেইন। ওয়ান-ক্লিক রিস্টোর। আপনার ডেটা কখনো হারায় না।' },
    },
    {
      icon: 'file-bar-chart',
      title: { en: 'Audit Logs', bn: 'অডিট লগ' },
      desc: { en: 'Every action logged. Who did what, when, from where. Full transparency for compliance + security.', bn: 'প্রতিটি অ্যাকশন লগড। কে কী করেছে, কখন, কোথা থেকে। কমপ্লায়েন্স + সিকিউরিটির জন্য ফুল ট্রান্সপারেন্সি।' },
    },
    {
      icon: 'key',
      title: { en: 'Two-Factor Authentication', bn: 'টু-ফ্যাক্টর অথেনটিকেশন' },
      desc: { en: '2FA enforced for all admin accounts. SMS, authenticator app, or hardware key supported.', bn: 'সব অ্যাডমিন অ্যাকাউন্টে 2FA এনফোর্সড। SMS, অথেনটিকেটর অ্যাপ, বা হার্ডওয়্যার কী সাপোর্টেড।' },
    },
  ],
}

/* ========================================================================== */
/*  34. FINAL CTA                                                              */
/* ========================================================================== */

export const FINAL_CTA = {
  eyebrow: { en: 'Your next step', bn: 'আপনার পরবর্তী ধাপ' } as Bilingual,
  title: {
    en: 'Turn your CRM into an AI-powered revenue engine',
    bn: 'আপনার CRM-কে AI-চালিত রেভিনিউ ইঞ্জিনে পরিণত করুন',
  } as Bilingual,
  subtitle: {
    en: 'In a free 30-minute strategy call, we will audit your current CRM, identify the 3 biggest revenue leaks, and design a custom automation blueprint with BDT cost + ROI projection. No sales pressure. No commitment.',
    bn: 'ফ্রি ৩০-মিনিট স্ট্র্যাটেজি কলে, আমরা আপনার বর্তমান CRM অডিট করব, ৩টি বড় রেভিনিউ লিক চিহ্নিত করব, এবং BDT খরচ + ROI প্রজেকশন সহ কাস্টম অটোমেশন ব্লুপ্রিন্ট ডিজাইন করব। কোনো সেলস প্রেসার নেই। কোনো কমিটমেন্ট নেই।',
  } as Bilingual,
  primaryCta: {
    en: 'Book Free Strategy Call',
    bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
  secondaryCta: {
    en: 'Chat on WhatsApp',
    bn: 'WhatsApp-এ চ্যাট করুন',
  } as Bilingual,
  tertiaryCta: {
    en: 'Send Email',
    bn: 'ইমেইল পাঠান',
  } as Bilingual,
  trustRow: [
    { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '4.9/5 satisfaction', bn: '৪.৯/৫ সন্তুষ্টি' },
    { en: '50+ active clients', bn: '৫০+ সক্রিয় ক্লায়েন্ট' },
    { en: '3–5 day setup', bn: '৩–৫ দিনে সেটআপ' },
  ] as Bilingual[],
  transformation: {
    before: { en: 'Today: leads lost, follow-ups missed, revenue unpredictable, you stressed.', bn: 'আজ: লিড হারায়, ফলো-আপ মিস, রেভিনিউ অনুমেয় নয়, আপনি স্ট্রেসে।' } as Bilingual,
    arrow: { en: 'in 30 days', bn: '৩০ দিনে' } as Bilingual,
    after: { en: 'Every lead captured, every follow-up automated, revenue predictable, you sleeping well.', bn: 'প্রতিটি লিড ক্যাপচার, প্রতিটি ফলো-আপ অটোমেটেড, রেভিনিউ পূর্বানুমেয়, আপনি ভালো ঘুমাচ্ছেন।' } as Bilingual,
  },
}

/* ========================================================================== */
/*  35. EXIT POPUP                                                             */
/* ========================================================================== */

export const EXIT_POPUP = {
  enabled: true,
  eyebrow: { en: 'Wait — before you go', bn: 'অপেক্ষা — যাওয়ার আগে' } as Bilingual,
  title: {
    en: 'Get a free CRM audit + ROI projection',
    bn: 'ফ্রি CRM অডিট + ROI প্রজেকশন পান',
  } as Bilingual,
  subtitle: {
    en: 'We will analyse your current CRM setup, identify 3 revenue leaks, and project your ROI — completely free. No commitment.',
    bn: 'আমরা আপনার বর্তমান CRM সেটআপ বিশ্লেষণ করব, ৩টি রেভিনিউ লিক চিহ্নিত করব, এবং আপনার ROI প্রজেক্ট করব — সম্পূর্ণ ফ্রি। কোনো কমিটমেন্ট নেই।',
  } as Bilingual,
  cta: {
    en: 'Get my free audit',
    bn: 'আমার ফ্রি অডিট পান',
  } as Bilingual,
  noThanks: {
    en: 'No thanks, I will keep losing leads',
    bn: 'না থ্যাংকস, আমি লিড হারাতে থাকব',
  } as Bilingual,
  // 30s fallback: if no mouseleave triggered, show after 30s
  delayMs: 30000,
}

/* ========================================================================== */
/*  36. STICKY CTA                                                             */
/* ========================================================================== */

export const STICKY_CTA = {
  enabled: true,
  price: { en: 'From ৳25,000/mo', bn: '৳২৫,০০০/মাস থেকে' } as Bilingual,
  sub: { en: '5–10x ROI', bn: '৫–১০x ROI' } as Bilingual,
  cta: {
    en: 'Free Consultation',
    bn: 'ফ্রি কনসালটেশন',
  } as Bilingual,
}

/* ========================================================================== */
/*  37. URGENCY BAND                                                           */
/* ========================================================================== */

export const URGENCY = {
  enabled: true,
  message: {
    en: 'Only 3 strategy call slots left this week. Book before they are gone.',
    bn: 'এই সপ্তাহে মাত্র ৩টি স্ট্র্যাটেজি কল স্লট বাকি। শেষ হওয়ার আগে বুক করুন।',
  } as Bilingual,
  cta: {
    en: 'Book Now',
    bn: 'এখনই বুক করুন',
  } as Bilingual,
}

/* ========================================================================== */
/*  38. VIDEO DEMO                                                             */
/* ========================================================================== */

export const VIDEO_DEMO = {
  eyebrow: { en: 'See it in action', bn: 'নিজের চোখে দেখুন' } as Bilingual,
  title: {
    en: 'Watch: How CRM automation transforms your business in 3 minutes',
    bn: 'দেখুন: ৩ মিনিটে CRM অটোমেশন কীভাবে আপনার ব্যবসা বদলে দেয়',
  } as Bilingual,
  subtitle: {
    en: 'A quick walkthrough of a real CRM automation system we built — from lead capture to closed deal, fully automated. See the dashboard, the workflows, the AI chatbot, and the revenue reports.',
    bn: 'আমরা তৈরি করা একটি বাস্তব CRM অটোমেশন সিস্টেমের সংক্ষিপ্ত ভিডিও — লিড ক্যাপচার থেকে ক্লোজড ডিল পর্যন্ত, সম্পূর্ণ অটোমেটেড। ড্যাশবোর্ড, ওয়ার্কফ্লো, AI চ্যাটবট এবং রেভিনিউ রিপোর্ট দেখুন।',
  } as Bilingual,
  videoLabel: { en: '3-min demo video', bn: '৩-মিনিট ডেমো ভিডিও' } as Bilingual,
  durationLabel: { en: 'Duration', bn: 'সময়কাল' } as Bilingual,
  duration: { en: '3:24', bn: '৩:২৪' } as Bilingual,
  playLabel: { en: 'Play demo', bn: 'ডেমো চালান' } as Bilingual,
  cta: {
    en: 'Get this system for your business',
    bn: 'আপনার ব্যবসার জন্য এই সিস্টেম পান',
  } as Bilingual,
  highlights: [
    { time: '0:15', label: { en: 'Lead capture flow', bn: 'লিড ক্যাপচার ফ্লো' } },
    { time: '0:42', label: { en: 'AI lead scoring', bn: 'AI লিড স্কোরিং' } },
    { time: '1:10', label: { en: 'Auto follow-up sequence', bn: 'অটো ফলো-আপ সিকোয়েন্স' } },
    { time: '1:38', label: { en: 'Pipeline automation', bn: 'পাইপলাইন অটোমেশন' } },
    { time: '2:05', label: { en: 'AI chatbot demo', bn: 'AI চ্যাটবট ডেমো' } },
    { time: '2:40', label: { en: 'Revenue dashboard', bn: 'রেভিনিউ ড্যাশবোর্ড' } },
  ],
  stats: [
    { value: '3:24', label: { en: 'Total runtime', bn: 'মোট সময়' } },
    { value: '6', label: { en: 'Live workflows shown', bn: 'লাইভ ওয়ার্কফ্লো দেখানো' } },
    { value: '100%', label: { en: 'Real footage', bn: 'বাস্তব ফুটেজ' } },
  ],
}

/* ========================================================================== */
/*  39. RESOURCE CENTER                                                        */
/* ========================================================================== */

export const RESOURCES = {
  eyebrow: { en: 'Free resources', bn: 'ফ্রি রিসোর্স' } as Bilingual,
  title: {
    en: 'Download free CRM automation resources',
    bn: 'ফ্রি CRM অটোমেশন রিসোর্স ডাউনলোড করুন',
  } as Bilingual,
  subtitle: {
    en: 'No email required for the checklist. Enter your email for the full toolkit (templates, workflows, ROI calculator).',
    bn: 'চেকলিস্টের জন্য কোনো ইমেইল লাগবে না। সম্পূর্ণ টুলকিটের জন্য (টেমপ্লেট, ওয়ার্কফ্লো, ROI ক্যালকুলেটর) ইমেইল দিন।',
  } as Bilingual,
  items: [
    {
      icon: 'clipboard-check',
      title: { en: 'CRM Automation Readiness Checklist', bn: 'CRM অটোমেশন রেডিনেস চেকলিস্ট' } as Bilingual,
      desc: {
        en: '27-point checklist to assess if your business is ready for CRM automation. Identify gaps before you invest.',
        bn: 'আপনার ব্যবসা CRM অটোমেশনের জন্য প্রস্তুত কিনা যাচাই করতে ২৭-পয়েন্ট চেকলিস্ট। ইনভেস্ট করার আগে ঘাটতি চিহ্নিত করুন।',
      } as Bilingual,
      type: { en: 'PDF · 12 pages', bn: 'PDF · ১২ পৃষ্ঠা' } as Bilingual,
      price: { en: 'Free', bn: 'ফ্রি' } as Bilingual,
      href: '/resources/crm-checklist.html',
      featured: true,
    },
    {
      icon: 'file-text',
      title: { en: 'CRM Workflow Template Pack', bn: 'CRM ওয়ার্কফ্লো টেমপ্লেট প্যাক' } as Bilingual,
      desc: {
        en: '12 pre-built workflow templates: lead capture, scoring, follow-up, reactivation, upsell, referral. Import-ready.',
        bn: '১২টি প্রি-বিল্ট ওয়ার্কফ্লো টেমপ্লেট: লিড ক্যাপচার, স্কোরিং, ফলো-আপ, রিঅ্যাক্টিভেশন, আপসেল, রেফারেল। ইম্পোর্ট-রেডি।',
      } as Bilingual,
      type: { en: 'ZIP · 12 templates', bn: 'ZIP · ১২ টেমপ্লেট' } as Bilingual,
      price: { en: 'Email required', bn: 'ইমেইল প্রয়োজন' } as Bilingual,
      href: '#order',
      featured: false,
    },
    {
      icon: 'bar-chart',
      title: { en: 'CRM ROI Calculator (Excel)', bn: 'CRM ROI ক্যালকুলেটর (Excel)' } as Bilingual,
      desc: {
        en: 'Downloadable Excel calculator with 10 variables. Model your ROI before you book a call. Includes 3 scenarios.',
        bn: '১০টি ভেরিয়েবলসহ ডাউনলোডযোগ্য Excel ক্যালকুলেটর। কল বুক করার আগে আপনার ROI মডেল করুন। ৩টি সিনারিও অন্তর্ভুক্ত।',
      } as Bilingual,
      type: { en: 'XLSX · 3 sheets', bn: 'XLSX · ৩ শিট' } as Bilingual,
      price: { en: 'Email required', bn: 'ইমেইল প্রয়োজন' } as Bilingual,
      href: '/resources/lead-gen-calculator.html',
      featured: false,
    },
    {
      icon: 'book-open',
      title: { en: 'AI Sales Playbook eBook', bn: 'AI সেলস প্লেবুক eBook' } as Bilingual,
      desc: {
        en: '48-page eBook: how AI is changing sales, 15 use cases, implementation roadmap, vendor selection guide.',
        bn: '৪৮-পৃষ্ঠা eBook: AI কীভাবে সেলস বদলাচ্ছে, ১৫টি ইউজ কেস, ইমপ্লিমেন্টেশন রোডম্যাপ, ভেন্ডর সিলেকশন গাইড।',
      } as Bilingual,
      type: { en: 'PDF · 48 pages', bn: 'PDF · ৪৮ পৃষ্ঠা' } as Bilingual,
      price: { en: 'Email required', bn: 'ইমেইল প্রয়োজন' } as Bilingual,
      href: '/resources/ai-readiness-ebook.html',
      featured: false,
    },
  ] as {
    icon: string
    title: Bilingual
    desc: Bilingual
    type: Bilingual
    price: Bilingual
    href: string
    featured: boolean
  }[],
  cta: {
    en: 'Book a free strategy call instead',
    bn: 'এর পরিবর্তে ফ্রি স্ট্র্যাটেজি কল বুক করুন',
  } as Bilingual,
}

/* ========================================================================== */
/*  40. SECTION ORDER                                                          */
/* ========================================================================== */

export const SECTION_ORDER = [
  'hero',
  'metrics',
  'video-demo',
  'problem',
  'emotional-cost',
  'why-traditional',
  'why-nextgen',
  'how-it-works',
  'framework',
  'features',
  'use-cases',
  'ai-automation',
  'integrations',
  'comparison',
  'before-after',
  'benefits',
  'outcomes',
  'industries',
  'case-studies',
  'metrics-kpi',
  'statistics',
  'deliverables',
  'pricing',
  'guarantees',
  'timeline',
  'process',
  'team',
  'roi-calculator',
  'crm-maturity',
  'faq',
  'objections',
  'testimonials',
  'trust',
  'security',
  'resources',
  'final-cta',
  'lead-form',
] as const
