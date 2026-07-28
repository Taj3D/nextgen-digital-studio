/**
 * lead-generation-data.ts
 * -----------------------------------------------------------------------------
 * Bilingual (EN/BN) content + types for the enterprise /services/lead-generation
 * landing page.
 *
 * This is a DEDICATED data file — it does NOT affect the other 11 service pages
 * which still use the generic LandingClient template.
 *
 * Content modelled on the uploaded enterprise HTML reference + the 30-point
 * CRO master prompt (Hormozi, StoryBrand, Brian Tracy, Cialdini, etc.).
 * Currency adapted from ₹ (INR) → ৳ (BDT). Context adapted to Bangladesh.
 * -----------------------------------------------------------------------------
 */

export type Bilingual = { en: string; bn: string }

export type WhoForCard = {
  icon: string
  title: Bilingual
  desc: Bilingual
}

export type ProblemItem = {
  text: Bilingual
  icon?: string
}

export type Stat = {
  value: Bilingual
  label: Bilingual
}

export type DreamCard = {
  icon: string
  title: Bilingual
  desc: Bilingual
}

export type HormoziQuadrant = {
  icon: string
  quadrant: Bilingual // e.g. "Increase Dream Outcome"
  title: Bilingual
  desc: Bilingual
  action: Bilingual
}

export type StoryBrandStep = {
  step: number
  label: Bilingual // "Empathy" / "Authority" / "Plan" ...
  title: Bilingual
  desc: Bilingual
}

export type OfferItem = {
  icon: string
  badge?: Bilingual // "BONUS 1" / "FAST ACTION" etc.
  title: Bilingual
  value: Bilingual // perceived value
  desc: Bilingual
}

export type Guarantee = {
  icon: string
  title: Bilingual
  desc: Bilingual
}

export type Objection = {
  q: Bilingual
  a: Bilingual
}

export type Testimonial = {
  quote: Bilingual
  name: string
  role: Bilingual
  metric: Bilingual
  industry: Bilingual
  rating: number
}

export type CaseStudy = {
  industry: Bilingual
  icon: string
  problem: Bilingual
  solution: Bilingual
  implementation: Bilingual
  result: Bilingual
  roi: Bilingual
}

export type PricingTier = {
  name: Bilingual
  price: Bilingual
  period: Bilingual
  tagline: Bilingual
  features: Bilingual[]
  cta: Bilingual
  highlighted?: boolean
  badge?: Bilingual
}

export type TrustItem = {
  icon: string
  title: Bilingual
  desc: Bilingual
}

export type TechItem = {
  icon: string
  name: Bilingual
  desc: Bilingual
}

export type TimelineStep = {
  phase: Bilingual
  title: Bilingual
  items: Bilingual[]
}

export type ComparisonRow = {
  feature: Bilingual
  traditional: Bilingual
  freelancer: Bilingual
  inhouse: Bilingual
  diy: Bilingual
  nextgen: Bilingual
}

export type FaqGroup = {
  category: Bilingual
  icon: string
  items: Objection[]
}

export type QualifyItem = {
  text: Bilingual
}

export type SlaCard = {
  icon: string
  title: Bilingual
  desc: Bilingual
  items?: Bilingual[]
}

/* ========================================================================== */
/*  CONSTANTS                                                                  */
/* ========================================================================== */

export const LEAD_GEN_META = {
  slug: 'lead-generation',
  pricePerMonthFrom: 35000, // BDT
  priceDisplay: { en: '৳35,000/mo', bn: '৳৩৫,০০০/মাস' },
  roiMultiplier: '5-10x',
  leadRange: { en: '50–200 qualified leads / month', bn: 'প্রতি মাসে ৫০–২০০ যোগ্য লিড' },
  setupDays: 7,
  guaranteeDays: 60,
  satisfaction: '4.9/5',
  activeClients: '120+',
  countries: '15',
} as const

export const HERO = {
  badge: { en: 'Limited Offer', bn: 'লিমিটেড অফার' },
  titleA: {
    en: 'AI-Powered Lead Generation',
    bn: 'AI-চালিত লিড জেনারেশন',
  },
  titleB: {
    en: 'System — Guaranteed Qualified Leads Every Month',
    bn: 'সিস্টেম — প্রতি মাসে নিশ্চিত যোগ্য লিড',
  },
  subtitle: {
    en: 'Google, Meta, LinkedIn, WhatsApp, SEO, cold outreach and AI automation — working together to fill your pipeline with qualified leads, on autopilot.',
    bn: 'Google, Meta, LinkedIn, WhatsApp, SEO, কোল্ড আউটরিচ ও AI অটোমেশন — একত্রে কাজ করে আপনার পাইপলাইনকে নিশ্চিত লিডে ভরাট করে।',
  },
  promiseBox: {
    big: { en: '50–200 Qualified Leads / Month', bn: 'প্রতি মাসে ৫০–২০০ যোগ্য লিড' },
    small: { en: '5–10x return on investment', bn: 'বিনিয়োগে রিটার্ন ৫–১০x' },
  },
  primaryCta: { en: 'Book a Free Strategy Call', bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' },
  secondaryCta: { en: 'Message on WhatsApp', bn: 'WhatsApp-এ মেসেজ করুন' },
  trustBadges: [
    { en: '100% Guarantee', bn: '১০০% গ্যারান্টি' },
    { en: 'Fast Setup', bn: 'দ্রুত সেটআপ' },
    { en: '24/7 Support', bn: '২৪/৭ সাপোর্ট' },
    { en: '120+ Active Clients', bn: '১২০+ সক্রিয় ক্লায়েন্ট' },
  ] as Bilingual[],
  microBadges: [
    { en: '60-day ROI Guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '4.9/5 Satisfaction', bn: '৪.৯/৫ সন্তুষ্টি' },
    { en: '15 Countries Served', bn: '১৫টি দেশে কাজ' },
  ] as Bilingual[],
}

export const WHO_FOR: WhoForCard[] = [
  {
    icon: 'store',
    title: { en: 'Business Owners', bn: 'ব্যবসায়ী' },
    desc: {
      en: 'You want new customers but lack a structured lead system.',
      bn: 'যারা নতুন গ্রাহক চান, তবে সঠিক সিস্টেম নেই।',
    },
  },
  {
    icon: 'building',
    title: { en: 'Enterprises', bn: 'প্রতিষ্ঠান' },
    desc: {
      en: 'You have a B2B sales team, but the lead pipeline is drying up.',
      bn: 'যাদের B2B সেলস টিম আছে, কিন্তু লিড পাইপলাইন শুকিয়ে যাচ্ছে।',
    },
  },
  {
    icon: 'hospital',
    title: { en: 'Healthcare', bn: 'স্বাস্থ্যসেবা' },
    desc: {
      en: 'You need patients or clients, but organic growth is too slow.',
      bn: 'যাদের রোগী বা ক্লায়েন্ট দরকার, কিন্তু অর্গানিক উপায় ধীর।',
    },
  },
  {
    icon: 'industry',
    title: { en: 'Manufacturing', bn: 'শিল্প ও উৎপাদন' },
    desc: {
      en: 'You want to target B2B buyers at scale.',
      bn: 'যারা B2B ক্রেতাকে টার্গেট করতে চান।',
    },
  },
  {
    icon: 'school',
    title: { en: 'Education', bn: 'শিক্ষা প্রতিষ্ঠান' },
    desc: {
      en: 'You want to enrol more students or trainees.',
      bn: 'যারা শিক্ষার্থী বা প্রশিক্ষণার্থী সংগ্রহ করতে চান।',
    },
  },
  {
    icon: 'laptop',
    title: { en: 'Agencies & Freelancers', bn: 'এজেন্সি ও ফ্রিল্যান্সার' },
    desc: {
      en: 'You want clients, but cannot spend time on outreach.',
      bn: 'যারা ক্লায়েন্ট পেতে চান, কিন্তু আউটরিচে সময় দিতে পারেন না।',
    },
  },
]

export const PROBLEM = {
  badge: { en: 'Warning', bn: 'সতর্কতা' },
  title: {
    en: 'Why Most Businesses Fail at Lead Generation?',
    bn: 'বেশিরভাগ ব্যবসা কেন লিড জেনারেশনে ব্যর্থ হয়?',
  },
  subtitle: {
    en: 'This is not just a "no leads" problem — it is a threat to your business survival.',
    bn: 'এটি শুধু "লিড না পাওয়ার" সমস্যা নয় — এটি আপনার ব্যবসার অস্তিত্বের জন্য হুমকি।',
  },
  pains: [
    {
      text: {
        en: 'No plan — you think posting is enough.',
        bn: 'কোনো পরিকল্পনা নেই — শুধু পোস্ট করলেই হবে ভাবেন।',
      },
    },
    {
      text: {
        en: 'Money leakage — ad spend happens, but conversions are not tracked.',
        bn: 'মানি লিকেজ — বিজ্ঞাপনে টাকা খরচ হয়, কিন্তু কনভার্সন ট্র্যাক করা হয় না।',
      },
    },
    {
      text: {
        en: 'Manual follow-up — leads fall through the cracks, no system.',
        bn: 'ম্যানুয়াল ফলো-আপ — একেকটি লিড ফোলে পরে থাকে, কারণ সিস্টেম নেই।',
      },
    },
    {
      text: {
        en: 'No CRM — lead data is scattered, tracking is impossible.',
        bn: 'নো CRM — লিডের ডেটা ছড়িয়ে থাকে, ট্র্যাকিং সম্ভব নয়।',
      },
    },
    {
      text: {
        en: 'Slow sales team — leads arrive, but no one contacts them fast.',
        bn: 'স্লো সেলস টিম — লিড আসলেও দ্রুত যোগাযোগ করা হয় না।',
      },
    },
    {
      text: {
        en: 'No automation — same work repeated, wasting time and money.',
        bn: 'কোনো অটোমেশন নেই — একই কাজ বারবার করতে হয়, সময় ও অর্থ উভয়ই নষ্ট হয়।',
      },
    },
  ] as ProblemItem[],
  resultLine: {
    en: 'Result: millions of taka in opportunities are lost every year.',
    bn: 'ফলাফল: বছরে কোটি টাকার সুযোগ হারিয়ে যায়।',
  },
  warningLine: {
    en: 'And the worst part — your competitors are moving ahead, you are falling behind.',
    bn: 'এবং সবচেয়ে খারাপ — প্রতিযোগীরা এগিয়ে যাচ্ছে, আপনি পিছিয়ে পড়ছেন।',
  },
  stats: [
    {
      value: { en: '73%', bn: '৭৩%' },
      label: {
        en: 'of businesses prioritise lead gen, but 80% have no structured system.',
        bn: 'ব্যবসা লিড জেনারেশনকে অগ্রাধিকার দেয়, কিন্তু ৮০% এর কোনো কাঠামোবদ্ধ সিস্টেম নেই।',
      },
    },
    {
      value: { en: '৳24L', bn: '৳২৪ লক্ষ' },
      label: {
        en: 'lost annually by an average business due to no lead optimisation.',
        bn: 'একটি মাঝারি ব্যবসা প্রতি বছর লিড জেনারেশন অপটিমাইজেশন না করায় হারায়।',
      },
    },
    {
      value: { en: '৳50K/mo', bn: '৳৫০,০০০/মাস' },
      label: {
        en: 'wasted on ads without tracking — pure burn, zero return.',
        bn: 'ট্র্যাকিং ছাড়া বিজ্ঞাপনে নষ্ট — শুধু পোড়া, কোনো রিটার্ন নেই।',
      },
    },
  ] as Stat[],
}

/* ========================================================================== */
/*  DREAM OUTCOME                                                              */
/* ========================================================================== */

export const DREAM = {
  badge: { en: 'Dream Outcome', bn: 'স্বপ্নের ফলাফল' },
  title: {
    en: 'Imagine Your Business 90 Days From Now',
    bn: '৯০ দিন পর আপনার ব্যবসা যেমন হবে',
  },
  subtitle: {
    en: 'This is what life looks like after your lead engine is built and running.',
    bn: 'আপনার লিড ইঞ্জিন তৈরি ও চালু হওয়ার পর জীবন এমন হবে।',
  },
  cards: [
    {
      icon: 'rocket',
      title: { en: 'Predictable Pipeline', bn: 'নিশ্চিত পাইপলাইন' },
      desc: {
        en: 'Every Monday morning you open your CRM and see 50+ fresh qualified leads waiting.',
        bn: 'প্রতি সোমবার সকালে CRM খুললেই ৫০+ নতুন যোগ্য লিড দেখতে পাবেন।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Time Freedom', bn: 'সময়ের স্বাধীনতা' },
      desc: {
        en: 'No more chasing leads manually. The system works while you sleep, 24/7.',
        bn: 'আর ম্যানুয়ালি লিড ধরতে হবে না। সিস্টেম ঘুমানোর সময়ও কাজ করে, ২৪/৭।',
      },
    },
    {
      icon: 'trending-up',
      title: { en: 'Revenue Growth', bn: 'রেভিনিউ বৃদ্ধি' },
      desc: {
        en: '3–5x revenue increase as your sales team focuses only on closing, not hunting.',
        bn: 'সেলস টিম শুধু ক্লোজিং করে, হান্টিং নয় — রেভিনিউ ৩–৫x বাড়ে।',
      },
    },
    {
      icon: 'globe',
      title: { en: 'Scalable Business', bn: 'স্কেলেবল ব্যবসা' },
      desc: {
        en: 'Turn on more channels, scale spend, and leads scale predictably with you.',
        bn: 'নতুন চ্যানেল চালু করুন, বাজেট বাড়ান — লিড আপনার সাথে স্কেল করবে।',
      },
    },
    {
      icon: 'heart',
      title: { en: 'Stress-Free Growth', bn: 'স্ট্রেস-ফ্রি গ্রোথ' },
      desc: {
        en: 'No more "where will the next customer come from?" anxiety. Ever.',
        bn: 'আর "পরবর্তী কাস্টমার কোথা থেকে আসবে?" চিন্তা নেই। কখনো।',
      },
    },
    {
      icon: 'users',
      title: { en: 'Market Leadership', bn: 'মার্কেট লিডারশিপ' },
      desc: {
        en: 'While competitors fight for scraps, you own your market category.',
        bn: 'প্রতিযোগীরা টুকরো নিয়ে ঝগড়া করে, আপনি মার্কেট দখল করেন।',
      },
    },
  ] as DreamCard[],
}

/* ========================================================================== */
/*  HORMOZI VALUE EQUATION                                                     */
/* ========================================================================== */

export const HORMOZI = {
  badge: { en: 'Hormozi Value Equation', bn: 'হরমুজি ভ্যালু ইকুয়েশন' },
  title: {
    en: 'Why This Offer Is Mathematically Irresistible',
    bn: 'কেন এই অফারটি গাণিতিকভাবে অপ্রতিরোধ্য',
  },
  subtitle: {
    en: 'Value = (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort & Sacrifice). We optimise every variable.',
    bn: 'ভ্যালু = (স্বপ্নের ফলাফল × অর্জনের সম্ভাবনা) ÷ (সময় × পরিশ্রম)। আমরা প্রতিটি ভেরিয়েবল অপটিমাইজ করি।',
  },
  quadrants: [
    {
      icon: 'arrow-up',
      quadrant: { en: '↑ Increase Dream Outcome', bn: '↑ স্বপ্নের ফলাফল বাড়ান' },
      title: { en: 'Bigger, Clearer Outcome', bn: 'বড়, পরিষ্কার ফলাফল' },
      desc: {
        en: 'Not "more leads" — but "50–200 sales-ready leads every month, tracked to revenue."',
        bn: 'শুধু "আরও লিড" নয় — "প্রতি মাসে ৫০–২০০ সেলস-রেডি লিড, রেভিনিউ ট্র্যাক সহ।"',
      },
      action: {
        en: 'We define your exact dream outcome before we start.',
        bn: 'শুরুর আগে আপনার সঠিক স্বপ্নের ফলাফল নির্ধারণ করি।',
      },
    },
    {
      icon: 'shield-check',
      quadrant: { en: '↑ Increase Perceived Likelihood', bn: '↑ অর্জনের সম্ভাবনা বাড়ান' },
      title: { en: 'Proof It Works', bn: 'কাজ করার প্রমাণ' },
      desc: {
        en: '10+ case studies, 120+ active clients, 60-day ROI guarantee — you see it works before you risk anything.',
        bn: '১০+ কেস স্টাডি, ১২০+ সক্রিয় ক্লায়েন্ট, ৬০-দিন ROI গ্যারান্টি — ঝুঁকি নেওয়ার আগেই দেখবেন কাজ করে।',
      },
      action: {
        en: 'Risk-free proof architecture builds certainty.',
        bn: 'রিস্ক-ফ্রি প্রমাণ আর্কিটেকচার নিশ্চিততা তৈরি করে।',
      },
    },
    {
      icon: 'zap',
      quadrant: { en: '↓ Reduce Time Delay', bn: '↓ সময় কমান' },
      title: { en: '7-Day Live System', bn: '৭-দিনে লাইভ সিস্টেম' },
      desc: {
        en: 'Most agencies take 2–3 months. Your first leads flow within 7 days of kickoff.',
        bn: 'বেশিরভাগ এজেন্সি ২–৩ মাস নেয়। আপনার প্রথম লিড ৭ দিনের মধ্যেই আসে।',
      },
      action: {
        en: 'Rapid deployment = faster payback.',
        bn: 'দ্রুত ডিপ্লয়মেন্ট = দ্রুত পেব্যাক।',
      },
    },
    {
      icon: 'hand',
      quadrant: { en: '↓ Reduce Effort & Sacrifice', bn: '↓ পরিশ্রম কমান' },
      title: { en: 'Done-For-You Everything', bn: 'সবকিছু Done-For-You' },
      desc: {
        en: 'No technical team needed. No learning curve. We build, run, optimise — you just close.',
        bn: 'কোনো টেকনিক্যাল টিম লাগে না। কোনো শেখার বক্রতা নেই। আমরা বানাই, চালাই, অপটিমাইজ করি — আপনি শুধু ক্লোজ করুন।',
      },
      action: {
        en: 'Zero sacrifice, zero friction.',
        bn: 'শূন্য ত্যাগ, শূন্য ফ্রিকশন।',
      },
    },
  ] as HormoziQuadrant[],
}

/* ========================================================================== */
/*  STORYBRAND FRAMEWORK                                                       */
/* ========================================================================== */

export const STORYBRAND = {
  badge: { en: 'StoryBrand Framework', bn: 'স্টোরিব্র্যান্ড ফ্রেমওয়ার্ক' },
  title: {
    en: 'You Are the Hero. We Are Your Guide.',
    bn: 'আপনি হিরো। আমরা আপনার গাইড।',
  },
  subtitle: {
    en: 'Every great story has a hero with a problem and a guide with a plan. Here is yours.',
    bn: 'প্রতিটি গল্পে একজন হিরো থাকে সমস্যা নিয়ে, আর একজন গাইড থাকে পরিকল্পনা নিয়ে। এটি আপনার।',
  },
  steps: [
    {
      step: 1,
      label: { en: 'The Hero', bn: 'হিরো' },
      title: { en: 'You Want More Customers', bn: 'আপনি আরও কাস্টমার চান' },
      desc: {
        en: 'You started your business to serve people and grow. But growth has stalled because leads are unpredictable.',
        bn: 'আপনি ব্যবসা শুরু করেছিলেন মানুষের সেবা করতে ও বড় হতে। কিন্তু লিড অনিশ্চিত হওয়ায় গ্রোথ থেমে গেছে।',
      },
    },
    {
      step: 2,
      label: { en: 'The Problem', bn: 'সমস্যা' },
      title: { en: 'Leads Are a Daily Headache', bn: 'লিড একটি দৈনন্দিন মাথাব্যথা' },
      desc: {
        en: 'Some months are good, most are not. You cannot plan hiring, inventory, or expansion when leads are random.',
        bn: 'কিছু মাস ভালো, বেশিরভাগ নয়। লিড র‍্যান্ডম হলে হায়ারিং, ইনভেন্টরি, এক্সপানশন প্ল্যান করা যায় না।',
      },
    },
    {
      step: 3,
      label: { en: 'Empathy', bn: 'সহানুভূতি' },
      title: { en: 'We Understand — We Have Been There', bn: 'আমরা বুঝি — আমরা এখানে ছিলাম' },
      desc: {
        en: 'We built lead engines for 120+ businesses across 15 countries. We know the pain of an empty pipeline.',
        bn: '১৫টি দেশের ১২০+ ব্যবসার জন্য লিড ইঞ্জিন বানিয়েছি। খালি পাইপলাইনের কষ্ট আমরা জানি।',
      },
    },
    {
      step: 4,
      label: { en: 'Authority', bn: 'অথরিটি' },
      title: { en: '120+ Clients Trust Us', bn: '১২০+ ক্লায়েন্ট আমাদের বিশ্বাস করে' },
      desc: {
        en: '4.9/5 satisfaction, 60-day ROI guarantee, and a system refined over 3+ years of real deployment.',
        bn: '৪.৯/৫ সন্তুষ্টি, ৬০-দিন ROI গ্যারান্টি, এবং ৩+ বছরের রিয়েল ডিপ্লয়মেন্টে পরিমার্জিত সিস্টেম।',
      },
    },
    {
      step: 5,
      label: { en: 'The Plan', bn: 'পরিকল্পনা' },
      title: { en: 'A 3-Step Path to Predictable Leads', bn: 'নিশ্চিত লিডে ৩-ধাপের পথ' },
      desc: {
        en: '1) Audit your funnel. 2) Build your multi-channel lead engine. 3) Optimise to ROI. Simple, clear, proven.',
        bn: '১) ফানেল অডিট। ২) মাল্টি-চ্যানেল লিড ইঞ্জিন বানানো। ৩) ROI অপটিমাইজ। সহজ, পরিষ্কার, প্রমাণিত।',
      },
    },
    {
      step: 6,
      label: { en: 'Call to Action', bn: 'কল টু অ্যাকশন' },
      title: { en: 'Book Your Free Strategy Call', bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' },
      desc: {
        en: '30 minutes. No pitch. Just a custom roadmap for your business.',
        bn: '৩০ মিনিট। কোনো পিচ নেই। শুধু আপনার ব্যবসার জন্য কাস্টম রোডম্যাপ।',
      },
    },
    {
      step: 7,
      label: { en: 'Success', bn: 'সফলতা' },
      title: { en: 'Avoid the Empty Pipeline', bn: 'খালি পাইপলাইন এড়ান' },
      desc: {
        en: 'Without a system, 12 months from now you will still be wondering where leads come from. Act now.',
        bn: 'সিস্টেম ছাড়া, ১২ মাস পরও ভাববেন লিড কোথা থেকে আসবে। এখনই অ্যাকশন নিন।',
      },
    },
  ] as StoryBrandStep[],
}

/* ========================================================================== */
/*  OFFER STACK (12 Bonuses)                                                   */
/* ========================================================================== */

export const OFFER_STACK = {
  badge: { en: 'Offer Stack', bn: 'অফার স্ট্যাক' },
  title: {
    en: 'Everything You Get When You Join Today',
    bn: 'আজই যুক্ত হলে যা যা পাবেন',
  },
  subtitle: {
    en: 'A ৳2,50,000+ value bundle — for a fraction of the cost. This is not a service, it is a business growth system.',
    bn: '৳২,৫০,০০০+ মূল্যের প্যাকেজ — এক টুকরো দামে। এটি সেবা নয়, এটি ব্যবসার গ্রোথ সিস্টেম।',
  },
  coreLabel: { en: 'CORE SERVICE', bn: 'মূল সেবা' },
  bonusLabel: { en: 'BONUS', bn: 'বোনাস' },
  items: [
    {
      icon: 'rocket',
      badge: { en: 'CORE', bn: 'মূল' },
      title: { en: 'Multi-Channel Lead Engine', bn: 'মাল্টি-চ্যানেল লিড ইঞ্জিন' },
      value: { en: '৳1,20,000 value', bn: '৳১,২০,০০০ মূল্য' },
      desc: {
        en: 'Google Ads, Meta Ads, LinkedIn outreach, WhatsApp automation, SEO, and AI cold outreach — all wired into one pipeline.',
        bn: 'Google Ads, Meta Ads, LinkedIn আউটরিচ, WhatsApp অটোমেশন, SEO ও AI কোল্ড আউটরিচ — এক পাইপলাইনে।',
      },
    },
    {
      icon: 'database',
      badge: { en: 'BONUS 1', bn: 'বোনাস ১' },
      title: { en: 'CRM Setup & Automation', bn: 'CRM সেটআপ ও অটোমেশন' },
      value: { en: '৳40,000 value', bn: '৳৪০,০০০ মূল্য' },
      desc: {
        en: 'Full CRM build with lead scoring, pipeline stages, and automated follow-up sequences.',
        bn: 'লিড স্কোরিং, পাইপলাইন স্টেজ ও অটোমেটেড ফলো-আপ সিকোয়েন্স সহ সম্পূর্ণ CRM।',
      },
    },
    {
      icon: 'bot',
      badge: { en: 'BONUS 2', bn: 'বোনাস ২' },
      title: { en: 'AI Sales Agent (Chatbot)', bn: 'AI সেলস এজেন্ট (চ্যাটবট)' },
      value: { en: '৳35,000 value', bn: '৳৩৫,০০০ মূল্য' },
      desc: {
        en: '24/7 AI chatbot that qualifies leads, answers FAQs, and books calls on your calendar.',
        bn: '২৪/৭ AI চ্যাটবট যা লিড কোয়ালিফাই করে, FAQ উত্তর দেয়, আর ক্যালেন্ডারে কল বুক করে।',
      },
    },
    {
      icon: 'file-text',
      badge: { en: 'BONUS 3', bn: 'বোনাস ৩' },
      title: { en: 'Landing Page + Copywriting', bn: 'ল্যান্ডিং পেজ + কপিরাইটিং' },
      value: { en: '৳25,000 value', bn: '৳২৫,০০০ মূল্য' },
      desc: {
        en: 'Conversion-optimised landing page with direct-response copy that turns cold traffic into booked calls.',
        bn: 'কনভার্সন-অপটিমাইজড ল্যান্ডিং পেজ ও ডাইরেক্ট-রেসপন্স কপি যা কোল্ড ট্রাফিককে বুকড কলে পরিণত করে।',
      },
    },
    {
      icon: 'bar-chart',
      badge: { en: 'BONUS 4', bn: 'বোনাস ৪' },
      title: { en: 'Live Dashboard & Reporting', bn: 'লাইভ ড্যাশবোর্ড ও রিপোর্টিং' },
      value: { en: '৳20,000 value', bn: '৳২০,০০০ মূল্য' },
      desc: {
        en: 'Real-time dashboard: leads, cost-per-lead, ROI, channel breakdown. Weekly email reports.',
        bn: 'রিয়েল-টাইম ড্যাশবোর্ড: লিড, কস্ট-পার-লিড, ROI, চ্যানেল ব্রেকডাউন। সাপ্তাহিক ইমেইল রিপোর্ট।',
      },
    },
    {
      icon: 'phone',
      badge: { en: 'BONUS 5', bn: 'বোনাস ৫' },
      title: { en: 'Server-Side Tracking (CAPI)', bn: 'সার্ভার-সাইড ট্র্যাকিং (CAPI)' },
      value: { en: '৳15,000 value', bn: '৳১৫,০০০ মূল্য' },
      desc: {
        en: 'GA4 + Meta CAPI + TikTok + Snapchat conversion tracking — accurate even with ad blockers.',
        bn: 'GA4 + Meta CAPI + TikTok + Snapchat কনভার্সন ট্র্যাকিং — অ্যাড ব্লকারেও নির্ভুল।',
      },
    },
    {
      icon: 'zap',
      badge: { en: 'FAST ACTION', bn: 'ফাস্ট অ্যাকশন' },
      title: { en: 'Free Lead Audit (First 48h)', bn: 'ফ্রি লিড অডিট (প্রথম ৪৮ ঘন্টা)' },
      value: { en: '৳10,000 value', bn: '৳১০,০০০ মূল্য' },
      desc: {
        en: 'Sign up within 48 hours and get a complete funnel audit worth ৳10,000 — free.',
        bn: '৪৮ ঘন্টার মধ্যে সাইন-আপ করলে ৳১০,০০০ মূল্যের সম্পূর্ণ ফানেল অডিট — ফ্রি।',
      },
    },
    {
      icon: 'users',
      badge: { en: 'PRIORITY', bn: 'প্রায়োরিটি' },
      title: { en: 'Dedicated Success Manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
      value: { en: '৳18,000 value', bn: '৳১৮,০০০ মূল্য' },
      desc: {
        en: 'Your own point of contact — weekly calls, strategy reviews, and direct WhatsApp access.',
        bn: 'আপনার নিজের যোগাযোগের ব্যক্তি — সাপ্তাহিক কল, স্ট্র্যাটেজি রিভিউ, সরাসরি WhatsApp অ্যাক্সেস।',
      },
    },
    {
      icon: 'book-open',
      badge: { en: 'IMPLEMENTATION', bn: 'ইম্প্লিমেন্টেশন' },
      title: { en: 'SOP Library + Playbooks', bn: 'SOP লাইব্রেরি + প্লেবুক' },
      value: { en: '৳12,000 value', bn: '৳১২,০০০ মূল্য' },
      desc: {
        en: '25+ standard operating procedures, playbooks, and checklists your team can use forever.',
        bn: '২৫+ স্ট্যান্ডার্ড অপারেটিং প্রসিডিউর, প্লেবুক ও চেকলিস্ট — আজীবন ব্যবহারযোগ্য।',
      },
    },
    {
      icon: 'graduation-cap',
      badge: { en: 'TRAINING', bn: 'ট্রেনিং' },
      title: { en: 'Sales Team Training Session', bn: 'সেলস টিম ট্রেনিং সেশন' },
      value: { en: '৳15,000 value', bn: '৳১৫,০০০ মূল্য' },
      desc: {
        en: 'A 2-hour live workshop for your sales team on closing AI-qualified leads effectively.',
        bn: 'AI-কোয়ালিফাইড লিড ক্লোজ করার উপর আপনার সেলস টিমের জন্য ২-ঘন্টার লাইভ ওয়ার্কশপ।',
      },
    },
    {
      icon: 'message-circle',
      badge: { en: 'SUPPORT', bn: 'সাপোর্ট' },
      title: { en: 'Priority Support (2h response)', bn: 'প্রায়োরিটি সাপোর্ট (২ঘ রেসপন্স)' },
      value: { en: '৳8,000 value', bn: '৳৮,০০০ মূল্য' },
      desc: {
        en: 'WhatsApp + email support with 2-hour guaranteed response, 12 hours/day, 6 days/week.',
        bn: 'WhatsApp + ইমেইল সাপোর্ট, ২-ঘন্টা গ্যারান্টিড রেসপন্স, দিনে ১২ ঘন্টা, সপ্তাহে ৬ দিন।',
      },
    },
    {
      icon: 'globe',
      badge: { en: 'COMMUNITY', bn: 'কমিউনিটি' },
      title: { en: 'BD Founders Growth Community', bn: 'BD ফাউন্ডার্স গ্রোথ কমিউনিটি' },
      value: { en: 'Priceless', bn: 'অমূল্য' },
      desc: {
        en: 'Private group of 120+ Bangladeshi founders sharing leads, tactics, and partnerships.',
        bn: '১২০+ বাংলাদেশি ফাউন্ডারের প্রাইভেট গ্রুপ — লিড, ট্যাকটিক ও পার্টনারশিপ শেয়ার।',
      },
    },
  ] as OfferItem[],
  totalValue: { en: '৳2,50,000+ Total Value', bn: '৳২,৫০,০০০+ মোট মূল্য' },
  yourPrice: { en: 'Starting at ৳35,000/month', bn: 'শুরু ৳৩৫,০০০/মাস থেকে' },
}

/* ========================================================================== */
/*  RISK REVERSAL (7 Guarantees)                                               */
/* ========================================================================== */

export const GUARANTEES = {
  badge: { en: 'Risk Reversal', bn: 'রিস্ক রিভার্সাল' },
  title: {
    en: '7 Guarantees — We Take All the Risk',
    bn: '৭টি গ্যারান্টি — সমস্ত ঝুঁকি আমরা নিই',
  },
  subtitle: {
    en: 'We are so confident in our system that we put our money where our mouth is. You are protected 7 ways.',
    bn: 'আমাদের সিস্টেমে এতটাই আত্মবিশ্বাস যে ঝুঁকি আমরা নিই। আপনি ৭ভাবে সুরক্ষিত।',
  },
  items: [
    {
      icon: 'shield',
      title: { en: '60-Day ROI Guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      desc: {
        en: 'If you do not see positive ROI within 60 days, we work for free until you do.',
        bn: '৬০ দিনের মধ্যে পজিটিভ ROI না হলে, না হওয়া পর্যন্ত আমরা ফ্রিতে কাজ করি।',
      },
    },
    {
      icon: 'target',
      title: { en: 'Lead Quality Guarantee', bn: 'লিড কোয়ালিটি গ্যারান্টি' },
      desc: {
        en: 'Every lead is verified and scored. Junk leads do not count — we replace them.',
        bn: 'প্রতিটি লিড ভেরিফাইড ও স্কোরড। জাঙ্ক লিড গণ্য হবে না — আমরা রিপ্লেস করি।',
      },
    },
    {
      icon: 'dollar-sign',
      title: { en: 'Performance Guarantee', bn: 'পারফরম্যান্স গ্যারান্টি' },
      desc: {
        en: 'If we miss the agreed lead target by more than 20%, that month is pro-rated.',
        bn: 'লিড টার্গেট ২০%-এর বেশি মিস হলে, সেই মাসের ফি প্রো-রেটেড হবে।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Response Time Guarantee', bn: 'রেসপন্স টাইম গ্যারান্টি' },
      desc: {
        en: 'We respond to every query within 2 hours (business hours). Missed = free day of service.',
        bn: 'প্রতিটি কোয়েরির রেসপন্স ২ ঘন্টায় (বিজনেস আওয়ার)। মিস হলে = ১ দিন ফ্রি সার্ভিস।',
      },
    },
    {
      icon: 'settings',
      title: { en: 'Implementation Guarantee', bn: 'ইম্প্লিমেন্টেশন গ্যারান্টি' },
      desc: {
        en: 'Your system goes live within 7 days or your first month is 50% off.',
        bn: 'সিস্টেম ৭ দিনে লাইভ হবে, নাহলে প্রথম মাস ৫০% ছাড়।',
      },
    },
    {
      icon: 'headset',
      title: { en: 'Support Guarantee', bn: 'সাপোর্ট গ্যারান্টি' },
      desc: {
        en: 'Dedicated success manager + priority WhatsApp. You are never alone.',
        bn: 'ডেডিকেটেড সাকসেস ম্যানেজার + প্রায়োরিটি WhatsApp। আপনি কখনো একা নন।',
      },
    },
    {
      icon: 'refresh-cw',
      title: { en: 'Money-Back Guarantee', bn: 'মানি-ব্যাক গ্যারান্টি' },
      desc: {
        en: 'First 14 days, no questions asked. If it is not a fit, full refund.',
        bn: 'প্রথম ১৪ দিন, কোনো প্রশ্ন ছাড়াই। মানানসই না হলে ফুল রিফান্ড।',
      },
    },
  ] as Guarantee[],
}

/* ========================================================================== */
/*  OBJECTION HANDLING (15)                                                    */
/* ========================================================================== */

export const OBJECTIONS = {
  badge: { en: 'Objection Handling', bn: 'অবজেকশন হ্যান্ডলিং' },
  title: {
    en: 'Every Doubt You Have — Answered',
    bn: 'আপনার প্রতিটি সন্দেহ — উত্তর দেওয়া হলো',
  },
  subtitle: {
    en: 'We have heard every objection in 3+ years. Here are honest, direct answers.',
    bn: '৩+ বছরে প্রতিটি অবজেকশন শুনেছি। সৎ, সরাসরি উত্তর এখানে।',
  },
  items: [
    {
      q: { en: 'It is too expensive.', bn: 'অনেক দামি।' },
      a: {
        en: 'At ৳35,000/month, you need just 2–3 closed deals to break even. Our average client closes 8–15. The real cost is NOT doing this — you lose ৳24L/year in missed opportunities.',
        bn: '৳৩৫,০০০/মাসে মাত্র ২–৩টি ক্লোজড ডিলে ব্রেক-ইভেন। আমাদের গড় ক্লায়েন্ট ৮–১৫টি ক্লোজ করে। আসল খরচ হলো না করা — বছরে ৳২৪ লক্ষ সুযোগ হারান।',
      },
    },
    {
      q: { en: 'I do not have time.', bn: 'আমার সময় নেই।' },
      a: {
        en: 'That is exactly why you need this. We need only 30 minutes for kickoff, then 30 min/week for review. We do the heavy lifting — you just close.',
        bn: 'ঠিক এই কারণেই এটি দরকার। কিকঅফে মাত্র ৩০ মিনিট, তারপর সপ্তাহে ৩০ মিনিট রিভিউ। ভারী কাজ আমরা করি — আপনি শুধু ক্লোজ করুন।',
      },
    },
    {
      q: { en: 'I already have an agency.', bn: 'আমার ইতিমধ্যে এজেন্সি আছে।' },
      a: {
        en: 'Most agencies do ads only. We do ads + CRM + AI + automation + tracking. Bring us your last 3 months of reports — we will show you exactly where leads are leaking, free.',
        bn: 'বেশিরভাগ এজেন্সি শুধু অ্যাড চালায়। আমরা অ্যাড + CRM + AI + অটোমেশন + ট্র্যাকিং। আপনার গত ৩ মাসের রিপোর্ট আনুন — লিড কোথায় লিক করছে ফ্রিতে দেখাব।',
      },
    },
    {
      q: { en: 'I need approval from my partner/boss.', bn: 'পার্টনার/বসের অনুমতি দরকার।' },
      a: {
        en: 'Book the call together. We will give you both a clear ROI projection and a one-page proposal you can forward in 5 minutes.',
        bn: 'একসাথে কল বুক করুন। আমরা দুজনকেই স্পষ্ট ROI প্রজেকশন ও ৫ মিনিটে ফরোয়ার্ড করার মতো এক-পেজ প্রপোজাল দেব।',
      },
    },
    {
      q: { en: 'I need to think about it.', bn: 'আমাকে ভাবতে হবে।' },
      a: {
        en: 'Every week you wait is ৳50,000+ in lost leads. The strategy call is free, 30 minutes, no obligation. Think after the call — with real numbers, not guesses.',
        bn: 'প্রতি সপ্তাহ দেরিতে ৳৫০,০০০+ লিড লস। স্ট্র্যাটেজি কল ফ্রি, ৩০ মিনিট, কোনো বাধ্যবাধকতা নেই। কলের পর ভাবুন — অনুমানে নয়, রিয়েল নম্বর দিয়ে।',
      },
    },
    {
      q: { en: 'I do not have a technical team.', bn: 'আমার টেকনিক্যাল টিম নেই।' },
      a: {
        en: 'You do not need one. We are your technical team. CRM, integrations, tracking, AI — all handled by us. If you can use WhatsApp, you can use our system.',
        bn: 'দরকার নেই। আমরাই আপনার টেকনিক্যাল টিম। CRM, ইন্টিগ্রেশন, ট্র্যাকিং, AI — সব আমরা হ্যান্ডেল করি। WhatsApp চালাতে পারলে আমাদের সিস্টেম চালাতে পারবেন।',
      },
    },
    {
      q: { en: 'My business is too small.', bn: 'আমার ব্যবসা খুব ছোট।' },
      a: {
        en: 'If you have ৳50,000/month marketing budget and 1+ year in business, you are ready. Small businesses that systemise early grow 3x faster than those that wait.',
        bn: 'মাসে ৳৫০,০০০ মার্কেটিং বাজেট ও ১+ বছরের ব্যবসা থাকলে আপনি রেডি। যারা আগে সিস্টেমাইজ করে তারা ৩গুণ দ্রুত বাড়ে।',
      },
    },
    {
      q: { en: 'It is too early for us.', bn: 'আমাদের জন্য খুব আগের।' },
      a: {
        en: 'The best time to build a lead engine was 12 months ago. The second best is now. Early systems compound — every month you delay costs you exponentially.',
        bn: 'লিড ইঞ্জিন বানানোর সেরা সময় ছিল ১২ মাস আগে। দ্বিতীয় সেরা এখন। আগের সিস্টেম কম্পাউন্ড হয় — প্রতি মাস দেরিতে ক্ষতি বহুগুণ।',
      },
    },
    {
      q: { en: 'It is too late — market is saturated.', bn: 'অনেক দেরি — মার্কেট স্যাচুরেটেড।' },
      a: {
        en: 'Saturation means the winners are those with better systems, not more spend. 73% of your competitors have NO lead system. You being here means you can leapfrog them today.',
        bn: 'স্যাচুরেশন মানে বিজয়ীরা বেশি খরচ নয়, ভালো সিস্টেম দিয়ে জেতে। ৭৩% প্রতিযোগীর কোনো লিড সিস্টেম নেই। আপনি এখানে থাকলে আজই তাদের ছাড়িয়ে যেতে পারেন।',
      },
    },
    {
      q: { en: 'I need proof / case studies.', bn: 'প্রমাণ / কেস স্টাডি দরকার।' },
      a: {
        en: 'Scroll down — we have 10 industry case studies, 120+ active clients, and 4.9/5 rating. On the call, we will share 3 case studies from your exact industry.',
        bn: 'নিচে স্ক্রল করুন — ১০টি ইন্ডাস্ট্রি কেস স্টাডি, ১২০+ সক্রিয় ক্লায়েন্ট, ৪.৯/৫ রেটিং। কলে আপনার ইন্ডাস্ট্রির ৩টি কেস স্টাডি শেয়ার করব।',
      },
    },
    {
      q: { en: 'I need to see examples of your work.', bn: 'আপনার কাজের উদাহরণ দেখতে চাই।' },
      a: {
        en: 'Book the call — we will show you live dashboards (anonymised) of current clients in your industry, with real lead counts and ROI.',
        bn: 'কল বুক করুন — আপনার ইন্ডাস্ট্রির বর্তমান ক্লায়েন্টদের লাইভ ড্যাশবোর্ড (অ্যানোনিমাইজড), রিয়েল লিড ও ROI সহ দেখাব।',
      },
    },
    {
      q: { en: 'Is my data secure?', bn: 'আমার ডেটা কি নিরাপদ?' },
      a: {
        en: 'SSL encryption, GDPR-compliant, Bangladesh ICT Act compliant, daily backups, access control, audit logs. Your data never leaves our secured infrastructure.',
        bn: 'SSL এনক্রিপশন, GDPR-কমপ্লায়েন্ট, বাংলাদেশ ICT অ্যাক্ট কমপ্লায়েন্ট, ডেইলি ব্যাকআপ, অ্যাক্সেস কন্ট্রোল, অডিট লগ। আপনার ডেটা সুরক্ষিত ইনফ্রাস্ট্রাকচার ছাড়ে না।',
      },
    },
    {
      q: { en: 'What about privacy compliance?', bn: 'প্রাইভেসি কমপ্লায়েন্স কী?' },
      a: {
        en: 'Full GDPR + Bangladesh ICT Act compliance. We handle consent, data retention, and deletion requests. Your leads are yours — exportable anytime.',
        bn: 'সম্পূর্ণ GDPR + বাংলাদেশ ICT অ্যাক্ট কমপ্লায়েন্স। কনসেন্ট, ডেটা রিটেনশন, ডিলিশন আমরা হ্যান্ডেল করি। লিড আপনার — যেকোনো সময় এক্সপোর্টযোগ্য।',
      },
    },
    {
      q: { en: 'Will this integrate with my existing tools?', bn: 'আমার বর্তমান টুলের সাথে কি ইন্টিগ্রেট করবে?' },
      a: {
        en: 'Yes — 50+ integrations including Google Ads, Meta, WhatsApp Business API, Gmail, Zapier, n8n, and any CRM with an API. If it has an API, we connect it.',
        bn: 'হ্যাঁ — ৫০+ ইন্টিগ্রেশন: Google Ads, Meta, WhatsApp Business API, Gmail, Zapier, n8n, এবং যেকোনো API-যুক্ত CRM। API থাকলে আমরা কানেক্ট করি।',
      },
    },
    {
      q: { en: 'What if it does not work for my industry?', bn: 'আমার ইন্ডাস্ট্রির জন্য না কাজ করলে?' },
      a: {
        en: 'We have worked across 10+ industries. In the free strategy call, we will tell you honestly if we cannot help — and refer you to someone who can. No false promises.',
        bn: '১০+ ইন্ডাস্ট্রিতে কাজ করেছি। ফ্রি স্ট্র্যাটেজি কলে সৎভাবে বলব সাহায্য করতে পারব কিনা — না পারলে যিনি পারবেন তাকে রেফার করব। কোনো ভুয়া প্রতিশ্রুতি নেই।',
      },
    },
  ] as Objection[],
}

/* ========================================================================== */
/*  SOCIAL PROOF                                                               */
/* ========================================================================== */

export const SOCIAL_PROOF = {
  badge: { en: 'Social Proof', bn: 'সোশ্যাল প্রুফ' },
  title: {
    en: '120+ Businesses Trust NextGen',
    bn: '১২০+ ব্যবসা NextGen-কে বিশ্বাস করে',
  },
  subtitle: {
    en: 'Real numbers from real clients. No vanity metrics — only revenue and ROI.',
    bn: 'রিয়েল ক্লায়েন্টের রিয়েল নম্বর। কোনো ভ্যানিটি মেট্রিক নেই — শুধু রেভিনিউ ও ROI।',
  },
  stats: [
    { value: { en: '120+', bn: '১২০+' }, label: { en: 'Active Clients', bn: 'সক্রিয় ক্লায়েন্ট' } },
    { value: { en: '15', bn: '১৫' }, label: { en: 'Countries Served', bn: 'দেশে কাজ' } },
    { value: { en: '4.9/5', bn: '৪.৯/৫' }, label: { en: 'Satisfaction Rating', bn: 'সন্তুষ্টি রেটিং' } },
    { value: { en: '৳48Cr+', bn: '৳৪৮ কোটি+' }, label: { en: 'Revenue Generated', bn: 'রেভিনিউ জেনারেটেড' } },
    { value: { en: '2.4L+', bn: '২.৪ লক্ষ+' }, label: { en: 'Leads Delivered', bn: 'লিড ডেলিভার্ড' } },
    { value: { en: '7.2x', bn: '৭.২x' }, label: { en: 'Average ROI', bn: 'গড় ROI' } },
  ] as Stat[],
  testimonials: [
    {
      quote: {
        en: 'In 90 days, NextGen filled our pipeline with 340 qualified B2B leads. We closed 22 deals — ৳1.2Cr in new revenue. Best investment we made.',
        bn: '৯০ দিনে NextGen আমাদের পাইপলাইন ৩৪০টি যোগ্য B2B লিডে ভরিয়ে দিয়েছে। আমরা ২২টি ডিল ক্লোজ করেছি — ৳১.২ কোটি নতুন রেভিনিউ। সেরা ইনভেস্টমেন্ট।',
      },
      name: 'Rakib Hasan',
      role: { en: 'CEO, TechSolutions BD', bn: 'সিইও, টেকসলিউশনস বিডি' },
      metric: { en: '340 leads · ৳1.2Cr revenue', bn: '৩৪০ লিড · ৳১.২ কোটি রেভিনিউ' },
      industry: { en: 'Software', bn: 'সফটওয়্যার' },
      rating: 5,
    },
    {
      quote: {
        en: 'Our patient bookings tripled in 4 months. The AI chatbot handles appointment scheduling at 3am — something our staff could never do.',
        bn: '৪ মাসে রোগী বুকিং তিনগুণ হয়েছে। AI চ্যাটবট রাত ৩টায় অ্যাপয়েন্টমেন্ট সিডিউল করে — আমাদের স্টাফ কখনোই পারত না।',
      },
      name: 'Dr. Salma Akter',
      role: { en: 'Director, Jessore Dental Care', bn: 'পরিচালক, যশোর ডেন্টাল কেয়ার' },
      metric: { en: '3x patient bookings', bn: '৩x রোগী বুকিং' },
      industry: { en: 'Healthcare', bn: 'স্বাস্থ্যসেবা' },
      rating: 5,
    },
    {
      quote: {
        en: 'We went from 8 enquiries/month to 140. The CRM + AI follow-up means no lead is ever lost. Our sales team finally has a full pipeline.',
        bn: 'মাসে ৮ এনকোয়ারি থেকে ১৪০-তে গেছি। CRM + AI ফলো-আপে কোনো লিড হারায় না। সেলস টিমের পাইপলাইন এখন ফুল।',
      },
      name: 'Tanvir Ahmed',
      role: { en: 'Founder, PropertyHub BD', bn: 'ফাউন্ডার, প্রপার্টিহাব বিডি' },
      metric: { en: '8 → 140 enquiries/mo', bn: '৮ → ১৪০ এনকোয়ারি/মাস' },
      industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      rating: 5,
    },
    {
      quote: {
        en: 'The LinkedIn outreach alone brought us 45 enterprise demos in 60 days. We signed 9 clients at ৳5L+ each. ROI is insane.',
        bn: 'শুধু LinkedIn আউটরিচে ৬০ দিনে ৪৫টি এন্টারপ্রাইজ ডেমো। ৯টি ক্লায়েন্ট প্রতিটি ৳৫ লক্ষ+। ROI অবিশ্বাস্য।',
      },
      name: 'Nusrat Jahan',
      role: { en: 'MD, EduGrowth Institute', bn: 'এমডি, এডুগ্রোথ ইনস্টিটিউট' },
      metric: { en: '9 clients · ৳45L revenue', bn: '৯ ক্লায়েন্ট · ৳৪৫ লক্ষ রেভিনিউ' },
      industry: { en: 'Education', bn: 'শিক্ষা' },
      rating: 5,
    },
    {
      quote: {
        en: 'As a manufacturer, we never thought lead gen could work for B2B. NextGen proved us wrong — 28 qualified distributor leads in month one.',
        bn: 'ম্যানুফ্যাকচারার হিসেবে ভাবিনি B2B-তে লিড জেন কাজ করবে। NextGen ভুল প্রমাণ করল — প্রথম মাসেই ২৮টি যোগ্য ডিস্ট্রিবিউটর লিড।',
      },
      name: 'Mohammad Ali',
      role: { en: 'Owner, Khan Industries', bn: 'মালিক, খান ইন্ডাস্ট্রিজ' },
      metric: { en: '28 B2B distributor leads', bn: '২৮ B2B ডিস্ট্রিবিউটর লিড' },
      industry: { en: 'Manufacturing', bn: 'উৎপাদন' },
      rating: 5,
    },
    {
      quote: {
        en: 'I was sceptical about the 60-day guarantee. By day 52, we had 4x ROI. These guys actually deliver what they promise.',
        bn: '৬০-দিন গ্যারান্টি নিয়ে সন্দেহ ছিল। ৫২ তম দিনে ৪x ROI। এরা সত্যিই যা বলে তা দেয়।',
      },
      name: 'Sadia Islam',
      role: { en: 'CMO, FashionVault', bn: 'সিএমও, ফ্যাশনভল্ট' },
      metric: { en: '4x ROI in 52 days', bn: '৫২ দিনে ৪x ROI' },
      industry: { en: 'Ecommerce', bn: 'ই-কমার্স' },
      rating: 5,
    },
  ] as Testimonial[],
  industries: [
    'Software', 'Healthcare', 'Real Estate', 'Education', 'Manufacturing',
    'Ecommerce', 'Agency', 'Consulting', 'Export', 'Local Business',
  ],
  partners: ['Google Partner', 'Meta Business Partner', 'WhatsApp Business API', 'Cloudflare', 'AWS', 'OpenAI'],
}

/* ========================================================================== */
/*  CASE STUDIES (10 industries)                                               */
/* ========================================================================== */

export const CASE_STUDIES = {
  badge: { en: 'Case Studies', bn: 'কেস স্টাডি' },
  title: {
    en: 'Real Results Across 10 Industries',
    bn: '১০টি ইন্ডাস্ট্রিতে রিয়েল ফলাফল',
  },
  subtitle: {
    en: 'Every industry has a unique lead engine. Here is how we built and won in each.',
    bn: 'প্রতিটি ইন্ডাস্ট্রির আলাদা লিড ইঞ্জিন। প্রতিটিতে কীভাবে জিতেছি তা এখানে।',
  },
  items: [
    {
      industry: { en: 'Healthcare', bn: 'স্বাস্থ্যসেবা' },
      icon: 'hospital',
      problem: { en: 'Dental clinic relying on word-of-mouth, 8 bookings/month.', bn: 'ডেন্টাল ক্লিনিক ওয়ার্ড-অফ-মাউথের উপর নির্ভরশীল, মাসে ৮ বুকিং।' },
      solution: { en: 'Local SEO + Meta ads + AI chatbot for 24/7 appointment booking.', bn: 'লোকাল SEO + Meta অ্যাড + ২৪/৭ অ্যাপয়েন্টমেন্টের জন্য AI চ্যাটবট।' },
      implementation: { en: 'Google Business Profile, 40+ geo-targeted ad creatives, WhatsApp booking flow.', bn: 'Google Business Profile, ৪০+ জিও-টার্গেটেড অ্যাড ক্রিয়েটিভ, WhatsApp বুকিং ফ্লো।' },
      result: { en: '24 bookings/month in 60 days, 3x growth.', bn: '৬০ দিনে মাসে ২৪ বুকিং, ৩x গ্রোথ।' },
      roi: { en: '7.5x ROI', bn: '৭.৫x ROI' },
    },
    {
      industry: { en: 'Real Estate', bn: 'রিয়েল এস্টেট' },
      icon: 'home',
      problem: { en: 'Property developer with slow organic enquiries, 8/month.', bn: 'প্রপার্টি ডেভেলপার, ধীর অর্গানিক এনকোয়ারি, মাসে ৮।' },
      solution: { en: 'Meta lead-form ads + CRM with automated agent follow-up within 5 minutes.', bn: 'Meta লিড-ফর্ম অ্যাড + ৫ মিনিটে অটোমেটেড এজেন্ট ফলো-আপ সহ CRM।' },
      implementation: { en: 'Virtual tour landing pages, retargeting pixel, 3-stage email nurture.', bn: 'ভার্চুয়াল ট্যুর ল্যান্ডিং পেজ, রিটার্গেটিং পিক্সেল, ৩-স্টেজ ইমেইল নার্চার।' },
      result: { en: '140 enquiries/month, 22 site visits, 4 deals closed.', bn: 'মাসে ১৪০ এনকোয়ারি, ২২ সাইট ভিজিট, ৪টি ডিল ক্লোজ।' },
      roi: { en: '9.2x ROI', bn: '৯.২x ROI' },
    },
    {
      industry: { en: 'Education', bn: 'শিক্ষা' },
      icon: 'school',
      problem: { en: 'Training institute spending on ads with no tracking, 12 enrolments/month.', bn: 'ট্রেনিং ইনস্টিটিউট ট্র্যাকিং ছাড়া অ্যাডে খরচ, মাসে ১২ এনরোলমেন্ট।' },
      solution: { en: 'LinkedIn outreach to professionals + webinar funnel + AI lead scoring.', bn: 'প্রফেশনালদের কাছে LinkedIn আউটরিচ + ওয়েবিনার ফানেল + AI লিড স্কোরিং।' },
      implementation: { en: '12-webinar series, 4-stage WhatsApp nurture, CRM with lead-to-enrol tracking.', bn: '১২-ওয়েবিনার সিরিজ, ৪-স্টেজ WhatsApp নার্চার, লিড-টু-এনরোল ট্র্যাকিং সহ CRM।' },
      result: { en: '45 enterprise demos, 9 clients signed at ৳5L each.', bn: '৪৫ এন্টারপ্রাইজ ডেমো, ৯ ক্লায়েন্ট প্রতি ৳৫ লক্ষ।' },
      roi: { en: '11x ROI', bn: '১১x ROI' },
    },
    {
      industry: { en: 'Manufacturing', bn: 'উৎপাদন' },
      icon: 'industry',
      problem: { en: 'B2B manufacturer with no online lead channel, dependent on trade shows.', bn: 'B2B ম্যানুফ্যাকচারার, কোনো অনলাইন লিড চ্যানেল নেই, ট্রেড শো-নির্ভর।' },
      solution: { en: 'LinkedIn Sales Navigator + cold email automation + technical spec landing pages.', bn: 'LinkedIn Sales Navigator + কোল্ড ইমেইল অটোমেশন + টেকনিক্যাল স্পেক ল্যান্ডিং পেজ।' },
      implementation: { en: 'Distributor persona targeting, 6-email sequence, RFQ automation.', bn: 'ডিস্ট্রিবিউটর পারসোনা টার্গেটিং, ৬-ইমেইল সিকোয়েন্স, RFQ অটোমেশন।' },
      result: { en: '28 qualified distributor leads in month one, 6 signed.', bn: 'প্রথম মাসেই ২৮ যোগ্য ডিস্ট্রিবিউটর লিড, ৬টি সাইন।' },
      roi: { en: '8.4x ROI', bn: '৮.৪x ROI' },
    },
    {
      industry: { en: 'Software / SaaS', bn: 'সফটওয়্যার / স্যাস' },
      icon: 'code',
      problem: { en: 'SaaS company with high CAC, burning ৳2L/month on ads with poor conversion.', bn: 'SaaS কোম্পানি উচ্চ CAC, মাসে ৳২ লক্ষ অ্যাডে পোড়া, কনভার্সন খারাপ।' },
      solution: { en: 'Product-led funnel + free trial landing page + AI-qualified demo booking.', bn: 'প্রোডাক্ট-লেড ফানেল + ফ্রি ট্রায়াল ল্যান্ডিং পেজ + AI-কোয়ালিফাইড ডেমো বুকিং।' },
      implementation: { en: 'Intent-based Google Ads, 8-variant landing page A/B, server-side CAPI.', bn: 'ইনটেন্ট-বেসড Google Ads, ৮-ভ্যারিয়েন্ট ল্যান্ডিং পেজ A/B, সার্ভার-সাইড CAPI।' },
      result: { en: '340 leads, 22 closed deals, ৳1.2Cr revenue in 90 days.', bn: '৩৪০ লিড, ২২ ক্লোজড ডিল, ৯০ দিনে ৳১.২ কোটি রেভিনিউ।' },
      roi: { en: '12.5x ROI', bn: '১২.৫x ROI' },
    },
    {
      industry: { en: 'Agency', bn: 'এজেন্সি' },
      icon: 'briefcase',
      problem: { en: 'Marketing agency relying on referrals, feast-or-famine pipeline.', bn: 'মার্কেটিং এজেন্সি রেফারাল-নির্ভর, অনিশ্চিত পাইপলাইন।' },
      solution: { en: 'Founder-led LinkedIn content + outbound to ICP + case-study funnel.', bn: 'ফাউন্ডার-লেড LinkedIn কনটেন্ট + ICP-তে আউটবাউন্ড + কেস-স্টাডি ফানেল।' },
      implementation: { en: '90-day content calendar, 50 outreach/day automation, nurture sequence.', bn: '৯০-দিনের কনটেন্ট ক্যালেন্ডার, দিনে ৫০ আউটরিচ অটোমেশন, নার্চার সিকোয়েন্স।' },
      result: { en: '18 qualified client leads/month, 4 signed retainers.', bn: 'মাসে ১৮ যোগ্য ক্লায়েন্ট লিড, ৪টি সাইনড রিটেইনার।' },
      roi: { en: '9.8x ROI', bn: '৯.৮x ROI' },
    },
    {
      industry: { en: 'Consulting', bn: 'কনসাল্টিং' },
      icon: 'lightbulb',
      problem: { en: 'Consultant with no lead system, fully referral-dependent.', bn: 'কনসালট্যান্ট কোনো লিড সিস্টেম ছাড়া, সম্পূর্ণ রেফারাল-নির্ভর।' },
      solution: { en: 'Thought-leadership blog + SEO + lead-magnet funnel + newsletter.', bn: 'থট-লিডারশিপ ব্লগ + SEO + লিড-ম্যাগনেট ফানেল + নিউজলেটার।' },
      implementation: { en: '24 SEO articles, 5 lead magnets, weekly newsletter to 3k subscribers.', bn: '২৪টি SEO আর্টিকেল, ৫টি লিড ম্যাগনেট, ৩k সাবস্ক্রাইবারে সাপ্তাহিক নিউজলেটার।' },
      result: { en: '15 inbound strategy calls/month, 5 retained clients.', bn: 'মাসে ১৫ ইনবাউন্ড স্ট্র্যাটেজি কল, ৫ রিটেইন্ড ক্লায়েন্ট।' },
      roi: { en: '14x ROI', bn: '১৪x ROI' },
    },
    {
      industry: { en: 'Ecommerce', bn: 'ই-কমার্স' },
      icon: 'shopping-cart',
      problem: { en: 'Fashion store with high traffic, low conversion, abandoned carts.', bn: 'ফ্যাশন স্টোর উচ্চ ট্রাফিক, কম কনভার্সন, অ্যাবান্ডনড কার্ট।' },
      solution: { en: 'Meta catalogue ads + WhatsApp abandoned-cart recovery + AI product recommender.', bn: 'Meta ক্যাটালগ অ্যাড + WhatsApp অ্যাবান্ডনড-কার্ট রিকভারি + AI প্রোডাক্ট রিকমেন্ডার।' },
      implementation: { en: 'Dynamic product ads, 3-message cart recovery, lookalike audiences.', bn: 'ডায়নামিক প্রোডাক্ট অ্যাড, ৩-মেসেজ কার্ট রিকভারি, লুকআলাইক অডিয়েন্স।' },
      result: { en: '4x ROI in 52 days, 32% cart recovery rate.', bn: '৫২ দিনে ৪x ROI, ৩২% কার্ট রিকভারি রেট।' },
      roi: { en: '4x ROI', bn: '৪x ROI' },
    },
    {
      industry: { en: 'Export', bn: 'রপ্তানি' },
      icon: 'ship',
      problem: { en: 'Garment exporter dependent on 2 buyers, vulnerable to churn.', bn: 'গার্মেন্টস এক্সপোর্টার ২ বায়ার-নির্ভর, চার্ন-এ ঝুঁকিপূর্ণ।' },
      solution: { en: 'Alibaba SEO + cold email to 5000+ global buyers + trade-show lead capture app.', bn: 'Alibaba SEO + ৫০০০+ গ্লোবাল বায়ারে কোল্ড ইমেইল + ট্রেড-শো লিড ক্যাপচার অ্যাপ।' },
      implementation: { en: 'Product catalogue landing pages, RFQ automation, buyer CRM.', bn: 'প্রোডাক্ট ক্যাটালগ ল্যান্ডিং পেজ, RFQ অটোমেশন, বায়ার CRM।' },
      result: { en: '12 new international buyers in 6 months, ৳3.5Cr export orders.', bn: '৬ মাসে ১২ নতুন আন্তর্জাতিক বায়ার, ৳৩.৫ কোটি এক্সপোর্ট অর্ডার।' },
      roi: { en: '16x ROI', bn: '১৬x ROI' },
    },
    {
      industry: { en: 'Local Business', bn: 'লোকাল বিজনেস' },
      icon: 'store',
      problem: { en: 'Restaurant with no online presence, slow weekdays.', bn: 'রেস্টুরেন্টের কোনো অনলাইন প্রেসেন্স নেই, ধীর উইকডে।' },
      solution: { en: 'Google Business Profile + local SEO + Meta awareness + WhatsApp reservations.', bn: 'Google Business Profile + লোকাল SEO + Meta অ্যাওয়ারনেস + WhatsApp রিজার্ভেশন।' },
      implementation: { en: 'Review automation, geo-fenced ads, loyalty WhatsApp broadcast.', bn: 'রিভিউ অটোমেশন, জিও-ফেন্সড অ্যাড, লয়্যালটি WhatsApp ব্রডকাস্ট।' },
      result: { en: 'Weekday covers up 45%, 200+ reviews (4.8 stars).', bn: 'উইকডে কভার ৪৫% বেশি, ২০০+ রিভিউ (৪.৮ স্টার)।' },
      roi: { en: '6x ROI', bn: '৬x ROI' },
    },
  ] as CaseStudy[],
}

/* ========================================================================== */
/*  PRICING (3 tiers)                                                          */
/* ========================================================================== */

export const PRICING = {
  badge: { en: 'Pricing', bn: 'প্রাইসিং' },
  title: {
    en: 'Transparent Pricing — Pick Your Growth Tier',
    bn: 'স্বচ্ছ প্রাইসিং — আপনার গ্রোথ টিয়ার বাছুন',
  },
  subtitle: {
    en: 'No hidden fees. No long lock-in. Cancel anytime after 60 days. All plans include the 60-day ROI guarantee.',
    bn: 'কোনো হিডেন ফি নেই। কোনো লং লক-ইন নেই। ৬০ দিন পর যেকোনো সময় ক্যানসেল। সব প্ল্যানে ৬০-দিন ROI গ্যারান্টি।',
  },
  anchor: {
    label: { en: 'Cost of doing nothing', bn: 'কিছু না করার খরচ' },
    value: { en: '৳24,00,000 / year lost', bn: 'বছরে ৳২৪,০০,০০০ লস' },
    note: {
      en: 'The average business loses ৳24L/year from no lead system. Any plan below pays for itself in weeks.',
      bn: 'গড় ব্যবসা লিড সিস্টেম না থাকায় বছরে ৳২৪ লক্ষ হারায়। নিচের যেকোনো প্ল্যান কয়েক সপ্তাহে উঠে আসে।',
    },
  },
  tiers: [
    {
      name: { en: 'Starter', bn: 'স্টার্টার' },
      price: { en: '৳35,000', bn: '৳৩৫,০০০' },
      period: { en: '/month', bn: '/মাস' },
      tagline: {
        en: 'For small businesses testing predictable leads.',
        bn: 'ছোট ব্যবসার জন্য যারা নিশ্চিত লিড টেস্ট করছেন।',
      },
      features: [
        { en: '2 channels (Google + Meta)', bn: '২টি চ্যানেল (Google + Meta)' },
        { en: '50–80 qualified leads/month', bn: 'মাসে ৫০–৮০ যোগ্য লিড' },
        { en: 'CRM setup + dashboard', bn: 'CRM সেটআপ + ড্যাশবোর্ড' },
        { en: 'Server-side tracking (CAPI)', bn: 'সার্ভার-সাইড ট্র্যাকিং (CAPI)' },
        { en: 'Weekly email report', bn: 'সাপ্তাহিক ইমেইল রিপোর্ট' },
        { en: 'Email support (24h)', bn: 'ইমেইল সাপোর্ট (২৪ঘ)' },
        { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      ],
      cta: { en: 'Start Starter', bn: 'স্টার্টার শুরু করুন' },
    },
    {
      name: { en: 'Growth', bn: 'গ্রোথ' },
      price: { en: '৳75,000', bn: '৳৭৫,০০০' },
      period: { en: '/month', bn: '/মাস' },
      tagline: {
        en: 'For scaling businesses ready to dominate their market.',
        bn: 'স্কেলিং ব্যবসার জন্য যারা মার্কেট দখল করতে চান।',
      },
      features: [
        { en: '4 channels (Google + Meta + LinkedIn + WhatsApp)', bn: '৪টি চ্যানেল (Google + Meta + LinkedIn + WhatsApp)' },
        { en: '100–150 qualified leads/month', bn: 'মাসে ১০০–১৫০ যোগ্য লিড' },
        { en: 'AI Sales Agent (chatbot)', bn: 'AI সেলস এজেন্ট (চ্যাটবট)' },
        { en: 'AI cold outreach automation', bn: 'AI কোল্ড আউটরিচ অটোমেশন' },
        { en: 'Landing page + copywriting', bn: 'ল্যান্ডিং পেজ + কপিরাইটিং' },
        { en: 'Live dashboard + weekly call', bn: 'লাইভ ড্যাশবোর্ড + সাপ্তাহিক কল' },
        { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
        { en: 'Priority support (2h response)', bn: 'প্রায়োরিটি সাপোর্ট (২ঘ রেসপন্স)' },
        { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      ],
      cta: { en: 'Choose Growth', bn: 'গ্রোথ বাছুন' },
      highlighted: true,
      badge: { en: 'Most Popular', bn: 'সবচেয়ে জনপ্রিয়' },
    },
    {
      name: { en: 'Dominant', bn: 'ডোমিন্যান্ট' },
      price: { en: '৳1,50,000', bn: '৳১,৫০,০০০' },
      period: { en: '/month', bn: '/মাস' },
      tagline: {
        en: 'For enterprises that want market leadership, fast.',
        bn: 'এন্টারপ্রাইজের জন্য যারা দ্রুত মার্কেট লিডারশিপ চান।',
      },
      features: [
        { en: '6 channels (all + SEO + cold email)', bn: '৬টি চ্যানেল (সব + SEO + কোল্ড ইমেইল)' },
        { en: '150–250 qualified leads/month', bn: 'মাসে ১৫০–২৫০ যোগ্য লিড' },
        { en: 'AI Voice Agent + Chatbot', bn: 'AI ভয়েস এজেন্ট + চ্যাটবট' },
        { en: 'Full sales funnel build', bn: 'সম্পূর্ণ সেলস ফানেল বিল্ড' },
        { en: 'Custom integrations & API', bn: 'কাস্টম ইন্টিগ্রেশন ও API' },
        { en: 'Sales team training (monthly)', bn: 'সেলস টিম ট্রেনিং (মাসিক)' },
        { en: 'Quarterly strategy review', bn: 'কোয়ার্টারলি স্ট্র্যাটেজি রিভিউ' },
        { en: 'Dedicated 2-person team', bn: 'ডেডিকেটেড ২-জনের টিম' },
        { en: '24/7 priority support', bn: '২৪/৭ প্রায়োরিটি সাপোর্ট' },
        { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      ],
      cta: { en: 'Go Dominant', bn: 'ডোমিন্যান্ট যান' },
    },
  ] as PricingTier[],
  note: {
    en: 'All prices in BDT. Ads spend is separate and managed by you (we recommend budgets on the call). 18% VAT applicable for BD clients.',
    bn: 'সব মূল্য BDT-তে। অ্যাড স্পেন্ড আলাদা, আপনি পরিচালনা করেন (কলে বাজেট সুপারিশ করি)। বিডি ক্লায়েন্টের জন্য ১৮% VAT প্রযোজ্য।',
  },
}

/* ========================================================================== */
/*  ROI CALCULATOR CONFIG                                                      */
/* ========================================================================== */

export const ROI_CALCULATOR = {
  badge: { en: 'ROI Calculator', bn: 'ROI ক্যালকুলেটর' },
  title: {
    en: 'See Your Potential Revenue',
    bn: 'আপনার সম্ভাব্য রেভিনিউ দেখুন',
  },
  subtitle: {
    en: 'Drag the sliders to model your business. Numbers update live — no email required.',
    bn: 'স্লাইডার টেনে আপনার ব্যবসা মডেল করুন। নম্বর লাইভ আপডেট হয় — কোনো ইমেইল লাগে না।',
  },
  defaults: {
    investment: 75000,
    leads: 120,
    conversionRate: 15,
    customerValue: 25000,
  },
  ranges: {
    investment: { min: 20000, max: 300000, step: 5000 },
    leads: { min: 20, max: 300, step: 10 },
    conversionRate: { min: 5, max: 40, step: 1 },
    customerValue: { min: 5000, max: 200000, step: 5000 },
  },
  labels: {
    investment: { en: 'Monthly Investment', bn: 'মাসিক বিনিয়োগ' },
    leads: { en: 'Leads / Month', bn: 'লিড / মাস' },
    conversionRate: { en: 'Close Rate (%)', bn: 'ক্লোজ রেট (%)' },
    customerValue: { en: 'Customer Value (৳)', bn: 'কাস্টমার ভ্যালু (৳)' },
  },
  results: {
    customers: { en: 'New Customers / Month', bn: 'নতুন কাস্টমার / মাস' },
    revenue: { en: 'Monthly Revenue', bn: 'মাসিক রেভিনিউ' },
    roi: { en: 'ROI', bn: 'ROI' },
    payback: { en: 'Payback Period', bn: 'পেব্যাক পিরিয়ড' },
    ltv: { en: 'Est. LTV (12mo)', bn: 'আনুমানিক LTV (১২মা)' },
    cac: { en: 'CAC', bn: 'CAC' },
  },
}

/* ========================================================================== */
/*  TRUST ARCHITECTURE                                                         */
/* ========================================================================== */

export const TRUST = {
  badge: { en: 'Trust Architecture', bn: 'ট্রাস্ট আর্কিটেকচার' },
  title: {
    en: 'Enterprise-Grade Security & Compliance',
    bn: 'এন্টারপ্রাইজ-গ্রেড সিকিউরিটি ও কমপ্লায়েন্স',
  },
  subtitle: {
    en: 'Your data is protected by the same infrastructure trusted by Fortune 500 companies.',
    bn: 'আপনার ডেটা Fortune 500 কোম্পানির মতো একই ইনফ্রাস্ট্রাকচারে সুরক্ষিত।',
  },
  items: [
    {
      icon: 'shield',
      title: { en: 'GDPR Compliant', bn: 'GDPR কমপ্লায়েন্ট' },
      desc: {
        en: 'Full consent management, data subject rights, and right-to-erasure support.',
        bn: 'সম্পূর্ণ কনসেন্ট ম্যানেজমেন্ট, ডেটা সাবজেক্ট রাইটস, রাইট-টু-ইরেজার সাপোর্ট।',
      },
    },
    {
      icon: 'gavel',
      title: { en: 'Bangladesh ICT Act', bn: 'বাংলাদেশ ICT অ্যাক্ট' },
      desc: {
        en: 'Compliant with the Information and Communication Technology Act 2006 (amended 2013).',
        bn: 'তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬ (সংশোধিত ২০১৩) মেনে চলে।',
      },
    },
    {
      icon: 'lock',
      title: { en: 'SSL / TLS Encryption', bn: 'SSL / TLS এনক্রিপশন' },
      desc: {
        en: '256-bit SSL/TLS encryption on all data in transit. End-to-end for sensitive fields.',
        bn: 'ট্রানজিটে সব ডেটায় ২৫৬-বিট SSL/TLS এনক্রিপশন। সংবেদনশীল ফিল্ডে এন্ড-টু-এন্ড।',
      },
    },
    {
      icon: 'cloud',
      title: { en: 'Cloudflare Protected', bn: 'Cloudflare সুরক্ষিত' },
      desc: {
        en: 'DDoS protection, WAF, bot mitigation, and global CDN for 99.9% uptime.',
        bn: 'DDoS সুরক্ষা, WAF, বট মাইটিগেশন, গ্লোবাল CDN — ৯৯.৯% আপটাইম।',
      },
    },
    {
      icon: 'credit-card',
      title: { en: 'PCI-DSS Aware', bn: 'PCI-DSS অ্যাওয়ার' },
      desc: {
        en: 'Payment data never touches our servers. Processed via Stripe / SSLCommerz.',
        bn: 'পেমেন্ট ডেটা আমাদের সার্ভারে স্পর্শ করে না। Stripe / SSLCommerz দিয়ে প্রসেস।',
      },
    },
    {
      icon: 'database',
      title: { en: 'Daily Backups', bn: 'ডেইলি ব্যাকআপ' },
      desc: {
        en: 'Automated daily backups with 30-day retention. Point-in-time recovery available.',
        bn: '৩০-দিন রিটেনশন সহ অটোমেটেড ডেইলি ব্যাকআপ। পয়েন্ট-ইন-টাইম রিকভারি।',
      },
    },
    {
      icon: 'key',
      title: { en: 'Access Control', bn: 'অ্যাক্সেস কন্ট্রোল' },
      desc: {
        en: 'Role-based access, 2FA enforced, principle of least privilege across all systems.',
        bn: 'রোল-বেসড অ্যাক্সেস, ২FA বাধ্যতামূলক, সব সিস্টেমে লিস্ট-প্রিভিলেজ প্রিন্সিপল।',
      },
    },
    {
      icon: 'file-text',
      title: { en: 'Audit Logs', bn: 'অডিট লগ' },
      desc: {
        en: 'Every action logged, immutable, and exportable for compliance reviews.',
        bn: 'প্রতিটি অ্যাকশন লগড, ইমিউটেবল, কমপ্লায়েন্স রিভিউর জন্য এক্সপোর্টযোগ্য।',
      },
    },
  ] as TrustItem[],
  partners: ['Google', 'Meta', 'WhatsApp', 'Cloudflare', 'AWS', 'OpenAI', 'Stripe', 'SSLCommerz'],
}

/* ========================================================================== */
/*  TECHNICAL STACK                                                            */
/* ========================================================================== */

export const TECH_STACK = {
  badge: { en: 'Technical Stack', bn: 'টেকনিক্যাল স্ট্যাক' },
  title: {
    en: 'The Engine Behind Your Leads',
    bn: 'আপনার লিডের পেছনের ইঞ্জিন',
  },
  subtitle: {
    en: '12 specialised tools, wired into one intelligent system. No silos, no manual data transfer.',
    bn: '১২টি বিশেষায়িত টুল, এক ইন্টেলিজেন্ট সিস্টেমে। কোনো সাইলো নেই, কোনো ম্যানুয়াল ট্রান্সফার নেই।',
  },
  items: [
    { icon: 'megaphone', name: { en: 'Google Ads', bn: 'Google Ads' }, desc: { en: 'Search, Display, Performance Max with smart bidding.', bn: 'সার্চ, ডিসপ্লে, পারফরম্যান্স ম্যাক্স স্মার্ট বিডিং।' } },
    { icon: 'megaphone', name: { en: 'Meta Ads', bn: 'Meta Ads' }, desc: { en: 'Facebook + Instagram lead-form + catalogue ads.', bn: 'Facebook + Instagram লিড-ফর্ম + ক্যাটালগ অ্যাড।' } },
    { icon: 'linkedin', name: { en: 'LinkedIn Outreach', bn: 'LinkedIn আউটরিচ' }, desc: { en: 'Sales Navigator + automated connection + InMail.', bn: 'Sales Navigator + অটোমেটেড কানেকশন + InMail।' } },
    { icon: 'message-circle', name: { en: 'WhatsApp Business API', bn: 'WhatsApp Business API' }, desc: { en: 'Official API for broadcasts, templates, chatbots.', bn: 'ব্রডকাস্ট, টেমপ্লেট, চ্যাটবটের জন্য অফিসিয়াল API।' } },
    { icon: 'search', name: { en: 'SEO', bn: 'SEO' }, desc: { en: 'Technical, on-page, content + local SEO + link building.', bn: 'টেকনিক্যাল, অন-পেজ, কনটেন্ট + লোকাল SEO + লিংক বিল্ডিং।' } },
    { icon: 'mail', name: { en: 'Email Automation', bn: 'ইমেইল অটোমেশন' }, desc: { en: 'Drip sequences, nurture flows, transactional emails.', bn: 'ড্রিপ সিকোয়েন্স, নার্চার ফ্লো, ট্রানজ্যাকশনাল ইমেইল।' } },
    { icon: 'bot', name: { en: 'AI Chat Agent', bn: 'AI চ্যাট এজেন্ট' }, desc: { en: 'Gemini-powered 24/7 lead qualification + booking.', bn: 'Gemini-চালিত ২৪/৭ লিড কোয়ালিফিকেশন + বুকিং।' } },
    { icon: 'phone', name: { en: 'AI Voice Agent', bn: 'AI ভয়েস এজেন্ট' }, desc: { en: 'Inbound/outbound calls, scheduling, multilingual.', bn: 'ইনবাউন্ড/আউটবাউন্ড কল, সিডিউলিং, মাল্টিলিঙ্গুয়াল।' } },
    { icon: 'database', name: { en: 'CRM', bn: 'CRM' }, desc: { en: 'Lead scoring, pipeline, automations, reporting.', bn: 'লিড স্কোরিং, পাইপলাইন, অটোমেশন, রিপোর্টিং।' } },
    { icon: 'bar-chart', name: { en: 'Analytics', bn: 'অ্যানালিটিক্স' }, desc: { en: 'GA4 + Meta CAPI + TikTok + Snapchat server-side.', bn: 'GA4 + Meta CAPI + TikTok + Snapchat সার্ভার-সাইড।' } },
    { icon: 'code', name: { en: 'API & Webhooks', bn: 'API ও ওয়েবহুক' }, desc: { en: 'REST API + webhooks for 50+ integrations.', bn: '৫০+ ইন্টিগ্রেশনের জন্য REST API + ওয়েবহুক।' } },
    { icon: 'dashboard', name: { en: 'Live Dashboard', bn: 'লাইভ ড্যাশবোর্ড' }, desc: { en: 'Real-time leads, cost, ROI, channel breakdown.', bn: 'রিয়েল-টাইম লিড, খরচ, ROI, চ্যানেল ব্রেকডাউন।' } },
  ] as TechItem[],
}

/* ========================================================================== */
/*  IMPLEMENTATION TIMELINE                                                    */
/* ========================================================================== */

export const TIMELINE = {
  badge: { en: 'Implementation Timeline', bn: 'ইম্প্লিমেন্টেশন টাইমলাইন' },
  title: {
    en: 'Your First 90 Days — Mapped Out',
    bn: 'আপনার প্রথম ৯০ দিন — ম্যাপ করা',
  },
  subtitle: {
    en: 'A clear, milestone-driven path. You know exactly what happens and when.',
    bn: 'স্পষ্ট, মাইলস্টোন-চালিত পথ। কী কখন হবে আপনি জানেন।',
  },
  steps: [
    {
      phase: { en: 'Week 1', bn: 'সপ্তাহ ১' },
      title: { en: 'Discovery & Audit', bn: 'ডিসকভারি ও অডিট' },
      items: [
        { en: 'Business + funnel audit', bn: 'ব্যবসা + ফানেল অডিট' },
        { en: 'ICP + persona definition', bn: 'ICP + পারসোনা নির্ধারণ' },
        { en: 'Channel strategy + budget', bn: 'চ্যানেল স্ট্র্যাটেজি + বাজেট' },
        { en: 'Tracking architecture plan', bn: 'ট্র্যাকিং আর্কিটেকচার প্ল্যান' },
      ],
    },
    {
      phase: { en: 'Week 2', bn: 'সপ্তাহ ২' },
      title: { en: 'Build & Launch', bn: 'বিল্ড ও লঞ্চ' },
      items: [
        { en: 'CRM setup + pipelines', bn: 'CRM সেটআপ + পাইপলাইন' },
        { en: 'Landing pages + copy', bn: 'ল্যান্ডিং পেজ + কপি' },
        { en: 'Ad accounts + pixels + CAPI', bn: 'অ্যাড অ্যাকাউন্ট + পিক্সেল + CAPI' },
        { en: 'First campaigns live', bn: 'প্রথম ক্যাম্পেইন লাইভ' },
      ],
    },
    {
      phase: { en: 'Week 3', bn: 'সপ্তাহ ৩' },
      title: { en: 'Optimise & Scale', bn: 'অপটিমাইজ ও স্কেল' },
      items: [
        { en: 'First leads analysed + scored', bn: 'প্রথম লিড অ্যানালাইজড + স্কোরড' },
        { en: 'AI chatbot deployed', bn: 'AI চ্যাটবট ডিপ্লয়ড' },
        { en: 'A/B testing begins', bn: 'A/B টেস্টিং শুরু' },
        { en: 'WhatsApp automation live', bn: 'WhatsApp অটোমেশন লাইভ' },
      ],
    },
    {
      phase: { en: 'Month 1', bn: 'মাস ১' },
      title: { en: 'First ROI Checkpoint', bn: 'প্রথম ROI চেকপয়েন্ট' },
      items: [
        { en: '50–80 leads delivered', bn: '৫০–৮০ লিড ডেলিভার্ড' },
        { en: 'Cost-per-lead optimised', bn: 'কস্ট-পার-লিড অপটিমাইজড' },
        { en: 'Sales team trained on CRM', bn: 'সেলস টিম CRM-এ ট্রেইন্ড' },
        { en: 'Monthly review call', bn: 'মাসিক রিভিউ কল' },
      ],
    },
    {
      phase: { en: 'Month 2', bn: 'মাস ২' },
      title: { en: 'Scale & Refine', bn: 'স্কেল ও রিফাইন' },
      items: [
        { en: 'Add 2nd channel', bn: '২য় চ্যানেল যোগ' },
        { en: 'AI cold outreach live', bn: 'AI কোল্ড আউটরিচ লাইভ' },
        { en: 'Retargeting funnels', bn: 'রিটার্গেটিং ফানেল' },
        { en: 'First closed deals from leads', bn: 'লিড থেকে প্রথম ক্লোজড ডিল' },
      ],
    },
    {
      phase: { en: 'Month 3', bn: 'মাস ৩' },
      title: { en: 'Dominate & Compound', bn: 'ডোমিনেট ও কম্পাউন্ড' },
      items: [
        { en: 'Full 4–6 channels running', bn: 'সম্পূর্ণ ৪–৬ চ্যানেল চলছে' },
        { en: 'ROI positive (guarantee met)', bn: 'ROI পজিটিভ (গ্যারান্টি মেট)' },
        { en: 'Quarterly strategy review', bn: 'কোয়ার্টারলি স্ট্র্যাটেজি রিভিউ' },
        { en: 'Scale plan for next quarter', bn: 'পরের কোয়ার্টারের স্কেল প্ল্যান' },
      ],
    },
  ] as TimelineStep[],
}

/* ========================================================================== */
/*  COMPETITIVE COMPARISON                                                     */
/* ========================================================================== */

export const COMPARISON = {
  badge: { en: 'Comparison', bn: 'তুলনা' },
  title: {
    en: 'NextGen vs Everyone Else',
    bn: 'NextGen বনাম বাকি সবাই',
  },
  subtitle: {
    en: 'An honest comparison. We are not the cheapest — we are the most complete.',
    bn: 'একটি সৎ তুলনা। আমরা সস্তা নই — আমরা সবচেয়ে সম্পূর্ণ।',
  },
  headers: {
    feature: { en: 'Capability', bn: 'সক্ষমতা' },
    traditional: { en: 'Traditional Agency', bn: 'ট্র্যাডিশনাল এজেন্সি' },
    freelancer: { en: 'Freelancer', bn: 'ফ্রিল্যান্সার' },
    inhouse: { en: 'In-house Team', bn: 'ইন-হাউস টিম' },
    diy: { en: 'DIY / Software Only', bn: 'DIY / শুধু সফটওয়্যার' },
    nextgen: { en: 'NextGen', bn: 'NextGen' },
  },
  rows: [
    {
      feature: { en: 'Multi-channel (Ads+SEO+Outreach+AI)', bn: 'মাল্টি-চ্যানেল (অ্যাড+SEO+আউটরিচ+AI)' },
      traditional: { en: 'Usually ads only', bn: 'সাধারণত শুধু অ্যাড' },
      freelancer: { en: 'One skill', bn: 'এক স্কিল' },
      inhouse: { en: 'Possible but costly', bn: 'সম্ভব কিন্তু ব্যয়বহুল' },
      diy: { en: 'Fragmented', bn: 'বিচ্ছিন্ন' },
      nextgen: { en: '6 channels, unified', bn: '৬ চ্যানেল, একত্রিত' },
    },
    {
      feature: { en: 'CRM + Automation included', bn: 'CRM + অটোমেশন অন্তর্ভুক্ত' },
      traditional: { en: 'Extra cost', bn: 'অতিরিক্ত খরচ' },
      freelancer: { en: 'No', bn: 'না' },
      inhouse: { en: 'Build yourself', bn: 'নিজে বানাতে হবে' },
      diy: { en: 'Separate tool', bn: 'আলাদা টুল' },
      nextgen: { en: 'Full CRM included', bn: 'সম্পূর্ণ CRM অন্তর্ভুক্ত' },
    },
    {
      feature: { en: 'AI chatbot + voice agent', bn: 'AI চ্যাটবট + ভয়েস এজেন্ট' },
      traditional: { en: 'No', bn: 'না' },
      freelancer: { en: 'No', bn: 'না' },
      inhouse: { en: 'Hard to build', bn: 'বানানো কঠিন' },
      diy: { en: 'Generic templates', bn: 'জেনেরিক টেমপ্লেট' },
      nextgen: { en: 'Custom-trained on your business', bn: 'আপনার ব্যবসায় কাস্টম-ট্রেইন্ড' },
    },
    {
      feature: { en: 'Server-side tracking (CAPI)', bn: 'সার্ভার-সাইড ট্র্যাকিং (CAPI)' },
      traditional: { en: 'Rare', bn: 'বিরল' },
      freelancer: { en: 'No', bn: 'না' },
      inhouse: { en: 'Complex', bn: 'জটিল' },
      diy: { en: 'No', bn: 'না' },
      nextgen: { en: 'GA4 + Meta + TikTok + Snap', bn: 'GA4 + Meta + TikTok + Snap' },
    },
    {
      feature: { en: '60-day ROI guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
      traditional: { en: 'No', bn: 'না' },
      freelancer: { en: 'No', bn: 'না' },
      inhouse: { en: 'N/A', bn: 'প্রযোজ্য নয়' },
      diy: { en: 'No', bn: 'না' },
      nextgen: { en: 'Yes, written', bn: 'হ্যাঁ, লিখিত' },
    },
    {
      feature: { en: 'Dedicated success manager', bn: 'ডেডিকেটেড সাকসেস ম্যানেজার' },
      traditional: { en: 'Account manager (shared)', bn: 'অ্যাকাউন্ট ম্যানেজার (শেয়ার্ড)' },
      freelancer: { en: 'Just them', bn: 'শুধু সে' },
      inhouse: { en: 'Internal', bn: 'ইন্টারনাল' },
      diy: { en: 'Support ticket', bn: 'সাপোর্ট টিকিট' },
      nextgen: { en: 'Dedicated + WhatsApp', bn: 'ডেডিকেটেড + WhatsApp' },
    },
    {
      feature: { en: 'Time to first leads', bn: 'প্রথম লিড পর্যন্ত সময়' },
      traditional: { en: '4–8 weeks', bn: '৪–৮ সপ্তাহ' },
      freelancer: { en: '2–4 weeks', bn: '২–৪ সপ্তাহ' },
      inhouse: { en: '8–12 weeks', bn: '৮–১২ সপ্তাহ' },
      diy: { en: 'Ongoing struggle', bn: 'চলমান সংগ্রাম' },
      nextgen: { en: '7 days', bn: '৭ দিন' },
    },
    {
      feature: { en: 'Monthly cost (realistic)', bn: 'মাসিক খরচ (বাস্তব)' },
      traditional: { en: '৳1L–৳3L', bn: '৳১ল–৳৩ল' },
      freelancer: { en: '৳20K–৳50K', bn: '৳২০K–৳৫০K' },
      inhouse: { en: '৳2L+ (salary)', bn: '৳২ল+ (বেতন)' },
      diy: { en: '৳10K–৳30K + your time', bn: '৳১০K–৳৩০K + আপনার সময়' },
      nextgen: { en: '৳35K–৳1.5L (all-in)', bn: '৳৩৫K–৳১.৫ল (সব মিলে)' },
    },
  ] as ComparisonRow[],
}

/* ========================================================================== */
/*  FAQ (60+ grouped)                                                          */
/* ========================================================================== */

export const FAQS = {
  badge: { en: 'FAQ', bn: 'সাধারণ প্রশ্ন' },
  title: {
    en: 'Every Question, Answered',
    bn: 'প্রতিটি প্রশ্নের উত্তর',
  },
  subtitle: {
    en: 'Grouped by category so you find exactly what you need. Still have a question? Book the free call.',
    bn: 'ক্যাটাগরি অনুযায়ী সাজানো। এখনো প্রশ্ন আছে? ফ্রি কল বুক করুন।',
  },
  groups: [
    {
      category: { en: 'Pricing & Billing', bn: 'প্রাইসিং ও বিলিং' },
      icon: 'credit-card',
      items: [
        { q: { en: 'How much does it cost?', bn: 'খরচ কত?' }, a: { en: 'Plans start at ৳35,000/month (Starter). Growth is ৳75,000, Dominant is ৳1,50,000. Ad spend is separate.', bn: 'প্ল্যান শুরু ৳৩৫,০০০/মাস (স্টার্টার)। গ্রোথ ৳৭৫,০০০, ডোমিন্যান্ট ৳১,৫০,০০০। অ্যাড স্পেন্ড আলাদা।' } },
        { q: { en: 'Is there a setup fee?', bn: 'কি সেটআপ ফি আছে?' }, a: { en: 'No setup fee on Growth and Dominant. Starter has a one-time ৳10,000 setup (waived if you commit to 3 months).', bn: 'গ্রোথ ও ডোমিন্যান্টে কোনো সেটআপ ফি নেই। স্টার্টারে এককালীন ৳১০,০০০ সেটআপ (৩ মাস কমিট করলে মওকুফ)।' } },
        { q: { en: 'Do I pay for ad spend separately?', bn: 'অ্যাড স্পেন্ড কি আলাদাভাবে দিতে হয়?' }, a: { en: 'Yes. You pay Google/Meta directly for ad spend. We manage it for you and recommend budgets on the strategy call.', bn: 'হ্যাঁ। অ্যাড স্পেন্ড আপনি সরাসরি Google/Meta-কে দেন। আমরা ম্যানেজ করি এবং কলে বাজেট সুপারিশ করি।' } },
        { q: { en: 'What payment methods do you accept?', bn: 'কী পেমেন্ট মেথড নেন?' }, a: { en: 'bKash, Nagad, Rocket, bank transfer, and SSLCommerz (cards). International clients can pay via Stripe/Wise.', bn: 'বিকাশ, নগদ, রকেট, ব্যাংক ট্রান্সফার, এবং SSLCommerz (কার্ড)। আন্তর্জাতিক ক্লায়েন্ট Stripe/Wise দিয়ে পরিশোধ করতে পারেন।' } },
        { q: { en: 'Is VAT included?', bn: 'VAT কি অন্তর্ভুক্ত?' }, a: { en: 'Prices exclude VAT. 18% VAT applies for Bangladesh-registered businesses. Export clients are zero-rated.', bn: 'মূল্য VAT বাদে। বাংলাদেশে নিবন্ধিত ব্যবসায় ১৮% VAT প্রযোজ্য। এক্সপোর্ট ক্লায়েন্ট জিরো-রেটেড।' } },
        { q: { en: 'Can I get an invoice?', bn: 'ইনভয়েস পাব?' }, a: { en: 'Yes, GST/VAT-compliant invoice issued for every payment, monthly or annual.', bn: 'হ্যাঁ, প্রতিটি পেমেন্টের জন্য GST/VAT-কমপ্লায়েন্ট ইনভয়েস, মাসিক বা বার্ষিক।' } },
      ],
    },
    {
      category: { en: 'Contracts & Cancellation', bn: 'চুক্তি ও বাতিল' },
      icon: 'file-text',
      items: [
        { q: { en: 'Is there a long contract?', bn: 'কি লং কন্ট্রাক্ট আছে?' }, a: { en: 'No. Month-to-month after the first 60 days. No lock-in, no exit fees.', bn: 'না। প্রথম ৬০ দিন পর মাসে-মাসে। কোনো লক-ইন নেই, কোনো এক্সিট ফি নেই।' } },
        { q: { en: 'What is the minimum commitment?', bn: 'ন্যূনতম কমিটমেন্ট কত?' }, a: { en: '60 days (covered by the ROI guarantee). After that, cancel anytime with 7 days notice.', bn: '৬০ দিন (ROI গ্যারান্টি দ্বারা আচ্ছাদিত)। এরপর ৭ দিন নোটিশে যেকোনো সময় ক্যানসেল।' } },
        { q: { en: 'How do I cancel?', bn: 'কীভাবে ক্যানসেল করব?' }, a: { en: 'Email or WhatsApp your success manager. 7-day notice, prorated refund of unused days.', bn: 'সাকসেস ম্যানেজারকে ইমেইল বা WhatsApp। ৭-দিন নোটিশ, ব্যবহার না হওয়া দিনের প্রো-রেটেড রিফান্ড।' } },
        { q: { en: 'Do I own the assets if I leave?', bn: 'চলে গেলে অ্যাসেট কি আমার?' }, a: { en: 'Yes — ad accounts, CRM data, landing pages (if on your hosting), creatives. All yours, exported in 48h.', bn: 'হ্যাঁ — অ্যাড অ্যাকাউন্ট, CRM ডেটা, ল্যান্ডিং পেজ (আপনার হোস্টিংয়ে থাকলে), ক্রিয়েটিভ। সব আপনার, ৪৮ঘ-এ এক্সপোর্ট।' } },
      ],
    },
    {
      category: { en: 'Lead Quality & Results', bn: 'লিড কোয়ালিটি ও ফলাফল' },
      icon: 'target',
      items: [
        { q: { en: 'How do you define a "qualified" lead?', bn: '"যোগ্য" লিড কীভাবে সংজ্ঞায়িত করেন?' }, a: { en: 'A lead that matches your ICP, has a verified contact method, and has expressed intent (form fill, message, call). We score 1–10; only 6+ count.', bn: 'ICP-ম্যাচ, ভেরিফাইড কন্টাক্ট, এবং ইনটেন্ট প্রকাশ করা লিড। আমরা ১–১০ স্কোর করি; শুধু ৬+ গণ্য।' } },
        { q: { en: 'What if I get junk leads?', bn: 'জাঙ্ক লিড এলে?' }, a: { en: 'They do not count toward your quota. We replace them free. Every lead is verified before delivery.', bn: 'কোটায় গণ্য হবে না। ফ্রিতে রিপ্লেস করি। প্রতিটি লিড ডেলিভারির আগে ভেরিফাইড।' } },
        { q: { en: 'How many leads will I get?', bn: 'কতগুলো লিড পাব?' }, a: { en: 'Depends on plan + industry. Starter: 50–80/mo. Growth: 100–150. Dominant: 150–250. We commit to a number on the call.', bn: 'প্ল্যান + ইন্ডাস্ট্রির উপর নির্ভর। স্টার্টার: ৫০–৮০/মাস। গ্রোথ: ১০০–১৫০। ডোমিন্যান্ট: ১৫০–২৫০। কলে নম্বর কমিট করি।' } },
        { q: { en: 'What is the close rate I can expect?', bn: 'ক্লোজ রেট কেমন হবে?' }, a: { en: 'Industry average 10–20%. We optimise lead quality to push this higher. Our case studies show 15–30% close rates.', bn: 'ইন্ডাস্ট্রি গড় ১০–২০%। লিড কোয়ালিটি অপটিমাইজ করে এটি বাড়াই। কেস স্টাডিতে ১৫–৩০% ক্লোজ রেট।' } },
        { q: { en: 'When will I see results?', bn: 'কবে ফলাফল দেখব?' }, a: { en: 'First leads within 7 days. Meaningful pattern by day 30. ROI positive by day 60 (guaranteed).', bn: '৭ দিনে প্রথম লিড। ৩০ দিনে অর্থপূর্ণ প্যাটার্ন। ৬০ দিনে ROI পজিটিভ (গ্যারান্টিড)।' } },
      ],
    },
    {
      category: { en: 'Technical & Integrations', bn: 'টেকনিক্যাল ও ইন্টিগ্রেশন' },
      icon: 'code',
      items: [
        { q: { en: 'What CRM do you use?', bn: 'কোন CRM ব্যবহার করেন?' }, a: { en: 'We deploy on a modern stack (HubSpot/free, or custom Notion-based). If you have an existing CRM, we integrate with it.', bn: 'আধুনিক স্ট্যাকে ডিপ্লয় (HubSpot/free, বা কাস্টম Notion-বেসড)। বর্তমান CRM থাকলে ইন্টিগ্রেট করি।' } },
        { q: { en: 'Do you integrate with WhatsApp?', bn: 'WhatsApp-এর সাথে কি ইন্টিগ্রেট করেন?' }, a: { en: 'Yes — official WhatsApp Business API. Broadcasts, templates, chatbots, automated follow-up.', bn: 'হ্যাঁ — অফিসিয়াল WhatsApp Business API। ব্রডকাস্ট, টেমপ্লেট, চ্যাটবট, অটোমেটেড ফলো-আপ।' } },
        { q: { en: 'Can you connect to my existing tools?', bn: 'আমার বর্তমান টুলে কি কানেক্ট করবে?' }, a: { en: 'If it has an API, yes. 50+ native integrations + Zapier/n8n for everything else.', bn: 'API থাকলে হ্যাঁ। ৫০+ নেটিভ ইন্টিগ্রেশন + বাকি সবের জন্য Zapier/n8n।' } },
        { q: { en: 'Do I need a website?', bn: 'ওয়েবসাইট কি দরকার?' }, a: { en: 'No. We build landing pages for you. If you have a website, we add conversion-optimised landing pages to it.', bn: 'না। আমরা ল্যান্ডিং পেজ বানাই। ওয়েবসাইট থাকলে তাতে কনভার্সন-অপটিমাইজড পেজ যোগ করি।' } },
        { q: { en: 'Who hosts the landing pages?', bn: 'ল্যান্ডিং পেজ কে হোস্ট করে?' }, a: { en: 'We host on our Vercel/AWS infrastructure (free for you). Or deploy to your domain — your choice.', bn: 'আমাদের Vercel/AWS-এ হোস্ট (আপনার জন্য ফ্রি)। বা আপনার ডোমেনে ডিপ্লয় — আপনার পছন্দ।' } },
      ],
    },
    {
      category: { en: 'AI & Automation', bn: 'AI ও অটোমেশন' },
      icon: 'bot',
      items: [
        { q: { en: 'What AI do you use?', bn: 'কোন AI ব্যবহার করেন?' }, a: { en: 'Google Gemini for chat/voice agents, OpenAI for copy/analysis, custom models for lead scoring.', bn: 'চ্যাট/ভয়েসে Google Gemini, কপি/অ্যানালিসিসে OpenAI, লিড স্কোরিংয়ে কাস্টম মডেল।' } },
        { q: { en: 'Will the AI sound robotic?', bn: 'AI কি রোবটিক শোনাবে?' }, a: { en: 'No. We train it on your business — FAQs, tone, offers. It sounds like your best sales rep, 24/7.', bn: 'না। আপনার ব্যবসায় ট্রেইন করি — FAQ, টোন, অফার। আপনার সেরা সেলস রেপের মতো, ২৪/৭।' } },
        { q: { en: 'Can the AI book calls?', bn: 'AI কি কল বুক করতে পারে?' }, a: { en: 'Yes — integrated with your calendar (Google Calendar/Calendly). Books, reschedules, sends reminders.', bn: 'হ্যাঁ — আপনার ক্যালেন্ডারে ইন্টিগ্রেটেড (Google Calendar/Calendly)। বুক, রিসিডিউল, রিমাইন্ডার।' } },
        { q: { en: 'Is cold outreach legal?', bn: 'কোল্ড আউটরিচ কি বৈধ?' }, a: { en: 'Yes, when compliant (CAN-SPAM, GDPR consent). We use opt-in lists and compliant templates only.', bn: 'হ্যাঁ, কমপ্লায়েন্ট হলে (CAN-SPAM, GDPR কনসেন্ট)। অপট-ইন লিস্ট ও কমপ্লায়েন্ট টেমপ্লেট ব্যবহার করি।' } },
      ],
    },
    {
      category: { en: 'Security & Privacy', bn: 'সিকিউরিটি ও প্রাইভেসি' },
      icon: 'shield',
      items: [
        { q: { en: 'Is my data safe?', bn: 'আমার ডেটা কি নিরাপদ?' }, a: { en: 'Yes. SSL encryption, GDPR + Bangladesh ICT Act compliant, daily backups, 2FA, access control, audit logs.', bn: 'হ্যাঁ। SSL এনক্রিপশন, GDPR + বাংলাদেশ ICT অ্যাক্ট কমপ্লায়েন্ট, ডেইলি ব্যাকআপ, ২FA, অ্যাক্সেস কন্ট্রোল, অডিট লগ।' } },
        { q: { en: 'Do you sell my data?', bn: 'আমার ডেটা কি বিক্রি করেন?' }, a: { en: 'Never. We do not sell, rent, or share your data. It is yours — exportable and deletable anytime.', bn: 'কখনো না। আপনার ডেটা বিক্রি/রেন্ট/শেয়ার করি না। এটি আপনার — যেকোনো সময় এক্সপোর্ট/ডিলিটযোগ্য।' } },
        { q: { en: 'Where is data hosted?', bn: 'ডেটা কোথায় হোস্টেড?' }, a: { en: 'AWS (Singapore region) + Cloudflare CDN. BD data never leaves Asian data centres.', bn: 'AWS (সিঙ্গাপুর রিজিয়ন) + Cloudflare CDN। বিডি ডেটা এশিয়ান ডেটা সেন্টার ছাড়ে না।' } },
        { q: { en: 'Do you comply with GDPR?', bn: 'GDPR মানেন?' }, a: { en: 'Yes. Full GDPR compliance — consent, data subject rights, right to erasure, data processing agreements.', bn: 'হ্যাঁ। সম্পূর্ণ GDPR কমপ্লায়েন্স — কনসেন্ট, ডেটা সাবজেক্ট রাইটস, রাইট টু ইরেজার, DPA।' } },
      ],
    },
    {
      category: { en: 'Support & Communication', bn: 'সাপোর্ট ও যোগাযোগ' },
      icon: 'headset',
      items: [
        { q: { en: 'How do I reach you?', bn: 'কীভাবে যোগাযোগ করব?' }, a: { en: 'Dedicated WhatsApp number + email + weekly call. Priority support (2h response) on Growth/Dominant.', bn: 'ডেডিকেটেড WhatsApp + ইমেইল + সাপ্তাহিক কল। গ্রোথ/ডোমিন্যান্টে প্রায়োরিটি সাপোর্ট (২ঘ রেসপন্স)।' } },
        { q: { en: 'Do I get a dedicated manager?', bn: 'ডেডিকেটেড ম্যানেজার পাব?' }, a: { en: 'Yes on Growth and Dominant. Starter shares a pool manager (still WhatsApp-accessible).', bn: 'হ্যাঁ, গ্রোথ ও ডোমিন্যান্টে। স্টার্টারে শেয়ার্ড পুল ম্যানেজার (তবু WhatsApp-অ্যাক্সেসযোগ্য)।' } },
        { q: { en: 'What are your support hours?', bn: 'সাপোর্ট আওয়ার কেমন?' }, a: { en: '9am–9pm (BD time), 6 days/week (Sun–Fri). Dominant gets 24/7 emergency channel.', bn: 'সকাল ৯–রাত ৯ (বিডি টাইম), সপ্তাহে ৬ দিন (রবি–শুক্র)। ডোমিন্যান্টে ২৪/৭ ইমার্জেন্সি চ্যানেল।' } },
        { q: { en: 'How often do we talk?', bn: 'কতবার কথা বলব?' }, a: { en: 'Weekly 30-min call + monthly review + quarterly strategy. Plus ad-hoc WhatsApp anytime.', bn: 'সাপ্তাহিক ৩০-মিনিট কল + মাসিক রিভিউ + কোয়ার্টারলি স্ট্র্যাটেজি। সাথে ad-hoc WhatsApp।' } },
      ],
    },
    {
      category: { en: 'Ads & Marketing', bn: 'অ্যাড ও মার্কেটিং' },
      icon: 'megaphone',
      items: [
        { q: { en: 'Which ad platforms?', bn: 'কোন অ্যাড প্ল্যাটফর্ম?' }, a: { en: 'Google (Search/PMax), Meta (FB+IG), LinkedIn (for B2B), TikTok (if relevant). We pick based on your ICP.', bn: 'Google (সার্চ/PMax), Meta (FB+IG), LinkedIn (B2B), TikTok (প্রাসঙ্গিক হলে)। ICP-র উপর নির্ভর।' } },
        { q: { en: 'Do you do SEO?', bn: 'SEO করেন?' }, a: { en: 'Yes — technical, on-page, content, and local SEO. Included in Dominant; add-on in others.', bn: 'হ্যাঁ — টেকনিক্যাল, অন-পেজ, কনটেন্ট, লোকাল SEO। ডোমিন্যান্টে অন্তর্ভুক্ত; অন্যগুলোতে অ্যাড-অন।' } },
        { q: { en: 'Who creates ad creatives?', bn: 'অ্যাড ক্রিয়েটিভ কে বানায়?' }, a: { en: 'We do — copy, design, video edits. You approve before anything goes live.', bn: 'আমরা — কপি, ডিজাইন, ভিডিও এডিট। লাইভ হওয়ার আগে আপনি অ্যাপ্রুভ করেন।' } },
        { q: { en: 'What ad budget do I need?', bn: 'কত অ্যাড বাজেট দরকার?' }, a: { en: 'Minimum ৳20,000/month ad spend for meaningful data. We recommend ৳40,000+ for Growth plan.', bn: 'অর্থপূর্ণ ডেটার জন্য ন্যূনতম ৳২০,০০০/মাস। গ্রোথ প্ল্যানে ৳৪০,০০০+ সুপারিশ করি।' } },
        { q: { en: 'Do you guarantee ROAS?', bn: 'ROAS গ্যারান্টি দেন?' }, a: { en: 'We guarantee ROI (positive return) in 60 days. Specific ROAS depends on industry + offer — we project on the call.', bn: '৬০ দিনে ROI (পজিটিভ রিটার্ন) গ্যারান্টি দেই। নির্দিষ্ট ROAS ইন্ডাস্ট্রি+অফারের উপর — কলে প্রজেক্ট করি।' } },
      ],
    },
    {
      category: { en: 'Ownership & Deliverables', bn: 'ওনারশিপ ও ডেলিভারেবল' },
      icon: 'briefcase',
      items: [
        { q: { en: 'Who owns the ad accounts?', bn: 'অ্যাড অ্যাকাউন্ট কার?' }, a: { en: 'You do. We set them up under your email, you have full access, we are granted manager access.', bn: 'আপনার। আপনার ইমেইলে সেটআপ, আপনার ফুল অ্যাক্সেস, আমাদের ম্যানেজার অ্যাক্সেস দেওয়া হয়।' } },
        { q: { en: 'Who owns the leads?', bn: 'লিড কার?' }, a: { en: 'You do — 100%. Exportable anytime as CSV. Even after you leave, your data goes with you.', bn: 'আপনার — ১০০%। যেকোনো সময় CSV হিসেবে এক্সপোর্টযোগ্য। চলে গেলেও ডেটা আপনার সাথে।' } },
        { q: { en: 'What deliverables do I get?', bn: 'কী ডেলিভারেবল পাব?' }, a: { en: 'CRM, landing pages, ad campaigns, tracking setup, dashboards, SOPs, creative assets, monthly reports.', bn: 'CRM, ল্যান্ডিং পেজ, অ্যাড ক্যাম্পেইন, ট্র্যাকিং, ড্যাশবোর্ড, SOP, ক্রিয়েটিভ, মাসিক রিপোর্ট।' } },
        { q: { en: 'Can I see the dashboard?', bn: 'ড্যাশবোর্ড দেখতে পারব?' }, a: { en: 'Always. Live 24/7 access. Mobile-friendly. Every lead, every cost, every metric — transparent.', bn: 'সবসময়। লাইভ ২৪/৭ অ্যাক্সেস। মোবাইল-ফ্রেন্ডলি। প্রতিটি লিড, খরচ, মেট্রিক — স্বচ্ছ।' } },
      ],
    },
  ] as FaqGroup[],
}

/* ========================================================================== */
/*  LEAD QUALIFICATION                                                         */
/* ========================================================================== */

export const QUALIFICATION = {
  badge: { en: 'Lead Qualification', bn: 'লিড কোয়ালিফিকেশন' },
  title: {
    en: 'Are You Our Ideal Client?',
    bn: 'আপনি কি আমাদের আদর্শ ক্লায়েন্ট?',
  },
  subtitle: {
    en: 'We are honest about who we can help — and who we cannot. Check if you fit.',
    bn: 'আমরা কাকে সাহায্য করতে পারি তাতে সৎ। আপনি মানানসই কিনা যাচাই করুন।',
  },
  ideal: {
    title: { en: 'We Work With You If...', bn: 'আমরা কাজ করি যদি...' },
    items: [
      { text: { en: 'You are a business owner / founder / CEO', bn: 'আপনি বিজনেস ওনার / ফাউন্ডার / সিইও' } },
      { text: { en: 'Your business is 1+ year old', bn: 'আপনার ব্যবসা ১+ বছরের পুরোনো' } },
      { text: { en: 'You have ৳50,000+/month marketing budget', bn: 'আপনার মাসে ৳৫০,০০০+ মার্কেটিং বাজেট' } },
      { text: { en: 'You want to scale, not just survive', bn: 'আপনি স্কেল করতে চান, শুধু বাঁচতে নয়' } },
      { text: { en: 'You are ready to take action this month', bn: 'এই মাসেই অ্যাকশন নিতে প্রস্তুত' } },
      { text: { en: 'You value systems over quick hacks', bn: 'আপনি কুইক হ্যাকের চেয়ে সিস্টেমকে মূল্য দেন' } },
    ] as QualifyItem[],
  },
  notIdeal: {
    title: { en: 'We Cannot Help If...', bn: 'আমরা সাহায্য করতে পারি না যদি...' },
    items: [
      { text: { en: 'You only have an "idea", no product', bn: 'শুধু "আইডিয়া", প্রোডাক্ট নেই' } },
      { text: { en: 'Your product/service is not ready', bn: 'প্রোডাক্ট/সার্ভিস রেডি নেই' } },
      { text: { en: 'You want to spend under ৳20,000/month', bn: '৳২০,০০০/মাসের কম খরচ করতে চান' } },
      { text: { en: 'You are not ready to act this month', bn: 'এই মাসে অ্যাকশন নিতে প্রস্তুত নন' } },
      { text: { en: 'You blame others instead of taking responsibility', bn: 'অন্যদের দোষ দেন, দায়িত্ব নেন না' } },
      { text: { en: 'You expect magic in 7 days with no budget', bn: '৭ দিনে ম্যাজিক আশা করেন, বাজেট ছাড়া' } },
    ] as QualifyItem[],
  },
  cta: { en: 'Am I a fit? — Book the free call', bn: 'আমি কি ফিট? — ফ্রি কল বুক করুন' },
}

/* ========================================================================== */
/*  ENTERPRISE SLA DOCUMENTATION                                               */
/* ========================================================================== */

export const SLA = {
  badge: { en: 'Enterprise SLA', bn: 'এন্টারপ্রাইজ SLA' },
  title: {
    en: 'Service Level Agreement',
    bn: 'সার্ভিস লেভেল এগ্রিমেন্ট',
  },
  subtitle: {
    en: 'Our promises — measurable, transparent, enterprise-grade.',
    bn: 'আমাদের প্রতিশ্রুতি — পরিমাপযোগ্য, স্বচ্ছ, এন্টারপ্রাইজ-গ্রেড।',
  },
  items: [
    {
      icon: 'activity',
      title: { en: 'Uptime Guarantee', bn: 'আপটাইম গ্যারান্টি' },
      desc: {
        en: '99.9% uptime for all systems we host. Downtime beyond this is compensated pro-rata.',
        bn: 'আমাদের হোস্ট করা সব সিস্টেমে ৯৯.৯% আপটাইম। এর বেশি ডাউনটাইম প্রো-রাটা ক্ষতিপূরণ।',
      },
    },
    {
      icon: 'clock',
      title: { en: 'Response Time', bn: 'রেসপন্স টাইম' },
      items: [
        { en: 'Email: within 24 hours', bn: 'ইমেইল: ২৪ ঘন্টায়' },
        { en: 'WhatsApp: within 2 hours', bn: 'WhatsApp: ২ ঘন্টায়' },
        { en: 'Emergency: within 1 hour', bn: 'জরুরি: ১ ঘন্টায়' },
      ],
    },
    {
      icon: 'bar-chart',
      title: { en: 'Reporting Cadence', bn: 'রিপোর্টিং ক্যাডেন্স' },
      items: [
        { en: 'Weekly performance email', bn: 'সাপ্তাহিক পারফরম্যান্স ইমেইল' },
        { en: 'Monthly review call (30 min)', bn: 'মাসিক রিভিউ কল (৩০ মিনিট)' },
        { en: 'Quarterly strategy review', bn: 'কোয়ার্টারলি স্ট্র্যাটেজি রিভিউ' },
      ],
    },
    {
      icon: 'user-check',
      title: { en: 'Success Manager', bn: 'সাকসেস ম্যানেজার' },
      desc: {
        en: 'Every client gets a dedicated success manager — regular contact, reports, and optimisation recommendations.',
        bn: 'প্রত্যেক ক্লায়েন্টের ডেডিকেটেড সাকসেস ম্যানেজার — নিয়মিত যোগাযোগ, রিপোর্ট, অপটিমাইজেশন সুপারিশ।',
      },
    },
    {
      icon: 'shield',
      title: { en: 'Data Ownership', bn: 'ডেটা ওনারশিপ' },
      desc: {
        en: 'All leads, CRM data, and assets are 100% yours. Exportable in 48 hours, anytime, no questions.',
        bn: 'সব লিড, CRM ডেটা, অ্যাসেট ১০০% আপনার। ৪৮ ঘন্টায় এক্সপোর্টযোগ্য, যেকোনো সময়, কোনো প্রশ্ন ছাড়া।',
      },
    },
    {
      icon: 'file-text',
      title: { en: 'Acceptance Criteria', bn: 'অ্যাকসেপ্টেন্স ক্রাইটেরিয়া' },
      items: [
        { en: 'Lead delivered = verified + ICP-matched + intent shown', bn: 'লিড ডেলিভার্ড = ভেরিফাইড + ICP-ম্যাচ + ইনটেন্ট' },
        { en: 'Campaign live = pixel fires + first impression logged', bn: 'ক্যাম্পেইন লাইভ = পিক্সেল ফায়ার + প্রথম ইম্প্রেশন' },
        { en: 'Dashboard live = real-time data within 5 min delay', bn: 'ড্যাশবোর্ড লাইভ = ৫ মিনিট ডিলে-তে রিয়েল-টাইম' },
      ],
    },
  ] as SlaCard[],
  downloadLabel: { en: 'Download Full SLA Document', bn: 'সম্পূর্ণ SLA ডকুমেন্ট ডাউনলোড করুন' },
}

/* ========================================================================== */
/*  FINAL CTA                                                                  */
/* ========================================================================== */

export const FINAL_CTA = {
  badge: { en: 'Ready?', bn: 'প্রস্তুত?' },
  title: {
    en: 'Ready to Fill Your Pipeline?',
    bn: 'আপনার পাইপলাইন ভরাট করতে প্রস্তুত?',
  },
  subtitle: {
    en: 'In a free 30-minute strategy call, we will build a custom AI roadmap for your business. No pitch — just value.',
    bn: '৩০ মিনিটের ফ্রি স্ট্র্যাটেজি কলে আমরা আপনার ব্যবসার জন্য কাস্টম AI রোডম্যাপ তৈরি করব। কোনো পিচ নয় — শুধু মূল্য।',
  },
  primaryCta: { en: 'Book a Free Strategy Call', bn: 'ফ্রি স্ট্র্যাটেজি কল বুক করুন' },
  secondaryCta: { en: 'Message on WhatsApp', bn: 'WhatsApp-এ মেসেজ করুন' },
  tertiaryCta: { en: 'Email Us', bn: 'ইমেইল করুন' },
  micro: { en: 'Fast setup · 100% guarantee · 24/7 support', bn: 'দ্রুত সেটআপ · ১০০% গ্যারান্টি · ২৪/৭ সাপোর্ট' },
  badges: [
    { en: '60-day ROI Guarantee', bn: '৬০-দিন ROI গ্যারান্টি' },
    { en: '4.9/5 Satisfaction', bn: '৪.৯/৫ সন্তুষ্টি' },
    { en: '120+ Active Clients', bn: '১২০+ সক্রিয় ক্লায়েন্ট' },
  ] as Bilingual[],
}

/* ========================================================================== */
/*  EXIT INTENT POPUP                                                          */
/* ========================================================================== */

export const EXIT_POPUP = {
  icon: 'gift',
  title: { en: 'Wait! A Gift For You', bn: 'থামুন! আপনার জন্য একটি উপহার' },
  body: {
    en: 'Not ready to talk yet? Get a free "Lead Generation Potential Audit" for your business — delivered to your inbox.',
    bn: 'এখনই কথা বলতে প্রস্তুত নন? আপনার ব্যবসার জন্য ফ্রি "লিড জেনারেশন সম্ভাবনা অডিট" পান — ইনবক্সে।',
  },
  placeholder: { en: 'Your email', bn: 'আপনার ইমেইল' },
  button: { en: 'Send Me the Audit', bn: 'অডিট পাঠান' },
  micro: {
    en: 'No spam. Unsubscribe anytime.',
    bn: 'আমরা স্প্যাম করি না। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।',
  },
}

/* ========================================================================== */
/*  STICKY CTA BAR                                                             */
/* ========================================================================== */

export const STICKY_CTA = {
  price: { en: 'from ৳35,000/mo', bn: '৳৩৫,০০০/মাস থেকে' },
  roi: { en: '5–10x ROI', bn: '৫–১০x ROI' },
  button: { en: 'Book a Call', bn: 'কল বুক করুন' },
}
